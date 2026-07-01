import { prisma } from "@/lib/db";

type LogContext = {
  route?: string;
  method?: string;
  statusCode?: number;
  context?: string | Record<string, unknown>;
  level?: "error" | "warn" | "info";
};

// #30 — SQLite is a single-writer database. Writing an ErrorLog row on *every*
// logged error lets a noisy or hostile request pattern serialize a flood of
// writes behind every other DB operation, and grows the table unbounded. We
// therefore (a) throttle duplicate errors, (b) cap the table with a periodic
// prune, and (c) always keep console logging (cheap, non-blocking) so nothing
// is silently lost even when a DB write is skipped.

// Max rows we keep in the ErrorLog table. When we cross PRUNE_AT we delete the
// oldest rows down to MAX_ROWS.
const MAX_ROWS = 1000;
const PRUNE_AT = 1200;

// Throttle window: an identical (level+route+message) error is written to the
// DB at most once per window; repeats inside the window only hit the console.
const THROTTLE_WINDOW_MS = 60 * 1000;
const recentWrites = new Map<string, number>();
// Bound the throttle map itself so it can't grow without limit.
const THROTTLE_MAP_CAP = 500;

function throttleKey(level: string, route: string, message: string): string {
  return `${level}|${route}|${message.slice(0, 200)}`;
}

// Returns true if this error was written recently and should be skipped.
function isThrottled(key: string): boolean {
  const now = Date.now();
  const last = recentWrites.get(key);
  if (last != null && now - last < THROTTLE_WINDOW_MS) return true;

  recentWrites.set(key, now);

  // Opportunistically evict stale/oversized entries.
  if (recentWrites.size > THROTTLE_MAP_CAP) {
    for (const [k, t] of recentWrites) {
      if (now - t >= THROTTLE_WINDOW_MS) recentWrites.delete(k);
    }
    // If still over cap (lots of fresh distinct errors), drop the oldest.
    if (recentWrites.size > THROTTLE_MAP_CAP) {
      const oldest = [...recentWrites.entries()].sort((a, b) => a[1] - b[1]);
      for (let i = 0; i < oldest.length - THROTTLE_MAP_CAP; i++) {
        recentWrites.delete(oldest[i][0]);
      }
    }
  }
  return false;
}

// Prune at most once per interval so we don't issue a COUNT/DELETE on every log.
const PRUNE_INTERVAL_MS = 5 * 60 * 1000;
let lastPrune = 0;

async function maybePrune(): Promise<void> {
  const now = Date.now();
  if (now - lastPrune < PRUNE_INTERVAL_MS) return;
  lastPrune = now;

  try {
    const count = await prisma.errorLog.count();
    if (count <= PRUNE_AT) return;

    // Find the cutoff id: keep the newest MAX_ROWS rows, delete everything older.
    const boundary = await prisma.errorLog.findMany({
      orderBy: { id: "desc" },
      skip: MAX_ROWS,
      take: 1,
      select: { id: true },
    });
    const cutoffId = boundary[0]?.id;
    if (cutoffId != null) {
      await prisma.errorLog.deleteMany({ where: { id: { lte: cutoffId } } });
    }
  } catch (e) {
    console.error("Failed to prune error log:", e);
  }
}

export async function logError(error: unknown, ctx: LogContext = {}) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : JSON.stringify(error);

  const level = ctx.level ?? "error";
  const route = ctx.route ?? "";

  // Always log to the console — cheap and never throttled.
  console.error("[logged]", route, error);

  // #30: throttle duplicate errors so a flood doesn't hammer the single SQLite
  // writer with redundant rows.
  if (isThrottled(throttleKey(level, route, message))) return;

  try {
    const stack = error instanceof Error ? error.stack ?? null : null;
    const contextStr =
      ctx.context == null
        ? null
        : typeof ctx.context === "string"
          ? ctx.context
          : JSON.stringify(ctx.context);

    await prisma.errorLog.create({
      data: {
        level,
        message: message.slice(0, 4000),
        stack: stack ? stack.slice(0, 8000) : null,
        route: ctx.route ?? null,
        method: ctx.method ?? null,
        statusCode: ctx.statusCode ?? null,
        context: contextStr ? contextStr.slice(0, 4000) : null,
      },
    });

    await maybePrune();
  } catch (e) {
    console.error("Failed to write error log:", e);
  }
}
