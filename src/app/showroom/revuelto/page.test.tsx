import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import RevueltoShowroomPage from "./page";

vi.mock("next/font/google", () => ({
  IBM_Plex_Mono: () => ({ variable: "font-showroom-mono" }),
  Space_Grotesk: () => ({ variable: "font-showroom-display" }),
}));

vi.mock("@/components/car-experience", () => ({
  CarExperience: () => (
    <section aria-labelledby="vehicle-title" data-testid="car-experience">
      <h1 id="vehicle-title">REVUELTO</h1>
    </section>
  ),
}));

describe("Revuelto showroom", () => {
  it("preserves the accessible server shell around the original client experience", () => {
    render(<RevueltoShowroomPage />);

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");
    expect(main).toHaveAttribute("tabindex", "-1");
    expect(within(main).getByTestId("car-experience")).toBeInTheDocument();
    expect(within(main).getByRole("heading", { level: 1, name: "REVUELTO" })).toBeInTheDocument();
  });
});
