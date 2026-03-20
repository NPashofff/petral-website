import { test, expect } from '@playwright/test';

test.describe('Admin - Price Zero Bug Fix', () => {
  test('should allow price 0 in product form', async ({ page }) => {
    await page.goto('/admin/login');
    await page.locator('#username').fill('admin');
    await page.locator('#password').fill('petral2024');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin');

    await page.goto('/admin/products');
    await page.locator('a[href*="/edit"]').first().click();

    await page.getByLabel(/Цена/).fill('0');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/admin/products', { timeout: 10000 });
  });
});
