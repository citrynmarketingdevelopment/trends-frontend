import { afterEach, describe, expect, it } from "vitest";

import robots from "./robots";
import sitemap from "./sitemap";

const originalSiteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN;

afterEach(() => {
  if (originalSiteOrigin === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_ORIGIN;
  } else {
    process.env.NEXT_PUBLIC_SITE_ORIGIN = originalSiteOrigin;
  }
});

describe("SEO route configuration", () => {
  it("fails closed when the approved production origin is absent", () => {
    delete process.env.NEXT_PUBLIC_SITE_ORIGIN;

    expect(sitemap()).toEqual([]);
    expect(robots()).toEqual({
      rules: {
        disallow: "/",
        userAgent: "*",
      },
    });
  });

  it("publishes only the canonical homepage when a secure origin is configured", () => {
    process.env.NEXT_PUBLIC_SITE_ORIGIN = "https://example.com";

    expect(sitemap()).toEqual([
      {
        changeFrequency: "monthly",
        priority: 1,
        url: "https://example.com/",
      },
    ]);
    expect(robots()).toEqual({
      host: "https://example.com",
      rules: {
        allow: "/",
        disallow: "/showroom/",
        userAgent: "*",
      },
      sitemap: "https://example.com/sitemap.xml",
    });
  });
});
