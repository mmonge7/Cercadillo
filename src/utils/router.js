/*
 * Enrutado por ruta limpia (History API). La navegación entre secciones es un
 * simple cambio de estado en React (instantáneo, sin recargar nada), pero la
 * URL se mantiene sincronizada con history.pushState para que funcionen el
 * botón "atrás" del móvil, los enlaces compartidos y los marcadores del
 * navegador — igual que antes con el hash, pero con URLs limpias
 * (infocercadillo.es/historia en vez de infocercadillo.es/#/historia).
 *
 * En GitHub Pages (hosting estático, sin reescritura de servidor) esto
 * requiere el truco de public/404.html + el script de restauración en
 * index.html: ver esos dos archivos para la otra mitad del mecanismo.
 */

// BASE_URL es '/' cuando el sitio se sirve desde la raíz del dominio propio
// (el caso actual). Si en el futuro volviera a servirse desde una subcarpeta
// (p.ej. '/Cercadillo/'), las rutas se construyen y leen igualmente bien.
const BASE = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');

export const TABS = [
  'inicio',
  'historia',
  'lugares',
  'ni-catas-ni-minas',
  'fauna-flora',
  'fiestas',
  'escudo',
  'iglesia',
  'libro',
  'rutas',
  'genealogia',
  'galeria',
  'referencias',
  'sobre-la-web',
];

export const DEFAULT_TAB = 'inicio';

/** Lee una ruta (/libro/05-despoblado-ribas-flecha) y devuelve { tab, target }. */
export function parsePath(pathname) {
  let clean = String(pathname || '/');
  if (BASE && clean.startsWith(BASE)) clean = clean.slice(BASE.length);
  clean = clean.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!clean) return { tab: DEFAULT_TAB, target: null };

  const [tab, ...rest] = clean.split('/');
  if (!TABS.includes(tab)) return { tab: DEFAULT_TAB, target: null };

  return { tab, target: rest.length ? decodeURIComponent(rest.join('/')) : null };
}

/** Construye la ruta de una sección, con su objetivo opcional. Inicio -> '/'. */
export function buildPath(tab, target) {
  if (!TABS.includes(tab) || (tab === DEFAULT_TAB && !target)) return `${BASE}/`;
  if (!target) return `${BASE}/${tab}`;
  return `${BASE}/${tab}/${encodeURIComponent(target)}`;
}

/**
 * Compatibilidad con los enlaces antiguos tipo #/historia o
 * #/libro/05-despoblado-ribas-flecha (formato usado antes de pasar a rutas
 * limpias). Devuelve null si el hash no tiene esa forma, para no interferir
 * con anclajes normales de la propia página (#fuentes-minas, #un-slug...),
 * que nunca empiezan por "#/".
 */
export function parseLegacyHash(hash) {
  const value = String(hash || '');
  if (!value.startsWith('#/')) return null;

  const clean = value.replace(/^#\/?/, '').replace(/\/+$/, '');
  if (!clean) return { tab: DEFAULT_TAB, target: null };

  const [tab, ...rest] = clean.split('/');
  if (!TABS.includes(tab)) return null;

  return { tab, target: rest.length ? decodeURIComponent(rest.join('/')) : null };
}
