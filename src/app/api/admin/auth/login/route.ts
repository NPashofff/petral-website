import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { logError } from "@/lib/logger";

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX = 5;

export async function POST(request: NextRequest) {
  // #6: per-IP limit (5 / 15min). getClientIp no longer trusts the first XFF
  // hop, and checkRateLimit fails closed for "unknown" in production.
  const ip = getClientIp(request);
  const ipLimit = checkRateLimit(ip, "login:ip", {
    maxRequests: LOGIN_MAX,
    windowMs: LOGIN_WINDOW_MS,
  });
  if (ipLimit) return ipLimit;

  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Потребителското име и паролата са задължителни" },
        { status: 400 }
      );
    }

    // #6: secondary per-username limit to blunt credential stuffing where an
    // attacker rotates source IPs against a single account. Same 5/15min window.
    // Enforced only in production so local/E2E runs that reuse the same admin
    // account aren't throttled (matches the per-IP "unknown" skip in dev).
    if (process.env.NODE_ENV === "production") {
      const userKey = `u:${String(username).toLowerCase().slice(0, 100)}`;
      const userLimit = checkRateLimit(userKey, "login:user", {
        maxRequests: LOGIN_MAX,
        windowMs: LOGIN_WINDOW_MS,
      });
      if (userLimit) return userLimit;
    }

    const admin = await prisma.admin.findUnique({ where: { username } });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return NextResponse.json(
        { error: "Невалидно потребителско име или парола" },
        { status: 401 }
      );
    }

    await createSession({ adminId: admin.id, username: admin.username });

    return NextResponse.json({ success: true });
  } catch (err) {
    await logError(err, { route: "/api/admin/auth/login" });
    return NextResponse.json(
      { error: "Възникна грешка при вход" },
      { status: 500 }
    );
  }
}
