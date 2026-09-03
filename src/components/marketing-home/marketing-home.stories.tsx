import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ReactNode } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { CertificationShowcase } from "./certification-showcase";
import { ExperienceProvider } from "./experience-state";
import styles from "./marketing-home.module.css";
import { MarketingHeader } from "./marketing-header";
import {
  QuestionsSection,
  RepairServicesSection,
  RepairStartPoster,
  RepairTrackingSection,
} from "./post-process-sections";
import { processPhases } from "./process-state";
import { ServiceReel } from "./service-reel";

const meta = {
  title: "Marketing/Cinematic homepage",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Frame({ children }: { children: ReactNode }) {
  return (
    <ExperienceProvider>
      <div className={styles.marketing} style={{ minHeight: "100dvh" }}>
        {children}
      </div>
    </ExperienceProvider>
  );
}

export const Header: Story = {
  render: () => (
    <Frame>
      <MarketingHeader />
      <div style={{ minHeight: "16rem" }} />
    </Frame>
  ),
};

export const MobileMenu: Story = {
  parameters: { viewport: { defaultViewport: "mobile2" } },
  render: () => (
    <Frame>
      <MarketingHeader />
      <div style={{ minHeight: "16rem" }} />
    </Frame>
  ),
};

export const StaticHero: Story = {
  render: () => (
    <Frame>
      <section className={styles.hero} aria-labelledby="story-hero-heading">
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={styles.heroPoster}>
          <div className={styles.heroMark}>
            <BrandLogo className={styles.heroLogoBaseline} preload />
          </div>
          <p className={styles.eyebrow}>Collision · Restoration · Refinement</p>
          <h1 id="story-hero-heading" aria-label="The art of restoration.">
            <span>The art of</span>
            <span>Restoration.</span>
          </h1>
          <p className={styles.heroSupport}>
            More than repairing what was damaged. We bring every line, finish, and detail back
            together until the repair disappears.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#storybook-start">
              START A REPAIR
            </a>
            <a className={styles.secondaryButton} href="#storybook-process">
              OUR PROCESS
            </a>
          </div>
        </div>
        <div className={styles.heroFacts}>
          <span>Bakersfield, California</span>
          <span>Assessment / Restoration / Refinish / Final review</span>
        </div>
      </section>
    </Frame>
  ),
};

export const ServiceReelDesktop: Story = {
  render: () => (
    <Frame>
      <ServiceReel />
    </Frame>
  ),
};

export const ServiceReelMobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile2" } },
  render: () => (
    <Frame>
      <ServiceReel />
    </Frame>
  ),
};

export const CertificationsDesktop: Story = {
  render: () => (
    <Frame>
      <CertificationShowcase />
    </Frame>
  ),
};

export const CertificationsMobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile2" } },
  render: () => (
    <Frame>
      <CertificationShowcase />
    </Frame>
  ),
};

export const PhaseCards: Story = {
  render: () => (
    <Frame>
      <section className={styles.phaseCards} aria-label="Repair process stages">
        {processPhases.map((item) => (
          <article key={item.id}>
            <span>{item.label}</span>
            <h2>{item.heading}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </section>
    </Frame>
  ),
};

export const RepairTrackingDesktop: Story = {
  render: () => (
    <Frame>
      <RepairTrackingSection />
    </Frame>
  ),
};

export const RepairTrackingMobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile2" } },
  render: () => (
    <Frame>
      <RepairTrackingSection />
    </Frame>
  ),
};

export const RepairServicesDesktop: Story = {
  render: () => (
    <Frame>
      <RepairServicesSection />
    </Frame>
  ),
};

export const RepairServicesMobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile2" } },
  render: () => (
    <Frame>
      <RepairServicesSection />
    </Frame>
  ),
};

export const QuestionsDesktop: Story = {
  render: () => (
    <Frame>
      <QuestionsSection />
    </Frame>
  ),
};

export const QuestionsMobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile2" } },
  render: () => (
    <Frame>
      <QuestionsSection />
    </Frame>
  ),
};

export const RepairStartPosterStory: Story = {
  render: () => (
    <Frame>
      <RepairStartPoster />
    </Frame>
  ),
};

export const SceneFallback: Story = {
  render: () => (
    <Frame>
      <section className={styles.processStory} aria-labelledby="fallback-heading">
        <div className={styles.processStage}>
          <div className={styles.processHeading}>
            <span>Vehicle process study</span>
            <h2 id="fallback-heading">
              <span>Three stages.</span>{" "}
              <span className={styles.outlineText}>One continuous standard.</span>
            </h2>
          </div>
          <p className={styles.sceneFailure} role="alert">
            The live vehicle study is unavailable. The complete process remains below.
          </p>
        </div>
      </section>
    </Frame>
  ),
};
