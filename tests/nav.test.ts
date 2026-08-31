import { describe, expect, it } from 'vitest';
import { isActiveHref } from '../src/utils/nav';

describe('isActiveHref (navegación)', () => {
  const base = '/moriscos-wiki/';

  it('marca "Inicio" como activo solo en la portada exacta', () => {
    expect(isActiveHref('/moriscos-wiki/', base, '/')).toBe(true);
    expect(isActiveHref('/moriscos-wiki', base, '/')).toBe(true);
    expect(isActiveHref('/moriscos-wiki/libro', base, '/')).toBe(false);
  });

  it('marca una sección como activa en la propia página y en sus subrutas', () => {
    expect(isActiveHref('/moriscos-wiki/libro', base, '/libro')).toBe(true);
    expect(isActiveHref('/moriscos-wiki/libro/05-despoblado-ribas-flecha', base, '/libro')).toBe(true);
  });

  it('no marca como activas secciones que no coinciden', () => {
    expect(isActiveHref('/moriscos-wiki/glosario', base, '/libro')).toBe(false);
    expect(isActiveHref('/moriscos-wiki/genealogia', base, '/ruta-nocturna')).toBe(false);
  });

  it('ignora barras finales al comparar rutas', () => {
    expect(isActiveHref('/moriscos-wiki/libro/', base, '/libro')).toBe(true);
  });
});
