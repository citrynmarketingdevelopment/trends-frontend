// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
const { sendMail, close, createTransport } = vi.hoisted(() => ({
  sendMail: vi.fn(),
  close: vi.fn(),
  createTransport: vi.fn(),
}));
vi.mock("nodemailer", () => ({ default: { createTransport } }));
import { isContactEmailConfigured, sendContactEmails } from "./mail";
import { createContactEmails } from "./email-templates";
import { allowContactAttempt } from "./rate-limit";
import type { ContactInput } from "./schema";

const input: ContactInput = {
  name: "Test <Customer>",
  email: "customer@example.test",
  phone: "6615550101",
  service: "mechanical",
  preferredContact: "phone",
  vehicleYear: "",
  vehicleMake: "",
  vehicleModel: "",
  company: "",
  insurance: "",
  message: "<script>alert('x')</script>",
  website: "",
};
beforeEach(() => {
  vi.clearAllMocks();
  createTransport.mockReturnValue({ sendMail, close });
  for (const [name, value] of Object.entries({
    SMTP_HOST: "smtp.example.test",
    SMTP_PORT: "587",
    SMTP_USER: "test",
    SMTP_PASSWORD: "test",
    CONTACT_FROM_EMAIL: "sender@example.test",
    CONTACT_TO_EMAIL: "shop@example.test",
  }))
    vi.stubEnv(name, value);
});
afterEach(() => {
  vi.unstubAllEnvs();
});

describe("contact email", () => {
  it("requires complete server-only configuration", () => {
    expect(isContactEmailConfigured()).toBe(true);
    vi.stubEnv("SMTP_PASSWORD", "");
    expect(isContactEmailConfigured()).toBe(false);
  });
  it("sends the shop inquiry first, then the acknowledgment with a fixed sender", async () => {
    sendMail.mockResolvedValue({ accepted: ["recipient@example.test"] });
    expect(await sendContactEmails(input)).toEqual({ confirmationSent: true });
    expect(sendMail.mock.calls[0]?.[0]).toMatchObject({
      to: "shop@example.test",
      replyTo: input.email,
      from: { address: "sender@example.test" },
    });
    expect(sendMail.mock.calls[1]?.[0]).toMatchObject({ to: input.email });
    expect(createTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        requireTLS: true,
        secure: false,
        disableFileAccess: true,
        disableUrlAccess: true,
      }),
    );
    expect(close).toHaveBeenCalled();
  });
  it("never sends an acknowledgment if the shop rejects the email", async () => {
    sendMail.mockResolvedValue({ accepted: [] });
    await expect(sendContactEmails(input)).rejects.toThrow("SHOP_EMAIL_REJECTED");
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(close).toHaveBeenCalled();
  });
  it("does not resubmit an inquiry after the acknowledgment fails", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    sendMail
      .mockResolvedValueOnce({ accepted: ["shop@example.test"] })
      .mockRejectedValueOnce(new Error("SMTP failed"));
    expect(await sendContactEmails(input)).toEqual({ confirmationSent: false });
    expect(sendMail).toHaveBeenCalledTimes(2);
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
