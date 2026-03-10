# Mahi Astro — Believe Astrology Website — Task Checklist

**Project:** /Users/s0m0ohl/pers/mahi_astro
**Date:** 2026-03-09
**Runner:** Claude Code (Opus for build/research, Sonnet for verify)

---

## Common Knowledge

### Project Overview
Multilingual (English, Hindi, Gujarati) astrology website for **Pandit Shree Mahadev Joshi** — "Believe Astrology". Based in Ahmedabad, Gujarat, expanding to Mumbai and US. Built with Astro framework (referencing Nilay website architecture for i18n patterns). Must be SEO-optimized for Google, JustDial, social media. Zen philosophy: clean, modular, elegant, trustworthy.

### Astrologer Info
- **Name:** Pandit Shree Mahadev Joshi
- **Brand:** Believe Astrology — "Be Better with Connect to Nature"
- **Tagline:** "Astrology is not about predicting a fixed fate, but about understanding the weather of the cosmos so you can sail your boat with wisdom."
- **Experience:** 20+ years Vedic Astrology & Spiritual Consultation
- **Services:** Vedic Astrology & Kundli Reading, Horoscope Analysis & Predictions, Marriage/Career/Finance/Health Guidance, Vastu Consultation, Gemstone Recommendations, Karma & Life-Purpose Counselling, Pancha Tatva Balancing, Seven Chakras Balancing, Vedic Spiritual Poojas, Vedic Karma-Kand Yagnas, Maha-Mrutunjay Mantra Anushthan, Mantras Chanting
- **Contact:** mahadevjoshi91@gmail.com | +91 8154992727 (WhatsApp)
- **Consultations:** In-person + Zoom/WhatsApp (global)

### Architecture Context (from Nilay Website Reference)
- **Framework:** Astro 5.x with static site generation
- **i18n:** URL-based routing `/en/`, `/hi/`, `/gu/` with JSON translation files
- **Content:** JSON content collections with Zod schemas, per-language directories
- **Components:** Layout → Sections → Features pattern
- **Styling:** Tailwind CSS v4
- **SEO:** hreflang tags, canonical URLs, JSON-LD schema markup, sitemap
- **Deployment:** Vercel + GitHub

### Design Direction (from Research)
- **Theme:** Hybrid — light pages with dark celestial hero sections
- **Colors:** Deep Gold (#C9A84C), Saffron (#FF9933), Royal Purple (#6F4278), Deep Indigo (#2E2B59), Cream (#FFFDF0), Deep Maroon (#72001B)
- **Feel:** Trustworthy, zen tranquility, Hindu/astrology resonance, elegant, high-class
- **Competitor Gap:** Most Ahmedabad astrology sites are outdated/cluttered — modern design = instant differentiation

### Key Files
| File | Role |
|------|------|
| `astro.config.mjs` | Astro config with i18n, sitemap, Tailwind |
| `src/content/i18n/{en,hi,gu}.json` | Translation strings per language |
| `src/content/services/{lang}/` | Service content per language |
| `src/pages/[lang]/` | Language-routed pages |
| `src/components/` | Reusable UI components |
| `src/layouts/` | Page layout templates |
| `src/styles/` | Global styles and Tailwind config |
| `src/data/` | Static data (testimonials, blog metadata) |
| `src/utils/i18n.ts` | i18n helper functions |
| `public/images/` | Hero images, icons, placeholders |
| `.tasks/mahi-astro/reports/` | Research HTML reports |

### Preferences
- **Code style:** Max 600 lines/file. Simple, flat, readable. No over-engineering.
- **Tests:** Playwright E2E tests for critical flows. Unit tests for utilities.
- **Commits:** `feat(scope):`, `fix(scope):`, `verify(scope):`, `chore:`
- **Models:** Opus for build/research, Sonnet for verify/fix
- **Reports:** Zen HTML format with citations, tabs, ASCII diagrams
- **Languages:** en (default), hi, gu — with fallback to English

### Task Handover Protocol
After each task, update `progress.md` with:
1. What was done (files created/modified)
2. Key decisions made and why
3. Known issues or gotchas
4. What the next task needs to know

---

## Execution Order

| # | ID | Type | Phase | Description | Model | Depends On |
|---|-----|------|-------|-------------|-------|------------|
| 1 | R1 | Research | 1-Research | Research astrology website designs, competitors (incl. sohinisastri.com), best practices, CRO trust signals | claude-opus-4-6 | — |
| 2 | R2 | Research | 1-Research | Research service content for all 12 services | claude-opus-4-6 | — |
| 3 | R3 | Research | 1-Research | Research hero images and visual assets strategy | claude-opus-4-6 | — |
| 4 | T1 | Build | 2-Foundation | Scaffold Astro project with i18n, Tailwind, base config | claude-opus-4-6 | R1 |
| 5 | V1 | Verify | 2-Foundation | Verify project builds, i18n routing works, Tailwind renders | claude-sonnet-4-6 | T1 |
| 6 | T2 | Build | 3-Design | Create global styles, color system, typography, layout components | claude-opus-4-6 | V1 |
| 7 | T3 | Build | 3-Design | Build header, footer, navigation, language switcher, WhatsApp button | claude-opus-4-6 | T2 |
| 8 | V2 | Verify | 3-Design | Verify design system, responsive layout, navigation works | claude-sonnet-4-6 | T3 |
| 9 | T4 | Build | 4-Pages | Build homepage — hero, services grid, testimonials, CTA, booking | claude-opus-4-6 | V2, R3 |
| 10 | T5 | Build | 4-Pages | Build About page — astrologer bio, credentials, experience | claude-opus-4-6 | V2 |
| 11 | T6 | Build | 4-Pages | Build individual service landing pages (12 services) | claude-opus-4-6 | V2, R2 |
| 12 | T7 | Build | 4-Pages | Build Blog listing page and blog post template | claude-opus-4-6 | V2 |
| 13 | T8 | Build | 4-Pages | Build Contact page with form, map, WhatsApp integration | claude-opus-4-6 | V2 |
| 14 | T9 | Build | 4-Pages | Build Testimonials page | claude-opus-4-6 | V2 |
| 15 | T9b | Build | 4-Pages | Build Events/Updates page with subscription mechanism | claude-opus-4-6 | V2 |
| 16 | T9c | Build | 4-Pages | Build 404 page and Privacy Policy page (DPDP Act compliant) | claude-opus-4-6 | V2 |
| 17 | V3 | Verify | 4-Pages | Verify all pages render in all 3 languages, responsive, accessible | claude-sonnet-4-6 | T4,T5,T6,T7,T8,T9,T9b,T9c |
| 18 | T10 | Build | 5-Content | Write English content for all 12 service pages | claude-opus-4-6 | R2 |
| 19 | T11 | Build | 5-Content | Translate all content to Hindi | claude-opus-4-6 | T10 |
| 20 | T12 | Build | 5-Content | Translate all content to Gujarati | claude-opus-4-6 | T10 |
| 21 | T13 | Build | 5-Content | Write 6 initial blog posts (English) with astrology topics | claude-opus-4-6 | R2 |
| 22 | T14 | Build | 5-Content | Translate blog posts to Hindi and Gujarati | claude-opus-4-6 | T13 |
| 23 | V4 | Verify | 5-Content | Verify all content loads correctly in all languages | claude-sonnet-4-6 | T11,T12,T14 |
| 24 | T15 | Build | 6-SEO | Implement SEO — schema markup, meta tags, sitemap, robots.txt, hreflang | claude-opus-4-6 | V3 |
| 25 | T16 | Build | 6-SEO | Add Google Analytics, structured data, Open Graph, Twitter cards | claude-opus-4-6 | T15 |
| 26 | T17 | Build | 6-SEO | Create JustDial & Google My Business optimization guide | claude-opus-4-6 | T15 |
| 27 | V5 | Verify | 6-SEO | Verify SEO — Lighthouse audit, schema validation, sitemap check | claude-sonnet-4-6 | T16,T17 |
| 28 | T18 | Build | 7-Images | Source and place hero images, icons, decorative elements | claude-opus-4-6 | V3 |
| 29 | T19 | Build | 7-Images | Optimize all images (WebP, lazy loading, responsive srcset) | claude-opus-4-6 | T18 |
| 30 | V6 | Verify | 7-Images | Verify images load, responsive, performance impact acceptable | claude-sonnet-4-6 | T19 |
| 31 | T20 | Build | 8-Testing | Write Playwright E2E tests — navigation, i18n, booking, responsive, a11y | claude-opus-4-6 | V4,V5,V6 |
| 32 | V7 | Verify | 8-Testing | Run all tests, fix failures, ensure 100% pass | claude-sonnet-4-6 | T20 |
| 33 | T21 | Build | 9-Deploy | Initialize GitHub repo, push code | claude-opus-4-6 | V7 |
| 34 | T22 | Build | 9-Deploy | Deploy to Vercel, configure domain, verify production | claude-opus-4-6 | T21 |
| 35 | V8 | Verify | 9-Deploy | Final production verification — all pages, languages, SEO, performance | claude-sonnet-4-6 | T22 |
| 36 | T23 | Build | 10-CMS | Integrate Keystatic CMS — manage blogs, events, testimonials, services, i18n (free on Vercel) | claude-opus-4-6 | V8 |
| 37 | V9 | Verify | 10-CMS | Verify CMS manages all content types, auto-deploys, guide documented | claude-sonnet-4-6 | T23 |

**Total: 37 tasks**

---

## PHASE 1 — Research & Discovery

### - [x] R1: Research Astrology Website Design & Best Practices

**Type:** Research | **Model:** claude-opus-4-6 | **Depends on:** —

**Knowledge Base:**
- Competitor websites in Ahmedabad/Gujarat market
- Global best-in-class astrology/spiritual websites
- **sohinisastri.com** — astrologer's preferred reference site (analyze what works, what doesn't)
- Modern web design trends 2025-2026
- Nilay website architecture at ~/Documents/pers/Nilay_plastic/nilay_website/
- Trust signals & CRO research for astrology websites

**Do:**
1. Search and analyze top 10 astrology/spiritual websites globally and in India
2. **Analyze sohinisastri.com in detail** — Divi/WordPress, blue scheme, serif fonts (Cormorant Garamond + Poppins), Presidents Awardee trust signal, sidebar blog layout. Strengths: credibility-first approach, awards prominently displayed. Weaknesses: heavy theme (9 fonts), generic layout, weak service cards, no modern booking flow. Take the credibility strategy, discard the dated design.
3. Document design patterns: color schemes, typography, hero sections, CTAs
4. Analyze competitor sites in Ahmedabad (Ambika Jyotish, Astro Shyamsundar, etc.)
4. Research Astro framework i18n best practices for 3-language support
5. Research SEO best practices for multilingual astrology sites
6. Research JustDial and Google My Business optimization
7. Research booking integration options (WhatsApp, Cal.com, Calendly)
8. Research social media integration strategies for Indian astrologers
9. Study Nilay website architecture for i18n patterns to adapt
10. **Produce:** Zen HTML report at `.tasks/mahi-astro/reports/R1-website-research.html`

**Validate:**
- [ ] HTML report created with all sections, citations, and recommendations
- [ ] At least 20 real citations from web research
- [ ] Clear design direction decided with color palette, typography, layout
- [ ] Menu structure and page hierarchy documented
- [ ] Git commit: `research(design): R1 — astrology website design research report`

---

### - [x] R2: Research Service Content for All 12 Services

**Type:** Research | **Model:** claude-opus-4-6 | **Depends on:** —

**Knowledge Base:**
- Mahi Website Info.docx (astrologer info and services list)
- Competitor service descriptions from top astrology sites
- Vedic astrology knowledge bases

**Do:**
1. Research each of the 12 services in depth:
   - Vedic Astrology & Kundli Reading
   - Horoscope Analysis & Predictions
   - Marriage, Career, Finance & Health Guidance
   - Vastu Consultation
   - Gemstone Recommendations
   - Karma & Life-Purpose Counselling
   - Pancha Tatva Balancing
   - Seven Chakras Balancing
   - Vedic Spiritual Poojas
   - Vedic Karma-Kand Yagnas
   - Maha-Mrutunjay Mantra Anushthan
   - Mantras Chanting
2. For each service: write a 300-500 word description, benefits, process, FAQs
3. Research what blog topics relate to each service
4. Document recommended keywords (English, Hindi, Gujarati) per service
5. **Produce:** Zen HTML report at `.tasks/mahi-astro/reports/R2-service-content-research.html`
6. **Produce:** JSON content files at `.tasks/mahi-astro/content-drafts/services/en/` (one per service)

**Validate:**
- [x] All 12 services researched with descriptions, benefits, FAQs
- [x] Keywords documented per service in all 3 languages
- [x] Blog topic ideas mapped to services
- [x] HTML report with citations
- [x] Git commit: `research(content): R2 — service content research for 12 services`

---

### - [ ] R3: Research Hero Images & Visual Assets Strategy

**Type:** Research | **Model:** claude-opus-4-6 | **Depends on:** —

**Knowledge Base:**
- Design direction from R1
- Free image sources (Unsplash, Pexels, Pixabay)
- Astrology/Hindu spiritual imagery conventions

**Do:**
1. Research free high-quality image sources for astrology/spiritual themes
2. Define image requirements per page:
   - Homepage hero (celestial/cosmic theme, 1920x1080)
   - About page (placeholder for astrologer photo + spiritual background)
   - Each service page hero (themed to service, 1200x600)
   - Blog featured images (800x450)
   - Decorative elements (mandalas, chakras, zodiac icons)
3. Search for and download/bookmark suitable placeholder images
4. Define image optimization strategy (WebP, srcset, lazy loading)
5. Create icon set requirements (zodiac signs, service icons)
6. **Produce:** Zen HTML report at `.tasks/mahi-astro/reports/R3-visual-assets.html`
7. **Produce:** Image manifest JSON listing all required images with specs

**Validate:**
- [ ] Image requirements documented per page with dimensions
- [ ] At least 15 placeholder images identified/sourced
- [ ] Icon set requirements defined
- [ ] Optimization strategy documented
- [ ] Git commit: `research(images): R3 — visual assets and hero images strategy`

---

## PHASE 2 — Project Foundation

### - [ ] T1: Scaffold Astro Project with i18n, Tailwind, Base Config

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** R1

**Knowledge Base:**
- Nilay website architecture (src/ structure, astro.config, i18n patterns)
- R1 research report (design decisions, framework choices)
- Astro 5.x docs for i18n configuration

**Do:**
1. Initialize Astro project: `npm create astro@latest`
2. Install dependencies: `@astrojs/sitemap`, `@astrojs/react`, `@tailwindcss/vite`, `playwright`
3. Configure `astro.config.mjs` with:
   - i18n: defaultLocale 'en', locales ['en', 'hi', 'gu']
   - Sitemap with i18n hreflang config
   - Tailwind CSS integration
   - Site URL placeholder
4. Create directory structure:
   ```
   src/
     components/layout/   — Header, Footer, LanguageSwitcher, WhatsAppButton
     components/sections/ — Hero, Services, Testimonials, CTA, FAQ
     components/ui/       — Button, Card, Badge, Icon
     content/i18n/        — en.json, hi.json, gu.json
     content/services/en/ — Service content JSONs
     content/services/hi/
     content/services/gu/
     content/blog/en/
     content/blog/hi/
     content/blog/gu/
     data/                — testimonials.json, site-config.ts
     layouts/             — BaseLayout, ServiceLayout, BlogLayout
     pages/[lang]/        — All routed pages
     schemas/             — Zod schemas for content validation
     styles/              — global.css, fonts
     utils/               — i18n.ts, content-loaders.ts
   public/images/         — hero/, services/, blog/, icons/
   ```
5. Create `src/utils/i18n.ts` with functions: `getTranslations()`, `isValidLanguage()`, `getAlternateLanguages()`, `supportedLanguages`, `defaultLanguage`
6. Create `src/data/site-config.ts` with astrologer info, contact, social links, theme colors
7. Create minimal `src/content/i18n/en.json` with header, footer, nav, CTA keys
8. Create `src/pages/index.astro` with redirect to `/en/`
9. Create `src/pages/[lang]/index.astro` with `getStaticPaths()` generating all 3 locales
10. Create `src/layouts/BaseLayout.astro` with HTML head, meta, fonts, body wrapper

**Validate:**
- [ ] `npm run dev` starts without errors
- [ ] `/en/`, `/hi/`, `/gu/` routes all render
- [ ] Tailwind CSS works (test with a utility class)
- [ ] i18n utility functions return correct translations
- [ ] Directory structure matches plan
- [ ] Git commit: `feat(scaffold): T1 — Astro project with i18n and Tailwind`

---

### - [ ] V1: Gate — Verify Project Foundation

**Type:** Verification | **Model:** claude-sonnet-4-6 | **Depends on:** T1

**Knowledge Base:**
- progress.md — read T1 handover
- All files created by T1

**Checks:**
- [ ] `npm run build` succeeds
- [ ] All 3 language routes generate static HTML
- [ ] Tailwind classes render correctly in dev
- [ ] i18n functions work (getTranslations returns correct lang)
- [ ] TypeScript compiles without errors
- [ ] Directory structure matches Common Knowledge spec
- [ ] If issues found → create FX-1 + VFX-1 in Appendix

---

## PHASE 3 — Design System

### - [ ] T2: Create Global Styles, Color System, Typography, Layouts

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** V1

**Knowledge Base:**
- R1 report (color palette, typography, design direction)
- Tailwind CSS v4 customization docs
- site-config.ts (created by T1)

**Do:**
1. Configure Tailwind theme extensions in `src/styles/global.css`:
   - Colors: gold (#C9A84C), saffron (#FF9933), purple (#6F4278), indigo (#2E2B59), cream (#FFFDF0), maroon (#72001B)
   - Typography: System fonts + Google Fonts (serif for headings, sans for body)
   - Support for Devanagari (Hindi) and Gujarati scripts
2. Create CSS custom properties for theme values
3. Create `src/layouts/BaseLayout.astro` with:
   - Responsive container
   - Dark hero section capability
   - Font loading for multilingual support (Noto Sans Gujarati, Noto Sans Devanagari)
4. Create `src/components/ui/Button.astro` — primary, secondary, outline variants
5. Create `src/components/ui/Card.astro` — service card, testimonial card, blog card
6. Create `src/components/ui/SectionHeading.astro` — with decorative mandala accent
7. Create `src/components/ui/Badge.astro` — for trust indicators (years, clients, etc.)

**Validate:**
- [ ] Color palette renders correctly in both light and dark contexts
- [ ] Hindi and Gujarati text renders correctly with proper fonts
- [ ] All UI components are responsive (mobile, tablet, desktop)
- [ ] Button, Card, Badge components work with passed props
- [ ] Git commit: `feat(design): T2 — global styles, color system, typography`

---

### - [ ] T3: Build Header, Footer, Navigation, Language Switcher, WhatsApp Button

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** T2

**Knowledge Base:**
- Design system from T2
- i18n translation files
- Nilay website header/footer patterns

**Do:**
1. Create `src/components/layout/SiteHeader.astro`:
   - Logo (text-based "Believe Astrology" with Om/astro icon)
   - Navigation: Home | About | Services (dropdown) | Blog | Testimonials | Contact
   - Language switcher: EN | हिंदी | ગુજ
   - "Book Now" CTA button (gold/saffron)
   - Mobile hamburger menu
   - Sticky header on scroll
2. Create `src/components/layout/MenuOverlay.astro` — full-screen mobile menu
3. Create `src/components/layout/SiteFooter.astro`:
   - Quick Links, Services, Contact Info columns
   - Social media links (Instagram, YouTube, Facebook, WhatsApp)
   - Google Map embed placeholder
   - Copyright + JustDial/Google Reviews badges
4. Create `src/components/layout/LanguageSwitcher.astro` — URL-based switching for 3 languages
5. Create `src/components/layout/WhatsAppButton.astro` — floating bottom-right button
6. Create `src/components/layout/BottomBar.astro` — fixed mobile bar with Call + WhatsApp + Book
7. Update all translation files (en.json, hi.json, gu.json) with nav/header/footer strings

**Validate:**
- [ ] Header renders with all nav items in all 3 languages
- [ ] Language switcher changes URL and content correctly
- [ ] Mobile menu opens/closes smoothly
- [ ] WhatsApp button links to correct number with prefilled message
- [ ] Footer shows correct contact info
- [ ] Sticky header works on scroll
- [ ] Git commit: `feat(layout): T3 — header, footer, navigation, language switcher`

---

### - [ ] V2: Gate — Verify Design System & Navigation

**Type:** Verification | **Model:** claude-sonnet-4-6 | **Depends on:** T3

**Checks:**
- [ ] All 3 language routes render with correct translations
- [ ] Navigation works on mobile and desktop
- [ ] Language switching preserves current page path
- [ ] WhatsApp button has correct deep link
- [ ] Color system consistent across all components
- [ ] Fonts load correctly for all 3 scripts
- [ ] If issues found → create FX-2 + VFX-2 in Appendix

---

## PHASE 4 — Page Construction

### - [ ] T4: Build Homepage — Hero, Services Grid, Testimonials, CTA, Booking

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** V2, R3

**Knowledge Base:**
- Design system (T2, T3)
- R1 report (hero section best practices, Z-pattern layout)
- R3 report (hero images identified)
- Astrologer info from Common Knowledge

**Do:**
1. Create `src/components/sections/HeroSection.astro`:
   - Dark celestial background (gradient with subtle stars/mandala pattern)
   - Headline: "Unlock Your Destiny with Vedic Astrology" (translated)
   - Subheadline with credentials: "20+ Years | Thousands of Consultations"
   - Primary CTA: "Book Consultation" (gold button)
   - Secondary CTA: "Call Now" / "WhatsApp"
   - Trust badges row
   - Placeholder for astrologer photo (right side)
2. Create `src/components/sections/ServicesGrid.astro`:
   - 3x4 grid of service cards with icons
   - Each card links to individual service page
   - Subtle hover animations
3. Create `src/components/sections/TestimonialsSection.astro`:
   - Carousel/slider with client testimonials
   - Star ratings, client initials (privacy)
   - Placeholder testimonials for now
4. Create `src/components/sections/CTASection.astro`:
   - "Ready to Transform Your Life?" (translated)
   - Book consultation + WhatsApp buttons
   - Background: subtle spiritual pattern
5. Create `src/components/sections/StatsBar.astro`:
   - "20+ Years" | "10,000+ Clients" | "99% Satisfaction" | "Global Reach"
6. Assemble homepage at `src/pages/[lang]/index.astro`:
   - Hero → Stats → Services → Testimonials → CTA → Latest Blog Posts
7. Add `getStaticPaths()` for all 3 languages

**Validate:**
- [ ] Homepage renders beautifully in all 3 languages
- [ ] Hero section has dark celestial feel with clear CTAs
- [ ] Services grid shows all 12 services with icons
- [ ] Testimonials carousel works
- [ ] Responsive on mobile/tablet/desktop
- [ ] All CTAs link correctly (WhatsApp, phone, booking)
- [ ] Git commit: `feat(pages): T4 — homepage with hero, services, testimonials, CTA`

---

### - [ ] T5: Build About Page — Astrologer Bio, Credentials, Experience

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** V2

**Do:**
1. Create `src/pages/[lang]/about.astro`:
   - Hero banner with spiritual background
   - Astrologer biography section (from Mahi Website Info)
   - Credentials & expertise list
   - Experience timeline (20+ years journey)
   - Speaking engagements / events section
   - Philosophy section with quote
   - Photo placeholder (large, professional)
   - CTA: "Book a Consultation"
2. All text from translation files, content in 3 languages

**Validate:**
- [ ] About page renders in all 3 languages
- [ ] Photo placeholder is visible and properly sized
- [ ] Content matches astrologer's actual info
- [ ] Git commit: `feat(pages): T5 — about page with bio and credentials`

---

### - [ ] T6: Build Individual Service Landing Pages (12 Services)

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** V2, R2

**Knowledge Base:**
- R2 service content research
- Nilay website procedure page patterns
- Service content JSON schema

**Do:**
1. Create `src/schemas/service-content.schema.ts` with Zod:
   - slug, title, subtitle, heroImage, introduction, overview
   - benefits[], process[], faqs[], relatedServices[]
   - seo: { title, description, keywords }
2. Create `src/utils/services.ts` — content loader with language fallback
3. Create `src/layouts/ServiceLayout.astro`:
   - Hero with service-specific image
   - Introduction section
   - Benefits grid
   - Process walkthrough (numbered steps)
   - FAQ accordion
   - Related services
   - CTA: "Book This Service"
   - Breadcrumbs
4. Create `src/pages/[lang]/services/index.astro` — services listing
5. Create `src/pages/[lang]/services/[slug].astro` — dynamic service page
6. Create placeholder English content for all 12 services at `src/content/services/en/`
7. Create `getStaticPaths()` that generates all service x language combinations

**Validate:**
- [ ] All 12 service pages render correctly
- [ ] Dynamic routing works for all slugs
- [ ] FAQ accordion expands/collapses
- [ ] Breadcrumbs show correct path
- [ ] Related services link to correct pages
- [ ] Git commit: `feat(pages): T6 — 12 service landing pages with dynamic routing`

---

### - [ ] T7: Build Blog System — Listing Page and Post Template

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** V2

**Do:**
1. Create `src/schemas/blog-content.schema.ts`:
   - slug, title, excerpt, author, date, category, tags
   - heroImage, content (markdown), readingTime
   - seo: { title, description, keywords }
   - relatedServices[]
2. Create `src/layouts/BlogPostLayout.astro`:
   - Featured image
   - Title, date, author, reading time, category
   - Content body (rendered markdown)
   - Social sharing buttons
   - Related posts
   - CTA: "Book a Consultation"
3. Create `src/pages/[lang]/blog/index.astro`:
   - Blog post grid with featured images
   - Category filter
   - Pagination
4. Create `src/pages/[lang]/blog/[slug].astro` — individual blog post
5. Create 2 placeholder blog posts in English to test the system

**Validate:**
- [ ] Blog listing shows posts with images and excerpts
- [ ] Individual blog posts render correctly
- [ ] Category filtering works
- [ ] Social sharing links are correct
- [ ] Git commit: `feat(pages): T7 — blog listing and post template`

---

### - [ ] T8: Build Contact Page with Form, Map, WhatsApp Integration

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** V2

**Do:**
1. Create `src/pages/[lang]/contact.astro`:
   - Contact form (Name, Email, Phone, Service interested in, Message)
   - Form submits to FormSpree or similar (serverless)
   - WhatsApp direct link with prefilled message
   - Phone number with click-to-call
   - Email with mailto link
   - Google Maps embed (Ahmedabad location placeholder)
   - Office hours information
   - Social media links
2. Create `src/components/sections/ContactForm.astro`
3. All labels and placeholder text in translation files

**Validate:**
- [ ] Form renders in all 3 languages
- [ ] WhatsApp link opens correctly with prefilled text
- [ ] Phone click-to-call works on mobile
- [ ] Map renders correctly
- [ ] Git commit: `feat(pages): T8 — contact page with form and WhatsApp`

---

### - [ ] T9: Build Testimonials Page

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** V2

**Do:**
1. Create `src/pages/[lang]/testimonials.astro`:
   - Grid of testimonial cards
   - Star ratings
   - Client details (initials, city, service used)
   - Video testimonial placeholders
   - Google Reviews / JustDial reviews embed area
   - CTA: "Share Your Experience" + "Book Consultation"
2. Create `src/data/testimonials.json` with 8-10 placeholder testimonials
3. All text translated in i18n files

**Validate:**
- [ ] Testimonials render in all 3 languages
- [ ] Cards display correctly with ratings
- [ ] Responsive grid layout
- [ ] Git commit: `feat(pages): T9 — testimonials page`

---

### - [ ] T9b: Build Events/Updates Page with Subscription Mechanism

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** V2

**Knowledge Base:**
- User requirement: "daily updates where users can subscribe to them"
- WhatsApp broadcast and newsletter patterns

**Do:**
1. Create `src/pages/[lang]/events.astro`:
   - Upcoming events section (pujas, yagnas, workshops, speaking engagements)
   - Latest updates / news feed (festival predictions, planetary transits, eclipse alerts)
   - Past events gallery with photos
   - Event cards with date, title, description, location, CTA
2. Create subscription mechanism:
   - Email subscription form (integrate with free tier: Buttondown, Mailchimp, or ConvertKit)
   - WhatsApp broadcast opt-in link (wa.me link with "Subscribe" prefilled message)
   - "Get Daily Predictions" CTA
3. Create `src/data/events.json` with 4-6 placeholder events
4. Create `src/components/sections/EventCard.astro`
5. Create `src/components/sections/SubscribeSection.astro` — reusable on homepage + events page
6. All text in translation files for 3 languages

**Validate:**
- [ ] Events page renders in all 3 languages
- [ ] Event cards display date, title, description properly
- [ ] Subscription form captures email
- [ ] WhatsApp subscribe link works
- [ ] SubscribeSection reusable on homepage
- [ ] Git commit: `feat(pages): T9b — events/updates page with subscription`

---

### - [ ] T9c: Build 404 Page and Privacy Policy Page (DPDP Act Compliant)

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** V2

**Knowledge Base:**
- India's Digital Personal Data Protection Act (DPDP) 2023 + DPDP Rules 2025
- DPDP requires: explicit cookie consent (opt-in), clear privacy notice, data principal rights
- Full enforcement by May 2027, but best to comply now

**Do:**
1. Create `src/pages/[lang]/404.astro`:
   - Themed 404 with celestial/cosmic design ("Lost in the Stars?")
   - Search suggestions
   - Links to popular pages (Home, Services, Contact)
   - Translated for all 3 languages
2. Create `src/pages/[lang]/privacy-policy.astro`:
   - What personal data is collected (form submissions, analytics)
   - Purpose of processing
   - Cookie usage disclosure
   - Data principal rights (access, correction, erasure, grievance)
   - Contact details for data-related requests
   - Available in all 3 languages (DPDP requires notices in scheduled languages)
3. Create simple cookie consent banner component:
   - `src/components/layout/CookieConsent.astro`
   - Opt-in model (no cookies before consent)
   - "Accept" / "Decline" buttons
   - Links to privacy policy
   - Remembers choice in localStorage
4. Add privacy policy link to footer on all pages

**Validate:**
- [ ] 404 page renders in all 3 languages with correct links
- [ ] Privacy policy is comprehensive and DPDP-compliant
- [ ] Cookie consent banner appears on first visit
- [ ] Analytics only load after consent
- [ ] Git commit: `feat(pages): T9c — 404 page, privacy policy, cookie consent`

---

### - [ ] V3: Gate — Verify All Pages Render Correctly

**Type:** Verification | **Model:** claude-sonnet-4-6 | **Depends on:** T4, T5, T6, T7, T8, T9, T9b, T9c

**Checks:**
- [ ] All pages render in `/en/`, `/hi/`, `/gu/` without errors
- [ ] `npm run build` succeeds with no warnings
- [ ] Navigation between all pages works
- [ ] Responsive on mobile (375px), tablet (768px), desktop (1440px)
- [ ] All CTAs link correctly
- [ ] Accessibility: semantic HTML, alt text, keyboard navigation
- [ ] If issues found → create FX-3 + VFX-3 in Appendix

---

## PHASE 5 — Content Creation & Translation

### - [ ] T10: Write English Content for All 12 Service Pages

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** R2

**Knowledge Base:**
- R2 service content research report
- Content JSON schema from T6
- Astrologer's actual service descriptions

**Do:**
1. Write comprehensive English content for each service:
   - Title and subtitle
   - 300-500 word introduction
   - 6-8 benefits
   - 4-6 process steps
   - 8-10 FAQs with detailed answers
   - SEO meta title, description, keywords
   - Related services mapping
2. Save as JSON files at `src/content/services/en/{slug}.json`
3. Ensure content is authoritative, trustworthy, SEO-rich
4. Include relevant vedic/spiritual context for each service

**Validate:**
- [ ] All 12 service content files created
- [ ] Each has introduction, benefits, process, FAQs, SEO
- [ ] Content is professional and culturally appropriate
- [ ] Keywords are naturally integrated
- [ ] Git commit: `feat(content): T10 — English content for 12 services`

---

### - [ ] T11: Translate All Content to Hindi

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** T10

**Do:**
1. Translate all 12 service content files to Hindi
2. Save at `src/content/services/hi/{slug}.json`
3. Translate all i18n strings in `src/content/i18n/hi.json`
4. Ensure translations are natural Hindi (not machine-translated feel)
5. Use appropriate Vedic/Hindu terminology in Devanagari
6. Translate SEO meta tags with Hindi keywords

**Validate:**
- [ ] All 12 Hindi service files created
- [ ] i18n/hi.json has all keys matching en.json
- [ ] Hindi text reads naturally
- [ ] SEO keywords are in Hindi
- [ ] Git commit: `feat(content): T11 — Hindi translations for all services`

---

### - [ ] T12: Translate All Content to Gujarati

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** T10

**Do:**
1. Translate all 12 service content files to Gujarati
2. Save at `src/content/services/gu/{slug}.json`
3. Translate all i18n strings in `src/content/i18n/gu.json`
4. Ensure translations are natural Gujarati (target audience is Gujarat)
5. Use appropriate Vedic terminology in Gujarati script
6. Translate SEO meta tags with Gujarati keywords

**Validate:**
- [ ] All 12 Gujarati service files created
- [ ] i18n/gu.json has all keys matching en.json
- [ ] Gujarati text reads naturally for Gujarat audience
- [ ] SEO keywords are in Gujarati
- [ ] Git commit: `feat(content): T12 — Gujarati translations for all services`

---

### - [ ] T13: Write 6 Initial Blog Posts (English)

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** R2

**Knowledge Base:**
- R2 report (blog topic ideas per service)
- Blog schema from T7

**Do:**
1. Write 6 blog posts (800-1200 words each):
   - "Understanding Your Kundli: A Beginner's Guide to Vedic Birth Charts"
   - "The Power of Vastu Shastra: Transform Your Home, Transform Your Life"
   - "7 Gemstones That Can Change Your Destiny — A Vedic Guide"
   - "Marriage Compatibility: What Your Horoscope Reveals About Your Partner"
   - "Balancing Your Seven Chakras: Ancient Wisdom for Modern Life"
   - "Maha Mrityunjaya Mantra: Meaning, Benefits, and How to Chant"
2. Each post: title, excerpt, full content, category, tags, SEO meta
3. Include practical advice, vedic references, and CTA to book consultation
4. Save as JSON at `src/content/blog/en/`

**Validate:**
- [ ] 6 blog posts created with full content
- [ ] Each has proper SEO meta, tags, categories
- [ ] Content is informative and authoritative
- [ ] Each references relevant services
- [ ] Git commit: `feat(content): T13 — 6 initial blog posts in English`

---

### - [ ] T14: Translate Blog Posts to Hindi and Gujarati

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** T13

**Do:**
1. Translate all 6 blog posts to Hindi → `src/content/blog/hi/`
2. Translate all 6 blog posts to Gujarati → `src/content/blog/gu/`
3. Localize SEO meta for each language
4. Ensure cultural appropriateness of examples and references

**Validate:**
- [ ] 12 translated blog files created (6 Hindi + 6 Gujarati)
- [ ] Translations read naturally
- [ ] SEO meta localized
- [ ] Git commit: `feat(content): T14 — blog posts translated to Hindi and Gujarati`

---

### - [ ] V4: Gate — Verify All Content in All Languages

**Type:** Verification | **Model:** claude-sonnet-4-6 | **Depends on:** T11, T12, T14

**Checks:**
- [ ] All service pages load content in all 3 languages
- [ ] All blog posts render in all 3 languages
- [ ] No missing translation keys (compare en.json keys vs hi.json and gu.json)
- [ ] Hindi and Gujarati text renders with correct fonts
- [ ] SEO meta tags present in all languages
- [ ] If issues found → create FX-4 + VFX-4 in Appendix

---

## PHASE 6 — SEO Optimization

### - [ ] T15: Implement SEO — Schema Markup, Meta Tags, Sitemap, Hreflang

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** V3

**Do:**
1. Create `src/components/SEOHead.astro`:
   - Dynamic meta title and description per page/language
   - hreflang tags for all 3 languages + x-default
   - Canonical URLs
   - Open Graph tags (og:title, og:description, og:image, og:locale)
   - Twitter card tags
2. Add JSON-LD structured data:
   - LocalBusiness schema (astrologer practice)
   - Person schema (Pandit Mahadev Joshi)
   - Service schema (for each service page)
   - Article schema (for blog posts)
   - BreadcrumbList schema
   - FAQPage schema (for service FAQs)
3. Create `public/robots.txt` with sitemap reference
4. Configure `@astrojs/sitemap` with i18n hreflang in astro.config
5. Add breadcrumbs component with schema markup

**Validate:**
- [ ] All pages have unique meta titles and descriptions per language
- [ ] hreflang tags present on every page for all 3 languages
- [ ] JSON-LD validates at schema.org validator
- [ ] Sitemap generates with correct URLs
- [ ] robots.txt is accessible
- [ ] Git commit: `feat(seo): T15 — schema markup, meta tags, sitemap, hreflang`

---

### - [ ] T16: Add Analytics, Structured Data, Open Graph

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** T15

**Do:**
1. Create `src/components/AnalyticsHead.astro`:
   - Google Analytics 4 placeholder (configurable tag ID)
   - Google Tag Manager placeholder
   - Plausible Analytics placeholder (privacy-friendly alternative)
2. Ensure Open Graph images are set per page
3. Add social media preview optimization
4. Create `src/data/seo-keywords.json` — keyword mapping per service per language
5. Internal linking strategy: service pages → related blogs → related services

**Validate:**
- [ ] Analytics scripts load in production build only
- [ ] OG tags render correctly (test with og:image validator)
- [ ] Social sharing generates correct previews
- [ ] Git commit: `feat(seo): T16 — analytics and Open Graph optimization`

---

### - [ ] T17: Create JustDial & Google My Business Optimization Guide

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** T15

**Do:**
1. Create `.tasks/mahi-astro/reports/T17-local-seo-guide.html` — Zen HTML report:
   - Google Business Profile setup guide with exact steps
   - JustDial listing optimization guide
   - NAP consistency checklist
   - Review collection strategy
   - Google Posts content calendar template
   - Local citation building list (Sulekha, IndiaMART, etc.)
   - Social media profile setup checklist
2. Add UTM tracking parameters for JustDial/GMB links
3. Create a `public/.well-known/` directory for domain verification if needed

**Validate:**
- [ ] Guide is comprehensive and actionable
- [ ] Includes specific steps for both JustDial and GMB
- [ ] UTM parameters documented
- [ ] Git commit: `feat(seo): T17 — JustDial and GMB optimization guide`

---

### - [ ] V5: Gate — Verify SEO Implementation

**Type:** Verification | **Model:** claude-sonnet-4-6 | **Depends on:** T16, T17

**Checks:**
- [ ] Run Lighthouse SEO audit — target 90+ score
- [ ] Validate JSON-LD at validator.schema.org
- [ ] Verify sitemap.xml has all pages in all languages
- [ ] Verify hreflang consistency
- [ ] Check meta tags on 5 random pages
- [ ] If issues found → create FX-5 + VFX-5 in Appendix

---

## PHASE 7 — Visual Polish & Images

### - [ ] T18: Source and Place Hero Images, Icons, Decorative Elements

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** V3

**Knowledge Base:**
- R3 report (image requirements and sources)

**Do:**
1. Download free high-quality images from Unsplash/Pexels:
   - Homepage hero: cosmic/celestial theme
   - About page: spiritual/meditation background
   - Service-specific images (chakras, gemstones, vastu, kundli, etc.)
   - Blog featured images
2. Create SVG icons for:
   - 12 zodiac signs
   - Service icons (kundli, vastu, gemstone, chakra, mantra, etc.)
   - Decorative mandalas and borders
3. Place images in `public/images/` organized by section
4. Add placeholder for astrologer profile photo
5. Update all components to reference actual images

**Validate:**
- [ ] All hero images placed and rendering
- [ ] Icons display correctly at multiple sizes
- [ ] No broken image references
- [ ] Images are appropriately themed (Hindu/spiritual/astrology)
- [ ] Git commit: `feat(images): T18 — hero images, icons, decorative elements`

---

### - [ ] T19: Optimize All Images (WebP, Lazy Loading, Responsive)

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** T18

**Do:**
1. Install `@astrojs/image` or use Astro's built-in `<Image>` component
2. Convert all images to WebP format with fallbacks
3. Implement responsive `srcset` for different viewport sizes
4. Add lazy loading to below-fold images
5. Optimize SVG icons (SVGO)
6. Ensure hero images have `fetchpriority="high"` and `loading="eager"`
7. Add proper alt text to all images (translated per language)

**Validate:**
- [ ] All images serve WebP where supported
- [ ] Lazy loading works for below-fold images
- [ ] Alt text present on all images in correct language
- [ ] Total image payload under 500KB for initial page load
- [ ] Git commit: `feat(images): T19 — image optimization, WebP, lazy loading`

---

### - [ ] V6: Gate — Verify Visual Assets & Performance

**Type:** Verification | **Model:** claude-sonnet-4-6 | **Depends on:** T19

**Checks:**
- [ ] Lighthouse Performance score 90+
- [ ] No broken images on any page
- [ ] Images responsive at all breakpoints
- [ ] Alt text present and translated
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1
- [ ] If issues found → create FX-6 + VFX-6 in Appendix

---

## PHASE 8 — End-to-End Testing

### - [ ] T20: Write Playwright E2E Tests

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** V4, V5, V6

**Do:**
1. Install and configure Playwright: `npm init playwright@latest`
2. Create test suites:
   - `tests/navigation.spec.ts` — test all nav links, language switching, breadcrumbs
   - `tests/homepage.spec.ts` — hero renders, services grid, CTAs work, testimonials
   - `tests/services.spec.ts` — all 12 service pages load, FAQ accordion, related services
   - `tests/blog.spec.ts` — blog listing, individual post, category filter
   - `tests/contact.spec.ts` — form fields present, WhatsApp link, phone link
   - `tests/i18n.spec.ts` — language switching preserves page, correct content loads
   - `tests/seo.spec.ts` — meta tags, hreflang, schema markup present
   - `tests/responsive.spec.ts` — mobile, tablet, desktop layouts
   - `tests/accessibility.spec.ts` — axe-core audit, keyboard nav, ARIA
3. Each test covers all 3 languages
4. Include visual regression snapshots for key pages

**Validate:**
- [ ] All test files created
- [ ] Tests run and pass: `npx playwright test`
- [ ] Coverage: navigation, i18n, services, blog, contact, SEO, responsive, a11y
- [ ] Git commit: `feat(tests): T20 — Playwright E2E test suite`

---

### - [ ] V7: Gate — All Tests Pass

**Type:** Verification | **Model:** claude-sonnet-4-6 | **Depends on:** T20

**Checks:**
- [ ] `npx playwright test` — 100% pass rate
- [ ] No flaky tests
- [ ] Build succeeds: `npm run build`
- [ ] If tests fail → create FX-7 + VFX-7 in Appendix

---

## PHASE 9 — Deployment

### - [ ] T21: Initialize GitHub Repository

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** V7

**Do:**
1. Create `.gitignore` (node_modules, .astro, dist, .env, .tasks/)
2. Initialize git repo: `git init`
3. Create initial commit with all code
4. Create GitHub repo via `gh repo create belive-astrology --public`
5. Push to GitHub
6. Add README.md with project overview, setup, and deployment instructions

**Validate:**
- [ ] GitHub repo created and accessible
- [ ] All code pushed
- [ ] README explains setup and development
- [ ] Git commit: `chore(deploy): T21 — GitHub repository initialized`

---

### - [ ] T22: Deploy to Vercel

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** T21

**Do:**
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` to link project
3. Configure build settings:
   - Framework: Astro
   - Build command: `npm run build`
   - Output: `dist/`
4. Deploy: `vercel --prod`
5. Verify all pages load on production URL
6. Document deployment URL and settings

**Validate:**
- [ ] Site deploys successfully to Vercel
- [ ] All pages accessible on production URL
- [ ] All 3 languages work on production
- [ ] No console errors
- [ ] Git commit: `chore(deploy): T22 — deployed to Vercel`

---

### - [ ] V8: Gate — Final Production Verification

**Type:** Verification | **Model:** claude-sonnet-4-6 | **Depends on:** T22

**Checks:**
- [ ] All pages load on production URL in all 3 languages
- [ ] Lighthouse scores: Performance 90+, SEO 90+, Accessibility 90+, Best Practices 90+
- [ ] Mobile responsive on real devices (or emulator)
- [ ] WhatsApp/phone links work
- [ ] Contact form submits correctly
- [ ] Sitemap accessible at /sitemap-index.xml
- [ ] robots.txt accessible
- [ ] If issues found → create FX-8 + VFX-8 in Appendix

---

## PHASE 10 — CMS Integration (Post-Deploy)

### - [ ] T23: Integrate Keystatic CMS — Full Content Management

**Type:** Build | **Model:** claude-opus-4-6 | **Depends on:** V8

**Knowledge Base:**
- Keystatic — open source, Git-based CMS with visual editor, TypeScript support
- Official Astro integration: https://docs.astro.build/en/guides/cms/keystatic/
- Free: stores content as Markdown/JSON in Git repo (no database, no paid service)
- Works on Vercel free tier — admin panel at /keystatic route
- **Why Keystatic:** fully free, TypeScript-native, GitHub App auto-setup, clean admin UI, works with Astro + Vercel

**Do:**
1. Install Keystatic: `npm install @keystatic/core @keystatic/astro`
2. Configure `keystatic.config.ts` with ALL content collections:
   - **Blogs** → `src/content/blog/{lang}/` — title, excerpt, content (rich text), category, tags, hero image, SEO meta
   - **Events** → `src/data/events.json` — title, date, description, location, type (puja/workshop/talk), image
   - **Testimonials** → `src/data/testimonials.json` — client name, city, service, rating, text, date
   - **Services** → `src/content/services/{lang}/` — all service fields (intro, benefits, FAQs, process, SEO)
   - **i18n strings** → `src/content/i18n/{lang}.json` — editable UI text (nav labels, CTAs, footer, headings)
   - **Site Config** → `src/data/site-config.ts` — contact info, social links, astrologer bio (singleton)
3. Add Keystatic integration to `astro.config.mjs` (hybrid mode for /keystatic route)
4. Set up GitHub App for Keystatic (automated setup wizard)
5. Configure admin panel at `/keystatic` route
6. Test each collection: create → edit → delete → verify renders on site
7. Create `docs/cms-guide.md` — plain language guide for the astrologer:
   - How to log in (GitHub account)
   - How to create a blog post with images
   - How to add/edit events
   - How to manage testimonials
   - How to update service descriptions
   - How to edit navigation text and CTAs
   - How changes go live (save → auto-deploy → 30 seconds)

**Validate:**
- [ ] `/keystatic` admin panel loads on production
- [ ] Blog CRUD: create post → appears on site after Vercel deploy
- [ ] Events CRUD: add event → shows on events page
- [ ] Testimonials CRUD: add testimonial → shows on testimonials page and homepage
- [ ] Services: edit service description → updated on service page
- [ ] i18n: edit nav label → updated across site
- [ ] Content saves to Git repo correctly
- [ ] CMS guide complete and easy to follow
- [ ] Git commit: `feat(cms): T23 — Keystatic CMS for all content management`

---

### - [ ] V9: Gate — Verify CMS Functionality

**Type:** Verification | **Model:** claude-sonnet-4-6 | **Depends on:** T23

**Checks:**
- [ ] Admin panel accessible and functional on production
- [ ] All 6 collections editable (blogs, events, testimonials, services, i18n, site config)
- [ ] Content appears on site after save + deploy
- [ ] No regressions on existing pages
- [ ] Vercel hybrid mode works (static pages + /keystatic SSR)
- [ ] CMS guide is clear enough for non-technical user
- [ ] If issues found → create FX-9 + VFX-9 in Appendix

---

## APPENDIX — Fix Tasks

_Fix tasks will be created here by verification gates as issues are discovered._

### Template:

```
### - [ ] FX-N: Fix [Issue Description]
**Type:** Fix | **Model:** claude-sonnet-4-6 | **Depends on:** V[X]
**Error:** [Exact error or issue]
**Root Cause:** [Analysis]
**Fix:**
1. Step-by-step fix instructions
**Validate:**
- [ ] Issue resolved
- [ ] No regressions
- [ ] Git commit: `fix(scope): FX-N — description`
```

---

## Booking System Recommendations (Post-Launch)

### Recommended Architecture:
1. **Primary:** WhatsApp Business link (`wa.me/918154992727?text=...`) — floating button + hero CTA
2. **Secondary:** Cal.com or Calendly embedded booking page (for international clients, Google Calendar sync)
3. **Automation:** WhatsApp Business API (via WappBiz or Twilio) for:
   - Booking confirmations
   - Appointment reminders (24hr before)
   - Birth detail collection form
4. **Notifications:** Google Calendar integration for astrologer's schedule management
5. **CRM:** Simple Google Sheets integration for client records (via Zapier/Make)

### Future Enhancements:
- Online payment integration (Razorpay for India, Stripe for US)
- Client portal with consultation history
- Daily/weekly horoscope subscription (email + WhatsApp broadcast)
- Free Kundli generator tool (drives organic traffic)
