import { z } from "zod";

export const serviceChoices = [
  "general",
  "collision",
  "mechanical",
  "roadside",
  "tires-alignment",
  "fleet-maintenance",
] as const;
const singleLine = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .refine((value) => !/[\r\n\x00]/.test(value), "Use a single line.");

export const contactSchema = z.object({
  name: singleLine(100).pipe(z.string().min(2, "Enter your name.")),
  email: singleLine(254).pipe(z.email("Enter a valid email address.")),
  phone: singleLine(30).refine(
    (value) => value.replace(/\D/g, "").length >= 7,
    "Enter a valid phone number.",
  ),
  service: z.enum(serviceChoices),
  preferredContact: z.enum(["email", "phone"]),
  vehicleYear: z
    .string()
    .trim()
    .refine(
      (value) =>
        !value ||
        (/^\d{4}$/.test(value) &&
          Number(value) >= 1900 &&
          Number(value) <= new Date().getFullYear() + 2),
      "Enter a valid model year.",
    ),
  vehicleMake: singleLine(60),
  vehicleModel: singleLine(80),
  company: singleLine(120),
  insurance: singleLine(120),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters).")
    .max(3000, "Keep your message under 3,000 characters."),
  website: z.string().max(0, "Unable to submit this request."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactResponse =
  | { ok: true; confirmationSent: boolean }
  | { ok: false; message: string; fields?: Record<string, string[]> };
