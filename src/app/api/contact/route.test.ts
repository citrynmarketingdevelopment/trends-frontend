// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
vi.mock("@/features/contact/mail", () => ({
  isContactEmailConfigured: vi.fn(),
  sendContactEmails: vi.fn(),
}));
vi.mock("@/features/contact/rate-limit", () => ({ allowContactAttempt: vi.fn() }));
import { POST } from "./route";
import { isContactEmailConfigured, sendContactEmails } from "@/features/contact/mail";
import { allowContactAttempt } from "@/features/contact/rate-limit";

const valid = {
  name: "Test Customer",
  email: "customer@example.test",
  phone: "6615550101",
  service: "collision",
  preferredContact: "email",
  vehicleYear: "2022",
  vehicleMake: "Toyota",
  vehicleModel: "Camry",
  company: "",
  insurance: "",
  message: "Please help assess my bumper damage.",
  website: "",
};
function request(body: unknown = valid, origin = "http://localhost:3000") {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}
beforeEach(() => {
  vi.clearAllMocks();
  delete process.env.NEXT_PUBLIC_SITE_ORIGIN;
  vi.mocked(isContactEmailConfigured).mockReturnValue(true);
  vi.mocked(allowContactAttempt).mockReturnValue(true);
  vi.mocked(sendContactEmails).mockResolvedValue({ confirmationSent: true });
});

describe("contact endpoint", () => {
  it("accepts a valid inquiry only after the shop email succeeds", async () => {
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, confirmationSent: true });
    expect(sendContactEmails).toHaveBeenCalledWith(valid);
    expect(response.headers.get("cache-control")).toBe("no-store");
  });
  it("never claims receipt while SMTP is missing", async () => {
    vi.mocked(isContactEmailConfigured).mockReturnValue(false);
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect((await response.json()).ok).toBe(false);
    expect(sendContactEmails).not.toHaveBeenCalled();
  });
  it("rejects invalid fields and honeypot submissions before sending", async () => {
    for (const body of [
      { ...valid, email: "bad" },
      { ...valid, website: "spam" },
      { ...valid, service: "unknown" },
      { ...valid, name: "Name\r\nBcc: victim@example.test" },
    ])
      expect((await POST(request(body))).status).toBe(400);
    expect(sendContactEmails).not.toHaveBeenCalled();
  });
  it("rejects cross-origin and oversized requests", async () => {
    expect((await POST(request(valid, "https://elsewhere.test"))).status).toBe(403);
    expect((await POST(request({ ...valid, message: "a".repeat(21000) }))).status).toBe(413);
    expect(sendContactEmails).not.toHaveBeenCalled();
  });
  it("reports throttling without sending mail", async () => {
    vi.mocked(allowContactAttempt).mockReturnValue(false);
    const response = await POST(request());
    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBe("900");
    expect(sendContactEmails).not.toHaveBeenCalled();
  });
  it("keeps shop receipt successful if customer acknowledgment fails", async () => {
    vi.mocked(sendContactEmails).mockResolvedValue({ confirmationSent: false });
    expect(await (await POST(request())).json()).toEqual({ ok: true, confirmationSent: false });
  });
  it("reports delivery failure without exposing mail-server errors", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(sendContactEmails).mockRejectedValue(new Error("private SMTP details"));
    const response = await POST(request());
    expect(response.status).toBe(502);
    expect(await response.text()).not.toContain("private SMTP details");
    log.mockRestore();
  });
});
