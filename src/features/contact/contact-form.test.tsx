import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./contact-form";

afterEach(() => vi.unstubAllGlobals());

async function fillInquiry() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Full name *"), "Test Customer");
  await user.type(screen.getByLabelText("Email address *"), "customer@example.test");
  await user.type(screen.getByLabelText("Phone number *"), "6615550101");
  await user.type(
    screen.getByLabelText("Tell us about your vehicle or question *"),
    "I would like help with my vehicle.",
  );
  return user;
}

describe("contact form", () => {
  it("shows an honest phone/email fallback when SMTP is missing", () => {
    render(<ContactForm available={false} initialService="collision" />);
    expect(screen.getByRole("button", { name: "Send inquiry" })).toBeDisabled();
    expect(screen.getByText(/Online requests are temporarily unavailable/)).toBeInTheDocument();
  });
  it("validates required fields without sending an invalid inquiry", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm available initialService="mechanical" />);
    await user.click(screen.getByRole("button", { name: "Send inquiry" }));
    expect(await screen.findByText("Enter your name.")).toBeVisible();
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("preselects the originating service and renders successful next steps", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ json: async () => ({ ok: true, confirmationSent: true }) });
    vi.stubGlobal("fetch", fetchMock);
    render(<ContactForm available initialService="mechanical" />);
    expect(screen.getByLabelText("Service *")).toHaveValue("mechanical");
    const user = await fillInquiry();
    await user.click(screen.getByRole("button", { name: "Send inquiry" }));
    expect(
      await screen.findByRole("heading", { name: "Your inquiry is with the team." }),
    ).toBeVisible();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/An acknowledgment email/)).toBeVisible();
  });
  it("retains entered values after a failed request", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    render(<ContactForm available initialService="general" />);
    const user = await fillInquiry();
    await user.click(screen.getByRole("button", { name: "Send inquiry" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("could not confirm"));
    expect(screen.getByLabelText("Full name *")).toHaveValue("Test Customer");
  });
  it("does not invite duplicate submissions when only the acknowledgment failed", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ json: async () => ({ ok: true, confirmationSent: false }) }),
    );
    render(<ContactForm available initialService="general" />);
    const user = await fillInquiry();
    await user.click(screen.getByRole("button", { name: "Send inquiry" }));
    expect(await screen.findByText(/You don’t need to submit again/)).toBeVisible();
    expect(screen.queryByRole("button", { name: "Send inquiry" })).not.toBeInTheDocument();
  });
});
