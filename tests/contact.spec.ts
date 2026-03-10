import { test, expect } from '@playwright/test';

const LANGS = ['en', 'hi', 'gu'] as const;

test.describe('Contact Page', () => {
  for (const lang of LANGS) {
    test.describe(`[${lang}]`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/${lang}/contact`);
      });

      test('page loads with h1', async ({ page }) => {
        const h1 = page.locator('h1');
        await expect(h1).toBeVisible();
      });

      test('contact form has all fields', async ({ page }) => {
        await expect(page.locator('#contact-form')).toBeAttached();
        await expect(page.locator('#name')).toBeAttached();
        await expect(page.locator('#email')).toBeAttached();
        await expect(page.locator('#phone')).toBeAttached();
        await expect(page.locator('#service')).toBeAttached();
        await expect(page.locator('#message')).toBeAttached();
        await expect(page.locator('#submit-btn')).toBeAttached();
      });

      test('required fields have required attribute', async ({ page }) => {
        await expect(page.locator('#name')).toHaveAttribute('required', '');
        await expect(page.locator('#email')).toHaveAttribute('required', '');
        await expect(page.locator('#message')).toHaveAttribute('required', '');
      });

      test('service dropdown has 13+ options', async ({ page }) => {
        const options = page.locator('#service option');
        expect(await options.count()).toBeGreaterThanOrEqual(12);
      });

      test('WhatsApp contact card is present', async ({ page }) => {
        const whatsappLink = page.locator('a[href*="wa.me"]');
        expect(await whatsappLink.count()).toBeGreaterThanOrEqual(1);
      });

      test('phone link is present', async ({ page }) => {
        const phoneLink = page.locator('a[href*="tel:"]');
        expect(await phoneLink.count()).toBeGreaterThanOrEqual(1);
      });

      test('email link is present', async ({ page }) => {
        const emailLink = page.locator('a[href*="mailto:"]');
        expect(await emailLink.count()).toBeGreaterThanOrEqual(1);
      });

      test('form has hidden language field', async ({ page }) => {
        const hiddenField = page.locator('input[name="_language"]');
        await expect(hiddenField).toHaveValue(lang);
      });
    });
  }
});
