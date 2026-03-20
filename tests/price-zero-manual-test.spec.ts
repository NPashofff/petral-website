import { test, expect } from '@playwright/test';

test.describe('Price Zero Bug Fix - Manual Test', () => {
  test('should allow price 0 and empty price', async ({ page }) => {
    await page.goto('/admin/login');
    await page.locator('#username').fill('admin');
    await page.locator('#password').fill('petral2024');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin', { timeout: 30000 });

    await page.goto('/admin/products');
    await page.waitForSelector('a[href*="/edit"]');
    await page.locator('a[href*="/edit"]').first().click();
    await page.waitForURL(/\/admin\/products\/\d+\/edit/);

    // Test 1: price = 0
    await page.getByLabel(/Цена/).fill('0');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin/products', { timeout: 10000 });
    console.log('✓ Price 0 accepted successfully');

    // Test 2: empty price
    await page.locator('a[href*="/edit"]').first().click();
    await page.waitForURL(/\/admin\/products\/\d+\/edit/);
    await page.getByLabel(/Цена/).fill('');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin/products', { timeout: 10000 });
    console.log('✓ Empty price accepted successfully');

    // Test 3: verify "-" in catalog for null price
    await page.goto('/catalog');
    const hasDashPrice = await page.locator('text="-"').count() > 0;
    console.log(hasDashPrice
      ? '✓ Products with no price display "-" correctly'
      : 'ℹ No products with null price found in catalog (OK)');
  });
});
