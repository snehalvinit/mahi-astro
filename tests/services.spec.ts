import { test, expect } from '@playwright/test';

const LANGS = ['en', 'hi', 'gu'] as const;
const SERVICE_SLUGS = [
  'vedic-astrology-kundli-reading',
  'horoscope-analysis-predictions',
  'marriage-career-finance-health-guidance',
  'vastu-consultation',
  'gemstone-recommendations',
  'karma-life-purpose-counselling',
  'pancha-tatva-balancing',
  'seven-chakras-balancing',
  'vedic-spiritual-poojas',
  'vedic-karma-kand-yagnas',
  'maha-mrityunjaya-mantra-anushthan',
  'mantras-chanting',
];

test.describe('Services', () => {
  test.setTimeout(60000);
  for (const lang of LANGS) {
    test.describe(`[${lang}]`, () => {
      test('services index page lists all 12 services', async ({ page }) => {
        await page.goto(`/${lang}/services`);
        const h1 = page.locator('h1');
        await expect(h1).toBeVisible();
        const serviceLinks = page.locator(`a[href*="/${lang}/services/"]`);
        expect(await serviceLinks.count()).toBeGreaterThanOrEqual(12);
      });

      test('all 12 service pages load successfully', async ({ page }) => {
        for (const slug of SERVICE_SLUGS) {
          const response = await page.goto(`/${lang}/services/${slug}`);
          expect(response?.status()).toBe(200);
          const h1 = page.locator('h1');
          await expect(h1).toBeVisible();
        }
      });

      test('service page has FAQ section with details elements', async ({ page }) => {
        await page.goto(`/${lang}/services/vastu-consultation`);
        const faqDetails = page.locator('details.group');
        expect(await faqDetails.count()).toBeGreaterThanOrEqual(1);
      });

      test('service page has related services links', async ({ page }) => {
        await page.goto(`/${lang}/services/vedic-astrology-kundli-reading`);
        // Related services section links to other service pages
        const relatedLinks = page.locator(`a[href*="/${lang}/services/"]`);
        // Should have at least 1 related service (besides self)
        expect(await relatedLinks.count()).toBeGreaterThanOrEqual(1);
      });

      test('service page has booking CTA', async ({ page }) => {
        await page.goto(`/${lang}/services/gemstone-recommendations`);
        const ctaLink = page.locator('a[href*="wa.me"]');
        await expect(ctaLink.first()).toBeVisible();
      });
    });
  }
});
