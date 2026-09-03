"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./certification-showcase.module.css";

type CertificationCategory = "oem" | "training" | "network";
type CertificationFilter = "all" | CertificationCategory;

type CertificationItem = {
  id: string;
  title: string;
  category: CertificationCategory;
  asset: string;
  issuer: string;
  record: string;
  description: string;
  details: readonly string[];
};

const categoryLabels: Record<CertificationCategory, string> = {
  oem: "OEM certifications",
  training: "Training",
  network: "Insurance / network",
};

const filterOptions: ReadonlyArray<{ value: CertificationFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "oem", label: "OEM certifications" },
  { value: "training", label: "Training" },
  { value: "network", label: "Insurance / network" },
];

const certificationItems: readonly CertificationItem[] = [
  {
    id: "icar-gold-class-2024-2025",
    title: "I-CAR Gold Class 2024-2025",
    category: "training",
    asset: "/certifications/training-industry-02.webp",
    issuer: "I-CAR",
    record: "Certificate period shown: 2024-2025",
    description: "The supplied artwork displays I-CAR Gold Class for a collision repair business.",
    details: [
      "Gold Class",
      "Collision Repair Business",
      "Training standard named on the certificate",
    ],
  },
  {
    id: "icar-gold-class-2022-2023",
    title: "I-CAR Gold Class 2022-2023",
    category: "training",
    asset: "/certifications/training-industry-01.webp",
    issuer: "I-CAR",
    record: "Certificate period shown: 2022-2023",
    description: "The supplied artwork displays I-CAR Gold Class for a collision repair business.",
    details: [
      "Gold Class",
      "Collision Repair Business",
      "Training standard named on the certificate",
    ],
  },
  {
    id: "gm-collision-repair-network",
    title: "GM Collision Repair Network",
    category: "oem",
    asset: "/certifications/training-industry-03.webp",
    issuer: "GM Collision Repair Network",
    record: "Artwork states valid through 2027",
    description:
      "The supplied artwork identifies Trends Auto Collision Center as a certified network member.",
    details: [
      "Certified Collision Repair Network Member",
      "Facility name shown: Trends Auto Collision Center",
      "GM program artwork",
    ],
  },
  {
    id: "infiniti-certified-collision-repair-center",
    title: "Infiniti Certified Collision Repair Center",
    category: "oem",
    asset: "/certifications/oem-05.webp",
    issuer: "Infiniti",
    record: "No validity date shown on the supplied artwork",
    description:
      "The supplied artwork identifies Trends Collision Center as an Infiniti certified collision repair center.",
    details: [
      "Certified Collision Repair Center",
      "Facility name shown: Trends Collision Center",
      "Infiniti program artwork",
    ],
  },
  {
    id: "kia-recognized-collision-repair-center",
    title: "Kia Recognized Collision Repair Center",
    category: "oem",
    asset: "/certifications/oem-06.webp",
    issuer: "Kia",
    record: "No validity date shown on the supplied artwork",
    description:
      "The supplied artwork identifies Trends Collision Center as a Kia recognized collision repair center.",
    details: [
      "Recognized Collision Repair Center",
      "Facility name shown: Trends Collision Center",
      "Kia program artwork",
    ],
  },
  {
    id: "nissan-certified-collision-repair-network",
    title: "Nissan Certified Collision Repair Network",
    category: "oem",
    asset: "/certifications/oem-07.webp",
    issuer: "Nissan",
    record: "No validity date shown on the supplied artwork",
    description:
      "The supplied artwork identifies Trends Collision Center as part of Nissan's certified collision repair network.",
    details: [
      "Collision Repair Network Certified",
      "Facility name shown: Trends Collision Center",
      "Nissan program artwork",
    ],
  },
  {
    id: "hyundai-certified-collision-repair-center",
    title: "Hyundai Certified Collision Repair Center",
    category: "oem",
    asset: "/certifications/oem-08.webp",
    issuer: "Hyundai",
    record: "No validity date shown on the supplied artwork",
    description:
      "The supplied artwork identifies Trends Collision Center as a Hyundai certified collision repair center.",
    details: [
      "Hyundai Certified Collision Repair Center",
      "Facility name shown: Trends Collision Center",
      "Hyundai program artwork",
    ],
  },
  {
    id: "fca-certified-collision-repair-facility",
    title: "FCA Certified Collision Repair Facility",
    category: "oem",
    asset: "/certifications/oem-09.webp",
    issuer: "FCA",
    record: "No validity date shown on the supplied artwork",
    description:
      "The supplied artwork identifies Trends Collision Center as an FCA certified collision repair facility.",
    details: [
      "Certified Collision Repair Facility",
      "Facility name shown: Trends Collision Center",
      "Chrysler, Dodge, Jeep, Ram, and Mopar marks shown",
    ],
  },
  {
    id: "assured-performance-network",
    title: "Assured Performance Network",
    category: "network",
    asset: "/certifications/training-industry-04.webp",
    issuer: "Assured Performance Network",
    record: "No validity date shown on the supplied artwork",
    description:
      "The supplied artwork identifies Trends Collision Center as a certified repair provider.",
    details: [
      "Certified Repair Provider",
      "Facility name shown: Trends Collision Center",
      "Assured Performance Network artwork",
    ],
  },
  {
    id: "amica-repair-assistance-program",
    title: "Amica Repair Assistance Program",
    category: "network",
    asset: "/certifications/insurance.webp",
    issuer: "Amica",
    record: "No validity date shown on the supplied artwork",
    description:
      "The supplied artwork identifies Trends Collision Center as a member of Amica's Repair Assistance Program.",
    details: [
      "Repair Assistance Program",
      "Facility name shown: Trends Collision Center",
      "Amica program artwork",
    ],
  },
] as const;

const defaultCertification = certificationItems.find((item) => item.category === "oem")!;

function CertificateArtwork({ item, large = false }: { item: CertificationItem; large?: boolean }) {
  return (
    <span className={`${styles.certificateArtwork} ${large ? styles.certificateArtworkLarge : ""}`}>
      <Image
        alt=""
        fill
        sizes={large ? "(max-width: 1023px) 100vw, 28vw" : "(max-width: 767px) 50vw, 22vw"}
        src={item.asset}
        unoptimized
      />
    </span>
  );
}

export function CertificationShowcase() {
  const [activeFilter, setActiveFilter] = useState<CertificationFilter>("oem");
  const [selectedId, setSelectedId] = useState(defaultCertification.id);

  const visibleItems =
    activeFilter === "all"
      ? certificationItems
      : certificationItems.filter((item) => item.category === activeFilter);
  const selectedItem =
    certificationItems.find((item) => item.id === selectedId) ?? defaultCertification;

  function updateFilter(nextFilter: CertificationFilter) {
    setActiveFilter(nextFilter);
    const nextItems =
      nextFilter === "all"
        ? certificationItems
        : certificationItems.filter((item) => item.category === nextFilter);

    if (!nextItems.some((item) => item.id === selectedId)) {
      const firstVisibleItem = nextItems[0];
      if (firstVisibleItem) setSelectedId(firstVisibleItem.id);
    }
  }

  return (
    <section
      className={styles.certifications}
      id="certifications"
      aria-labelledby="certifications-heading"
    >
      <div className={styles.certificationInner}>
        <header className={styles.certificationHeader}>
          <p>Certifications &amp; recognition</p>
          <h2 id="certifications-heading">Credentials behind the repair.</h2>
          <span>
            Browse the supplied certificate artwork and the dates shown on each credential.
          </span>
        </header>

        <div
          className={styles.certificationFilters}
          role="group"
          aria-label="Filter certifications"
        >
          {filterOptions.map((option) => (
            <button
              aria-pressed={activeFilter === option.value}
              data-active={activeFilter === option.value || undefined}
              key={option.value}
              onClick={() => updateFilter(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className={styles.certificationWorkspace}>
          <div className={styles.certificationCollection}>
            <div className={styles.certificationCollectionHeader}>
              <span>
                {activeFilter === "all"
                  ? "All credentials"
                  : filterOptions.find((option) => option.value === activeFilter)?.label}
              </span>
              <span>{visibleItems.length} credentials</span>
            </div>
            <div className={styles.certificationGrid} data-certification-grid>
              {visibleItems.map((item) => {
                const isSelected = selectedItem.id === item.id;

                return (
                  <button
                    aria-controls="certification-detail"
                    aria-label={`${item.title}. ${categoryLabels[item.category]}.`}
                    aria-pressed={isSelected}
                    className={styles.certificateCard}
                    data-category={item.category}
                    data-selected={isSelected || undefined}
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    type="button"
                  >
                    <CertificateArtwork item={item} />
                    <span className={styles.certificateCardCopy}>
                      <strong>{item.title}</strong>
                      <small>{categoryLabels[item.category]}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <aside
            className={styles.certificationDetail}
            id="certification-detail"
            aria-labelledby="certification-detail-title"
            aria-live="polite"
            data-selected-certificate={selectedItem.id}
          >
            <div className={styles.certificationDetailTopline}>
              <span>Selected credential</span>
              <span>Artwork on file</span>
            </div>
            <h3 id="certification-detail-title">{selectedItem.title}</h3>
            <CertificateArtwork item={selectedItem} large />
            <p>{selectedItem.description}</p>
            <dl>
              <div>
                <dt>Category</dt>
                <dd>{categoryLabels[selectedItem.category]}</dd>
              </div>
              <div>
                <dt>Issuer</dt>
                <dd>{selectedItem.issuer}</dd>
              </div>
              <div>
                <dt>Record</dt>
                <dd>{selectedItem.record}</dd>
              </div>
            </dl>
            <div className={styles.certificationFields}>
              <h4>Details shown</h4>
              <ul>
                {selectedItem.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className={styles.certificationDocumentation}>
          <span>Artwork displayed as supplied</span>
          <ul>
            <li>Issuing organization</li>
            <li>Program designation</li>
            <li>Dates shown on credential</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
