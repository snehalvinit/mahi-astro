import { siteConfig } from '../data/site-config';
import type { SupportedLanguage } from './i18n';

const SITE_URL = 'https://believeastrology.com';

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
    description:
      'Vedic Astrology & Spiritual Consultation by Pandit Shree Mahadev Joshi — 20+ years experience in Kundli Reading, Horoscope Analysis, Vastu, and Spiritual Healing.',
    url: SITE_URL,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    image: `${SITE_URL}/images/og-default.svg`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.0225,
      longitude: 72.5714,
    },
    areaServed: [
      { '@type': 'City', name: 'Ahmedabad' },
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'Country', name: 'United States' },
    ],
    founder: personSchema(),
    availableLanguage: ['English', 'Hindi', 'Gujarati'],
  };
}

export function personSchema() {
  return {
    '@type': 'Person',
    name: siteConfig.astrologer.name,
    jobTitle: 'Vedic Astrologer & Spiritual Consultant',
    description: `${siteConfig.astrologer.experience} experience in ${siteConfig.astrologer.speciality}`,
    url: `${SITE_URL}/en/about`,
    knowsAbout: [
      'Vedic Astrology',
      'Kundli Reading',
      'Horoscope Analysis',
      'Vastu Consultation',
      'Gemstone Recommendations',
      'Spiritual Healing',
      'Karma Counselling',
    ],
  };
}

export function serviceSchema(service: {
  title: string;
  slug: string;
  shortDescription: string;
  seo: { title: string; description: string };
}, lang: SupportedLanguage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.seo.description,
    url: `${SITE_URL}/${lang}/services/${service.slug}`,
    provider: {
      '@type': 'ProfessionalService',
      name: siteConfig.name,
      url: SITE_URL,
    },
    areaServed: [
      { '@type': 'City', name: 'Ahmedabad' },
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'Country', name: 'United States' },
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceType: 'In-person and Online consultation',
      serviceUrl: `${SITE_URL}/${lang}/contact`,
    },
  };
}

export function articleSchema(post: {
  title: string;
  slug: string;
  excerpt: string;
  publishDate: string;
  author: string;
  tags: string[];
  seo: { title: string; description: string };
}, lang: SupportedLanguage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seo.description,
    url: `${SITE_URL}/${lang}/blog/${post.slug}`,
    datePublished: post.publishDate,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: SITE_URL,
    },
    keywords: post.tags.join(', '),
    inLanguage: lang,
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: SITE_URL,
    description:
      'Vedic Astrology & Spiritual Consultation by Pandit Shree Mahadev Joshi in Ahmedabad, Gujarat.',
    inLanguage: ['en', 'hi', 'gu'],
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: SITE_URL,
    },
  };
}
