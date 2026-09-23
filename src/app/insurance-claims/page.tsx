import Image from "next/image";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing-site/marketing-shell";
import { MarketingStructuredData } from "@/components/marketing-site/structured-data";
import { InsuranceLogoCarousel } from "@/components/marketing-site/insurance-logo-carousel";
import { PageHero } from "@/components/marketing-site/sections";
import site from "@/components/marketing-site/marketing-site.module.css";
import styles from "@/components/marketing-site/insurance-claims.module.css";
import { business } from "@/content/business";
import {
  claimFaqs,
  claimSteps,
  claimsSources,
  insuranceCompanies,
} from "@/content/insurance-claims";
import { pageSeo } from "@/content/seo";
import { marketingMetadata } from "@/lib/marketing-metadata";

export const metadata = marketingMetadata(
  pageSeo.insuranceClaims.title,
  pageSeo.insuranceClaims.description,
  "/insurance-claims",
);

export default function InsuranceClaimsPage() {
  return (
    <MarketingShell>
      <MarketingStructuredData
        path="/insurance-claims"
        name={pageSeo.insuranceClaims.heading}
        description={pageSeo.insuranceClaims.description}
      />

      <PageHero
        eyebrow="Insurance claims"
        title={"Insurance claims.\nA clear next step."}
        introduction="An accident is enough to deal with. Here’s how to start your insurance claim, choose Trends, and get your repair moving. You open the claim with your insurer; our team helps with the repair process."
        image="/images/insurance/insurance-hero-desktop.webp"
        mobileImage="/images/insurance/insurance-hero-mobile.webp"
        imageAlt="A collision repair technician assessing damage to a vehicle"
      />

      <section
        className={`${site.section} ${styles.insurers}`}
        id="insurance-companies"
        aria-labelledby="insurers-heading"
      >
        <div className={site.sectionHeading}>
          <div>
            <p className={site.label}>Start with your insurance company</p>
            <h2 id="insurers-heading">Your claim starts here.</h2>
          </div>
          <p className={styles.sectionIntro}>
            Use your insurer’s official claims page, app, or the number on your insurance card to
            report the incident.
          </p>
        </div>
        <InsuranceLogoCarousel />
        <div className={styles.insurerLinks} aria-label="Official insurance claims pages">
          {insuranceCompanies.map((company) => (
            <a href={company.href} key={company.name}>
              <span>{company.name} claims</span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <p className={styles.sourceNote}>
          Logos identify insurance companies and their claims resources. They do not indicate a
          partnership, endorsement, or preferred repair-network membership.
        </p>
      </section>

      <nav className={styles.pageNav} aria-label="On this page">
        <a href="#claim-steps">01 / Start a claim</a>
        <a href="#choose-trends">02 / Choose Trends</a>
        <a href="#vehicle-pickup">03 / Vehicle pickup</a>
        <a href="#claim-questions">04 / Common questions</a>
      </nav>

      <section
        className={`${site.section} ${site.process} ${styles.anchor}`}
        id="claim-steps"
        aria-labelledby="steps-heading"
      >
        <div className={site.sectionHeading}>
          <div>
            <p className={site.label}>First things first</p>
            <h2 id="steps-heading">
              From the first call
              <br />
              to the repair plan.
            </h2>
          </div>
          <p className={styles.sectionIntro}>
            Four steps to help you know who to contact, what to ask, and what comes next.
          </p>
        </div>
        <ol className={`${site.steps} ${styles.claimsSteps}`}>
          {claimSteps.map((step, index) => (
            <li key={step.title}>
              <span className={site.stepNumber}>Step {String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <p className={styles.sourceNote}>
          Before you report:{" "}
          <a href={claimsSources.filing}>
            Review State Farm’s general accident and claims checklist ↗
          </a>
        </p>
      </section>

      <section
        className={`${site.section} ${styles.preparation}`}
        aria-labelledby="prepare-heading"
      >
        <div>
          <p className={site.label}>Keep these close</p>
          <h2 id="prepare-heading">
            A little preparation.
            <br />A clearer conversation.
          </h2>
          <p className={styles.bodyCopy}>
            Gather what you can, then contact your insurer promptly. Ask how to provide any missing
            information later.
          </p>
          <aside className={styles.dmvNote}>
            <h3>A separate California requirement</h3>
            <p>
              California requires an SR-1 report to the DMV within 10 days when a crash causes any
              injury or death, or property damage over $1,000. This is separate from your insurance
              claim and any police report.
            </p>
            <a className={site.textLink} href={claimsSources.dmv}>
              Check the DMV requirements <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </div>
        <div className={styles.checklists}>
          <div>
            <h3>Have ready for your insurer</h3>
            <ul>
              <li>Your policy information and vehicle details</li>
              <li>When, where, and how the incident happened</li>
              <li>Photos of the damage and scene, if safe to take</li>
              <li>Other drivers’ details and any witness contacts</li>
              <li>Police report number, if one is available</li>
              <li>Your vehicle’s current location and condition</li>
            </ul>
          </div>
          <div>
            <h3>Ask your claims specialist</h3>
            <ul>
              <li>What is my claim number and who is my contact?</li>
              <li>How will you inspect the vehicle and review repairs?</li>
              <li>What deductible or other costs may I owe?</li>
              <li>Do I have rental coverage, and what are the limits?</li>
              <li>Is towing covered, and do I need approval first?</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        className={`${site.section} ${styles.choice} ${styles.anchor}`}
        id="choose-trends"
        aria-labelledby="choice-heading"
      >
        <div className={styles.choiceCopy}>
          <p className={site.label}>Your vehicle. Your repair shop.</p>
          <h2 id="choice-heading">
            Tell your insurance
            <br />
            specialist: Trends.
          </h2>
          <p className={styles.bodyCopy}>
            In California, your insurer cannot require you to use a particular repair shop. Tell
            your claims specialist where you want the work done and have them record your choice.
          </p>
          <a className={site.textLink} href={claimsSources.california}>
            Know your repair-shop rights <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className={styles.requestCard}>
          <p className={site.label}>Here’s a simple way to say it</p>
          <blockquote>
            “I’d like Trends Collision Center in Bakersfield to repair my vehicle. Please note my
            shop choice on the claim and let me know the next steps for inspection and sharing the
            estimate.”
          </blockquote>
          <div className={styles.shopDetails}>
            <strong>{business.name}</strong>
            <span>
              {business.street} · {business.locality}
            </span>
            <a href={business.phoneHref}>{business.phone}</a>
          </div>
        </div>
      </section>

      <section className={`${site.section} ${styles.support}`} aria-labelledby="support-heading">
        <div>
          <p className={site.label}>Once the claim is open</p>
          <h2 id="support-heading">
            You start the claim.
            <br />
            We help with the repair.
          </h2>
          <p className={styles.bodyCopy}>
            Bring us your claim number, adjuster’s details, and any estimate you already have. Our
            team can help you understand the work your vehicle needs.
          </p>
          <Link className={site.textLink} href="/services/collision">
            Explore collision repair <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <ol className={styles.supportList}>
          <li>
            <span>01</span>
            <div>
              <h3>Assess & document</h3>
              <p>
                We inspect the vehicle, document visible damage, and prepare a repair estimate. Your
                insurer may also need photos or its own inspection.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Coordinate & explain</h3>
              <p>
                With your permission, we share repair information with your adjuster. If hidden
                damage is found, we document it and submit a supplemental estimate for review.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Authorize & repair</h3>
              <p>
                We explain the repair plan and any changes for your authorization. Your insurer
                determines coverage and payment; you stay involved in repair decisions.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section
        className={`${styles.pickup} ${styles.anchor}`}
        id="vehicle-pickup"
        aria-labelledby="pickup-heading"
      >
        <div className={styles.pickupPhoto}>
          <Image
            src="/images/Fleet/roadside-towing-verticle.webp"
            alt="Trends tow truck ready for vehicle pickup"
            fill
            sizes="(max-width: 767px) 100vw, 45vw"
          />
        </div>
        <div className={styles.pickupCopy}>
          <p className={site.label}>One less thing to arrange</p>
          <h2 id="pickup-heading">
            We can pick
            <br />
            your vehicle up.
          </h2>
          <p>
            If your vehicle needs to come to Trends, call us to arrange pickup. Share its location,
            condition, and any access details so we can plan the right transport.
          </p>
          <ul>
            <li>Tell us whether the vehicle rolls, steers, and has keys.</li>
            <li>
              If it’s at a tow yard or another shop, ask about release requirements and storage
              charges.
            </li>
            <li>
              Confirm availability and pickup costs with Trends, and towing coverage with your
              insurer.
            </li>
          </ul>
          <div className={site.actions}>
            <a className={site.primary} href={business.phoneHref}>
              Arrange vehicle pickup <span aria-hidden="true">↗</span>
            </a>
            <Link className={site.secondary} href="/services/roadside">
              Towing & roadside
            </Link>
          </div>
          <p className={styles.pickupNote}>
            {business.phone} · {business.hours}. If the vehicle may be unsafe to drive, arrange a
            tow. Call 911 for an emergency.
          </p>
        </div>
      </section>

      <section
        className={`${site.section} ${site.split} ${site.faq} ${styles.anchor}`}
        id="claim-questions"
        aria-labelledby="questions-heading"
      >
        <div>
          <p className={site.label}>A little more clarity</p>
          <h2 id="questions-heading">
            Good questions.
            <br />
            Straight answers.
          </h2>
        </div>
        <div>
          {claimFaqs.map((faq) => (
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

      <aside className={styles.resources} aria-label="Official claims guidance">
        <p className={site.label}>Keep the official guidance handy</p>
        <div>
          <a href={claimsSources.california}>California insurance claims guide ↗</a>
          <a href={claimsSources.repairs}>California repair authorization rights ↗</a>
          <a href={claimsSources.dmv}>DMV accident reporting ↗</a>
        </div>
        <p>
          General guidance for California drivers. Your claims specialist can confirm the
          requirements, coverage, and deadlines that apply to your situation.
        </p>
      </aside>

      <section className={`${site.cta} ${styles.finalCta}`} aria-labelledby="unlisted-heading">
        <div>
          <p className={site.label}>Your choice goes beyond a logo</p>
          <h2 id="unlisted-heading">
            Don’t see your
            <br />
            insurance company?
          </h2>
        </div>
        <div>
          <p>
            You can still request Trends to repair your car. Tell your insurance specialist you want
            Trends Collision Center, then contact our team to discuss your vehicle and the next
            steps.
          </p>
          <div className={site.actions}>
            <Link className={site.primary} href="/contact?service=collision">
              Talk about your repair <span aria-hidden="true">↗</span>
            </Link>
            <a className={site.secondary} href={business.phoneHref}>
              {business.phone}
            </a>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
