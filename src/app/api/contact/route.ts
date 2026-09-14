import { z } from "zod";
import { contactSchema, type ContactResponse } from "@/features/contact/schema";
import { isContactEmailConfigured, sendContactEmails } from "@/features/contact/mail";
import { allowContactAttempt } from "@/features/contact/rate-limit";
import { getSiteOrigin } from "@/lib/env/site-origin";

export const runtime = "nodejs";

function respond(body: ContactResponse, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...(status === 429 ? { "Retry-After": "900" } : {}) },
  });
}

async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("EMPTY_BODY");
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  while (true) {
    const chunk = await reader.read();
    if (chunk.done) break;
    bytes += chunk.value.byteLength;
    if (bytes > 20_000) {
      await reader.cancel();
      throw new Error("BODY_TOO_LARGE");
    }
    chunks.push(chunk.value);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
}

export async function POST(request: Request) {
  const expectedOrigin = getSiteOrigin()?.origin ?? new URL(request.url).origin;
  if (request.headers.get("origin") !== expectedOrigin)
    return respond({ ok: false, message: "Please submit your request from this website." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return respond({ ok: false, message: "Unsupported request format." }, 415);
  let raw: unknown;
  try {
    raw = await readBody(request);
  } catch (error) {
    return respond(
      { ok: false, message: "The request could not be read. Check your message and try again." },
      error instanceof Error && error.message === "BODY_TOO_LARGE" ? 413 : 400,
    );
  }
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success)
    return respond(
      {
        ok: false,
        message: "Please check the highlighted fields.",
        fields: z.flattenError(parsed.error).fieldErrors,
      },
      400,
    );
  if (!allowContactAttempt(parsed.data.email))
    return respond(
      { ok: false, message: "Too many requests. Please wait 15 minutes or call (661) 398-2029." },
      429,
    );
  if (!isContactEmailConfigured())
    return respond(
      {
        ok: false,
        message:
          "Online requests are temporarily unavailable. Please call (661) 398-2029 or email info@trendsautocollision.com.",
      },
      503,
    );
  try {
    const result = await sendContactEmails(parsed.data);
    return respond({ ok: true, ...result }, 200);
  } catch {
    // Do not put customer details or SMTP credentials in logs.
    console.error("Contact inquiry email could not be delivered to the shop.");
    return respond(
      {
        ok: false,
        message:
          "We could not confirm your request was sent. Please call (661) 398-2029 or email info@trendsautocollision.com.",
      },
      502,
    );
  }
}
