import { slugify } from './slugify.js';

/*
 * Analizador del subconjunto de markdown que usan los textos de src/content:
 * encabezados, párrafos, listas con y sin numerar, negrita, cursiva y enlaces.
 * Vive aparte de la parte de React para poder reutilizarlo también desde el
 * script de generación de contenido (scripts/build-content-data.mjs).
 */

/**
 * Un bloque de markdown ya analizado: los encabezados y párrafos llevan `text`
 * y las listas llevan `items`.
 *
 * @typedef {{ type: string, text?: string, items?: string[] }} MarkdownBlock
 */

/**
 * Agrupa las líneas del markdown en bloques (encabezado, lista o párrafo).
 *
 * @param {string} markdown
 * @returns {MarkdownBlock[]}
 */
export function toBlocks(markdown) {
  const lines = String(markdown || '')
    .replace(/\r\n/g, '\n')
    .split('\n');
  const blocks = [];
  let paragraph = [];
  let list = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: 'p', text: paragraph.join(' ') });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list) {
      blocks.push(list);
      list = null;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ type: `h${heading[1].length}`, text: heading[2] });
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.*)$/);
    const numbered = line.match(/^\d+\.\s+(.*)$/);
    if (bullet || numbered) {
      flushParagraph();
      const type = bullet ? 'ul' : 'ol';
      if (!list || list.type !== type) {
        flushList();
        list = { type, items: [] };
      }
      list.items.push((bullet || numbered)[1]);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
}

/** Devuelve los encabezados de nivel 2, para las tablas de contenidos. */
export function extractHeadings(markdown) {
  return toBlocks(markdown)
    .filter((b) => b.type === 'h2')
    .map((b) => ({ slug: slugify(b.text), text: b.text }));
}
