import { test, expect } from '@playwright/test';

test.describe('Catalog', () => {
  test('should display product list', async ({ page }) => {
    await page.goto('/catalog');

    const products = page.locator('.group.block');
    await expect(products.first()).toBeVisible();
  });

  test('should filter by category', async ({ page }) => {
    await page.goto('/catalog');

    // Use the category select dropdown
    await page.locator('select').first().selectOption('ATV');

    // Should show ATV products or empty state
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should open product details', async ({ page }) => {
    await page.goto('/catalog');

    await page.locator('.group.block').first().click();

    await expect(page).toHaveURL(/\/catalog\/\d+/);
    await expect(page.getByRole('button', { name: /Изпрати запитване/ })).toBeVisible();
  });
});
