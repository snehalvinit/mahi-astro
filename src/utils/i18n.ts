import en from '../content/i18n/en.json';
import hi from '../content/i18n/hi.json';
import gu from '../content/i18n/gu.json';

const translations: Record<string, typeof en> = { en, hi, gu };

export const supportedLanguages = ['en', 'hi', 'gu'] as const;
export const defaultLanguage = 'en';

export type SupportedLanguage = (typeof supportedLanguages)[number];

export function getTranslations(lang: string = 'en') {
  return translations[lang] || translations.en;
}

export function isValidLanguage(lang: string): lang is SupportedLanguage {
  return supportedLanguages.includes(lang as SupportedLanguage);
}

export function getAlternateLanguages(lang: string): SupportedLanguage[] {
  return supportedLanguages.filter((l) => l !== lang);
}

export type Translations = typeof en;
