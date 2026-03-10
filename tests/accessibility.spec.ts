import { test, expect } from '@playwright/test';

const LANGS = ['en', 'hi', 'gu'] as const;

test.describe('Accessibility', () => {
  for (const lang of LANGS) {
    test.describe(`[${lang}]`, () => {
      test('homepage has exactly 1 h1', async ({ page }) => {
        await page.goto(`/${lang}/`);
        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBe(1);
      });

      test('service pages have exactly 1 h1', async ({ page }) => {
        await page.goto(`/${lang}/services`);
        expect(await page.locator('h1').count()).toBe(1);
        await page.goto(`/${lang}/services/vastu-consultation`);
        expect(await page.locator('h1').count()).toBe(1);
      });

      test('images have alt text', async ({ page }) => {
        await page.goto(`/${lang}/`);
        const images = page.locator('img');
        const count = await images.count();
        for (let i = 0; i < count; i++) {
          const alt = await images.nth(i).getAttribute('alt');
          expect(alt, `Image ${i} should have alt attribute`).not.toBeNull();
        }
      });

      test('links have accessible text', async ({ page }) => {
        await page.goto(`/${lang}/`);
        const links = page.locator('a:visible');
        const count = await links.count();
        for (let i = 0; i < Math.min(count, 20); i++) {
          const link = links.nth(i);
          const text = await link.textContent();
          const ariaLabel = await link.getAttribute('aria-label');
          const title = await link.getAttribute('title');
          const hasChild = await link.locator('img, svg, span').count();
          const hasAccessibleName = (text && text.trim().length > 0) || ariaLabel || title || hasChild > 0;
          expect(hasAccessibleName, `Link ${i} should have accessible name`).toBeTruthy();
        }
      });

      test('form fields have labels', async ({ page }) => {
        await page.goto(`/${lang}/contact`);
        const formFields = ['name', 'email', 'phone', 'service', 'message'];
        for (const fieldId of formFields) {
          const label = page.locator(`label[for="${fieldId}"]`);
          expect(await label.count(), `Field #${fieldId} should have a label`).toBeGreaterThanOrEqual(1);
        }
      });

      test('main landmark exists', async ({ page }) => {
        await page.goto(`/${lang}/`);
        const main = page.locator('main#main-content');
        await expect(main).toBeAttached();
      });

      test('skip to content link exists', async ({ page }) => {
        await page.goto(`/${lang}/`);
        const skipLink = page.locator('a[href="#main-content"]');
        await expect(skipLink).toBeAttached();
      });

      test('interactive elements are keyboard focusable', async ({ page }) => {
        await page.goto(`/${lang}/`);
        // Tab through elements
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('Tab');
        }
        const tag = await page.evaluate(() => document.activeElement?.tagName);
        expect(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']).toContain(tag);
      });
    });
  }

  test('page has proper ARIA landmarks', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.locator('#site-header')).toBeAttached();
    await expect(page.locator('main#main-content')).toBeAttached();
    await expect(page.locator('footer').first()).toBeAttached();
  });

  test('body text has readable font size', async ({ page }) => {
    await page.goto('/en/');
    const fontSize = await page.evaluate(() => {
      const body = document.querySelector('body');
      return body ? window.getComputedStyle(body).fontSize : '0px';
    });
    const size = parseInt(fontSize);
    expect(size).toBeGreaterThanOrEqual(14);
  });
});
