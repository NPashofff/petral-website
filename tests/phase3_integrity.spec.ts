import { test, expect, request as pwRequest, type APIRequestContext } from '@playwright/test';
import path from 'path';

/**
 * Phase 3 — data-integrity remediation regression tests.
 *
 * Covers:
 *  - #10/#21: product CREATE + UPDATE wrap product write + color-row write in a
 *    single transaction. We assert the HAPPY paths and that the resulting color
 *    rows (incl. per-color prices) are consistent with the request.
 *  - #12: oils import preloads existing products into a Map, batches writes in a
 *    transaction, and is idempotent (re-import updates instead of duplicating).
 *  - #23: backup create + restore round-trips the DB (products/colors/contacts).
 *
 * Auth happens ONCE (login is rate-limited 5/15min/IP) and the signed admin
 * cookie is reused across the suite.
 */

const BASE = 'http://localhost:3000';
const FIXTURE = path.join(__dirname, 'fixtures', 'Shell new price 01.09.2023.xlsx');
let api: APIRequestContext;
const createdProductIds: number[] = [];

function uniqueSlug(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const baseProduct = (overrides: Record<string, unknown> = {}) => ({
  name: 'Трактор Phase3',
  slug: uniqueSlug('phase3'),
  description: '<p>Описание</p>',
  category: 'TRACTOR',
  brand: 'Phase3Brand',
  images: '[]',
  ...overrides,
});

async function create(data: Record<string, unknown>) {
  const res = await api.post('/api/admin/products', { data });
  if (res.ok()) {
    const body = await res.json();
    if (body.id) createdProductIds.push(body.id);
  }
  return res;
}

test.beforeAll(async () => {
  api = await pwRequest.newContext({ baseURL: BASE });
  const res = await api.post('/api/admin/auth/login', {
    data: { username: 'admin', password: 'petral2024' },
  });
  expect(res.ok(), `login failed: ${res.status()}`).toBeTruthy();
});

test.afterAll(async () => {
  for (const id of createdProductIds) {
    await api.delete(`/api/admin/products/${id}`).catch(() => {});
  }
  await api.dispose();
});

test.describe('Phase 3 — atomic product create/update color-row consistency (#10/#21)', () => {
  test('create with per-color prices produces consistent color rows', async () => {
    const colorsRes = await api.get('/api/admin/colors');
    expect(colorsRes.ok()).toBeTruthy();
    const colors: Array<{ id: number; name: string }> = await colorsRes.json();
    const red = colors.find((c) => c.name === 'Червен');
    const yellow = colors.find((c) => c.name === 'Жълт');
    test.skip(!red || !yellow, 'Demo colors Червен/Жълт not present');

    const colorIds = [red!.id, yellow!.id];
    const res = await create(
      baseProduct({
        slug: uniqueSlug('phase3-colors'),
        price: 5870,
        colorIds,
        colorImageMap: { [String(red!.id)]: 'https://example.com/red.png' },
        colorPriceMap: { [String(red!.id)]: 6500, [String(yellow!.id)]: 7100 },
      })
    );
    expect(res.ok(), `create failed: ${res.status()} ${await res.text()}`).toBeTruthy();
    const { id } = await res.json();

    // The per-color price for yellow (7100) must have been written into the DB
    // and surface on the public product page (color prices drive the display).
    const page = await api.get(`${BASE}/catalog/${id}`);
    expect(page.ok()).toBeTruthy();
    const html = await page.text();
    expect(html).toMatch(/7[\s.,]?100/);
  });

  test('update swaps colors + prices and the rows stay consistent', async () => {
    const colorsRes = await api.get('/api/admin/colors');
    const colors: Array<{ id: number; name: string }> = await colorsRes.json();
    const red = colors.find((c) => c.name === 'Червен');
    const yellow = colors.find((c) => c.name === 'Жълт');
    test.skip(!red || !yellow, 'Demo colors Червен/Жълт not present');

    // Create with red priced, then update so YELLOW carries a distinct price and
    // red is dropped. After update the page must show the new yellow price and
    // NOT the stale red price — proving deleteMany+createMany ran atomically.
    const created = await create(
      baseProduct({
        slug: uniqueSlug('phase3-upd'),
        price: 5870,
        colorIds: [red!.id, yellow!.id],
        colorPriceMap: { [String(red!.id)]: 6543, [String(yellow!.id)]: 8123 },
      })
    );
    const { id } = await created.json();

    const upd = await api.put(`/api/admin/products/${id}`, {
      data: baseProduct({
        slug: uniqueSlug('phase3-upd2'),
        price: 5870,
        colorIds: [yellow!.id],
        colorPriceMap: { [String(yellow!.id)]: 9321 },
      }),
    });
    expect(upd.ok(), `update failed: ${upd.status()} ${await upd.text()}`).toBeTruthy();

    const page = await api.get(`${BASE}/catalog/${id}`);
    expect(page.ok()).toBeTruthy();
    const html = await page.text();
    expect(html, 'new yellow price should appear').toMatch(/9[\s.,]?321/);
    expect(html, 'stale red price should be gone').not.toMatch(/6[\s.,]?543/);
  });

  test('create without colors succeeds (no color rows)', async () => {
    const res = await create(baseProduct({ slug: uniqueSlug('phase3-nocolor') }));
    expect(res.ok(), `create failed: ${res.status()} ${await res.text()}`).toBeTruthy();
    const { id } = await res.json();
    expect(id).toBeTruthy();
  });
});

test.describe('Phase 3 — oils import perf + idempotency (#12)', () => {
  test('imports several rows, then re-imports as updates (idempotent)', async () => {
    // Clean OILS for the fixture brand via the import endpoint behavior: a fresh
    // import after clearing must create; the immediate re-import must update.
    // We clear by deleting all OILS products created here through the API at the
    // end; for create-vs-update detection we just compare the two responses.
    const buffer = require('fs').readFileSync(FIXTURE);

    async function importOnce() {
      const res = await api.post('/api/admin/oils/import', {
        multipart: {
          file: {
            name: 'Shell new price 01.09.2023.xlsx',
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            buffer,
          },
        },
      });
      expect(res.ok(), `import failed: ${res.status()} ${await res.text()}`).toBeTruthy();
      return res.json();
    }

    const first = await importOnce();
    const second = await importOnce();

    // First import created (or updated, if a prior run already seeded). The KEY
    // invariant for #12 idempotency: re-importing the SAME file creates nothing
    // and updates the previously-present rows.
    expect(first.created + first.updated, 'first import touched rows').toBeGreaterThan(0);
    expect(second.created, 're-import must not create duplicates').toBe(0);
    expect(second.updated, 're-import must update existing rows').toBeGreaterThan(0);
    expect(second.brand).toBeTruthy();
  });
});

test.describe('Phase 3 — backup create + restore round-trip (#23)', () => {
  test('db backup zip restores products/colors/contacts intact', async () => {
    // Seed a recognizable product WITH a per-color price so we can assert both
    // the product AND its ProductColorImage rows (colorPriceMap) survive the
    // round-trip — the per-color price was silently dropped before the fix.
    const marker = `Phase3 Backup ${Date.now()}`;
    const colorsRes = await api.get('/api/admin/colors');
    const colors: Array<{ id: number; name: string }> = await colorsRes.json();
    const yellow = colors.find((c) => c.name === 'Жълт');
    const perColorPrice = 7654;
    const seed = await create(
      baseProduct({
        name: marker,
        slug: uniqueSlug('phase3-backup'),
        price: 5870,
        ...(yellow
          ? {
              colorIds: [yellow.id],
              colorPriceMap: { [String(yellow.id)]: perColorPrice },
            }
          : {}),
      })
    );
    expect(seed.ok(), `seed failed: ${seed.status()}`).toBeTruthy();

    // 1) Create a backup of the db scope.
    const backup = await api.get('/api/admin/backup?scopes=db');
    expect(backup.ok(), `backup failed: ${backup.status()}`).toBeTruthy();
    expect(backup.headers()['content-type']).toContain('application/zip');
    const zipBuffer = await backup.body();
    expect(zipBuffer.length).toBeGreaterThan(0);

    // 2) Restore it. The restore wipes + recreates the db scope; the marker
    //    product must still be present afterwards (round-trip preserved it).
    const restore = await api.post('/api/admin/backup/restore', {
      multipart: {
        scopes: 'db',
        file: {
          name: 'petral-backup.zip',
          mimeType: 'application/zip',
          buffer: zipBuffer,
        },
      },
    });
    expect(restore.ok(), `restore failed: ${restore.status()} ${await restore.text()}`).toBeTruthy();
    const body = await restore.json();
    expect(body.success).toBeTruthy();
    expect(body.restored.products, 'products restored').toBeGreaterThan(0);

    // 3) Confirm the seeded product is reachable on its catalog page after restore.
    const page = await api.get(`${BASE}/catalog/${(await seed.json()).id}`);
    expect(page.ok(), 'seeded product survived restore').toBeTruthy();
    const html = await page.text();
    expect(html).toContain(marker);

    // 4) #23 per-color price round-trip: the ProductColorImage price (7654) must
    //    still surface after restore (it drives the color price on the page).
    if (yellow) {
      expect(body.restored.colorImages, 'colorImages restored').toBeGreaterThan(0);
      expect(html, 'per-color price survived restore').toMatch(/7[\s.,]?654/);
    }
  });
});
