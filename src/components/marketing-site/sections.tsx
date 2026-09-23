import Link from "next/link";
import Image, { getImageProps } from "next/image";
import { business } from "@/content/business";
import type { Service } from "@/content/services";
import { serviceSeo } from "@/content/seo";
import homeStyles from "@/components/marketing-home/marketing-home.module.css";
import styles from "./marketing-site.module.css";

export function PageHero({
  eyebrow,
  title,
  introduction,
  image,
  mobileImage,
  imageAlt,
  service,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  image: string;
  mobileImage?: string | undefined;
  imageAlt: string;
  service?: string;
  compact?: boolean;
}) {
  const roadside = service === "roadside";
  const localTitle = title.endsWith(" in Bakersfield");
  const heroTitle = localTitle ? title.replace(/ in Bakersfield$/, "") : title;
  const desktopImageProps = mobileImage
    ? getImageProps({
        src: image,
        alt: imageAlt,
        fill: true,
        sizes: "100vw",
        loading: "eager",
        fetchPriority: "high",
        className: styles.heroImage,
      }).props
    : null;
  const mobileImageSet = mobileImage
    ? getImageProps({ src: mobileImage, alt: imageAlt, fill: true, sizes: "100vw" }).props.srcSet
    : null;
  return (
    <section
      className={styles.hero}
      data-compact={compact || undefined}
      data-service={service || undefined}
      aria-labelledby="page-heading"
    >
      {desktopImageProps && mobileImageSet ? (
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileImageSet} sizes="100vw" />
          {/* getImageProps keeps both art-directed sources optimized by Next.js. */}
          <img {...desktopImageProps} alt={imageAlt} />
        </picture>
      ) : (
        <Image src={image} alt={imageAlt} fill preload sizes="100vw" className={styles.heroImage} />
      )}
      <div className={styles.heroShade} />
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          {service && (
            <>
              <Link href="/services">Services</Link>
              <span aria-hidden="true">/</span>
            </>
          )}
          <span aria-current="page">{eyebrow}</span>
        </nav>
        <div className={styles.heroBottom}>
          <div>
            <p className={styles.label}>Bakersfield / Kern County</p>
            <h1 id="page-heading">
              {heroTitle}
              {localTitle && (
                <>
                  {" "}
                  <span className={styles.heroLocation}>in Bakersfield</span>
                </>
              )}
            </h1>
            <p className={styles.heroIntroduction}>{introduction}</p>
          </div>
          <div className={styles.actions}>
            <Link
              className={styles.primary}
              href={
                roadside ? business.phoneHref : service ? `/contact?service=${service}` : "/contact"
              }
            >
              {roadside ? "Call for assistance" : "Let’s talk about your vehicle"}
              <span aria-hidden="true">↗</span>
            </Link>
            <Link
              className={styles.secondary}
              href={roadside ? "/contact?service=roadside" : business.phoneHref}
            >
              {roadside ? "Non-urgent inquiry" : business.phone}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceProcess({ service }: { service: Service }) {
  return (
    <section className={`${styles.section} ${styles.process}`} aria-labelledby="process-title">
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.label}>A clear path forward</p>
          <h2 id="process-title">
            The procedure.
            <br />
            In the order it happens.
          </h2>
        </div>
        <span className={styles.smallNote}>01—04 / {service.name}</span>
      </div>
      <ol className={styles.steps}>
        {service.process.map((step, index) => (
          <li key={step.title}>
            <span className={styles.stepNumber}>Step {String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ServiceFeature({ service }: { service: Service }) {
  const fleetPhoto = service.slug === "fleet-maintenance";
  return (
    <section
      className={styles.feature}
      data-portrait={fleetPhoto || undefined}
      aria-labelledby="feature-title"
    >
      <div className={styles.featurePhoto}>
        <Image
          src={
            fleetPhoto
              ? "/images/Fleet/IMG_4700.jpeg"
              : service.slug === "collision"
                ? "/images/services/collision-service-detail.jpg"
                : service.image
          }
          alt=""
          fill
          sizes={fleetPhoto ? "(max-width: 767px) 100vw, 42vw" : "100vw"}
        />
        <div />
      </div>
      <div className={styles.featureInner}>
        <div>
          <p className={styles.label}>The details make the difference</p>
          <h2 id="feature-title">{service.featureTitle}</h2>
          <p>{service.featureBody}</p>
          <Link className={styles.textLink} href={`/contact?service=${service.slug}`}>
            Discuss your vehicle <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ServiceCapabilities({ service }: { service: Service }) {
  const photoSets: Record<string, string[]> = {
    collision: [
      "/images/Collision/IMG_7732_jpg.jpeg",
      "/images/Collision/IMG_4697.jpeg",
      "/images/Paint/IMG_4720.jpeg",
      "/images/Collision/IMG_4714.jpeg",
    ],
    mechanical: [
      service.detailImage,
      service.image,
      "/images/services/348s (7).jpg",
      service.detailImage,
    ],
    roadside: [
      "/images/Fleet/roadside-towing-verticle.webp",
      "/images/Fleet/Towing.webp",
      "/images/Fleet/Vehicle-recovery.webp",
      "/images/Fleet/Shop-fleet.webp",
    ],
    "tires-alignment": [
      service.detailImage,
      service.image,
      "/images/services/348s (1).jpg",
      "/images/services/348s (3).jpg",
    ],
    "fleet-maintenance": [
      "/images/Fleet/IMG_4702.jpeg",
      "/images/Fleet/IMG_4701.jpeg",
      "/images/Fleet/IMG_4700.jpeg",
      "/images/Fleet/DSC09769.jpeg",
    ],
  };
  const photos = photoSets[service.slug]!;
  // Services carry different numbers of subservices, so wrap rather than run off the end.
  const photoFor = (index: number) => photos[index % photos.length]!;
  return (
    <section className={homeStyles.repairServicesSection} aria-labelledby="capabilities-title">
      <div className={homeStyles.repairServicesInner}>
        <header className={homeStyles.repairServicesHeader}>
          <div>
            <p>Also in-house / {service.name}</p>
            <h2 id="capabilities-title">{serviceSeo[service.slug].servicesHeading}</h2>
          </div>
          <p>Focused care, clear communication, and one team for the work your vehicle needs.</p>
        </header>
        <div className={homeStyles.repairServicesRail}>
          {service.subservices.map((item, index) => (
            <article className={homeStyles.repairServiceCard} key={item.title}>
              <Image
                className={homeStyles.repairServiceImage}
                src={photoFor(index)}
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
              />
              <div className={homeStyles.repairServiceGrade} aria-hidden="true" />
              <span className={homeStyles.repairServiceNumber} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={homeStyles.repairServiceCopy}>
                <span className={homeStyles.repairServiceAccent} aria-hidden="true" />
                <h3>
                  {item.title.split(" & ").map((line, lineIndex, lines) => (
                    <span key={line}>{lineIndex < lines.length - 1 ? `${line} &` : line}</span>
                  ))}
                </h3>
                <ul>
                  <li>
                    <span aria-hidden="true" />
                    {item.body}
                  </li>
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceChecklist({ service }: { service: Service }) {
  const { checklist } = service;
  if (!checklist) return null;
  return (
    <section className={styles.section} aria-labelledby="checklist-title">
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.label}>
            {service.name} / {checklist.items.length} services
          </p>
          <h2 id="checklist-title">{checklist.title}</h2>
        </div>
        <p className={styles.muted}>{checklist.note}</p>
      </div>
      <ul className={styles.solutionList}>
        {checklist.items.map((item) => (
          <li key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ServiceExperience({ service }: { service: Service }) {
  const steps = [
    {
      title: "First contact",
      body: "Tell us about the vehicle and what you need. We’ll explain how to arrange the next step.",
    },
    {
      title: service.slug === "roadside" ? "Location and availability" : "A closer look",
      body:
        service.slug === "roadside"
          ? "We discuss your location, vehicle access, and available transport options by phone."
          : "An assessment helps us understand the concern and prepare recommendations for your review.",
    },
    {
      title: "A plan you understand",
      body: "We discuss the scope, estimate, and approvals. Ask questions before agreeing to the work.",
    },
    {
      title: "Communication along the way",
      body: "The team discusses changes that affect the work or schedule. Contact the shop when you need an update.",
    },
    {
      title: "A clear handoff",
      body: "We review what was done and explain the next steps for your vehicle.",
    },
  ];
  return (
    <section className={`${styles.section} ${styles.split}`} aria-labelledby="experience-title">
      <div>
        <p className={styles.label}>Your experience</p>
        <h2 id="experience-title">
          Clear answers.
          <br />
          From the first conversation.
        </h2>
        <p className={styles.muted}>
          You should understand what’s happening with your vehicle, and what comes next.
        </p>
      </div>
      <div className={styles.capabilities}>
        {steps.map((step, index) => (
          <article key={step.title}>
            <span>{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ServiceFaq({ service }: { service: Service }) {
  return (
    <section
      className={`${styles.section} ${styles.split} ${styles.faq}`}
      aria-labelledby="faq-title"
    >
      <div>
        <p className={styles.label}>Before you visit</p>
        <h2 id="faq-title">
          Good questions.
          <br />
          Straight answers.
        </h2>
        <p className={styles.muted}>A little clarity makes the next step easier.</p>
      </div>
      <div>
        {service.faqs.map((faq) => (
          <details key={faq.question}>
            <summary>
              {faq.question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ContactCta({ service }: { service?: string }) {
  return (
    <section className={styles.cta}>
      <div>
        <p className={styles.label}>Your vehicle. Our next conversation.</p>
        <h2>
          Let’s get you
          <br />
          moving forward.
        </h2>
      </div>
      <div>
        <p>
          A question, a repair, or a fleet to look after.
          <br />
          It starts with a conversation.
        </p>
        <div className={styles.actions}>
          <Link
            className={styles.primary}
            href={service ? `/contact?service=${service}` : "/contact"}
          >
            Contact Trends <span aria-hidden="true">↗</span>
          </Link>
          <Link className={styles.secondary} href={business.phoneHref}>
            {business.phone}
          </Link>
        </div>
      </div>
    </section>
  );
}
