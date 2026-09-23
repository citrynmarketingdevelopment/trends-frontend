import { business } from "@/content/business";
import { getService } from "@/content/services";
import type { ContactInput } from "./schema";

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!,
  );
}

function frame(eyebrow: string, heading: string, content: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0;background:#f3f1ed;color:#252123;font-family:Arial,Helvetica,sans-serif"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#fff"><tr><td style="padding:28px 32px;background:#121011;border-top:4px solid #c81d2b;color:#f2eee6;font-size:18px;font-weight:bold">TRENDS COLLISION CENTER</td></tr><tr><td style="padding:32px"><p style="font-size:12px;letter-spacing: 0;color:#8c1721">${eyebrow}</p><h1 style="font-size:28px;line-height:1.2">${heading}</h1>${content}</td></tr><tr><td style="padding:24px 32px;background:#ece9e3;font-size:13px;line-height:1.7">${business.name}<br>${business.street}, ${business.locality}<br><a href="${business.phoneHref}" style="color:#252123">${business.phone}</a> · <a href="mailto:${business.email}" style="color:#252123">${business.email}</a><br>${business.hours} · Weekends closed</td></tr></table></td></tr></table></body></html>`;
}

export function createContactEmails(input: ContactInput) {
  const service = getService(input.service)?.name ?? "General inquiry";
  const details = [
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone],
    ["Service", service],
    ["Preferred contact", input.preferredContact],
    [
      "Vehicle",
      [input.vehicleYear, input.vehicleMake, input.vehicleModel].filter(Boolean).join(" ") ||
        "Not provided",
    ],
    ["Company", input.company || "Not provided"],
    ["Insurance company", input.insurance || "Not provided"],
  ];
  const nextSteps = [
    "Our team will review your inquiry and contact you during business hours to discuss your vehicle and arrange the next step.",
    "Have your vehicle details, a brief description of the concern, and any available insurance information ready. We can explain how to share photos when we follow up.",
    "An inspection may be needed before we can confirm repair scope, pricing, or timing. This acknowledgment does not book an appointment or authorize repairs.",
  ];
  const welcomeText = `Hello ${input.name},\n\nThank you for contacting Trends Collision Center about ${service.toLowerCase()}. We appreciate the opportunity to help with your vehicle.\n\nWhat happens next\n${nextSteps.map((step, index) => `${index + 1}. ${step}`).join("\n\n")}\n\nFor time-sensitive towing or roadside needs, call ${business.phone}; this form does not dispatch assistance.\n\n${business.name}\n${business.street}, ${business.locality}\n${business.hours}; weekends closed\n${business.phone} | ${business.email}`;
  return {
    shop: {
      subject: `Website inquiry: ${service}`,
      text: `${details.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nMessage:\n${input.message}`,
      html: frame(
        "NEW WEBSITE INQUIRY",
        `New ${escapeHtml(service.toLowerCase())} inquiry`,
        `<table role="presentation" width="100%" style="font-size:14px;line-height:1.6">${details.map(([label, value]) => `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#666">${label}</td><td style="padding:6px 0">${escapeHtml(value!)}</td></tr>`).join("")}</table><h2 style="font-size:18px">Message</h2><p style="line-height:1.7;white-space:pre-wrap">${escapeHtml(input.message)}</p>`,
      ),
    },
    customer: {
      subject: "Thank you for contacting Trends Collision Center",
      text: welcomeText,
      html: frame(
        "YOUR NEXT STEP STARTS HERE",
        "Thank you for reaching out.",
        `<p style="line-height:1.7">Hello ${escapeHtml(input.name)},</p><p style="line-height:1.7">Thank you for contacting Trends Collision Center about ${escapeHtml(service.toLowerCase())}. We appreciate the opportunity to help with your vehicle.</p><h2 style="font-size:20px">What happens next</h2><ol style="padding-left:22px;line-height:1.7">${nextSteps.map((step) => `<li style="padding-bottom:14px">${step}</li>`).join("")}</ol><p style="line-height:1.7">For time-sensitive towing or roadside needs, call <a href="${business.phoneHref}" style="color:#9e1924">${business.phone}</a>; this form does not dispatch assistance.</p><p style="line-height:1.7">The Trends Collision Center team</p>`,
      ),
    },
  };
}
