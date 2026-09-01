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

export function RepairTrackingSection() {
  return (
    <section className={styles.trackingSection} id="quality" aria-labelledby="tracking-heading">
      <div className={styles.trackingPhoto} aria-hidden="true">
        <Image src={TRACKING_PHOTO} alt="" fill sizes="(max-width: 768px) 100vw, 45vw" />
      </div>
      <div className={styles.trackingPhotoGrade} aria-hidden="true" />

      <div className={styles.trackingLayout}>
        <div className={styles.trackingIntroduction}>
          <p>Repair progress preview</p>
          <h2 id="tracking-heading" aria-label="Full visibility. Zero guesswork.">
            Full visibility.
            <span>Zero guesswork.</span>
          </h2>
          <span className={styles.trackingRule} aria-hidden="true" />
          <p>
            This process preview shows how intake, repair planning, refinishing, and final review
            fit together. It does not display a live customer file.
          </p>
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
      <RepairTrackingSection />
      <QuestionsSection />
      <RepairStartPoster />
    </>
  );
}
