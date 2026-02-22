import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/contact');

    // Fill form
    await page.getByLabel(/Име/).fill('Test User');
    await page.getByLabel(/Email/).fill('test@example.com');
    await page.getByLabel(/Телефон/).fill('0888123456');
    await page.getByLabel(/Съобщение/).fill('Test message from Playwright');

    // Submit
    await page.getByRole('button', { name: /Изпрати/ }).click();

    // Should show success message
    await expect(page.getByText(/Благодарим ви/)).toBeVisible({ timeout: 5000 });
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/contact');

    // Try to submit empty form
    await page.getByRole('button', { name: /Изпрати/ }).click();

    // HTML5 validation should prevent submit
    const nameInput = page.getByLabel(/Име/);
    await expect(nameInput).toBeFocused();
  });

  test('should rate limit after multiple submissions', async ({ page }) => {
    await page.goto('/contact');

    // Submit 6 times to trigger rate limit (limit is 5 per 15min)
    for (let i = 0; i < 6; i++) {
      await page.getByLabel(/Име/).fill(`Test User ${i}`);
      await page.getByLabel(/Email/).fill(`test${i}@example.com`);
      await page.getByLabel(/Съобщение/).fill(`Test message ${i}`);
      await page.getByRole('button', { name: /Изпрати/ }).click();

      if (i < 5) {
        // First 5 should succeed
        await expect(page.getByText(/Благодарим ви/)).toBeVisible({ timeout: 3000 });
        await page.reload();
      }
    }

    // 6th should be rate limited
    await expect(page.getByText(/Твърде много/)).toBeVisible({ timeout: 3000 });
  });
});
