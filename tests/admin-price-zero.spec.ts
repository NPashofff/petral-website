import { test, expect } from '@playwright/test';

test.describe('Admin - Price Zero Bug Fix', () => {
  test('should allow price 0 in product form', async ({ page }) => {
    // Login
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'petral2024');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin');

    // Go to products and edit first one
    await page.goto('/admin/products');
    await page.locator('a[href*="/edit"]').first().click();

    // Change price to 0
    const priceInput = page.locator('input[name="price"]');
    await priceInput.fill('0');

    // Submit
    await page.click('button[type="submit"]');

    // Should NOT show "всички задължителни полета" error
    // Should redirect to products list
    await expect(page).toHaveURL('/admin/products', { timeout: 10000 });
  });
});
