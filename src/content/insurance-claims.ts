export const claimsSources = {
  california:
    "https://www.insurance.ca.gov/01-consumers/105-type/95-guides/01-auto/hadaccident.cfm",
  dmv: "https://www.dmv.ca.gov/portal/dmv-virtual-office/accident-reporting/",
  repairs: "https://www.bar.ca.gov/auto-repairs",
  filing:
    "https://www.statefarm.com/simple-insights/auto-and-vehicles/how-to-file-a-car-insurance-claim",
} as const;

// These identify official claims resources, not insurer affiliations or repair-network status.
export const insuranceCompanies = [
  {
    name: "State Farm",
    image: "/images/insurance/state-farm.svg",
    href: "https://www.statefarm.com/claims/auto",
  },
  { name: "GEICO", image: "/images/insurance/geico.svg", href: "https://www.geico.com/claims/" },
  {
    name: "Progressive",
    image: "/images/insurance/progressive.svg",
    href: "https://www.progressive.com/claims/",
  },
  {
    name: "Allstate",
    image: "/images/insurance/allstate.svg",
    href: "https://www.allstate.com/claims",
  },
  {
    name: "Farmers",
    image: "/images/insurance/farmers.svg",
    href: "https://www.farmers.com/claims/",
  },
  {
    name: "Nationwide",
    image: "/images/insurance/nationwide.svg",
    href: "https://www.nationwide.com/personal/insurance/claims/",
  },
] as const;

export const claimSteps = [
  {
    title: "Get safe. Gather the details.",
    body: "Check for injuries and call 911 if anyone needs emergency help. Once it is safe, photograph the damage and scene, exchange driver and insurance information, and note the time and location. Save any police report number.",
  },
  {
    title: "Open your insurance claim.",
    body: "Report the incident promptly through your insurer’s official app, website, or claims phone number. Describe what happened and where the vehicle is. Ask for a claim number and your assigned claims specialist’s contact information.",
  },
  {
    title: "Tell your specialist: Trends.",
    body: "Tell the insurer you want Trends Collision Center to repair your vehicle. Ask them to record your shop choice and explain their inspection process, your deductible, and any rental or towing coverage.",
  },
  {
    title: "Connect with our team.",
    body: "Call Trends with your claim number, insurer, and adjuster’s contact details. We’ll discuss the damage, review any existing estimate, and arrange an assessment or vehicle pickup. You review and authorize the repair plan before work begins.",
  },
] as const;

export const claimFaqs = [
  {
    question: "Can Trends file my insurance claim for me?",
    answer:
      "No. You need to report the incident and open the claim directly with the insurance company. Once you have a claim number, Trends can help with the vehicle assessment, repair estimate, damage documentation, and repair-related communication with your adjuster.",
  },
  {
    question: "Do I have to use the shop my insurer recommends?",
    answer:
      "In California, you can choose your repair shop. An insurer may recommend a facility, but cannot require a specific shop. Tell your claims specialist you want Trends and ask how to arrange their inspection. Coverage and payment still depend on the claim and applicable policy terms.",
  },
  {
    question: "Should I contact my insurer if another driver caused the accident?",
    answer:
      "Notify your own insurer promptly and ask about your reporting obligations and options. You may also be able to pursue a claim with the other driver’s insurer. That insurer must investigate coverage and responsibility; payment is not automatic. Keep both claim contacts and share the repair claim details with Trends.",
  },
  {
    question: "Who pays the deductible, rental, and towing costs?",
    answer:
      "Ask your claims specialist to confirm what applies to your claim. You may be responsible for a deductible and costs insurance does not cover. Rental reimbursement and towing benefits vary; check limits and authorization requirements before arranging either. Trends can discuss pickup logistics and charges with you.",
  },
  {
    question: "What if more damage is found during the repair?",
    answer:
      "Some damage is only visible after disassembly. Trends can document the findings and send a supplemental repair estimate to the insurer for review. We’ll explain changes to the repair plan and obtain your authorization for additional work. An insurer’s review does not replace your repair authorization.",
  },
  {
    question: "What if the insurer considers my vehicle a total loss?",
    answer:
      "Ask your claims specialist to explain the valuation, settlement, and next steps before authorizing repairs. Total-loss claims follow a different process from repairable vehicles. Let Trends know so we can coordinate the vehicle’s status and any pickup or release arrangements with you.",
  },
] as const;
