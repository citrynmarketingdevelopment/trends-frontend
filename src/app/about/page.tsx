import Link from "next/link";
import Image from "next/image";
import { MarketingShell } from "@/components/marketing-site/marketing-shell";
import { ContactCta, PageHero } from "@/components/marketing-site/sections";
import styles from "@/components/marketing-site/marketing-site.module.css";
import { business } from "@/content/business";
import { marketingMetadata } from "@/lib/marketing-metadata";
import { pageSeo } from "@/content/seo";
import { MarketingStructuredData } from "@/components/marketing-site/structured-data";

export const metadata = marketingMetadata(pageSeo.about.title, pageSeo.about.description, "/about");

const values = [
  {
    title: "Quality in the details",
    body: "A repair is made up of many decisions. We take care with the assessment, preparation, and finishing details because the result should be work we are proud to put the Trends name behind.",
  },
  {
    title: "Trust through communication",
    body: "You deserve to understand the work being recommended. We discuss the repair scope, explain the next steps, and make room for your questions throughout the process.",
  },
  {
    title: "Complete vehicle care",
    body: "Body and paint work are part of a bigger picture. Mechanical service, tires, towing, and fleet repairs allow us to help with more of the needs that come with owning and operating a vehicle.",
  },
];
const gallery = [
  {
    image: "/images/services/348s (6).jpg",
    alt: "Technician refinishing a red vehicle panel",
    caption: "Care in every coat.",
  },
  {
    image: "/images/services/348s (4).jpg",
    alt: "Paint being measured and mixed in the workshop",
    caption: "The details behind the finish.",
  },
  {
    image: "/images/services/348s.jpg",
    alt: "Customized trucks and a classic car at a community event",
    caption: "A shared love for the automobile.",
  },
];

export default function AboutPage() {
  return (
    <MarketingShell>
      <MarketingStructuredData
        path="/about"
        name={pageSeo.about.heading}
        description={pageSeo.about.description}
      />
      <PageHero
        eyebrow="About Us"
        title={pageSeo.about.heading}
        introduction="Family owned and operated. Rooted in Bakersfield. Built around quality, trust, and care for the whole vehicle."
        image="/images/repair-services/paint-finish.webp"
        imageAlt="Automotive paint and body repair"
        compact
      />
      <section className={`${styles.section} ${styles.split}`} aria-labelledby="story-title">
        <div>
          <p className={styles.label}>More than a collision center</p>
          <h2 id="story-title">
            Work we’re proud
            <br />
            to put our name on.
          </h2>
        </div>
        <div className={styles.storyCopy}>
          <p className={styles.lead}>
            Every vehicle belongs to someone who depends on it. That’s where our approach begins.
          </p>
          <p>
            As a family-owned and operated business, Trends Collision Center takes pride in treating
            every vehicle as if it were our own. We serve the Bakersfield and Kern County community
            with quality workmanship, dependable service, and attention to detail.
          </p>
          <p>
            We are an I-CAR Gold Class collision center with multiple manufacturer certifications.
            That commitment to training and proper repair procedures supports how we approach the
            work, from the first inspection to the final review.
          </p>
          <p>
            Our customers include individual drivers, dealerships, and commercial fleets. Their
            needs may be different, but our goal is the same: understand the vehicle, communicate
            clearly, and deliver work we are proud to stand behind.
          </p>
          <Link className={styles.textLink} href="/#certifications">
            Explore our credentials <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className={`${styles.section} ${styles.values}`} aria-labelledby="values-title">
        <p className={styles.label}>What makes Trends, Trends</p>
        <h2 id="values-title">
          Quality. Trust.
          <br />
          Complete vehicle care.
        </h2>
        <div className={styles.valueGrid}>
          {values.map((value, index) => (
            <article key={value.title}>
              <span className={styles.stepNumber}>0{index + 1}</span>
              <h3>{value.title}</h3>
              <p>{value.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.section} aria-labelledby="workshop-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.label}>Inside our world</p>
            <h2 id="workshop-title">People. Process. Pride.</h2>
          </div>
          <p className={styles.muted}>
            A closer look at the craft
            <br />
            and the community around it.
          </p>
        </div>
        <div className={styles.gallery}>
          {gallery.map((photo) => (
            <figure key={photo.image}>
              <Image
                src={photo.image}
                alt={photo.alt}
                width={348}
                height={348}
                sizes="(max-width: 640px) 85vw, 348px"
              />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className={`${styles.section} ${styles.split}`} aria-labelledby="care-title">
        <div>
          <p className={styles.label}>Your complete repair partner</p>
          <h2 id="care-title">
            Beyond body
            <br />
            and paint.
          </h2>
        </div>
        <div className={styles.storyCopy}>
          <p>
            From collision repairs and restoration to steering and suspension, tires, towing, and
            fleet work, we help you look after the whole vehicle. Dealerships and business owners
            can also discuss coordinated repair and maintenance needs with our team.
          </p>
          <p>
            For a more personal finish, we offer project consultations for chrome delete
            application, grille customization, vertical door installation, wheel and rim
            customization, and lift or leveling kits. Each project starts with a review of the
            vehicle, fitment, and intended result.
          </p>
          <Link className={styles.textLink} href="/services">
            Explore all services <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className={styles.socialSection}>
        <p className={styles.label}>Stay connected</p>
        <h2>Follow the work.</h2>
        <p>Workshop moments, vehicle projects, and life around Trends.</p>
        <div className={styles.socialLinks}>
          {business.socials.map((social) => (
            <Link key={social.label} href={social.href} target="_blank" rel="noreferrer">
              {social.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <ContactCta />
    </MarketingShell>
  );
}
