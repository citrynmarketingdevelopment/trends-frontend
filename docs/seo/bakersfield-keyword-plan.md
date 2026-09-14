# Bakersfield SEO keyword plan

Research date: September 10, 2026. Scope: the nine public marketing pages for Trends Collision Center, 4321 Stine Rd, Bakersfield, CA 93313.

## Search-volume status

**Bakersfield monthly search volumes are unverified for every keyword below.** No authenticated Google Ads Keyword Planner or equivalent local keyword-volume dataset is available in this session. Public research did not provide reliable city-targeted keyword counts. These are provisional editorial priorities based on relevant local results, service intent, and the business's confirmed services; they are not measured volume rankings. No search volumes, difficulty scores, or ranking guarantees have been invented.

The homepage target is the owner's explicit choice. For the service pages, broad service phrases lead the H1 and narrower subservices appear naturally in supporting content. Public local business pages establish relevant vocabulary, not how many people search for it. A phrase containing “Bakersfield” also does not establish that a tool's volume metric is geographically restricted to Bakersfield.

## Page assignments

| Page | Implemented H1 | Secondary keyword candidates | Monthly Bakersfield searches |
| --- | --- | --- | --- |
| `/` | Auto Collision Center in Bakersfield | collision center in Bakersfield; auto collision Bakersfield | Unverified |
| `/services` | Auto Services in Bakersfield | automotive services Bakersfield; vehicle repair services Bakersfield | Unverified |
| `/services/collision` | Collision Repair in Bakersfield | auto body shop Bakersfield; auto body repair Bakersfield; bumper repair Bakersfield; dent repair Bakersfield; auto paint repair Bakersfield; frame repair Bakersfield | Unverified |
| `/services/mechanical` | Auto Repair in Bakersfield | mechanic Bakersfield; auto repair shop Bakersfield; brake repair Bakersfield; suspension repair Bakersfield; car diagnostics Bakersfield | Unverified |
| `/services/roadside` | Towing in Bakersfield | towing service Bakersfield; roadside assistance Bakersfield; tow truck Bakersfield; collision towing Bakersfield | Unverified |
| `/services/tires-alignment` | Wheel Alignment in Bakersfield | alignment Bakersfield; tire shop Bakersfield; tire replacement Bakersfield; tire services Bakersfield; wheel repair Bakersfield | Unverified |
| `/services/fleet-maintenance` | Fleet Maintenance in Bakersfield | fleet repair Bakersfield; fleet services Bakersfield; commercial vehicle repair Bakersfield; preventive fleet maintenance Bakersfield | Unverified |
| `/about` | About Trends Collision Center in Bakersfield | Trends Collision Center; family-owned body shop Bakersfield | Unverified / branded intent |
| `/contact` | Contact Trends Collision Center in Bakersfield | Trends Collision Center phone; Trends Collision Center address; Trends Collision Center hours | Unverified / branded intent |

The homepage owns the business/category intent (“collision center”); the collision detail page owns the repair-service intent. About and Contact focus on brand discovery and practical information. Their purpose is not to duplicate the commercial service landing pages.

## Why these service terms

- **Collision:** “Collision repair” describes the approved service and complements the homepage category. “Auto body shop” and “auto body repair” are important candidates to compare when measured volume becomes available. Local [Caliber Collision](https://www.caliber.com/find-a-location/bakersfield-airport) uses auto collision repair language, while [Gerber's service descriptions](https://www.gerbercollision.com/collision-repair/auto-body-repair) connect body repair to bumpers, dents, frames, and paint. These sources support vocabulary, not Trends-specific offerings or volume.
- **Mechanical:** “Auto repair” is clearer consumer language than the navigation label “Mechanical.” Local shops including [Handley's Auto Repair](https://handleyauto.com/) and [Downtown Fixus](https://downtownfixus.com/) use auto repair/mechanic language for brakes, diagnostics, and suspension. This supports a relevant broad target; it does not establish a measured lead over “mechanic.”
- **Roadside:** “Towing” is a direct service request. Local [Jim's Towing](https://jimstowingservice.com/) and [Cal State Towing](https://www.calstatetowing.com/) group towing and roadside assistance. Trends' page retains phone confirmation for availability and does not adopt competitors' 24/7, arrival-time, heavy-duty, or other unsupported promises.
- **Tires & Alignment:** “Wheel alignment” matches a specific service intent. [Mr. Wheel and Tires](https://www.mrwheelandtires.com/) and [Gutierrez Tire #3](https://www.gutierreztire3.com/) demonstrate the local grouping of tires, wheel services, and alignment. “Tire shop” may have greater demand; this has not been measured, so no comparative-volume claim is made. Compare both before finalizing a volume-led H1.
- **Fleet:** “Fleet maintenance” matches the ongoing business service. [AAMCO Bakersfield](https://www.aamcobakersfield-whiteln.com/Fleet-Services) uses fleet services and maintenance language. Do not chase diesel, heavy-truck, mobile mechanic, or DOT-inspection keywords unless Trends confirms those capabilities.

## How to complete volume prioritization

Use [Google Keyword Planner](https://support.google.com/google-ads/answer/7337243?hl=en) with location **Bakersfield, California, United States**, Google search network, English language, and the last 12 complete months (September 2025-August 2026 for this research date). Compare both location-modified phrases and generic phrases such as “auto repair,” “mechanic,” “towing,” “roadside assistance,” “wheel alignment,” “tires,” “tire shop,” “fleet repair,” and “fleet maintenance” within that same city targeting. Include “near me” variations in the comparison, without inserting unnatural “near me” wording into headings.

Record the source, collection date, geography, date range, and reported volume/range. [Google defines average monthly searches](https://support.google.com/google-ads/answer/3022575?hl=en) using the selected location, date range, network, and close variants. Do not add grouped close variants together. Its competition metric describes advertisers, not organic SEO difficulty. Prefer the highest-volume relevant service phrase within each page's topic, then update `src/content/seo.ts` if the measured winner differs. Keep the owner's homepage phrase unless they change that instruction. Preserve URLs if headings change.

## Implementation

- One visible local H1 per page, with the location inside the actual heading, and no overriding accessible name hiding the keyword text.
- Unique titles, descriptions, Open Graph and Twitter metadata, and self-referencing canonicals. Contact query-string variants canonicalize to `/contact`.
- Natural service introductions and subservice H2s; existing contextual navigation, service links, process copy, and FAQs remain crawlable.
- JSON-LD: one consistent AutoBodyShop/AutoRepair business identity, WebSite, WebPage/AboutPage/ContactPage, BreadcrumbList, and Service on each detail page. Uses the approved address, phone, hours, and social profiles. No invented ratings, prices, geographic coordinates, or FAQ rich-result promises.
- All nine marketing routes remain in the sitemap when the deployment origin is configured. The reference showroom stays noindex.
- Title conventions follow [Google's title guidance](https://developers.google.com/search/docs/appearance/title-link). Local structured data follows [Google's Local Business documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business) and [Schema.org Service](https://schema.org/Service). These help describe the pages; rich results and rankings are not guaranteed.

## Deployment and measurement

Set `NEXT_PUBLIC_SITE_ORIGIN` to the final bare HTTPS domain in the production build environment. If the replacement site launches on the existing business domain, that value is `https://trendsautocollision.com`. Rebuild after setting it. Preview builds without a valid origin deliberately stay noindex, omit canonical/structured-data domain identities, and block crawling. This work does not publish the site or alter a live domain.

After launch, verify the production property in Google Search Console, submit `/sitemap.xml`, inspect the key URLs, and validate structured data against the live site. Keep Google Business Profile name/address/phone/hours and service links consistent with the website. No external accounts or business listings were changed in this task. Use Search Console queries, clicks, and impressions to refine priorities alongside the volume dataset.
