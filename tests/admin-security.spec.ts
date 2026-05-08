import { test, expect } from '@playwright/test';

/**
 * Admin API endpoints must reject requests without a valid signed session.
 * Before the P0 fix, several routes either had no auth or only checked for
 * cookie presence, so a forged "admin_session=anything" cookie was enough.
 */
test.describe('Admin API auth', () => {
  const protectedEndpoints: Array<{ method: 'GET' | 'POST' | 'PUT' | 'DELETE'; url: string }> = [
    { method: 'GET', url: '/api/admin/backup?scopes=db' },
    { method: 'GET', url: '/api/admin/uploads' },
    { method: 'POST', url: '/api/admin/products' },
    { method: 'POST', url: '/api/admin/upload' },
    { method: 'POST', url: '/api/admin/colors' },
    { method: 'PUT', url: '/api/admin/content' },
    { method: 'DELETE', url: '/api/admin/inquiries/1' },
    { method: 'DELETE', url: '/api/admin/contacts/1' },
  ];

  for (const { method, url } of protectedEndpoints) {
    test(`${method} ${url} → 401 without session`, async ({ request }) => {
      const res = await request.fetch(url, { method });
      expect(res.status()).toBe(401);
    });

    test(`${method} ${url} → 401 with forged cookie`, async ({ request }) => {
      const res = await request.fetch(url, {
        method,
        headers: { Cookie: 'admin_session=not-a-real-signed-token' },
      });
      expect(res.status()).toBe(401);
    });
  }
});

test.describe('Admin inquiries deletion', () => {
  test('admin can delete an inquiry from the list', async ({ page, request }) => {
    // Submit a fresh inquiry via the public API so the test is self-contained.
    const productsRes = await request.get('/api/products?limit=1').catch(() => null);
    // Fallback: read the catalog page to find the first product id.
    await page.goto('/catalog');
    const firstHref = await page
      .locator('a[href^="/catalog/"]')
      .first()
      .getAttribute('href');
    test.skip(!firstHref, 'No products in catalog to attach an inquiry to');

    const productId = firstHref!.split('/').pop()!;
    const numericId = Number(productId);
    test.skip(!Number.isFinite(numericId), 'Catalog uses non-numeric IDs');

    const stamp = `delete-test-${Date.now()}`;
    const submit = await request.post('/api/inquiry', {
      data: {
        productId: numericId,
        name: stamp,
        email: 'delete-test@example.com',
        phone: '0888000000',
        message: 'Test inquiry for deletion',
        consent: true,
      },
    });
    test.skip(!submit.ok(), `Inquiry submission failed (${submit.status()})`);

    // Login as admin
    await page.goto('/admin/login');
    await page.locator('#username').fill('admin');
    await page.locator('#password').fill('petral2024');
    await page.getByRole('button', { name: /Вход/ }).click();
    await page.waitForURL('/admin', { timeout: 15000 });

    // Navigate to inquiries
    await page.goto('/admin/inquiries');
    const card = page
      .locator('.bg-white.rounded-xl')
      .filter({ hasText: stamp })
      .first();
    await expect(card).toBeVisible();

    // Open the confirm modal from the row, then click "Изтрий" inside the dialog.
    await card.getByRole('button', { name: /Изтрий/ }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: /Изтрий/ }).click();

    await expect(page.getByText(stamp)).toHaveCount(0, { timeout: 10000 });

    void productsRes;
  });

  test('admin can delete a contact message from the list', async ({ page, request }) => {
    const stamp = `contact-delete-test-${Date.now()}`;
    const submit = await request.post('/api/contact', {
      data: {
        name: stamp,
        email: 'contact-delete@example.com',
        phone: '0888000111',
        message: 'Test contact for deletion',
      },
    });
    test.skip(!submit.ok(), `Contact submission failed (${submit.status()})`);

    await page.goto('/admin/login');
    await page.locator('#username').fill('admin');
    await page.locator('#password').fill('petral2024');
    await page.getByRole('button', { name: /Вход/ }).click();
    await page.waitForURL('/admin', { timeout: 15000 });

    await page.goto('/admin/contacts');
    const card = page
      .locator('.bg-white.rounded-xl')
      .filter({ hasText: stamp })
      .first();
    await expect(card).toBeVisible();

    await card.getByRole('button', { name: /Изтрий/ }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: /Изтрий/ }).click();

    await expect(page.getByText(stamp)).toHaveCount(0, { timeout: 10000 });
  });

  test('confirm dialog can be cancelled with Escape', async ({ page, request }) => {
    const stamp = `cancel-test-${Date.now()}`;
    const submit = await request.post('/api/contact', {
      data: {
        name: stamp,
        email: 'cancel@example.com',
        message: 'Stays put',
      },
    });
    test.skip(!submit.ok(), `Contact submission failed (${submit.status()})`);

    await page.goto('/admin/login');
    await page.locator('#username').fill('admin');
    await page.locator('#password').fill('petral2024');
    await page.getByRole('button', { name: /Вход/ }).click();
    await page.waitForURL('/admin', { timeout: 15000 });

    await page.goto('/admin/contacts');
    const card = page.locator('.bg-white.rounded-xl').filter({ hasText: stamp }).first();
    await card.getByRole('button', { name: /Изтрий/ }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();

    // Row should still be there.
    await expect(page.getByText(stamp).first()).toBeVisible();
  });
});
