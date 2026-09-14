import type { MetadataRoute } from "next";

import { getSiteOrigin } from "@/lib/env/site-origin";
import { publicPaths } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteOrigin = getSiteOrigin();

  if (!siteOrigin) {
    return [];
  }

  return publicPaths.map((path) => ({
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
    url: new URL(path, siteOrigin).href,
  }));
}
