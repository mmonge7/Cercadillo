import { describe, expect, it } from 'vitest';
import { chapters } from '../src/data/chaptersData';
import { personajes } from '../src/data/personajesData';
import { toBlocks } from '../src/utils/markdownBlocks';
import { slugify } from '../src/utils/slugify';

describe('contenido generado desde src/content', () => {
  it('los 6 capítulos llegan completos y en orden', () => {
    expect(chapters).toHaveLength(6);
    chapters.forEach((c, i) => {
      expect(c.number).toBe(i + 1);
      expect(c.title.length).toBeGreaterThan(0);
      expect(c.dek.length).toBeGreaterThan(0);
      expect(c.readingMinutes).toBeGreaterThan(0);
      expect(c.content.length).toBeGreaterThan(500);
      expect(c.headings.length).toBeGreaterThan(0);
    });
  });

  // Los personajes de Cercadillo aún no tienen fuentes públicas fiables
  // (ver README, sección 12) y hoy están vacíos a propósito: este test solo
  // valida la forma de cada entrada que se vaya añadiendo, no exige un
  // número mínimo.
  it('cada personaje, si lo hay, trae años, papel y etiqueta', () => {
    for (const p of personajes) {
      expect(p.years.length).toBeGreaterThan(0);
      expect(p.role.length).toBeGreaterThan(0);
      expect(p.tag.length).toBeGreaterThan(0);
    }
  });

  it('los identificadores del índice del capítulo coinciden con sus encabezados', () => {
    for (const chapter of chapters) {
      const realHeadings = toBlocks(chapter.content)
        .filter((b) => b.type === 'h2')
        .map((b) => slugify(b.text));
      expect(chapter.headings.map((h) => h.slug)).toEqual(realHeadings);
    }
  });
});

describe('markdown de los textos', () => {
  it('separa encabezados, párrafos y listas', () => {
    const blocks = toBlocks('## Título\n\nUn párrafo.\n\n- uno\n- dos\n\n1. primero\n2. segundo');
    expect(blocks.map((b) => b.type)).toEqual(['h2', 'p', 'ul', 'ol']);
    expect(blocks[2].items).toEqual(['uno', 'dos']);
    expect(blocks[3].items).toEqual(['primero', 'segundo']);
  });

  it('une en un solo párrafo las líneas seguidas', () => {
    const blocks = toBlocks('Primera línea\nsegunda línea.');
    expect(blocks).toHaveLength(1);
    expect(blocks[0].text).toBe('Primera línea segunda línea.');
  });

  it('no deja markdown en crudo dentro del texto de los capítulos', () => {
    // Si algún capítulo trajera sintaxis que el renderizador no entiende, el
    // lector vería los asteriscos o los corchetes tal cual en pantalla.
    for (const chapter of chapters) {
      expect(chapter.content).not.toMatch(/^\s*(>|\||```)/m);
    }
  });

  it('genera anclas sin acentos ni signos', () => {
    expect(slugify('Hidrología: arroyos, pontones y la charca')).toBe('hidrologia-arroyos-pontones-y-la-charca');
  });
});
