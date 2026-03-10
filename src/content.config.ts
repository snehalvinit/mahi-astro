import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { serviceSchema } from './schemas/service-content.schema';
import { blogSchema } from './schemas/blog-content.schema';

const i18n = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/i18n' }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/services' }),
  schema: serviceSchema,
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/blog' }),
  schema: blogSchema,
});

export const collections = { i18n, services, blog };
