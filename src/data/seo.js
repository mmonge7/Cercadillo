/*
 * Metadatos SEO por sección: título, descripción e imagen social de cada
 * ruta. Los usa src/utils/seo.js para actualizar <title>, meta description,
 * Open Graph/Twitter Cards y el JSON-LD al navegar (ver App.jsx), ya que la
 * web es una SPA sin servidor y cada ruta necesita sus propios metadatos
 * para posicionar por separado (p.ej. "ni-catas-ni-minas" para búsquedas
 * sobre la mina de Oroberia, no solo para "Cercadillo").
 *
 * Títulos: ~60 caracteres. Descripciones: ~150-160 caracteres. Así no se
 * cortan en los resultados de Google.
 */
export const SITE_NAME = 'Cercadillo';
export const SITE_URL = 'https://infocercadillo.es';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.png`;

/** @type {Record<string, { title: string, description: string, ogImage?: string }>} */
export const SEO = {
  inicio: {
    title: 'Cercadillo · Historia, Lugares y Curiosidades',
    description:
      'Historia, geografía, etnografía y memoria viva de Cercadillo (Guadalajara, Sigüenza).',
  },
  historia: {
    title: 'Historia de Cercadillo (Guadalajara) · Pedanía de Sigüenza',
    description:
      'Línea de tiempo de Cercadillo (Guadalajara): de sus orígenes medievales en la Comunidad de Atienza a su integración en Sigüenza en 1973.',
  },
  lugares: {
    title: 'Lugares de Cercadillo: iglesia, fuentes, caminos y parajes',
    description:
      'Guía de los lugares de Cercadillo (Guadalajara): la iglesia, las fuentes, los caminos y los parajes que forman la geografía y memoria del pueblo.',
  },
  'ni-catas-ni-minas': {
    title: 'Ni Catas ni Minas: la mina de oro de Oroberia en Guadalajara',
    description:
      'Oroberia busca oro en 15.000 hectáreas de la Sierra Norte de Guadalajara, junto a Cercadillo. Qué está pasando y cómo se organiza la comarca para impedirlo.',
    ogImage: `${SITE_URL}/images/minas/hero-bg.jpg`,
  },
  'fauna-flora': {
    title: 'Fauna y Flora de Cercadillo: el saladar protegido ZEC/ZEPA',
    description:
      'El saladar de interior de Cercadillo (Guadalajara), a 1.000 m de altitud: fauna y flora del espacio protegido Red Natura 2000 "Valle y Salinas del Salado".',
  },
  fiestas: {
    title: 'Fiestas de Cercadillo (Guadalajara): calendario festivo',
    description:
      'Calendario de fiestas y tradiciones de Cercadillo, pedanía de Sigüenza (Guadalajara): patronales, romerías y celebraciones populares del pueblo.',
  },
  escudo: {
    title: 'El Escudo de Cercadillo: heráldica municipal',
    description:
      'Historia y significado del escudo heráldico de Cercadillo, pedanía de Sigüenza en la provincia de Guadalajara.',
  },
  iglesia: {
    title: 'Iglesia de la Natividad de Nuestra Señora de Cercadillo',
    description:
      'La iglesia parroquial del siglo XVI de Cercadillo (Guadalajara): historia, arquitectura y patrimonio religioso del pueblo.',
  },
  libro: {
    title: 'El Libro de Cercadillo: monografía histórica en 6 capítulos',
    description:
      'Seis capítulos sobre la historia de Cercadillo y la Comunidad de Villa y Tierra de Atienza: de los orígenes medievales a la despoblación.',
  },
  rutas: {
    title: 'Rutas de senderismo y BTT por Cercadillo (Guadalajara)',
    description:
      'Rutas a pie y en bicicleta por Cercadillo y su entorno en la Sierra Norte de Guadalajara, con tracks GPX en Wikiloc.',
  },
  genealogia: {
    title: 'Genealogía de Cercadillo: paisanos y memoria familiar',
    description:
      'Árbol genealógico y memoria familiar de los vecinos de Cercadillo (Guadalajara) a lo largo de generaciones.',
  },
  galeria: {
    title: 'Galería fotográfica de Cercadillo (Guadalajara)',
    description:
      'Fotografías históricas y actuales de Cercadillo, pedanía de Sigüenza en la Sierra Norte de Guadalajara.',
  },
  referencias: {
    title: 'Referencias y fuentes documentales sobre Cercadillo',
    description:
      'Bibliografía, archivos y fuentes documentales utilizadas para documentar la historia de Cercadillo (Guadalajara).',
  },
  'sobre-la-web': {
    title: 'Sobre esta web · Proyecto de digitalización de Cercadillo',
    description:
      'Qué es y por qué existe infocercadillo.es, el proyecto de digitalización del pueblo de Cercadillo (Guadalajara).',
  },
};

// Coordenadas de Cercadillo (ver capítulo 1 de "El Libro", src/content/chapters).
export const PLACE = {
  name: 'Cercadillo',
  lat: 41.164,
  lon: -2.7917,
  containedInPlace: 'Sigüenza, Guadalajara, España',
};
