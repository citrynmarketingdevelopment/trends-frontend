import Link from "next/link";
import { MarketingShell } from "@/components/marketing-site/marketing-shell";
import styles from "@/components/marketing-site/marketing-site.module.css";
import { business } from "@/content/business";
import { ContactForm } from "@/features/contact/contact-form";
import { isContactEmailConfigured } from "@/features/contact/mail";
import { serviceChoices } from "@/features/contact/schema";
import { marketingMetadata } from "@/lib/marketing-metadata";
import { pageSeo } from "@/content/seo";
import { MarketingStructuredData } from "@/components/marketing-site/structured-data";

export const dynamic = "force-dynamic";
export const metadata = marketingMetadata(
  pageSeo.contact.title,
  pageSeo.contact.description,
  "/contact",
);

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const requested = (await searchParams).service;
  const service = serviceChoices.find((value) => value === requested) ?? "general";
  return (
    <MarketingShell>
      <MarketingStructuredData
        path="/contact"
        name={pageSeo.contact.heading}
        description={pageSeo.contact.description}
      />
      <header className={styles.contactHeader}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Contact Us</span>
        </nav>
      </header>
      <section
        className={`${styles.section} ${styles.contactLayout}`}
        aria-labelledby="inquiry-title"
      >
        <div>
          <p className={styles.label}>Start a conversation</p>
          <h1 id="inquiry-title">Tell us what brings you in.</h1>
          <ContactForm available={isContactEmailConfigured()} initialService={service} />
        </div>
        <aside className={styles.contactAside} aria-label="Shop contact information">
          <div>
            <h2>Talk to the team</h2>
            <Link className={styles.phoneLink} href={business.phoneHref}>
              {business.phone}
            </Link>
            <p>
              <Link href={`mailto:${business.email}`}>{business.email}</Link>
            </p>
          </div>
          <div>
            <h2>Find Trends</h2>
            <address>
              {business.name}
              <br />
              {business.street}
              <br />
              {business.locality}
            </address>
            <Link
              className={styles.textLink}
              href={business.directions}
              target="_blank"
              rel="noreferrer"
            >
              Get directions <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div>
            <h2>Shop hours</h2>
            <p>
              {business.hours}
              <br />
              {business.closed}
            </p>
          </div>
          <div>
            <h2>Roadside or towing?</h2>
            <p>
              Call to confirm availability, destination, and timing. Online inquiries are reviewed
              during business hours and do not dispatch assistance.
            </p>
          </div>
          <div>
            <h2>What happens next</h2>
            <p>
              We review your inquiry, contact you to discuss the vehicle, and arrange an assessment
              if needed. An inspection helps establish the scope, estimate, and schedule.
            </p>
          </div>
          <div>
            <h2>Follow Trends</h2>
            <div className={styles.socials}>
              {business.socials.map((social) => (
                <Link href={social.href} key={social.label} target="_blank" rel="noreferrer">
                  {social.label} ↗
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </MarketingShell>
  );
}
