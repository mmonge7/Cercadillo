import { describe, expect, it } from 'vitest';
import { TABS } from '../src/utils/router';
import { SEO } from '../src/data/seo';
import { getRouteMeta } from '../src/utils/seo';
import { chapters } from '../src/data/chaptersData';

describe('tabla SEO (src/data/seo.js)', () => {
  it('tiene título y descripción para cada sección de TABS (router.js)', () => {
    for (const tab of TABS) {
      expect(SEO[tab], `Falta SEO['${tab}']`).toBeTruthy();
      expect(SEO[tab].title.length).toBeGreaterThan(0);
      expect(SEO[tab].title.length).toBeLessThanOrEqual(70);
      expect(SEO[tab].description.length).toBeGreaterThan(0);
      expect(SEO[tab].description.length).toBeLessThanOrEqual(165);
    }
  });
});

describe('getRouteMeta (src/utils/seo.js)', () => {
  it('genera metadatos distintos (y válidos) para cada sección real de la app', () => {
    const seen = new Set<string>();
    for (const tab of TABS) {
      const meta = getRouteMeta(tab, null);
      expect(meta.title).toBeTruthy();
      expect(meta.description).toBeTruthy();
      expect(meta.canonical).toMatch(/^https:\/\/infocercadillo\.es\//);
      expect(meta.ogImage).toMatch(/^https:\/\/infocercadillo\.es\//);
      // Cada sección debe tener su propio título: si dos coincidieran, Google
      // las trataría como contenido duplicado.
      expect(seen.has(meta.title), `título repetido para '${tab}': ${meta.title}`).toBe(false);
      seen.add(meta.title);
    }
  });

  it('la portada (inicio) lleva canonical a la raíz y JSON-LD de tipo Place', () => {
    const meta = getRouteMeta('inicio', null);
    expect(meta.canonical).toBe('https://infocercadillo.es/');
    expect(meta.jsonLdPlace).toMatchObject({ '@type': 'Place', name: 'Cercadillo' });
  });

  it('el resto de secciones no llevan Place (solo tiene sentido en portada)', () => {
    expect(getRouteMeta('ni-catas-ni-minas', null).jsonLdPlace).toBeNull();
    expect(getRouteMeta('libro', null).jsonLdPlace).toBeNull();
  });

  it('"ni-catas-ni-minas" usa la foto de la mina como imagen social, no la genérica', () => {
    const meta = getRouteMeta('ni-catas-ni-minas', null);
    expect(meta.ogImage).toBe('https://infocercadillo.es/images/minas/hero-bg.jpg');
  });

  it('cada capítulo de El Libro tiene su propio título y descripción (su "dek")', () => {
    expect(chapters.length).toBeGreaterThan(0);
    const seen = new Set<string>();
    for (const chapter of chapters) {
      const meta = getRouteMeta('libro', chapter.id);
      expect(meta.title).toContain(chapter.title);
      expect(meta.description).toBe(chapter.dek);
      expect(meta.canonical).toBe(`https://infocercadillo.es/libro/${chapter.id}`);
      expect(seen.has(meta.title)).toBe(false);
      seen.add(meta.title);
    }
  });

  it('un target desconocido en El Libro cae en el título/descripción genéricos de la sección', () => {
    const meta = getRouteMeta('libro', 'capitulo-que-no-existe');
    expect(meta.title).toBe(SEO.libro.title);
    expect(meta.description).toBe(SEO.libro.description);
  });
});
