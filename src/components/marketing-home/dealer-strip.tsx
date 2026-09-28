import Image from "next/image";

import styles from "./marketing-home.module.css";

const dealerBrands: ReadonlyArray<{ name: string; image: string; negative?: boolean }> = [
  { name: "GM", image: "/images/vehicle-makes/gm-logo.svg" },
  { name: "Dodge", image: "/images/vehicle-makes/dodge-logo.png" },
  { name: "Ram", image: "/images/vehicle-makes/ram-wordmark.svg" },
  { name: "SRT", image: "/images/vehicle-makes/srt-logo.png", negative: true },
  { name: "Nissan", image: "/images/vehicle-makes/nissan-logo.svg" },
  { name: "Hyundai", image: "/images/vehicle-makes/hyundai-logo.svg" },
  { name: "Jeep", image: "/images/vehicle-makes/jeep-logo.svg" },
  { name: "Kia", image: "/images/vehicle-makes/kia-wordmark.svg" },
  { name: "Mazda", image: "/images/vehicle-makes/mazda-logo.svg" },
  { name: "Chrysler", image: "/images/vehicle-makes/chrysler-logo.svg" },
  { name: "Honda", image: "/images/vehicle-makes/honda-logo.svg" },
  { name: "Infiniti", image: "/images/vehicle-makes/infiniti-logo.svg" },
  { name: "Corvette", image: "/images/vehicle-makes/corvette-logo.svg" },
  { name: "Cadillac", image: "/images/vehicle-makes/cadillac-logo.svg" },
];

export function DealerStrip() {
  return (
    <section className={styles.dealerStrip} aria-labelledby="dealer-strip-heading">
      <div className={styles.dealerTrust}>
        <h2 id="dealer-strip-heading">Manufacturer Certified</h2>
        <div
          className={styles.dealerLogoViewport}
          role="region"
          aria-label="Vehicle makes Trends is manufacturer certified for"
          tabIndex={0}
        >
          <div className={styles.dealerLogoTrack} data-dealer-logo-track>
            {[0, 1].map((copyIndex) => (
              <ul
                className={styles.dealerLogoGroup}
                aria-hidden={copyIndex === 1 || undefined}
                key={copyIndex}
              >
                {dealerBrands.map((brand) => (
                  <li key={brand.name}>
                    <Image
                      alt={copyIndex === 0 ? brand.name : ""}
                      className={`${styles.dealerLogo} ${brand.negative ? styles.dealerLogoNegative : ""}`}
                      fill
                      loading="eager"
                      sizes="(max-width: 767px) 7rem, 9rem"
                      src={brand.image}
                      unoptimized={brand.image.endsWith(".svg")}
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
