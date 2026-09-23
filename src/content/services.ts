export type ServiceSlug =
  "collision" | "mechanical" | "roadside" | "tires-alignment" | "fleet-maintenance";

export type Service = {
  slug: ServiceSlug;
  name: string;
  title: string;
  summary: string;
  introduction: string;
  image: string;
  imageAlt: string;
  homeCardImage?: string;
  heroImage?: string;
  mobileHeroImage?: string;
  detailImage: string;
  detailAlt: string;
  featureTitle: string;
  featureBody: string;
  subservices: readonly { title: string; body: string }[];
  /** Optional complete service checklist shown on the service page. */
  checklist?: {
    title: string;
    note: string;
    items: readonly { title: string; body: string }[];
  };
  process: readonly { title: string; body: string }[];
  faqs: readonly { question: string; answer: string }[];
};

export const services: readonly Service[] = [
  {
    slug: "collision",
    name: "Collision",
    title: "Collision repair",
    summary: "Body, structure, and finish. Attention to every layer of the repair.",
    introduction:
      "For collision repair in Bakersfield, bring your vehicle to Trends Collision Center on Stine Road. Our family-owned auto body shop helps you move from damage assessment to body, frame, and paint repairs with a clear plan before work begins.",
    image: "/images/services/collision-service-hero.jpg",
    imageAlt: "Older vehicle photographed on a city street",
    detailImage: "/images/services/348s (8).jpg",
    detailAlt: "Technician welding a vehicle body structure in the workshop",
    featureTitle: "The finish starts beneath the surface.",
    featureBody:
      "Panel fit, structural work, and surface preparation all contribute to the final result. We refinish with Glasurit, a premium automotive refinish paint brand with over 100 years of history, known for its exceptional durability, gloss, and extensive approvals from vehicle manufacturers. Our paint workmanship is backed by a Limited Lifetime Warranty.",
    subservices: [
      {
        title: "Body & panel repair",
        body: "Structural and cosmetic repairs to restore vehicles to pre-accident condition, including bumper repair, dent removal, and hail damage assessment.",
      },
      {
        title: "Frame & structure",
        body: "Frame testing, measurement, and straightening as required by the damage and vehicle repair procedures.",
      },
      {
        title: "Paint & refinishing",
        body: "Glasurit premium refinish paint, known for its exceptional durability, gloss, and extensive vehicle manufacturer approvals, for a beautiful, long-lasting finish.",
      },
      {
        title: "Restoration & finishing",
        body: "Auto body restoration and finishing details, with the scope established after inspecting the vehicle.",
      },
    ],
    process: [
      {
        title: "Inspect",
        body: "Review the damage, vehicle condition, and any available claim information.",
      },
      {
        title: "Plan",
        body: "Explain the repair scope, parts needs, estimate, and approvals before work begins.",
      },
      {
        title: "Repair",
        body: "Address structure, panels, and finish according to the approved repair plan.",
      },
      {
        title: "Finish",
        body: "Check the completed work and walk through the repair with you at handoff.",
      },
    ],
    faqs: [
      {
        question: "Do you work with insurance claims?",
        answer:
          "Yes. Tell us whether you have an open claim and bring the claim information if available. We can discuss the estimate and documentation needed for your repair. Coverage and payment decisions remain with your insurer.",
      },
      {
        question: "Can I get an estimate before repairs begin?",
        answer:
          "Start by contacting the shop to arrange an assessment. An initial estimate is based on what can be inspected; hidden damage or additional parts needs may change the scope after disassembly.",
      },
      {
        question: "How long will my collision repair take?",
        answer:
          "Timing depends on the damage, parts availability, required procedures, and approvals. We discuss the expected schedule after inspection and communicate when the plan changes.",
      },
      {
        question: "Can you repair small dents and paint scratches?",
        answer:
          "Yes. We assess minor cosmetic damage as well as larger collision repairs. The right approach depends on the panel, paint condition, and location of the damage.",
      },
      {
        question: "Do you handle customer-pay repairs?",
        answer:
          "Yes. You can discuss a repair directly with us without an insurance claim. We review the scope and estimate with you before you authorize the work.",
      },
    ],
  },
  {
    slug: "mechanical",
    name: "Mechanical",
    title: "Mechanical repair",
    summary: "Find the cause. Make a plan. Get confidence back behind the wheel.",
    introduction:
      "Looking for auto repair in Bakersfield? Trends helps with mechanical diagnostics, brake concerns, steering and suspension repairs, and routine maintenance. Tell us what changed so we can discuss an inspection and explain the work before you approve it.",
    image: "/images/repair-services/finishing-safety.webp",
    imageAlt: "Technician working beneath the hood of a red sports car",
    homeCardImage: "/images/Mechanical/Mechinical.webp",
    heroImage: "/images/Mechanical/Mechinical-hero.webp",
    detailImage: "/images/services/348s (7).jpg",
    detailAlt: "Green Ford Mustang with its hood open inside the Trends workshop",
    featureTitle: "More than what you can see.",
    featureBody:
      "Complete vehicle care goes beyond the bodywork. We review mechanical concerns in the context of the whole vehicle, whether they follow an impact, appear during everyday driving, or are part of a maintenance visit.",
    subservices: [
      {
        title: "Diagnostics",
        body: "Advanced vehicle diagnostics to identify and resolve mechanical and electrical issues, from warning lights to unusual noises and starting concerns.",
      },
      {
        title: "Brakes",
        body: "Brake inspections, repairs, and replacements, with the mechanical systems that affect everyday driving reviewed alongside them.",
      },
      {
        title: "Steering & suspension",
        body: "Suspension diagnostics, repair, and replacement, including steering response, ride quality, and impact-related concerns.",
      },
      {
        title: "A/C & maintenance",
        body: "A/C diagnostics, service, and repair, alongside complete mechanical repair and maintenance for all vehicle types.",
      },
    ],
    process: [
      {
        title: "Listen",
        body: "Tell us what changed, when it happens, and any recent service or repairs.",
      },
      {
        title: "Diagnose",
        body: "Inspect and test the relevant systems to help identify the source of the concern.",
      },
      { title: "Repair", body: "Review the findings and complete the work you authorize." },
      {
        title: "Verify",
        body: "Check the repair and explain any remaining maintenance recommendations.",
      },
    ],
    faqs: [
      {
        question: "What mechanical concerns can I bring to Trends?",
        answer:
          "Contact us about warning lights, starting or driving concerns, brakes, steering, suspension, and routine service needs. Include your vehicle details so we can confirm the appropriate next step and service availability.",
      },
      {
        question: "What should I tell you about a warning light?",
        answer:
          "Tell us which light appeared, whether it is steady or flashing, and any changes in how the vehicle runs. Note when it began and any recent repairs. We will discuss an inspection before recommending work.",
      },
      {
        question: "Will you contact me before doing additional work?",
        answer:
          "We review the findings and proposed work with you. If the inspection reveals additional concerns, those can be discussed separately from the work already approved.",
      },
      {
        question: "Can mechanical work be part of a collision repair?",
        answer:
          "Yes. An impact can affect components beyond the visible body damage. Relevant mechanical concerns can be assessed as part of the vehicle’s overall repair plan.",
      },
      {
        question: "What should I bring to my visit?",
        answer:
          "Bring your vehicle details, a description of the concern, and any useful service history. For intermittent issues, notes about speed, temperature, or when the symptom occurs can help the assessment.",
      },
    ],
  },
  {
    slug: "roadside",
    name: "Roadside",
    title: "Roadside assistance",
    summary: "A clear first call when your vehicle needs help getting to the shop.",
    introduction:
      "When you need towing in Bakersfield, call Trends to discuss roadside assistance and vehicle transport. Share your location and what happened so we can confirm availability, access, destination, and the next step for your vehicle.",
    image: "/images/services/roadside-tow-truck.webp",
    imageAlt: "Trends tow truck parked at dusk",
    homeCardImage: "/images/Fleet/roadside-towing-verticle.webp",
    heroImage: "/images/Fleet/roadside-towing-hero.webp",
    mobileHeroImage: "/images/Fleet/roadside-towing-verticle.webp",
    detailImage: "/images/services/348s (3).jpg",
    detailAlt: "Trucks photographed outside at a vehicle event",
    featureTitle: "From the roadside to the next step.",
    featureBody:
      "Roadside assistance and towing keep customers and fleets moving. On-site support handles what can be solved where you are, and professional towing covers the rest. Call to confirm current availability, service area, and pricing.",
    subservices: [
      {
        title: "Roadside assistance",
        body: "On-site vehicle support: tires and tire patches, jump starts, fuel delivery, oil changes, and auto lockouts, to help get customers and fleets back on the road.",
      },
      {
        title: "Towing",
        body: "Professional towing services for individual, business, and fleet vehicles, including accident-damaged vehicles arriving at the collision center.",
      },
      {
        title: "Vehicle recovery",
        body: "Describe the vehicle’s position and access conditions so the appropriate recovery needs can be assessed.",
      },
      {
        title: "Shop & fleet transfers",
        body: "Coordinate transport details for dealership, fleet, or individual vehicle repair needs.",
      },
    ],
    process: [
      {
        title: "Call",
        body: "Share your location, contact number, vehicle details, and the situation.",
      },
      {
        title: "Confirm",
        body: "Discuss availability, access, destination, and expected charges.",
      },
      {
        title: "Transport",
        body: "Arrange the agreed towing or recovery service once details are confirmed.",
      },
      { title: "Receive", body: "Plan arrival and the vehicle’s next inspection or repair step." },
    ],
    faqs: [
      {
        question: "How do I request roadside help?",
        answer:
          "Call (661) 398-2029. Share your exact location, vehicle year, make and model, and what happened. The website contact form is for non-urgent inquiries and does not dispatch a tow truck.",
      },
      {
        question: "Is roadside assistance available 24/7?",
        answer:
          "Availability must be confirmed by phone. Our posted shop hours are Monday–Friday, 8am–5pm. Do not assume an online request has scheduled after-hours assistance.",
      },
      {
        question: "What does towing cost?",
        answer:
          "Cost depends on the location, distance, vehicle, access, and recovery requirements. Ask for the applicable charges when arranging service.",
      },
      {
        question: "Will insurance cover my tow?",
        answer:
          "Coverage varies by policy and circumstance. Check with your insurer or roadside provider and keep any service documentation for your claim.",
      },
      {
        question: "Can I choose the repair destination?",
        answer:
          "Tell us the destination you have in mind when you call. We will discuss transport options and confirm arrival arrangements before a service is agreed.",
      },
    ],
  },
  {
    slug: "tires-alignment",
    name: "Tires & Alignment",
    title: "Tires & alignment",
    summary: "The contact patch matters. Care for your tires, wheels, and alignment.",
    introduction:
      "Visit Trends for wheel alignment and tire services in Bakersfield. Uneven tire wear, vibration, or a change in steering deserves an inspection of the tires, wheels, and related components before deciding on alignment, tire replacement, or repairs.",
    image: "/images/repair-services/body-structure.webp",
    imageAlt: "Vehicle undergoing workshop care",
    detailImage: "/images/services/348s (2).jpg",
    detailAlt: "Wheels and tires prepared for refinishing in the workshop",
    featureTitle: "A better finish. A more considered fit.",
    featureBody:
      "From everyday tire concerns to wheel and rim customization, details matter. We discuss fitment, condition, and the intended use of the vehicle before recommending the next step.",
    subservices: [
      {
        title: "Tires & wheels",
        body: "Tire installation, balancing, and wheel services, with a review of tire condition, wear patterns, sizing, and replacement options.",
      },
      {
        title: "Alignment",
        body: "Precision wheel alignments for safety, performance, and longer tire life, including any related steering or suspension work.",
      },
      {
        title: "Wheel & rim care",
        body: "Assess wheel condition and discuss refinishing or customization options.",
      },
      {
        title: "Fitment & suspension changes",
        body: "Discuss wheel, rim, and tire customization, leveling kits, and lift kits with vehicle-specific fitment review.",
      },
    ],
    process: [
      {
        title: "Assess",
        body: "Review tire wear, steering symptoms, wheel condition, and your goals.",
      },
      {
        title: "Measure",
        body: "Check the relevant dimensions and identify related components that need attention.",
      },
      { title: "Service", body: "Complete the approved tire, wheel, or alignment work." },
      {
        title: "Review",
        body: "Explain the completed service and recommendations for ongoing care.",
      },
    ],
    faqs: [
      {
        question: "How do I know if I need an alignment?",
        answer:
          "Uneven tire wear, an off-center steering wheel, or a change in how the vehicle tracks can be reasons to arrange an inspection. Tires, wheels, and suspension can cause similar symptoms, so an assessment comes first.",
      },
      {
        question: "Should alignment be checked after collision repairs?",
        answer:
          "It may be needed when an impact affects wheels, steering, suspension, or structure. We assess it in the context of the damage and the repair procedures for the vehicle.",
      },
      {
        question: "Can you help with wheel and tire customization?",
        answer:
          "Yes. Share your vehicle details and the look or use you have in mind. We can discuss wheel, rim, and tire options and the fitment considerations involved.",
      },
      {
        question: "Do you install lift and leveling kits?",
        answer:
          "Lift and leveling kit installation can be discussed after reviewing your vehicle, the proposed components, and related alignment or clearance requirements.",
      },
      {
        question: "Can I book tires and other repairs together?",
        answer:
          "Tell us about all the work you are considering when you contact the shop. We can discuss a coordinated visit based on inspection needs, parts, and scheduling.",
      },
    ],
  },
  {
    slug: "fleet-maintenance",
    name: "Fleet Maintenance",
    title: "Fleet maintenance",
    summary:
      "Mobile, on-site fleet service and repair. We come to you and keep your operation moving.",
    introduction:
      "Trends Collision Center works with all types of fleet companies in Bakersfield and Kern County, and we offer much more than collision repair. We’re a resource for ongoing maintenance, repairs, and unexpected vehicle issues, with mobile and on-site services that come to you.",
    image: "/images/repair-services/paint-finish.webp",
    imageAlt: "Fleet delivery truck parked outside a warehouse at dusk",
    homeCardImage: "/images/Fleet/Fleet-verticle.webp",
    heroImage: "/images/Fleet/fleet-hero.webp",
    mobileHeroImage: "/images/Fleet/Fleet-verticle.webp",
    detailImage: "/images/services/348s (5).jpg",
    detailAlt: "Pickup truck bed being prepared for paint in the workshop",
    featureTitle: "We come to you.",
    featureBody:
      "Our mobile and on-site services help fleet customers handle vehicle needs at their location, reduce downtime, and keep their operations moving. Fleets like Amazon, Transwest, Cal Water, and others rely on Trends for their fleet vehicle needs.",
    subservices: [
      {
        title: "Mobile & on-site service",
        body: "We come to your location to handle vehicle needs where your fleet operates, reducing downtime and keeping vehicles in service.",
      },
      {
        title: "Collision & paint repair",
        body: "Collision repair plus paint and refinishing with Glasurit premium refinish paint for a durable, long-lasting finish.",
      },
      {
        title: "Maintenance & mechanical",
        body: "Oil changes, routine maintenance, mechanical repair, brakes, suspension, A/C service, and vehicle diagnostics.",
      },
      {
        title: "Tires, glass & roadside",
        body: "Tires, wheels, and alignments, glass and windshield repair and replacement, and towing and roadside assistance.",
      },
    ],
    checklist: {
      title: "Much more than collision repair.",
      note: "Trusted by fleets like Amazon, Transwest, Cal Water, and others.",
      items: [
        { title: "Collision repair", body: "Structural and cosmetic repairs for fleet vehicles." },
        {
          title: "Paint & refinishing",
          body: "Glasurit premium refinish paint for a long-lasting finish.",
        },
        { title: "Mechanical repair", body: "Repairs that get working vehicles back in service." },
        {
          title: "Tires & wheels",
          body: "Tire and wheel service, including installation and balancing.",
        },
        {
          title: "Alignments",
          body: "Wheel alignments for safety, handling, and longer tire life.",
        },
        { title: "Brakes", body: "Brake inspections and replacements." },
        { title: "Suspension", body: "Suspension diagnostics and repair." },
        { title: "A/C service", body: "A/C service and repair." },
        { title: "Diagnostics", body: "Vehicle diagnostics for mechanical and electrical issues." },
        { title: "Glass & windshields", body: "Glass and windshield repair and replacement." },
        {
          title: "Oil changes & maintenance",
          body: "Oil changes and routine maintenance for working vehicles.",
        },
        {
          title: "Towing & roadside",
          body: "Towing and roadside assistance for unexpected vehicle issues.",
        },
      ],
    },
    process: [
      {
        title: "Understand",
        body: "Share your vehicle types, locations, service needs, and primary contact.",
      },
      {
        title: "Plan",
        body: "Decide what we can handle on-site at your location and what comes into the shop.",
      },
      {
        title: "Service",
        body: "Complete maintenance and repairs on-site or in the shop to keep downtime low.",
      },
      {
        title: "Keep moving",
        body: "Review completed work and plan the next service so vehicles stay on the road.",
      },
    ],
    faqs: [
      {
        question: "Can you come to our location?",
        answer:
          "Yes. Our mobile and on-site services let us handle many vehicle needs at your location, which reduces downtime and keeps your operation moving. Tell us where your vehicles are and what they need, and we’ll confirm what can be done on-site.",
      },
      {
        question: "What types of fleets do you work with?",
        answer:
          "We work with all types of fleet companies, from a few business vehicles to large operations. Fleets like Amazon, Transwest, Cal Water, and others rely on Trends for their fleet vehicle needs.",
      },
      {
        question: "Do you only handle collision repair?",
        answer:
          "No. Beyond collision repair and paint, we handle mechanical repair, tires and wheels, alignments, brakes, suspension, A/C, diagnostics, glass and windshields, oil changes and routine maintenance, and towing and roadside assistance.",
      },
      {
        question: "Can you schedule recurring maintenance?",
        answer:
          "We can discuss a maintenance plan based on your vehicles, usage, and service requirements. Scheduling and available capacity are confirmed directly with the team.",
      },
      {
        question: "Do you offer guaranteed turnaround times?",
        answer:
          "A schedule is discussed after reviewing the work and parts requirements. Repair scope, parts availability, and approvals can affect completion, so specific timing must be confirmed for each vehicle.",
      },
      {
        question: "What information helps start a fleet conversation?",
        answer:
          "Include your company name, contact details, approximate vehicle count, vehicle types, where your vehicles are based, and your main service needs. You do not need a complete vehicle list to make the first inquiry.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const publicPaths = [
  "/",
  "/services",
  ...services.map(({ slug }) => `/services/${slug}`),
  "/about",
  "/insurance-claims",
  "/contact",
];

/**
 * The twelve approved service lines Trends offers under one name. Used on the About page
 * and anywhere the full "complete vehicle solutions" list is shown.
 */
export const completeSolutions = [
  {
    title: "Collision Repair",
    body: "Structural and cosmetic repairs to restore vehicles to pre-accident condition.",
  },
  {
    title: "Paint & Refinishing",
    body: "Glasurit premium refinish paint for a beautiful, long-lasting finish.",
  },
  {
    title: "Mechanical Repair",
    body: "Complete mechanical repair and maintenance services for all vehicle types.",
  },
  { title: "Tires & Wheels", body: "Tire installation, balancing, and wheel services." },
  {
    title: "Alignment",
    body: "Precision wheel alignments for safety, performance, and longer tire life.",
  },
  { title: "Brakes", body: "Brake inspections, repairs, and replacements." },
  { title: "Suspension", body: "Suspension diagnostics, repair, and replacement." },
  { title: "A/C Service", body: "A/C diagnostics, service, and repair." },
  { title: "Glass & Windshields", body: "Glass and windshield repair and replacement." },
  {
    title: "Diagnostics",
    body: "Advanced vehicle diagnostics to identify and resolve mechanical and electrical issues.",
  },
  {
    title: "Roadside Assistance",
    body: "On-site vehicle support — tires and tire patches, jump starts, fuel delivery, oil changes, and auto lockouts — to help get customers and fleets back on the road.",
  },
  {
    title: "Towing",
    body: "Professional towing services for individual, business, and fleet vehicles.",
  },
] as const;
