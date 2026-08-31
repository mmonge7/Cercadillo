import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { routePoints } from '../data/route';


export const prerender = true;

export type SearchItem = {
  id: string;
  title: string;
  excerpt: string;
  /** Texto adicional no mostrado en la tarjeta, solo para que la búsqueda encuentre coincidencias dentro del cuerpo del capítulo. */
  content?: string;
  href: string;
  badge: string;
};

// Quita la sintaxis Markdown más habitual para dejar texto plano buscable.
function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const GET: APIRoute = async () => {
  const chapters = await getCollection('chapters');
  const glosario = await getCollection('glosario');
  const personajes = await getCollection('personajes');

  const items: SearchItem[] = [
    ...chapters.map((c) => ({
      id: `chapter-${c.id}`,
      title: `Cap. ${c.data.number} · ${c.data.title}`,
      excerpt: c.data.dek,
      content: stripMarkdown(c.body ?? '').slice(0, 6000),
      href: `/libro/${c.id}`,
      badge: `Capítulo ${c.data.number}`,
    })),
    ...glosario.map((g) => ({
      id: `glosario-${g.id}`,
      title: g.data.term,
      excerpt: g.data.short,
      href: `/glosario#${g.id}`,
      badge: `Glosario · ${g.data.category}`,
    })),
    ...personajes.map((p) => ({
      id: `personaje-${p.id}`,
      title: p.data.name,
      excerpt: p.data.role,
      href: `/genealogia#${p.id}`,
      badge: 'Personaje',
    })),
    ...routePoints.map((r) => ({
      id: `ruta-${r.id}`,
      title: r.name,
      excerpt: r.description,
      href: `/ruta-nocturna#${r.id}`,
      badge: `Ruta Nocturna · km ${r.distanceKm}`,
    })),
    // Páginas estáticas del sitio, para que la búsqueda también las encuentre.
    {
      id: 'page-inicio',
      title: 'Inicio',
      excerpt: 'Portada de Moriscos: Memoria & Territorio, con los cuatro momentos del pueblo y los capítulos del libro.',
      href: '/',
      badge: 'Página',
    },
    {
      id: 'page-genealogia',
      title: 'Genealogía y paisanos ilustres',
      excerpt: 'Bosque genealógico, personajes históricos y cómo acreditarte como morisqueño.',
      href: '/genealogia',
      badge: 'Página',
    },
    {
      id: 'page-ruta-nocturna',
      title: 'Ruta Nocturna',
      excerpt: 'Mapa interactivo con los puntos de interés de la ruta nocturna por Moriscos.',
      href: '/ruta-nocturna',
      badge: 'Página',
    },
    {
      id: 'page-fiestas',
      title: 'Fiestas y Tradiciones',
      excerpt: 'Fiestas patronales de la Virgen de la Peregrina, San Pedro Apóstol, San Isidro Labrador y el Lunes de Agua.',
      content:
        'chupinazo procesión verbena orquesta paella popular acogótala pedida de la botella semana cultural asaltacalles fútbol sala solteros casados hornazo motocross tiradas al plato',
      href: '/fiestas',
      badge: 'Página',
    },
    {
      id: 'page-iglesia',
      title: 'La Iglesia de San Pedro Apóstol',
      excerpt: 'Historia, arquitectura y tesoros artísticos de la Iglesia Parroquial de San Pedro Apóstol, el monumento más importante de Moriscos.',
      content:
        'retablo rococó espadaña ábside mudéjar techumbres armaduras virgen peregrina lienzo barroco museo de bellas artes de salamanca cofradía catastro ensenada madoz catedral de la armuña',
      href: '/iglesia',
      badge: 'Página',
    },
    {
      id: 'page-escudo',
      title: 'El Escudo de Moriscos',
      excerpt: 'Significado del escudo heráldico oficial: la cruz recruzada, El Hoyo, el trigo, el zumaque, la luna creciente y la Corona Real.',
      content:
        'escudo heráldico oficial ayuntamiento cruz recruzada luna creciente zumaque trigo corona real gules oro azur entado en punta partido',
      href: '/escudo',
      badge: 'Página',
    },
    {
      id: 'page-sobre-la-web',
      title: 'Sobre la web',
      excerpt: 'Por qué existe esta web, de dónde procede la información y cómo está construida.',
      content:
        'código abierto github proyecto independiente contacto stack técnico astro tailwind pwa',
      href: '/sobre-la-web',
      badge: 'Página',
    },
  ];

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' },
  });
};
