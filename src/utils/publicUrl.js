/**
 * Devuelve la URL correcta para un archivo servido desde /public, teniendo en
 * cuenta el `base` configurado en vite.config.js. Ese `base` cambia según
 * dónde se sirva la web (subcarpeta de GitHub Pages como /Cercadillo/, o la
 * raíz de un dominio propio como cercadillo.es), así que cualquier imagen
 * referenciada "a pelo" con una ruta que empiece por "/" debe pasar por aquí
 * para que funcione en los dos sitios sin tocar código.
 */
export function publicUrl(path) {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}
