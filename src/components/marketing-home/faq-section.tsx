"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import styles from "./marketing-home.module.css";

const questions = [
  {
    id: "insurance",
    category: "Insurance",
    question: "Do you work with insurance claims?",
    answer:
      "Yes. Collision repairs can be planned through an insurance claim or as a customer-pay repair.",
    facts: [
      ["Start", "Bring the claim number if one is available."],
      ["Estimate", "The repair plan is written after the vehicle is inspected."],
      ["Approval", "Carrier requirements are confirmed case by case."],
    ],
  },
  {
    id: "tracking",
    category: "Repair updates",
    question: "Can I track my vehicle while it is being repaired?",
    answer:
      "The site currently shows a process preview, not a live customer portal. Contact details for real repair updates are confirmed at intake.",
    facts: [
      ["Preview", "The on-page tracker is an example of the repair sequence."],
      ["Updates", "The shop confirms how repair updates will be shared."],
      ["Privacy", "No customer file is exposed on this homepage."],
    ],
  },
  {
    id: "roadside",
    category: "Recovery",
    question: "Do you offer towing or roadside service?",
    answer:
      "Recovery and transport needs can be discussed when you start a repair. Availability and timing must be confirmed for each request.",
    facts: [
      ["Request", "Share the vehicle location and its current condition."],
      ["Access", "Note whether the vehicle can roll, steer, and brake."],
      ["Timing", "Transport timing is confirmed before dispatch."],
    ],
  },
  {
    id: "alignment",
    category: "Road-ready geometry",
    question: "Do you handle tires and alignment?",
    answer:
      "Tire and alignment needs can be included in the vehicle assessment when they relate to the repair or road-ready geometry.",
    facts: [
      ["Inspect", "Visible tire, wheel, and suspension concerns are documented."],
      ["Measure", "Alignment needs are determined from the repair scope."],
      ["Review", "The final plan is confirmed before related work begins."],
    ],
  },
  {
    id: "custom",
    category: "Custom work",
    question: "Do you take custom work?",
    answer:
      "Custom refinish and restoration work can be discussed after the vehicle, finish, and project scope are reviewed.",
    facts: [
      ["Vehicle", "Start with the year, make, model, and current condition."],
      ["Direction", "Reference images help define the intended finish."],
      ["Scope", "Feasibility is confirmed after an initial review."],
    ],
  },
] as const;

export function QuestionsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeQuestion = questions[activeIndex] ?? questions[0];

  const selectQuestion = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (index + 1) % questions.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (index - 1 + questions.length) % questions.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = questions.length - 1;
    }

    if (nextIndex === undefined) return;
    event.preventDefault();
    selectQuestion(nextIndex);
  };

  return (
    <section className={styles.questionsSection} id="faq" aria-labelledby="faq-heading">
      <div className={styles.faqHeader}>
        <div className={styles.faqTitleGroup}>
          <p className={styles.faqEyebrow}>Before you bring it in</p>
          <h2 id="faq-heading" className={styles.faqHeading}>
            Questions are part <span>of the process.</span>
          </h2>
        </div>

        <div className={styles.faqIntroduction}>
          <p>
            Pick a question to see the answer. If yours is not here, use the repair start section to
            prepare for the first conversation.
          </p>
          <a className={styles.faqAllQuestions} href="#faq-index">
            VIEW ALL QUESTIONS
          </a>
        </div>
      </div>

      <div className={styles.faqBody}>
        <div
          className={styles.faqIndex}
          id="faq-index"
          role="tablist"
          aria-label="Frequently asked questions"
          aria-orientation="vertical"
        >
          {questions.map((item, index) => {
            const isActive = activeIndex === index;
            const number = String(index + 1).padStart(2, "0");

            return (
              <button
                className={styles.faqQuestion}
                data-active={isActive || undefined}
                id={`faq-tab-${item.id}`}
                key={item.id}
                type="button"
                role="tab"
                aria-controls="faq-detail"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span className={styles.faqActiveBar} aria-hidden="true" />
                <span className={styles.faqNumber} aria-hidden="true">
                  {number}
                </span>
                <span className={styles.faqQuestionText}>{item.question}</span>
                <span className={styles.faqQuestionMark} aria-hidden="true">
                  {isActive ? "" : "+"}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className={styles.faqDetail}
          id="faq-detail"
          role="tabpanel"
          aria-labelledby={`faq-tab-${activeQuestion.id}`}
          tabIndex={0}
        >
          <p className={styles.faqDetailLabel}>
            Answer {String(activeIndex + 1).padStart(2, "0")} / {activeQuestion.category}
          </p>
          <p className={styles.faqAnswer}>{activeQuestion.answer}</p>
          <dl className={styles.faqFacts}>
            {activeQuestion.facts.map(([term, description]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
          <a className={`${styles.primaryButton} ${styles.faqDetailCta}`} href="#start">
            START A REPAIR
          </a>
        </div>
      </div>
    </section>
  );
}
