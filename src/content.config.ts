import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { serviceSchema } from './schemas/service-content.schema';

const i18n = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/i18n' }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/services' }),
  schema: serviceSchema,
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
