import { prisma } from "@/lib/db";

type LogContext = {
  route?: string;
  method?: string;
  statusCode?: number;
  context?: string | Record<string, unknown>;
  level?: "error" | "warn" | "info";
};

export async function logError(error: unknown, ctx: LogContext = {}) {
  try {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : JSON.stringify(error);
    const stack = error instanceof Error ? error.stack ?? null : null;
    const contextStr =
      ctx.context == null
        ? null
        : typeof ctx.context === "string"
          ? ctx.context
          : JSON.stringify(ctx.context);

    await prisma.errorLog.create({
      data: {
        level: ctx.level ?? "error",
        message: message.slice(0, 4000),
        stack: stack ? stack.slice(0, 8000) : null,
        route: ctx.route ?? null,
        method: ctx.method ?? null,
        statusCode: ctx.statusCode ?? null,
        context: contextStr ? contextStr.slice(0, 4000) : null,
      },
    });
  } catch (e) {
    console.error("Failed to write error log:", e);
  }

  console.error("[logged]", ctx.route ?? "", error);
}
