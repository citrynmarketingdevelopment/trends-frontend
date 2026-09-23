"use client";

import Image from "next/image";
import { useState } from "react";
import { insuranceCompanies } from "@/content/insurance-claims";
import homeStyles from "@/components/marketing-home/marketing-home.module.css";
import styles from "./insurance-claims.module.css";

export function InsuranceLogoCarousel() {
  const [paused, setPaused] = useState(false);

  return (
    <div className={styles.insurerRail}>
      <div className={styles.railHeading}>
        <h3>Major insurance companies</h3>
        <button
          className={styles.motionToggle}
          type="button"
          aria-label={paused ? "Resume insurance logos" : "Pause insurance logos"}
          onClick={() => setPaused((value) => !value)}
        >
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
          {paused ? "Play" : "Pause"}
        </button>
      </div>
      <div className={`${homeStyles.dealerLogoViewport} ${styles.logoViewport}`}>
        <div
          className={homeStyles.dealerLogoTrack}
          data-insurance-logo-track
          style={paused ? { animationPlayState: "paused" } : undefined}
        >
          {[0, 1].map((copy) => (
            <ul
              className={homeStyles.dealerLogoGroup}
              aria-hidden={copy === 1 || undefined}
              key={copy}
            >
              {insuranceCompanies.map((company) => (
                <li key={company.name}>
                  <Image
                    src={company.image}
                    alt={copy === 0 ? company.name : ""}
                    fill
                    sizes="(max-width: 767px) 7rem, 9rem"
                    className={`${homeStyles.dealerLogo} ${company.name === "Farmers" ? homeStyles.dealerLogoNegative : ""}`}
                    unoptimized={company.image.endsWith(".svg")}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
