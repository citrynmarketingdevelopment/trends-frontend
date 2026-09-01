import type { MetadataRoute } from "next";

import { getSiteOrigin } from "@/lib/env/site-origin";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteOrigin = getSiteOrigin();

  if (!siteOrigin) {
    return [];
  }

  return [
    {
      changeFrequency: "monthly",
      priority: 1,
      url: new URL("/", siteOrigin).href,
    },
  ];
}
