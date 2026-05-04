export async function register() {}

export async function onRequestError(
  error: unknown,
  request: { path: string; method: string; headers: Record<string, string | string[] | undefined> },
  context: { routerKind: "Pages Router" | "App Router"; routePath: string; routeType: "render" | "route" | "action" | "middleware" }
) {
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
