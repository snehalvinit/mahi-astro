import { getCollection } from 'astro:content';
import type { SupportedLanguage } from './i18n';
import type { ServiceContent } from '../schemas/service-content.schema';

/**
 * Get all services for a given language.
 * Currently only English content exists — other languages fall back to English.
 * When translated content is added (T11/T12), the glob loader will include
 * files from hi/ and gu/ directories with IDs like "hi/slug" or "gu/slug".
 * At that point, update this function to filter by lang prefix.
 */
export async function getServicesForLanguage(
  lang: SupportedLanguage
): Promise<ServiceContent[]> {
  const allServices = await getCollection('services');

  // Try language-specific entries first (e.g., "hi/vedic-astrology-kundli-reading")
  const langServices = allServices.filter((s) => s.id.startsWith(`${lang}/`));
  if (langServices.length > 0) {
    return langServices.map((s) => s.data as ServiceContent);
  }

  // Fall back to all entries (English-only content has no prefix)
  return allServices.map((s) => s.data as ServiceContent);
}

export async function getServiceBySlug(
  lang: SupportedLanguage,
  slug: string
): Promise<ServiceContent | undefined> {
  const services = await getServicesForLanguage(lang);
  return services.find((s) => s.slug === slug);
}

export async function getAllServiceSlugs(): Promise<string[]> {
  const allServices = await getCollection('services');
  return allServices.map((s) => s.data.slug);
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
