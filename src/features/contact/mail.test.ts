// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { isContactEmailConfigured, sendContactEmails } from "./mail";
import { createContactEmails } from "./email-templates";
import { allowContactAttempt } from "./rate-limit";
import type { ContactInput } from "./schema";

const input: ContactInput = {
  name: "Test <Customer>",
  email: "customer@example.test",
  phone: "6615550101",
  service: "mechanical",
  vehicleYear: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleVin: "",
  company: "",
  insurance: "",
  message: "<script>alert('x')</script>",
  website: "",
};
beforeEach(() => {
  vi.clearAllMocks();
  for (const [name, value] of Object.entries({
    SMTP_API: "test-api-key",
    SMTP_CHANNEL: "test-channel",
    CONTACT_FROM_EMAIL: "sender@example.test",
  }))
    vi.stubEnv(name, value);
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("contact email", () => {
  it("requires complete server-only configuration", () => {
    vi.stubEnv("CONTACT_TO_EMAIL", "");
    expect(isContactEmailConfigured()).toBe(true);
    vi.stubEnv("SMTP_API", "");
    expect(isContactEmailConfigured()).toBe(false);
  });
  it("sends the shop inquiry first, then the acknowledgment with a fixed sender", async () => {
    const send = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: "success", data: { msg_id: "accepted-id" } }),
    });
    vi.stubGlobal("fetch", send);
    expect(await sendContactEmails(input)).toEqual({ confirmationSent: true });
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[0]?.[0]).toBe("https://api.smtp.com/v4/messages");
    expect(send.mock.calls[0]?.[1]).toMatchObject({
      method: "POST",
      headers: { "X-SMTPCOM-API": "test-api-key" },
    });
    const inquiry = JSON.parse(send.mock.calls[0]?.[1].body as string);
    const acknowledgment = JSON.parse(send.mock.calls[1]?.[1].body as string);
    expect(inquiry).toMatchObject({
      channel: "test-channel",
      recipients: {
        to: [
          { address: "info@trendsautocollision.com" },
          { address: "Paulbarelatb@gmail.com" },
          { address: "Manuel@trendsautocollision.com" },
          { address: "citryn.contactforms@gmail.com" },
        ],
      },
      originator: {
        from: { address: "sender@example.test" },
        reply_to: { address: input.email },
      },
      body: { parts: [{ type: "text/plain" }, { type: "text/html" }] },
    });
    expect(acknowledgment.recipients.to).toEqual([{ address: input.email }]);
  });
  it("never sends an acknowledgment if the shop rejects the email", async () => {
    const send = vi.fn().mockResolvedValue({ ok: false });
    vi.stubGlobal("fetch", send);
    await expect(sendContactEmails(input)).rejects.toThrow("CONTACT_API_REJECTED");
    expect(send).toHaveBeenCalledTimes(1);
  });
  it("does not resubmit an inquiry after the acknowledgment fails", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    const send = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ status: "success", data: { msg_id: "accepted-id" } }),
      })
      .mockRejectedValueOnce(new Error("API failed"));
    vi.stubGlobal("fetch", send);
    expect(await sendContactEmails(input)).toEqual({ confirmationSent: false });
    expect(send).toHaveBeenCalledTimes(2);
    log.mockRestore();
  });
  it("escapes HTML and keeps freeform message content out of customer emails", () => {
    const email = createContactEmails(input);
    expect(email.shop.html).toContain("&lt;script&gt;");
    expect(email.shop.html).not.toContain("<script>");
    expect(email.customer.html).toContain("Test &lt;Customer&gt;");
    expect(email.customer.html).not.toContain("alert");
    expect(email.customer.text).toContain("does not book an appointment");
    expect(email.shop.text).toContain(input.message);
  });
  it("limits repeated requests and allows a later attempt", () => {
    const now = 1000000;
    expect(allowContactAttempt("rate@example.test", now)).toBe(true);
    expect(allowContactAttempt("rate@example.test", now)).toBe(true);
    expect(allowContactAttempt("RATE@example.test", now)).toBe(true);
    expect(allowContactAttempt("rate@example.test", now)).toBe(false);
    expect(allowContactAttempt("rate@example.test", now + 900001)).toBe(true);
  });
});
