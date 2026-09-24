import Image from "next/image";

import styles from "./marketing-home.module.css";

const certifications = [
  { name: "Amica Repair Assistance Program", image: "/certifications/insurance.webp" },
  { name: "I-CAR Gold Class 2022-2023", image: "/certifications/training-industry-01.webp" },
  { name: "I-CAR Gold Class 2024-2025", image: "/certifications/training-industry-02.webp" },
  {
    name: "Assured Performance Network Certified Repair Provider",
    image: "/certifications/training-industry-04.webp",
  },
] as const;

export function CertificationStrip() {
  return (
    <section className={styles.certStrip} aria-labelledby="cert-strip-heading">
      <div className={styles.certStripInner}>
        <h2 id="cert-strip-heading">Certifications</h2>
        <ul className={styles.certStripLogos}>
          {certifications.map((certification) => (
            <li key={certification.image}>
              <Image
                alt={certification.name}
                className={styles.certStripLogo}
                fill
                sizes="(max-width: 767px) 25vw, 9rem"
                src={certification.image}
                unoptimized
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
