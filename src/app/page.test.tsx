import { render, screen, within } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";

import Home from "./page";

vi.mock("next/font/google", () => ({
  Barlow_Condensed: () => ({ variable: "font-trends-display" }),
  DM_Mono: () => ({ variable: "font-trends-mono" }),
  Instrument_Serif: () => ({ variable: "font-trends-editorial" }),
  Manrope: () => ({ variable: "font-trends-body" }),
}));

vi.mock("next/image", () => ({
  default: ({
    fill,
    priority,
    src,
    unoptimized,
    ...props
  }: Omit<ComponentProps<"img">, "src"> & {
    fill?: boolean;
    priority?: boolean;
    src: string | { src: string };
    unoptimized?: boolean;
  }) => {
    void priority;
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

vi.mock("@/components/marketing-home/hero-logo-3d", () => ({
  HeroLogo3D: () => <div data-testid="hero-logo-enhancement" aria-hidden="true" />,
}));

vi.mock("@/components/marketing-home/process-story", () => ({
  ProcessStory: () => (
    <section id="process" aria-labelledby="process-heading">
      <h2 id="process-heading">Three stages. One continuous standard.</h2>
    </section>
  ),
}));

describe("Home", () => {
  it("server-renders the complete marketing shell around optional 3D enhancements", () => {
    render(<Home />);

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");
    expect(main).toHaveAttribute("tabindex", "-1");
    expect(
      within(main).getByRole("heading", {
        level: 1,
        name: "Auto Collision Center in Bakersfield",
      }),
    ).toBeInTheDocument();
    for (const repairLink of within(main).getAllByRole("link", { name: "START A REPAIR" })) {
      expect(repairLink).toHaveAttribute("href", "/contact");
    }
    expect(within(main).getByRole("link", { name: "INSURANCE CLAIMS" })).toHaveAttribute(
      "href",
      "/insurance-claims",
    );
    expect(
      within(main).getByRole("heading", {
        level: 2,
        name: "The Whole Repair. Your Local Collision Experts.",
      }),
    ).toBeInTheDocument();
    for (const service of [
      "Collision Repair",
      "Mechanical",
      "Roadside",
      "Tires & Alignment",
      "Fleet Maintenance",
    ]) {
      expect(within(main).getByRole("heading", { level: 3, name: service })).toBeInTheDocument();
    }
    const servicesSection = within(main)
      .getByRole("heading", {
        level: 2,
        name: "The Whole Repair. Your Local Collision Experts.",
      })
      .closest("section");
    expect(servicesSection).not.toBeNull();
    expect(
      within(servicesSection!).getByRole("heading", {
        level: 3,
        name: "Dealers that trust Trends",
      }),
    ).toBeInTheDocument();
    for (const make of [
      "GM",
      "Dodge",
      "Ram",
      "SRT",
      "Nissan",
      "Hyundai",
      "Jeep",
      "Kia",
      "Mazda",
      "Chrysler",
      "Honda",
      "Infiniti",
      "Corvette",
      "Cadillac",
    ]) {
      expect(within(servicesSection!).getByRole("img", { name: make })).toBeInTheDocument();
    }
    expect(within(servicesSection!).getByRole("img", { name: "Ram" })).toHaveAttribute(
      "src",
      "/images/vehicle-makes/ram-wordmark.svg",
    );
    expect(within(servicesSection!).getByRole("img", { name: "Kia" })).toHaveAttribute(
      "src",
      "/images/vehicle-makes/kia-wordmark.svg",
    );
    expect(within(servicesSection!).getByRole("img", { name: "Corvette" })).toHaveAttribute(
      "src",
      "/images/vehicle-makes/corvette-logo.svg",
    );
    expect(within(servicesSection!).queryByText("First call")).not.toBeInTheDocument();
    expect(
      servicesSection!.querySelector(
        'img[src="/images/services/collision-repair-crashed-car.webp"]',
      ),
    ).not.toBeNull();
    expect(
      servicesSection!.querySelector('img[src="/images/Fleet/roadside-towing-verticle.webp"]'),
    ).not.toBeNull();
    expect(
      servicesSection!.querySelector('img[src="/images/Fleet/Fleet-verticle.webp"]'),
    ).not.toBeNull();
    expect(
      servicesSection!.querySelector('img[src="/images/Mechanical/Mechinical.webp"]'),
    ).not.toBeNull();
    expect(
      within(main).getByRole("heading", { level: 2, name: "Credentials behind the repair." }),
    ).toBeInTheDocument();
    expect(within(main).queryByText("Official asset pending")).not.toBeInTheDocument();
    expect(within(main).getAllByText("GM Collision Repair Network")).toHaveLength(3);
    expect(main.querySelectorAll('img[src^="/certifications/"]')).toHaveLength(7);
    expect(main.querySelector('img[src="/certifications/insurance.webp"]')).toBeNull();
    expect(
      within(main).getByRole("heading", {
        level: 2,
        name: "Three stages. One continuous standard.",
      }),
    ).toBeInTheDocument();
    expect(
      within(main).getByRole("heading", {
        level: 2,
        name: "Vehicle Repair Visibility. Zero Guesswork.",
      }),
    ).toBeInTheDocument();
    expect(within(main).getByText("Trends Delivers Transparency")).toBeInTheDocument();
    expect(within(main).queryByText("The Software We're Building")).not.toBeInTheDocument();
    expect(
      within(main).getByRole("heading", { level: 2, name: "Everything we do, under one roof." }),
    ).toBeInTheDocument();
    expect(
      main
        .querySelector('section[aria-labelledby="repair-services-heading"]')
        ?.querySelectorAll("img"),
    ).toHaveLength(4);
    expect(
      within(main).getByRole("heading", { level: 2, name: "Questions are part of the process." }),
    ).toBeInTheDocument();
    expect(
      within(main).getByRole("tab", { name: "Do you work with insurance claims?" }),
    ).toHaveAttribute("aria-selected", "true");
    expect(
      within(main).getByRole("tab", {
        name: "Can I track my vehicle while it is being repaired?",
      }),
    ).toBeInTheDocument();
    expect(
      within(main).getByRole("heading", { level: 2, name: "Send us the damage." }),
    ).toBeInTheDocument();
    expect(within(main).getByTestId("hero-logo-enhancement")).toBeInTheDocument();
    const heroVideo = main.querySelector("[data-hero-video]");
    expect(heroVideo).toHaveAttribute("autoplay");
    expect(heroVideo).toHaveAttribute("loop");
    expect(heroVideo).toHaveProperty("muted", true);
    expect(heroVideo).toHaveAttribute("playsinline");
    expect(heroVideo?.querySelector("source")).toHaveAttribute(
      "src",
      "/videos/location-drone-hero.webm",
    );
    expect(within(main).queryByText("REVUELTO")).not.toBeInTheDocument();

    const hero = within(main).getByRole("heading", { level: 1 }).closest("section");
    const reel = within(main)
      .getByRole("heading", {
        level: 2,
        name: "The Whole Repair. Your Local Collision Experts.",
      })
      .closest("section");
    const process = within(main)
      .getByRole("heading", {
        level: 2,
        name: "Three stages. One continuous standard.",
      })
      .closest("section");
    const certifications = within(main)
      .getByRole("heading", { level: 2, name: "Credentials behind the repair." })
      .closest("section");
    const tracking = within(main)
      .getByRole("heading", { level: 2, name: "Vehicle Repair Visibility. Zero Guesswork." })
      .closest("section");
    const repairServices = within(main)
      .getByRole("heading", { level: 2, name: "Everything we do, under one roof." })
      .closest("section");
    const questions = within(main)
      .getByRole("heading", { level: 2, name: "Questions are part of the process." })
      .closest("section");
    const start = within(main)
      .getByRole("heading", { level: 2, name: "Send us the damage." })
      .closest("section");
    expect(hero).not.toBeNull();
    expect(reel).not.toBeNull();
    expect(process).not.toBeNull();
    expect(certifications).not.toBeNull();
    expect(tracking).not.toBeNull();
    expect(repairServices).not.toBeNull();
    expect(questions).not.toBeNull();
    expect(start).not.toBeNull();
    expect(
      within(main).queryByRole("heading", { level: 2, name: "Quality starts with what we use." }),
    ).not.toBeInTheDocument();
    expect(
      within(main).queryByRole("heading", {
        name: "The details matter before the paint ever does.",
      }),
    ).not.toBeInTheDocument();
    expect(hero!.compareDocumentPosition(reel!) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(reel!.compareDocumentPosition(tracking!) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(reel!.nextElementSibling).toBe(tracking);
    expect(
      tracking!.compareDocumentPosition(certifications!) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(certifications!.compareDocumentPosition(start!) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(start!.compareDocumentPosition(process!) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(
      process!.compareDocumentPosition(repairServices!) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(
      repairServices!.compareDocumentPosition(questions!) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
});
