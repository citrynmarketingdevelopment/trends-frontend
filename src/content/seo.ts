import type { ServiceSlug } from "./services";

// Keyword choices are provisional until Bakersfield-targeted volume data is available.
// Research and measurement settings: docs/seo/bakersfield-keyword-plan.md.
export const pageSeo = {
  home: {
    title: "Auto Collision Center in Bakersfield | Trends",
    description:
      "Trends Collision Center is a family-owned auto collision center in Bakersfield. Explore collision repair, mechanical service, tires, towing, and fleet care.",
    heading: "Auto Collision Center in Bakersfield",
  },
  services: {
    title: "Auto Services in Bakersfield | Trends Collision Center",
    description:
      "Explore auto services in Bakersfield at Trends: collision repair, mechanical repairs, towing, tires and wheel alignment, and commercial fleet maintenance.",
    heading: "Auto Services in Bakersfield",
  },
  about: {
    title: "About Trends Collision Center in Bakersfield",
    description:
      "Meet Trends Collision Center, a family-owned Bakersfield auto body shop. Learn about our I-CAR Gold Class commitment, repair approach, and complete vehicle care.",
    heading: "About Trends Collision Center in Bakersfield",
  },
  contact: {
    title: "Contact Trends Collision Center | Bakersfield, CA",
    description:
      "Contact Trends Collision Center at (661) 398-2029. Visit 4321 Stine Rd, Bakersfield, CA 93313, Monday-Friday, 8am-5pm, or ask about vehicle repair services.",
    heading: "Contact Trends Collision Center in Bakersfield",
  },
} as const;

export type ServiceSeo = {
  heading: string;
  title: string;
  description: string;
  servicesHeading: string;
};

export const serviceSeo: Record<ServiceSlug, ServiceSeo> = {
  collision: {
    heading: "Collision Repair in Bakersfield",
    title: "Collision Repair in Bakersfield | Trends Collision Center",
    description:
      "Collision repair in Bakersfield from Trends Collision Center. Discuss auto body, bumper, dent, frame, and paint repairs with our family-owned team.",
    servicesHeading: "Auto body & paint repair in Bakersfield",
  },
  mechanical: {
    heading: "Auto Repair in Bakersfield",
    title: "Auto Repair in Bakersfield | Trends Collision Center",
    description:
      "Auto repair in Bakersfield for brakes, steering, suspension, diagnostics, and maintenance. Contact Trends Collision Center to discuss your vehicle's needs.",
    servicesHeading: "Mechanical repairs for your vehicle",
  },
  roadside: {
    heading: "Towing in Bakersfield",
    title: "Towing in Bakersfield & Roadside Assistance | Trends",
    description:
      "Need towing in Bakersfield? Call Trends at (661) 398-2029 to discuss roadside assistance, collision towing, and vehicle transport. Confirm availability by phone.",
    servicesHeading: "Roadside assistance & vehicle transport",
  },
  "tires-alignment": {
    heading: "Wheel Alignment in Bakersfield",
    title: "Wheel Alignment & Tires in Bakersfield | Trends",
    description:
      "Wheel alignment and tire services in Bakersfield. Discuss uneven tire wear, tire replacement, wheel care, and fitment with Trends Collision Center.",
    servicesHeading: "Tire services, wheels & alignment",
  },
  "fleet-maintenance": {
    heading: "Fleet Maintenance in Bakersfield",
    title: "Fleet Maintenance in Bakersfield | Trends Collision Center",
    description:
      "Fleet maintenance in Bakersfield for business vehicles and dealerships. Coordinate preventive maintenance, collision repairs, mechanical service, and tires.",
    servicesHeading: "Fleet repair & commercial vehicle service",
  },
};
