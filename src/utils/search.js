/** Longitud mínima de la consulta antes de buscar (evita ruido con 1 letra). */
export const MIN_QUERY_LENGTH = 2;

/**
 * Configuración de Fuse.js del buscador global. El título pesa más que el
 * extracto, y el cuerpo del texto se tiene en cuenta con poco peso para poder
 * encontrar una palabra que solo aparece dentro de un capítulo.
 */
export const SEARCH_OPTIONS = {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'excerpt', weight: 0.3 },
    { name: 'badge', weight: 0.1 },
    { name: 'content', weight: 0.1 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
};
