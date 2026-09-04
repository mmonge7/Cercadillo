import { describe, expect, it } from 'vitest';
import Fuse from 'fuse.js';
import { searchIndex } from '../src/data/searchIndex';
import { MIN_QUERY_LENGTH, SEARCH_OPTIONS } from '../src/utils/search';
import { TABS } from '../src/utils/router';

const fuse = new Fuse(searchIndex, SEARCH_OPTIONS);
const search = (q: string) => fuse.search(q).map((r) => r.item);

describe('buscador global (Fuse.js sobre el índice real)', () => {
  // El glosario y los personajes están vacíos a propósito (ver README,
  // sección 12: aún no hay fuentes públicas fiables sobre Cercadillo para
  // esas dos colecciones), así que hoy el índice solo trae los capítulos
  // del libro y las secciones estáticas de la app.
  it('el índice apunta siempre a secciones que existen', () => {
    expect(searchIndex.length).toBeGreaterThan(10);
    for (const item of searchIndex) {
      expect(TABS).toContain(item.tab);
      expect(item.title.length).toBeGreaterThan(0);
    }
  });

  it('encuentra una sección estática por palabra clave', () => {
    const results = search('ermita');
    expect(results.some((r) => r.tab === 'lugares')).toBe(true);
  });

  it('tolera una errata leve', () => {
    expect(search('Atinza').some((r) => r.target === '02-origenes-medievales-comun-de-atienza')).toBe(true);
  });

  it('encuentra un capítulo por su extracto y devuelve su slug', () => {
    const results = search('fuero de 1149');
    expect(results.some((r) => r.tab === 'libro' && r.target === '02-origenes-medievales-comun-de-atienza')).toBe(
      true,
    );
  });

  it('encuentra contenido que solo aparece en el cuerpo del capítulo', () => {
    expect(search('Alcolea de las Peñas').some((r) => r.tab === 'libro')).toBe(true);
  });

  it('no devuelve resultados para un término sin relación', () => {
    expect(search('xilófono intergaláctico')).toHaveLength(0);
  });

  it('exige un mínimo de 2 letras antes de buscar', () => {
    const isTooShort = (q: string) => q.trim().length > 0 && q.trim().length < MIN_QUERY_LENGTH;
    expect(isTooShort('m')).toBe(true);
    expect(isTooShort('ma')).toBe(false);
    expect(isTooShort('')).toBe(false);
  });
});
