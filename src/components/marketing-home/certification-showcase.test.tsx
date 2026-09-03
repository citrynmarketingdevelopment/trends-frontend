import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";

import { CertificationShowcase } from "./certification-showcase";

vi.mock("next/image", () => ({
  default: ({
    fill,
    src,
    unoptimized,
    ...props
  }: Omit<ComponentProps<"img">, "src"> & {
    fill?: boolean;
    src: string | { src: string };
    unoptimized?: boolean;
  }) => {
    void unoptimized;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...props}
        alt={props.alt ?? ""}
        src={typeof src === "string" ? src : src.src}
        style={
          fill
            ? { ...props.style, height: "100%", position: "absolute", width: "100%" }
            : props.style
        }
      />
    );
  },
}));

describe("CertificationShowcase", () => {
  it("filters supplied credentials and updates the selected detail", async () => {
    const user = userEvent.setup();
    render(<CertificationShowcase />);

    const section = screen.getByRole("region", { name: "Credentials behind the repair." });
    const grid = section.querySelector<HTMLElement>("[data-certification-grid]");
    expect(grid).not.toBeNull();
    expect(within(grid!).getAllByRole("button")).toHaveLength(6);
    expect(
      within(section).getByRole("heading", { level: 3, name: "GM Collision Repair Network" }),
    ).toBeInTheDocument();
    expect(within(section).queryByText("Official asset pending")).not.toBeInTheDocument();

    const oemFilter = within(section).getByRole("button", {
      name: "OEM certifications",
    });
    expect(oemFilter).toHaveAttribute("aria-pressed", "true");

    await user.click(within(section).getByRole("button", { name: "All" }));
    expect(within(grid!).getAllByRole("button")).toHaveLength(10);

    await user.click(oemFilter);
    expect(within(grid!).getAllByRole("button")).toHaveLength(6);

    await user.click(
      within(section).getByRole("button", {
        name: "Kia Recognized Collision Repair Center. OEM certifications.",
      }),
    );
    expect(
      within(section).getByRole("heading", {
        level: 3,
        name: "Kia Recognized Collision Repair Center",
      }),
    ).toBeInTheDocument();
    expect(
      section.querySelector("[data-selected-certificate='kia-recognized-collision-repair-center']"),
    ).not.toBeNull();
    expect(
      within(section).getByText("No validity date shown on the supplied artwork"),
    ).toBeVisible();
  });
});
