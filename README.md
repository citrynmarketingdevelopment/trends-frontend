# Trends Collision Frontend

Production-oriented Next.js 16 foundation for the Trends Collision Center cinematic homepage.

The public `/` route is a server-rendered marketing experience with optional 3D enhancement. Its readable SVG logo, process copy, service overview, FAQ, and repair-start guidance remain available without JavaScript or WebGL. The earlier Lamborghini prototype is preserved unchanged at `/showroom/revuelto`, excluded from the sitemap, disallowed in `robots.txt`, and marked `noindex, nofollow`.

## Requirements

- Node.js 24
- pnpm 10.33 or newer in the pnpm 10 release line
- Bundled Chromium for Playwright
- Blender 5.2 at `C:\Program Files\Blender Foundation\Blender 5.2\blender.exe` only when rebuilding the logo asset
- Git LFS for the immutable Illustrator source when repository metadata is initialized

## Setup

```powershell
corepack enable
pnpm install
pnpm exec playwright install chromium
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) after the development server starts.

## Commands

| Command                | Purpose                                               |
| ---------------------- | ----------------------------------------------------- |
| `pnpm dev`             | Start the Next.js development server                  |
| `pnpm build`           | Create the production build                           |
| `pnpm start`           | Serve the production build                            |
| `pnpm lint`            | Run ESLint with zero warnings allowed                 |
| `pnpm typecheck`       | Run strict TypeScript checks                          |
| `pnpm format`          | Format maintained source and configuration files      |
| `pnpm format:check`    | Check formatting without writing                      |
| `pnpm test`            | Run unit tests                                        |
| `pnpm test:storybook`  | Run component stories in Chromium                     |
| `pnpm test:e2e`        | Run serial end-to-end tests in Chromium               |
| `pnpm test:a11y`       | Run automated accessibility end-to-end tests          |
| `pnpm storybook`       | Start Storybook on port 6006                          |
| `pnpm storybook:build` | Build the static Storybook site                       |
| `pnpm api:generate`    | Generate API types from `contracts/openapi.json`      |
| `pnpm assets:logo`     | Rebuild and validate the optimized Trends logo assets |

`pnpm api:generate` intentionally requires a real backend-provided OpenAPI document. No placeholder schema is committed.

## Runtime routes and preload behavior

- `/` is the Trends marketing route. It requests `/models/trends-logo-new.glb` only on capable viewports. The Revuelto model is not requested at the hero and is preloaded only when the process section nears the viewport and the capability gate passes.
- The desktop process is four input-gated sequences at 25% intervals. One wheel, touch, or page-key intent completes one camera and content move before another intent is accepted; the browser's native scroll resumes at either end of the pinned handoff.
- `/showroom/revuelto` preserves the complete reference showroom. It begins loading its car and AO assets immediately after the client component mounts.
- Only one WebGL canvas is eligible at a time on `/`. The logo scene is disposed before the process scene claims the rendering slot.
- Narrow mobile, reduced-motion, save-data, low-tier, hidden-document, failed-WebGL, and model-error states keep the canonical SVG and server-rendered process content on a solid black stage.

## 3D assets and prototype exceptions

### Trends logo

- Immutable source: `assets/brand/source/trends-logo-3d.ai-export.gltf`
- Source size: 179,864,354 bytes
- Source SHA-256: `4E469D0CCA17A6BC338CCC01A512A2C1CF6A36C5D5D2FC43A64CF64496988E19`
- Runtime GLB: `public/models/trends-logo-web.glb`
- Runtime size: 3,151,996 bytes, within the 4 MiB target
- Runtime SHA-256: `F9CBD38053BD6595F89451EA3C848D90C516EF7280AFDC00C348C68F5796372D`

The active prototype hero uses the supplied `public/models/trends-logo-new.glb` to preserve its updated authored surface treatment:

- Active hero GLB: `public/models/trends-logo-new.glb`
- Active size: 12,856,364 bytes (12.26 MiB), an explicit prototype budget exception
- Active SHA-256: `DC94E222D1AEADBA97980931AFF90D091FF00DA7E2B723885652719C4F4D4A40`
- Khronos validation: zero errors and one warning because the normal-mapped mesh omits exported tangents; Three.js derives tangent space at runtime

The optimized 3.01 MiB `trends-logo-web.glb` remains the reproducible web-budget reference. The larger active file stays behind the desktop capability gate, never replaces the readable SVG baseline, and should receive a separate texture/compression pass before production launch.

The deterministic Windows pipeline removes the 251 measured zero-area Illustrator faces without blanket normal recalculation, consolidates 26 material assignments and 78 duplicated source images into one material and three unique textures, joins compatible static meshes, bakes the logo upright, encodes lossless WebP textures, and applies Meshopt compression without silhouette decimation. Khronos validation reports zero errors and zero warnings. Reports, four-angle renders, and provenance are stored under `assets/brand/`.

The raw source is intentionally retained even though it is far above the web budget. `.gitattributes` scopes Git LFS to that one source file. This workspace currently has no `.git` metadata, so LFS tracking takes effect when the project is initialized as a repository.

### Revuelto

- Runtime GLB: `public/models/revuelto-web.glb`, 25,853,308 bytes
- Ground AO: `public/textures/internal_ground_ao_texture.jpeg`, 12,353 bytes

The 24.66 MiB Revuelto remains an explicit prototype exception to the normal 4 MiB target. It is never requested during the initial Trends hero. The process scene animates only the four named skeleton joints for both doors, the bonnet, and the rear engine cover; matching mesh nodes are deliberately excluded so transforms are never applied twice. The source-only 58.88 MiB GLB and loose extraction textures under `lamborghini/` remain outside `public/`.

## Standalone packaging

Next.js `output: "standalone"` does not copy browser assets automatically. A deployment package must include both directories:

```text
.next/standalone/
├── public/
└── .next/static/
```

Copy `public/` into `.next/standalone/public/` and `.next/static/` into `.next/standalone/.next/static/`, or serve both from the deployment platform or CDN.

## Content and integration status

The public site includes Home, Services, five service detail pages, About Us, and Contact Us. Service copy and business contact details are shared across navigation, pages, and the footer. The homepage tracking panel remains an explicitly labeled preview; this release does not create a customer portal.

### Bakersfield SEO

All nine marketing pages have local headings, unique search titles and descriptions, social metadata, and structured business/page data. Service pages also describe their individual services and breadcrumbs. Keyword assignments and the research sources are in [the Bakersfield keyword plan](docs/seo/bakersfield-keyword-plan.md); edit `src/content/seo.ts` to maintain the page targets. City-level search volumes are unverified, so service keyword priorities remain provisional until a Bakersfield-targeted dataset is available.

Configure `NEXT_PUBLIC_SITE_ORIGIN` at production build time to enable canonical URLs, sitemap entries, domain-based JSON-LD, and indexing. Builds without a valid origin retain preview noindex protection. This configuration does not register the site with Search Console or change Google Business Profile listings.

### Activate contact emails

Contact delivery runs in the Next.js Node server and is independent of the future repair-workflow backend. Add `SMTP_HOST`, `SMTP_PORT` (587 for STARTTLS or 465 for TLS), `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` from `.env.example` to the deployment's server environment, then restart/redeploy. Use a sender address authorized by your SMTP provider; set the recipient to the shop inbox that should receive inquiries. None of these values belong in `NEXT_PUBLIC_` variables.

With incomplete configuration, the form displays the shop's phone/email and disables online submission. It never simulates a successful delivery. Once configured, `POST /api/contact` validates the inquiry, sends the shop notification, then sends the customer a branded HTML/plain-text acknowledgment with next steps. If only the acknowledgment fails, the customer sees that the shop received the inquiry and is told not to resubmit. Photos are requested during follow-up; there are no uploads, database records, automatic delivery retries, or SMS notifications in this flow.

The endpoint checks the request origin, limits body size, validates and escapes content, and uses a honeypot plus bounded per-process request limits. For multi-instance hosting, configure a shared/edge rate limit before enabling public delivery. SMTP logs record failures without customer message contents or credentials. Verify both inboxes with a controlled test after configuration; automated tests use mocks and send no real email.

Email templates live in `src/features/contact/email-templates.ts`. The SMTP transport lives in `src/features/contact/mail.ts`. Customer emails describe inspection and follow-up without promising a booked appointment or a fixed turnaround time.

`NEXT_PUBLIC_SITE_ORIGIN` must be the approved bare HTTPS origin in production. Until it is supplied, canonical and Open Graph URLs are omitted, the sitemap stays empty, and robots deny indexing so an incomplete preview cannot be mistaken for a launch artifact.

## Dependency security

The production dependency audit is clean. Storybook's development-only Next.js bridge currently pulls in `image-size@2.0.2`, which has two unpatched denial-of-service advisories for crafted ICNS, JXL, and HEIF files. Static image imports are disabled in `next.config.ts`, so that parser path is not used by this project. Continue to reference trusted assets from `public/`, and remove this mitigation after Storybook adopts a patched parser release.
