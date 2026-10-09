/*
 * Lista única de rutas de la web, compartida por generate-sitemap.mjs
 * (qué URLs anunciar a los buscadores) y prerender.mjs (qué URLs generar
 * como HTML estático real para que esos mismos buscadores puedan indexarlas
 * -- ver prerender.mjs para el porqué).
 *
 * 'escudo' se excluye a propósito: está oculta de la navegación (Cercadillo
 * no tiene escudo oficial todavía, ver src/components/Nav.jsx) y no interesa
 * indexarla mientras no tenga contenido real.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const rootDir = path.resolve(fileURLToPath(import.meta.url), '../../');

export const SECTIONS = [
  { tab: 'inicio', priority: '1.0', changefreq: 'weekly' },
  { tab: 'historia', priority: '0.7', changefreq: 'monthly' },
  { tab: 'lugares', priority: '0.7', changefreq: 'monthly' },
  { tab: 'ni-catas-ni-minas', priority: '0.9', changefreq: 'weekly' },
  { tab: 'fauna-flora', priority: '0.6', changefreq: 'monthly' },
  { tab: 'fiestas', priority: '0.6', changefreq: 'monthly' },
  { tab: 'iglesia', priority: '0.6', changefreq: 'monthly' },
  { tab: 'libro', priority: '0.7', changefreq: 'monthly' },
  { tab: 'rutas', priority: '0.5', changefreq: 'monthly' },
  { tab: 'genealogia', priority: '0.5', changefreq: 'monthly' },
  { tab: 'galeria', priority: '0.5', changefreq: 'monthly' },
  { tab: 'referencias', priority: '0.4', changefreq: 'yearly' },
  { tab: 'sobre-la-web', priority: '0.3', changefreq: 'yearly' },
];

export function pathForTab(tab) {
  return tab === 'inicio' ? '/' : `/${tab}`;
}

/** Capítulos de "El Libro" generados por build-content-data.mjs (puede no existir aún). */
export async function getChapters() {
  try {
    const mod = await import(path.join(rootDir, 'src/data/chaptersData.js'));
    return mod.chapters ?? [];
  } catch {
    return [];
  }
}

/** Todas las rutas reales de la app: las secciones + un capítulo por libro. */
export async function getAllRoutePaths() {
  const chapters = await getChapters();
  return [
    ...SECTIONS.map((s) => pathForTab(s.tab)),
    ...chapters.map((c) => `/libro/${encodeURIComponent(c.id)}`),
  ];
}
