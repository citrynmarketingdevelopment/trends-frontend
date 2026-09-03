import Image from "next/image";

import { BrandLogo } from "@/components/brand-logo";
import { QuestionsSection } from "./faq-section";
import styles from "./marketing-home.module.css";

export { QuestionsSection } from "./faq-section";

const TRACKING_PHOTO =
  "https://images.unsplash.com/photo-1574531404981-c5ba7947ea34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODc2MTEyMzZ8&ixlib=rb-4.1.0&q=80&w=1080";

const POSTER_PHOTO =
  "https://images.unsplash.com/photo-1500883859571-70b85e129372?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODc1OTcwNTl8&ixlib=rb-4.1.0&q=80&w=1080";

const repairStages = [
  "Intake",
  "Teardown",
  "Approval",
  "Refinish",
  "Quality control",
  "Hand-back",
] as const;

const trackingFeatures = [
  {
    title: "Current stage",
    body: "See the active repair phase and the next review at a glance.",
  },
  {
    title: "Repair context",
    body: "Keep the work area, approvals, and parts status together.",
  },
  {
    title: "Clear handoff",
    body: "Know what has been reviewed before the vehicle is returned.",
  },
] as const;

const repairServices = [
  {
    title: ["Body &", "Structure"],
    items: ["Dent repair & removal", "Auto body repair", "Aluminum repair"],
    image: "/images/repair-services/body-structure.webp",
  },
  {
    title: ["Paint &", "Finish"],
    items: ["Auto paint repair", "Paint scratch repair", "Fender repair"],
    image: "/images/repair-services/paint-finish.webp",
  },
  {
    title: ["Glass &", "Weather"],
    items: ["Auto glass repair", "Windshield replacement", "Hail damage repair"],
    image: "/images/repair-services/glass-weather.webp",
  },
  {
    title: ["Finishing", "& Safety"],
    items: ["Paintless dent repair", "Bumper repair", "ADAS calibrations"],
    image: "/images/repair-services/finishing-safety.webp",
  },
] as const;

const serviceHighlights = [
  "All makes & models",
  "Certified parts",
  "Payment options",
  "All insurers",
  "Waterborne paints",
  "Towing & rental",
] as const;

export function RepairTrackingSection() {
  return (
    <section className={styles.trackingSection} id="quality" aria-labelledby="tracking-heading">
      <div className={styles.trackingPhoto} aria-hidden="true">
        <Image src={TRACKING_PHOTO} alt="" fill sizes="(max-width: 768px) 100vw, 45vw" />
      </div>
      <div className={styles.trackingPhotoGrade} aria-hidden="true" />

      <div className={styles.trackingLayout}>
        <div className={styles.trackingIntroduction}>
          <p>The software we&apos;re building</p>
          <h2 id="tracking-heading" aria-label="Full visibility. Zero guesswork.">
            Full visibility.
            <span>Zero guesswork.</span>
          </h2>
          <span className={styles.trackingRule} aria-hidden="true" />
          <div className={styles.trackingBody}>
            <p>
              We&apos;re building a shop workflow platform that gives every vehicle one secure
              repair record. Intake photos, stages, approvals, supplements, assignments, documents,
              and update history stay connected from check-in through delivery.
            </p>
            <p>
              Staff can see the current owner and next action. Customers receive a private view of
              approved milestones, the latest public update, and any requested documents. This
              concept uses sample data, not a live customer file.
            </p>
          </div>
        </div>

        <div className={styles.trackingPanel} aria-label="Example repair progress">
          <dl className={styles.trackingMeta}>
            <div>
              <dt>File</dt>
              <dd>Process preview</dd>
            </div>
            <div>
              <dt>Vehicle</dt>
              <dd>Example vehicle</dd>
            </div>
            <div>
              <dt>Repair</dt>
              <dd>Rear quarter + bumper</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd className={styles.trackingStatus}>Refinish / 4 of 6</dd>
            </div>
          </dl>

          <ol className={styles.trackingStages}>
            {repairStages.map((stage, index) => (
              <li
                key={stage}
                data-complete={index < 3 || undefined}
                data-current={index === 3 || undefined}
              >
                <span>{index + 1}</span>
                <b>{stage}</b>
              </li>
            ))}
          </ol>

          <p className={styles.trackingNext}>
            <span>Next review</span>
            Polish + final inspection
          </p>
        </div>

        <div className={styles.trackingFeatures}>
          {trackingFeatures.map((feature, index) => (
            <article key={feature.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RepairServicesSection() {
  return (
    <section className={styles.repairServicesSection} aria-labelledby="repair-services-heading">
      <div className={styles.repairServicesInner}>
        <header className={styles.repairServicesHeader}>
          <div>
            <p>Four bays / Twelve services</p>
            <h2 id="repair-services-heading">Everything we do, under one roof.</h2>
          </div>
          <p>
            Insurance or cash, dealer or daily driver. The same standard and the same repair record
            follow every vehicle.
          </p>
        </header>

        <div className={styles.repairServicesRail}>
          {repairServices.map((service, index) => (
            <article className={styles.repairServiceCard} key={service.title.join(" ")}>
              <Image
                alt=""
                className={styles.repairServiceImage}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
                src={service.image}
              />
              <div className={styles.repairServiceGrade} aria-hidden="true" />
              <span className={styles.repairServiceNumber} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.repairServiceCopy}>
                <span className={styles.repairServiceAccent} aria-hidden="true" />
                <h3>
                  {service.title.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <footer className={styles.repairServicesFooter}>
          <p>
            Every service opens the same repair record. Photos, approvals, and sign-off travel with
            the vehicle.
          </p>
          <ul aria-label="Service capabilities">
            {serviceHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </footer>
      </div>
    </section>
  );
}

export function RepairStartPoster() {
  return (
    <section className={styles.repairPoster} id="start" aria-labelledby="start-heading">
      <Image className={styles.repairPosterImage} src={POSTER_PHOTO} alt="" fill sizes="100vw" />
      <div className={styles.repairPosterScrim} aria-hidden="true" />
      <div className={styles.repairPosterCopy}>
        <BrandLogo className={styles.repairPosterLogo} />
        <p>Start a repair</p>
        <h2 id="start-heading">Send us the damage.</h2>
        <p id="start-note">
          Photos, vehicle details, and claim information if available are enough to prepare for the
          first conversation. Contact details are pending approval in this prototype.
        </p>
        <div className={styles.repairPosterActions}>
          <button
            className={styles.primaryButton}
            type="button"
            disabled
            aria-describedby="start-note"
          >
            START A REPAIR
          </button>
          <a className={styles.secondaryButton} href="#faq">
            WHAT TO GATHER
          </a>
        </div>
      </div>
    </section>
  );
}

export function PostProcessSections() {
  return (
    <>
      <QuestionsSection />
      <RepairStartPoster />
    </>
  );
}
