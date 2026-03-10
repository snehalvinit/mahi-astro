import { getCollection } from 'astro:content';
import type { SupportedLanguage } from './i18n';
import type { BlogPost } from '../schemas/blog-content.schema';

const collectionMap = {
  en: 'blogEn',
  hi: 'blogHi',
  gu: 'blogGu',
} as const;

/**
 * Get all blog posts for a given language, sorted by date (newest first).
 */
export async function getBlogPostsForLanguage(
  lang: SupportedLanguage
): Promise<BlogPost[]> {
  const collectionName = collectionMap[lang];
  let posts: BlogPost[] = [];

  try {
    const entries = await getCollection(collectionName);
    if (entries.length > 0) {
      posts = entries.map((p) => p.data as BlogPost);
    }
  } catch {
    // Collection may not exist yet
  }

  // Fall back to English
  if (posts.length === 0) {
    const enEntries = await getCollection('blogEn');
    posts = enEntries.map((p) => p.data as BlogPost);
  }

  // Sort by publish date descending
  return posts.sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export async function getBlogPostBySlug(
  lang: SupportedLanguage,
  slug: string
): Promise<BlogPost | undefined> {
  const posts = await getBlogPostsForLanguage(lang);
  return posts.find((p) => p.slug === slug);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const enPosts = await getCollection('blogEn');
  return enPosts.map((p) => p.data.slug);
}

export function getBlogCategories(posts: BlogPost[]): string[] {
  const cats = new Set(posts.map((p) => p.category));
  return Array.from(cats).sort();
}

export function formatDate(dateStr: string, lang: SupportedLanguage): string {
  const localeMap: Record<SupportedLanguage, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    gu: 'gu-IN',
  };
  return new Date(dateStr).toLocaleDateString(localeMap[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
