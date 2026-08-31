const normalize = (path: string) => path.replace(/\/+$/, '') || '/';

/** Determines whether a nav link href matches the current pathname, respecting the BASE_URL prefix. */
export function isActiveHref(currentPath: string, base: string, href: string): boolean {
  const full = normalize(base + href.replace(/^\//, ''));
  const current = normalize(currentPath);
  const baseNormalized = normalize(base);
  return href === '/' ? current === full || current === baseNormalized : current.startsWith(full);
}
