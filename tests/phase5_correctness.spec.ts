import { test, expect, request as pwRequest, type APIRequestContext } from '@playwright/test';

/**
 * Phase 5 remediation regression tests (correctness bugs).
 *
 * Covers:
 *  - #13: live price resets to base when a no-color photo is shown, while
 *         color photos / swatches still set their per-color price.
 *  - #14: an out-of-range ?page=9999 shows the last page (non-empty grid)
 *         instead of an empty grid with a "стр. N от M" counter.
 *  - #34: InquiryForm shows the server-provided error text on a failed submit.
 *  - #35: content PUT rejects a non-string value (400) and persists a valid
 *         string update.
 *
 * We authenticate ONCE (login is rate-limited 5/15min per IP) and reuse the
 * signed admin cookie for the API-driven tests. Throwaway products created for
 * the live-price test are deleted in afterAll.
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

test.describe('Phase 5 — #14 pagination out-of-range', () => {
  test('catalog ?page=9999 clamps to the last page, not an empty grid', async ({ page }) => {
    await page.goto(`${BASE}/catalog?page=9999`, { waitUntil: 'networkidle' });

    const cards = page.locator('a[href^="/catalog/"]').filter({ has: page.locator('img') });
    const empty = page.getByText('Няма намерени продукти.');
    const hasEmpty = await empty.isVisible().catch(() => false);

    if (hasEmpty) return; // No products at all — empty-state shown, acceptable.

    // The grid must NOT be empty while a counter claims page content exists.
    expect(await cards.count()).toBeGreaterThan(0);

    // The "стр. N от M" counter must show the clamped page (== M), not 9999.
    const counter = await page.getByText(/стр\.\s*\d+\s*от\s*\d+/).first().textContent();
    if (counter) {
      const m = counter.match(/стр\.\s*(\d+)\s*от\s*(\d+)/);
      expect(m).toBeTruthy();
      const current = Number(m![1]);
      const totalPages = Number(m![2]);
      expect(current).toBe(totalPages);
      expect(current).not.toBe(9999);
    }
  });

  test('oils ?page=9999 clamps to the last page, not an empty table', async ({ page }) => {
    await page.goto(`${BASE}/oils?page=9999`, { waitUntil: 'networkidle' });

    const counterText = await page.getByText(/продукт/).first().textContent();
    expect(counterText).toBeTruthy();

    // If there are multiple pages, the counter must show the clamped last page.
    const m = counterText!.match(/стр\.\s*(\d+)\s*от\s*(\d+)/);
    if (m) {
      expect(Number(m[1])).toBe(Number(m[2]));
      expect(Number(m[1])).not.toBe(9999);
      // And the table body must have at least one data row.
      const rows = page.locator('table tbody tr');
      expect(await rows.count()).toBeGreaterThan(0);
    }
  });
});

test.describe('Phase 5 — #35 content PUT validation', () => {
  let original: Record<string, string> = {};

  test.beforeAll(async () => {
    const res = await api.get('/api/admin/content');
    if (res.ok()) original = await res.json();
  });

  test.afterAll(async () => {
    // Restore the field we touched to its original value.
    if (original.hero_title !== undefined) {
      await api
        .put('/api/admin/content', { data: { hero_title: original.hero_title } })
        .catch(() => {});
    }
  });

  test('rejects a non-string value with 400', async () => {
    const res = await api.put('/api/admin/content', {
      data: { hero_title: 12345 },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  test('rejects a non-string color value with 400', async () => {
    const res = await api.put('/api/admin/content', {
      data: { color_primary: { not: 'a string' } },
    });
    expect(res.status()).toBe(400);
  });

  test('persists a valid string update', async () => {
    const value = `Заглавие ${Date.now()}`;
    const res = await api.put('/api/admin/content', {
      data: { hero_title: value },
    });
    expect(res.ok(), `update failed: ${res.status()} ${await res.text()}`).toBeTruthy();

    const check = await api.get('/api/admin/content');
    const content = await check.json();
    expect(content.hero_title).toBe(value);
  });
});

test.describe('Phase 5 — #34 InquiryForm shows server error', () => {
  test('renders the server-provided error toast on a failed submit', async ({ page }) => {
    await page.goto(`${BASE}/catalog/83`);

    // Fill the inquiry form. Product 83 has colors, so pick one to pass the
    // client-side guard and reach the server, which we force to error.
    await page.route('**/api/inquiry', (route) =>
      route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Сървърна грешка за тест 12345' }),
      })
    );

    // The inquiry form labels aren't htmlFor-associated, so scope to the form
    // (heading "Поискай оферта") and target inputs by type.
    const form = page.locator('form', { has: page.getByRole('heading', { name: 'Поискай оферта' }) });
    await form.locator('input[type="text"]').fill('Тест');
    await form.locator('input[type="email"]').fill('test@example.com');

    // Select the first color swatch (radio) if present.
    const colorRadio = form.locator('input[name="inquiry-color"]').first();
    if (await colorRadio.count()) {
      await colorRadio.check({ force: true });
    }

    await form.locator('#inquiry-consent').check();
    await form.getByRole('button', { name: /Изпрати запитване/ }).click();

    await expect(page.getByText('Сървърна грешка за тест 12345')).toBeVisible();
  });
});

test.describe('Phase 5 — #13 live price reset on no-color photo', () => {
  let productId: number;

  test.beforeAll(async () => {
    // Build a product whose gallery photo #2 maps to a color (with its own
    // price) and whose photo #1 maps to no color. Reuse product 83's static
    // image paths so next/image resolves them.
    const img1 = '/images/products/atv-hisun-guardian-400-1.png'; // no color
    const img2 = '/images/products/atv-hisun-guardian-400-2.png'; // color photo
    const colorsRes = await api.get('/api/admin/colors');
    const colors: Array<{ id: number; name: string }> = await colorsRes.json();
    const red = colors.find((c) => c.name === 'Червен');
    test.skip(!red, 'Demo color Червен not present');

    const res = await api.post('/api/admin/products', {
      data: {
        name: 'Фаза5 Цена Тест',
        slug: uniqueSlug('phase5-price'),
        description: '<p>тест</p>',
        category: 'ATV',
        brand: 'TestBrand',
        price: 5870,
        images: JSON.stringify([img1, img2]),
        colorIds: [red!.id],
        colorImageMap: { [String(red!.id)]: img2 },
        // Per-colour value is a signed surcharge added to the base price:
        // 5870 + 1000 = 6870 when Червен is selected.
        colorPriceMap: { [String(red!.id)]: 1000 },
      },
    });
    expect(res.ok(), `create failed: ${res.status()} ${await res.text()}`).toBeTruthy();
    const body = await res.json();
    productId = body.id;
    createdProductIds.push(productId);
  });

  test('color photo sets price, no-color photo resets to base', async ({ page }) => {
    test.skip(!productId, 'product not created');
    await page.goto(`${BASE}/catalog/${productId}`);

    const price = page.locator('p.text-3xl.font-bold').first();

    // Initial: base price 5870 (no color selected on mount).
    await expect(price).toContainText('5870');

    // Click the color swatch → base 5870 + surcharge 1000 = 6870.
    await page.getByRole('button', { name: 'Червен' }).click();
    await expect(price).toContainText('6870');

    // Click the first thumbnail (a no-color photo) → resets to base 5870.
    const thumbs = page.getByRole('tab');
    await thumbs.first().click();
    await expect(price).toContainText('5870');

    // Click the second thumbnail (the color photo) → back to 6870.
    await thumbs.nth(1).click();
    await expect(price).toContainText('6870');
  });
});
