import { NextResponse } from "next/server";

/**
 * #18 — CSRF defense for state-changing admin mutations.
 *
 * The admin UI talks to its API exclusively via same-origin relative fetches,
 * so a strict same-origin check on the Origin/Referer header rejects forged
 * cross-site requests (classic CSRF) without breaking any legitimate call.
 *
 * Strategy:
 *  - Prefer the Origin header (sent on all cross-origin and most same-origin
 *    state-changing requests). It must match the request's own origin.
 *  - Fall back to Referer when Origin is absent.
 *  - If BOTH are absent we allow the request: same-origin server-to-server and
 *    non-browser API clients (Playwright `request`, curl) legitimately omit
 *    them, and a browser-driven CSRF attack always carries an Origin. This
 *    keeps the existing same-origin fetches and tests working while still
 *    rejecting any request that presents a cross-origin Origin/Referer.
 */
function expectedOrigin(request: Request): string {
  // Honour the proxy-provided forwarded headers first (production runs behind a
  // reverse proxy that terminates TLS), falling back to the request URL.
  const proto =
    request.headers.get("x-forwarded-proto")?.split(",")[0].trim() ||
    new URL(request.url).protocol.replace(":", "");
  const host =
    request.headers.get("x-forwarded-host")?.split(",")[0].trim() ||
    request.headers.get("host") ||
    new URL(request.url).host;
  return `${proto}://${host}`;
}

export function isSameOrigin(request: Request): boolean {
  const expected = expectedOrigin(request);

  const origin = request.headers.get("origin");
  if (origin) {
    return origin === expected;
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).origin === expected;
    } catch {
      return false;
    }
  }

  // Neither header present — not a browser cross-site form/fetch.
  return true;
}

/**
 * Returns a 403 NextResponse when the request appears to be cross-origin,
 * otherwise null. Call at the top of state-changing admin route handlers:
 *
 *   const csrf = requireSameOrigin(request);
 *   if (csrf) return csrf;
 */
export function requireSameOrigin(request: Request): NextResponse | null {
  if (isSameOrigin(request)) return null;
  return NextResponse.json(
    { error: "Заявка от друг източник е отхвърлена." },
    { status: 403 }
  );
}
