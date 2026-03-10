import { test, expect } from '@playwright/test';

const LANGS = ['en', 'hi', 'gu'] as const;
const NAV_ITEMS = ['about', 'services', 'blog', 'testimonials', 'events', 'contact'];

test.describe('Navigation', () => {
  for (const lang of LANGS) {
    test.describe(`[${lang}]`, () => {
      test('desktop nav links are visible and correct', async ({ page }) => {
        test.skip(page.viewportSize()!.width < 1024, 'Desktop only');
        await page.goto(`/${lang}/`);
        const nav = page.locator('nav[aria-label="Main navigation"]');
        await expect(nav).toBeVisible();
        for (const item of NAV_ITEMS) {
          const link = nav.locator(`a[href="/${lang}/${item}"]`);
          await expect(link).toBeVisible();
        }
      });

      test('nav links navigate to correct pages', async ({ page }) => {
        test.skip(page.viewportSize()!.width < 1024, 'Desktop only');
        await page.goto(`/${lang}/`);
        const nav = page.locator('nav[aria-label="Main navigation"]');
        await nav.locator(`a[href="/${lang}/about"]`).click();
        await expect(page).toHaveURL(`/${lang}/about`);
        await page.locator('nav[aria-label="Main navigation"]').locator(`a[href="/${lang}/services"]`).click();
        await expect(page).toHaveURL(`/${lang}/services`);
      });

      test('logo links to homepage', async ({ page }) => {
        await page.goto(`/${lang}/about`);
        await page.locator(`header a[href="/${lang}/"]`).first().click();
        await expect(page).toHaveURL(`/${lang}/`);
      });

      test('breadcrumbs show on service pages', async ({ page }) => {
        await page.goto(`/${lang}/services/vastu-consultation`);
        const breadcrumbs = page.locator('nav[aria-label="Breadcrumb"]');
        await expect(breadcrumbs).toBeVisible();
      });
    });
  }

  test('root URL redirects to /en/', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/en\//);
  });
});
