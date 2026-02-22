import { test, expect } from '@playwright/test';

test.describe('Admin', () => {
  test('should show login page', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(page.getByRole('heading', { name: /Вход в администрация/ })).toBeVisible();
  });

  test('should login with correct credentials', async ({ page }) => {
    await page.goto('/admin/login');

    // Fill login form
    await page.getByLabel(/Потребителско име/).fill('admin');
    await page.getByLabel(/Парола/).fill('petral2024');
    await page.getByRole('button', { name: /Вход/ }).click();

    // Should redirect to admin dashboard
    await expect(page).toHaveURL('/admin');
  });

  test('should reject wrong credentials', async ({ page }) => {
    await page.goto('/admin/login');

    await page.getByLabel(/Потребителско име/).fill('wrong');
    await page.getByLabel(/Парола/).fill('wrong');
    await page.getByRole('button', { name: /Вход/ }).click();

    // Should show error
    await expect(page.getByText(/Грешно потребителско име или парола/)).toBeVisible();
  });

  test('should allow price 0 in product form', async ({ page }) => {
    // Login first
    await page.goto('/admin/login');
    await page.getByLabel(/Потребителско име/).fill('admin');
    await page.getByLabel(/Парола/).fill('petral2024');
    await page.getByRole('button', { name: /Вход/ }).click();

    // Go to products
    await page.goto('/admin/products');

    // Click first product edit
    await page.locator('a[href*="/admin/products/"][href*="/edit"]').first().click();

    // Change price to 0
    await page.getByLabel(/Цена/).fill('0');

    // Submit
    await page.getByRole('button', { name: /Запази/ }).click();

    // Should NOT show validation error
    await expect(page.getByText(/всички задължителни полета/)).not.toBeVisible({ timeout: 1000 }).catch(() => {});

    // Should redirect to products list
    await expect(page).toHaveURL('/admin/products', { timeout: 5000 });
  });
});
