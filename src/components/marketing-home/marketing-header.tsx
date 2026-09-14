"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { BrandLogo } from "@/components/brand-logo";
import { services } from "@/content/services";
import styles from "./marketing-home.module.css";
import navStyles from "./marketing-navigation.module.css";

export function MarketingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const overlayCloseButton = useRef<HTMLButtonElement>(null);
  const servicesLink = useRef<HTMLAnchorElement>(null);
  const suppressServiceFocusOpen = useRef(false);
  const pathname = usePathname();
  const closeMenus = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.documentElement.style.overflow;
    const focusFrame = requestAnimationFrame(() => overlayCloseButton.current?.focus());
    document.documentElement.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(focusFrame);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const setDesktopServicesOpen = (open: boolean) => {
    if (window.matchMedia("(min-width: 48rem)").matches) setServicesOpen(open);
  };

  const closeMobileMenu = () => {
    closeMenus();
    requestAnimationFrame(() => menuButton.current?.focus());
  };

  return (
    <header
      className={styles.header}
      data-menu-open={menuOpen || undefined}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        if (menuOpen) {
          closeMenus();
          menuButton.current?.focus();
        } else if (servicesOpen) {
          suppressServiceFocusOpen.current = true;
          setServicesOpen(false);
          servicesLink.current?.focus();
        }
      }}
    >
      <div className={styles.headerInner}>
        <Link className={styles.headerBrand} href="/" aria-label="Trends Collision Center home">
          <BrandLogo className={styles.headerLogo} preload />
          <span>Trends Collision Center</span>
        </Link>

        <button
          className={styles.menuButton}
          ref={menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="marketing-navigation"
          onClick={() => {
            if (menuOpen) closeMobileMenu();
            else {
              setServicesOpen(false);
              setMenuOpen(true);
            }
          }}
        >
          <span className={styles.menuIcon} aria-hidden="true" />
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>

        {menuOpen ? (
          <button
            className={navStyles.overlayClose}
            ref={overlayCloseButton}
            type="button"
            aria-label="Close menu"
            onClick={closeMobileMenu}
          >
            <span aria-hidden="true">×</span>
          </button>
        ) : null}

        <nav
          className={styles.navigation}
          data-open={menuOpen || undefined}
          id="marketing-navigation"
          aria-label="Primary navigation"
        >
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined} onClick={closeMenus}>
            Home
          </Link>
          <div
            className={navStyles.servicesMenu}
            data-open={servicesOpen || undefined}
            onMouseEnter={() => setDesktopServicesOpen(true)}
            onMouseLeave={() => setDesktopServicesOpen(false)}
            onFocusCapture={() => {
              if (suppressServiceFocusOpen.current) {
                suppressServiceFocusOpen.current = false;
                return;
              }
              setDesktopServicesOpen(true);
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false);
            }}
          >
            <div className={navStyles.servicesTriggerRow}>
              <Link
                ref={servicesLink}
                className={navStyles.servicesTrigger}
                href="/services"
                aria-current={pathname === "/services" ? "page" : undefined}
                aria-expanded={servicesOpen}
                aria-controls="service-navigation"
                onClick={closeMenus}
              >
                Services <span className={navStyles.desktopChevron} aria-hidden="true" />
              </Link>
              <button
                className={navStyles.serviceToggle}
                type="button"
                aria-label={servicesOpen ? "Collapse service pages" : "Expand service pages"}
                aria-expanded={servicesOpen}
                aria-controls="service-navigation"
                onClick={() => setServicesOpen((open) => !open)}
              >
                <span aria-hidden="true">{servicesOpen ? "−" : "+"}</span>
              </button>
            </div>
            <ul id="service-navigation" className={navStyles.submenu} hidden={!servicesOpen}>
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    aria-current={pathname === `/services/${service.slug}` ? "page" : undefined}
                    onClick={closeMenus}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
            onClick={closeMenus}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            onClick={closeMenus}
          >
            Contact Us
          </Link>
          <Link className={styles.headerCta} href="/contact" onClick={closeMenus}>
            Start a repair
          </Link>
        </nav>
      </div>
    </header>
  );
}
