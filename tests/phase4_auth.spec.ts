import {
  test,
  expect,
  request as pwRequest,
  type APIRequestContext,
} from '@playwright/test';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

/**
 * Phase 4 — auth / session hardening regression tests.
 *
 * Covers:
 *  - #4  token expiry: an expired / old-format (no exp) token is rejected.
 *  - #5  password change invalidates previously-issued sessions (sessionVersion
 *        bump) while a fresh login keeps working.
 *  - #6  login rate-limit still triggers after the threshold.
 *  - #18 CSRF: a cross-origin Origin on a destructive admin route → 403, while a
 *        same-origin (no Origin) request works.
 *  - #20 backup export contains no admin password hashes.
 */

const BASE = 'http://localhost:3000';

/** Read ADMIN_SECRET from the env or, failing that, from the project .env file
 *  (the Playwright runner process doesn't get Next's .env automatically). */
function readAdminSecret(): string | undefined {
  if (process.env.ADMIN_SECRET) return process.env.ADMIN_SECRET;
  try {
    const envPath = path.resolve(__dirname, '..', '.env');
    const text = fs.readFileSync(envPath, 'utf8');
    for (const line of text.split('\n')) {
      const m = line.match(/^\s*ADMIN_SECRET\s*=\s*(.*)\s*$/);
      if (m) {
        return m[1].replace(/^["']|["']$/g, '').trim();
      }
    }
  } catch {
    /* ignore */
  }
  return undefined;
}

const ADMIN_SECRET = readAdminSecret();

let api: APIRequestContext;

test.beforeAll(async () => {
  api = await pwRequest.newContext({ baseURL: BASE });
  const res = await api.post('/api/admin/auth/login', {
    data: { username: 'admin', password: 'petral2024' },
  });
  expect(res.ok(), `login failed: ${res.status()}`).toBeTruthy();
});

test.afterAll(async () => {
  await api.dispose();
});

/** Mint a signed session token the same way src/lib/auth.ts does. */
function signToken(payloadObj: Record<string, unknown>): string {
  const secret = ADMIN_SECRET as string;
  const payload = JSON.stringify(payloadObj);
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${Buffer.from(payload).toString('base64url')}.${sig}`;
}

test.describe('#4 token expiry', () => {
  test.skip(!ADMIN_SECRET, 'ADMIN_SECRET not available to the test process');

  test('expired token is rejected by an admin route', async () => {
    const now = Date.now();
    const expired = signToken({
      adminId: 1,
      username: 'admin',
      iat: now - 10 * 24 * 3600 * 1000,
      exp: now - 1000, // already expired
      sessionVersion: 0,
    });
    const ctx = await pwRequest.newContext({
      baseURL: BASE,
      extraHTTPHeaders: { Cookie: `admin_session=${expired}` },
    });
    const res = await ctx.get('/api/admin/uploads');
    expect(res.status()).toBe(401);
    await ctx.dispose();
  });

  test('old-format token without exp is rejected', async () => {
    // Pre-#4 format: just {adminId, username}, validly signed, no exp.
    const legacy = signToken({ adminId: 1, username: 'admin' });
    const ctx = await pwRequest.newContext({
      baseURL: BASE,
      extraHTTPHeaders: { Cookie: `admin_session=${legacy}` },
    });
    const res = await ctx.get('/api/admin/uploads');
    expect(res.status()).toBe(401);
    await ctx.dispose();
  });

  test('a fresh, valid token is accepted', async () => {
    const now = Date.now();
    const valid = signToken({
      adminId: 1,
      username: 'admin',
      iat: now,
      exp: now + 3600 * 1000,
      sessionVersion: 0, // admin id 1 starts at version 0
    });
    const ctx = await pwRequest.newContext({
      baseURL: BASE,
      extraHTTPHeaders: { Cookie: `admin_session=${valid}` },
    });
    const res = await ctx.get('/api/admin/uploads');
    expect(res.status()).toBe(200);
    await ctx.dispose();
  });
});

test.describe('#5 password change invalidates old sessions', () => {
  const uname = `phase4-temp-${Date.now()}`;
  const pass1 = 'temp-pass-1';
  const pass2 = 'temp-pass-2';
  let tempId: number | null = null;

  test.afterAll(async () => {
    if (tempId != null) {
      await api.delete(`/api/admin/admins/${tempId}`).catch(() => {});
    }
  });

  test('old cookie rejected after password change, fresh login works', async () => {
    // Create a throwaway admin (via the authenticated main session).
    const created = await api.post('/api/admin/admins', {
      data: { username: uname, password: pass1, name: 'Phase4 Temp' },
    });
    expect(created.status(), await created.text()).toBe(201);
    tempId = (await created.json()).id;

    // Log in as the temp admin to obtain a session cookie.
    const tempCtx = await pwRequest.newContext({ baseURL: BASE });
    const login1 = await tempCtx.post('/api/admin/auth/login', {
      data: { username: uname, password: pass1 },
    });
    expect(login1.ok()).toBeTruthy();

    // The cookie works before the password change.
    const before = await tempCtx.get('/api/admin/uploads');
    expect(before.status()).toBe(200);

    // Change the password — bumps sessionVersion. tempCtx's cookie embeds the
    // OLD version. The route also reissues a fresh cookie into tempCtx, so we
    // grab the stale cookie first via a separate context.
    const staleCtx = await pwRequest.newContext({ baseURL: BASE });
    await staleCtx.post('/api/admin/auth/login', {
      data: { username: uname, password: pass1 },
    });
    // staleCtx now holds a v0 cookie.

    const change = await tempCtx.put('/api/admin/auth/password', {
      data: { currentPassword: pass1, newPassword: pass2 },
    });
    expect(change.ok(), await change.text()).toBeTruthy();

    // The previously-issued (stale) cookie is now rejected.
    const after = await staleCtx.get('/api/admin/uploads');
    expect(after.status()).toBe(401);

    // tempCtx got a fresh cookie from the change response, so it still works.
    const reissued = await tempCtx.get('/api/admin/uploads');
    expect(reissued.status()).toBe(200);

    // And a fresh login with the new password works.
    const freshCtx = await pwRequest.newContext({ baseURL: BASE });
    const login2 = await freshCtx.post('/api/admin/auth/login', {
      data: { username: uname, password: pass2 },
    });
    expect(login2.ok()).toBeTruthy();
    const freshCheck = await freshCtx.get('/api/admin/uploads');
    expect(freshCheck.status()).toBe(200);

    await staleCtx.dispose();
    await tempCtx.dispose();
    await freshCtx.dispose();
  });
});

test.describe('#6 login rate-limit', () => {
  test('triggers 429 after the threshold from a forged-XFF source', async () => {
    // Use a stable, non-loopback X-Forwarded-For so the in-memory limiter keys
    // a dedicated bucket for this test (getClientIp takes the last trusted hop).
    const ip = `203.0.113.${Math.floor(Math.random() * 200) + 1}`;
    const ctx = await pwRequest.newContext({
      baseURL: BASE,
      extraHTTPHeaders: { 'x-forwarded-for': ip },
    });
    let got429 = false;
    for (let i = 0; i < 8; i++) {
      const res = await ctx.post('/api/admin/auth/login', {
        data: { username: 'no-such-user', password: 'wrong' },
      });
      if (res.status() === 429) {
        got429 = true;
        break;
      }
    }
    expect(got429, 'expected a 429 after exceeding 5 attempts').toBeTruthy();
    await ctx.dispose();
  });
});

test.describe('#18 CSRF same-origin enforcement', () => {
  test('cross-origin Origin on a destructive route → 403', async () => {
    const res = await api.delete('/api/admin/inquiries/999999', {
      headers: { Origin: 'https://evil.example.com' },
    });
    expect(res.status()).toBe(403);
  });

  test('cross-origin Origin on product create → 403', async () => {
    const res = await api.post('/api/admin/products', {
      headers: { Origin: 'https://evil.example.com' },
      data: { name: 'x', slug: 'x', description: 'x', category: 'TRACTOR', brand: 'x', images: '[]' },
    });
    expect(res.status()).toBe(403);
  });

  test('same-origin Origin is accepted (not 403)', async () => {
    // Deleting a non-existent inquiry returns success/500, never 403/401.
    const res = await api.delete('/api/admin/inquiries/999999', {
      headers: { Origin: BASE },
    });
    expect(res.status()).not.toBe(403);
    expect(res.status()).not.toBe(401);
  });

  test('no Origin header (server-to-server) is accepted', async () => {
    const res = await api.delete('/api/admin/inquiries/999999');
    expect(res.status()).not.toBe(403);
    expect(res.status()).not.toBe(401);
  });
});

test.describe('#20 backup excludes admin password hashes', () => {
  test('db backup export contains no admins.json / no password hashes', async () => {
    const res = await api.get('/api/admin/backup?scopes=db');
    expect(res.ok(), `backup failed: ${res.status()}`).toBeTruthy();
    const buf = Buffer.from(await res.body());

    // Lazy-load jszip (a project dependency) to inspect the archive.
    const JSZip = (await import('jszip')).default;
    const zip = await JSZip.loadAsync(buf);

    expect(zip.file('data/admins.json'), 'admins.json must not be exported').toBeNull();

    // Defense-in-depth: no bcrypt hash anywhere in the archive text.
    let combined = '';
    const names = Object.keys(zip.files);
    for (const name of names) {
      const f = zip.file(name);
      if (f && !zip.files[name].dir) {
        combined += await f.async('string');
      }
    }
    expect(combined).not.toMatch(/\$2[aby]\$/); // bcrypt prefix
  });
});
