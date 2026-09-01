# Trends Collision Frontend Design System

**Document:** `design.md`  
**Status:** Approved direction translated into production design requirements  
**Approved visual system:** Concept 03 — **Coachbuilt After Dark**  
**Frontend stack context:** Next.js App Router, React, TypeScript, Three.js through React Three Fiber  
**Scope:** Public marketing website, customer vehicle tracker, and customer-facing digital forms  
**Out of scope:** Internal repair-order dashboard, workflow engine, database design, insurer integrations, and backend business logic

---

## 1. Purpose

This document defines the visual, interaction, responsive, accessibility, and component requirements for the Trends Collision frontend.

The approved direction is **Coachbuilt After Dark**, a mature and cinematic automotive identity that positions Trends as a bespoke repair and refinishing atelier rather than a conventional body shop. It must communicate two ideas at the same time:

1. Trends produces work with the finish discipline and emotional appeal of a high-end custom automotive brand.
2. Trends is a certified, professional collision center trusted with insurance claims, manufacturer procedures, customer documentation, and final quality control.

The frontend has two coordinated presentation modes:

- **Marketing mode:** dark, cinematic, editorial, and visually expressive.
- **Utility mode:** warm, light, calm, highly legible, and optimized for vehicle tracking and forms.

These modes share typography, geometry, status semantics, spacing logic, component behavior, and accessibility standards. They are not separate brands.

---

## 2. Approved design decisions

The client approved Coachbuilt After Dark and specifically requested that the following ideas be combined into the final system.

### 2.1 Logo-led homepage hero

The homepage hero uses the supplied vertical Trends mark as the primary visual object. The hero should retain the visual impact of the logo presentation from the concept overview rather than making the vehicle model the first and only focal point.

The logo may appear as:

- A crisp inline SVG in the document layer.
- A metallic, dimensional duplicate in the enhanced desktop scene.
- A monolithic object revealed through controlled studio lighting.
- A framed architectural element that reinforces the tall proportions of the supplied mark.

The readable SVG remains present even when a 3D enhancement is used. The brand must never disappear while a canvas loads.

### 2.2 Separate Three.js vehicle process narrative

The vehicle model becomes a dedicated homepage section that walks the visitor through the Trends process using scroll-linked animation:

1. **Scan** — inspect, assess, and reveal damage or repair zones.
2. **Repair** — show controlled disassembly, panel correction, structural work, and refinishing preparation.
3. **Finish** — resolve into a restored painted surface and final quality-control presentation.

This section must explain the repair process, not function as decoration.

### 2.3 Approved motion language

The final experience includes:

- Scroll-triggered editorial reveals.
- A single premium pinned or sticky process sequence on capable desktop devices.
- Purposeful hover responses.
- Metallic border-light animations.
- Controlled image-lighting movement.
- Slow, expensive-feeling camera and material transitions.
- Reduced-motion and low-power alternatives that preserve all information.

### 2.4 Customer tracker and forms utility mode

Customer-facing operational interfaces use a warm-bone visual treatment:

- Warm light surfaces.
- Deep black or oxblood text.
- Racing-red current-state accents.
- Champagne dividers and low-contrast framing.
- Large, reassuring status labels.
- Minimal decorative imagery.
- No decorative Three.js canvas inside forms or the tracker.
- No serif typography in critical controls, legal copy, labels, errors, or status information.

The tracker must only show backend-approved customer-safe content. Internal notes, employee discussions, hidden stages, red flags, and internal activity history are prohibited.

---

## 3. Design principles

### 3.1 Luxury comes from restraint

The interface should not depend on constant movement, heavy glow, large amounts of red, or decorative chrome. Luxury is communicated through proportion, material, lighting, typography, photography, and pacing.

### 3.2 Craft is visible

The site should make panel quality, paint finish, structural discipline, manufacturer procedures, and final inspection visible through close imagery and process storytelling.

### 3.3 Every vehicle receives equal care

The brand should reinforce the shop’s stated quality philosophy: a daily-driver Toyota and a luxury vehicle receive the same disciplined final inspection. Avoid copy or imagery that implies Trends only values exotic vehicles.

### 3.4 Professional credibility appears early

Certifications, claims guidance, customer visibility, towing or in-house capabilities, and quality-control proof should appear before the page becomes purely portfolio-driven.

### 3.5 Motion must explain or reward

Each animation must do at least one of the following:

- Explain progression.
- Establish hierarchy.
- Preserve spatial continuity.
- Confirm interaction.
- Reveal material quality.
- Draw attention to a meaningful state change.

Motion that does none of these should be removed.

### 3.6 Content exists independently of effects

No claim, service, stage, label, or call to action may exist only in a canvas, animation, hover state, or image. The semantic document must remain complete when JavaScript, WebGL, or animation is unavailable.

### 3.7 Utility screens prioritize reassurance

Tracker and form screens are not marketing pages. They should make the customer feel informed, safe, and confident. Avoid dramatic camera movement, aggressive transitions, or ambiguous labels in these routes.

---

## 4. Experience modes

| Mode | Routes | Background | Motion ceiling | Primary purpose |
|---|---|---|---:|---|
| Coachbuilt Marketing | Home, services, certifications, claims guidance, about, case studies, contact | Midnight and oxblood | High in selected sections | Brand impact, trust, capability, conversion |
| Coachbuilt Editorial Light | Certification documents, long-form case studies, claim guides | Warm bone | Medium | Readability and premium editorial pacing |
| Coachbuilt Utility | Customer tracker, intake, document requests, signatures, confirmations | Warm bone and white | Low | Status clarity, completion, legal interaction |
| Reduced Motion | All routes when requested | Same visual tokens | Minimal | Preserve hierarchy without spatial motion |
| Static Fallback | WebGL unsupported, save-data, scene failure | Same visual tokens | None beyond CSS state feedback | Preserve complete content and conversion |

### 4.1 Mode switching rules

- Mode is selected by route and component context, not by a user-facing dark-mode toggle.
- A user motion preference may reduce motion across every mode.
- Utility routes must never inherit full-page dark marketing backgrounds.
- Marketing components may render on warm-bone editorial sections, but utility controls must not adopt decorative serif or metallic effects.

---

## 5. Homepage experience architecture

The homepage should move from identity to trust, process, proof, and conversion.

| Order | Section | Purpose | Primary components | Motion treatment |
|---:|---|---|---|---|
| 1 | Logo Monolith Hero | Establish the new Trends identity | Header, logo stage, headline, primary CTAs, trust labels | One-time logo/light reveal; no endless rotation |
| 2 | Credential Rail | Confirm professional legitimacy immediately | Certification rail, insurer-friendly message, quality statement | Controlled reveal; logos remain readable and static afterward |
| 3 | Scan → Repair → Finish | Explain the repair narrative | Three.js vehicle scene, phase copy, progress rail, fallback media | Scroll-linked scene on capable desktop; sticky or stacked alternative on mobile |
| 4 | Capabilities | Demonstrate in-house expertise | Capability cards, equipment imagery, service links | Lighting-shift hover and editorial mask reveals |
| 5 | Craftsmanship Lookbook | Show finish quality and completed work | Case-study cards, before/after media, category filters | Horizontal editorial sequence on desktop; swipeable cards on mobile |
| 6 | Equal-Care Quality Standard | Explain final inspection philosophy | Oversized statement, QC checklist preview, macro imagery | Slow text/image overlap; no busy effects |
| 7 | Claim Guidance | Make starting a repair feel manageable | Five-step claim process, FAQ, CTA | Sequential numbered reveal |
| 8 | Tracker Preview | Demonstrate customer transparency | Tracker mockup, status timeline, document prompt preview | Minimal state transitions, no decorative 3D |
| 9 | Reviews and Referral Proof | Reinforce social trust | Testimonial cards, partner proof, dealership relationships | Simple fade/translate only |
| 10 | Final Conversion | Capture repair, towing, contact, and tracking actions | CTA panel, contact methods, tracker entry | Metallic frame sweep on entry, then static |

---

## 6. Logo Monolith Hero

### 6.1 Strategic role

The hero should feel like the opening frame of a premium automotive campaign. It must make the supplied Trends mark memorable while immediately explaining that Trends is a professional collision center.

### 6.2 Recommended content

**Eyebrow**  
Certified collision repair · craftsmanship without compromise

**Primary headline**  
From impact to immaculate.

**Supporting statement**  
Certified repair discipline, exceptional finish quality, and clear customer visibility from check-in through final inspection.

**Primary actions**

- Start your repair
- Track my vehicle

**Supporting trust row**

- Manufacturer-certified repair
- Customer repair tracking
- Final quality-control review
- In-house capabilities

Final marketing copy remains subject to content approval, but this hierarchy should not change.

### 6.3 Desktop composition

- Minimum hero height: `min(920px, 100svh)`.
- Maximum content width: `1440px`.
- Copy occupies approximately 42–48% of the content grid.
- Logo stage occupies approximately 38–46% and retains the tall aspect ratio of the supplied mark.
- The logo may extend beyond the visual fold but must not be clipped at 200% browser zoom.
- The headline should remain HTML text, not an image.
- Primary CTAs remain visible without scrolling on common laptop viewports.

### 6.4 Logo-stage enhancement

The base implementation is an inline SVG with CSS-controlled lighting and perspective. An optional client-only enhancement can add:

- A shallow extruded version of the mark.
- Brushed black metal and champagne edge highlights.
- A single slow light pass.
- Very small pointer-responsive key-light movement on fine-pointer devices.
- A controlled settle position after the introduction.

Do not use:

- Endless 360-degree logo rotation.
- Rapid parallax.
- Particle fields.
- Neon outlines.
- Audio.
- Motion that prevents reading the headline.

### 6.5 Intro timeline

| Time | Event |
|---:|---|
| 0–180ms | Midnight background and semantic copy render immediately |
| 180–650ms | Logo silhouette resolves from shadow |
| 400–900ms | Headline lines reveal through a vertical editorial mask |
| 650–1200ms | Champagne edge light crosses the mark once |
| 850–1350ms | Supporting copy and CTAs enter |
| After 1350ms | Scene settles; only subtle pointer lighting remains when allowed |

### 6.6 Hero loading state

- The inline SVG and all HTML content render without waiting for client JavaScript.
- If the enhanced 3D mark is enabled, it loads after the page is interactive or during idle time.
- The SVG remains visible until the enhanced mark is ready, then crossfades without layout shift.
- Do not show an empty canvas, indefinite spinner, or numeric progress indicator in the hero.

### 6.7 Mobile hero

- Use the SVG as the default visual; do not require WebGL.
- Hero height should be content-driven with a target of `min-height: 760px` on standard phones.
- Logo width should remain between 124px and 190px depending on viewport.
- Copy appears before or beside the logo based on available width.
- CTAs stack at widths below 420px and remain at least 48px high.
- The introductory animation should finish in approximately two seconds or less.
- Pointer-reactive lighting is disabled.

### 6.8 Hero accessibility

- The logo has a meaningful accessible name when it represents the brand.
- Any duplicate decorative 3D logo is `aria-hidden="true"`.
- The canvas must not receive keyboard focus.
- Motion is disabled or reduced when `prefers-reduced-motion: reduce` is active.
- Focus is never moved automatically on page load.
- All hero copy remains selectable, zoomable, and present in the document tree.

---

## 7. Three.js vehicle process section

### 7.1 Section name

Working component name: **Vehicle Process Story**  
Customer-facing phase labels: **Scan · Repair · Finish**

### 7.2 Narrative goal

The process section should turn a complex collision repair into a clear visual story. The visitor should understand that Trends inspects the vehicle, repairs it according to disciplined procedures, refinishes it, and completes final quality control.

The scene must not imply that every repair follows exactly the same physical steps. Copy should describe representative phases rather than promise a fixed claim timeline.

### 7.3 Semantic section structure

The DOM contains:

1. Section heading and introductory copy.
2. An ordered list of process phases.
3. A media region containing the canvas or fallback image sequence.
4. A progress indicator tied to the active phase.
5. A closing quality-control statement and CTA.

The phase list remains available to screen readers and in reduced-motion mode.

### 7.4 Phase specification

#### Phase 0 — Establish

- Vehicle appears in a controlled, dark photo-studio environment.
- Camera begins at a front three-quarter view.
- Headline introduces the process.
- No damage is sensationalized; this is a professional assessment visual.

#### Phase 1 — Scan

Visual behavior:

- A soft scanning plane travels across the vehicle once.
- Selected body panels transition to a restrained wireframe or translucent diagnostic material.
- Damage or repair zones are indicated with small oxblood/racing-red highlights.
- Technical labels appear in the DOM beside the scene, not as unreadable canvas-only HUD elements.

Content themes:

- Initial inspection.
- Damage documentation.
- Manufacturer procedure review.
- Repair planning and customer communication.

#### Phase 2 — Repair

Visual behavior:

- Relevant panels separate by a small, believable distance.
- Structural references, panel correction, aluminum or plastic-repair capability, and refinishing preparation are represented abstractly.
- The camera moves slowly along the repair side.
- Champagne guide lines can connect the active component to the explanatory copy.

Content themes:

- Controlled disassembly.
- Structural and body repair.
- Parts, supplements, and approval coordination.
- Surface preparation and paint-system discipline.

#### Phase 3 — Finish

Visual behavior:

- Separated panels return to the finished position.
- Diagnostic materials resolve into the final paint material.
- A studio light travels across the body to reveal surface continuity and reflections.
- The camera settles into a clean final composition.

Content themes:

- Refinishing and color match.
- Reassembly and detail.
- Final inspection.
- Customer notification and delivery readiness.

#### Phase 4 — Quality confirmation

- Scene movement stops.
- A quality-control statement appears.
- CTA options: view craftsmanship, start a repair, or learn about customer tracking.

### 7.5 Desktop scroll behavior

Preferred behavior on capable devices:

- Section height: approximately `320–420vh`, tuned after content and scene testing.
- Scene region becomes sticky within the viewport rather than hijacking page scrolling.
- Copy phases advance in normal document order.
- Scroll progress drives a deterministic scene timeline.
- No snap behavior is required.
- The user can scroll past the section in either direction without being trapped.
- Header and browser controls remain functional.

### 7.6 Tablet and mobile behavior

The mobile experience should not reproduce the entire desktop pin duration.

Recommended pattern:

- A sticky media region occupying 38–48svh.
- Three vertically stacked phase cards beneath or beside the media region.
- The active phase updates as each card enters the central viewport.
- Camera movement is shorter and panel separation is reduced.
- On low-power or narrow devices, use a pre-rendered image sequence or three optimized stills.
- Provide direct phase tabs as an additional control when the scroll relationship is not obvious.
- The user can swipe the page normally; no horizontal scroll hijacking.

### 7.7 Reduced-motion behavior

- Remove camera travel, panel separation, scanning-plane travel, and pinned progression.
- Show a static finished vehicle or a three-image sequence.
- Present all phases as normal content cards.
- Preserve phase labels, supporting copy, and CTA.
- A site-level motion control may offer `Full`, `Reduced`, and `System` modes; `System` is the default.

### 7.8 Scene failure and fallback behavior

| Condition | Required response |
|---|---|
| WebGL unsupported | Render static editorial image and complete phase content |
| Canvas throws during initialization | Replace canvas with fallback media and log a non-sensitive error |
| WebGL context lost | Pause scene, attempt one safe restoration, then fall back |
| Model download fails | Show fallback media; do not block page content |
| `saveData` enabled | Do not download the full model automatically |
| Low device memory or poor performance | Load low-detail scene or static fallback |
| JavaScript disabled | Render all phase content and server-delivered poster image |

### 7.9 3D visual constraints

- Use a premium studio, not a futuristic holographic bay.
- Prefer physically believable paint, reflections, and lighting.
- Avoid excessive bloom, chromatic aberration, film distortion, or fake interface overlays.
- Depth of field should be subtle and disabled on lower tiers.
- The vehicle should not be draggable during the scroll narrative; scroll owns the camera.
- A separate optional model viewer may allow drag interaction outside this section.

---

## 8. Color system

### 8.1 Approved core palette

| Token name | Value | Role |
|---|---|---|
| Midnight | `#09090A` | Primary dark background |
| Oxblood | `#541118` | Deep brand surface and utility emphasis |
| Racing Red | `#C81D2B` | Primary action and current status |
| Champagne Metal | `#C7AD7B` | Premium edge, divider, and focus accent |
| Warm Bone | `#F2EEE6` | Primary light utility background |

### 8.2 Supporting production palette

| Token name | Value | Role |
|---|---|---|
| Carbon Surface | `#121011` | Raised dark panel |
| Dark Elevated | `#1A1618` | Hovered or elevated dark panel |
| Warm Paper | `#FAF8F3` | Form cards and tracker panels |
| Bone Strong | `#E8E1D6` | Dividers and disabled surfaces |
| Light Text | `#F7F2EA` | Primary text on dark surfaces |
| Dark Text | `#121011` | Primary text on light surfaces |
| Dark Muted | `#B6AEA4` | Secondary text on dark surfaces |
| Light Muted | `#6D655D` | Secondary text on light surfaces |
| Success | `#2E7D5B` | Completed tracker stages and success feedback |
| Warning | `#986A24` | Customer-action-needed state |
| Error | `#A51D2A` | Validation and destructive feedback |
| Information | `#315D78` | Neutral service information |

### 8.3 Semantic tokens

Components consume semantic variables, not raw palette values.

```css
:root {
  color-scheme: light dark;

  --color-brand-red: #c81d2b;
  --color-brand-oxblood: #541118;
  --color-brand-champagne: #c7ad7b;
  --color-brand-midnight: #09090a;
  --color-brand-bone: #f2eee6;

  --surface-page-dark: #09090a;
  --surface-panel-dark: #121011;
  --surface-panel-dark-hover: #1a1618;
  --surface-page-light: #f2eee6;
  --surface-panel-light: #faf8f3;
  --surface-panel-light-muted: #e8e1d6;

  --text-primary-on-dark: #f7f2ea;
  --text-secondary-on-dark: #b6aea4;
  --text-primary-on-light: #121011;
  --text-secondary-on-light: #6d655d;

  --border-on-dark: rgb(199 173 123 / 0.24);
  --border-on-light: rgb(84 17 24 / 0.18);
  --focus-ring-inner: #09090a;
  --focus-ring-outer: #c7ad7b;

  --status-current: #c81d2b;
  --status-complete: #2e7d5b;
  --status-action: #986a24;
  --status-error: #a51d2a;
  --status-info: #315d78;
}
```

### 8.4 Contrast requirements

Approved high-value combinations include:

| Foreground / background | Approximate contrast | Use |
|---|---:|---|
| Warm Bone on Midnight | 17.2:1 | Large and body text |
| White on Racing Red | 5.7:1 | Primary button text |
| Warm Bone on Racing Red | 5.0:1 | Brand CTA text |
| Dark Text on Champagne | 8.7:1 | Labels and focus details |
| Champagne on Midnight | 9.2:1 | Dividers and small labels |
| Warm Bone on Oxblood | 12.3:1 | Editorial panels |

Rules:

- Do not use champagne as small text on warm bone.
- Do not communicate status by color alone.
- Glow is decorative and cannot be the only focus, selection, or error indicator.
- Disabled controls still require readable labels.
- Text placed over photography must use a solid or sufficiently opaque backing layer.

---

## 9. Typography

### 9.1 Families

| Role | Family | Use |
|---|---|---|
| Display | Syne, 700–800 | Hero, section statements, selected case-study titles |
| Body and UI | Manrope, 400–700 | Navigation, body copy, buttons, forms, tracker, legal interaction |
| Editorial accent | Instrument Serif, 400–500 | Short pull quotes and craftsmanship statements only |
| Technical label | DM Mono, 500–600 | Repair phase labels, metadata, vehicle details, timestamps |

Fonts should be self-hosted through the framework font pipeline or served from an approved first-party source. Do not load unused weights.

### 9.2 Usage rules

- Syne is not used for dense body copy, form labels, legal language, or error messages.
- Instrument Serif is decorative and never used for controls, small labels, tracker states, or legal text.
- Manrope is the default for all interactive and operational surfaces.
- DM Mono is used sparingly and never for long paragraphs.
- Do not fake condensed text with CSS transforms.
- Avoid all-caps paragraphs. All-caps is reserved for short metadata labels with increased tracking.

### 9.3 Fluid type scale

```css
:root {
  --font-size-00: 0.75rem;
  --font-size-0: 0.875rem;
  --font-size-1: 1rem;
  --font-size-2: clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem);
  --font-size-3: clamp(1.5rem, 1.25rem + 1vw, 2.25rem);
  --font-size-4: clamp(2rem, 1.4rem + 2.6vw, 4rem);
  --font-size-5: clamp(3rem, 1.75rem + 5vw, 7rem);
  --font-size-hero: clamp(3.4rem, 1.6rem + 7vw, 9.5rem);
}
```

### 9.4 Line length and rhythm

- Body copy: 55–72 characters per line.
- Form instructions: 45–70 characters per line.
- Hero supporting copy: maximum 620px.
- Tracker status headline: maximum 22–28 characters per line on mobile when practical.
- Default body line-height: 1.55–1.7.
- Display line-height: 0.86–1.02 depending on size.

---

## 10. Spacing, layout, and geometry

### 10.1 Base spacing scale

Use a 4px base with selected fluid section values.

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --space-9: 6rem;
  --space-10: 8rem;

  --section-block: clamp(5rem, 3rem + 7vw, 11rem);
  --page-gutter: clamp(1rem, 0.3rem + 3vw, 4rem);
}
```

### 10.2 Containers

| Container | Max width | Use |
|---|---:|---|
| Reading | 760px | Claim guidance, legal explanations, case-study body |
| Content | 1180px | Standard sections and utility interfaces |
| Wide | 1440px | Hero, lookbook, Three.js process |
| Full bleed | None | Controlled media and dark transitions |

### 10.3 Grid

- Desktop: 12-column grid with 24–32px gaps.
- Tablet: 8-column grid with 20–24px gaps.
- Mobile: 4-column grid with 16px gaps.
- Use CSS grid for page composition and container queries for reusable component adaptation.
- Avoid fixed pixel heights outside intentional media ratios or sticky scenes.

### 10.4 Radius system

| Token | Value | Use |
|---|---:|---|
| `--radius-sm` | 6px | Inputs, compact tags |
| `--radius-md` | 12px | Buttons, cards, form groups |
| `--radius-lg` | 20px | Feature panels and tracker status cards |
| `--radius-xl` | 32px | Hero media, major editorial panels |
| `--radius-pill` | 999px | Chips and selected CTA styles |

Coachbuilt should feel tailored rather than uniformly rounded. Use square or lightly rounded editorial media frames alongside larger soft utility panels.

### 10.5 Shadow and material

Dark mode uses light falloff and edge contrast more than traditional drop shadows.

```css
:root {
  --shadow-dark-panel:
    0 1px 0 rgb(255 255 255 / 0.04) inset,
    0 30px 80px rgb(0 0 0 / 0.34);

  --shadow-light-panel:
    0 1px 0 rgb(255 255 255 / 0.9) inset,
    0 24px 60px rgb(55 40 30 / 0.1);

  --shadow-focus:
    0 0 0 2px var(--focus-ring-inner),
    0 0 0 5px var(--focus-ring-outer);
}
```

Avoid glassmorphism as a default. Backdrop blur may be used in the header or a small overlay, but content must remain legible when blur is unsupported.

---

## 11. Border glow and metallic light system

The approved Coachbuilt border effect is a **specular edge light**, not a neon glow.

### 11.1 Visual behavior

- A thin champagne highlight travels across one or two edges.
- Racing red may appear as a brief finishing accent on primary CTAs.
- Default cards use a stable low-contrast border.
- The animated pass occurs on first reveal, hover, or keyboard focus—not continuously.
- Focus state remains visible after the animation completes.

### 11.2 Component application

Appropriate:

- Primary CTA panel.
- Case-study card.
- Certification document group.
- Tracker current-state card.
- Selected navigation or tab.

Inappropriate:

- Every paragraph card.
- Every input.
- Disabled controls.
- Long legal text containers.
- Repeating skeleton loaders.

### 11.3 CSS implementation pattern

```css
.glowFrame {
  --glow-angle: 0deg;
  position: relative;
  isolation: isolate;
  border: 1px solid var(--border-on-dark);
  border-radius: var(--radius-lg);
  background: var(--surface-panel-dark);
}

.glowFrame::before {
  content: "";
  position: absolute;
  inset: -1px;
  z-index: -1;
  border-radius: inherit;
  padding: 1px;
  background: conic-gradient(
    from var(--glow-angle),
    transparent 0deg 245deg,
    rgb(199 173 123 / 0.9) 275deg,
    rgb(200 29 43 / 0.65) 300deg,
    transparent 330deg 360deg
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  pointer-events: none;
}

.glowFrame:is(:hover, :focus-within)::before {
  opacity: 1;
  animation: edge-pass 800ms cubic-bezier(.22, 1, .36, 1) both;
}

@keyframes edge-pass {
  from { --glow-angle: -60deg; }
  to { --glow-angle: 300deg; }
}

@media (prefers-reduced-motion: reduce) {
  .glowFrame:is(:hover, :focus-within)::before {
    animation: none;
  }
}
```

Use a registered custom property only after browser support testing. A simpler translated gradient is an acceptable fallback.

---

## 12. Motion system

### 12.1 Motion ownership

Use the simplest layer capable of the behavior:

| Layer | Tool | Allowed use |
|---|---|---|
| Micro interaction | CSS transitions/keyframes | Hover, focus, press, border pass, underline |
| Component transition | Motion for React | Enter/exit, layout changes, accordions, dialogs, section reveals |
| Cinematic timeline | GSAP + ScrollTrigger | Logo enhancement and the single vehicle process story |
| 3D rendering | React Three Fiber / Three.js | Camera, material, light, and vehicle-state interpolation |

Never let two animation systems write the same transform, opacity, or camera property on the same element.

### 12.2 Timing tokens

```css
:root {
  --duration-instant: 100ms;
  --duration-fast: 160ms;
  --duration-base: 240ms;
  --duration-slow: 420ms;
  --duration-section: 700ms;
  --duration-cinematic: 1200ms;

  --ease-standard: cubic-bezier(.22, 1, .36, 1);
  --ease-mechanical: cubic-bezier(.65, 0, .35, 1);
  --ease-linear: linear;
}
```

### 12.3 Motion intensity levels

| Level | Name | Typical components | Behavior |
|---:|---|---|---|
| 0 | Static | Legal text, errors, core tracker data | No spatial motion |
| 1 | Feedback | Buttons, fields, tabs, chips | 1–4px movement, color and border change |
| 2 | Editorial | Section headings, cards, media | Short mask, opacity, or 12–24px translate |
| 3 | Cinematic | Hero logo, case-study transitions | Light pass, slower reveal, limited parallax |
| 4 | Narrative | Vehicle process section only | Scroll-linked camera/material choreography |

### 12.4 Hover effects

- Hover is additive; the control remains understandable without it.
- Fine-pointer detection is required for pointer-following light.
- Cards move no more than 4px vertically.
- Image scale should not exceed 1.035 by default.
- Portfolio cards should favor a lighting or crop shift over a dramatic zoom.
- Touch devices receive pressed-state feedback rather than simulated hover.

### 12.5 Scroll reveals

- Reveal once by default.
- Do not hide large amounts of content until JavaScript runs.
- Server-rendered content starts readable; enhancement may use an initial class applied before hydration only when there is no flash risk.
- Stagger groups by 40–90ms, with a maximum group duration around 500ms.
- Never stagger form fields while the user is trying to complete a task.

### 12.6 Motion accessibility

- Honor `prefers-reduced-motion` in CSS and JavaScript.
- Provide a visible motion control when the site contains a long-running cinematic effect.
- Auto-initiated moving content that continues beyond five seconds needs a pause/stop mechanism unless it is essential and not presented alongside other content.
- Reduced motion should switch to opacity, color, and immediate state changes rather than simply shortening every animation.
- Avoid large zooms, continuous parallax, and full-screen lateral movement.

---

## 13. Photography and media direction

Coachbuilt After Dark succeeds only with strong original content.

### 13.1 Required photography categories

- Finished vehicle three-quarter hero images.
- Macro paint reflections.
- Panel gaps and alignment.
- Welding, structural, aluminum, or plastic-repair process.
- Paint booth and refinishing preparation.
- Technician craftsmanship.
- Quality-control inspection.
- Before-and-after repair pairs.
- Facility and equipment.
- Customer handoff or finished delivery.

### 13.2 Image treatment

- Deep shadows with controlled highlights.
- Neutral or warm color grading; avoid oversaturated teal/orange presets.
- Preserve accurate paint color.
- Use shallow depth of field selectively.
- Do not place small body text directly on detailed vehicle imagery.
- Deliver responsive AVIF/WebP derivatives with an editorial crop plan.

### 13.3 Missing-content fallback

Until original photography exists:

- Use restrained abstract material studies, facility details, and approved brand graphics.
- Do not fill the site with generic stock supercars.
- Label temporary content in the content system so it cannot accidentally ship.

---

## 14. Iconography and illustration

- Use a consistent, simple line-icon family for utility actions.
- Default stroke: 1.5–1.75px at 24px.
- Use filled icons only for critical status or selected navigation.
- Do not use automotive clip art, flames, racing stripes, or tuner-style badges.
- Custom process diagrams may use champagne technical lines and racing-red active points.
- Every icon-only action requires an accessible name and tooltip where the meaning is not universal.

---

## 15. Reusable UI component catalog

This catalog defines the required component set. Detailed TypeScript APIs are defined in `architecture.md`.

### 15.1 Layout primitives

| Component | Purpose | Key variants |
|---|---|---|
| `Container` | Constrain and center content | `reading`, `content`, `wide`, `full` |
| `Section` | Standard section spacing and theme | `dark`, `light`, `oxblood`, `transparent` |
| `Stack` | Vertical rhythm | Gap token, alignment |
| `Cluster` | Wrapping horizontal group | Gap, justify, align |
| `Grid` | Responsive layout | Column recipes and min-item width |
| `Bleed` | Controlled full-bleed media | Horizontal, full viewport |
| `StickyStage` | Sticky media plus scrolling content | Desktop narrative, mobile compact |

### 15.2 Brand and navigation

| Component | Requirement |
|---|---|
| `TrendsLogo` | Inline supplied SVG, monochrome and inverse modes, never rasterized for primary use |
| `LogoStage` | Hero composition with SVG base and optional enhanced layer |
| `SiteHeader` | Transparent-to-solid behavior, keyboard-safe menu, skip link |
| `DesktopNav` | Clear current-page state; no hover-only submenus |
| `MobileNavSheet` | Warm-bone sheet, focus trap, scroll lock, large targets |
| `Footer` | Contact, repair CTA, tracker entry, certifications, legal links |
| `Breadcrumbs` | Case studies, services, claim guidance; semantic ordered list |

### 15.3 Actions

| Component | Variants | Required states |
|---|---|---|
| `Button` | `primary`, `secondary`, `quiet`, `danger` | default, hover, focus, pressed, pending, disabled |
| `LinkButton` | Same visual variants with link semantics | current, external, disabled-like unavailable copy |
| `IconButton` | `subtle`, `outlined`, `solid` | tooltip, focus, pressed, disabled |
| `TextLink` | standard and editorial | default, hover, focus, visited where appropriate |
| `SegmentedControl` | Process phase or content view | selected, focus, disabled |

### 15.4 Editorial marketing components

| Component | Purpose |
|---|---|
| `SectionHeading` | Eyebrow, heading, supporting copy, optional action |
| `EditorialStatement` | Oversized short statement with optional serif accent |
| `CredentialRail` | Certifications and trust marks with accessible labels |
| `CapabilityCard` | Service summary, media, proof point, link |
| `CaseStudyCard` | Vehicle, repair scope, certification, before/after imagery |
| `CaseStudyLookbook` | Responsive desktop sequence and mobile card list |
| `BeforeAfterMedia` | Keyboard-operable comparison slider plus static fallback |
| `ProcessSteps` | Numbered claim or repair steps |
| `TestimonialCard` | Quote, source, relationship, accessible punctuation |
| `CTAFrame` | High-conversion panel with optional metallic border pass |
| `MediaFrame` | Editorial image/video wrapper with aspect, caption, and loading state |

### 15.5 Motion components

| Component | Purpose |
|---|---|
| `SectionReveal` | Standard reveal with reduced-motion behavior |
| `MaskReveal` | Controlled text or media mask; not for forms |
| `SpecularLink` | Champagne underline pass |
| `GlowFrame` | One-time or interaction-driven metallic border light |
| `ParallaxMedia` | Small optional media offset on capable devices |
| `MotionPreferenceProvider` | Resolves system and user-selected motion preference |

### 15.6 Three.js components

| Component | Purpose |
|---|---|
| `LogoMonolithEnhancement` | Optional 3D hero mark; never the sole brand render |
| `VehicleProcessSection` | Semantic section shell and animation controller |
| `VehicleSceneCanvas` | Dynamically loaded R3F canvas |
| `VehicleModel` | Typed model nodes/materials |
| `SceneDirector` | Camera, lights, material and panel interpolation |
| `ProcessPhaseRail` | DOM phase labels and progress |
| `ScenePoster` | Static fallback image |
| `SceneLoadingOverlay` | Accessible non-blocking scene load status |
| `SceneErrorFallback` | Poster, explanation, and content-preserving fallback |

### 15.7 Customer tracker components

| Component | Purpose |
|---|---|
| `TrackerShell` | Warm-bone page shell and secure-route layout |
| `VehicleSummary` | Vehicle identity and repair-order label |
| `CurrentStatusCard` | Current approved stage and friendly update |
| `TrackerTimeline` | Completed/current/upcoming customer-visible stages |
| `StatusTimestamp` | Last public update with absolute and relative context |
| `DocumentRequestCard` | Missing signature or form request |
| `PickupReadyBanner` | High-confidence completion state |
| `TrackerHelpCard` | Shop contact and next action |
| `TrackerSkeleton` | Stable loading geometry |
| `TrackerEmptyState` | Status is being prepared |
| `TrackerTokenState` | Invalid, expired, revoked, or already exchanged token view |
| `StaleDataNotice` | Non-alarming update freshness notice |

### 15.8 Form components

| Component | Purpose |
|---|---|
| `FormShell` | Utility-mode form layout and progress context |
| `FormStepper` | Step labels, completion, current step, summary |
| `FormSection` | Field grouping with heading and instructions |
| `Field` | Label, description, control, error, success hint |
| `TextField` | Text, email, phone, claim number, VIN |
| `TextArea` | Notes and descriptions |
| `SelectField` | Accessible single select |
| `RadioGroupField` | Exclusive choices with visible group label |
| `CheckboxGroupField` | Multiple authorizations or selections |
| `DateField` | Accessible date input with text alternative |
| `FileUpload` | Drag/drop plus button, progress, retry, file validation |
| `DamageDiagramField` | Structured marks plus keyboard-accessible list alternative |
| `SignatureField` | Canvas or typed signature with clear/retry and metadata notice |
| `LegalTextPanel` | Versioned legal content and acknowledgement |
| `FormActions` | Back, save, continue, submit |
| `AutosaveStatus` | Saving, saved, offline, retry |
| `FormErrorSummary` | Focusable summary with links to invalid fields |
| `SubmissionSuccess` | Confirmation, reference, next steps, copy/download action |

### 15.9 Feedback and state components

| Component | Purpose |
|---|---|
| `Skeleton` | Content-shaped loading placeholder |
| `Spinner` | Short local indeterminate action only |
| `ProgressBar` | Upload or known-duration progress |
| `EmptyState` | No content yet, with useful next action |
| `InlineAlert` | Info, success, warning, error |
| `ErrorState` | Recoverable route or section error |
| `OfflineBanner` | Network status and save behavior |
| `ToastRegion` | Non-critical confirmation; not the only error output |
| `Dialog` | Confirmation and focused tasks |
| `Popover` | Supplemental action; never essential-only content |
| `Tooltip` | Icon explanation; not interactive content |

---

## 16. Component visual-state requirements

Every reusable interactive component must document and test:

- Rest.
- Hover where supported.
- Keyboard focus.
- Pressed/active.
- Selected/current.
- Disabled.
- Read-only.
- Pending/loading.
- Success.
- Warning.
- Error.
- High-contrast mode where applicable.
- Reduced-motion mode.
- Narrow container and long-content behavior.

No state may be represented only by opacity below readable contrast.

---

## 17. Loading-state design

### 17.1 General rules

- Show the future layout, not an unrelated spinner.
- Prevent layout shift by matching the final component geometry.
- Use motion sparingly; skeleton shimmer is disabled in reduced-motion mode.
- Never imply exact progress unless the application knows exact progress.
- Keep global navigation available during route-level loading.

### 17.2 Marketing loading

- Server-render hero copy and SVG immediately.
- Images use intrinsic dimensions and low-quality placeholders where appropriate.
- Three.js scene loads independently and never blocks the section copy.
- Certification logos reserve their final dimensions.

### 17.3 Tracker loading

Tracker skeleton includes:

- Vehicle summary line.
- Current-status card.
- Four to six stable timeline rows.
- Document request placeholder only when the response is not yet known.

Use `aria-busy="true"` on the loading region and one polite status message. Avoid announcing every skeleton element.

### 17.4 Form loading

- Initial form fetch: render shell, stepper, and stable form card.
- Submit: disable duplicate submission, preserve field values, change button label to a meaningful pending state.
- Upload: show per-file progress and allow retry/cancel.
- Autosave: show `Saving…`, `Saved`, or `Could not save` without interrupting typing.

---

## 18. Empty-state design

| Context | Empty-state message | Action |
|---|---|---|
| Tracker has no public stage yet | “Your repair status is being prepared.” | Contact Trends if urgent |
| No document requests | “You’re all caught up.” | Return to repair status |
| Case-study category empty | “No published projects in this category yet.” | View all craftsmanship |
| Search returns no service/FAQ | “No matching results.” | Clear filters |
| Upload has no files | Instructional drop area | Choose files |
| Form has no optional authorized pickup person | Explain optional state | Add a person |

Empty states should be calm and specific. Avoid generic “Nothing here” copy.

---

## 19. Error and edge-state design

### 19.1 Error hierarchy

1. **Field error:** Directly below the field and included in a summary on submit.
2. **Section error:** Inline alert within the affected section.
3. **Recoverable route error:** Branded error state with retry.
4. **Unrecoverable route error:** Safe fallback, contact path, and reference ID.

### 19.2 Tracker token states

| State | User-facing treatment |
|---|---|
| Invalid token | “This repair link is not valid.” Do not reveal whether a repair order exists. |
| Expired token | “This repair link has expired.” Provide shop contact and a request-new-link action if supported. |
| Revoked token | Same neutral treatment as invalid/expired; do not explain internal reason. |
| Already exchanged token | Redirect to active secure portal session. |
| Repair not customer-visible | Neutral unavailable message; no data leakage. |
| Backend unavailable | “We could not load the latest repair status.” Show last safe cached status only if explicitly permitted and clearly labeled. |
| No public stages | Status-preparation empty state. |

### 19.3 Form edge cases

- Browser refresh during a multi-step form.
- Session or form token expires while editing.
- Legal template changes before final submission.
- Duplicate submit.
- Uploaded file is too large, unsupported, corrupt, or fails virus scanning.
- Signature field is blank or too small to be meaningful.
- Network drops during autosave.
- User navigates away with unsaved changes.
- Customer has no email address or phone number.
- Long vehicle names, claim identifiers, and authorized-person names.
- Mobile keyboard covers the current field or action bar.

Each edge case requires a documented recovery path. Never discard entered data silently.

### 19.4 WebGL edge cases

- Context loss.
- Browser or GPU blocklist.
- Model material compilation failure.
- Texture memory pressure.
- Device rotation.
- Tab backgrounding.
- Multiple homepage tabs.
- High browser zoom.
- Print mode.

The page must remain complete in every case.

---

## 20. Customer tracker visual specification

### 20.1 Layout hierarchy

1. Trends logo and secure repair-status label.
2. Vehicle summary.
3. Current approved status headline.
4. Friendly public update and timestamp.
5. Customer-visible timeline.
6. Required document actions.
7. Pickup or contact guidance.
8. Privacy and support footer.

### 20.2 Status semantics

| State | Color | Icon | Copy behavior |
|---|---|---|---|
| Complete | Success green | Check | Past-tense, concise |
| Current | Racing red | Filled marker | Present-tense, reassuring |
| Upcoming | Neutral bone/gray | Outline marker | Optional; do not promise dates without data |
| Action required | Warm warning | Document/attention | Clear customer task and deadline if known |
| Ready for pickup | Oxblood and success | Key/check | Strong headline and direct next steps |
| Delayed or blocked | Backend-approved neutral warning | Clock/info | Avoid internal blame or technical shop language |

### 20.3 Timeline behavior

- Vertical timeline on mobile and default desktop utility screens.
- Current stage is programmatically marked with `aria-current="step"`.
- Completed stages include text and icon, not color alone.
- Hidden internal stages do not create mysterious gaps.
- The timeline is generated from the backend-provided customer-safe stage list; the frontend does not infer visibility.
- Estimated dates are shown only when the backend marks them customer-safe and sufficiently reliable.

### 20.4 Tracker motion

- Initial status card fades in or appears immediately.
- Timeline does not animate every time the user opens the page.
- A newly advanced stage may use a short highlight if the route knows it changed since the previous visit.
- No confetti or celebratory animation before pickup is confirmed.

---

## 21. Customer forms visual specification

### 21.1 Form layout

- One primary task per step.
- Maximum reading width of approximately 760px.
- Sticky or fixed mobile action bar only when it does not obscure fields or browser controls.
- Step labels remain visible but collapse to `Step X of Y` on narrow screens.
- Related legal acknowledgements are grouped with descriptive headings.

### 21.2 Field behavior

- Labels are persistent and never placeholder-only.
- Required fields are identified in text, not only with an asterisk.
- Descriptions appear before error text in the accessibility relationship.
- Validation occurs on blur for high-confidence rules and on submit for complex validation; do not validate every keystroke aggressively.
- User-entered values remain after server validation errors.
- Error summary receives focus after failed submission.

### 21.3 Legal and signature treatment

- The backend supplies exact versioned legal text.
- The UI displays the version or effective date when required by product/legal policy.
- A finalized form is presented as a read-only snapshot.
- Amendments create a new version; the UI must not imply that a signed document was silently edited.
- Signature controls provide keyboard-accessible typed-signature or acknowledgement alternatives when legally approved.
- The UI explains what signature metadata is recorded without exposing unnecessary technical detail.

### 21.4 Damage diagram treatment

- Pointer drawing is an enhancement, not the only input method.
- Provide a structured list of damage areas and descriptions.
- Canvas marks need undo, clear, zoom-safe coordinates, and visible selection.
- The final review shows both the image and structured text description.

---

## 22. Responsive system

### 22.1 Breakpoint guidance

Use content-driven breakpoints and container queries. The following viewport ranges are planning references, not device assumptions.

| Range | Planning name | Key behavior |
|---|---|---|
| `< 480px` | Compact | Single-column forms, stacked CTAs, simplified logo stage |
| `480–767px` | Mobile | Four-column grid, sticky scene option, mobile navigation sheet |
| `768–1023px` | Tablet | Eight-column grid, reduced pin duration, two-column cards where appropriate |
| `1024–1279px` | Small desktop | Full navigation, 12-column grid, desktop process narrative |
| `1280–1535px` | Desktop | Full editorial layout and wide media |
| `>= 1536px` | Large desktop | Max-width containers; do not endlessly scale text or whitespace |

### 22.2 Responsive rules

- Design and test at 320px minimum width without horizontal page scrolling.
- Support 200% browser zoom and text enlargement.
- Use `svh`, `dvh`, and content-based sizing carefully; do not rely solely on `100vh` on mobile.
- Use safe-area insets for sticky mobile actions.
- Do not hide essential content on mobile.
- Horizontal lookbooks must also have a normal reading-order representation.
- Tables in claim or legal content must reflow or use labeled cards.
- Header navigation remains usable with long labels.

### 22.3 Container adaptation

Components should adapt to the space they receive rather than checking global viewport width whenever possible.

Examples:

- `CapabilityCard` becomes horizontal when its container exceeds 680px.
- `TrackerTimeline` remains vertical until its container exceeds 900px and a horizontal timeline is proven more readable.
- `FormActions` stack when their container is below 420px.
- `CaseStudyCard` changes media ratio based on card width, not page width.

---

## 23. Accessibility requirements

Target **WCAG 2.2 AA** for public, tracker, and form routes. Use selected AAA guidance for motion and focus where practical.

### 23.1 Keyboard and focus

- Every interactive control is reachable and operable by keyboard.
- A visible `:focus-visible` indicator remains present for the duration of focus.
- Use a two-color focus treatment when a component can appear on both dark and light surfaces.
- Do not remove outlines without a stronger replacement.
- Modal and navigation-sheet focus is trapped and restored to the trigger on close.
- Sticky media and canvas regions are not inserted into the tab order unless they contain a real control.

### 23.2 Target size

- Production target: at least 44×44 CSS pixels for primary controls.
- WCAG 2.2 minimum: at least 24×24 CSS pixels or sufficient spacing where an exception applies.
- Mobile form and navigation controls should default to 48px minimum height.

### 23.3 Semantics

- One page-level `h1`.
- Heading levels follow document structure.
- Navigation, main, aside, section, footer, form, fieldset, legend, and ordered-list semantics are used correctly.
- Clickable cards contain a clear link or button rather than attaching click behavior to a generic container.
- Icon buttons have accessible names.
- Status messages use appropriate live regions without excessive announcements.

### 23.4 Three.js accessibility

- Canvas is decorative from an assistive-technology perspective unless a separate accessible control is provided.
- All process content exists in semantic HTML.
- Active phase updates are announced only when initiated by an explicit control; ordinary scrolling should not create repeated live-region announcements.
- Provide static or reduced-motion media.
- Do not require drag, hover, or precise pointer movement to access information.

### 23.5 Forms

- Every field has a programmatic label.
- Error text is associated with the field.
- Error summaries link to invalid fields.
- Required status is programmatic.
- Instructions are available before input.
- Timeouts are avoided; if a secure session expires, warn the user and preserve safe draft data where possible.
- Signature and damage inputs have accessible alternatives.

### 23.6 Contrast and user settings

- Meet minimum text and non-text contrast.
- Support forced-colors/high-contrast mode without losing focus or status.
- Honor reduced motion.
- Avoid blocking zoom.
- Do not disable browser text selection, copy, paste, or password-manager behavior in forms.

---

## 24. Content and voice

### 24.1 Brand voice

- Assured, not boastful.
- Precise, not technical for its own sake.
- Premium, not exclusive or dismissive.
- Reassuring, not overly casual.
- Direct, not filled with automotive clichés.

### 24.2 Preferred language

Use:

- Certified repair.
- Factory procedures.
- Repair visibility.
- Quality-control inspection.
- Finish quality.
- Customer update.
- Repair plan.
- Your vehicle.

Avoid:

- “Your car is being fixed” when a more precise approved status exists.
- Guaranteed completion dates unless contractually supported.
- Blaming insurers, customers, suppliers, or employees in public updates.
- Internal department names without a customer-friendly translation.
- Sensational crash language.

### 24.3 Customer status copy pattern

Each tracker update should answer:

1. What stage is the repair in?
2. What does that mean in plain language?
3. Is action required from the customer?
4. When was the public status last updated?
5. How can the customer contact Trends if needed?

---

## 25. Performance design budgets

These budgets are design constraints, not optional engineering cleanup.

| Item | Target |
|---|---:|
| Critical homepage JS before 3D enhancement | ≤ 180KB gzip preferred |
| Three.js/R3F/animation chunk | Independently code split; ≤ 300KB gzip preferred |
| First process-scene model and textures | ≤ 4MB desktop; reduced asset or static fallback on mobile/low-data |
| Hero logo SVG | Inline or cached; no raster dependency |
| LCP image | Properly sized, prioritized, and ≤ 350KB where visually acceptable |
| Layout shift | No visible shift when fonts, logo enhancement, images, or canvas load |
| Continuous animation | Paused when offscreen or tab is hidden |

The final experience should target healthy Core Web Vitals, including LCP below 2.5 seconds, INP below 200 milliseconds, and CLS below 0.1 at the 75th percentile where real traffic and infrastructure permit.

---

## 26. Design QA matrix

Every major route and component must be reviewed in the following conditions.

### 26.1 Viewports

- 320×568.
- 375×667.
- 390×844.
- 768×1024.
- 1024×768.
- 1280×800.
- 1440×900.
- 1920×1080.
- 200% browser zoom.

### 26.2 Input and preference modes

- Keyboard only.
- Screen reader smoke test.
- Touch.
- Fine pointer.
- Reduced motion.
- Forced colors/high contrast.
- Save-data or low-bandwidth simulation.
- JavaScript disabled for core marketing content.
- WebGL unavailable.

### 26.3 Content stress tests

- Long vehicle make/model.
- Long customer name.
- Long certification title.
- Multi-line CTA text.
- No photography.
- Missing optional data.
- Many tracker stages.
- One tracker stage.
- Multiple document requests.
- Large validation-error set.

---

## 27. Design acceptance criteria

The design system is ready for high-fidelity implementation when:

- The logo-led hero is approved on desktop and mobile.
- The process section has a signed-off storyboard for Scan, Repair, and Finish.
- The dark and utility token themes are documented and pass contrast review.
- Each reusable component has default, focus, loading, empty, and error examples.
- Tracker screens show only approved customer-safe information.
- Form screens include legal, signature, upload, and validation states.
- Reduced-motion behavior is designed rather than left to engineering interpretation.
- WebGL and low-data fallbacks are designed.
- Original photography requirements and temporary-content flags are documented.
- Responsive behavior is approved at compact mobile, tablet, and desktop widths.
- Accessibility review includes keyboard, focus, target size, semantics, and motion.
- Performance budgets are accepted as part of visual approval.

---

## 28. Source basis and implementation references

### Project sources

- Approved interactive visual systems presentation: `trends-collision-visual-systems-client-approval.html`.
- Trends Collision Workflow Platform Official Architecture Documentation v2.1.
- Trends Collision meeting transcript and formatted meeting breakdown.
- Supplied Trends logo: `assets/trends-logo.svg`.

### External implementation references

- Next.js App Router and Server/Client Components: <https://nextjs.org/docs/app/getting-started/server-and-client-components>
- Next.js loading UI: <https://nextjs.org/docs/app/api-reference/file-conventions/loading>
- Next.js error handling: <https://nextjs.org/docs/app/getting-started/error-handling>
- Next.js lazy loading: <https://nextjs.org/docs/app/guides/lazy-loading>
- React Three Fiber introduction: <https://r3f.docs.pmnd.rs/getting-started/introduction>
- React Three Fiber performance: <https://r3f.docs.pmnd.rs/advanced/scaling-performance>
- Three.js GLTFLoader: <https://threejs.org/docs/pages/GLTFLoader.html>
- Three.js KTX2Loader: <https://threejs.org/docs/pages/KTX2Loader.html>
- Motion scroll animation: <https://motion.dev/docs/react-scroll-animations>
- GSAP ScrollTrigger: <https://gsap.com/docs/v3/Plugins/ScrollTrigger/>
- GSAP responsive/reduced-motion matching: <https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/>
- React Aria Components: <https://react-aria.adobe.com/>
- WCAG 2.2 Focus Visible: <https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html>
- WCAG 2.2 Target Size: <https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html>
- WCAG 2.2 Contrast: <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>
- WCAG animation guidance: <https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html>

---

## 29. Design decision record

| Decision | Status | Rationale |
|---|---|---|
| Use Coachbuilt After Dark as the primary system | Approved | Most distinctive, mature, and premium direction |
| Lead with the Trends logo rather than the vehicle | Approved combination | Preserves the strongest overview hero and makes the new identity memorable |
| Move vehicle 3D into a process section | Approved combination | Gives the model an explanatory purpose and prevents the hero from becoming generic |
| Use dark marketing and warm-bone utility modes | Approved | Balances brand impact with tracker/form clarity |
| Use specular metallic borders, not neon glow | Approved | Fits luxury coachbuilt positioning |
| Use native page scrolling | Required | Accessibility, reliability, and mobile usability |
| Provide complete static and reduced-motion fallbacks | Required | Accessibility and performance |
| Keep customer tracker content backend-approved | Required | Prevents exposure of internal workflow data |
| Treat original photography as a launch dependency | Required | Coachbuilt quality is undermined by generic imagery |

