import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { getSiteOrigin } from "@/lib/env/site-origin";
import { pageSeo } from "@/content/seo";
import "@/styles/globals.css";

const siteOrigin = getSiteOrigin();

export const metadata: Metadata = {
  title: {
    default: pageSeo.home.title,
    template: "%s | Trends Collision Center",
  },
  description: pageSeo.home.description,
  robots: siteOrigin ? { index: true, follow: true } : { index: false, follow: false },
  ...(siteOrigin
    ? {
        metadataBase: siteOrigin,
      }
    : {}),
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#09090a",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html data-theme="midnight" lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
