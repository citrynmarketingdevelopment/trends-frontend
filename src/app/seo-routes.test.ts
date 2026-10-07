import { afterEach, describe, expect, it, vi } from "vitest";

import robots from "./robots";
import sitemap from "./sitemap";

const originalSiteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN;

afterEach(() => {
  vi.unstubAllEnvs();
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

  it("publishes all approved marketing routes when a secure origin is configured", () => {
    process.env.NEXT_PUBLIC_SITE_ORIGIN = "https://example.com";

    expect(sitemap().map((entry) => entry.url)).toEqual([
      "https://example.com/",
      "https://example.com/services",
      "https://example.com/services/collision",
      "https://example.com/services/mechanical",
      "https://example.com/services/roadside",
      "https://example.com/services/tires-alignment",
      "https://example.com/services/fleet-maintenance",
      "https://example.com/about",
      "https://example.com/process",
      "https://example.com/certifications",
      "https://example.com/insurance-claims",
      "https://example.com/contact",
    ]);
    expect(robots()).toEqual({
      host: "https://example.com",
      rules: {
        allow: "/",
        userAgent: "*",
      },
      sitemap: "https://example.com/sitemap.xml",
    });
  });

  it("keeps Vercel previews blocked even with the production domain configured", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    process.env.NEXT_PUBLIC_SITE_ORIGIN = "https://trendsautocollision.com";

    expect(sitemap()).toEqual([]);
    expect(robots()).toEqual({
      rules: { disallow: "/", userAgent: "*" },
    });
  });
});
