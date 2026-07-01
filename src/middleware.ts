import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "admin_session";

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SECRET environment variable is required. " +
        "Set it to a long random string before starting the app."
    );
  }
  return secret;
}

// NOTE: this runs on the EDGE runtime — it must stay stateless and must NOT
// import Prisma/DB. It validates only the HMAC signature and the token expiry
// (#4). The DB-backed sessionVersion check (#5) lives in the Node-side
// getSession() (src/lib/auth.ts), which all admin API routes go through.
async function verifyToken(token: string): Promise<boolean> {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const payload = atob(encodedPayload.replace(/-/g, "+").replace(/_/g, "/"));
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const expectedSignature = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  if (signature !== expectedSignature) return false;

  // #4: reject expired tokens (and the old format that lacks an exp field).
  try {
    const parsed = JSON.parse(payload) as { iat?: number; exp?: number };
    if (typeof parsed.exp !== "number" || typeof parsed.iat !== "number") {
      return false;
    }
    if (Date.now() >= parsed.exp) return false;
  } catch {
    return false;
  }

  return true;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token || !(await verifyToken(token))) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
