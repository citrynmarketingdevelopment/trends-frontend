import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";

import { CarExperience } from "@/components/car-experience";
import { getSiteOrigin } from "@/lib/env/site-origin";

const display = Space_Grotesk({
  variable: "--font-showroom-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-showroom-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const description = "An interactive real-time 3D showroom concept for the Lamborghini Revuelto.";
const siteOrigin = getSiteOrigin();

export const metadata: Metadata = {
  title: { absolute: "Revuelto | Interactive 3D Concept" },
  description,
  robots: { index: false, follow: false },
  ...(siteOrigin
    ? {
        alternates: { canonical: "/showroom/revuelto" },
        openGraph: {
          title: "Revuelto | Interactive 3D Concept",
          description,
          type: "website",
          url: "/showroom/revuelto",
        },
      }
    : {}),
};

export default function RevueltoShowroomPage() {
  return (
    <main className={`${display.variable} ${mono.variable}`} id="main-content" tabIndex={-1}>
      <noscript>
        <style>{"[data-model-loader] { display: none !important; }"}</style>
      </noscript>
      <CarExperience />
    </main>
  );
}
