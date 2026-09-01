# Trends Collision Homepage Design and Bakersfield SEO Sitemap

**Document:** `homepage-design-and-seo-sitemap.md`  
**Status:** Design and content architecture draft for approval  
**Approved visual direction:** Concept 03 — **Coachbuilt After Dark**  
**Primary market:** Bakersfield, California  
**Frontend:** Next.js App Router, React, TypeScript, React Three Fiber / Three.js  
**Related documents:** [`design.md`](./design.md) and [`architecture.md`](./architecture.md)  
**Last updated:** August 11, 2026

---

## 1. Purpose

This document defines:

1. The complete homepage layout, section by section.
2. The content, visual, motion, responsive, accessibility, and SEO requirements for each homepage section.
3. The recommended public website sitemap.
4. The Bakersfield, California local SEO strategy.
5. The page-to-keyword map that prevents unnecessary overlap and keyword stuffing.
6. The information, photography, certifications, and business facts that must be verified before launch.

The website must accomplish three jobs at the same time:

- Present Trends as a high-end automotive brand with the emotional impact of a custom vehicle studio.
- Establish Trends as a certified, process-driven collision repair center that customers, dealers, and insurance partners can trust.
- Convert Bakersfield-area search visitors into calls, repair inquiries, directions requests, and customer tracker visits.

The public website is the marketing and trust layer. The customer tracker and digital forms are separate utility experiences with a calmer warm-bone interface and strict privacy rules.

---

## 2. Source Basis and Decision Boundaries

### 2.1 Project-derived requirements

The following requirements come from the approved Trends frontend direction and project discovery:

- The visual system is **Coachbuilt After Dark**.
- The homepage hero is led by the supplied Trends logo, not by a generic rotating vehicle.
- The hero uses the headline direction **“From impact to immaculate.”**
- A separate Three.js section explains the repair narrative through **Scan → Repair → Finish → Quality Control**.
- The public site uses dark, cinematic, editorial styling.
- Customer tracking and forms use a light, calm utility treatment.
- Certifications, claims guidance, customer visibility, quality control, and in-house capabilities must appear early enough to establish professional credibility.
- Motion must explain progression, reveal craftsmanship, or confirm interaction. It must not exist only as decoration.
- The Three.js experience is progressive enhancement. All meaningful content must exist in semantic HTML outside the canvas.
- The customer tracker must never expose internal notes, employees, red flags, hidden stages, or internal activity history.
- The homepage should move from identity to trust, process, proof, and conversion.

### 2.2 SEO research-derived requirements

The SEO recommendations in this document are based on current Google Search Central, Google Business Profile, Schema.org, and Next.js guidance. They are separated from project-derived business claims because search recommendations can evolve and business details must be verified.

The strategy follows these principles:

- Use visible, helpful, people-first content rather than search-engine-only copy.
- Make all important pages reachable through crawlable links.
- Give every indexable page a unique purpose, title, main heading, and canonical URL.
- Use one authoritative Bakersfield presence rather than creating thin pages for every nearby city.
- Keep business name, address, phone, hours, and category consistent between the website and Google Business Profile.
- Use the most specific accurate local business structured-data type, which for this business is expected to be `AutoBodyShop`.
- Keep the 3D experience from blocking the page’s initial content, Core Web Vitals, or search visibility.

### 2.3 Claims that are not approved by this document

This document does **not** authorize the website to publish any of the following until Trends provides written confirmation:

- A guarantee that every insurer will accept or approve a repair.
- A guarantee of completion dates.
- A lifetime warranty.
- A list of insurance companies that officially recommend or approve Trends.
- A statement that a specific manufacturer certification is active.
- A claim that a service is performed entirely in-house.
- A fixed number of quality-control inspection points.
- Legal statements concerning customer rights, insurance obligations, deductibles, or repair-shop selection without compliance review.
- Review totals, star ratings, awards, years in business, team size, or repair volume that have not been verified.

---

## 3. Launch-Critical Business Information to Verify

Local SEO depends on entity consistency. The new site should not launch until the following facts are confirmed and documented in a single approved business-information record.

| Data field | Required decision | Why it matters |
|---|---|---|
| Official public business name | Confirm whether the primary name is **Trends Collision Center**, **Trends Auto Collision**, or another legal/DBA form | Titles, schema, Google Business Profile, citations, contracts, and footer |
| Canonical domain | Confirm the final production domain and preferred `www` or non-`www` version | Canonicals, redirects, Search Console, email, analytics |
| Primary address | Confirm street, suite, city, state, and ZIP in USPS-consistent format | Google Maps, `AutoBodyShop` schema, citations, directions |
| Active locations | Confirm whether only the Stine Road collision center is active and whether the Auto Boutique is a separate active location | Prevents duplicate or inaccurate location pages |
| Main phone | Confirm the primary collision-center phone and tracking phone policy | NAP consistency and mobile conversion |
| Hours | Confirm regular, holiday, drop-off, towing, and estimate hours | Google Business Profile and local business schema |
| Email | Confirm the public customer service and estimate email addresses | Contact page and schema |
| BAR license | Confirm the business license number and approved display format | Trust and California compliance |
| Languages | Confirm whether Spanish-language service is offered and by which channels | Local accessibility and future Spanish content |
| Estimate policy | Confirm walk-in, appointment, photo-estimate, and free-estimate policies | CTA wording and conversion forms |
| Towing | Confirm whether towing is operated by Trends, coordinated through a partner, or offered only in specific cases | Service-page accuracy |
| Custom work | Confirm the exact custom vehicle services still offered | Prevents the site from promising unsupported modifications |
| Insurance positioning | Confirm approved wording for insurer coordination, DRP relationships, and claims assistance | Legal and reputational accuracy |
| Active certifications | Verify each program, logo usage rules, expiration, and approved marketing language | Certification hub, trust rail, schema, and partner links |
| Warranty | Confirm whether a written repair warranty exists and what it covers | Service pages, claim pages, and FAQs |
| Social profiles | Confirm official Instagram, Facebook, YouTube, TikTok, and LinkedIn URLs | `sameAs` schema and footer |

### 3.1 Current public-data conflict to resolve

The current public website displays a Trends Collision Center at **4321 Stine Rd, Bakersfield, CA 93313**, with phone **(661) 398-2029**, and also displays a Trends Auto Boutique at **3001 Brundage Ln** with a different phone. Project discovery separately described the collision business as having one current location and an older location that should not be treated as active.

Before launch:

1. Confirm which businesses and locations remain active.
2. Confirm whether the Auto Boutique is part of the same website, a separate brand, or should be removed.
3. Confirm whether the Stine Road address requires a suite number.
4. Audit Google Business Profile, Apple Maps, Bing Places, Yelp, chamber listings, insurer directories, OEM directories, and major data aggregators.
5. Correct or close old-location listings rather than creating new pages to match inaccurate citations.

No production template should hardcode provisional NAP information.

---

## 4. Homepage Strategy

### 4.1 Homepage role

The homepage is the primary local landing page for broad, high-intent searches such as:

- collision repair Bakersfield CA
- auto body shop Bakersfield CA
- auto body repair Bakersfield CA
- certified collision repair Bakersfield
- collision center Bakersfield

These are **provisional keyword targets**, not search-volume claims. Final prioritization should be validated through Google Ads Keyword Planner, Google Search Console, Google Business Profile performance data, and post-launch query data.

### 4.2 Homepage conversion priorities

The page should prioritize actions in this order:

1. **Start Your Repair** — new lead, estimate, claim, or appointment path.
2. **Call Trends** — immediate mobile conversion.
3. **Get Directions** — local-intent conversion.
4. **Track My Vehicle** — existing-customer utility path.
5. **Explore Services / Certifications / Craftsmanship** — research path.
6. **Dealer Partnership Inquiry** — B2B path.

The tracker is important, but it should not visually compete with the primary new-customer CTA.

### 4.3 Homepage narrative

```text
Global Header
    ↓
Logo Monolith Hero
    ↓
Credential and Trust Rail
    ↓
Bakersfield Brand Introduction
    ↓
Three.js Scan → Repair → Finish Story
    ↓
Collision Repair Capabilities
    ↓
Certifications and Factory-Procedure Proof
    ↓
Craftsmanship / Before-and-After Work
    ↓
Equal-Care Quality Standard
    ↓
Customer Tracker Preview
    ↓
Insurance Claim Guidance
    ↓
Dealer and Referral Capability
    ↓
Customer Reviews and Trust Proof
    ↓
Frequently Asked Questions
    ↓
Bakersfield Location and Contact
    ↓
Final Conversion Panel
    ↓
Global Footer
```

### 4.4 Page-length guidance

This will be a long-form homepage, but it must not feel like an undifferentiated stack of cards. Use alternating editorial pacing:

- Full-viewport emotional sections.
- Focused reading sections.
- Wide process scenes.
- Light utility moments inside the dark site.
- Original photography breaks.
- Short conversion moments.

Each section must justify its place through trust, explanation, proof, or conversion.

---

# 5. Global Page Shell

## 5.1 Marketing header

### Purpose

Give users immediate access to services, proof, contact, and vehicle tracking without overwhelming the hero.

### Desktop navigation

Recommended primary navigation:

- Services
- Certifications
- Craftsmanship
- Insurance Claims
- Why Trends
- About
- Contact

Recommended utility actions:

- Phone number or **Call Trends**
- **Track My Vehicle**
- **Start Your Repair**

The **Start Your Repair** CTA is primary. **Track My Vehicle** is a secondary utility action.

### Header visual behavior

- Transparent or near-transparent over the top of the hero.
- Transitions to a solid midnight surface after the visitor leaves the hero.
- Uses a thin champagne divider or restrained border light after scrolling.
- Never covers headline or CTA content.
- Does not use an oversized announcement bar unless there is a time-sensitive operational message.

### Mobile behavior

- Trends logo on the left.
- Direct call action and menu trigger on the right.
- Full-screen or large-sheet menu with clear focus management.
- Primary actions remain at least 48px high.
- A sticky bottom action bar may appear on service and claim pages, but should be tested carefully on the homepage so it does not obstruct the cinematic layout.

### Accessibility

- Include a “Skip to main content” link.
- Use native landmarks: `header`, `nav`, `main`, and `footer`.
- Maintain visible keyboard focus.
- Mobile navigation must close with Escape, return focus to the trigger, and prevent background interaction while open.
- Do not rely on hover to expose essential links.

### SEO

- Navigation links must be normal crawlable anchors.
- Use descriptive labels instead of vague text such as “Learn More” when the context is not obvious.
- Keep navigation consistent across indexable marketing pages.

### Recommended components

- `MarketingHeader`
- `BrandMark`
- `PrimaryNavigation`
- `HeaderActions`
- `MobileNavigationSheet`
- `SkipLink`

---

# 6. Homepage Section Specifications

## Section 01 — Logo Monolith Hero

### Purpose

Create a memorable premium first impression while immediately identifying Trends as a Bakersfield collision repair center.

### Draft content hierarchy

**Local eyebrow**  
Certified collision repair in Bakersfield, California

**H1**  
From impact to immaculate.

**Supporting copy**  
Certified repair discipline, exceptional finish quality, and clear customer visibility from the first inspection through final quality control.

**Primary CTA**  
Start Your Repair

**Secondary CTA**  
Track My Vehicle

**Optional tertiary text link**  
Call Trends

**Trust points**

- Manufacturer-certified repair
- Customer repair tracking
- Final quality-control review
- Advanced in-house capabilities

Final wording must be approved against verified certifications and services.

### Visual layout

- Full-height midnight environment with subtle oxblood depth.
- Copy occupies approximately 42–48% of a wide desktop grid.
- The supplied vertical Trends logo occupies approximately 38–46%.
- The logo is rendered first as an inline SVG so the brand appears immediately.
- An optional enhanced 3D or dimensional duplicate may add brushed-black material and champagne edge lighting after the page is interactive.
- The vehicle does not lead this section. The dedicated vehicle narrative appears later.

### Motion

- Logo silhouette resolves from shadow.
- Headline reveals through a controlled editorial mask.
- One champagne light pass moves across the logo.
- Copy and CTAs enter once and settle.
- Small pointer-responsive lighting may remain on fine-pointer desktop devices.
- No endless logo rotation, neon pulse, particle field, audio, or scroll-jacking.

### Loading and fallback

- HTML copy and inline SVG render on the server.
- The optional enhanced logo is lazy and replaces nothing essential.
- No blank canvas or numeric loading indicator.
- If JavaScript fails, the hero remains complete.

### SEO role

- The local service phrase appears visibly in the eyebrow.
- The page title carries the primary local keyword.
- The H1 remains the approved campaign statement.
- Supporting copy identifies collision repair, finish quality, and Bakersfield context without repeating the city unnaturally.
- The logo is not used as a substitute for textual business identification.

### Accessibility

- The primary SVG has an accessible brand name.
- Decorative duplicates are `aria-hidden`.
- Canvas content is not keyboard-focusable.
- All text remains selectable and available at 200% zoom.
- `prefers-reduced-motion` removes the reveal timeline while preserving layout.

### Mobile

- Use the SVG as the default visual.
- Copy appears before or beside the logo depending on width.
- CTAs stack below 420px.
- Intro animation completes within approximately two seconds.
- Disable pointer lighting.

### Required assets

- Final cleaned Trends SVG.
- Dark and light logo variants if brand standards allow.
- Approved hero copy.
- Optional commercially usable 3D logo extrusion.
- Open Graph hero image derived from the same brand composition.

### Acceptance criteria

- The brand and copy render before any client-only enhancement.
- Primary CTA is visible on common laptop viewports without scrolling.
- Hero remains readable with animation disabled.
- No cumulative layout shift occurs when the enhanced logo loads.

---

## Section 02 — Credential and Trust Rail

### Purpose

Confirm professional legitimacy immediately after the emotional hero.

### Content

Use a curated set of active, verified credentials rather than displaying every possible logo at the same visual weight.

Potential items to verify from discovery include:

- I-CAR
- Assured Performance
- GM-related certifications
- Chrysler / Dodge / Jeep / Ram / SRT-related certifications
- Nissan / Infiniti
- Hyundai / Kia
- Mazda
- Honda
- Corvette / Cadillac where applicable

The exact program names, logo rights, expiration dates, and current status must be verified before publication.

### Recommended copy

**Heading**  
Certified for the repair. Focused on the finish.

**Supporting statement**  
Training, equipment, documentation, and manufacturer procedures support every repair plan.

### Layout

- Desktop: horizontal rail or restrained grid.
- Mobile: swipeable rail with visible partial next item and accessible previous/next controls.
- Each mark includes a text label, not only an image.
- Provide a link to the full Certifications page.

### Motion and hover

- Marks enter once through a subtle mask or opacity transition.
- On hover or focus, a credential card may reveal a one-sentence explanation.
- Do not rotate, bounce, or continuously animate certification logos.

### SEO role

- Adds indexable context explaining what certification means.
- Links to a certification hub with unique explanatory content.
- Avoid creating a thin page for every logo unless Trends can provide meaningful, verified content about the repair procedures, equipment, and customer benefit.

### Accessibility

- Use meaningful `alt` text for certification logos.
- Do not duplicate the same visible label in alt text and adjacent text unnecessarily.
- Swipe rails must also work by keyboard and controls.

### Required content data

Each certification record should include:

- Official display name.
- Approved logo file.
- Status: draft, verified, expired, or hidden.
- Verification date.
- Optional expiration date.
- Approved public description.
- Official external URL.
- Display priority.

---

## Section 03 — Bakersfield Brand Introduction

### Purpose

Provide clear, indexable local context after the short cinematic hero and before the interactive process section.

### Draft content

**H2**  
A higher standard for collision repair in Bakersfield.

**Body copy**  
Trends Collision Center serves Bakersfield drivers with disciplined collision repair, precise refinishing, and a repair experience built around clarity. From the first inspection through final quality control, every vehicle receives close attention to safety, fit, finish, and communication.

**Three proof pillars**

1. **Certified repair discipline** — procedures, documentation, training, and appropriate equipment.
2. **Craftsmanship in every finish** — panel alignment, surface continuity, color, and final presentation.
3. **Visibility through the process** — customer-friendly repair updates and clear next actions.

**CTA**  
Why Choose Trends

### Layout

- Warm-bone editorial section or deep midnight section with a large facility image.
- Two-column desktop layout: statement and proof on one side, original shop or craftsmanship image on the other.
- Keep the body copy within a readable 680–760px measure.

### Motion

- Slow image reveal and text mask.
- No pinned behavior.
- Motion completes once and remains stable.

### SEO role

- Gives Google and users a clear textual explanation of the business, service, and location.
- Uses Bakersfield naturally in a heading and first paragraph.
- Establishes the central entity before the Three.js canvas.

### Content requirements

- Use original facility or team photography.
- Do not use a stock exotic car as proof of the shop.
- Add a caption when the image communicates a specific process or facility feature.

---

## Section 04 — Three.js Vehicle Process Story

### Purpose

Turn a complicated collision repair process into a clear visual narrative while demonstrating advanced frontend quality.

### Section heading

**Eyebrow**  
The Trends repair process

**H2**  
Precision at every stage.

**Introduction**  
Every repair is different. The sequence below represents how Trends inspects damage, develops the repair plan, completes the work, and confirms quality before delivery.

This language is intentionally representative. It must not promise that every vehicle follows exactly the same steps or timeline.

### Semantic structure

The page must contain all of the following outside the canvas:

1. Heading and introduction.
2. Ordered list of phases.
3. Active-phase indicator.
4. Explanatory copy for each phase.
5. Closing quality statement.
6. CTA links.
7. Static fallback media.

The Three.js canvas enhances the story but does not contain the only version of any important text.

### Phase 0 — Establish

**Visual**

- Vehicle enters a controlled luxury studio.
- Camera uses a front three-quarter angle.
- Paint and reflections remain physically believable.

**Copy direction**  
A complete repair starts with understanding the vehicle, the damage, and the procedures required to move forward correctly.

### Phase 1 — Scan

**Visual**

- One soft scan plane moves across the vehicle.
- Selected panels transition to wireframe or restrained diagnostic transparency.
- Repair zones receive small oxblood or racing-red highlights.
- Labels appear as HTML beside the canvas rather than unreadable in-canvas HUD text.

**Content themes**

- Initial inspection.
- Damage documentation.
- Manufacturer procedure review.
- Repair planning.
- Customer and insurance communication.

**Draft phase copy**  
We document visible and hidden damage, review the repair requirements, and build the information needed to move the repair forward.

### Phase 2 — Repair

**Visual**

- Relevant panels separate by a small believable distance.
- Structural, body, aluminum, plastic-repair, and preparation concepts are represented abstractly.
- Camera moves slowly along the repair side.
- Champagne guide lines connect active components to HTML copy.

**Content themes**

- Controlled disassembly.
- Structural and body repair.
- Parts and supplement coordination.
- Surface preparation.
- Paint-system discipline.

**Draft phase copy**  
The vehicle moves through the repair plan with the right procedures, equipment, materials, and coordination. When additional damage is found, the plan is updated before work continues.

### Phase 3 — Finish

**Visual**

- Panels return to final alignment.
- Diagnostic materials resolve into the final paint system.
- A studio light travels across the body to reveal reflection continuity and finish quality.
- Camera settles into a clean final composition.

**Content themes**

- Refinishing and color match.
- Reassembly.
- Detail.
- Customer-visible status update.

**Draft phase copy**  
Refinishing, reassembly, and detail bring the vehicle back together with close attention to color, surface continuity, and panel alignment.

### Phase 4 — Quality Confirmation

**Visual**

- Scene motion stops.
- Final vehicle remains composed under controlled light.
- A quality statement replaces technical phase copy.

**H3**  
The repair is not complete until the final review is complete.

**CTA options**

- Explore Our Craftsmanship
- Start Your Repair
- See Customer Tracking

### Desktop scroll behavior

- Approximate section height: `320–420vh`, tuned after real content and model testing.
- Canvas region becomes sticky; native page scrolling remains in control.
- Copy phases stay in normal document order.
- Scroll progress drives a deterministic GSAP / Three.js timeline.
- No snap requirement.
- Users can scroll forward or backward without being trapped.

### Tablet and mobile

- Use a sticky media region of approximately `38–48svh`.
- Stack phase cards vertically.
- Shorten camera travel and panel separation.
- Provide phase tabs when scroll-state relationship is not obvious.
- On lower-power devices, use three optimized stills or a pre-rendered sequence.
- No horizontal scroll hijacking.

### Reduced motion

- Remove scan travel, camera travel, panel separation, and pinned progression.
- Show a static finished vehicle or three-image sequence.
- Render every phase as normal content.
- Preserve headings, copy, and CTAs.

### Performance requirements

- Do not download the full model during the initial hero render.
- Preload when the process section approaches the viewport.
- Use a commercially licensed GLB source.
- Optimize geometry and material count.
- Use Meshopt or Draco where appropriate and KTX2/Basis textures.
- Provide desktop and lower-detail mobile tiers.
- Show an AVIF/WebP poster before the scene is ready.
- Respect `saveData`, device memory, WebGL support, and measured frame rate.
- Pause or dispose scene work outside the section.

### SEO role

- Indexable HTML copy explains the process.
- The section links to service, claims, certification, and craftsmanship pages.
- Canvas imagery is not relied upon for search understanding.
- The process content should answer user questions rather than merely describe animation.

### Accessibility and edge cases

- Canvas is decorative and non-focusable.
- Phase status is announced only when user interaction requires it; avoid noisy scroll announcements.
- Static fallback appears on WebGL failure.
- Context loss receives one safe recovery attempt before fallback.
- Model failure does not block the page.
- All color-coded repair zones have accompanying text labels.

### Recommended components

- `VehicleProcessStory`
- `VehicleProcessScene`
- `ProcessPhaseList`
- `ProcessPhaseCard`
- `ProcessProgressRail`
- `VehicleProcessPoster`
- `SceneErrorBoundary`
- `MotionPreferenceGate`

---

## Section 05 — Collision Repair Capabilities

### Purpose

Translate the premium brand into concrete services that match local search intent and customer needs.

### Heading

**H2**  
Collision repair capabilities, handled with precision.

**Supporting copy**  
From structural work and refinishing to specialty repair methods and vehicle support, Trends builds the repair plan around the needs of the vehicle.

### Recommended launch cards

Publish only services that Trends verifies as active.

1. **Collision and Auto Body Repair**  
   Damage assessment, body repair, panel replacement or correction, and repair coordination.

2. **Frame and Structural Repair**  
   Structural measurement, correction, and repair-plan execution using approved processes and equipment.

3. **Auto Paint and Refinishing**  
   Surface preparation, color matching, refinishing, and finish inspection.

4. **Aluminum Repair**  
   Aluminum-specific repair capability where certification, tools, and current service availability are verified.

5. **Plastic Welding and Bumper Repair**  
   Repair-oriented options for suitable plastic components and bumper damage.

6. **Towing and Vehicle Support**  
   Publish only after confirming whether towing is directly operated, coordinated, and available after hours.

### Provisional custom-work card

Because the brand goal includes high-end custom automotive positioning, the homepage may include one secondary card or editorial link:

**Custom and Specialty Work**  
Custom paint, specialty body work, and vehicle modification services.

This card must remain unpublished until Trends defines the exact active services, lead qualification process, warranty implications, and portfolio assets.

### Layout

- Six-card modular grid with one featured card.
- Each card includes an original image, concise summary, proof point, and descriptive link.
- Use container queries so cards can become horizontal at medium widths.
- Avoid placing all copy over images.

### Hover and focus

- Small lighting shift across the media.
- One- to two-degree pointer tilt maximum.
- Champagne or racing-red border highlight.
- Link arrow moves slightly.
- Keyboard focus provides equivalent emphasis without motion dependency.

### SEO role

- Each service card links to a unique service page.
- Card headings use natural service terms.
- Avoid repeating “Bakersfield, CA” on every card; location context already exists in the page.
- Service pages target more specific search intent.

### Empty and unpublished states

- Draft services do not render publicly.
- A service card with no approved page must not link to a placeholder.
- Missing media uses an approved abstract material image, not generic stock damage.

---

## Section 06 — Certifications and Factory-Procedure Proof

### Purpose

Explain why certification matters instead of using logos as decoration.

### Heading

**H2**  
Certified knowledge. Documented repair discipline.

### Supporting copy

Certification programs help verify training, equipment, procedures, and ongoing requirements. Trends should explain the customer benefit in plain language and avoid implying that every certification applies to every vehicle.

### Content structure

- Featured credential group.
- “What certification means” explanation.
- Approved manufacturer/program logos.
- Link to full Certifications hub.
- Optional link to verify a certification on an official directory.

### Suggested proof points

- Access to current repair procedures.
- Training for modern materials and vehicle technology.
- Equipment and process requirements.
- Documentation and quality expectations.

Every proof point must match the actual program.

### Visual direction

- Warm-bone section with generous spacing.
- Certification marks presented like premium documentation.
- No carousel that moves without user input.
- Metallic frame highlight may pass once around the section on entry.

### SEO role

- Certification hub targets “certified collision repair Bakersfield” and related manufacturer-repair questions.
- Individual certification pages should only be created when there is enough original, verified content to explain the program, eligible vehicles, repair process, and customer benefit.
- Do not publish repetitive pages that only swap a manufacturer name.

### Structured data

- Primary local business schema remains `AutoBodyShop`.
- Certifications may be represented semantically only when accurate and visible.
- Do not expect certification markup alone to create a Google rich result.

---

## Section 07 — Craftsmanship Lookbook and Case Studies

### Purpose

Prove finish quality and repair capability through original work.

### Heading

**H2**  
Craft you can see in every reflection.

### Content

Feature three to six strong projects. Each project should include:

- Vehicle year, make, and model where approved.
- Damage or project summary.
- Services performed.
- Relevant certification or material process.
- Before image.
- Process image.
- After image.
- Final inspection or delivery image.
- Short result statement.
- Link to a dedicated case-study page.

### Privacy rules

- Remove or blur license plates unless written permission exists.
- Do not expose claim numbers, customer names, VINs, addresses, or insurer documents.
- Obtain permission for customer/vehicle stories when the vehicle can be identified.

### Desktop interaction

- Editorial lookbook with wide imagery.
- Optional horizontal treatment only if native scrolling and accessibility remain clear.
- Before/after comparison uses a keyboard-operable slider or two clearly labeled images.
- Hover changes lighting or framing rather than aggressively zooming.

### Mobile

- Stacked or swipeable case-study cards.
- Preserve captions and service links.
- Do not require precision dragging to understand before/after content.

### SEO role

Every case study should have indexable content, not only a gallery. Case-study pages can rank for long-tail combinations such as:

- vehicle make + collision repair
- bumper repair + Bakersfield
- paint matching + Bakersfield
- aluminum repair + vehicle make
- structural repair case study

Use only accurate project details. Link each case study back to the relevant service and certification pages.

### Image SEO

- Use descriptive filenames.
- Provide useful alt text based on what is visible and relevant.
- Keep images near explanatory copy.
- Provide responsive sizes and high-quality AVIF/WebP derivatives.
- Preserve accurate paint color.
- Use original photography instead of generic manufacturer press images when possible.

---

## Section 08 — Equal-Care Quality Standard

### Purpose

Express the shop’s stated philosophy that every customer and vehicle receives the same disciplined final review.

### Heading options

- Every vehicle. One standard.
- The badge changes. The standard does not.
- Quality control is part of the repair.

### Recommended copy

Whether the vehicle is an everyday commuter or a specialty model, the final review follows the same principle: check the repair, confirm the finish, verify the details, and deliver the vehicle with confidence.

### Recommended visual proof

- Panel-gap inspection.
- Paint reflection check.
- Lighting and functional check.
- Interior/exterior detail review.
- Final walkaround.

Do not state a fixed “22-point” or other numbered checklist unless Trends provides and approves the actual checklist.

### Layout

- Oversized editorial statement.
- Macro craftsmanship imagery.
- Four-step quality summary.
- Link to Why Trends or a Quality Standards page if enough content exists.

### Motion

- Slow text/image overlap.
- Light movement across paint surface.
- No complex interaction required.

### SEO role

Supports quality, trust, and repair-process relevance without forcing another keyword-targeted page.

---

## Section 09 — Customer Tracker Preview

### Purpose

Demonstrate the customer communication advantage without exposing internal workflow information.

### Visual mode

This section shifts into the warm-bone utility treatment:

- Warm light background.
- Deep ink or oxblood text.
- Racing-red current status.
- Green completed stages.
- Champagne dividers.
- No decorative Three.js scene.

### Heading

**H2**  
Your repair, clearly visible.

### Supporting copy

Customers can use a secure Trends link to see approved repair updates, understand the current stage, and complete requested documents without calling for every status change.

### Preview content

Use clearly labeled demonstration data:

- Vehicle received.
- Repair planning.
- Repair in progress.
- Refinishing and reassembly.
- Final quality review.
- Ready for pickup.

The actual customer-visible stages must come from backend-approved data and may differ by repair.

### UI elements

- Vehicle summary.
- Last updated timestamp.
- Current stage card.
- Completed/current/upcoming timeline.
- Missing document prompt.
- Contact Trends action.
- “Track My Vehicle” CTA.

### Privacy and indexing

- `/track` may use a generic landing page, but secure token and session routes must use `noindex, nofollow`.
- Page titles, Open Graph data, URLs, logs, and analytics must not contain customer names, VINs, claim numbers, or repair details.
- No internal notes or employees appear in the public DTO.

### Motion

- Minimal state transitions.
- No parallax or cinematic camera movement.
- Loading skeleton preserves layout.

### Empty and error states

- Status being prepared.
- Invalid or expired link.
- Temporarily unavailable.
- No public stage yet.
- Session expired.
- Offline state.

Each state provides a direct contact path without revealing whether another repair record exists.

---

## Section 10 — Insurance Claim Guidance

### Purpose

Reduce anxiety and capture high-intent search traffic from people who have just had an accident.

### Heading

**H2**  
A clearer path from claim to repair.

### Suggested five-step structure

1. **Make sure everyone is safe**  
   Follow emergency and reporting requirements appropriate to the situation.

2. **Start the claim when insurance is involved**  
   Record the claim number, carrier contact, and available coverage information.

3. **Contact Trends**  
   Schedule an inspection, discuss towing or drop-off, and share the claim details.

4. **Review the repair plan and complete paperwork**  
   Trends documents the vehicle, prepares the repair plan, and coordinates the next approved steps.

5. **Follow the repair through delivery**  
   Receive approved status updates and complete the final handoff when the vehicle is ready.

### Legal and compliance rule

This section provides general process guidance, not legal or insurance advice. Statements about the customer’s right to choose a shop, insurer obligations, deductibles, OEM parts, supplements, or timing must be reviewed against current California guidance and Trends’ attorney-approved language before publication.

### CTAs

- Start Your Repair
- Call Trends
- How to File a Claim
- Track an Existing Repair

### SEO role

Create a dedicated `/insurance-claims/` hub and a detailed `/insurance-claims/how-to-file-a-claim/` guide. The homepage summary links to these pages using descriptive anchors.

Potential query themes:

- collision repair insurance claim Bakersfield
- auto body shop insurance help Bakersfield
- what to do after a car accident Bakersfield
- collision repair supplement explained

### Accessibility

- Use an ordered list.
- Avoid auto-advancing steps.
- Keep explanations in plain language.
- Use icons only as reinforcement.

---

## Section 11 — Dealer and Referral Capability

### Purpose

Show that Trends can support dealerships and referral partners without turning the public site into an internal workflow product demo.

### Heading

**H2**  
Built for dealership workflow and long-term partnerships.

### Supporting themes

- Vehicle intake by stock number or approved identifier.
- Defined work scope.
- Assigned point of contact.
- Status visibility.
- Documented completion.
- Consistent quality expectations.

### CTA

Partner With Trends

### Layout

- One concise premium B2B panel.
- Facility or process image.
- Four proof points.
- Link to `/dealer-services/`.

### SEO role

The Dealer Services page can target legitimate B2B intent such as dealership collision support, dealer vehicle body repair, and reconditioning coordination in Bakersfield. It must contain actual process and capability information, not a generic lead form.

### Content requirements

- Approved dealership references or logos require permission.
- Do not imply an official partnership without written confirmation.
- Do not expose internal dealer pricing or workflow records.

---

## Section 12 — Customer Reviews and Trust Proof

### Purpose

Reinforce credibility after the visitor understands the service and process.

### Content

- Three to five approved customer quotes.
- Reviewer first name and last initial, or the exact public display name permitted by the source.
- Review source when appropriate.
- Link to the current Google Business Profile or review platform.
- Optional dealership/referral quote with permission.

### Visual treatment

- Editorial cards with restrained borders.
- Simple fade/translate entrance.
- No auto-rotating carousel.
- Long reviews use an accessible expand/collapse control.

### SEO and structured-data rule

Reviews may be displayed as visible trust content. Do not add self-serving `aggregateRating` or `review` markup to the business’s own `AutoBodyShop` entity in an attempt to obtain review stars. Google’s LocalBusiness guidance does not recommend those properties for a business marking up reviews about itself.

### Accuracy

- Do not hardcode a star rating or review count that will quickly become outdated.
- If ratings are displayed dynamically, provide a stable fallback and approved API/data source.
- Preserve the original meaning of customer quotes.

---

## Section 13 — Frequently Asked Questions

### Purpose

Answer high-intent questions, reduce calls that do not require staff assistance, and support service/claim relevance.

### Recommended homepage questions

1. Do you work with my insurance company?
2. Can I choose Trends for my collision repair?
3. Do I need an appointment for an estimate?
4. How long will my repair take?
5. What happens if additional damage is found?
6. How will I receive repair updates?
7. Do you offer towing or help coordinate towing?
8. What certifications does Trends hold?
9. Do you repair aluminum or plastic components?
10. What should I bring when I drop off my vehicle?

### Answer rules

- Answers must be approved by operations and legal/compliance where needed.
- Do not guarantee timing.
- Explain that repair duration depends on damage, parts, approvals, and repair requirements.
- Do not state that every insurer relationship is identical.
- Link to the relevant service, claim, tracker, certification, or contact page.

### Interaction

- Use an accessible accordion.
- Buttons expose `aria-expanded` and reference the controlled panel.
- First question is not automatically opened on mobile unless testing supports it.

### SEO

FAQ content must be visible and helpful. Structured data may be added only when it accurately represents visible content and current Google eligibility/guidelines are satisfied. Rich-result display is never guaranteed.

---

## Section 14 — Bakersfield Location and Contact

### Purpose

Capture local-intent conversions and provide the authoritative NAP record for users and search engines.

### Heading

**H2**  
Visit Trends Collision Center in Bakersfield.

### Required content

- Verified business name.
- Verified street and suite address.
- Bakersfield, CA ZIP.
- Main phone.
- Public email.
- Regular and holiday hours.
- Directions link.
- Parking/drop-off instructions.
- Estimate policy.
- Towing instructions.
- Accessibility information for the facility where available.
- Embedded or click-to-load map.
- Contact/repair inquiry form.

### Layout

- Warm-bone section.
- Contact details and CTAs on one side.
- Facility image or click-to-load map on the other.
- Prominent **Call**, **Get Directions**, and **Start Your Repair** actions.

### Map performance

- Prefer a static map image or button that loads the interactive map on demand.
- Do not let a third-party map block the initial page or inject unnecessary trackers before consent.

### SEO role

- Reinforces the official business entity and local relevance.
- Contains `AutoBodyShop` structured data after facts are verified.
- Uses the exact same NAP as Google Business Profile and approved directories.
- Provides a crawlable directions/location link.

### Single-location rule

For one active location, the homepage and Contact page should be the primary local entity pages. Do not create dozens of nearby-city landing pages.

### Multi-location rule

Only if Trends confirms multiple active customer-facing locations:

- Create `/locations/`.
- Create one unique page per real staffed location.
- Give each page its own exact NAP, hours, photography, services, and directions.
- Use one `AutoBodyShop` entity per location.
- Do not create a location page for a closed shop, mailbox, service area, or old address.

---

## Section 15 — Final Conversion Panel

### Purpose

Give every visitor an obvious next step after the complete story.

### Heading

**H2**  
Ready to move your repair forward?

### Supporting copy

Talk with Trends about the vehicle, the damage, the claim, and the next best step.

### Actions

- Start Your Repair
- Call Trends
- Get Directions
- Track My Vehicle

### Visual treatment

- Midnight or oxblood background.
- Large restrained typography.
- Metallic border-light sweep on entry, then static.
- No complex 3D.

### Mobile

- Full-width stacked actions.
- Call and Start Repair appear first.
- Track remains visually secondary for new-customer conversion.

---

## Section 16 — Global Footer

### Required content

- Trends logo.
- One-sentence business description.
- Verified NAP.
- Hours.
- Call, directions, and email links.
- Services links.
- Certifications link.
- Insurance Claims link.
- Craftsmanship link.
- About and Contact.
- Track My Vehicle.
- Dealer Services.
- Privacy Policy.
- Terms.
- Accessibility Statement.
- HTML Sitemap.
- Copyright.
- BAR license when verified and approved.
- Official social profiles.

### SEO rules

- Do not place a block of repetitive city and service keywords in the footer.
- Footer links should represent real site hierarchy.
- The NAP must match the Location section and Google Business Profile.
- Social links can support `sameAs` structured data.

### Accessibility

- Use clear link groups with headings.
- Maintain sufficient contrast.
- Avoid tiny legal text.
- Ensure phone and email links communicate their purpose.

---

# 7. Recommended Website Sitemap

## 7.1 Primary navigation sitemap

```text
Home
Services
Certifications
Craftsmanship
Insurance Claims
Why Trends
About
Contact

Utility actions:
Start Your Repair
Track My Vehicle
Call Trends
```

## 7.2 Recommended launch sitemap

```text
/
├── services/
│   ├── collision-repair/
│   ├── frame-structural-repair/
│   ├── auto-paint-refinishing/
│   ├── aluminum-repair/
│   ├── plastic-welding-bumper-repair/
│   └── towing-vehicle-support/            [publish only if verified]
│
├── certifications/
│
├── craftsmanship/
│   └── [case-study-slug]/
│
├── insurance-claims/
│   └── how-to-file-a-claim/
│
├── dealer-services/
├── why-trends/
├── about/
├── contact/
│
├── resources/
│   └── [article-slug]/
│
├── track/                                 [generic utility entry]
├── track/[secure-token-or-session]/       [noindex, nofollow]
├── forms/[secure-token-or-session]/       [noindex, nofollow]
│
├── privacy/
├── terms/
├── accessibility/
└── sitemap/
```

## 7.3 Provisional custom-automotive branch

Because the brand vision includes a West Coast Customs-style premium modification identity, reserve a future content branch without publishing unsupported services.

```text
/custom-automotive/                        [provisional]
├── custom-paint/                          [verify]
├── specialty-body-work/                   [verify]
├── body-kits-and-aero/                    [verify]
├── wheels-suspension-or-performance/      [verify]
└── motorcycles-or-specialty-vehicles/     [verify]
```

This branch should launch only when Trends provides:

- A precise active service list.
- Original project photography.
- Pricing/estimate qualification rules.
- Warranty and liability language.
- Staff/equipment capability confirmation.
- A decision on whether custom work shares the same inquiry form as collision repair.

The collision-repair SEO strategy should remain primary. Custom content should complement, not confuse, the core entity.

---

# 8. Page and Keyword Map

Exact keyword priority must be validated with Search Console and keyword tools. The map below establishes distinct search intent and prevents every page from competing for the same phrase.

| URL | Page purpose | Provisional primary intent | Supporting terms | Recommended H1 | Index status |
|---|---|---|---|---|---|
| `/` | Brand, primary local conversion, broad service overview | collision repair Bakersfield CA | auto body shop Bakersfield, collision center Bakersfield | From impact to immaculate. | Index |
| `/services/` | Service hub | auto body repair services Bakersfield | collision services, body shop services | Collision repair capabilities for Bakersfield drivers. | Index |
| `/services/collision-repair/` | Detailed collision service | certified collision repair Bakersfield | accident repair, body collision repair | Certified collision repair built around the vehicle. | Index |
| `/services/frame-structural-repair/` | Structural service | frame repair Bakersfield CA | structural collision repair, unibody repair | Frame and structural repair in Bakersfield. | Index |
| `/services/auto-paint-refinishing/` | Paint/refinish service | auto paint repair Bakersfield | collision refinishing, paint matching | Auto paint and refinishing with finish discipline. | Index |
| `/services/aluminum-repair/` | Aluminum service | aluminum collision repair Bakersfield | aluminum body repair | Aluminum repair for modern vehicle construction. | Index after verification |
| `/services/plastic-welding-bumper-repair/` | Plastic/bumper service | bumper repair Bakersfield | plastic welding, plastic bumper repair | Plastic welding and bumper repair in Bakersfield. | Index after verification |
| `/services/towing-vehicle-support/` | Towing/drop-off | collision towing Bakersfield | accident towing, vehicle drop-off | Towing and vehicle support when a repair begins. | Index only if verified |
| `/certifications/` | Trust and certification explanation | certified auto body shop Bakersfield | OEM-certified collision repair | Certifications that support the repair. | Index |
| `/craftsmanship/` | Portfolio hub | collision repair before and after Bakersfield | auto body repair gallery | Collision repair craftsmanship you can see. | Index |
| `/craftsmanship/[slug]/` | Unique project proof | long-tail vehicle/service query | before and after, repair case study | Project-specific descriptive H1 | Index when substantial |
| `/insurance-claims/` | Claim coordination | insurance collision repair Bakersfield | insurance body shop help | A clearer path from claim to repair. | Index |
| `/insurance-claims/how-to-file-a-claim/` | Educational guide | how to file auto insurance claim California | accident claim steps, body shop claim | How to begin an auto damage claim and repair. | Index after legal review |
| `/dealer-services/` | B2B dealer work | dealership body repair Bakersfield | dealer reconditioning, dealer collision support | Collision and body support for dealership vehicles. | Index |
| `/why-trends/` | Differentiation | why choose Trends Collision Center | quality control, repair tracking | A higher standard for the repair experience. | Index |
| `/about/` | Brand/entity trust | Trends Collision Center Bakersfield | local collision center, team, facility | Built around craft, clarity, and accountability. | Index |
| `/contact/` | Local conversion and NAP | contact auto body shop Bakersfield | directions, collision estimate | Contact Trends Collision Center in Bakersfield. | Index |
| `/resources/` | Educational hub | collision repair resources | accident repair guides | Collision repair guidance from Trends. | Index |
| `/track/` | Existing-customer entry | vehicle repair tracker | repair status | Track your vehicle repair. | Consider noindex if thin |
| `/track/[token]` | Secure customer status | none | none | Generic status heading only | Noindex, nofollow |
| `/forms/[token]` | Secure customer documents | none | none | Generic form heading only | Noindex, nofollow |

### 8.1 Keyword-use rules

- Put the most important service/location language in the page title, visible introduction, relevant headings, image context, and internal link text.
- Do not repeat the exact keyword in every heading.
- Do not append “Bakersfield CA” to every sentence or card.
- Write for a person deciding where to repair a vehicle.
- Use synonyms naturally: collision repair, auto body repair, body shop, collision center, refinishing, structural repair.
- Do not create pages based only on keyword variations.
- Do not target nearby cities with duplicate copy.

---

# 9. Recommended Metadata

Metadata is draft copy and must be updated after final service and NAP approval.

## 9.1 Homepage

**Title**  
Collision Repair in Bakersfield, CA | Trends Collision Center

**Meta description**  
Certified collision repair, auto body repair, refinishing, structural repair, and vehicle status tracking from Trends Collision Center in Bakersfield, CA.

**Canonical**  
`https://[approved-domain]/`

**Open Graph title**  
From Impact to Immaculate | Trends Collision Center

**Open Graph description**  
Premium collision repair, certified capability, and clear customer repair visibility in Bakersfield, California.

**Open Graph image**  
A high-resolution Coachbuilt After Dark composition using the Trends logo and an approved finished vehicle or facility detail. Do not use the 3D canvas as the only share image.

## 9.2 Service page title pattern

`[Primary Service] in Bakersfield, CA | Trends Collision Center`

Examples:

- Frame & Structural Repair in Bakersfield, CA | Trends
- Auto Paint & Refinishing in Bakersfield, CA | Trends
- Aluminum Collision Repair in Bakersfield, CA | Trends

Avoid forcing the full brand name into titles when it makes them repetitive or unreadable. Use a consistent title template in Next.js and review final title appearance in search results.

## 9.3 Case-study title pattern

`[Vehicle / Project] [Repair Type] Case Study | Trends Collision Center`

The visible H1 should remain natural and descriptive rather than a keyword string.

## 9.4 Secure-route metadata

Tracker and form routes require:

- Generic title.
- No customer name, vehicle, claim, VIN, insurer, or status data.
- `noindex, nofollow`.
- No social preview containing repair information.
- `Cache-Control: private, no-store` where applicable.

---

# 10. Structured Data Strategy

## 10.1 Homepage and Contact page

Use `AutoBodyShop` as the primary entity after verification. Include accurate visible properties such as:

- `name`
- `url`
- `logo`
- `image`
- `telephone`
- `email` where approved
- `address`
- `geo`
- `openingHoursSpecification`
- `priceRange` only if a meaningful approved value exists
- `sameAs`
- `areaServed`
- `hasMap`

Do not place data in JSON-LD that is absent from or contradicted by the visible page.

## 10.2 Service pages

Use `Service` only when it accurately describes the visible page. Connect it to the `AutoBodyShop` provider and verified area served.

Potential fields:

- `name`
- `description`
- `provider`
- `areaServed`
- `serviceType`
- `url`
- `image`

## 10.3 Nested pages

Use `BreadcrumbList` on service, certification, case-study, claim, and resource pages. Breadcrumbs should represent a normal user path rather than blindly mirroring URL segments.

## 10.4 Resource articles

Use `Article` or `BlogPosting` when the page is genuinely an article. Include:

- Headline.
- Author or reviewed-by information when appropriate.
- Publication and meaningful modification dates.
- Representative image.
- Publisher.

Do not change dates merely to make content appear fresh.

## 10.5 Review markup

Do not add `aggregateRating` or `review` to the business’s own LocalBusiness/AutoBodyShop markup for self-serving star snippets.

## 10.6 FAQ markup

Only add FAQ structured data when:

- The questions and answers are visible.
- They are not user-generated or misleading.
- The page fits current Google eligibility and guidelines.
- The markup exactly matches the content.

Do not promise a rich result.

## 10.7 Next.js implementation

- Render JSON-LD server-side in the relevant page or layout.
- Sanitize serialized data before insertion.
- Type the data with `schema-dts` or an equivalent checked model.
- Validate with Google Rich Results Test and Schema Markup Validator.
- Keep business facts in one typed, reviewed source to prevent template drift.

---

# 11. Local SEO Plan for Bakersfield, California

## 11.1 One authoritative local entity

For a single active location:

- Use one primary Google Business Profile.
- Match business name, address, phone, hours, URL, and categories exactly.
- Use the homepage as the primary broad local landing page.
- Use Contact as the detailed location page.
- Do not create thin pages for Rosedale, Oildale, Lamont, Seven Oaks, or other nearby areas merely to rank for city names.

Google states that local results are principally influenced by relevance, distance, and prominence. The website can improve relevance and trust, but it cannot change the searcher’s distance from the business.

## 11.2 Google Business Profile requirements

- Verify ownership.
- Confirm the primary category accurately reflects the core business.
- Add only relevant secondary categories.
- Use the canonical website URL.
- Complete hours, special hours, phone, services, business description, and attributes.
- Upload original exterior, interior, team, process, and finished-work photos.
- Use the same logo and brand name as the website.
- Respond professionally to reviews.
- Use UTM parameters on the website link if analytics governance approves them.
- Remove or close old/duplicate profiles.

## 11.3 Citation and directory cleanup

Audit and correct:

- Google Business Profile.
- Apple Business Connect / Apple Maps.
- Bing Places.
- Yelp.
- Facebook.
- Chamber listings.
- Better Business Bureau where applicable.
- OEM certification directories.
- Insurer/DRP directories where authorized.
- Carwise and repair-industry profiles.
- Data aggregators and old local-search pages.

The objective is not to create as many listings as possible. It is to ensure important, legitimate listings contain the same verified entity data.

## 11.4 Reviews

- Ask customers for honest reviews through an approved post-repair workflow.
- Do not offer prohibited incentives.
- Make the request easy by linking directly to the approved profile.
- Reply to both positive and negative feedback.
- Use review themes as customer-experience feedback, not as copy to manipulate rankings.

## 11.5 Local authority and links

Earn relevant local and industry references through real relationships:

- OEM certification directories.
- Insurer/repair program directories where applicable.
- Dealership partner pages with permission.
- Local business organizations.
- Community sponsorships and events.
- Trade associations.
- Local news coverage of meaningful facility, certification, or community developments.

Avoid buying bulk directory links or creating artificial partner pages.

## 11.6 Spanish-language opportunity

Bakersfield may justify a Spanish-language customer path, but it should launch only when Trends can support it operationally.

A proper Spanish version requires:

- Human-reviewed translation.
- Spanish navigation and forms.
- Spanish customer support expectation.
- `hreflang` implementation.
- Separate indexable URLs, such as `/es/`, when content is complete.
- Consistent translation of legal and claim guidance.

Do not publish automatically translated fragments or a language selector that leads to incomplete pages.

---

# 12. Service Page Template

Every service page should follow a reusable structure while retaining unique content.

## 12.1 Required page sections

1. Breadcrumbs.
2. Service-specific local eyebrow.
3. One descriptive H1.
4. Service summary and primary CTA.
5. Original service/process media.
6. What the service addresses.
7. How Trends approaches the service.
8. Relevant materials, tools, training, or certification proof.
9. Related case study.
10. Customer process / what to expect.
11. Relevant FAQs.
12. Related services.
13. Bakersfield location/contact CTA.
14. Final conversion panel.

## 12.2 Content rules

- No fixed word-count requirement.
- Provide enough original information to answer the user’s decision-making questions.
- Avoid copying manufacturer or competitor text.
- Use verified shop experience and original photography.
- Explain limitations and inspection requirements.
- Do not make price or timeline promises without approved rules.
- Include the local context naturally, usually in the title, introduction, and contact section.

## 12.3 Reusable components

- `ServiceHero`
- `ServiceOverview`
- `ServiceProofGrid`
- `ProcessSteps`
- `RelatedCaseStudy`
- `ServiceFaq`
- `RelatedServices`
- `LocalContactPanel`
- `FinalConversionPanel`

---

# 13. Certification Hub Template

## 13.1 Required content

- What certification means.
- Current verified program list.
- Training/equipment/procedure explanation.
- Vehicle or brand applicability.
- Customer benefit.
- Official verification links when available.
- Relevant service pages.
- Relevant case studies.
- Claim/estimate CTA.

## 13.2 Individual certification page rule

Create an individual page only when Trends can provide:

- Active status proof.
- Correct program name.
- Approved logo usage.
- At least one meaningful repair/process explanation.
- Vehicle applicability.
- Original photos or case studies.
- Unique customer value beyond swapping the manufacturer name.

Otherwise, keep the certification in the hub.

---

# 14. Case Study Template

## 14.1 Recommended fields

- Case-study title.
- Slug.
- Publication status.
- Vehicle year/make/model.
- Project category.
- Damage or work summary.
- Services performed.
- Materials/processes.
- Certification relevance.
- Before media.
- Process media.
- After media.
- Quality-control summary.
- Approved customer quote.
- Related services.
- SEO title and description.
- Canonical URL.
- Privacy approval.

## 14.2 Page structure

1. Breadcrumbs.
2. Project headline.
3. Concise project summary.
4. Before image with caption.
5. Repair challenge.
6. Repair process.
7. Process gallery.
8. Final result.
9. Quality-control statement.
10. Related service links.
11. Start Your Repair CTA.

## 14.3 Thin-content prevention

Do not index a project page that contains only two images and one sentence. Keep incomplete projects in the gallery or CMS draft state until the story is substantial.

---

# 15. Resource Content Roadmap

The Resources section supports customer education and internal linking. It should not become a high-volume generic blog.

## 15.1 Priority topics

1. What to Do After a Car Accident in Bakersfield
2. What Happens During a Collision Repair Inspection?
3. What Is an Insurance Supplement in Collision Repair?
4. How Long Does Collision Repair Take?
5. What Does OEM-Certified Collision Repair Mean?
6. How Automotive Paint Matching Works
7. Signs a Vehicle May Have Structural Damage
8. Aluminum Body Repair: Why the Process Is Different
9. Plastic Bumper Repair vs. Replacement
10. What Customers Can See in the Trends Repair Tracker
11. Questions to Ask Before Choosing a Collision Repair Center
12. How Dealership Vehicle Repair Workflows Differ from Insurance Repairs

## 15.2 Content standards

- Have operational or technical content reviewed by a qualified Trends team member.
- Cite authoritative consumer or regulatory sources when discussing laws, safety, or insurance.
- Include original shop perspective.
- Add original images or diagrams where useful.
- Link to a relevant service, claim, certification, case study, and contact action.
- Display an accurate reviewed/updated date.
- Do not publish rewritten competitor content.
- Do not manufacture local relevance by repeating neighborhood names.

---

# 16. Internal Linking Plan

## 16.1 Homepage links

The homepage should link to:

- Services hub.
- Every featured service.
- Certifications hub.
- Craftsmanship hub and featured case studies.
- Insurance Claims hub.
- How to File a Claim guide.
- Why Trends.
- Dealer Services.
- About.
- Contact.
- Tracker entry.

## 16.2 Service pages

Each service page should link to:

- Services hub.
- One or two related services.
- Relevant certification content.
- Relevant case studies.
- Claim guidance when appropriate.
- Contact / Start Repair.

## 16.3 Case studies

Each case study should link to:

- The main service performed.
- Relevant materials/process pages.
- Certification hub.
- Another related project.
- Start Repair.

## 16.4 Resource articles

Each article should link to:

- The service that solves the user’s problem.
- The Claims hub when insurance is involved.
- A case study when available.
- Contact or Start Repair.

## 16.5 Anchor text

Use descriptive anchor text:

- Good: “Explore aluminum collision repair.”
- Good: “See how the customer repair tracker works.”
- Weak: “Click here.”
- Weak: “Learn more” without nearby context.

---

# 17. Technical SEO Requirements for Next.js

## 17.1 Rendering

- Server-render indexable marketing content.
- Do not require client JavaScript to reveal core copy.
- Keep Three.js and heavy motion behind dynamic client boundaries.
- Provide crawlable URLs for each meaningful page.

## 17.2 Metadata

Use Next.js metadata APIs for:

- Unique title.
- Unique meta description.
- Canonical URL.
- Open Graph data.
- Twitter/social metadata where needed.
- Robots directives.
- Alternate language URLs if Spanish launches.

## 17.3 Sitemap

Implement `app/sitemap.ts` to include only canonical, indexable public pages.

Do not include:

- Secure tracker URLs.
- Secure form URLs.
- Draft content.
- Duplicate filters.
- Search results.
- Preview URLs.
- Expired temporary pages.

Case studies and resources should enter the sitemap only after publication.

## 17.4 Robots

Implement `app/robots.ts`.

- Allow public marketing content.
- Reference the canonical sitemap.
- Do not rely on robots.txt to protect private customer data.
- Secure routes require authorization and `noindex`; privacy is enforced by the application/backend, not crawler directives.

## 17.5 Canonicals and redirects

- Choose one canonical host.
- Redirect HTTP to HTTPS.
- Redirect non-preferred host to preferred host.
- Redirect trailing-slash variants consistently.
- Create a migration map from every current indexed URL to the closest new equivalent.
- Use 301 redirects for permanent URL changes.
- Do not redirect every removed URL to the homepage when a more relevant destination exists.

## 17.6 404 and removed content

- Return a real 404 for missing pages.
- Offer links to Services, Claims, Contact, and Track.
- Use 410 only for deliberately removed content when appropriate.
- Monitor Search Console after migration.

## 17.7 Structured data

- Generate JSON-LD server-side.
- Use a typed central business entity.
- Validate before deployment.
- Do not mark up hidden or unverified data.

## 17.8 Search Console and analytics

- Verify domain property in Google Search Console.
- Submit sitemap.
- Monitor indexing, Core Web Vitals, enhancement reports, and query data.
- Connect Google Business Profile to the correct website and analytics strategy.
- Track conversions without including customer-sensitive repair data.

Recommended public events:

- `start_repair_click`
- `call_click`
- `directions_click`
- `track_entry_click`
- `service_view`
- `claim_guide_view`
- `contact_submit`
- `dealer_inquiry_submit`
- `threejs_process_engaged`
- `threejs_fallback_used`

Do not send VINs, claim numbers, phone numbers, customer names, or token values to analytics.

---

# 18. Performance and Core Web Vitals

Google recommends good Core Web Vitals and an overall strong page experience. The cinematic design must be engineered around that requirement.

## 18.1 Targets

- LCP: within 2.5 seconds at the 75th percentile.
- INP: under 200ms at the 75th percentile.
- CLS: under 0.1 at the 75th percentile.

These are experience targets, not guarantees of ranking.

## 18.2 Homepage performance rules

- Hero HTML and SVG load before Three.js.
- No 70MB production model.
- Production vehicle assets should be optimized into desktop and lower-detail tiers.
- Lazy-load the process model near the viewport.
- Use responsive images.
- Reserve media dimensions to prevent layout shift.
- Avoid simultaneous autoplay video and Three.js.
- Pause animations outside the viewport.
- Avoid excessive third-party scripts.
- Click-to-load maps.
- Use local or optimized font delivery.
- Limit above-the-fold client JavaScript.
- Measure on real mid-range mobile devices, not only development desktops.

## 18.3 3D fallbacks

- Static AVIF/WebP poster.
- Three-image phase sequence.
- Low-detail GLB.
- Full desktop GLB.

The user receives the best tier their device can support without losing the content.

---

# 19. Accessibility Requirements

Target WCAG 2.2 AA across marketing, tracker, and form routes.

## 19.1 Global requirements

- Semantic headings in logical order.
- One clear page-level H1.
- Skip link.
- Keyboard navigation.
- Visible focus.
- 44–48px practical touch targets.
- Sufficient contrast without relying on glow.
- Text zoom to 200% without loss of content.
- No meaning communicated by color alone.
- Reduced-motion support.
- Accessible form labels and errors.
- Live regions used sparingly.
- No hover-only content.

## 19.2 Three.js requirements

- Canvas is not the only source of information.
- Canvas is not keyboard focusable unless a separate viewer has a genuine keyboard interaction model.
- Phase content exists in the DOM.
- Reduced-motion and static fallbacks are complete.
- No flashing or rapid motion.

## 19.3 Media requirements

- Informative images receive useful alt text.
- Decorative images use empty alt text.
- Before/after controls are keyboard operable.
- Video has captions and transcript when used.
- Auto-playing media is muted, stoppable, and avoided where possible.

---

# 20. CMS and Content Model Requirements

The frontend should not hardcode core business content across many components.

## 20.1 Business entity

```ts
interface BusinessProfile {
  publicName: string;
  legalName?: string;
  canonicalDomain: string;
  phone: string;
  email?: string;
  address: PostalAddress;
  geo?: { latitude: number; longitude: number };
  hours: OpeningHours[];
  barLicense?: string;
  mapUrl?: string;
  socialProfiles: string[];
  verifiedAt: string;
}
```

## 20.2 Service model

```ts
interface ServiceContent {
  id: string;
  name: string;
  slug: string;
  summary: string;
  body: RichText;
  status: 'draft' | 'verified' | 'published' | 'retired';
  seo: SeoFields;
  media: MediaAsset[];
  relatedServiceIds: string[];
  relatedCertificationIds: string[];
  relatedCaseStudyIds: string[];
  requiresOperationalVerification: boolean;
}
```

## 20.3 Certification model

```ts
interface CertificationContent {
  id: string;
  officialName: string;
  publicLabel: string;
  logo: MediaAsset;
  description: string;
  officialUrl?: string;
  active: boolean;
  verifiedAt: string;
  expiresAt?: string;
  displayPriority: number;
}
```

## 20.4 Case-study model

```ts
interface CaseStudyContent {
  id: string;
  slug: string;
  title: string;
  vehicle?: {
    year?: number;
    make?: string;
    model?: string;
  };
  summary: string;
  challenge: RichText;
  process: RichText;
  outcome: RichText;
  media: MediaAsset[];
  serviceIds: string[];
  certificationIds: string[];
  privacyApproved: boolean;
  publishedAt?: string;
  seo: SeoFields;
}
```

## 20.5 Homepage section model

Each section should support:

- Enabled/disabled state.
- Display order.
- Approved heading level.
- Theme mode.
- Copy fields.
- Media.
- CTA configuration.
- Draft and verification state.
- Motion preset.
- Accessibility label overrides where needed.

Avoid building a completely free-form page builder that allows arbitrary heading or layout misuse. Use controlled section types.

---

# 21. Content and Photography Checklist

## 21.1 Required photography

- Exterior facility.
- Interior/shop floor.
- Team at work.
- Finished vehicle three-quarter views.
- Paint reflections.
- Panel alignment.
- Structural/body process.
- Aluminum or plastic repair where available.
- Paint preparation and booth.
- Quality-control inspection.
- Before/after pairs.
- Customer handoff or delivery.
- Towing vehicle if promoted.
- Dealer workflow imagery if promoted.
- Custom projects if the custom branch launches.

## 21.2 Photography rules

- Preserve accurate paint color.
- Use controlled lighting.
- Avoid generic stock supercars.
- Avoid showing unsafe practices.
- Protect customer data and license plates.
- Obtain releases where required.
- Deliver wide, landscape, portrait, square, and mobile crops.

## 21.3 Copy approvals needed

- Hero copy.
- Brand introduction.
- Service summaries.
- Claim process.
- Certification descriptions.
- Warranty language.
- Insurance language.
- Tracker description.
- Dealer program.
- FAQ answers.
- NAP.
- Legal disclaimers.

---

# 22. Recommended Launch Phases

## Phase 1 — Information verification

- Approve business name, domain, NAP, hours, BAR license, and active locations.
- Verify services.
- Verify certifications.
- Confirm insurance/claim wording.
- Confirm custom-work scope.
- Audit current URLs and listings.

## Phase 2 — Core content and design

- Build global header/footer.
- Build logo hero.
- Build brand introduction.
- Build services, certifications, claims, about, and contact pages.
- Create first original photography set.
- Establish metadata and structured data.

## Phase 3 — Three.js process story

- Acquire commercially licensed model.
- Clean model hierarchy.
- Prepare desktop/mobile tiers.
- Build scroll timeline and fallbacks.
- Test performance and reduced motion.

## Phase 4 — Proof and growth content

- Publish case studies.
- Publish resource guides.
- Add dealer page.
- Add verified custom-work branch if applicable.

## Phase 5 — Tracker and forms integration

- Connect customer-safe APIs.
- Implement token/session exchange.
- Add noindex and private cache rules.
- Complete utility-mode QA.

## Phase 6 — Migration and local SEO launch

- Configure redirects.
- Publish sitemap/robots.
- Validate schema.
- Verify Search Console.
- Update Google Business Profile and approved directories.
- Monitor crawl, rankings, GBP actions, and conversions.

---

# 23. Homepage Acceptance Checklist

## Brand and design

- [ ] Coachbuilt After Dark visual system is preserved.
- [ ] Trends logo is the primary hero visual.
- [ ] Vehicle model is used in a separate explanatory process section.
- [ ] Dark marketing and warm-bone utility modes feel related.
- [ ] Metallic border and hover effects are restrained.
- [ ] Original imagery supports the premium positioning.

## Content

- [ ] Homepage clearly identifies collision repair and Bakersfield.
- [ ] Services are verified.
- [ ] Certifications are verified.
- [ ] Claim wording is approved.
- [ ] Tracker description matches actual customer-safe behavior.
- [ ] Dealer and custom claims are accurate.
- [ ] Every section has a meaningful purpose and CTA.

## SEO

- [ ] Canonical domain is approved.
- [ ] Business name, address, phone, and hours are verified.
- [ ] Home title and description are unique.
- [ ] Visible local intro exists outside the 3D canvas.
- [ ] All indexable pages are linked.
- [ ] No thin nearby-city pages exist.
- [ ] `AutoBodyShop` JSON-LD validates.
- [ ] Breadcrumbs validate on nested pages.
- [ ] Secure tracker and form routes are noindex.
- [ ] Sitemap excludes private/draft URLs.
- [ ] Redirect map is complete.

## Performance

- [ ] Hero does not wait for WebGL.
- [ ] 3D model is optimized and commercially licensed.
- [ ] Mobile/low-power fallbacks work.
- [ ] LCP, INP, and CLS targets are measured in production-like conditions.
- [ ] Images are responsive and dimensioned.
- [ ] Third-party scripts are controlled.

## Accessibility

- [ ] Keyboard navigation is complete.
- [ ] Focus is visible.
- [ ] Reduced motion is complete.
- [ ] Canvas content has semantic equivalents.
- [ ] Mobile touch targets are adequate.
- [ ] Contrast passes.
- [ ] Forms and errors are announced correctly.

## Local launch

- [ ] Google Business Profile points to the canonical site.
- [ ] Old or duplicate listings are corrected.
- [ ] Search Console is verified.
- [ ] Sitemap is submitted.
- [ ] Directions, call, and contact conversions are tracked.
- [ ] No customer-sensitive data enters analytics.

---

# 24. Open Questions for Trends

1. What exact public business name should appear everywhere?
2. Which location or locations are currently active?
3. Is Trends Auto Boutique part of this website, a separate website, or inactive?
4. What is the exact primary address and suite number?
5. What is the preferred main phone and estimate phone?
6. What are the current business and estimate hours?
7. Which services are performed in-house?
8. Which services are coordinated through approved sublet partners?
9. Which custom modification services are currently offered?
10. Which certifications are active today?
11. What warranty language is approved?
12. Which insurance/DRP relationships may be named publicly?
13. Is towing available 24/7, during business hours, or by coordination only?
14. Does Trends offer walk-in estimates, appointments, photo estimates, or all three?
15. Which team members may be photographed or named?
16. Is Spanish customer support available for calls, forms, and repair updates?
17. What exact public stages will the customer tracker show?
18. Which claim and authorization language has attorney approval for the public website?
19. Are Google reviews and profile ownership current?
20. Which three completed repairs should become the first case studies?

---

# 25. Research References

## Project documents

- [`design.md`](./design.md)
- [`architecture.md`](./architecture.md)

## Google Search and local SEO

- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [SEO Guide for Web Developers](https://developers.google.com/search/docs/fundamentals/get-started-developers)
- [Creating Helpful, Reliable, People-First Content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Tips to Improve Your Local Ranking on Google](https://support.google.com/business/answer/7091)
- [Establish Business Details with Google](https://developers.google.com/search/docs/appearance/establish-business-details)
- [Local Business Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Breadcrumb Structured Data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [General Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Review Snippet Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- [Image SEO Best Practices](https://developers.google.com/search/docs/appearance/google-images)
- [Core Web Vitals and Google Search](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Spam Policies — Doorway Abuse and Keyword Stuffing](https://developers.google.com/search/docs/essentials/spam-policies)

## Schema

- [Schema.org AutoBodyShop](https://schema.org/AutoBodyShop)

## Next.js

- [Next.js Metadata Files](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
- [Next.js `generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js Sitemap File Convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Next.js Robots File Convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld)

## Current public Trends reference requiring verification

- [Current Trends Auto Collision website](https://trendsautocollision.com/)

---

# 26. Final Recommendation

Build the homepage as a premium editorial experience, but make the SEO foundation deliberately straightforward:

- One authoritative Bakersfield homepage.
- One verified local business entity.
- A clear service hierarchy.
- Strong original service and case-study content.
- Visible semantic text around every visual effect.
- A 3D process story that loads after the essential page.
- No duplicate city pages.
- No unsupported certification, insurance, warranty, or service claims.
- No private repair information in indexable routes or analytics.

The result should look more ambitious than a typical regional collision website while remaining easy for Google, customers, insurers, dealerships, and future developers to understand.
