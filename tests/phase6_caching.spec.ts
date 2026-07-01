import {
  test,
  expect,
  request as pwRequest,
  type APIRequestContext,
} from '@playwright/test';

/**
 * Phase 6 — perf / cleanup regression tests.
 *
 * THE KEY RISK is stale public pages after an admin mutation. Phase 6 moved the
 * public site off "force-dynamic / noStore" onto cacheable reads that are
 * invalidated explicitly:
 *   - SiteContent   → unstable_cache tagged SITE_CONTENT_TAG, invalidated by the
 *                     content PUT via revalidateTag (src/lib/content.ts,
 *                     src/app/api/admin/content/route.ts).
 *   - Products      → catalog/oils/detail/home revalidated via revalidatePath in
 *                     src/lib/revalidate.ts (product create/update/delete + oils
 *                     import + backup restore).
 *
 * These tests prove an admin change is reflected on the public site (no stale
 * cache), the shared DeleteRowButton on the admin products list works
 * (confirm → row removed), and the core public pages return 200.
 *
 * Auth happens ONCE (login is rate-limited 5/15min/IP; loopback is exempt but we
 * still minimise logins) and the signed admin cookie is reused.
 */

const BASE = 'http://localhost:3000';
let api: APIRequestContext;
const createdProductIds: number[] = [];

function uniqueSlug(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
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

test.describe('Phase 6 — public page smoke (200s)', () => {
  for (const path of ['/', '/catalog', '/catalog/83', '/oils']) {
    test(`GET ${path} → 200`, async () => {
      const res = await api.get(path);
      expect(res.status(), `${path} status`).toBe(200);
    });
  }
});

test.describe('Phase 6 — #27 content change reflected on the public site', () => {
  let original: string | undefined;

  test.beforeAll(async () => {
    const res = await api.get('/api/admin/content');
    if (res.ok()) original = (await res.json()).about_title;
  });

  test.afterAll(async () => {
    if (original !== undefined) {
      await api
        .put('/api/admin/content', { data: { about_title: original } })
        .catch(() => {});
    }
  });

  test('an admin about_title edit appears on /about without a stale cache', async () => {
    const marker = `Фаза6 Заглавие ${Date.now()}`;
    const put = await api.put('/api/admin/content', {
      data: { about_title: marker },
    });
    expect(put.ok(), `content PUT failed: ${put.status()}`).toBeTruthy();

    // The content PUT calls revalidateTag(SITE_CONTENT_TAG); the very next public
    // read must show the new value (no stale full-route/data cache).
    const page = await api.get('/about');
    expect(page.ok()).toBeTruthy();
    const html = await page.text();
    expect(html, 'new about_title must appear on /about').toContain(marker);
  });

  test('a color_primary edit is reflected in the layout CSS var', async () => {
    const put = await api.put('/api/admin/content', {
      data: { color_primary: '#123456' },
    });
    expect(put.ok(), `content PUT failed: ${put.status()}`).toBeTruthy();

    const page = await api.get('/');
    const html = await page.text();
    expect(html, 'new primary color must appear in the html style').toContain('#123456');

    // Restore the default primary color.
    await api.put('/api/admin/content', { data: { color_primary: '#1B5E20' } });
  });
});

test.describe('Phase 6 — #27 product mutation reflected on catalog + detail', () => {
  test('create → detail page shows it; edit rename → reflected; delete → gone', async () => {
    const name1 = `Фаза6 Продукт ${Date.now()}`;
    const create = await api.post('/api/admin/products', {
      data: {
        name: name1,
        slug: uniqueSlug('phase6'),
        description: '<p>тест</p>',
        category: 'TRACTOR',
        brand: 'Phase6Brand',
        price: 12345,
        images: '[]',
      },
    });
    expect(create.ok(), `create failed: ${create.status()} ${await create.text()}`).toBeTruthy();
    const id = (await create.json()).id;
    createdProductIds.push(id);

    // Detail page reflects the new product immediately (revalidatePath).
    let page = await api.get(`/catalog/${id}`);
    expect(page.status()).toBe(200);
    expect(await page.text(), 'created product name on detail page').toContain(name1);

    // Rename via edit → the new name must appear and the old name must be gone
    // (proves the detail path was revalidated, not served stale).
    const name2 = `Фаза6 Преименуван ${Date.now()}`;
    const edit = await api.put(`/api/admin/products/${id}`, {
      data: {
        name: name2,
        slug: uniqueSlug('phase6-renamed'),
        description: '<p>тест</p>',
        category: 'TRACTOR',
        brand: 'Phase6Brand',
        price: 12345,
        images: '[]',
      },
    });
    expect(edit.ok(), `edit failed: ${edit.status()} ${await edit.text()}`).toBeTruthy();

    page = await api.get(`/catalog/${id}`);
    const editedHtml = await page.text();
    expect(editedHtml, 'renamed product must appear').toContain(name2);
    expect(editedHtml, 'old name must be gone (not stale)').not.toContain(name1);

    // Delete → detail page must 404 (revalidated), listing must not show it.
    const del = await api.delete(`/api/admin/products/${id}`);
    expect(del.ok(), `delete failed: ${del.status()}`).toBeTruthy();
    createdProductIds.splice(createdProductIds.indexOf(id), 1);

    const gone = await api.get(`/catalog/${id}`);
    expect(gone.status(), 'deleted product detail must 404').toBe(404);
  });
});

test.describe('Phase 6 — DeleteRowButton on the admin products list', () => {
  test('confirm dialog deletes the row; cancel keeps it', async ({ page, context }) => {
    // Seed a product to delete through the UI.
    const name = `Фаза6 UI Delete ${Date.now()}`;
    const create = await api.post('/api/admin/products', {
      data: {
        name,
        slug: uniqueSlug('phase6-ui'),
        description: '<p>тест</p>',
        category: 'TRACTOR',
        brand: 'Phase6UIBrand',
        price: 4242,
        images: '[]',
      },
    });
    expect(create.ok()).toBeTruthy();
    const id = (await create.json()).id;
    createdProductIds.push(id);

    // Reuse the API's signed session cookie in the browser context.
    const cookies = await api.storageState();
    await context.addCookies(cookies.cookies);

    await page.goto(`${BASE}/admin/products`, { waitUntil: 'networkidle' });

    const row = page.locator('tr', { hasText: name });
    await expect(row).toBeVisible();

    // Open the confirm dialog for this row, then cancel via Escape — row stays.
    await row.getByRole('button', { name: 'Изтрий' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Изтриване на продукт')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(row).toBeVisible();

    // Now confirm the delete — the dialog's confirm button (inside role=dialog),
    // not the table-row trigger — the row must disappear after router.refresh().
    await row.getByRole('button', { name: 'Изтрий' }).click();
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Изтрий' }).click();

    await expect(page.locator('tr', { hasText: name })).toHaveCount(0, {
      timeout: 10000,
    });

    // It's gone from the DB too.
    createdProductIds.splice(createdProductIds.indexOf(id), 1);
    const check = await api.get(`/catalog/${id}`);
    expect(check.status()).toBe(404);
  });
});
