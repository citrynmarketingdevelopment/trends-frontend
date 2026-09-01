import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { getSiteOrigin } from "@/lib/env/site-origin";
import "@/styles/globals.css";

const siteOrigin = getSiteOrigin();

export const metadata: Metadata = {
  title: {
    default: "Collision Repair in Bakersfield, California",
    template: "%s | Bakersfield Collision Repair",
  },
  description: "Collision repair information and customer service for Bakersfield, California.",
  ...(siteOrigin
    ? {
        alternates: { canonical: "/" },
        metadataBase: siteOrigin,
        openGraph: {
          description:
            "Collision repair information and customer service for Bakersfield, California.",
          title: "Collision Repair in Bakersfield, California",
          type: "website",
          url: "/",
        },
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
