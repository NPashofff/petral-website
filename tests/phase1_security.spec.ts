import { test, expect, request as pwRequest, type APIRequestContext } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const UPLOADS_DIR = path.join(process.cwd(), 'data', 'uploads');
const tempUploadFiles: string[] = [];

/**
 * Phase 1 security-hardening regression tests.
 *
 * Covers: stored XSS sanitization (#1), JSON-LD breakout escaping (#2),
 * upload/file-serving hardening (#3/#9), content color hex validation (#19),
 * and a security-headers / page smoke test (CSP).
 *
 * We authenticate ONCE (login API is rate-limited to 5/15min per IP) and reuse
 * the signed admin cookie across the suite.
 */

const BASE = 'http://localhost:3000';
let api: APIRequestContext;
const createdProductIds: number[] = [];

test.beforeAll(async () => {
  api = await pwRequest.newContext({ baseURL: BASE });
  const res = await api.post('/api/admin/auth/login', {
    data: { username: 'admin', password: 'petral2024' },
  });
  expect(res.ok(), `login failed: ${res.status()}`).toBeTruthy();
});

test.afterAll(async () => {
  // Clean up any throwaway products this suite created.
  for (const id of createdProductIds) {
    await api.delete(`/api/admin/products/${id}`).catch(() => {});
  }
  // Clean up any temp files dropped into the uploads dir.
  for (const f of tempUploadFiles) {
    try {
      fs.unlinkSync(f);
    } catch {
      /* ignore */
    }
  }
  await api.dispose();
});

async function createProduct(overrides: Record<string, unknown>): Promise<number> {
  const res = await api.post('/api/admin/products', {
    data: {
      name: 'phase1-test-product',
      slug: `phase1-test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      category: 'ATV',
      brand: 'TestBrand',
      images: '[]',
      ...overrides,
    },
  });
  expect(res.ok(), `create product failed: ${res.status()} ${await res.text()}`).toBeTruthy();
  const body = await res.json();
  expect(body.id).toBeTruthy();
  createdProductIds.push(body.id);
  return body.id as number;
}

test.describe('Phase 1 — stored XSS sanitization (#1)', () => {
  test('malicious description tags/attrs are stripped, benign tags survive', async ({ page }) => {
    const malicious =
      '<p>Hello <strong>world</strong></p>' +
      '<img src=x onerror="window.__xss=1">' +
      '<script>window.__xss=1</script>' +
      '<a href="javascript:window.__xss=1">click</a>' +
      '<table><tr><th>H</th></tr><tr><td>cell</td></tr></table>' +
      '<a href="https://example.com">safe link</a>';

    const id = await createProduct({ description: malicious });

    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));

    await page.goto(`${BASE}/catalog/${id}`);
    await page.waitForLoadState('networkidle');

    // The injected XSS must not have executed.
    const xss = await page.evaluate(() => (window as unknown as { __xss?: unknown }).__xss);
    expect(xss).toBeUndefined();

    const descHtml = await page.locator('.product-description').innerHTML();
    // Malicious bits stripped.
    expect(descHtml).not.toMatch(/onerror/i);
    expect(descHtml).not.toMatch(/<script/i);
    expect(descHtml.toLowerCase()).not.toContain('javascript:');
    // Benign formatting preserved.
    expect(descHtml).toMatch(/<strong>world<\/strong>/i);
    expect(descHtml).toMatch(/<table/i);
    expect(descHtml).toMatch(/<td>cell<\/td>/i);
    expect(descHtml).toMatch(/href="https:\/\/example\.com"/i);
  });

  test('updating a product also sanitizes the description (#1 PUT)', async ({ page }) => {
    const id = await createProduct({ description: '<p>initial</p>' });

    const res = await api.put(`/api/admin/products/${id}`, {
      data: {
        name: 'phase1-test-product',
        slug: `phase1-test-upd-${Date.now()}`,
        category: 'ATV',
        brand: 'TestBrand',
        images: '[]',
        description: '<p>upd</p><img src=x onerror="window.__xss=1"><script>window.__xss=1</script>',
      },
    });
    expect(res.ok()).toBeTruthy();

    await page.goto(`${BASE}/catalog/${id}`);
    await page.waitForLoadState('networkidle');
    const xss = await page.evaluate(() => (window as unknown as { __xss?: unknown }).__xss);
    expect(xss).toBeUndefined();
    const descHtml = await page.locator('.product-description').innerHTML();
    expect(descHtml).not.toMatch(/onerror/i);
    expect(descHtml).not.toMatch(/<script/i);
    expect(descHtml).toMatch(/upd/);
  });
});

test.describe('Phase 1 — JSON-LD breakout escaping (#2)', () => {
  test('a </script>-breakout product name cannot escape the ld+json script', async ({ page }) => {
    const id = await createProduct({
      name: '</script><script>window.__xss2=1</script>',
      description: '<p>jsonld test</p>',
    });

    await page.goto(`${BASE}/catalog/${id}`);
    await page.waitForLoadState('networkidle');

    const xss2 = await page.evaluate(() => (window as unknown as { __xss2?: unknown }).__xss2);
    expect(xss2).toBeUndefined();

    const ldContent = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();
    expect(ldContent).toBeTruthy();
    // The raw closing tag must be escaped (no literal </script> inside).
    expect(ldContent!).not.toContain('</script>');
    expect(ldContent!).toContain('\\u003c');
  });
});

test.describe('Phase 1 — upload + file serving hardening (#3/#9)', () => {
  test('an SVG on disk is served with nosniff, NOT image/svg+xml, and as attachment', async () => {
    // The upload API rejects SVGs, so drop one straight into the uploads dir to
    // exercise the serving route's handling of a non-raster file.
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    const name = `phase1-evil-${Date.now()}.svg`;
    const filePath = path.join(UPLOADS_DIR, name);
    fs.writeFileSync(
      filePath,
      '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'
    );
    tempUploadFiles.push(filePath);

    const res = await api.get(`/api/uploads/${name}`);
    expect(res.ok()).toBeTruthy();
    const headers = res.headers();
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['content-type']).not.toContain('image/svg+xml');
    expect(headers['content-type']).toContain('application/octet-stream');
    expect(headers['content-disposition'] || '').toContain('attachment');
  });

  test('uploading a disguised SVG (wrong magic bytes) is rejected', async () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>';
    const res = await api.post('/api/admin/upload', {
      multipart: {
        file: {
          name: 'evil.png', // disguised as png
          mimeType: 'image/png', // lying about the type
          buffer: Buffer.from(svg, 'utf-8'),
        },
      },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  test('a real PNG (valid magic bytes) is accepted and served with nosniff', async () => {
    // Minimal 1x1 PNG.
    const pngBase64 =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const res = await api.post('/api/admin/upload', {
      multipart: {
        file: {
          name: 'real.bin', // wrong extension on purpose; server derives from magic bytes
          mimeType: 'application/octet-stream',
          buffer: Buffer.from(pngBase64, 'base64'),
        },
      },
    });
    expect(res.ok(), `upload failed: ${res.status()} ${await res.text()}`).toBeTruthy();
    const body = await res.json();
    expect(body.url).toMatch(/\.png$/); // extension derived from detected type
    // Record the written file for cleanup (url is /api/uploads/<filename>).
    tempUploadFiles.push(path.join(UPLOADS_DIR, String(body.url).split('/').pop()!));

    const served = await api.get(body.url);
    expect(served.ok()).toBeTruthy();
    expect(served.headers()['x-content-type-options']).toBe('nosniff');
    expect(served.headers()['content-type']).toContain('image/png');
  });
});

test.describe('Phase 1 — backup restore zip validation (#8)', () => {
  // We only ever use the "uploads" scope here so the DB is never wiped.
  async function postRestore(zipBuffer: Buffer) {
    return api.post('/api/admin/backup/restore', {
      multipart: {
        scopes: 'uploads',
        file: {
          name: 'backup.zip',
          mimeType: 'application/zip',
          buffer: zipBuffer,
        },
      },
    });
  }

  async function buildZip(files: Record<string, Buffer | string>): Promise<Buffer> {
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    zip.file('manifest.json', JSON.stringify({ schemaVersion: '1', scopes: ['uploads'] }));
    for (const [name, content] of Object.entries(files)) {
      zip.file(name, content);
    }
    return (await zip.generateAsync({ type: 'nodebuffer' })) as Buffer;
  }

  test('rejects an uploads entry that is not a real image (bad magic bytes)', async () => {
    const buf = await buildZip({ 'uploads/evil.png': Buffer.from('<svg><script>1</script></svg>') });
    const res = await postRestore(buf);
    expect(res.status()).toBe(400);
  });

  test('rejects a disallowed extension in uploads', async () => {
    // Valid PNG bytes but a disallowed extension.
    const png = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    const buf = await buildZip({ 'uploads/evil.svg': png });
    const res = await postRestore(buf);
    expect(res.status()).toBe(400);
  });

  test('rejects an entry with a nested path / slash in its name', async () => {
    // Anything other than a flat filename under uploads/ is rejected (the guard
    // blocks "/" and ".." in the post-prefix name). This covers the zip-slip
    // class of inputs that survive JSZip path normalization.
    const png = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    const buf = await buildZip({ 'uploads/sub/nested.png': png });
    const res = await postRestore(buf);
    expect(res.status()).toBe(400);
  });

  test('accepts a clean archive with a single valid PNG', async () => {
    const png = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    const name = `phase1-restore-ok-${Date.now()}.png`;
    const buf = await buildZip({ [`uploads/${name}`]: png });
    const res = await postRestore(buf);
    expect(res.ok(), `clean restore failed: ${res.status()} ${await res.text()}`).toBeTruthy();
    // Track for cleanup.
    tempUploadFiles.push(path.join(UPLOADS_DIR, name));
  });
});

test.describe('Phase 1 — content color hex validation (#19)', () => {
  test('invalid color_* values are rejected, valid ones accepted', async () => {
    const bad1 = await api.put('/api/admin/content', { data: { color_primary: 'red' } });
    expect(bad1.status()).toBe(400);

    const bad2 = await api.put('/api/admin/content', { data: { color_primary: '#xyz' } });
    expect(bad2.status()).toBe(400);

    const good = await api.put('/api/admin/content', { data: { color_primary: '#aabbcc' } });
    expect(good.ok()).toBeTruthy();

    // Restore the original brand color so we don't leave the site recolored.
    await api.put('/api/admin/content', { data: { color_primary: '#1B5E20' } });
  });
});

test.describe('Phase 1 — security headers + smoke (CSP)', () => {
  const pages = ['/', '/catalog', '/catalog/83', '/oils'];
  for (const p of pages) {
    test(`${p} returns 200 and carries security headers`, async ({ page }) => {
      const resp = await page.goto(`${BASE}${p}`);
      expect(resp, `no response for ${p}`).toBeTruthy();
      expect(resp!.status()).toBe(200);
      const headers = resp!.headers();
      expect(headers['x-content-type-options']).toBe('nosniff');
      expect(headers['x-frame-options']).toBe('SAMEORIGIN');
      expect(headers['content-security-policy']).toContain("object-src 'none'");
      // Page actually rendered (body has content).
      const bodyText = await page.locator('body').textContent();
      expect((bodyText || '').trim().length).toBeGreaterThan(0);
    });
  }
});
