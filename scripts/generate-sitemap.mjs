/*
 * Genera public/sitemap.xml a partir de las secciones de la app (ver
 * scripts/routes.mjs) y los capítulos de "El Libro" (src/data/chaptersData.js,
 * generado por build-content-data.mjs -- por eso este script corre después
 * en el pipeline de "npm run content", ver package.json).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { rootDir, SECTIONS, getChapters, pathForTab } from './routes.mjs';

const SITE_URL = 'https://infocercadillo.es';

function escapeXml(value) {
  return String(value).replace(/&/g, '&amp;');
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  const chapters = await getChapters();

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
