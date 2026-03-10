import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const i18n = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/i18n' }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/services' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    category: z.enum(['core-astrology', 'spiritual-healing']),
    description: z.string(),
    shortDescription: z.string(),
    benefits: z.array(z.string()),
    process: z.array(
      z.object({
        step: z.number(),
        title: z.string(),
        description: z.string(),
      })
    ),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
    keywords: z.array(z.string()),
    relatedServices: z.array(z.string()),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    content: z.string(),
    author: z.string(),
    publishDate: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    heroImage: z.string().optional(),
  }),
});

export const collections = { i18n, services, blog };
