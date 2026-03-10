import { test, expect } from '@playwright/test';

const LANGS = ['en', 'hi', 'gu'] as const;

test.describe('Homepage', () => {
  for (const lang of LANGS) {
    test.describe(`[${lang}]`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/${lang}/`);
      });

      test('hero section renders with h1 and CTA', async ({ page }) => {
        const h1 = page.locator('h1');
        await expect(h1).toBeVisible();
        // Should have WhatsApp CTA link
        const ctaLinks = page.locator('a[href*="wa.me"]');
        await expect(ctaLinks.first()).toBeVisible();
      });

      test('services section displays service cards', async ({ page }) => {
        const servicesSection = page.locator('#services');
        await expect(servicesSection).toBeAttached();
        // Service cards are displayed as Card components with h3 titles
        const serviceCards = servicesSection.locator('h3');
        expect(await serviceCards.count()).toBeGreaterThanOrEqual(6);
      });

      test('testimonials section renders', async ({ page }) => {
        const section = page.locator('[aria-labelledby="testimonials-heading"]');
        await expect(section).toBeAttached();
      });

      test('CTA section has booking links', async ({ page }) => {
        const ctaSection = page.locator('[aria-labelledby="cta-heading"]');
        await expect(ctaSection).toBeAttached();
        const whatsappLinks = page.locator('a[href*="wa.me"]');
        expect(await whatsappLinks.count()).toBeGreaterThanOrEqual(1);
      });

      test('stats bar shows key numbers', async ({ page }) => {
        // Stats bar should be present with experience/client numbers
        const body = await page.locator('body').textContent();
        expect(body).toMatch(/20\+|10,000|10k/i);
      });
    });
  }
});
