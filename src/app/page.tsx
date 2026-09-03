import type { Metadata } from "next";
import { Barlow_Condensed, DM_Mono, Instrument_Serif, Manrope } from "next/font/google";

import { BrandLogo } from "@/components/brand-logo";
import { CertificationShowcase } from "@/components/marketing-home/certification-showcase";
import { ExperienceProvider } from "@/components/marketing-home/experience-state";
import { HeroLogo3D } from "@/components/marketing-home/hero-logo-3d";
import { MarketingHeader } from "@/components/marketing-home/marketing-header";
import styles from "@/components/marketing-home/marketing-home.module.css";
import {
  PostProcessSections,
  RepairServicesSection,
  RepairTrackingSection,
} from "@/components/marketing-home/post-process-sections";
import { ProcessStory } from "@/components/marketing-home/process-story";
import { ServiceReel } from "@/components/marketing-home/service-reel";
import { getSiteOrigin } from "@/lib/env/site-origin";

const body = Manrope({
  variable: "--font-trends-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const display = Barlow_Condensed({
  variable: "--font-trends-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800", "900"],
});

const mono = DM_Mono({
  variable: "--font-trends-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const editorial = Instrument_Serif({
  variable: "--font-trends-editorial",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const title = "Trends Collision Center | Precision After Impact";
const description =
  "A cinematic look at collision repair assessment, restoration, refinishing, and final review in Bakersfield, California.";
const siteOrigin = getSiteOrigin();

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  ...(siteOrigin
    ? {
        alternates: { canonical: "/" },
        openGraph: { title, description, type: "website", url: "/" },
      }
    : {}),
};

export default function Home() {
  return (
    <ExperienceProvider>
      <div
        className={`${styles.marketing} ${body.variable} ${display.variable} ${mono.variable} ${editorial.variable}`}
        id="top"
      >
        <MarketingHeader />

        <main id="main-content" tabIndex={-1}>
          <section className={styles.hero} aria-labelledby="hero-heading">
            <HeroLogo3D />
            <div className={styles.heroScrim} aria-hidden="true" />
            <div className={styles.heroPoster}>
              <div className={styles.heroMark}>
                <BrandLogo className={styles.heroLogoBaseline} preload />
              </div>
              <p className={styles.eyebrow}>Collision · Restoration · Refinement</p>
              <h1 id="hero-heading" aria-label="Trends Auto Collision">
                <span className={styles.outlineText}>Trends</span>
                <span>Auto Collision</span>
              </h1>
              <p className={styles.heroSupport}>
                More than repairing what was damaged. We bring every line, finish, and detail back
                together until the repair disappears.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="#start">
                  START A REPAIR
                </a>
                <a className={styles.secondaryButton} href="#process">
                  OUR PROCESS
                </a>
              </div>
            </div>
            <div className={styles.heroFacts}>
              <span>Bakersfield, California</span>
              <span>Assessment / Restoration / Refinish / Final review</span>
            </div>
          </section>

          <ServiceReel />

          <RepairTrackingSection />
          <ProcessStory />
          <CertificationShowcase />
          <RepairServicesSection />
          <PostProcessSections />
        </main>

        <footer className={styles.footer}>
          <a href="#top" className={styles.footerBrand} aria-label="Return to the top">
            <BrandLogo className={styles.footerLogo} />
            <span>Trends Collision Center</span>
          </a>
          <p>Collision repair process prototype for Bakersfield, California.</p>
          <div>
            <a href="#process">Process</a>
            <a href="#services">Services</a>
            <a href="#faq">FAQ</a>
            <a href="#start">Start a repair</a>
          </div>
        </footer>
      </div>
    </ExperienceProvider>
  );
}
