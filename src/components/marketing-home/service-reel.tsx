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
      : (service.homeCardImage ?? service.image),
  href: `/services/${service.slug}` as const,
}));

export function ServiceReel() {
  return (
    <section className={styles.services} id="services" aria-labelledby="services-heading">
      <div className={styles.serviceHeading}>
        <div>
          <p className={styles.serviceMarker}>Services / Five disciplines</p>
          <h2 id="services-heading" aria-label="The Whole Repair. Your Local Collision Experts.">
            <span>The Whole Repair.</span>
            <span>Your Local Collision Experts.</span>
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
    </section>
  );
}
