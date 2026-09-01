import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BrandLogo } from "./brand-logo";

describe("BrandLogo", () => {
  it("renders the supplied mark with an accessible name and intrinsic dimensions", () => {
    render(<BrandLogo />);

    const logo = screen.getByRole("img", { name: "Trends logo" });

    expect(logo).toHaveAttribute("width", "295");
    expect(logo).toHaveAttribute("height", "500");
    expect(logo.getAttribute("src")).toContain("trends-logo.svg");
  });
});
