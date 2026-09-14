"use client";

import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { services } from "@/content/services";
import { business } from "@/content/business";
import { contactSchema, type ContactInput, type ContactResponse } from "./schema";
import styles from "@/components/marketing-site/marketing-site.module.css";

type TextFieldName =
  | "name"
  | "email"
  | "phone"
  | "vehicleYear"
  | "vehicleMake"
  | "vehicleModel"
  | "company"
  | "insurance";

export function ContactForm({
  available,
  initialService,
}: {
  available: boolean;
  initialService: ContactInput["service"];
}) {
  const [response, setResponse] = useState<ContactResponse | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const inFlight = useRef(false);
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: initialService,
      preferredContact: "email",
      vehicleYear: "",
      vehicleMake: "",
      vehicleModel: "",
      company: "",
      insurance: "",
      message: "",
      website: "",
    },
  });
  const selectedService = useWatch({ control, name: "service" });

  async function submit(values: ContactInput) {
    if (!available || inFlight.current || response?.ok) return;
    inFlight.current = true;
    setResponse(null);
    try {
      const result = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = (await result.json()) as ContactResponse;
      if (typeof body.ok !== "boolean") throw new Error("INVALID_RESPONSE");
      if (!body.ok && body.fields)
        for (const [field, messages] of Object.entries(body.fields)) {
          if (field in values && messages[0])
            setError(field as keyof ContactInput, { message: messages[0] });
        }
      setResponse(body);
    } catch {
      setResponse({
        ok: false,
        message:
          "We could not confirm your request was sent. Your details are still here. Please call the shop before submitting again.",
      });
    } finally {
      inFlight.current = false;
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  function field(
    name: TextFieldName,
    label: string,
    options: {
      required?: boolean;
      type?: string;
      autoComplete?: string;
      placeholder?: string;
    } = {},
  ) {
    return (
      <div className={styles.field}>
        <label htmlFor={name}>
          {label}
          {options.required ? " *" : ""}
        </label>
        <input
          id={name}
          {...register(name)}
          type={options.type ?? "text"}
          autoComplete={options.autoComplete}
          placeholder={options.placeholder}
          required={options.required}
          maxLength={
            name === "email" ? 254 : name === "phone" ? 30 : name === "vehicleYear" ? 4 : 120
          }
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
        />
        {errors[name] && (
          <span id={`${name}-error`} className={styles.fieldError}>
            {errors[name]?.message}
          </span>
        )}
      </div>
    );
  }

  return (
    <>
      {!available && (
        <p className={styles.formNotice} id="contact-availability">
          Online requests are temporarily unavailable. Please{" "}
          <a href={business.phoneHref}>call {business.phone}</a> or{" "}
          <a href={`mailto:${business.email}`}>email the shop</a> to get started.
        </p>
      )}
      <form
        className={styles.contactForm}
        onSubmit={(event) => {
          void handleSubmit(submit)(event);
        }}
        noValidate
        aria-label="Vehicle inquiry"
        aria-describedby={!available ? "contact-availability" : undefined}
      >
        {response?.ok ? (
          <div className={styles.formStatus} ref={statusRef} tabIndex={-1} role="status">
            <p className={styles.label}>Thank you for reaching out</p>
            <h3>Your inquiry is with the team.</h3>
            <p>
              We’ll review your message and follow up during business hours. This request does not
              book an appointment.
            </p>
            <p>
              {response.confirmationSent
                ? "An acknowledgment email with next steps is on its way. Please check your spam folder if it doesn’t appear."
                : "Your inquiry was sent to the shop, but we couldn’t send your acknowledgment email. You don’t need to submit again."}
            </p>
            <a className={styles.textLink} href={business.phoneHref}>
              Call {business.phone}
            </a>
          </div>
        ) : (
          <>
            <p className={styles.fieldHint}>Fields marked * are required.</p>
            <fieldset className={styles.formGroup} disabled={isSubmitting}>
              <legend>Your contact details</legend>
              <div className={styles.formGrid}>
                {field("name", "Full name", { required: true, autoComplete: "name" })}
                {field("email", "Email address", {
                  required: true,
                  type: "email",
                  autoComplete: "email",
                })}
                {field("phone", "Phone number", {
                  required: true,
                  type: "tel",
                  autoComplete: "tel",
                })}
                <div className={styles.field}>
                  <label htmlFor="preferredContact">Preferred reply</label>
                  <select id="preferredContact" {...register("preferredContact")}>
                    <option value="email">Email</option>
                    <option value="phone">Phone call</option>
                  </select>
                </div>
              </div>
            </fieldset>
            <fieldset className={styles.formGroup} disabled={isSubmitting}>
              <legend>How can we help?</legend>
              <div className={styles.formGrid}>
                <div className={`${styles.field} ${styles.formFull}`}>
                  <label htmlFor="service">Service *</label>
                  <select id="service" {...register("service")} required>
                    <option value="general">General inquiry / Not sure yet</option>
                    {services.map((service) => (
                      <option key={service.slug} value={service.slug}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedService === "roadside" && (
                  <p className={`${styles.formNotice} ${styles.formFull}`}>
                    Need help now? <a href={business.phoneHref}>Call {business.phone}</a> to confirm
                    availability. This form does not dispatch roadside assistance.
                  </p>
                )}
                {field("vehicleYear", "Vehicle year (optional)", { placeholder: "e.g. 2022" })}
                {field("vehicleMake", "Make (optional)", { placeholder: "e.g. Toyota" })}
                {field("vehicleModel", "Model (optional)", { placeholder: "e.g. Camry" })}
                {field(
                  "company",
                  selectedService === "fleet-maintenance"
                    ? "Company / fleet name (optional)"
                    : "Company (optional)",
                  { autoComplete: "organization" },
                )}
                {field("insurance", "Insurance company (optional)")}
              </div>
            </fieldset>
            <div className={styles.field}>
              <label htmlFor="message">Tell us about your vehicle or question *</label>
              <textarea
                id="message"
                {...register("message")}
                maxLength={3000}
                required
                placeholder="What happened, what have you noticed, or what would you like help with?"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : "message-hint"}
              />
              {errors.message ? (
                <span id="message-error" className={styles.fieldError}>
                  {errors.message.message}
                </span>
              ) : (
                <span id="message-hint" className={styles.fieldHint}>
                  Up to 3,000 characters. We can discuss photos during follow-up.
                </span>
              )}
            </div>
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="website">Leave this field empty</label>
              <input id="website" {...register("website")} tabIndex={-1} autoComplete="off" />
            </div>
            <p className={styles.formPrivacy} id="contact-privacy">
              We use these details to respond to your inquiry and discuss vehicle service. Your
              inquiry is sent to the shop by email; this form does not sign you up for marketing.
              Please leave out payment details and sensitive documents. Sending a request does not
              book an appointment or authorize repairs.
            </p>
            <button className={styles.primary} type="submit" disabled={!available || isSubmitting}>
              {isSubmitting ? "Sending your inquiry…" : "Send inquiry"}
              <span aria-hidden="true">↗</span>
            </button>
            {response && !response.ok && (
              <div className={styles.formStatus} ref={statusRef} tabIndex={-1} role="alert">
                {response.message} <a href={business.phoneHref}>Call {business.phone}</a>
              </div>
            )}
          </>
        )}
      </form>
    </>
  );
}
