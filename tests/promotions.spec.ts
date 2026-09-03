import { test, expect, type Page } from '@playwright/test';

/**
 * Promotion feature: admin CRUD + public display (ribbon, struck-through old
 * price, red promo price, promo note) + date validity.
 */

const SUFFIX = Date.now().toString(36);
const PRODUCT_NAME = `Promo Test Tractor ${SUFFIX}`;
const RIBBON = 'ТЕСТ ПРОМО';
const COMMENT = `Тестов промо коментар ${SUFFIX}`;

let productId: number;
/** Control product: same search term, higher sortOrder, no promotion. */
let controlId: number;
let promotionId: number;

async function login(page: Page) {
  await page.goto('/admin/login');
  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('petral2024');
  await page.getByRole('button', { name: /Вход/ }).click();
  await page.waitForURL('/admin', { timeout: 15000 });
}

function isoDate(offsetDays: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

test.describe.serial('Promotions', () => {
  test('setup: create a product and a percent promotion', async ({ page }) => {
    await login(page);

    const created = await page.request.post('/api/admin/products', {
      data: {
        name: PRODUCT_NAME,
        slug: `promo-test-${SUFFIX}`,
        description: '<p>Промо тест</p>',
        price: 1000,
        category: 'TRACTOR',
        brand: 'TestBrand',
        year: 2026,
        images: '["/images/tractors/tractor-1.jpg"]',
        featured: false,
        hidden: false,
        sortOrder: 0,
        colorIds: [],
      },
    });
    expect(created.ok()).toBeTruthy();
    productId = (await created.json()).id;

    const control = await page.request.post('/api/admin/products', {
      data: {
        name: `${PRODUCT_NAME} Control`,
        slug: `promo-test-control-${SUFFIX}`,
        description: '<p>Контролен продукт</p>',
        price: 2000,
        category: 'TRACTOR',
        brand: 'TestBrand',
        year: 2026,
        images: '[]',
        featured: false,
        hidden: false,
        sortOrder: 50,
        colorIds: [],
      },
    });
    expect(control.ok()).toBeTruthy();
    controlId = (await control.json()).id;

    const res = await page.request.post('/api/admin/promotions', {
      data: {
        title: `Тестова промоция ${SUFFIX}`,
        type: 'PERCENT',
        percent: 20,
        ribbonText: RIBBON,
        comment: COMMENT,
        startsAt: isoDate(-1),
        endsAt: isoDate(30),
        active: true,
        productIds: [productId],
      },
    });
    expect(res.ok()).toBeTruthy();
    promotionId = (await res.json()).id;
    expect(promotionId).toBeGreaterThan(0);
  });

  test('rejects invalid promotions and unauthenticated writes', async ({ page, request }) => {
    await login(page);

    const badPercent = await page.request.post('/api/admin/promotions', {
      data: { title: 'x', type: 'PERCENT', percent: 150, productIds: [productId] },
    });
    expect(badPercent.status()).toBe(400);

    const badPrice = await page.request.post('/api/admin/promotions', {
      data: { title: 'x', type: 'PRICE', promoPriceGross: 0, productIds: [productId] },
    });
    expect(badPrice.status()).toBe(400);

    const badDates = await page.request.post('/api/admin/promotions', {
      data: { title: 'x', type: 'PERCENT', percent: 10, startsAt: '2026-10-10', endsAt: '2026-10-01', productIds: [productId] },
    });
    expect(badDates.status()).toBe(400);

    // Fresh (unauthenticated) request context.
    const anon = await request.post('/api/admin/promotions', {
      data: { title: 'x', type: 'PERCENT', percent: 10, productIds: [productId] },
    });
    expect([401, 403]).toContain(anon.status());
  });

  test('product page shows ribbon, old price, promo price and note', async ({ page }) => {
    await page.goto(`/catalog/${productId}`);

    const ribbon = page.getByTestId('promo-ribbon');
    await expect(ribbon).toBeVisible();
    await expect(ribbon).toContainText(RIBBON);

    await expect(page.getByTestId('old-price')).toContainText(/1\s?000,00 €/);
    // 20% off 1000 → 800 ex-VAT, shown per the usual rules (EUR + BGN).
    await expect(page.getByTestId('current-price')).toContainText('800,00 €');
    await expect(page.getByTestId('promo-note')).toContainText(COMMENT);
    await expect(page.getByTestId('promo-note')).toContainText('Промоцията важи до');
  });

  test('catalog card shows ribbon and struck-through price', async ({ page }) => {
    await page.goto(`/catalog?q=${encodeURIComponent(PRODUCT_NAME)}`);
    const card = page.locator('a[href$="/catalog/' + productId + '"]').first();
    await expect(card).toBeVisible();
    await expect(card.getByTestId('promo-ribbon')).toContainText(RIBBON);
    await expect(card.getByTestId('old-price')).toContainText(/1\s?000,00 €/);
    await expect(card).toContainText('800,00 €');

    // Active promotion outranks the control product's higher sortOrder (50 vs 0).
    const hrefs = await page.locator('a[href^="/catalog/"]').evaluateAll((els) =>
      els.map((el) => el.getAttribute('href'))
    );
    expect(hrefs.indexOf(`/catalog/${productId}`)).toBeLessThan(hrefs.indexOf(`/catalog/${controlId}`));
  });

  test('admin lists show the promotion and the bulk action works', async ({ page }) => {
    await login(page);

    await page.goto('/admin/promotions');
    const row = page.getByTestId('promotion-row').filter({ hasText: `Тестова промоция ${SUFFIX}` });
    await expect(row).toBeVisible();
    await expect(row).toContainText('Активна');
    await expect(row).toContainText('−20%');

    await page.goto(`/admin/products?q=${encodeURIComponent(PRODUCT_NAME)}`);
    await expect(page.getByRole('link', { name: `Тестова промоция ${SUFFIX}` })).toBeVisible();

    await page.locator(`input[data-product-id="${productId}"]`).check();
    await expect(page.getByTestId('bulk-bar')).toContainText('Избрани: 1');
    await page.getByRole('button', { name: 'Промоция за избраните' }).click();
    await page.waitForURL(new RegExp(`/admin/promotions/new\\?products=${productId}$`));
    await expect(page.getByTestId('promo-selected-count')).toHaveText('1');
    await expect(page.locator(`input[data-product-id="${productId}"]`)).toBeChecked();

    // Product edit form shows the promotion section with a link to it.
    await page.goto(`/admin/products/${productId}/edit`);
    const section = page.getByTestId('product-promotion-section');
    await expect(section).toContainText(`Тестова промоция ${SUFFIX}`);
    await expect(section.getByRole('link', { name: 'Редактирай промоцията' })).toHaveAttribute(
      'href',
      `/admin/promotions/${promotionId}/edit`
    );
  });

  test('fixed price promotion is entered with VAT and shown without', async ({ page }) => {
    await login(page);

    // Edit via the admin form: switch to a fixed gross price of 600 € (→ 500 € net).
    await page.goto(`/admin/promotions/${promotionId}/edit`);
    await page.getByLabel('Фиксирана промо цена (с ДДС)').check();
    await page.getByLabel('Промо цена с ДДС (€) *').fill('600');
    await expect(page.getByText(/На сайта ще се покаже/)).toContainText('500,00 €');
    await page.getByRole('button', { name: 'Запази промените' }).click();
    await page.waitForURL('/admin/promotions');

    await page.goto(`/catalog/${productId}`);
    await expect(page.getByTestId('old-price')).toContainText(/1\s?000,00 €/);
    await expect(page.getByTestId('current-price')).toContainText('500,00 €');
  });

  test('expired promotion is not shown', async ({ page }) => {
    await login(page);

    const res = await page.request.put(`/api/admin/promotions/${promotionId}`, {
      data: {
        title: `Тестова промоция ${SUFFIX}`,
        type: 'PERCENT',
        percent: 20,
        ribbonText: RIBBON,
        comment: COMMENT,
        startsAt: isoDate(-10),
        endsAt: isoDate(-1),
        active: true,
        productIds: [productId],
      },
    });
    expect(res.ok()).toBeTruthy();

    await page.goto(`/catalog/${productId}`);
    await expect(page.getByTestId('promo-ribbon')).toHaveCount(0);
    await expect(page.getByTestId('old-price')).toHaveCount(0);
    await expect(page.getByTestId('current-price')).toContainText(/1\s?000,00 €/);

    // Expired promotion no longer floats the product above the control product.
    await page.goto(`/catalog?q=${encodeURIComponent(PRODUCT_NAME)}`);
    await page.locator(`a[href="/catalog/${controlId}"]`).first().waitFor();
    const hrefs = await page.locator('a[href^="/catalog/"]').evaluateAll((els) =>
      els.map((el) => el.getAttribute('href'))
    );
    expect(hrefs.indexOf(`/catalog/${controlId}`)).toBeLessThan(hrefs.indexOf(`/catalog/${productId}`));

    await page.goto('/admin/promotions');
    const row = page.getByTestId('promotion-row').filter({ hasText: `Тестова промоция ${SUFFIX}` });
    await expect(row).toContainText('Изтекла');
  });

  test('"other" promotion keeps the price and shows only ribbon + note', async ({ page }) => {
    await login(page);

    const res = await page.request.put(`/api/admin/promotions/${promotionId}`, {
      data: {
        title: `Тестова промоция ${SUFFIX}`,
        type: 'OTHER',
        ribbonText: 'НА ИЗПЛАЩАНЕ',
        comment: 'Лизинг до 36 месеца без оскъпяване.',
        endsAt: isoDate(30),
        active: true,
        productIds: [productId],
      },
    });
    expect(res.ok()).toBeTruthy();

    await page.goto(`/catalog/${productId}`);
    await expect(page.getByTestId('promo-ribbon')).toContainText('НА ИЗПЛАЩАНЕ');
    await expect(page.getByTestId('old-price')).toHaveCount(0);
    await expect(page.getByTestId('current-price')).toContainText(/1\s?000,00 €/);
    await expect(page.getByTestId('promo-note')).toContainText('Лизинг до 36 месеца');

    await page.goto('/admin/promotions');
    const row = page.getByTestId('promotion-row').filter({ hasText: `Тестова промоция ${SUFFIX}` });
    await expect(row).toContainText('без промяна на цената');
  });

  test('repeated ?products= key does not crash the new-promotion page', async ({ page }) => {
    await login(page);
    await page.goto(`/admin/promotions/new?products=${productId}&products=${controlId}`);
    await expect(page.getByTestId('promo-selected-count')).toHaveText('2');
  });

  test('missing promotion id returns 404, not 500', async ({ page }) => {
    await login(page);
    const del = await page.request.delete('/api/admin/promotions/999999');
    expect(del.status()).toBe(404);
    const put = await page.request.put('/api/admin/promotions/999999', {
      data: { title: 'x', type: 'OTHER', productIds: [] },
    });
    expect(put.status()).toBe(404);
  });

  test('deleting the promotion detaches the product', async ({ page }) => {
    await login(page);

    const del = await page.request.delete(`/api/admin/promotions/${promotionId}`);
    expect(del.ok()).toBeTruthy();

    await page.goto(`/admin/products?q=${encodeURIComponent(PRODUCT_NAME)}`);
    // Both test products (promo + control) now show the "add promotion" link.
    await expect(page.getByRole('link', { name: '+ промоция' })).toHaveCount(2);

    const cleanup = await page.request.delete(`/api/admin/products/${productId}`);
    expect(cleanup.ok()).toBeTruthy();
    const cleanupControl = await page.request.delete(`/api/admin/products/${controlId}`);
    expect(cleanupControl.ok()).toBeTruthy();
  });
});
