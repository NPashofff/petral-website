import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Petral/);
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to catalog', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Каталог/ }).first().click();
    await expect(page).toHaveURL(/\/catalog/);
  });
});
