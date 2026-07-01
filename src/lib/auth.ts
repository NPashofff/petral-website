import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";

const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days (seconds)
const TOKEN_TTL_MS = MAX_AGE * 1000;

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

function sign(payload: string): string {
  const hmac = crypto.createHmac("sha256", getSecret());
  hmac.update(payload);
  const signature = hmac.digest("base64url");
  return `${Buffer.from(payload).toString("base64url")}.${signature}`;
}

/**
 * Validates the HMAC signature AND token expiry (both stateless — the same
 * checks run on the Edge in middleware). Returns the decoded payload string, or
 * null when the token is malformed, tampered, or expired.
 *
 * The DB-backed sessionVersion check lives in getSession() (Node only), since
 * the Edge runtime cannot reach Prisma.
 */
function verify(token: string): string | null {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const payload = Buffer.from(encodedPayload, "base64url").toString();
  const hmac = crypto.createHmac("sha256", getSecret());
  hmac.update(payload);
  const expectedSignature = hmac.digest("base64url");

  // Constant-time comparison to avoid signature-timing leaks.
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSignature);
  if (sigBuf.length !== expBuf.length) return null;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null;

  // #4: reject expired tokens (and tokens missing the new expiry field, i.e.
  // the old stateless format that never expires).
  let parsed: TokenPayload;
  try {
    parsed = JSON.parse(payload) as TokenPayload;
  } catch {
    return null;
  }
  if (
    typeof parsed.exp !== "number" ||
    typeof parsed.iat !== "number" ||
    Date.now() >= parsed.exp
  ) {
    return null;
  }

  return payload;
}

export interface SessionPayload {
  adminId: number;
  username: string;
}

/** What is actually serialized into the signed cookie. */
interface TokenPayload extends SessionPayload {
  /** issued-at (ms epoch) */
  iat: number;
  /** expiry (ms epoch) — #4 */
  exp: number;
  /** admin.sessionVersion at mint time — #5 */
  sessionVersion: number;
}

function mintToken(payload: SessionPayload, sessionVersion: number): string {
  const now = Date.now();
  const full: TokenPayload = {
    adminId: payload.adminId,
    username: payload.username,
    iat: now,
    exp: now + TOKEN_TTL_MS,
    sessionVersion,
  };
  return sign(JSON.stringify(full));
}

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: MAX_AGE,
  path: "/",
};

/**
 * Issues a fresh signed session cookie. When `sessionVersion` is not supplied
 * it is looked up from the DB so callers (e.g. login) don't have to.
 */
export async function createSession(
  payload: SessionPayload,
  sessionVersion?: number
) {
  let version = sessionVersion;
  if (version === undefined) {
    const admin = await prisma.admin.findUnique({
      where: { id: payload.adminId },
      select: { sessionVersion: true },
    });
    version = admin?.sessionVersion ?? 0;
  }
  const token = mintToken(payload, version);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, COOKIE_OPTS);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  // Stateless: signature + expiry.
  const payload = verify(token);
  if (!payload) return null;

  let parsed: TokenPayload;
  try {
    parsed = JSON.parse(payload) as TokenPayload;
  } catch {
    return null;
  }

  // #5 (Node-only): the token embeds the sessionVersion it was minted with.
  // A password change bumps admin.sessionVersion, so older tokens no longer
  // match and are rejected here. This cannot run in Edge middleware (no DB).
  const admin = await prisma.admin.findUnique({
    where: { id: parsed.adminId },
    select: { sessionVersion: true },
  });
  if (!admin) return null;
  if (parsed.sessionVersion !== admin.sessionVersion) return null;

  return { adminId: parsed.adminId, username: parsed.username };
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Guard for admin API route handlers. Returns the active session, or a ready
 * 401 `NextResponse` when there is no valid signed session.
 *
 * Usage:
 *   const session = await requireSession();
 *   if (session instanceof NextResponse) return session;
 *   // ...session is a SessionPayload here
 */
export async function requireSession(): Promise<SessionPayload | NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Не сте влезли" }, { status: 401 });
  }
  return session;
}
