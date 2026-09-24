import { MarketingShell } from "@/components/marketing-site/marketing-shell";
import { ContactCta, PageHero } from "@/components/marketing-site/sections";
import styles from "@/components/marketing-site/marketing-site.module.css";
import { RepairServicesSection } from "@/components/marketing-home/post-process-sections";
import { completeSolutions } from "@/content/services";
import { marketingMetadata } from "@/lib/marketing-metadata";
import { pageSeo } from "@/content/seo";
import { MarketingStructuredData } from "@/components/marketing-site/structured-data";

export const metadata = marketingMetadata(
  pageSeo.services.title,
  pageSeo.services.description,
  "/services",
);

export default function ServicesPage() {
  return (
    <MarketingShell>
      <MarketingStructuredData
        path="/services"
        name={pageSeo.services.heading}
        description={pageSeo.services.description}
      />
      <PageHero
        eyebrow="Services"
        title={pageSeo.services.heading}
        introduction="Complete, dependable vehicle solutions for individuals, businesses, dealerships, and fleets, all under one trusted name. Explore the five ways we help Bakersfield stay on the road."
        image="/images/repair-services/paint-finish.webp"
        imageAlt="Automotive refinishing and repair"
        compact
      />
      <RepairServicesSection />
      <section className={`${styles.section} ${styles.values}`} aria-labelledby="solutions-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.label}>Under one trusted name</p>
            <h2 id="solutions-title">Everything we look after.</h2>
          </div>
          <p className={styles.muted}>
            From collision repair and refinishing to
            <br />
            tires, towing, and roadside assistance.
          </p>
        </div>
        <ul className={styles.solutionList}>
          {completeSolutions.map((solution) => (
            <li key={solution.title}>
              <h3>{solution.title}</h3>
              <p>{solution.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <ContactCta />
    </MarketingShell>
  );
}
