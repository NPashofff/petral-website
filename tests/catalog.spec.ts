import { test, expect } from '@playwright/test';

test.describe('Catalog', () => {
  test('should display product list', async ({ page }) => {
    await page.goto('/catalog');

    // Should have products
    const products = page.locator('.group.block');
    await expect(products.first()).toBeVisible();
  });

  test('should filter by category', async ({ page }) => {
    await page.goto('/catalog');

    // Click ATV filter
    await page.getByRole('button', { name: /АТВ/ }).click();

    // Should show only ATV products
    await expect(page.getByText(/АТВ/).first()).toBeVisible();
  });

  test('should open product details', async ({ page }) => {
    await page.goto('/catalog');

    // Click first product
    await page.locator('.group.block').first().click();

    // Should navigate to product page
    await expect(page).toHaveURL(/\/catalog\/\d+/);
    await expect(page.getByRole('button', { name: /Направи запитване/ })).toBeVisible();
  });
});
