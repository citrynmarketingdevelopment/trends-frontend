"use client";

import { useState } from "react";

import { BrandLogo } from "@/components/brand-logo";
import styles from "./marketing-home.module.css";

const navigation = [
  { href: "#process", label: "Process" },
  { href: "#services", label: "Services" },
  { href: "#quality", label: "Tracking" },
  { href: "#faq", label: "FAQ" },
] as const;

export function MarketingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a className={styles.headerBrand} href="#top" aria-label="Trends Collision Center home">
          <BrandLogo className={styles.headerLogo} preload />
          <span>Trends Collision Center</span>
        </a>

        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="marketing-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className={styles.menuIcon} aria-hidden="true" />
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>

        <nav
          className={styles.navigation}
          data-open={menuOpen || undefined}
          id="marketing-navigation"
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className={styles.headerCta} href="#start" onClick={() => setMenuOpen(false)}>
            Start a repair
          </a>
        </nav>
      </div>
    </header>
  );
}
