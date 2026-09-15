"use client";

import { useState } from "react";

import { processPhases } from "./process-state";
import styles from "./marketing-home.module.css";

type PhaseId = (typeof processPhases)[number]["id"];

// Desktop names the closing phase "Reveal"; the mobile stepper labels it "Hand back".
const stepLabels: Partial<Record<PhaseId, string>> = { reveal: "Hand back" };

function labelFor(phase: (typeof processPhases)[number]) {
  return stepLabels[phase.id] ?? phase.label;
}

export function ProcessStepsMobile() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePhase = processPhases[activeIndex] ?? processPhases[0]!;

  return (
    <section className={styles.mobileSteps} aria-labelledby="process-steps-heading">
      <p className={styles.mobileStepsEyebrow} id="process-steps-heading">
        The process
      </p>
      <ol className={styles.mobileStepRow}>
        {processPhases.map((phase, index) => (
          <li key={phase.id}>
            <button
              type="button"
              aria-controls="process-step-detail"
              aria-pressed={index === activeIndex}
              data-active={index === activeIndex || undefined}
              onClick={() => setActiveIndex(index)}
            >
              <span>{index + 1}</span>
              <b>{labelFor(phase)}</b>
            </button>
          </li>
        ))}
      </ol>
      <div
        aria-live="polite"
        className={styles.mobileStepDetail}
        id="process-step-detail"
        data-phase={activePhase.id}
      >
        <span>{labelFor(activePhase)}</span>
        <h3>{activePhase.heading}</h3>
        <p>{activePhase.body}</p>
      </div>
    </section>
  );
}
