import { test, expect } from '@playwright/test';

const LANGS = ['en', 'hi', 'gu'] as const;

test.describe('SEO', () => {
  for (const lang of LANGS) {
    test.describe(`[${lang}]`, () => {
      test('homepage has title and meta description', async ({ page }) => {
        await page.goto(`/${lang}/`);
        const title = await page.title();
        expect(title.length).toBeGreaterThan(10);
        const metaDesc = page.locator('meta[name="description"]');
        await expect(metaDesc).toHaveAttribute('content', /.{20,}/);
      });

      test('pages have canonical URL', async ({ page }) => {
        await page.goto(`/${lang}/`);
        const canonical = page.locator('link[rel="canonical"]');
        await expect(canonical).toHaveAttribute('href', /\//);
      });

      test('pages have hreflang tags for all languages', async ({ page }) => {
        await page.goto(`/${lang}/`);
        for (const l of LANGS) {
          const hreflang = page.locator(`link[rel="alternate"][hreflang="${l}"]`);
          await expect(hreflang).toBeAttached();
        }
        // x-default should also be present
        const xDefault = page.locator('link[rel="alternate"][hreflang="x-default"]');
        await expect(xDefault).toBeAttached();
      });

      test('pages have Open Graph meta tags', async ({ page }) => {
        await page.goto(`/${lang}/`);
        await expect(page.locator('meta[property="og:title"]')).toBeAttached();
        await expect(page.locator('meta[property="og:description"]')).toBeAttached();
        await expect(page.locator('meta[property="og:image"]')).toBeAttached();
        await expect(page.locator('meta[property="og:type"]')).toBeAttached();
      });

      test('pages have JSON-LD schema markup', async ({ page }) => {
        await page.goto(`/${lang}/`);
        const jsonLd = page.locator('script[type="application/ld+json"]');
        expect(await jsonLd.count()).toBeGreaterThanOrEqual(1);
        const content = await jsonLd.first().textContent();
        expect(content).toBeTruthy();
        const schema = JSON.parse(content!);
        expect(schema['@context']).toBe('https://schema.org');
      });

      test('service pages have JSON-LD schema', async ({ page }) => {
        await page.goto(`/${lang}/services/vastu-consultation`);
        const jsonLd = page.locator('script[type="application/ld+json"]');
        expect(await jsonLd.count()).toBeGreaterThanOrEqual(1);
      });

      test('OG images reference PNG files', async ({ page }) => {
        await page.goto(`/${lang}/`);
        const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
        expect(ogImage).toMatch(/\.png/);
      });
    });
  }

  test('sitemap-index.xml exists', async ({ page }) => {
    const response = await page.goto('/sitemap-index.xml');
    expect(response?.status()).toBe(200);
  });

  test('robots.txt exists', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
  });
});
