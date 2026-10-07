import type { MetadataRoute } from "next";

import { getSiteOrigin } from "@/lib/env/site-origin";

export default function robots(): MetadataRoute.Robots {
  const siteOrigin = getSiteOrigin();

  if (!siteOrigin) {
    return {
      rules: {
        disallow: "/",
        userAgent: "*",
      },
    };
  }

  return {
    rules: {
      allow: "/",
      // Crawlers must reach demo pages to read their noindex metadata.
      userAgent: "*",
    },
    host: siteOrigin.origin,
    sitemap: new URL("/sitemap.xml", siteOrigin).href,
  };
}
