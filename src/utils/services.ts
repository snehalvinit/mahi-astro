import { getCollection } from 'astro:content';
import type { SupportedLanguage } from './i18n';
import type { ServiceContent } from '../schemas/service-content.schema';

const collectionMap = {
  en: 'servicesEn',
  hi: 'servicesHi',
  gu: 'servicesGu',
} as const;

export async function getServicesForLanguage(
  lang: SupportedLanguage
): Promise<ServiceContent[]> {
  const collectionName = collectionMap[lang];
  try {
    const entries = await getCollection(collectionName);
    if (entries.length > 0) {
      return entries.map((s) => s.data as ServiceContent);
    }
  } catch {
    // Collection may not exist yet
  }

  // Fall back to English
  const enEntries = await getCollection('servicesEn');
  return enEntries.map((s) => s.data as ServiceContent);
}

export async function getServiceBySlug(
  lang: SupportedLanguage,
  slug: string
): Promise<ServiceContent | undefined> {
  const services = await getServicesForLanguage(lang);
  return services.find((s) => s.slug === slug);
}

export async function getAllServiceSlugs(): Promise<string[]> {
  const enServices = await getCollection('servicesEn');
  return enServices.map((s) => s.data.slug);
}

/** Map from translation key to service slug for linking from homepage grid */
export const serviceKeyToSlug: Record<string, string> = {
  kundli: 'vedic-astrology-kundli-reading',
  horoscope: 'horoscope-analysis-predictions',
  lifeGuidance: 'marriage-career-finance-health-guidance',
  vastu: 'vastu-consultation',
  gemstone: 'gemstone-recommendations',
  karma: 'karma-life-purpose-counselling',
  panchaTatva: 'pancha-tatva-balancing',
  chakra: 'seven-chakras-balancing',
  pooja: 'vedic-spiritual-poojas',
  yagna: 'vedic-karma-kand-yagnas',
  mrityunjay: 'maha-mrityunjaya-mantra-anushthan',
  mantra: 'mantras-chanting',
};
