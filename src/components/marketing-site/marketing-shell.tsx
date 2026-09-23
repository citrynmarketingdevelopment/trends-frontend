import Link from "next/link";
import { Barlow_Condensed, DM_Mono, Instrument_Serif, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { MarketingHeader } from "@/components/marketing-home/marketing-header";
import homeStyles from "@/components/marketing-home/marketing-home.module.css";
import { BrandLogo } from "@/components/brand-logo";
import { business } from "@/content/business";
import { services } from "@/content/services";
import styles from "./marketing-site.module.css";

const body = Manrope({
  variable: "--font-trends-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const display = Barlow_Condensed({
  variable: "--font-trends-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800", "900"],
});
const mono = DM_Mono({
  variable: "--font-trends-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});
const editorial = Instrument_Serif({
  variable: "--font-trends-editorial",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const marketingClassName = `${homeStyles.marketing} ${body.variable} ${display.variable} ${mono.variable} ${editorial.variable}`;

export function MarketingFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerIntro}>
          <Link href="/" className={styles.footerBrand}>
            <BrandLogo className={styles.footerLogo} />
            <span>
              Trends
              <br />
              Collision Center
            </span>
          </Link>
          <p>
            More Than Collision.
            <br />
            Complete vehicle solutions in Bakersfield.
          </p>
          <div className={styles.socials}>
            {business.socials.map((social) => (
              <Link key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label} <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className={styles.label}>Explore</p>
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About Us</Link>
          <Link href="/insurance-claims">Insurance Claims</Link>
          <Link href="/contact">Contact Us</Link>
        </div>
        <div>
          <p className={styles.label}>Vehicle care</p>
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              {service.name}
            </Link>
          ))}
        </div>
        <div>
          <p className={styles.label}>Visit the shop</p>
          <Link href={business.directions} target="_blank" rel="noreferrer">
            {business.street}
            <br />
            {business.locality}
          </Link>
          <Link href={business.phoneHref}>{business.phone}</Link>
          <Link href={`mailto:${business.email}`}>{business.email}</Link>
          <p>
            {business.hours}
            <br />
            {business.closed}
          </p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>
          © {new Date().getFullYear()} {business.name}
        </span>
        <span>Bakersfield / Kern County</span>
        <Link href="/contact#contact-privacy">Contact privacy</Link>
      </div>
    </footer>
  );
}

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className={marketingClassName} id="top">
      <MarketingHeader />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
