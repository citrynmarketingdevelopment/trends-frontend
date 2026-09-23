import Link from "next/link";
import Image from "next/image";
import { MarketingShell } from "@/components/marketing-site/marketing-shell";
import { ContactCta, PageHero } from "@/components/marketing-site/sections";
import styles from "@/components/marketing-site/marketing-site.module.css";
import { business } from "@/content/business";
import { completeSolutions } from "@/content/services";
import { marketingMetadata } from "@/lib/marketing-metadata";
import { pageSeo } from "@/content/seo";
import { MarketingStructuredData } from "@/components/marketing-site/structured-data";

export const metadata = marketingMetadata(pageSeo.about.title, pageSeo.about.description, "/about");

const values = [
  {
    title: "Quality workmanship",
    body: "Our reputation has been built on the standard of the work itself. Whether we are repairing one vehicle or supporting an entire fleet, we approach every job with the same standard of care and attention to detail.",
  },
  {
    title: "Certified expertise",
    body: "Training and proper repair procedures sit behind the decisions we make on every vehicle. Certified expertise is how we make sure a repair is done right, not simply finished.",
  },
  {
    title: "Complete vehicle solutions",
    body: "Collision repair and refinishing, mechanical services, tires, towing, and roadside assistance. Our team is equipped to handle your vehicle needs under one trusted name.",
  },
];
const gallery = [
  {
    image: "/images/Collision/IMG_7732_jpg.jpeg",
    alt: "Trends technician carefully working on the front panel of a white car",
    caption: "Care in every repair.",
  },
  {
    image: "/images/Paint/IMG_4725.jpeg",
    alt: "Painter spraying a red vehicle panel in the paint booth",
    caption: "Precision in every coat.",
  },
  {
    image: "/images/Fleet/IMG_4701.jpeg",
    alt: "Fleet service truck raised for wheel and brake work at Trends",
    caption: "One team for every vehicle.",
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
        introduction="More than a repair facility. A complete automotive service partner built on quality, trust, and a commitment to doing things the right way."
        image="/images/repair-services/paint-finish.webp"
        imageAlt="Automotive paint and body repair"
        compact
      />
      <section className={`${styles.section} ${styles.split}`} aria-labelledby="story-title">
        <div>
          <p className={styles.label}>Who we are</p>
          <h2 id="story-title">
            More than
            <br />a repair facility.
          </h2>
        </div>
        <div className={styles.storyCopy}>
          <p className={styles.lead}>
            Trends Collision Center is more than a repair facility — we are a complete automotive
            service partner built on quality, trust, and a commitment to doing things the right way.
          </p>
          <p>
            Based in Bakersfield, California, we provide comprehensive vehicle solutions for
            individual customers, businesses, dealerships, and fleets. From collision repair and
            refinishing to mechanical services, tires, towing, and roadside assistance, our team is
            equipped to handle your vehicle needs under one trusted name.
          </p>
          <p>
            Our reputation has been built through quality workmanship, certified expertise,
            dependable service, and long-term relationships with the people and businesses we serve.
            Whether we’re repairing one vehicle or supporting an entire fleet, we approach every job
            with the same standard of care and attention to detail.
          </p>
          <p>
            As we continue to grow, our purpose remains the same: deliver exceptional service, stand
            behind our work, and become the automotive partner our customers can depend on for the
            road ahead.
          </p>
          <Link className={styles.textLink} href="/#certifications">
            Explore our credentials <span aria-hidden="true">↗</span>
          </Link>
          <figure className={styles.shopFigure}>
            <Image
              src="/images/The%20Shop/IMG_4414.jpeg"
              alt="Exterior of Trends Collision Center in Bakersfield"
              width={1206}
              height={669}
              sizes="(max-width: 767px) 100vw, 60vw"
            />
            <figcaption>Trends Collision Center / Bakersfield, California</figcaption>
          </figure>
        </div>
      </section>
      <section className={`${styles.section} ${styles.split}`} aria-labelledby="mission-title">
        <div>
          <p className={styles.label}>Mission statement</p>
          <h2 id="mission-title">
            More Than
            <br />
            Collision.
          </h2>
        </div>
        <div className={styles.storyCopy}>
          <p className={styles.lead}>
            At Trends Collision Center, our mission is to be More Than Collision.
          </p>
          <p>
            We are committed to providing complete, dependable vehicle solutions for individuals,
            businesses, dealerships, and fleets — all under one trusted name. From collision repair
            and refinishing to mechanical services, tires, towing, and roadside assistance, our goal
            is to make vehicle care simple, reliable, and professional.
          </p>
          <p>
            Built on quality workmanship, certified expertise, and a commitment to our customers,
            Trends Collision Center strives to set a higher standard for the automotive industry.
          </p>
          <p className={styles.missionPledge}>
            One team. One trusted partner. Complete vehicle solutions.
          </p>
        </div>
      </section>
      <section className={`${styles.section} ${styles.values}`} aria-labelledby="values-title">
        <p className={styles.label}>What Trends is built on</p>
        <h2 id="values-title">
          Quality. Expertise.
          <br />
          Complete vehicle solutions.
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
      <section className={styles.feature} aria-labelledby="materials-title">
        <div className={styles.featurePhoto}>
          <Image src="/images/services/348s (4).jpg" alt="" fill sizes="100vw" />
          <div />
        </div>
        <div className={styles.featureInner}>
          <div>
            <p className={styles.label}>Premium materials</p>
            <h2 id="materials-title">Quality starts with what we use.</h2>
            <p>
              For paint, we use Glasurit, a premium automotive refinish paint brand with over 100
              years of history. It’s known for its exceptional durability, gloss, and extensive
              approvals from vehicle manufacturers.
            </p>
            <p>
              We invest in top-of-the-line refinishing materials because our customers’ vehicles
              deserve a beautiful, long-lasting finish. For added confidence, our paint workmanship
              is backed by a Limited Lifetime Warranty, giving our customers peace of mind long
              after their vehicle leaves our facility.
            </p>
            <Link className={styles.textLink} href="/services/collision">
              See our paint &amp; refinishing work <span aria-hidden="true">↗</span>
            </Link>
          </div>
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
              <div className={styles.galleryFrame}>
                <Image
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 767px) 85vw, (max-width: 1100px) 30vw, 348px"
                />
              </div>
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className={styles.section} aria-labelledby="solutions-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.label}>Under one trusted name</p>
            <h2 id="solutions-title">Complete vehicle solutions.</h2>
          </div>
          <p className={styles.muted}>
            For individuals, businesses,
            <br />
            dealerships, and fleets.
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
        <Link className={styles.textLink} href="/services">
          Explore all services <span aria-hidden="true">↗</span>
        </Link>
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
