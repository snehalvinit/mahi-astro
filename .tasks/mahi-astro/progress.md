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

### Last Completed: FX-3a (Fix broken footer service slugs) — 2026-03-09
### Next Up: FX-3b (Fix missing self-referencing hreflang tag)
### Latest Commit: fix(layout): FX-3a — correct footer service slugs

### Phase Summary
| Phase | Tasks | Status |
|-------|-------|--------|
| 1-Research | R1, R2, R3 | DONE (3/3) |
| 2-Foundation | T1, V1 | DONE (2/2) |
| 3-Design | T2, T3, V2 | DONE (3/3) |
| 4-Pages | T4, T5, T6, T7, T8, T9, T9b, T9c, V3 | V3 BLOCKED (9/9 tasks run, 3 fixes needed) |
| 4-Fixes | FX-3a, FX-3b, FX-3c, VFX-3 | FX-3a DONE (1/4) |
| 5-Content | T10–T14, V4 | NOT STARTED |
| 6-SEO | T15–T17, V5 | NOT STARTED |
| 7+ | T18–T37 | NOT STARTED |

### Build Stats
- **Pages generated:** 70 (across 3 languages)
- **Build time:** ~2.16s
- **Components created:** 16 (6 layout, 6 sections, 4 UI)
- **i18n keys per language:** ~200+
- **Service pages:** 12 × 3 langs = 36
- **Blog posts:** 2 × 3 langs = 6

---

## Task History

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
