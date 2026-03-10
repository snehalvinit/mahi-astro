import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { serviceSchema } from './schemas/service-content.schema';
import { blogSchema } from './schemas/blog-content.schema';

const i18n = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/i18n' }),
});

const servicesEn = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/services/en' }),
  schema: serviceSchema,
});

const servicesHi = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/services/hi' }),
  schema: serviceSchema,
});

const servicesGu = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/services/gu' }),
  schema: serviceSchema,
});

const blogEn = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/blog/en' }),
  schema: blogSchema,
});

const blogHi = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/blog/hi' }),
  schema: blogSchema,
});

const blogGu = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/blog/gu' }),
  schema: blogSchema,
});

export const collections = {
  i18n,
  servicesEn, servicesHi, servicesGu,
  blogEn, blogHi, blogGu,
};
