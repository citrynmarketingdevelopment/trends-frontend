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
      disallow: "/showroom/",
      userAgent: "*",
    },
    host: siteOrigin.origin,
    sitemap: new URL("/sitemap.xml", siteOrigin).href,
  };
}
