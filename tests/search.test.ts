import { describe, expect, it } from 'vitest';
import Fuse from 'fuse.js';

// Mismo shape que genera src/pages/search-index.json.ts y misma configuración
// de Fuse que consume src/components/SearchModal.tsx.
type SearchItem = { id: string; title: string; excerpt: string; content?: string; href: string; badge: string };

const sampleIndex: SearchItem[] = [
  {
    id: 'glosario-maquila',
    title: 'Maquila',
    excerpt: 'Porción de grano o harina que el molinero cobraba por la molienda.',
    href: '/glosario#maquila',
    badge: 'Glosario · Medidas',
  },
  {
    id: 'chapter-05-despoblado-ribas-flecha',
    title: 'Cap. 5 · El Despoblado de Ribas y el Entorno de La Flecha',
    excerpt: 'Fray Luis de León y el soto de La Flecha.',
    content: 'El poeta agustino se refugió en el soto tras su encierro inquisitorial, a 7,7 km de Moriscos.',
    href: '/libro/05-despoblado-ribas-flecha',
    badge: 'Capítulo 5',
  },
  {
    id: 'personaje-eugenio-blanco-carbayo',
    title: 'Eugenio Blanco Carbayo',
    excerpt: 'Escultor naïf de imaginería y sillas de costura',
    href: '/genealogia#eugenio-blanco-carbayo',
    badge: 'Personaje',
  },
];

const MIN_QUERY_LENGTH = 3;

function buildFuse(items: SearchItem[]) {
  return new Fuse(items, {
    keys: [
      { name: 'title', weight: 0.5 },
      { name: 'excerpt', weight: 0.3 },
      { name: 'badge', weight: 0.1 },
      { name: 'content', weight: 0.1 },
    ],
    threshold: 0.3,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });
}

describe('buscador global (Fuse.js)', () => {
  it('encuentra un término del glosario por coincidencia exacta', () => {
    const results = buildFuse(sampleIndex).search('maquila');
    expect(results[0]?.item.id).toBe('glosario-maquila');
  });

  it('tolera una errata leve (búsqueda difusa)', () => {
    const results = buildFuse(sampleIndex).search('maqila');
    expect(results.some((r) => r.item.id === 'glosario-maquila')).toBe(true);
  });

  it('encuentra un capítulo por una palabra de su extracto, no solo del título', () => {
    const results = buildFuse(sampleIndex).search('Fray Luis');
    expect(results[0]?.item.id).toBe('chapter-05-despoblado-ribas-flecha');
  });

  it('encuentra un capítulo por una palabra solo presente en el cuerpo (content), no en título ni extracto', () => {
    const results = buildFuse(sampleIndex).search('inquisitorial');
    expect(results.some((r) => r.item.id === 'chapter-05-despoblado-ribas-flecha')).toBe(true);
  });

  it('no devuelve resultados para un término sin relación', () => {
    const results = buildFuse(sampleIndex).search('xilófono intergaláctico');
    expect(results).toHaveLength(0);
  });

  it('exige un mínimo de 3 letras antes de considerar que hay búsqueda', () => {
    const isTooShort = (q: string) => q.trim().length > 0 && q.trim().length < MIN_QUERY_LENGTH;
    expect(isTooShort('ma')).toBe(true);
    expect(isTooShort('maq')).toBe(false);
    expect(isTooShort('')).toBe(false);
  });
});

