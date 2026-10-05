import "server-only";
import { z } from "zod";

import { business } from "@/content/business";
import { createContactEmails } from "./email-templates";
import type { ContactInput } from "./schema";

// SMTP.com signs mail for citryn.com; the Trends domain is not authenticated there yet.
const contactSender = "contactforms@citryn.com";

const contactRecipients = [
  "info@trendsautocollision.com",
  "Paulbarelatb@gmail.com",
  "Manuel@trendsautocollision.com",
  "citryn.contactforms@gmail.com",
] as const;

const mailConfig = z.object({
  apiKey: z.string().min(1),
  channel: z.string().min(1),
  from: z.email(),
});

const smtpAcceptance = z.object({
  status: z.literal("success"),
  data: z.union([
    z.object({ msg_id: z.string().trim().min(1) }),
    z.object({
      message: z.string().regex(/^accepted,\s*msg_id:\s*[a-zA-Z0-9][a-zA-Z0-9._-]*\s*$/i),
    }),
  ]),
});

function readMailConfig() {
  return mailConfig.safeParse({
    apiKey: process.env.SMTP_API,
    channel: process.env.SMTP_CHANNEL,
    from: contactSender,
  });
}

export function isContactEmailConfigured() {
  return readMailConfig().success;
}

type Email = ReturnType<typeof createContactEmails>["shop"];

async function sendMessage(
  config: z.infer<typeof mailConfig>,
  email: Email,
  recipients: readonly string[],
  replyTo: string,
) {
  let response: Response;
  try {
    response = await fetch("https://api.smtp.com/v4/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-SMTPCOM-API": config.apiKey,
      },
      body: JSON.stringify({
        channel: config.channel,
        recipients: { to: recipients.map((address) => ({ address })) },
        originator: {
          from: { name: business.name, address: config.from },
          reply_to: { address: replyTo },
        },
        subject: email.subject,
        body: {
          parts: [
            { type: "text/plain", charset: "UTF-8", content: email.text },
            { type: "text/html", charset: "UTF-8", content: email.html },
          ],
        },
      }),
      signal: AbortSignal.timeout(15_000),
    });
  } catch {
    throw new Error("CONTACT_API_UNAVAILABLE");
  }
  if (!response.ok) throw new Error(`CONTACT_API_REJECTED_${response.status}`);
  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new Error("CONTACT_API_INVALID_RESPONSE");
  }
  if (!smtpAcceptance.safeParse(result).success) throw new Error("CONTACT_API_NOT_ACCEPTED");
}

export async function sendContactEmails(input: ContactInput) {
  const config = readMailConfig();
  if (!config.success) throw new Error("CONTACT_NOT_CONFIGURED");
  const templates = createContactEmails(input);

  await sendMessage(config.data, templates.shop, contactRecipients, input.email);
  try {
    await sendMessage(config.data, templates.customer, [input.email], business.email);
    return { confirmationSent: true };
  } catch {
    // The shop already has the inquiry. Do not ask the visitor to resubmit it.
    console.error("Contact acknowledgment failed after shop email was accepted.");
    return { confirmationSent: false };
  }
}
