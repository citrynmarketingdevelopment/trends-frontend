import { afterEach, describe, expect, it, vi } from "vitest";
import { services } from "@/content/services";
import { pageSeo, serviceSeo } from "@/content/seo";
import { marketingMetadata } from "./marketing-metadata";
import { marketingStructuredData, serializeStructuredData } from "./marketing-structured-data";

afterEach(() => vi.unstubAllEnvs());

describe("Bakersfield page SEO", () => {
  it("gives each public page a distinct local title and description", () => {
    const pages = [...Object.values(pageSeo), ...Object.values(serviceSeo)];
    expect(new Set(pages.map(({ title }) => title)).size).toBe(9);
    expect(new Set(pages.map(({ description }) => description)).size).toBe(9);
    for (const page of pages) {
      expect(page.heading).toContain("Bakersfield");
      expect(page.title).toContain("Bakersfield");
      expect(page.description).toContain("Bakersfield");
    }
  });

  it("emits matching canonical, social, and service identities on the configured domain", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_ORIGIN", "https://example.com");
    for (const service of services) {
      const seo = serviceSeo[service.slug];
      const path = `/services/${service.slug}`;
      const metadata = marketingMetadata(seo.title, seo.description, path, service.image);
      expect(metadata.alternates?.canonical).toBe(`https://example.com${path}`);
      expect(metadata.robots).toEqual({ index: true, follow: true });
      expect(metadata.openGraph).toMatchObject({
        url: `https://example.com${path}`,
        title: seo.title,
      });
      const data = marketingStructuredData({
        path,
        name: seo.heading,
        description: seo.description,
        service,
      });
      const serialized = JSON.stringify(data);
      expect(serialized).not.toContain("localhost");
      expect(data?.["@graph"]).toContainEqual(
        expect.objectContaining({
          "@type": "Service",
          "@id": `https://example.com${path}#service`,
          provider: { "@id": "https://example.com/#business" },
        }),
      );
      expect(data?.["@graph"]).toContainEqual(
        expect.objectContaining({
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://example.com/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Services",
              item: "https://example.com/services",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: service.name,
              item: `https://example.com${path}`,
            },
          ],
        }),
      );
    }
  });

  it("uses the approved business details without invented ratings or opening hours", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_ORIGIN", "https://example.com");
    const data = marketingStructuredData({
      path: "/",
      name: pageSeo.home.heading,
      description: pageSeo.home.description,
    });
    const business = data?.["@graph"][0];
    expect(business).toMatchObject({
      "@type": ["AutoBodyShop", "AutoRepair"],
      telephone: "+16613982029",
      address: {
        streetAddress: "4321 Stine Rd",
        addressLocality: "Bakersfield",
        postalCode: "93313",
      },
      openingHoursSpecification: [
        {
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
      ],
    });
    expect(business).not.toHaveProperty("aggregateRating");
    expect(business).not.toHaveProperty("priceRange");
  });

  it.each(["", "http://example.com", "https://example.com/path"])(
    "keeps an unconfigured preview unindexed (%s)",
    (origin) => {
      vi.stubEnv("NEXT_PUBLIC_SITE_ORIGIN", origin);
      expect(marketingMetadata("Title", "Description", "/")).toMatchObject({
        robots: { index: false, follow: false },
      });
      expect(marketingMetadata("Title", "Description", "/").alternates).toBeUndefined();
      expect(
        marketingStructuredData({ path: "/", name: "Title", description: "Description" }),
      ).toBeNull();
    },
  );

  it("escapes script delimiters in structured data while preserving JSON", () => {
    const payload = { name: "</script><script>alert(1)</script>" };
    const json = serializeStructuredData(payload);
    expect(json).not.toContain("<");
    expect(JSON.parse(json)).toEqual(payload);
  });
});
