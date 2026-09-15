import Link from "next/link";
import Image from "next/image";
import { services as serviceContent } from "@/content/services";

import styles from "./marketing-home.module.css";

const reelServices = serviceContent.map((service) => ({
  name: service.slug === "collision" ? "Collision Repair" : service.name,
  description: service.summary,
  image:
    service.slug === "collision"
      ? "/images/services/collision-repair-crashed-car.webp"
      : service.image,
  href: `/services/${service.slug}` as const,
}));

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

export function ServiceReel() {
  return (
    <section className={styles.services} id="services" aria-labelledby="services-heading">
      <div className={styles.serviceHeading}>
        <div>
          <p className={styles.serviceMarker}>Services / Five disciplines</p>
          <h2 id="services-heading" aria-label="The whole repair. One continuous story.">
            <span>The whole repair.</span>
            <span>One continuous story.</span>
          </h2>
        </div>
        <p className={styles.serviceIntroduction}>
          From collision repair and refinishing to mechanical services, tires, towing, and roadside
          assistance, every surface and system is treated as part of the same result.
        </p>
      </div>

      <div className={styles.serviceReel} data-service-reel>
        {reelServices.map((service, index) => (
          <Link
            className={styles.serviceCard}
            data-service-card
            data-service-name={service.name}
            href={service.href}
            key={service.name}
          >
            <Image
              alt=""
              className={styles.serviceImage}
              fill
              priority={index === 0}
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 40vw"
              src={service.image}
            />
            <div className={styles.serviceImageGrade} aria-hidden="true" />
            <span className={styles.serviceNumber} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className={styles.serviceCopy}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.dealerTrust}>
        <h3>Dealers that trust Trends</h3>
        <div
          className={styles.dealerLogoViewport}
          role="region"
          aria-label="Vehicle makes represented by dealers that trust Trends"
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
