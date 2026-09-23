# Insurance claims page references

Reviewed September 23, 2026 for `/insurance-claims`.

## Consumer guidance

- [California Department of Insurance: So You've Had an Accident, What's Next?](https://www.insurance.ca.gov/01-consumers/105-type/95-guides/01-auto/hadaccident.cfm): choosing a repair shop, claim inspection, hidden damage, deductibles, and rental coverage. Only the relevant claims guidance is used; unrelated policy minimum figures on this older guide are not repeated.
- [California DMV: Accident reporting](https://www.dmv.ca.gov/portal/dmv-virtual-office/accident-reporting/): SR-1 within 10 days for injury, death, or property damage over $1,000; separate from insurer and police reporting.
- [California Bureau of Automotive Repair: Maintenance and repairs](https://www.bar.ca.gov/auto-repairs): estimates, customer authorization, additional work, and invoices.
- [BAR: Repair authorization and insurance companies](https://www.bar.ca.gov/arsc/newsletters/newsletter/fall-2021/repair-authorization-and-insurance-companies): the customer authorizes repairs; insurer approval is not a substitute.
- [State Farm: How to file a car insurance claim](https://www.statefarm.com/simple-insights/auto-and-vehicles/how-to-file-a-car-insurance-claim): scene safety, documentation, prompt reporting, and information to gather.
- [State Farm: Auto claims](https://www.statefarm.com/claims/auto): filing channels, rental benefits, and repair choices.
- [GEICO: Online claim reporting](https://www.geico.com/claims/claimsprocess/online-claim-reporting/): claim information and reporting without every detail in hand.
- [Progressive: Auto claims process](https://www.progressive.com/claims/auto-process/): inspection, shop choice, scheduling, and separate total-loss handling.
- [Allstate: Claims](https://www.allstate.com/claims): documenting the accident and filing directly with the insurer.

The business owner confirmed that Trends cannot file claims for customers and can arrange vehicle pickup. Copy does not promise coverage, insurer payment, free towing, 24-hour dispatch, a completion date, or insurer network membership. Contact information and hours use `src/content/business.ts`.

## Insurer assets

Local assets identify the linked insurers; they are not presented as endorsements or partnerships. The page uses the existing dealer-carousel monochrome CSS treatment and keeps official claims links static and accessible outside the moving rail.

| File in `public/images/insurance` | Source |
| --- | --- |
| `state-farm.svg` | [Wikimedia Commons logo file](https://commons.wikimedia.org/wiki/File:State_Farm_logo.svg), [vector revision retrieved](https://upload.wikimedia.org/wikipedia/commons/archive/9/9a/20150622194559%21State_Farm_logo.svg) |
| `geico.svg` | Header logo SVG from [GEICO claims](https://www.geico.com/claims/); viewBox tightened to the existing paths' bounds, with no path changes |
| `progressive.svg` | [Progressive's official CDN asset](https://images.contentstack.io/v3/assets/blt62d40591b3650da3/blt483e097d64d66a25/66476d224ac76ee67740f2d5/logo-progressive.svg), linked by its claims page |
| `allstate.svg` | Header logo SVG from [Allstate claims](https://www.allstate.com/claims) |
| `farmers.svg` | [Farmers official logo](https://www.farmers.com/content/_farmers/web-assets/images/logos/farmers-logo-desktop.svg) |
| `nationwide.svg` | [Nationwide official logo](https://www.nationwide.com/staticassets/NandEagle%20Vert%20NW%20Rev_tcm108-19068.svg) |

Photography uses the owner's supplied technician portrait and roadside towing image, already in `public/images`. Both were visually inspected before placement. The portrait is displayed with minimal cropping on desktop and a separate crop on mobile.
