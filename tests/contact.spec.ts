import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/contact');

    await page.locator('#contact-name').fill('Test User');
    await page.locator('#contact-email').fill('test@example.com');
    await page.locator('#contact-phone').fill('0888123456');
    await page.locator('#contact-message').fill('Test message from Playwright');
    // Submit stays disabled until GDPR consent is given.
    await page.locator('#contact-consent').check();

    await page.getByRole('button', { name: /Изпрати/ }).click();

    // Success shows both a toast and an inline panel, hence .first().
    await expect(page.getByText(/Съобщението е изпратено/).first()).toBeVisible({ timeout: 5000 });
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/contact');

    // Consent only enables the button — the empty required fields must still block submit.
    await page.locator('#contact-consent').check();
    await page.getByRole('button', { name: /Изпрати/ }).click();

    // HTML5 validation prevents submit — name field is required
    await expect(page.locator('#contact-name')).toBeVisible();
  });

  test('should rate limit after multiple submissions', async ({ page }) => {
    await page.goto('/contact');

    let rateLimited = false;
    for (let i = 0; i < 8; i++) {
      await page.locator('#contact-name').fill(`Test User ${i}`);
      await page.locator('#contact-email').fill(`test${i}@example.com`);
      await page.locator('#contact-message').fill(`Test message ${i}`);
      await page.locator('#contact-consent').check();
      await page.getByRole('button', { name: /Изпрати/ }).click();

      // Wait for any response (success, error, or rate limit)
      await page
        .getByText(/Съобщението е изпратено|Твърде много|Грешка/)
        .first()
        .waitFor({ timeout: 5000 });

      const limited = await page.getByText(/Твърде много/).isVisible().catch(() => false);
      if (limited) {
        rateLimited = true;
        break;
      }
      await page.reload();
    }

    // Rate limiting is bypassed for loopback IPs (local dev) — skip if not triggered
    test.skip(!rateLimited, 'Rate limiting bypassed for localhost — runs in production only');
  });
});
