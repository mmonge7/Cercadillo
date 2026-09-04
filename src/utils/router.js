/*
 * Enrutado por hash. La navegación entre secciones es un simple cambio de
 * estado en React (instantáneo, sin recargar nada), pero el hash mantiene la
 * URL sincronizada para que funcionen el botón "atrás" del móvil, los enlaces
 * compartidos y los marcadores del navegador.
 */

export const TABS = [
  'inicio',
  'historia',
  'lugares',
  'ni-catas-ni-minas',
  'fiestas',
  'escudo',
  'iglesia',
  'libro',
  'rutas',
  'genealogia',
  'glosario',
  'referencias',
  'sobre-la-web',
];

export const DEFAULT_TAB = 'inicio';

/** Lee una ruta (#/libro/05-despoblado-ribas-flecha) y devuelve { tab, target }. */
export function parseHash(hash) {
  const clean = String(hash || '')
    .replace(/^#\/?/, '')
    .replace(/\/+$/, '');
  if (!clean) return { tab: DEFAULT_TAB, target: null };

  const [tab, ...rest] = clean.split('/');
  if (!TABS.includes(tab)) return { tab: DEFAULT_TAB, target: null };

  return { tab, target: rest.length ? decodeURIComponent(rest.join('/')) : null };
}

/** Construye el hash de una sección, con su ancla opcional. */
export function buildHash(tab, target) {
  if (!TABS.includes(tab)) return '#/';
  if (!target) return `#/${tab}`;
  return `#/${tab}/${encodeURIComponent(target)}`;
}
