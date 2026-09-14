import "server-only";
import nodemailer from "nodemailer";
import { z } from "zod";

import { business } from "@/content/business";
import { createContactEmails } from "./email-templates";
import type { ContactInput } from "./schema";

const mailConfig = z.object({
  host: z.string().min(1),
  port: z.coerce
    .number()
    .int()
    .refine((value) => value === 465 || value === 587),
  user: z.string().min(1),
  password: z.string().min(1),
  from: z.email(),
  to: z.email(),
});

function readMailConfig() {
  return mailConfig.safeParse({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ?? "587",
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.CONTACT_FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL,
  });
}

export function isContactEmailConfigured() {
  return readMailConfig().success;
}

export async function sendContactEmails(input: ContactInput) {
  const config = readMailConfig();
  if (!config.success) throw new Error("CONTACT_NOT_CONFIGURED");
  const { host, port, user, password, from, to } = config.data;
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: true,
    auth: { user, pass: password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  const templates = createContactEmails(input);
  const sender = { name: business.name, address: from };
  try {
    const shop = await transport.sendMail({
      ...templates.shop,
      from: sender,
      to,
      replyTo: input.email,
    });
    if (!shop.accepted.length) throw new Error("SHOP_EMAIL_REJECTED");
    try {
      const customer = await transport.sendMail({
        ...templates.customer,
        from: sender,
        to: input.email,
        replyTo: business.email,
      });
      return { confirmationSent: customer.accepted.length > 0 };
    } catch {
      // The shop already has the inquiry. Do not ask the visitor to resubmit it.
      console.error("Contact acknowledgment failed after shop email was accepted.");
      return { confirmationSent: false };
    }
  } finally {
    transport.close();
  }
}
