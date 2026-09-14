import Link from "next/link";
import Image from "next/image";
import { MarketingShell } from "@/components/marketing-site/marketing-shell";
import { ContactCta, PageHero } from "@/components/marketing-site/sections";
import styles from "@/components/marketing-site/marketing-site.module.css";
import { services } from "@/content/services";
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
        introduction="From the first assessment to the final detail, your vehicle deserves a team that sees the whole picture. Explore the five ways we help Bakersfield stay on the road."
        image="/images/repair-services/paint-finish.webp"
        imageAlt="Automotive refinishing and repair"
        compact
      />
      <section className={styles.section} aria-labelledby="services-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.label}>Five disciplines / One repair partner</p>
            <h2 id="services-title">What brings you in?</h2>
          </div>
          <p className={styles.muted}>
            For your daily driver.
            <br />
            For your business. For the road ahead.
          </p>
        </div>
        <div className={styles.serviceList}>
          {services.map((service, index) => (
            <Link
              className={styles.serviceRow}
              key={service.slug}
              href={`/services/${service.slug}`}
            >
              <span className={styles.rowNumber}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
              </div>
              <Image
                src={service.detailImage}
                alt=""
                width={174}
                height={174}
                sizes="(max-width: 640px) 80px, 174px"
              />
              <span className={styles.rowArrow} aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>
      <ContactCta />
    </MarketingShell>
  );
}
