# Believe Astrology — Pandit Shree Mahadev Joshi

Multilingual astrology website for **Pandit Shree Mahadev Joshi** — 20+ years of Vedic Astrology & Spiritual Consultation based in Ahmedabad, Gujarat.

> "Astrology is not about predicting a fixed fate, but about understanding the weather of the cosmos so you can sail your boat with wisdom."

## Features

- **Trilingual** — English, Hindi, and Gujarati with URL-based routing (`/en/`, `/hi/`, `/gu/`)
- **12 Service Pages** — Vedic Astrology, Horoscope Analysis, Vastu, Gemstones, Chakra Balancing, and more
- **Blog** — 6 astrology articles in all 3 languages
- **SEO Optimized** — JSON-LD schema markup, hreflang tags, sitemap, Open Graph, Twitter Cards
- **Responsive** — Mobile-first design with dark celestial hero sections
- **Accessible** — WCAG-compliant navigation and content structure
- **Performance** — Static site generation, optimized SVGs, lazy-loaded images

## Tech Stack

- [Astro 5.x](https://astro.build/) — Static site generator
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first styling
- [React](https://react.dev/) — Interactive components (language switcher, mobile menu)
- [Playwright](https://playwright.dev/) — E2E testing (149 tests)
- [Sharp](https://sharp.pixelplumbing.com/) — Image optimization

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:4321

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
  pages/[lang]/          # Language-routed pages (en, hi, gu)
  components/            # Astro & React components
  layouts/               # Page layout templates
  content/
    i18n/{en,hi,gu}.json # Translation strings
    services/{lang}/     # Service content per language
  data/                  # Testimonials, blog metadata
  utils/i18n.ts          # i18n helper functions
  styles/                # Global styles
public/
  images/                # SVG icons, hero backgrounds, OG images
```

## Testing

```bash
# Install Playwright browsers (first time)
npx playwright install chromium

# Run E2E tests
npx playwright test

# Run with UI
npx playwright test --ui
```

## Services Offered

Vedic Astrology & Kundli Reading | Horoscope Analysis | Marriage Guidance | Career Guidance | Finance Guidance | Health Guidance | Vastu Consultation | Gemstone Recommendations | Karma Counselling | Pancha Tatva Balancing | Seven Chakras Balancing | Vedic Spiritual Poojas

## Contact

- **Email:** mahadevjoshi91@gmail.com
- **WhatsApp:** +91 8154992727
- **Consultations:** In-person (Ahmedabad) + Zoom/WhatsApp (global)

## License

All rights reserved. This website and its content are proprietary to Believe Astrology.
