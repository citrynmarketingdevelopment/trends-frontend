import type { Metadata } from "next";
import { getSiteOrigin } from "@/lib/env/site-origin";

export function marketingMetadata(
  title: string,
  description: string,
  path: string,
  image = "/images/brand/trends-logo-poster.webp",
): Metadata {
  const origin = getSiteOrigin();
  return {
    title: { absolute: title },
    description,
    robots: origin ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title,
      description,
      siteName: "Trends Collision Center",
      locale: "en_US",
      type: "website",
      ...(origin
        ? { url: new URL(path, origin).href, images: [{ url: new URL(image, origin).href }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(origin ? { images: [new URL(image, origin).href] } : {}),
    },
    ...(origin
      ? {
          alternates: { canonical: new URL(path, origin).href },
        }
      : {}),
  };
}
