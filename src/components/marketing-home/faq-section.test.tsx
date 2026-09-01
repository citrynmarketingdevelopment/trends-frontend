import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { QuestionsSection } from "./faq-section";

describe("QuestionsSection", () => {
  it("selects answers by pointer and keyboard while preserving the repair anchor", async () => {
    const user = userEvent.setup();
    render(<QuestionsSection />);

    const insurance = screen.getByRole("tab", { name: "Do you work with insurance claims?" });
    const tracking = screen.getByRole("tab", {
      name: "Can I track my vehicle while it is being repaired?",
    });
    const roadside = screen.getByRole("tab", {
      name: "Do you offer towing or roadside service?",
    });

    expect(insurance).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent(
      "Collision repairs can be planned through an insurance claim",
    );

    await user.click(tracking);
    expect(tracking).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("not a live customer portal");

    await user.keyboard("{ArrowDown}");
    expect(roadside).toHaveFocus();
    expect(roadside).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent(
      "Availability and timing must be confirmed",
    );

    await user.keyboard("{Home}");
    expect(insurance).toHaveFocus();
    expect(screen.getByRole("link", { name: "START A REPAIR" })).toHaveAttribute("href", "#start");
  });
});
