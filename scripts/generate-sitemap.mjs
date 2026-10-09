/*
 * Genera public/sitemap.xml a partir de las secciones de la app (ver
 * src/components/Nav.jsx -> navItems) y los capítulos de "El Libro"
 * (src/data/chaptersData.js, generado por build-content-data.mjs -- por eso
 * este script corre despues en el pipeline de "npm run content", ver
 * package.json).
 *
 * 'escudo' se excluye a proposito: esta oculta de la navegacion (Cercadillo
 * no tiene escudo oficial todavia, ver Nav.jsx) y no interesa indexarla
 * mientras no tenga contenido real.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../../');
const SITE_URL = 'https://infocercadillo.es';

const SECTIONS = [
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

function pathForTab(tab) {
  return tab === 'inicio' ? '/' : `/${tab}`;
}

function escapeXml(value) {
  return String(value).replace(/&/g, '&amp;');
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);

  let chapters = [];
  try {
    const mod = await import(path.join(rootDir, 'src/data/chaptersData.js'));
    chapters = mod.chapters ?? [];
  } catch {
    // Sin capitulos generados todavia (p.ej. antes del primer `npm run
    // content`): el sitemap se genera igual, sin esas URLs.
  }

  const urls = [
    ...SECTIONS.map((s) => ({
      loc: `${SITE_URL}${pathForTab(s.tab)}`,
      changefreq: s.changefreq,
      priority: s.priority,
    })),
    ...chapters.map((c) => ({
      loc: `${SITE_URL}/libro/${encodeURIComponent(c.id)}`,
      changefreq: 'monthly',
      priority: '0.6',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      (u) =>
        `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join('\n')}\n</urlset>\n`;

  const outPath = path.join(rootDir, 'public/sitemap.xml');
  await fs.writeFile(outPath, xml, 'utf8');
  console.log(`sitemap.xml generado con ${urls.length} URLs -> ${path.relative(rootDir, outPath)}`);
}

main();
