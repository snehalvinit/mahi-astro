import { z } from 'astro:content';

export const serviceSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  slug: z.string(),
  category: z.enum(['core-astrology', 'spiritual-healing']),
  description: z.string(),
  shortDescription: z.string(),
  introduction: z.string(),
  overview: z.string(),
  heroImage: z.string().optional(),
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
  seo: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string(),
  }),
});

export type ServiceContent = z.infer<typeof serviceSchema>;
