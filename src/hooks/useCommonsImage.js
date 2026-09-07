import { useEffect, useState } from 'react';

/*
 * Trae una imagen de referencia de Wikimedia Commons para una especie, a
 * partir de su nombre científico. Commons expone una API pública, sin
 * autenticación y con CORS abierto (origin=*), ideal para no tener que
 * alojar ni mantener fotografías propias de cada especie.
 *
 * Las respuestas se cachean en localStorage 30 días (incluyendo el caso
 * "no se encontró nada", para no repetir la búsqueda en cada visita).
 */

const CACHE_PREFIX = 'cercadillo:commons-img:';
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 días

function readCache(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.cachedAt !== 'number') return undefined;
    if (Date.now() - parsed.cachedAt > CACHE_TTL_MS) return undefined;
    return parsed.value;
  } catch {
    return undefined;
  }
}

function writeCache(key, value) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ cachedAt: Date.now(), value }));
  } catch {
    // localStorage puede fallar (modo privado, cuota llena): no es crítico, se
    // limita a repetir la búsqueda en la próxima visita.
  }
}

async function fetchCommonsImage(scientificName) {
  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: `${scientificName} filetype:bitmap`,
    gsrlimit: '1',
    gsrnamespace: '6',
    prop: 'imageinfo',
    iiprop: 'url|extmetadata',
    iiurlwidth: '480',
    format: 'json',
    origin: '*',
  });

  const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params.toString()}`);
  if (!res.ok) throw new Error(`Commons API respondió ${res.status}`);

  const data = await res.json();
  const pages = data?.query?.pages;
  if (!pages) return { found: false };

  const page = Object.values(pages)[0];
  const info = page?.imageinfo?.[0];
  if (!info) return { found: false };

  const meta = info.extmetadata || {};
  const stripHtml = (html) => (html ? String(html).replace(/<[^>]*>/g, '').trim() : '');

  return {
    found: true,
    thumbUrl: info.thumburl || info.url,
    pageUrl: info.descriptionurl,
    author: stripHtml(meta.Artist?.value) || null,
    license: meta.LicenseShortName?.value || null,
  };
}

/**
 * @param {string|null|undefined} scientificName
 * @returns {{ status: 'loading'|'ready'|'empty'|'error', image: object|null }}
 */
export function useCommonsImage(scientificName) {
  const [state, setState] = useState({ status: 'loading', image: null });

  useEffect(() => {
    if (!scientificName) {
      setState({ status: 'empty', image: null });
      return undefined;
    }

    let cancelled = false;
    setState({ status: 'loading', image: null });

    const cached = readCache(scientificName);
    if (cached !== undefined) {
      if (!cancelled) {
        setState(cached.found ? { status: 'ready', image: cached } : { status: 'empty', image: null });
      }
      return () => {
        cancelled = true;
      };
    }

    fetchCommonsImage(scientificName)
      .then((result) => {
        writeCache(scientificName, result);
        if (cancelled) return;
        setState(result.found ? { status: 'ready', image: result } : { status: 'empty', image: null });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', image: null });
      });

    return () => {
      cancelled = true;
    };
  }, [scientificName]);

  return state;
}
