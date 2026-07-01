export async function register() {}

/**
 * #30: don't persist expected client-side control-flow "errors". Next.js
 * implements notFound(), redirect() and HTTP error fallbacks by throwing a
 * special error whose `digest` carries the intent. These reach onRequestError
 * but are 3xx/4xx behaviours, not server faults, so logging them just floods
 * the single-writer SQLite ErrorLog with noise. We skip:
 *   - NEXT_NOT_FOUND / NEXT_REDIRECT
 *   - NEXT_HTTP_ERROR_FALLBACK;<status> for any 4xx status
 */
function isExpectedClientError(error: unknown): boolean {
  const digest =
    typeof error === "object" && error !== null && "digest" in error
      ? (error as { digest?: unknown }).digest
      : undefined;
  if (typeof digest !== "string") return false;

  if (digest === "NEXT_NOT_FOUND") return true;
  if (digest.startsWith("NEXT_REDIRECT")) return true;

  // Format: "NEXT_HTTP_ERROR_FALLBACK;<status>"
  if (digest.startsWith("NEXT_HTTP_ERROR_FALLBACK")) {
    const status = Number(digest.split(";")[1]);
    if (Number.isFinite(status) && status >= 400 && status < 500) return true;
  }
  return false;
}

export async function onRequestError(
  error: unknown,
  request: { path: string; method: string; headers: Record<string, string | string[] | undefined> },
  context: { routerKind: "Pages Router" | "App Router"; routeType: "render" | "route" | "action" | "middleware"; routePath: string }
) {
  // #30: drop expected 4xx/redirect/not-found control-flow before any DB write.
  if (isExpectedClientError(error)) return;

  try {
    const { logError } = await import("@/lib/logger");
    await logError(error, {
      route: request.path,
      method: request.method,
      context: {
        routerKind: context.routerKind,
        routePath: context.routePath,
        routeType: context.routeType,
      },
    });
  } catch (e) {
    console.error("instrumentation onRequestError failed:", e);
  }
}
