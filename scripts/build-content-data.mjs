/*
 * Convierte los markdown de src/content en módulos JS que la app importa
 * directamente. Así todo el contenido viaja dentro del bundle: la web abre
 * cualquier sección al instante y sigue funcionando sin conexión.
 *
 * Se ejecuta en cada `npm run build` y también con `npm run content`.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractHeadings } from '../src/utils/markdownBlocks.js';

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../../');
const contentDir = path.join(rootDir, 'src/content');
const dataDir = path.join(rootDir, 'src/data');

function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: text.trim() };

  const frontmatter = {};
  match[1].split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    } else if (val !== '' && !Number.isNaN(Number(val))) {
      val = Number(val);
    }
    frontmatter[key] = val;
  });

  return { frontmatter, body: match[2].trim() };
}

async function readCollection(name) {
  const dir = path.join(contentDir, name);
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.md')).sort();
  return Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(dir, file), 'utf8');
      const { frontmatter, body } = parseFrontmatter(raw);
      return { slug: file.replace(/\.md$/, ''), data: frontmatter, body };
    }),
  );
}

/** Recorta un texto por la última palabra completa, para extractos del buscador. */
function excerpt(text, max = 160) {
  const plain = text
    .replace(/^#{1,6}\s+.*$/gm, '')
    .replace(/[*_`>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (plain.length <= max) return plain;
  return `${plain.slice(0, plain.lastIndexOf(' ', max))}…`;
}

async function writeData(file, name, value) {
  await fs.writeFile(
    path.join(dataDir, file),
    `// Generado por scripts/build-content-data.mjs a partir de src/content. No editar a mano.\nexport const ${name} = ${JSON.stringify(value, null, 2)};\n`,
  );
}

async function processAll() {
  // 1. Capítulos del libro
  const chapters = (await readCollection('chapters'))
    .map(({ slug, data, body }) => ({
      id: slug,
      order: data.order ?? data.number ?? 0,
      number: data.number ?? data.order ?? 0,
      title: data.title || slug,
      dek: data.dek || '',
      readingMinutes: data.readingMinutes || 0,
      headings: extractHeadings(body),
      content: body,
    }))
    .sort((a, b) => a.order - b.order);

  // 2. Glosario etnográfico
  const glosario = (await readCollection('glosario'))
    .map(({ slug, data, body }) => ({
      id: slug,
      term: data.term || slug,
      category: data.category || 'General',
      short: data.short || '',
      content: body,
    }))
    .sort((a, b) => a.term.localeCompare(b.term, 'es'));

  // 3. Personajes (genealogía)
  const personajes = (await readCollection('personajes')).map(({ slug, data, body }) => ({
    id: slug,
    name: data.name || slug,
    years: data.years || '',
    role: data.role || '',
    tag: data.tag || '',
    content: body,
  }));

  await writeData('chaptersData.js', 'chapters', chapters);
  await writeData('glosarioData.js', 'glosario', glosario);
  await writeData('personajesData.js', 'personajes', personajes);

  // 4. Índice del buscador global. `tab` es la sección de la app y `target` el
  //    elemento concreto al que hay que saltar dentro de ella.
  const searchItems = [
    ...chapters.map((c) => ({
      id: `chapter-${c.id}`,
      tab: 'libro',
      target: c.id,
      title: `Cap. ${c.number} · ${c.title}`,
      excerpt: c.dek,
      content: excerpt(c.content, 1200),
      badge: `Capítulo ${c.number}`,
    })),
    ...glosario.map((g) => ({
      id: `glosario-${g.id}`,
      tab: 'glosario',
      target: g.id,
      title: g.term,
      excerpt: g.short || excerpt(g.content),
      content: excerpt(g.content, 600),
      badge: `Glosario · ${g.category}`,
    })),
    ...personajes.map((p) => ({
      id: `personaje-${p.id}`,
      tab: 'genealogia',
      target: p.id,
      title: p.name,
      excerpt: p.role || excerpt(p.content),
      content: excerpt(p.content, 600),
      badge: p.tag ? `Personaje · ${p.tag}` : 'Personaje',
    })),
    ...staticEntries,
  ];

  await writeData('searchIndex.js', 'searchIndex', searchItems);

  console.log(
    `Contenido generado: ${chapters.length} capítulos, ${glosario.length} términos, ${personajes.length} personajes, ${searchItems.length} entradas en el buscador.`,
  );
}

/* Secciones escritas directamente en las páginas React (no vienen de markdown)
   que también deben poder encontrarse desde el buscador. */
const staticEntries = [
  {
    id: 'seccion-historia',
    tab: 'historia',
    target: null,
    title: 'Historia de Cercadillo',
    excerpt: 'Eje cronológico: repoblación medieval de 1085-1149, Edad Moderna, siglo XIX, 1973 y actualidad.',
    content: 'cronología historia repoblación Alfonso VI Alfonso VII fuero Comunidad de Atienza Madoz Siguenza 1973 INE',
    badge: 'Historia',
  },
  {
    id: 'seccion-lugares',
    tab: 'lugares',
    target: null,
    title: 'Lugares de Cercadillo',
    excerpt: 'El patrimonio documentado del pueblo: la iglesia, las dos ermitas, la fuente y el lavadero.',
    content: 'iglesia natividad ermita soledad santo domingo fuente lavadero patrimonio',
    badge: 'Lugares',
  },
  {
    id: 'iglesia-templo',
    tab: 'iglesia',
    target: null,
    title: 'Iglesia de la Natividad de Nuestra Señora',
    excerpt: 'Templo del siglo XVI de tres naves con altares platerescos, el monumento principal de Cercadillo.',
    content: 'iglesia natividad nuestra señora plateresco tres naves siglo XVI monumento',
    badge: 'Monumento',
  },
  {
    id: 'escudo-oficial',
    tab: 'escudo',
    target: null,
    title: 'Escudo heráldico de Moriscos',
    excerpt: 'Cruz recruzada de plata, El Hoyo, la espiga de trigo, el zumaque y la luna creciente.',
    content: 'heráldica gules oro azur cruz recruzada zumaque Rhus Coriaria luna creciente Corona Real cuartel',
    badge: 'Heráldica',
  },
  {
    id: 'fiestas-san-roque',
    tab: 'fiestas',
    target: null,
    title: 'Fiestas de San Roque',
    excerpt: 'Fiesta patronal de Cercadillo, los días 15 y 16 de agosto.',
    content: 'san roque fiestas patronales agosto morcilleros',
    badge: 'Fiestas',
  },
  {
    id: 'rutas-cercadillo',
    tab: 'rutas',
    target: null,
    title: 'Rutas por Cercadillo',
    excerpt: 'Rutas de senderismo y BTT que atraviesan Cercadillo, recopiladas de Wikiloc.',
    content: 'senderismo btt mountain bike wikiloc Riofrío del Llano Alcolea de las Peñas Atienza Imón Santamera',
    badge: 'Rutas',
  },
  {
    id: 'seccion-genealogia',
    tab: 'genealogia',
    target: null,
    title: 'Genealogía',
    excerpt: 'Página en construcción: próximamente, árbol genealógico y familias de Cercadillo.',
    content: 'genealogía página en construcción Cercadillo',
    badge: 'Genealogía',
  },
  {
    id: 'seccion-referencias',
    tab: 'referencias',
    target: null,
    title: 'Referencias y fuentes documentales',
    excerpt: 'Archivos, monografías, hemeroteca y portales digitales en los que se basa esta web.',
    content: 'bibliografía fuentes archivo diocesano Catastro de Ensenada Madoz INE IGN hemeroteca Morisqueños',
    badge: 'Fuentes',
  },
  {
    id: 'seccion-sobre',
    tab: 'sobre-la-web',
    target: null,
    title: 'Sobre esta web',
    excerpt: 'Por qué existe el proyecto, de dónde sale la información y cómo contactar o colaborar.',
    content: 'proyecto personal independiente contacto colaboración código abierto GitHub aviso Pablo Crespo Bellido',
    badge: 'El proyecto',
  },
];

processAll();
