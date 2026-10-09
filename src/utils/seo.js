/*
 * Calcula y aplica los metadatos de src/data/seo.js a <head> en cada cambio
 * de ruta: <title>, meta description, canonical, Open Graph/Twitter Cards y
 * JSON-LD (WebSite + BreadcrumbList, y Place en Inicio). Es una SPA sin
 * servidor (GitHub Pages), así que esto ocurre en el cliente con un
 * useEffect -- no hace falta ninguna dependencia nueva (tipo react-helmet)
 * para algo tan puntual.
 *
 * getRouteMeta() es pura (sin tocar el DOM) a propósito: así se puede
 * comprobar con un test normal de Vitest (ver tests/seo.test.ts) que cada
 * ruta real de la app produce un título y descripción válidos, sin
 * necesidad de montar un navegador.
 *
 * Nota: Google ejecuta el JS antes de indexar, así que recoge estos
 * metadatos dinámicos sin problema. Otros rastreadores que NO ejecutan JS
 * (p.ej. el de las vistas previas de WhatsApp/Twitter al compartir un
 * enlace) solo verán los metadatos estáticos de index.html -- por eso esos
 * valores por defecto están alineados con los de "inicio" aquí.
 */
import { useEffect } from 'react';
import { SEO, SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, PLACE } from '../data/seo';
import { buildPath, DEFAULT_TAB } from './router';
import { navItems } from '../components/Nav';
import { chapters } from '../data/chaptersData';

function labelFor(tab) {
  return navItems.find((n) => n.id === tab)?.label ?? tab;
}

/**
 * Calcula el título, descripción, imagen social, canonical y JSON-LD de una
 * ruta (tab + target opcional, p.ej. un capítulo de "El Libro"). No toca el
 * DOM: devuelve un objeto plano para que useSeo() lo aplique, y para que los
 * tests puedan comprobarlo directamente.
 */
export function getRouteMeta(tab, target) {
  const base = SEO[tab] ?? SEO[DEFAULT_TAB];
  let title = base.title;
  let description = base.description;
  const ogImage = base.ogImage ?? DEFAULT_OG_IMAGE;

  const crumbs = [{ name: SITE_NAME, path: '/' }];
  if (tab !== DEFAULT_TAB) {
    crumbs.push({ name: labelFor(tab), path: buildPath(tab) });
  }

  if (tab === 'libro' && target) {
    const chapter = chapters.find((c) => c.id === target);
    if (chapter) {
      title = `${chapter.title} · El Libro de Cercadillo`;
      description = chapter.dek || description;
      crumbs.push({ name: chapter.title, path: buildPath(tab, target) });
    }
  }

  const canonical = `${SITE_URL}${buildPath(tab, target)}`;

  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };

  const jsonLdPlace =
    tab === DEFAULT_TAB
      ? {
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: PLACE.name,
          geo: { '@type': 'GeoCoordinates', latitude: PLACE.lat, longitude: PLACE.lon },
          containedInPlace: PLACE.containedInPlace,
          url: SITE_URL,
        }
      : null;

  return { title, description, ogImage, canonical, jsonLdWebsite, jsonLdBreadcrumb, jsonLdPlace };
}

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  if (!data) {
    document.getElementById(id)?.remove();
    return;
  }
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/** Actualiza <head> para la ruta activa (tab + target opcional, p.ej. un capítulo). */
export function useSeo(tab, target) {
  useEffect(() => {
    const meta = getRouteMeta(tab, target);

    document.title = meta.title;
    upsertMeta('name', 'description', meta.description);
    upsertLink('canonical', meta.canonical);

    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', meta.canonical);
    upsertMeta('property', 'og:image', meta.ogImage);
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:image', meta.ogImage);

    upsertJsonLd('ld-website', meta.jsonLdWebsite);
    upsertJsonLd('ld-breadcrumb', meta.jsonLdBreadcrumb);
    // El Place solo describe el pueblo en su conjunto: se quita (jsonLdPlace
    // es null) fuera de Inicio para no dejarlo "pegado" en otras secciones.
    upsertJsonLd('ld-place', meta.jsonLdPlace);
  }, [tab, target]);
}
