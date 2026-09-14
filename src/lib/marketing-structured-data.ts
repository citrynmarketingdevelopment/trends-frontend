import { business } from "@/content/business";
import type { Service } from "@/content/services";
import { getSiteOrigin } from "@/lib/env/site-origin";

export type MarketingPageData = {
  path: string;
  name: string;
  description: string;
  service?: Service;
};

export function marketingStructuredData({ path, name, description, service }: MarketingPageData) {
  const origin = getSiteOrigin();
  if (!origin) return null;
  const absolute = (value: string) => new URL(value, origin).href;
  const businessId = absolute("/#business");
  const pageUrl = absolute(path);
  const crumbs = [
    { name: "Home", path: "/" },
    ...(service ? [{ name: "Services", path: "/services" }] : []),
    ...(path === "/" ? [] : [{ name: service?.name ?? name, path }]),
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["AutoBodyShop", "AutoRepair"],
        "@id": businessId,
        name: business.name,
        url: absolute("/"),
        telephone: business.phoneHref.replace("tel:", ""),
        email: business.email,
        image: absolute("/images/brand/trends-logo-poster.webp"),
        logo: absolute("/brand/trends-logo.svg"),
        address: {
          "@type": "PostalAddress",
          streetAddress: business.street,
          addressLocality: "Bakersfield",
          addressRegion: "CA",
          postalCode: "93313",
          addressCountry: "US",
        },
        areaServed: { "@type": "City", name: "Bakersfield" },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "17:00",
          },
        ],
        sameAs: business.socials.map(({ href }) => href),
        hasMap: business.directions,
      },
      {
        "@type": "WebSite",
        "@id": absolute("/#website"),
        name: business.name,
        url: absolute("/"),
        publisher: { "@id": businessId },
        inLanguage: "en-US",
      },
      {
        "@type": path === "/about" ? "AboutPage" : path === "/contact" ? "ContactPage" : "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name,
        description,
        isPartOf: { "@id": absolute("/#website") },
        about: { "@id": businessId },
        mainEntity: { "@id": service ? `${pageUrl}#service` : businessId },
        ...(path === "/" ? {} : { breadcrumb: { "@id": `${pageUrl}#breadcrumb` } }),
        inLanguage: "en-US",
      },
      ...(path === "/"
        ? []
        : [
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
              itemListElement: crumbs.map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: crumb.name,
                item: absolute(crumb.path),
              })),
            },
          ]),
      ...(service
        ? [
            {
              "@type": "Service",
              "@id": `${pageUrl}#service`,
              name,
              serviceType: service.title,
              description,
              url: pageUrl,
              provider: { "@id": businessId },
              areaServed: { "@type": "City", name: "Bakersfield" },
              mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
            },
          ]
        : []),
    ],
  };
}

export function serializeStructuredData(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
