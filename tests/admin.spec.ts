import { test, expect } from '@playwright/test';

test.describe('Admin', () => {
  test('should show login page', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(page.getByText(/Вход в админ панела/)).toBeVisible();
  });

  test('should login with correct credentials', async ({ page }) => {
    await page.goto('/admin/login');

    await page.getByLabel(/Потребителско име/).fill('admin');
    await page.getByLabel(/Парола/).fill('petral2024');
    await page.getByRole('button', { name: /Вход/ }).click();

    await expect(page).toHaveURL('/admin');
  });

  test('should reject wrong credentials', async ({ page }) => {
    await page.goto('/admin/login');

    await page.getByLabel(/Потребителско име/).fill('wrong');
    await page.getByLabel(/Парола/).fill('wrong');
    await page.getByRole('button', { name: /Вход/ }).click();

    await expect(page.getByText(/Невалидно потребителско име или парола/)).toBeVisible();
  });

  test('should allow price 0 in product form', async ({ page }) => {
    await page.goto('/admin/login');
    await page.locator('#username').fill('admin');
    await page.locator('#password').fill('petral2024');
    await page.getByRole('button', { name: /Вход/ }).click();
    await page.waitForURL('/admin', { timeout: 15000 });

    await page.goto('/admin/products');
    await page.locator('a[href*="/admin/products/"][href*="/edit"]').first().click();

    await page.getByLabel(/Цена/).fill('0');
    await page.getByRole('button', { name: /Запази/ }).click();

    await expect(page).toHaveURL('/admin/products', { timeout: 10000 });
  });
});
