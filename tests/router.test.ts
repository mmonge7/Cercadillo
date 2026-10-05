import { describe, expect, it } from 'vitest';
import { buildPath, parseLegacyHash, parsePath, TABS } from '../src/utils/router';

describe('rutas limpias', () => {
  it('abre el inicio cuando no hay ruta', () => {
    expect(parsePath('')).toEqual({ tab: 'inicio', target: null });
    expect(parsePath('/')).toEqual({ tab: 'inicio', target: null });
  });

  it('lee la sección de una ruta simple', () => {
    expect(parsePath('/lugares')).toEqual({ tab: 'lugares', target: null });
    expect(parsePath('/sobre-la-web')).toEqual({ tab: 'sobre-la-web', target: null });
  });

  it('lee la sección y el elemento concreto de una ruta profunda', () => {
    expect(parsePath('/libro/05-despoblado-ribas-flecha')).toEqual({
      tab: 'libro',
      target: '05-despoblado-ribas-flecha',
    });
    expect(parsePath('/galeria/foto-01')).toEqual({ tab: 'galeria', target: 'foto-01' });
  });

  it('ignora las barras finales', () => {
    expect(parsePath('/libro/')).toEqual({ tab: 'libro', target: null });
    expect(parsePath('/galeria/foto-01/')).toEqual({ tab: 'galeria', target: 'foto-01' });
  });

  it('cae en el inicio si la sección no existe', () => {
    expect(parsePath('/seccion-inventada')).toEqual({ tab: 'inicio', target: null });
  });

  it('construye rutas válidas, con Inicio apuntando a la raíz limpia', () => {
    expect(buildPath('inicio')).toBe('/');
    expect(buildPath('libro', '01-marco-geografico')).toBe('/libro/01-marco-geografico');
    expect(buildPath('seccion-inventada')).toBe('/');
  });

  it('ida y vuelta: lo que se construye se vuelve a leer igual', () => {
    for (const tab of TABS) {
      expect(parsePath(buildPath(tab))).toEqual({ tab, target: null });
      expect(parsePath(buildPath(tab, 'un-elemento'))).toEqual({ tab, target: 'un-elemento' });
    }
  });
});

describe('compatibilidad con enlaces antiguos (#/tab)', () => {
  it('reconoce el formato antiguo y lo traduce', () => {
    expect(parseLegacyHash('#/historia')).toEqual({ tab: 'historia', target: null });
    expect(parseLegacyHash('#/libro/05-despoblado-ribas-flecha')).toEqual({
      tab: 'libro',
      target: '05-despoblado-ribas-flecha',
    });
  });

  it('ignora hashes que no son rutas antiguas (anclajes normales de página)', () => {
    expect(parseLegacyHash('#fuentes-minas')).toBeNull();
    expect(parseLegacyHash('#un-slug-cualquiera')).toBeNull();
    expect(parseLegacyHash('')).toBeNull();
    expect(parseLegacyHash('#')).toBeNull();
  });

  it('ignora una sección antigua inventada en vez de forzar el inicio', () => {
    expect(parseLegacyHash('#/seccion-inventada')).toBeNull();
  });
});
