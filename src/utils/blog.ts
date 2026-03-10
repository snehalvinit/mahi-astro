import { getCollection } from 'astro:content';
import type { SupportedLanguage } from './i18n';
import type { BlogPost } from '../schemas/blog-content.schema';

/**
 * Get all blog posts for a given language, sorted by date (newest first).
 * Currently only English content exists — other languages fall back to English.
 */
export async function getBlogPostsForLanguage(
  lang: SupportedLanguage
): Promise<BlogPost[]> {
  const allPosts = await getCollection('blog');

  // Try language-specific entries first
  const langPosts = allPosts.filter((p) => p.id.startsWith(`${lang}/`));
  const posts = langPosts.length > 0
    ? langPosts.map((p) => p.data as BlogPost)
    : allPosts.map((p) => p.data as BlogPost);

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
  const allPosts = await getCollection('blog');
  return allPosts.map((p) => p.data.slug);
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
