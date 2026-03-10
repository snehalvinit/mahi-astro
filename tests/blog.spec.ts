import { test, expect } from '@playwright/test';

const LANGS = ['en', 'hi', 'gu'] as const;
const BLOG_SLUGS = [
  'balancing-seven-chakras',
  'gemstones-that-can-change-your-destiny',
  'maha-mrityunjaya-mantra-guide',
  'marriage-compatibility-horoscope',
  'power-of-vastu-shastra',
  'understanding-your-kundli',
];

test.describe('Blog', () => {
  for (const lang of LANGS) {
    test.describe(`[${lang}]`, () => {
      test('blog listing page shows all 6 posts', async ({ page }) => {
        await page.goto(`/${lang}/blog`);
        const h1 = page.locator('h1');
        await expect(h1).toBeVisible();
        const blogCards = page.locator('article.blog-card');
        expect(await blogCards.count()).toBe(6);
      });

      test('blog listing has category filter buttons', async ({ page }) => {
        await page.goto(`/${lang}/blog`);
        const filterButtons = page.locator('.category-btn');
        expect(await filterButtons.count()).toBeGreaterThanOrEqual(2);
      });

      test('category filter works', async ({ page }) => {
        await page.goto(`/${lang}/blog`);
        const categoryBtns = page.locator('.category-btn');
        const count = await categoryBtns.count();
        if (count > 1) {
          // Click a non-All category button
          await categoryBtns.nth(1).click();
          await page.waitForTimeout(300);
          // The active button should have the active class
          const activeBtn = page.locator('.category-btn.active');
          expect(await activeBtn.count()).toBe(1);
        }
      });

      test('all 6 blog posts load', async ({ page }) => {
        for (const slug of BLOG_SLUGS) {
          const response = await page.goto(`/${lang}/blog/${slug}`);
          expect(response?.status()).toBe(200);
          const h1 = page.locator('h1');
          await expect(h1).toBeVisible();
        }
      });

      test('blog post has social sharing links', async ({ page }) => {
        await page.goto(`/${lang}/blog/${BLOG_SLUGS[0]}`);
        // Social sharing: WhatsApp, Facebook, Twitter/X
        const shareLinks = page.locator('a[href*="wa.me"], a[href*="facebook.com"], a[href*="twitter.com"], a[href*="x.com"]');
        expect(await shareLinks.count()).toBeGreaterThanOrEqual(2);
      });

      test('blog post has back to blog link', async ({ page }) => {
        await page.goto(`/${lang}/blog/${BLOG_SLUGS[0]}`);
        const backLink = page.locator(`a[href="/${lang}/blog/"]`).last();
        await expect(backLink).toBeAttached();
      });
    });
  }
});
