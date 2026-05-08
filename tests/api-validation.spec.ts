import { test, expect } from '@playwright/test';

/**
 * Server-side validation via zod (P3 #11 / P1 #8). The form-level HTML5
 * validation is bypassable, so the API must reject malformed payloads
 * regardless of what the browser sent.
 */
test.describe('API input validation', () => {
  test('inquiry rejects invalid email', async ({ request }) => {
    const res = await request.post('/api/inquiry', {
      data: {
        productId: 1,
        name: 'X',
        email: 'not-an-email',
        message: 'hi',
      },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/email/i);
  });

  test('inquiry rejects missing message', async ({ request }) => {
    const res = await request.post('/api/inquiry', {
      data: {
        productId: 1,
        name: 'X',
        email: 'foo@bar.com',
      },
    });
    expect(res.status()).toBe(400);
  });

  test('inquiry rejects malformed productId', async ({ request }) => {
    const res = await request.post('/api/inquiry', {
      data: {
        productId: 'not-a-number',
        name: 'X',
        email: 'foo@bar.com',
        message: 'hi',
      },
    });
    expect(res.status()).toBe(400);
  });

  test('contact rejects invalid email', async ({ request }) => {
    const res = await request.post('/api/contact', {
      data: {
        name: 'X',
        email: 'whoops',
        message: 'hi',
      },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/email/i);
  });

  test('inquiry rejects invalid hex color', async ({ request }) => {
    const res = await request.post('/api/inquiry', {
      data: {
        productId: 1,
        name: 'X',
        email: 'foo@bar.com',
        message: 'hi',
        selectedColorName: 'Red',
        selectedColorHex: 'red',
      },
    });
    expect(res.status()).toBe(400);
  });
});
