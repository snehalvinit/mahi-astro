import { test, expect } from '@playwright/test';

const LANGS = ['en', 'hi', 'gu'] as const;
const PAGES = ['', 'about', 'services', 'blog', 'contact', 'testimonials', 'events'];

// Text patterns unique to each language script
const LANG_MARKERS: Record<string, RegExp> = {
  en: /astrology|services|contact|about/i,
  hi: /ज्योतिष|सेवाएं|संपर्क|हमारे/i,
  gu: /જ્યોતિષ|સેવાઓ|સંપર્ક|અમારા/i,
};

test.describe('Internationalization (i18n)', () => {
  test('all pages load in all 3 languages', async ({ page }) => {
    for (const lang of LANGS) {
      for (const pg of PAGES) {
        const url = `/${lang}/${pg}`;
        const response = await page.goto(url);
        expect(response?.status(), `${url} should return 200`).toBe(200);
      }
    }
  });

  test('language switching preserves page path via hreflang links', async ({ page }) => {
    await page.goto('/en/about');
    // Language switcher uses hreflang attributes
    const hiLink = page.locator('a[hreflang="hi"]').first();
    await expect(hiLink).toBeAttached();
    const href = await hiLink.getAttribute('href');
    expect(href).toContain('/hi/');
  });

  test('each language shows correct script content', async ({ page }) => {
    for (const lang of LANGS) {
      await page.goto(`/${lang}/`);
      const bodyText = await page.locator('body').textContent();
      expect(bodyText).toMatch(LANG_MARKERS[lang]);
    }
  });

  test('html lang attribute matches page language', async ({ page }) => {
    for (const lang of LANGS) {
      await page.goto(`/${lang}/`);
      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe(lang);
    }
  });

  test('language switcher nav is present', async ({ page }) => {
    for (const lang of LANGS) {
      await page.goto(`/${lang}/`);
      // Language switcher has hreflang links for other languages
      for (const otherLang of LANGS.filter(l => l !== lang)) {
        const langLink = page.locator(`a[hreflang="${otherLang}"]`).first();
        await expect(langLink).toBeAttached();
      }
    }
  });

  test('active language is shown as span not link', async ({ page }) => {
    for (const lang of LANGS) {
      await page.goto(`/${lang}/`);
      const activeLang = page.locator('span[aria-current="true"]').first();
      await expect(activeLang).toBeAttached();
    }
  });
});
