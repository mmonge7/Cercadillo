import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const chapters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/chapters' }),
  schema: z.object({
    number: z.number(),
    title: z.string(),
    dek: z.string(),
    order: z.number(),
    readingMinutes: z.number(),
  }),
});

const glosario = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glosario' }),
  schema: z.object({
    term: z.string(),
    category: z.enum(['Aperos', 'Naturaleza', 'Medidas', 'Topónimos', 'Oficios']),
    short: z.string(),
  }),
});

const personajes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/personajes' }),
  schema: z.object({
    name: z.string(),
    years: z.string(),
    role: z.string(),
    tag: z.string(),
  }),
});

export const collections = { chapters, glosario, personajes };
