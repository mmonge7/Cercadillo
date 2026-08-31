import { describe, expect, it } from 'vitest';
import Fuse from 'fuse.js';

// Mismo shape que genera src/pages/search-index.json.ts y misma configuración
// de Fuse que consume src/components/SearchModal.tsx.
type SearchItem = { id: string; title: string; excerpt: string; href: string; badge: string };

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

function buildFuse(items: SearchItem[]) {
  return new Fuse(items, { keys: ['title', 'excerpt', 'badge'], threshold: 0.35, ignoreLocation: true });
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

  it('no devuelve resultados para un término sin relación', () => {
    const results = buildFuse(sampleIndex).search('xilófono intergaláctico');
    expect(results).toHaveLength(0);
  });
});
