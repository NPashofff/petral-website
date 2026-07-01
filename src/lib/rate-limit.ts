import { NextResponse } from "next/server";

/**
 * #29 — LIMITATION: this is a per-process, in-memory rate limiter.
 *
 *  - State lives in the module-level `store` Map below, so every limit counter
 *    RESETS WHENEVER THE PROCESS RESTARTS (deploy, crash, container restart).
 *  - It is NOT shared across instances. If the app is ever scaled to more than
 *    one Node process / replica, each one keeps its own independent buckets, so
 *    the effective limit is multiplied by the number of instances and an
 *    attacker spread across instances can exceed the intended per-IP cap.
 *
 * This is acceptable for the current single-container TrueNAS deployment.
 *
 * TODO: back this with a shared store (e.g. Redis / Upstash, or a SQLite/DB
 * table keyed by `${prefix}:${identifier}` with a sliding window) before
 * running more than one instance, so limits are durable across restarts and
 * enforced globally rather than per-process.
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Clean up old entries every 30 minutes
const CLEANUP_INTERVAL = 30 * 60 * 1000;

let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  const cutoff = now - windowMs;
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => t > cutoff);
    if (entry.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

/**
 * #6 — Derive the client IP without blindly trusting a client-spoofable
 * X-Forwarded-For. A malicious client can prepend arbitrary values to XFF, so
 * taking the *first* hop lets an attacker forge a fresh IP per request and slip
 * past a per-IP limit.
 *
 * We trust exactly ONE reverse-proxy hop in front of the app (the TrueNAS
 * deployment sits behind a single proxy). XFF is appended left-to-right, so the
 * value our trusted proxy wrote is the LAST entry — that is the real client as
 * seen by our edge. Prefer the platform-provided IPs first; fall back to the
 * last XFF hop; otherwise "unknown".
 */
const TRUSTED_PROXY_HOPS = 1;

export function getClientIp(request: Request): string {
  // Server/platform-provided client IP — not client-spoofable.
  const real = request.headers.get("x-real-ip");
  if (real && real.trim()) return real.trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const hops = forwarded
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean);
    if (hops.length > 0) {
      // Count TRUSTED_PROXY_HOPS in from the right; clamp to the leftmost entry
      // when there are fewer hops than expected.
      const idx = Math.max(0, hops.length - TRUSTED_PROXY_HOPS);
      return hops[idx];
    }
  }
  return "unknown";
}

interface RateLimitOptions {
  maxRequests: number;
  windowMs: number;
}

function tooManyRequests(retryAfter: number): NextResponse {
  return NextResponse.json(
    { error: "Твърде много заявки. Моля, опитайте по-късно." },
    {
      status: 429,
      headers: { "Retry-After": String(Math.max(1, retryAfter)) },
    }
  );
}

export function checkRateLimit(
  identifier: string,
  prefix: string,
  { maxRequests, windowMs }: RateLimitOptions
): NextResponse | null {
  // Loopback (local dev) is never rate-limited.
  if (identifier === "127.0.0.1" || identifier === "::1") return null;

  // #6: when we can't determine a client identifier, FAIL CLOSED in production
  // (treat it as a single bucket so an attacker can't bypass the limit by
  // forcing "unknown"). In dev/test we keep the old skip behaviour so local
  // requests without proxy headers aren't throttled.
  if (identifier === "unknown") {
    if (process.env.NODE_ENV !== "production") return null;
    // fall through using a shared "unknown" bucket
  }

  cleanup(windowMs);

  const key = `${prefix}:${identifier}`;
  const now = Date.now();
  const cutoff = now - windowMs;

  const entry = store.get(key) || { timestamps: [] };
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff);

  if (entry.timestamps.length >= maxRequests) {
    const oldestInWindow = entry.timestamps[0];
    const retryAfter = Math.ceil((oldestInWindow + windowMs - now) / 1000);
    return tooManyRequests(retryAfter);
  }

  entry.timestamps.push(now);
  store.set(key, entry);
  return null;
}
