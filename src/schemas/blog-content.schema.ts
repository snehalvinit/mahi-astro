import { z } from 'astro:content';

export const blogSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  author: z.string(),
  publishDate: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  heroImage: z.string().optional(),
  readingTime: z.number(),
  relatedServices: z.array(z.string()).optional(),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string(),
  }),
});

export type BlogPost = z.infer<typeof blogSchema>;
