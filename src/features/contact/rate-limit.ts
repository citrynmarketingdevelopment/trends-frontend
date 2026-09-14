import "server-only";
import { createHash } from "node:crypto";

// Bounded, per-process protection. Use an edge limit for multi-instance deployments.
const attempts = new Map<string, { count: number; expires: number }>();
let globalWindow = { count: 0, expires: 0 };

export function allowContactAttempt(email: string, now = Date.now()) {
  if (now >= globalWindow.expires) globalWindow = { count: 0, expires: now + 60_000 };
  if (++globalWindow.count > 30) return false;
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  const key = createHash("sha256").update(email.toLowerCase()).digest("hex");
  const entry = attempts.get(key) ?? { count: 0, expires: now + 15 * 60_000 };
  entry.count++;
  attempts.set(key, entry);
  return entry.count <= 3;
}
