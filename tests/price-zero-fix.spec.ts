import { test, expect } from '@playwright/test';

test('Price 0 validation fix', async ({ page }) => {
  await page.goto('/admin/login');
  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('petral2024');
  await page.click('button[type="submit"]');
  await page.waitForURL('/admin', { timeout: 30000 });

  await page.goto('/admin/products');
  await page.locator('a[href*="/edit"]').first().click();
  await page.waitForURL(/\/admin\/products\/\d+\/edit/);

  await page.getByLabel(/Цена/).fill('0');
  await page.click('button[type="submit"]');

  const errorText = await page.locator('text=/всички задължителни полета/i').count();
  expect(errorText).toBe(0);

  await expect(page).toHaveURL('/admin/products', { timeout: 10000 });
});
