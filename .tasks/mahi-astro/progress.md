# mahi-astro — Handover Log

**Project:** /Users/s0m0ohl/pers/mahi_astro
**Created:** 2026-03-09
**Runner:** Claude Code (Opus)

---

## Prerequisites
- Node.js 20+ installed
- npm or bun package manager
- GitHub CLI (`gh`) for repo creation
- Vercel CLI for deployment
- Reference: Nilay website at ~/Documents/pers/Nilay_plastic/nilay_website/

## Project Info
- **Astrologer:** Pandit Shree Mahadev Joshi
- **Brand:** Belive Astrology — "Be Better with Connect to Nature"
- **Email:** mahadevjoshi91@gmail.com
- **Phone/WhatsApp:** +91 8154992727
- **Languages:** English (en), Hindi (hi), Gujarati (gu)
- **Locations:** Ahmedabad (primary), Mumbai (expansion), US (future)

## Task Progress

### Last Completed: V4 (Verify All Content in All Languages) — 2026-03-09
### Next Up: T15 (Implement SEO — Schema Markup, Meta Tags, Sitemap, Hreflang)
### Latest Commit: `verify(content): V4 — all content verified in all languages`

### Phase Summary
| Phase | Tasks | Status |
|-------|-------|--------|
| 1-Research | R1, R2, R3 | DONE (3/3) |
| 2-Foundation | T1, V1 | DONE (2/2) |
| 3-Design | T2, T3, V2 | DONE (3/3) |
| 4-Pages | T4, T5, T6, T7, T8, T9, T9b, T9c, V3 | V3 BLOCKED (9/9 tasks run, 3 fixes needed) |
| 4-Fixes | FX-3a, FX-3b, FX-3c, VFX-3 | ALL DONE (4/4) |
| 5-Content | T10–T14, V4 | ALL DONE (6/6) — V4 PASSED |
| 6-SEO | T15–T17, V5 | NOT STARTED |
| 7+ | T18–T37 | NOT STARTED |

### Build Stats
- **Pages generated:** 82 (across 3 languages)
- **Build time:** ~3.12s
- **Components created:** 16 (6 layout, 6 sections, 4 UI)
- **i18n keys per language:** ~200+
- **Service pages:** 12 × 3 langs = 36
- **Blog posts:** 6 × 3 langs = 18 (all languages complete)

---

## Task History

### Handover Summary — 2026-03-09T02:00Z

**Phases 1–4 complete. Phase 5 (Content Collections) is next.**

| Phase | Tasks Done | Key Output |
|-------|-----------|------------|
| 1-Research | R1, R2, R3 | 3 zen HTML reports, 12 service JSON drafts, image manifest |
| 2-Foundation | T1, V1 | Astro 5.x scaffold, i18n (en/hi/gu), Tailwind v4, 3 translation files |
| 3-Design | T2, T3, V2 | 4 UI components, 6 layout components, full nav/header/footer |
| 4-Pages | T4–T9c, V3, FX-3a/b/c, VFX-3 | 70 pages (12 services × 3 langs, blog, contact, about, events, testimonials, 404, privacy) |

**Build:** 70 pages, ~2.2s, zero errors/warnings.

**Key files:**
- Config: `astro.config.mjs`, `src/data/site-config.ts`, `src/content.config.ts`
- i18n: `src/content/i18n/{en,hi,gu}.json` (~200+ keys each), `src/utils/i18n.ts`
- Services: `src/content/services/en/*.json` (12 files), `src/utils/services.ts`
- Blog: `src/content/blog/en/*.json` (2 files), `src/utils/blog.ts`
- Layout: `src/layouts/BaseLayout.astro`, `src/components/layout/` (6 components)
- Pages: `src/pages/[lang]/` (index, about, contact, testimonials, events, privacy-policy, 404, services/[slug], blog/[slug])

**Placeholders needing real values:**
- Formspree endpoints (contact + subscribe) — `placeholder` IDs
- Google Analytics ID — `GA_MEASUREMENT_ID`
- Astrologer photo — using icon placeholder
- Google Reviews / JustDial URLs — `href="#"`
- Google Maps — city-level embed, needs exact address

**Next task (T10):** Content Collections for services i18n — add `hi/` and `gu/` service JSON files so services render in translated content, not just English fallback.

**Gotchas for next session:**
- Astro glob loader strips directory prefixes from content IDs — services utility uses language fallback (all entries returned when no lang match)
- Blog/service content is HTML strings in JSON, not markdown
- Cookie consent is opt-in (DPDP compliant) — no analytics before accept
- Footer service links now use correct slugs (fixed in FX-3a)
- All pages have 4 hreflang tags including self-reference (fixed in FX-3b)
- Skip-to-content at z-[100] above all overlays (fixed in FX-3c)

---

### R1: Research Astrology Website Design & Best Practices — 2026-03-09T17:00Z
- **Files:** `.tasks/mahi-astro/tasks.md`, `.tasks/mahi-astro/reports/R1-website-research.html`, `.tasks/mahi-astro/progress.md`
- **What was done:** Analyzed Nilay website architecture, researched 10+ competitor astrology sites (incl. sohinisastri.com), documented design patterns/SEO/booking options, created 37-task execution plan across 10 phases, produced zen HTML research report with 30+ citations.
- **Test results:** N/A (research task)
- **Decisions:** Astro 5.x framework; hybrid light/dark theme with Gold #C9A84C / Saffron #FF9933 / Purple #6F4278 / Indigo #2E2B59 / Cream #FFFDF0; Playfair Display + Inter + Noto Sans fonts; WhatsApp-first booking with Cal.com backup; URL-based i18n routing (/en/, /hi/, /gu/) with JSON translations.
- **Gotchas:** R1/R2/R3 are independent and can run in parallel. T1 depends on R1. Nilay website at ~/Documents/pers/Nilay_plastic/nilay_website/ is the i18n blueprint.
- **Status:** DONE

---

### R2: Service Content Research — 2026-03-09T17:01Z
- **Files:** `.tasks/mahi-astro/reports/R2-service-content-research.html`, 12 JSON files in `.tasks/mahi-astro/content-drafts/services/en/` (one per service)
- **What was done:** Researched all 12 services with 35+ citations; wrote descriptions, benefits, process steps, FAQs, multilingual keywords per service; mapped 42 blog topic ideas; created zen HTML report and 12 structured JSON content drafts.
- **Test results:** N/A (research task)
- **Decisions:** Services split into "Core Astrology" (6) and "Spiritual Healing" (6); Kundli Reading is the gateway service; each page gets FAQ schema markup + cross-links; SEO targets Devanagari + Romanized Hindi/Gujarati + location terms.
- **Gotchas:** JSON drafts are English-only — T11/T12 handle translations. Each JSON follows schema: id, title, slug, category, description, benefits, process, faqs, keywords, relatedServices, blogTopics. 42 blog topics feed into T13.
- **Status:** DONE

---

### R3: Research Hero Images & Visual Assets Strategy — 2026-03-09T18:00Z
- **Files:** `.tasks/mahi-astro/reports/R3-visual-assets.html`, `.tasks/mahi-astro/results/R3-image-manifest.json`
- **What was done:** Researched free image sources (Unsplash, Pexels, Pixabay) for all page hero images; defined image requirements per page with exact dimensions; documented icon set requirements (12 zodiac, 12 service, 7 chakra, 21 UI, 5 decorative); researched Astro Image/Picture component optimization pipeline; created 43-citation zen HTML report and machine-readable image manifest JSON.
- **Test results:** N/A (research task)
- **Decisions:** Free sources cover 100% of needs ($0 budget); Unsplash/Pexels for raster heroes; SVG Repo/Hexmos for zodiac icons; Lucide for UI icons + custom SVGs for spiritual icons; Astro `<Picture />` with AVIF/WebP formats and layout="responsive"; source images in src/assets/ (optimized) and SVGs in public/images/icons/ (as-is); astrologer photo placeholder until client provides real photo.
- **Gotchas:** Astrologer's personal photos must be client-provided. Source images must be imported (not URL strings) for Astro optimization. Hero images need `loading="eager"` + `fetchpriority="high"`. SVGs use `currentColor` for CSS theming.
- **Status:** DONE

---

### T1: Scaffold Astro Project with i18n, Tailwind, Base Config — 2026-03-09T17:20Z
- **Files:** `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/utils/i18n.ts`, `src/data/site-config.ts`, `src/content.config.ts`, `src/content/i18n/{en,hi,gu}.json`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/pages/index.astro`, `src/pages/[lang]/index.astro`
- **What was done:** Scaffolded Astro 5.x project from minimal template. Installed @astrojs/react, @astrojs/sitemap, @tailwindcss/vite, tailwindcss, react, react-dom, sharp, playwright. Configured astro.config.mjs with sitemap i18n (en-IN, hi-IN, gu-IN) and Tailwind v4 via Vite plugin. Created full directory structure (components/layout|sections|ui, content/i18n|services|blog per lang, data, layouts, pages/[lang], schemas, styles, utils, public/images). Built i18n utility with getTranslations(), isValidLanguage(), getAlternateLanguages(). Created site-config.ts with astrologer info, contact, colors, fonts. Created 3 complete translation files (en/hi/gu) with header, hero, services, about, testimonials, cta, footer, meta, shared, notFound sections. Created BaseLayout with hreflang tags, Google Fonts, skip-to-content link. Created root redirect to /en/ and [lang]/index.astro with hero section and services teaser.
- **Test results:** `npm run build` succeeds (4 pages in 1.78s). `npm run dev` starts cleanly. All 3 language routes (/en/, /hi/, /gu/) generate. Tailwind CSS compiles with all custom theme colors (gold, saffron, purple, indigo, cream, maroon). Sitemap generated.
- **Decisions:** Followed Nilay website i18n pattern exactly (eager JSON imports, URL-based routing, getStaticPaths per locale). Used Tailwind v4 @theme directive for custom colors/fonts. Content collections with glob loaders and Zod schemas for services and blog. Site URL placeholder: believeastrology.com.
- **Gotchas:** Content collections for services/blog show warnings (no JSON files yet — populated in T10+). React integration installed for future interactive components (booking form, language switcher). `sharp` installed for image optimization (T18/T19).
- **Status:** DONE

---

### V1: Gate — Verify Project Foundation — 2026-03-09T17:23Z
- **Files:** No files modified (verification only)
- **What was done:** Ran all 6 verification checks against T1 output. `npm run build` succeeds (4 pages, 1.51s). All 3 language routes (/en/, /hi/, /gu/) generate correct static HTML with proper `lang` attributes and translated titles/meta. Tailwind CSS compiles with all 6 custom theme colors (gold, saffron, purple, indigo, cream, maroon). i18n functions work correctly — `getTranslations()` returns per-language content, hreflang tags present, Hindi/Gujarati in correct scripts. TypeScript compiles with zero errors. Directory structure matches spec.
- **Test results:** All 6 checks PASS. No issues found.
- **Decisions:** No FX/VFX tasks needed — foundation is solid.
- **Gotchas:** Content collection warnings for empty blog/services dirs are expected (populated in T10+). Build output is 11.9KB CSS + 194KB JS (React runtime).
- **Status:** DONE

---

### T2: Global Styles, Color System, Typography, Layouts — 2026-03-09T17:27Z
- **Files:** `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/ui/Button.astro`, `src/components/ui/Card.astro`, `src/components/ui/SectionHeading.astro`, `src/components/ui/Badge.astro`, `src/pages/[lang]/index.astro`
- **What was done:** Enhanced global.css with full design system: extended color palette (added saffron-light/dark, indigo-dark, cream-dark, maroon-light), CSS custom properties for spacing/radius/shadows, base typography with responsive heading sizes, dark hero section styles (`.hero-dark`), multilingual font switching (html[lang='hi']/[lang='gu'] selectors for Devanagari/Gujarati fonts), decorative mandala accent gradients, container utilities, focus/selection styles. Updated BaseLayout to use CSS base styles instead of inline Tailwind classes. Created 4 UI components: Button (primary/secondary/outline variants, sm/md/lg sizes, a/button tag switching), Card (service/testimonial/blog variants with icon/image slots), SectionHeading (title + subtitle + mandala accent, left/center alignment, dark mode), Badge (gold/saffron/purple/outline variants). Updated homepage to use all new components for validation.
- **Test results:** `npm run build` succeeds (4 pages, 1.46s). All 3 languages render correctly with proper fonts and translated content. All component classes compile into CSS output.
- **Decisions:** Used CSS-level font switching via `html[lang]` selectors rather than per-component logic — simpler, automatic. Shadow/radius values use CSS custom properties in @theme for Tailwind integration. Card component uses named slots (icon, image) for flexible content injection. Button component auto-switches between `<a>` and `<button>` based on `href` prop.
- **Gotchas:** Body base styles (font, color, bg) now in CSS rather than Tailwind classes — cleaner for multilingual font switching. The `hero-dark` class automatically recolors headings to gold and text to cream. T3 should use these components for header/footer/nav.
- **Status:** DONE

---

### T3: Build Header, Footer, Navigation, Language Switcher, WhatsApp Button — 2026-03-09T17:34Z
- **Files:** `src/components/layout/SiteHeader.astro`, `src/components/layout/MenuOverlay.astro`, `src/components/layout/SiteFooter.astro`, `src/components/layout/LanguageSwitcher.astro`, `src/components/layout/WhatsAppButton.astro`, `src/components/layout/BottomBar.astro`, `src/content/i18n/en.json`, `src/content/i18n/hi.json`, `src/content/i18n/gu.json`, `src/pages/[lang]/index.astro`
- **What was done:** Created 6 layout components following Nilay website i18n patterns. SiteHeader: fixed/sticky with shadow-on-scroll, Om icon logo, 6-item desktop nav with gold underline hover, language switcher, Book Consultation CTA, mobile hamburger toggle. MenuOverlay: full-screen slide-in mobile menu with nav links, CTA button, contact info (email + phone). SiteFooter: 4-column grid (brand, quick links, services, contact), social media icons (WhatsApp always shown, Instagram/Facebook/YouTube conditional on siteConfig), copyright + "made with faith" tagline. LanguageSwitcher: EN|हिं|ગુજ with active gold highlight, URL-prefix swapping. WhatsAppButton: floating green button bottom-right with WhatsApp SVG icon, prefilled message per language. BottomBar: fixed mobile bar (hidden md+) with Call/WhatsApp/Book Now grid. Updated all 3 translation files with menuOpen/menuClose, ourServices, address, madeWith, bottomBar, whatsapp sections. Integrated all components into index page via named slots.
- **Test results:** `npm run build` succeeds (4 pages, 1.58s). All 3 languages render with correct header nav items, footer columns, WhatsApp links with prefilled messages, and language switcher URLs. Verified: site-header ID, menu-overlay ID, menu-toggle button, WhatsApp URL with encoded prefill, Hindi/Gujarati translated strings all present in build output.
- **Decisions:** Used named slots (header/footer) in BaseLayout for clean composition. Language switcher shows short labels (EN/हिं/ગુજ) not full names. WhatsApp button offset on mobile (mb-16) to avoid BottomBar overlap. Footer social links conditionally render based on siteConfig values (empty = hidden). Services dropdown deferred to later task — current nav uses flat link to /services.
- **Gotchas:** Google Map embed placeholder and JustDial/Google Reviews badges deferred — footer has address text + contact links for now. Services dropdown (hover submenu) can be added in T10 when service pages exist. BottomBar has z-50 (above WhatsApp z-40) to ensure tap targets don't overlap. Mobile menu uses translate-x-full/translate-x-0 for smooth slide animation with body overflow lock.
- **Status:** DONE

---

### V2: Gate — Verify Design System & Navigation — 2026-03-10T00:39Z
- **Files:** No files modified (verification only)
- **What was done:** Ran all 6 verification checks against T2+T3 output. `npm run build` succeeds (4 pages, 1.62s). All 3 language routes (/en/, /hi/, /gu/) render with correct translations, proper `lang` attributes, and Devanagari/Gujarati scripts. Navigation includes 6-item desktop nav, mobile hamburger with slide-in overlay, and mobile bottom bar. Language switcher correctly swaps URL prefixes preserving page paths. WhatsApp deep links (wa.me/918154992727) present on all pages with per-language prefilled messages. Color system uses CSS custom properties consistently across all components (gold, saffron, purple, indigo, cream, maroon). Google Fonts loads all 4 font families; CSS switches body/heading fonts via `html[lang]` selectors.
- **Test results:** All 6 checks PASS. No issues found.
- **Decisions:** No FX/VFX tasks needed — design system and navigation are solid.
- **Gotchas:** Content collection warnings for empty blog/services dirs are expected (populated in T10+). Footer service links are hardcoded English text — will be translated when service content collections exist. Build output: 194KB JS (React runtime).
- **Status:** DONE

---

### T4: Build Homepage — Hero, Services Grid, Testimonials, CTA, Booking — 2026-03-09T17:45Z
- **Files:** `src/components/sections/HeroSection.astro`, `src/components/sections/StatsBar.astro`, `src/components/sections/ServicesGrid.astro`, `src/components/sections/TestimonialsSection.astro`, `src/components/sections/CTASection.astro`, `src/pages/[lang]/index.astro`, `src/content/i18n/en.json`, `src/content/i18n/hi.json`, `src/content/i18n/gu.json`
- **What was done:** Created 5 section components and assembled the full homepage. HeroSection: dark celestial gradient background with star pattern, headline, credentials, tagline blockquote, dual CTAs (WhatsApp + Explore Services), phone/email quick contact, astrologer photo placeholder circle. StatsBar: 4-stat grid (20+ years, 10,000+ clients, 99% satisfaction, 3 countries) with gold numbers on cream background. ServicesGrid: all 12 services in responsive 1/2/3/4-column grid using Card component with emoji icons, hover effects, and View All CTA. TestimonialsSection: 6 client reviews with avatar initials, star ratings, italic quotes; horizontal scroll on mobile, 3-column grid on desktop. CTASection: dark indigo/purple gradient with WhatsApp icon button + Call Now. Updated all 3 translation files (en/hi/gu) with: hero.headline, hero.credentials, hero.callNow, full stats section, all 12 service names+descriptions, 6 testimonial reviews with names/locations/text. Refactored index.astro to compose sections cleanly.
- **Test results:** `npm run build` succeeds (4 pages, 1.64s). All 3 language routes render with correct translations — verified Hindi headline, Gujarati headline, English services/testimonials/CTA all present in HTML output. WhatsApp links with encoded prefill messages on all pages.
- **Decisions:** Used emoji icons for services (crystal ball for Kundli, dharma wheel for Karma, etc.) — will be replaced with proper SVG icons in T18/T19 when visual assets are implemented. Testimonials use horizontal scroll on mobile (touch-friendly) and 3-col grid on desktop. Stats bar uses gold/5 background for subtle distinction. Hero uses CSS star pattern (radial gradients) instead of image for zero-dependency celestial effect.
- **Gotchas:** Astrologer photo placeholder in hero is a circle with person icon — client must provide real photo. Service cards link to /{lang}/services (plural) — individual service pages created in T6. Testimonials are placeholder content — real reviews should be added when available. Blog posts section mentioned in task spec deferred (no blog content yet — T13/T14). Footer service links still use hardcoded English text — updated when service content collections exist (T10+).
- **Status:** DONE

---

### T5: Build About Page — Astrologer Bio, Credentials, Experience — 2026-03-09T17:53Z
- **Files:** `src/pages/[lang]/about.astro`, `src/content/i18n/en.json`, `src/content/i18n/hi.json`, `src/content/i18n/gu.json`
- **What was done:** Created full about page with 6 sections: hero banner (dark celestial gradient with title + tagline), bio section (photo placeholder + 3 paragraphs of biography in 5-col grid), credentials section (7 expertise areas in checkmark grid), experience timeline (4 milestones with alternating layout on desktop, left-aligned on mobile), philosophy section (dark background with blockquote), consultation modes (3-card grid: in-person/Zoom/WhatsApp), and CTA section. Expanded about section in all 3 translation files with heroTagline, bio (3 paragraphs), credentials array, timeline array (4 items with period/title/description), philosophy quote, consultationModes array, and CTA text.
- **Test results:** `npm run build` succeeds (7 pages, 1.64s). All 3 languages (/en/about, /hi/about, /gu/about) render with correct translated content — verified Hindi (भक्ति और ज्ञान की यात्रा, दर्शन), Gujarati (ભક્તિ અને જ્ઞાનની યાત્રા, દર્શન), and English section headings present.
- **Decisions:** Built all sections inline in about.astro rather than creating separate section components — page-specific content doesn't warrant reusable components. Used SectionHeading and Button from existing UI kit. Timeline uses CSS-based alternating layout (even/odd flex-row-reverse) with gold dot markers.
- **Gotchas:** Astrologer photo placeholder is rectangular (rounded corners) rather than circular — client must provide professional photo. Timeline line is hidden on mobile, uses left-aligned dots instead. Bio content is placeholder based on project brief — may need client review. Same layout/footer/header pattern as homepage.
- **Status:** DONE

---

### T6: Build Individual Service Landing Pages (12 Services) — 2026-03-10T01:03Z
- **Files:** `src/schemas/service-content.schema.ts`, `src/utils/services.ts`, `src/pages/[lang]/services/index.astro`, `src/pages/[lang]/services/[slug].astro`, `src/content.config.ts`, 12 JSON files in `src/content/services/en/`
- **What was done:** Created service content Zod schema with full fields (id, title, subtitle, slug, category, description, shortDescription, introduction, overview, heroImage, benefits, process, faqs, keywords, relatedServices, seo). Created services utility with language fallback (returns all services when lang-specific content doesn't exist). Built services listing page with two sections: Core Astrology (6 services) and Spiritual Healing (6 services), each with Card components and Learn More links. Built dynamic service detail page with: hero banner + breadcrumbs, introduction/overview text, benefits grid with checkmarks, numbered process walkthrough, FAQ accordion using native `<details>`/`<summary>`, related services grid, and CTA with WhatsApp + Call buttons. Created 12 English service JSON files adapted from R2 content research drafts. Updated content.config.ts to use the new schema. Generated 36 service pages (12 slugs × 3 languages) plus 3 listing pages.
- **Test results:** `npm run build` succeeds (46 pages, 2.32s). All 12 services × 3 languages generate. Verified: breadcrumbs, benefits, process steps, FAQ accordion, related services links, WhatsApp deep links all present in HTML output.
- **Decisions:** Used native `<details>` element for FAQ accordion (zero JS, accessible by default). Built service pages inline in [slug].astro rather than a separate ServiceLayout — simpler for a single-use template. Glob loader strips `en/` prefix from content IDs, so services utility falls back to all entries when no lang-prefixed entries exist. Service icons map shared between listing and detail pages.
- **Gotchas:** Astro glob loader does NOT include directory prefixes in content IDs when files are in a single subdirectory (e.g., `en/slug.json` → ID is just `slug`). When translated content is added in T11/T12, the services utility may need updating if glob loader creates `hi/slug` IDs. Footer service links are still hardcoded English text. Blog section not yet linked from service pages (T7). Hero images are emoji placeholders — real images in T18/T19.
- **Status:** DONE

---

### T7: Build Blog System — Listing Page and Post Template — 2026-03-09
- **Files:** `src/schemas/blog-content.schema.ts`, `src/utils/blog.ts`, `src/pages/[lang]/blog/index.astro`, `src/pages/[lang]/blog/[slug].astro`, `src/content.config.ts`, `src/content/blog/en/understanding-your-kundli.json`, `src/content/blog/en/vastu-tips-for-home.json`, `src/content/i18n/{en,hi,gu}.json`
- **What was done:** Created blog content Zod schema with fields (slug, title, excerpt, content, author, publishDate, category, tags, heroImage, readingTime, relatedServices, seo). Updated content.config.ts to use new schema. Created blog utility with language fallback, date sorting, category extraction, and locale-aware date formatting. Built blog listing page with: hero banner + breadcrumbs, JS-based category filter (pill buttons), responsive 1/2/3-column post grid with Card components showing category badge, reading time, excerpt, formatted date, and Read More links. Built blog post detail page with: hero banner + breadcrumbs, full HTML content rendering with prose-style typography (styled via Tailwind arbitrary variants), tags display, social sharing (WhatsApp, Facebook, X/Twitter), consultation CTA, related services grid, related posts section, and back-to-blog link. Created 2 placeholder English blog posts (Kundli guide + Vastu tips). Added full blog translation section to all 3 language files (en/hi/gu) with 17 keys each.
- **Test results:** `npm run build` succeeds (55 pages, 2.05s). 2 blog posts × 3 languages = 6 post pages + 3 listing pages = 9 new pages. All languages render with correct translated titles. Category filter, social sharing links, and WhatsApp deep links verified in build output.
- **Decisions:** Used JS-based client-side category filter instead of generating separate pages per category — simpler with only 2 posts. Blog content stored as HTML strings in JSON (not markdown files) to match the existing service content pattern. Prose styling uses Tailwind arbitrary variant selectors (`[&_h2]:...`) for zero-dependency content formatting. Social sharing uses direct URL-based sharing (no JS SDK dependencies).
- **Gotchas:** Blog posts are English-only — hi/gu fall back to English content. When translated blog content is added, blog utility may need updating similar to services utility. Hero images are empty strings (placeholder gradients shown) — real images in T18/T19. Related posts section only shows posts in same category; with only 2 posts in different categories, it will be empty for each. Pagination not needed yet (only 2 posts) — can be added when content grows.
- **Status:** DONE

---

### T8: Build Contact Page with Form, Map, WhatsApp Integration — 2026-03-09
- **Files:** `src/pages/[lang]/contact.astro`, `src/components/sections/ContactForm.astro`, `src/content/i18n/{en,hi,gu}.json`
- **What was done:** Created full contact page with 5 sections: hero banner (dark celestial gradient), direct contact cards (email/phone/WhatsApp as clickable cards), contact form (name/email/phone/service dropdown/message with Formspree integration and client-side JS submit handler), location & office hours (hours + address + Google Maps embed for Ahmedabad), and CTA section. Created reusable ContactForm.astro component with styled inputs, select dropdown with custom arrow, success/error status messages, and async form submission. Added full contact translation section to all 3 i18n files (en/hi/gu) with 30+ keys each including form labels, placeholders, service options (13 items), office hours, and location info.
- **Test results:** `npm run build` succeeds (58 pages, 2.17s). 3 new contact pages (/en/contact, /hi/contact, /gu/contact). All 3 languages render with correct translated content — verified Hindi (संपर्क करें), Gujarati (સંપર્ક કરો), English headings. WhatsApp deep links (wa.me/918154992727), click-to-call (tel:+91 8154992727), Google Maps embed, and Formspree form action all verified in build output.
- **Decisions:** Used Formspree (placeholder endpoint) for serverless form handling — zero backend needed. Form submission via client-side JS with fetch API for async UX (no page reload). Used native HTML select for service dropdown instead of custom component — simpler, accessible. Contact cards are full anchor elements for better tap targets on mobile. Google Maps uses Ahmedabad city-level embed — exact office address can be updated when client provides it.
- **Gotchas:** Formspree endpoint is a placeholder (`formspree.io/f/placeholder`) — must be replaced with real form ID when Formspree account is created. Google Maps embed shows Ahmedabad city overview — needs exact address coordinates when available. Form submit button text restore after submission relies on data attributes set in script. Office hours are placeholder values — client should confirm actual hours.
- **Status:** DONE

---

### T9: Build Testimonials Page — 2026-03-09
- **Files:** `src/pages/[lang]/testimonials.astro`, `src/data/testimonials.json`, `src/content/i18n/{en,hi,gu}.json`
- **What was done:** Created full testimonials page with 6 sections: hero banner with breadcrumbs, featured reviews (4 highlighted in 2-column grid with large quote marks), all reviews grid (10 testimonials in responsive 1/2/3-column grid using Card component), video testimonials placeholder (3 dashed video slots), Google Reviews / JustDial badge area (2-card grid with star ratings and CTA buttons), "Share Your Experience" CTA, and consultation booking CTA. Created `src/data/testimonials.json` with 10 placeholder testimonials including per-language text (en/hi/gu), service mapping, location, and featured flag. Added `testimonialsPage` translation section to all 3 i18n files with 19 keys each. Each testimonial card shows avatar initials, star ratings, review text, location, and service used with emoji icon.
- **Test results:** `npm run build` succeeds (61 pages, 2.16s). 3 new testimonials pages (/en/testimonials, /hi/testimonials, /gu/testimonials). All 3 languages verified with correct translated headings and review text.
- **Decisions:** Used separate `src/data/testimonials.json` with inline multilingual text (textHi, textGu) rather than i18n file arrays — cleaner data management for 10 reviews with per-language text. Featured reviews (4) shown in larger 2-col cards, all 10 in standard 3-col grid. Video testimonials are placeholder containers (dashed borders + play icon) — ready for real video embeds. Google/JustDial badge links are placeholder `#` — update with real business profile URLs.
- **Gotchas:** Google Reviews and JustDial badge links are placeholders (`href="#"`) — must be updated with real profile URLs when available. Video testimonials section shows "coming soon" placeholders. Testimonial data is in `src/data/` (static JSON) rather than content collections — no Zod validation. The homepage TestimonialsSection.astro still uses the i18n reviews array (6 reviews) independently from the new testimonials.json (10 reviews).
- **Status:** DONE

---

### T9b: Build Events/Updates Page with Subscription Mechanism — 2026-03-09
- **Files:** `src/pages/[lang]/events.astro`, `src/data/events.json`, `src/components/sections/EventCard.astro`, `src/components/sections/SubscribeSection.astro`, `src/content/i18n/{en,hi,gu}.json`, `src/components/layout/SiteHeader.astro`, `src/components/layout/MenuOverlay.astro`
- **What was done:** Created full events/updates page with 5 sections: hero banner with breadcrumbs, upcoming events grid (3 events with EventCard component), latest cosmic updates (2 update cards with left saffron border), subscription section (email form via Formspree + WhatsApp broadcast opt-in with prefilled subscribe message), and consultation CTA. Created `src/data/events.json` with 5 placeholder entries (3 upcoming events: Maha Shivratri Pooja, Chaitra Navratri Yagna, Vedic Astrology Workshop; 2 current updates: Saturn Transit, Lunar Eclipse Alert). Created reusable `EventCard.astro` with date/location/category/status display and WhatsApp register CTA. Created reusable `SubscribeSection.astro` with email form + WhatsApp subscribe card, JS async submit handler, success/error states, and compact/default variants. Added `eventsPage` translation section to all 3 i18n files with 30+ keys each including category labels, subscribe form text, and WhatsApp subscribe prefill. Added events link to SiteHeader and MenuOverlay nav.
- **Test results:** `npm run build` succeeds (64 pages, 2.16s). 3 new events pages (/en/events, /hi/events, /gu/events). All 3 languages verified — Hindi (कार्यक्रम और अपडेट), Gujarati (કાર્યક્રમો અને અપડેટ્સ), English content present. WhatsApp links, subscribe form, and event cards all verified in build output.
- **Decisions:** Used `src/data/events.json` with inline multilingual text (titleHi/titleGu, descriptionHi/descriptionGu) — same pattern as testimonials.json. Events split into "event" type (upcoming ceremonies/workshops) and "update" type (planetary transits/eclipse alerts). SubscribeSection accepts all text as props for full i18n support and supports compact variant for homepage embedding. Email subscription uses Formspree (placeholder endpoint). WhatsApp subscribe uses separate prefill message asking to subscribe to daily updates.
- **Gotchas:** Formspree subscribe endpoint is a placeholder (`formspree.io/f/placeholder-subscribe`) — must be replaced with real form ID. Events data is static JSON — no Zod validation. Past events section conditionally renders only when events with `status: "past"` exist (currently none). Nav now has 7 items on desktop — may need dropdown grouping if more pages are added. SubscribeSection can be embedded on homepage by importing and passing eventsPage translation props.
- **Status:** DONE

---

### T9c: Build 404 Page, Privacy Policy Page, Cookie Consent Banner — 2026-03-09
- **Files:** `src/pages/[lang]/404.astro`, `src/pages/[lang]/privacy-policy.astro`, `src/components/layout/CookieConsent.astro`, `src/layouts/BaseLayout.astro`, `src/components/layout/SiteFooter.astro`, `src/content/i18n/{en,hi,gu}.json`
- **What was done:** Created themed 404 page with celestial/cosmic design ("Lost in the Stars?" / "तारों में खो गए?" / "તારાઓમાં ખોવાઈ ગયા?"), large 404 number, star background, action buttons (Home/Services/Contact), and popular page pill links. Created comprehensive privacy policy page (DPDP Act 2023 compliant) with 10 sections: introduction, data collected, purpose, cookies & tracking, DPDP rights (highlighted card), data retention, third-party services, children's data, contact for data requests, and policy changes. Created cookie consent banner component with opt-in model — no analytics cookies before consent, Accept/Decline buttons, localStorage persistence, and conditional Google Analytics loading. Integrated CookieConsent into BaseLayout (appears on all pages). Added privacy policy link to SiteFooter bottom bar. Expanded `notFound` i18n section in all 3 languages (title, subtitle, message, explore, contact, searchHint). Added `privacyPolicy` section to all 3 i18n files with 25+ keys each covering all DPDP-required disclosures. Added `cookieConsent` section to all 3 i18n files.
- **Test results:** `npm run build` succeeds (70 pages, 2.18s). 6 new pages (3 × 404, 3 × privacy-policy). Cookie consent banner verified in all page outputs. Privacy policy link in all footers. DPDP content verified in en/hi/gu.
- **Decisions:** Opt-in cookie model (DPDP compliant) — no analytics loaded until user explicitly accepts. Cookie consent uses localStorage key `ba-cookie-consent` with `accepted`/`declined` values. Banner slides up from bottom after 1s delay for smoother UX. Google Analytics uses placeholder `GA_MEASUREMENT_ID` — skips loading if placeholder present. Privacy policy DPDP rights section uses highlighted card (cream background with gold border) for emphasis. 404 page uses same celestial star pattern as homepage hero for visual consistency.
- **Gotchas:** Google Analytics ID is a placeholder (`GA_MEASUREMENT_ID`) — must be replaced with real ID in T16 (SEO task). Cookie consent banner has z-index 60 (above WhatsApp z-40 and BottomBar z-50). 404 page is statically generated at `/{lang}/404/` — Astro/hosting needs config for actual 404 routing. Privacy policy references Formspree as third-party service — endpoint is still placeholder. V3 verification gate can now proceed with all Phase 4 pages complete.
- **Status:** DONE

---

### V3: Gate — Verify All Pages Render Correctly — 2026-03-09
- **Files:** `.tasks/mahi-astro/tasks.md` (updated V3 checklist, added FX-3a/b/c + VFX-3 in Appendix)
- **What was done:** Ran full verification of all 70 pages across 3 languages. Build succeeds (2.35s, zero errors/warnings). All pages render with correct `lang` attributes and translated content (Devanagari for Hindi, Gujarati script for Gujarati). Navigation links use correct language prefixes. Language switcher preserves page paths. WhatsApp CTAs correct on all pages. Semantic HTML landmarks present (`<header>`, `<main>`, `<nav>`, `<footer>`). Zero images without alt text. Found 3 issues requiring fixes.
- **Issues Found:**
  1. **FX-3a (HIGH):** Footer hardcodes wrong service slugs — `kundli-reading` (should be `vedic-astrology-kundli-reading`) and `horoscope-analysis` (should be `horoscope-analysis-predictions`) in `SiteFooter.astro` lines 22-23.
  2. **FX-3b (MEDIUM):** Missing self-referencing hreflang tag — `getAlternateLanguages()` in `i18n.ts` filters out current lang, so EN pages lack `hreflang="en"` self-reference.
  3. **FX-3c (LOW):** Skip-to-content accessibility link missing from `BaseLayout.astro`.
- **Decisions:** Created 3 targeted fix tasks (FX-3a/b/c) + 1 re-verification task (VFX-3) in tasks.md Appendix. Responsive testing (375px/768px/1440px) deferred as it requires browser — noted in checklist.
- **Gotchas:** FX-3a is a quick 2-line fix. FX-3b is a 1-line addition to BaseLayout. FX-3c is a 1-line addition. All fixes are minimal and low-risk. VFX-3 should re-run the V3 checks that were affected.
- **Status:** BLOCKED on FX-3a, FX-3b, FX-3c

---

### FX-3a: Fix Broken Footer Service Slugs — 2026-03-09
- **Files:** `src/components/layout/SiteFooter.astro`
- **What was done:** Changed 2 hardcoded footer service slugs: `kundli-reading` -> `vedic-astrology-kundli-reading`, `horoscope-analysis` -> `horoscope-analysis-predictions`.
- **Test results:** `npm run build` succeeds (70 pages, 2.56s). Old broken slugs no longer appear in build output. Correct slugs confirmed in all 3 languages.
- **Decisions:** Minimal 2-line fix as specified.
- **Gotchas:** None. Straightforward slug correction.
- **Status:** DONE

---

### FX-3b: Fix Missing Self-Referencing Hreflang Tag — 2026-03-09
- **Files:** `src/layouts/BaseLayout.astro`
- **What was done:** Added self-referencing hreflang `<link>` tag before the alternates loop in BaseLayout. Each page now has 4 hreflang tags: self (current lang), 2 alternates, and x-default.
- **Test results:** `npm run build` succeeds (70 pages). Verified `/en/about` has `hreflang="en"` pointing to canonical URL. Verified `/hi/` has `hreflang="hi"` self-reference. All pages now have 4 hreflang tags.
- **Decisions:** Minimal 1-line addition as specified. Self-referencing hreflang uses `canonicalUrl.href` to match the canonical link exactly.
- **Gotchas:** FX-3c (skip-to-content) appears to already be present in BaseLayout (lines 56-58) — may have been added in a previous task but not tracked.
- **Status:** DONE

---

### FX-3c: Add Skip-to-Content Accessibility Link — 2026-03-09
- **Files:** `src/layouts/BaseLayout.astro`
- **What was done:** Skip-to-content link was already present from T1 but with z-50. Updated to z-[100] per task spec (above all other z-indexed elements: BottomBar z-50, CookieConsent z-60) and matched text to "Skip to content". Link targets `#main-content` on `<main>` element.
- **Test results:** `npm run build` succeeds (70 pages, 2.26s). Skip-to-content link verified in HTML output. `#main-content` target confirmed.
- **Decisions:** Updated z-index from z-50 to z-[100] to ensure skip link is always on top when focused.
- **Gotchas:** None. All FX-3 fixes complete. VFX-3 verification gate is next.
- **Status:** DONE

---

### VFX-3: Verify FX-3a, FX-3b, FX-3c Fixes — 2026-03-09
- **Files:** No files modified (verification only)
- **What was done:** Re-ran all V3-affected checks against FX-3a/b/c fixes. Footer service links use correct slugs (`vedic-astrology-kundli-reading`, `horoscope-analysis-predictions`) in all 3 languages — no old broken slugs remain. All pages have exactly 4 `rel="alternate" hreflang` tags: self-reference, 2 alternates, and x-default. Skip-to-content link present with `z-[100]`, targets `#main-content`. Build succeeds (70 pages, 2.27s, zero errors/warnings).
- **Test results:** All 4 checks PASS. No issues found.
- **Decisions:** No FX-3d+ tasks needed — all fixes verified clean.
- **Gotchas:** None. Phase 4 (Pages) is now fully complete. Phase 5 (Content) is next.
- **Status:** DONE

---

### Handover Summary — 2026-03-09T03:30Z (Phase 5 Content: T10–T11)

**English service content written and Hindi translations complete. Gujarati (T12) is next.**

| Task | Key Output |
|------|------------|
| T10 | Enhanced 12 English service JSONs: 300-500 word intros, 112 FAQs, 96 benefits, SEO keywords with Ahmedabad location terms |
| T11 | Created `src/content/services/hi/` with 12 Hindi service JSONs: natural Devanagari with Vedic terminology, 250/250 i18n key parity |

**Build:** 70 pages, ~2.6s, zero errors/warnings.

**Key files changed:**
- `src/content/services/en/*.json` (12 files enhanced)
- `src/content/services/hi/*.json` (12 files created)

**Decisions:**
- Kept `introduction` and `overview` as separate fields (both rendered on service detail page in different sections)
- Hindi uses natural Vedic terms (कुंडली, राशिफल, दशा, गोचर) not transliterations
- System identifiers (id, slug, category, relatedServices) kept as English for URL routing
- No code changes needed — services utility already supported language-prefixed content

**Next up:** T12 (Gujarati translations) — same pattern, create `src/content/services/gu/` with 12 files

**Gotchas for next task:**
- GU service pages currently fall back to English content since `gu/` files don't exist yet
- Services utility `getServicesForLanguage()` already handles `gu/` prefix filtering
- Blog posts (T13/T14) are still English-only across all languages
- `introduction` and `overview` fields have intentional content overlap

---

### T10: Write English Content for All 12 Service Pages — 2026-03-09
- **Files:** All 12 files in `src/content/services/en/` (vedic-astrology-kundli-reading, horoscope-analysis-predictions, marriage-career-finance-health-guidance, vastu-consultation, gemstone-recommendations, karma-life-purpose-counselling, pancha-tatva-balancing, seven-chakras-balancing, vedic-spiritual-poojas, vedic-karma-kand-yagnas, maha-mrityunjaya-mantra-anushthan, mantras-chanting)
- **What was done:** Enhanced all 12 English service JSON files with comprehensive content. Expanded introductions from ~50-70 words to 300-500 words with rich Vedic context, terminology, and authoritative detail. Expanded FAQs from 2-4 per service to 8-10 each (total: 112 FAQs across 12 services). Added 1-2 benefits per service bringing all to 8 items. Enhanced SEO meta descriptions and keywords with Ahmedabad location terms. Added richer keywords arrays. All content is professional, culturally appropriate, and SEO-optimized with naturally integrated keywords.
- **Test results:** `npm run build` succeeds (70 pages, 2.62s, zero errors/warnings). All 12 services × 3 languages generate correctly. Zod schema validation passes for all files.
- **Decisions:** Kept existing `overview` field intact (still used by service detail page template) while expanding `introduction` to the full 300-500 word specification. Added location-specific keywords (e.g., "horoscope reading ahmedabad", "pandit for puja ahmedabad") to SEO fields for local search targeting. Maintained consistent content structure across all 12 services.
- **Gotchas:** The `introduction` and `overview` fields now have some content overlap — this is intentional as both are rendered on the service detail page in different sections. Hindi (T11) and Gujarati (T12) translations are next — these files currently only exist in `en/` directory, so hi/gu routes fall back to English content. Blog topics from R2 drafts were not added as the schema doesn't have a `blogTopics` field.
- **Status:** DONE

---

### T11: Translate All Content to Hindi — 2026-03-09
- **Files:** All 12 files in `src/content/services/hi/` (vedic-astrology-kundli-reading, horoscope-analysis-predictions, marriage-career-finance-health-guidance, vastu-consultation, gemstone-recommendations, karma-life-purpose-counselling, pancha-tatva-balancing, seven-chakras-balancing, vedic-spiritual-poojas, vedic-karma-kand-yagnas, maha-mrityunjaya-mantra-anushthan, mantras-chanting)
- **What was done:** Translated all 12 English service JSON files to Hindi. Each file contains natural Hindi in Devanagari script with proper Vedic/Hindu terminology (कुंडली, राशिफल, दशा, गोचर, मुहूर्त, नवरत्न, षड्बल, etc.). All user-facing fields translated: title, subtitle, description, shortDescription, introduction, overview, benefits, process steps, FAQs, keywords, and SEO metadata. System identifiers (id, slug, category, relatedServices) kept as English for URL routing. i18n/hi.json already had all 250 keys matching en.json from prior tasks. Total: 112 Hindi FAQs, 96 Hindi benefits, 60 Hindi process steps across 12 services.
- **Test results:** `npm run build` succeeds (70 pages, 2.57s, zero errors/warnings). Hindi service pages now render with Hindi content (not English fallback). EN and GU pages unaffected. Zod schema validation passes for all Hindi files. i18n key parity confirmed (250/250).
- **Decisions:** Services utility `getServicesForLanguage()` already supported `hi/` prefix filtering — no code changes needed. Hindi translations use appropriate Vedic terminology that Hindi speakers would naturally use (e.g., "कुंडली पठन" not "जन्मपत्रिका पढ़ना"). SEO keywords include Hindi-language search terms with Ahmedabad location targeting.
- **Gotchas:** Gujarati (T12) is next — same pattern, create `src/content/services/gu/` directory with 12 files. The services utility already handles `gu/` prefix the same way. Blog posts (T13/T14) are still English-only — Hindi/Gujarati blog translations would be a separate future task. GU service pages still fall back to English content since gu/ service files don't exist yet.
- **Status:** DONE

---

### T12: Translate All Content to Gujarati — 2026-03-09
- **Files:** All 12 files in `src/content/services/gu/` (vedic-astrology-kundli-reading, horoscope-analysis-predictions, marriage-career-finance-health-guidance, vastu-consultation, gemstone-recommendations, karma-life-purpose-counselling, pancha-tatva-balancing, seven-chakras-balancing, vedic-spiritual-poojas, vedic-karma-kand-yagnas, maha-mrityunjaya-mantra-anushthan, mantras-chanting)
- **What was done:** Translated all 12 English service JSON files to Gujarati. Each file contains natural Gujarati script with proper Vedic/Hindu terminology (કુંડળી, રાશિફળ, દશા, ગોચર, મુહૂર્ત, નવરત્ન, ષડ્બલ, etc.). All user-facing fields translated: title, subtitle, description, shortDescription, introduction, overview, benefits, process steps, FAQs, keywords, and SEO metadata. System identifiers (id, slug, category, relatedServices) kept as English for URL routing. i18n/gu.json already had all keys matching en.json from prior tasks (19/19 top-level sections). Total: 112 Gujarati FAQs, 96 Gujarati benefits, 60 Gujarati process steps across 12 services.
- **Test results:** `npm run build` succeeds (70 pages, 2.55s, zero errors/warnings). Gujarati service pages now render with Gujarati content (not English fallback). EN and HI pages unaffected. Zod schema validation passes for all Gujarati files. i18n key parity confirmed (19/19 top-level keys).
- **Decisions:** Services utility `getServicesForLanguage()` already supported `gu/` prefix filtering — no code changes needed. Gujarati translations use appropriate Vedic terminology that Gujarati speakers would naturally use (e.g., "કુંડળી વાંચન" not transliterated Hindi). SEO keywords include Gujarati-language search terms with અમદાવાદ location targeting.
- **Gotchas:** All 3 languages now have complete service content (en, hi, gu). Blog posts (T13/T14) are still English-only across all languages. T13 is next — write 6 initial English blog posts.
- **Status:** DONE

---

### Handover Summary — 2026-03-09T03:51Z (Phase 5 Content: T10–T12 Complete)

**All service content written in 3 languages. Blog content (T13) is next.**

| Task | Key Output |
|------|------------|
| T10 | Enhanced 12 English service JSONs: 300-500 word intros, 112 FAQs, 96 benefits, Ahmedabad SEO keywords |
| T11 | Created `src/content/services/hi/` — 12 Hindi files with natural Devanagari + Vedic terminology |
| T12 | Created `src/content/services/gu/` — 12 Gujarati files with native Gujarati script + Vedic terminology |

**Build:** 70 pages, ~2.55s, zero errors/warnings. All service pages render natively in all 3 languages (no fallback).

**Key files changed:**
- `src/content/services/en/*.json` (12 files enhanced in T10)
- `src/content/services/hi/*.json` (12 files created in T11)
- `src/content/services/gu/*.json` (12 files created in T12)

**Decisions:**
- `introduction` and `overview` kept as separate fields (both rendered in different page sections)
- Hindi/Gujarati use natural Vedic terms, not transliterations (कुंडली / કુંડળી, not "kundli")
- System identifiers (id, slug, category, relatedServices) kept as English for URL routing
- No code changes needed for T10–T12 — services utility already handled language-prefixed content

**Next up:** T13 (Write 6 Initial Blog Posts in English)

**Gotchas for next task:**
- Blog system exists (T7) with 2 placeholder posts — T13 replaces/adds 6 real posts
- Blog content is HTML strings in JSON (not markdown), schema in `src/schemas/blog-content.schema.ts`
- Blog utility in `src/utils/blog.ts` has same language fallback pattern as services
- Blog translations (hi/gu) are a separate task (T14) after English content is written
- 42 blog topic ideas documented in R2 research report

---

### T13: Write 6 Initial Blog Posts (English) — 2026-03-09
- **Files created/modified:**
  - `src/content/blog/en/understanding-your-kundli.json` (rewritten — expanded from ~500 to ~1100 words)
  - `src/content/blog/en/power-of-vastu-shastra.json` (NEW — replaces vastu-tips-for-home.json)
  - `src/content/blog/en/gemstones-that-can-change-your-destiny.json` (NEW)
  - `src/content/blog/en/marriage-compatibility-horoscope.json` (NEW)
  - `src/content/blog/en/balancing-seven-chakras.json` (NEW)
  - `src/content/blog/en/maha-mrityunjaya-mantra-guide.json` (NEW)
  - `src/content/blog/en/vastu-tips-for-home.json` (REMOVED — replaced by power-of-vastu-shastra)
- **What was done:** Wrote 6 comprehensive English blog posts (800-1200+ words each) covering the exact titles specified in the task. Each post is informative, authoritative, includes Vedic references, practical advice, and a CTA to book a consultation with Pandit Shree Mahadev Joshi. All posts have proper SEO metadata (title, description, keywords), categories, tags, and relatedServices linking to relevant service pages.
- **Blog posts:**
  1. Understanding Your Kundli (~1100 words) — covers 12 houses, Navagraha, Nakshatras, Dasha system
  2. Power of Vastu Shastra (~1100 words) — Pancha Tatva, directional energy, remedies without demolition
  3. 7 Gemstones (~1200 words) — Ruby, Pearl, Yellow Sapphire, Emerald, Diamond, Blue Sapphire, Hessonite
  4. Marriage Compatibility (~1100 words) — Ashtakoot Guna Milan, 8 Kootas, Mangal Dosha, deeper analysis
  5. Balancing Seven Chakras (~1200 words) — all 7 chakras with signs, practices, and astrology connections
  6. Maha Mrityunjaya Mantra (~1200 words) — meaning, word-by-word, chanting method, Anushthan
- **Test results:** `npm run build` — 82 pages, 3.12s, zero errors. All 6 blog posts render in en/hi/gu routes (hi/gu use English fallback until T14).
- **Decisions:** Removed old `vastu-tips-for-home.json` placeholder — replaced with task-specified title. Reading times set to 8-11 min based on word count. Publish dates staggered across March 2026 for realistic appearance.
- **Gotchas:** hi/ and gu/ blog directories are empty — T14 will translate all 6 posts. Blog listing page shows all 6 posts with category filtering working.
- **Status:** DONE

---

### Handover Summary — 2026-03-10T03:00Z (Phase 5 Content: T10–T13 Complete)

**All service content (3 langs) and 6 English blog posts done. Blog translations (T14) are next.**

| Task | Key Output |
|------|------------|
| T10 | Enhanced 12 English service JSONs: 300-500 word intros, 112 FAQs, 96 benefits, Ahmedabad SEO keywords |
| T11 | 12 Hindi service files — natural Devanagari + Vedic terms |
| T12 | 12 Gujarati service files — native script + Vedic terms |
| T13 | 6 English blog posts (800-1200 words each): Kundli, Vastu, Gemstones, Marriage, Chakras, Maha Mrityunjaya |

**Build:** 82 pages, ~3.12s, zero errors/warnings.

**Key files:**
- Services: `src/content/services/{en,hi,gu}/*.json` (36 files total)
- Blog: `src/content/blog/en/*.json` (6 files — was 2 placeholders, now 6 real posts)
- Removed: `src/content/blog/en/vastu-tips-for-home.json` (replaced by `power-of-vastu-shastra.json`)

**Decisions:**
- Blog content is HTML strings in JSON (matching service content pattern)
- Publish dates staggered across March 2026 for realism
- Reading times 8-11 min based on word count
- No code changes in T10–T13 — existing utilities handled everything

**Next up:** T14 (Translate 6 Blog Posts to Hindi and Gujarati)

**Gotchas for next task:**
- `src/content/blog/hi/` and `src/content/blog/gu/` directories don't exist yet
- Blog utility `getBlogPostsForLanguage()` in `src/utils/blog.ts` uses same language fallback as services
- Blog schema in `src/schemas/blog-content.schema.ts` — all fields same as English
- hi/gu blog routes currently show English content as fallback
- 82 pages total now (was 70 after Phase 4)

---

### T14: Translate Blog Posts to Hindi and Gujarati — 2026-03-09
- **Files created:**
  - `src/content/blog/hi/understanding-your-kundli.json`
  - `src/content/blog/hi/power-of-vastu-shastra.json`
  - `src/content/blog/hi/gemstones-that-can-change-your-destiny.json`
  - `src/content/blog/hi/marriage-compatibility-horoscope.json`
  - `src/content/blog/hi/balancing-seven-chakras.json`
  - `src/content/blog/hi/maha-mrityunjaya-mantra-guide.json`
  - `src/content/blog/gu/understanding-your-kundli.json`
  - `src/content/blog/gu/power-of-vastu-shastra.json`
  - `src/content/blog/gu/gemstones-that-can-change-your-destiny.json`
  - `src/content/blog/gu/marriage-compatibility-horoscope.json`
  - `src/content/blog/gu/balancing-seven-chakras.json`
  - `src/content/blog/gu/maha-mrityunjaya-mantra-guide.json`
- **What was done:** Translated all 6 English blog posts to Hindi (hi) and Gujarati (gu) — 12 new JSON files total. Each translation uses localized SEO meta, culturally appropriate Vedic terminology (Devanagari/Gujarati script), and natural-reading prose. Slugs and IDs kept as English for URL routing consistency.
- **Test results:** `npm run build` — 82 pages across 3 languages (18 blog pages: 6 per lang), zero errors/warnings. Blog pages now render natively in all 3 languages (no fallback needed).
- **Decisions:** Used natural Vedic terms in each language (Hindi: कुंडली, वास्तु, नवरत्न; Gujarati: કુંડળી, વાસ્તુ, નવરત્ન) rather than transliterations. SEO keywords localized per language with Ahmedabad targeting. System identifiers kept in English.
- **Gotchas:** Phase 5 content is now fully complete across all 3 languages. V4 (verify all content in all languages) is the next task before moving to Phase 6 SEO.
- **Status:** DONE

---

### Handover Summary — 2026-03-10T03:28Z (Phase 5 Content: T10–T14 Complete)

**All content (services + blog) written and translated in 3 languages. V4 verification is next.**

| Task | Key Output |
|------|------------|
| T10 | Enhanced 12 English service JSONs: 300-500 word intros, 112 FAQs, 96 benefits |
| T11 | 12 Hindi service files — natural Devanagari + Vedic terms |
| T12 | 12 Gujarati service files — native script + Vedic terms |
| T13 | 6 English blog posts (800-1200 words): Kundli, Vastu, Gemstones, Marriage, Chakras, Maha Mrityunjaya |
| T14 | 12 translated blog posts (6 Hindi + 6 Gujarati) with localized SEO |

**Build:** 82 pages, ~3.12s, zero errors/warnings. All content renders natively in en/hi/gu.

**Content totals:**
- Services: 36 files (12 × 3 langs)
- Blog: 18 files (6 × 3 langs)
- i18n keys: ~200+ per language

**Key files:**
- Services: `src/content/services/{en,hi,gu}/*.json` (36 files)
- Blog: `src/content/blog/{en,hi,gu}/*.json` (18 files)
- Utilities: `src/utils/services.ts`, `src/utils/blog.ts` (no changes needed in Phase 5)

**Decisions:**
- All content is HTML strings in JSON (not markdown)
- Natural Vedic terminology per language, not transliterations
- System identifiers (id, slug, category) kept as English for URL routing
- No code changes needed in T10–T14 — existing utilities handled everything

---

### V4: Verify All Content in All Languages — 2026-03-09
- **Result:** ALL CHECKS PASSED — no issues found
- **Checks performed:**
  - Service pages: 12 × 3 langs = 36 HTML pages verified with real content (EN ~44KB, HI ~60KB, GU ~58KB avg)
  - Blog posts: 6 × 3 langs = 18 HTML pages verified with full translated content
  - Translation keys: en.json / hi.json / gu.json all have identical 432-line key structures — zero missing/extra keys
  - Fonts: Noto Sans Devanagari (Hindi) + Noto Sans Gujarati loaded via Google Fonts, applied via CSS `html[lang]` selectors
  - SEO meta: title, description, keywords, author, canonical, hreflang (en/hi/gu/x-default) all present per page per language
- **Note:** OG/Twitter Card tags not yet present — these are scoped to T15/T16 (Phase 6 SEO)
- **Build:** 82 pages, ~3.72s, zero errors/warnings
- **Status:** PASSED — Phase 5 Content fully verified

**Next up:** V4 (Verify All Content in All Languages)

**Gotchas for next task:**
- V4 should verify: all 36 service pages render correct language content, all 18 blog pages render correct language content, no English fallback where translated content exists, SEO metadata present in all languages, Zod schema validation passes, category/tag filtering works on blog listing
- After V4: Phase 6 SEO (T15–T17, V5)
- Placeholders still needing real values: Formspree endpoints, Google Analytics ID, astrologer photo, Google Reviews/JustDial URLs, Google Maps exact address
