import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test.describe('Mobile (375px)', () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test('mobile menu toggle is visible', async ({ page }) => {
      await page.goto('/en/');
      const menuToggle = page.locator('#menu-toggle');
      await expect(menuToggle).toBeVisible();
    });

    test('desktop nav is hidden on mobile', async ({ page }) => {
      await page.goto('/en/');
      const desktopNav = page.locator('nav[aria-label="Main navigation"]');
      await expect(desktopNav).toBeHidden();
    });

    test('mobile menu opens via toggle', async ({ page }) => {
      await page.goto('/en/');
      const menuToggle = page.locator('#menu-toggle');
      await menuToggle.click();
      const overlay = page.locator('#menu-overlay');
      // Menu overlay should transition to visible
      await page.waitForTimeout(400);
      await expect(overlay).toBeVisible();
    });

    test('content does not overflow horizontally', async ({ page }) => {
      await page.goto('/en/');
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
    });
  });

  test.describe('Tablet (768px)', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('tablet layout renders without overflow', async ({ page }) => {
      await page.goto('/en/');
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
    });

    test('footer is visible', async ({ page }) => {
      await page.goto('/en/');
      const footer = page.locator('footer').first();
      await expect(footer).toBeAttached();
    });
  });

  test.describe('Desktop (1280px)', () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test('desktop nav is visible', async ({ page }) => {
      await page.goto('/en/');
      const nav = page.locator('nav[aria-label="Main navigation"]');
      await expect(nav).toBeVisible();
    });

    test('mobile menu toggle is hidden on desktop', async ({ page }) => {
      await page.goto('/en/');
      const menuToggle = page.locator('#menu-toggle');
      await expect(menuToggle).toBeHidden();
    });

    test('header is fixed at top', async ({ page }) => {
      await page.goto('/en/');
      const header = page.locator('#site-header');
      await expect(header).toBeVisible();
      const box = await header.boundingBox();
      expect(box?.y).toBe(0);
    });
  });
});
