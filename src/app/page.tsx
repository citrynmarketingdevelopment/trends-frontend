import Link from "next/link";
import { marketingClassName, MarketingFooter } from "@/components/marketing-site/marketing-shell";

import { BrandLogo } from "@/components/brand-logo";
import { CertificationShowcase } from "@/components/marketing-home/certification-showcase";
import { ExperienceProvider } from "@/components/marketing-home/experience-state";
import { HeroLogo3D } from "@/components/marketing-home/hero-logo-3d";
import { MarketingHeader } from "@/components/marketing-home/marketing-header";
import styles from "@/components/marketing-home/marketing-home.module.css";
import {
  FleetPartnerSection,
  PostProcessSections,
  RepairStartPoster,
  RepairServicesSection,
  RepairTrackingSection,
} from "@/components/marketing-home/post-process-sections";
import { ProcessStory } from "@/components/marketing-home/process-story";
import { ServiceReel } from "@/components/marketing-home/service-reel";
import { pageSeo } from "@/content/seo";
import { marketingMetadata } from "@/lib/marketing-metadata";
import { MarketingStructuredData } from "@/components/marketing-site/structured-data";

export const metadata = marketingMetadata(pageSeo.home.title, pageSeo.home.description, "/");

export default function Home() {
  return (
    <ExperienceProvider>
      <div className={marketingClassName} id="top">
        <MarketingHeader />
        <MarketingStructuredData
          path="/"
          name={pageSeo.home.heading}
          description={pageSeo.home.description}
        />

        <main id="main-content" tabIndex={-1}>
          <section className={styles.hero} aria-labelledby="hero-heading">
            <HeroLogo3D />
            <video
              aria-hidden="true"
              autoPlay
              className={styles.heroVideo}
              data-hero-video
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src="/videos/location-drone-hero.webm" type="video/webm" />
            </video>
            <div className={styles.heroScrim} aria-hidden="true" />
            <div className={styles.heroPoster}>
              <div className={styles.heroMark}>
                <BrandLogo className={styles.heroLogoBaseline} preload />
              </div>
              <h1 className={styles.heroSeoHeading} id="hero-heading">
                Auto Collision Center in Bakersfield
              </h1>
              <p aria-hidden="true" className={styles.heroDisplayTitle} data-hero-display-title>
                <span className={styles.outlineText}>Trends</span>
                <span>Collision Center</span>
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href="/contact">
                  START A REPAIR
                </Link>
                <Link className={styles.secondaryButton} href="/insurance-claims">
                  INSURANCE CLAIMS
                </Link>
              </div>
            </div>
            <div className={styles.heroFacts}>
              <span>Bakersfield, California</span>
              <span>Assessment / Restoration / Refinish / Final review</span>
            </div>
          </section>

          <ServiceReel />
          <RepairTrackingSection />
          <FleetPartnerSection />
          <CertificationShowcase />
          <RepairStartPoster />
          <ProcessStory />
          <RepairServicesSection />
          <PostProcessSections />
        </main>

        <MarketingFooter />
      </div>
    </ExperienceProvider>
  );
}
