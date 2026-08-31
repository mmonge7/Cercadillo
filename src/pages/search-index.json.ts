import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { routePoints } from '../data/route';


export const prerender = true;

export type SearchItem = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  badge: string;
};

export const GET: APIRoute = async () => {
  const chapters = await getCollection('chapters');
  const glosario = await getCollection('glosario');
  const personajes = await getCollection('personajes');

  const items: SearchItem[] = [
    ...chapters.map((c) => ({
      id: `chapter-${c.id}`,
      title: `Cap. ${c.data.number} · ${c.data.title}`,
      excerpt: c.data.dek,
      href: `/libro/${c.id}`,
      badge: `Capítulo ${c.data.number}`,
    })),
    ...glosario.map((g) => ({
      id: `glosario-${g.id}`,
      title: g.data.term,
      excerpt: g.data.short,
      href: `/glosario#${g.id}`,
      badge: `Glosario · ${g.data.category}`,
    })),
    ...personajes.map((p) => ({
      id: `personaje-${p.id}`,
      title: p.data.name,
      excerpt: p.data.role,
      href: `/genealogia#${p.id}`,
      badge: 'Personaje',
    })),
    ...routePoints.map((r) => ({
      id: `ruta-${r.id}`,
      title: r.name,
      excerpt: r.description,
      href: `/ruta-nocturna#${r.id}`,
      badge: `Ruta Nocturna · km ${r.distanceKm}`,
    })),
  ];

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' },
  });
};
