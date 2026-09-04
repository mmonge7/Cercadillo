export type InstagramPost = {
  id: string;
  url: string;
  image: string;
  caption: string;
  date: string;
  kind: 'reel' | 'post';
};

// Selección curada a mano de publicaciones de @infocercadillo. Para
// refrescarla: añade una entrada nueva arriba con el enlace del post, guarda
// una captura en public/images/instagram/ y actualiza `image`. No hay
// conexión automática con Instagram (ver decisión en el proyecto).
export const instagramPosts: InstagramPost[] = [
  {
    id: 'poesia',
    url: 'https://www.instagram.com/infocercadillo/reel/DclkoW6soF5/',
    image: '/images/instagram/reel-poesia.jpg',
    caption: 'Simplemente, poesía ✨',
    date: '28 ago 2026',
    kind: 'reel',
  },
  {
    id: 'corzo',
    url: 'https://www.instagram.com/infocercadillo/reel/DcTtxtYCec5/',
    image: '/images/instagram/reel-corzo.jpg',
    caption: 'Aquí, tal vez, haya oro. Pero lo que sí que hay es vida. Hay paisajes, hay pueblos, hay futuro.',
    date: '21 ago 2026',
    kind: 'reel',
  },
  {
    id: 'atardecer-iglesia',
    url: 'https://www.instagram.com/infocercadillo/p/Db_z-_fAnlG/',
    image: '/images/instagram/atardecer-iglesia.jpg',
    caption: 'No pudo haber mejor momento ni lugar que Cercadillo. Nuestro pueblo.',
    date: '13 ago 2026',
    kind: 'post',
  },
  {
    id: 'banco-fuente-soto',
    url: 'https://www.instagram.com/infocercadillo/p/DbtnvdROyPQ/',
    image: '/images/instagram/banco-fuente-soto.jpg',
    caption: 'Nuevo banco en la Fuente del Soto, para seguir disfrutando del pueblo en verano.',
    date: '6 ago 2026',
    kind: 'post',
  },
  {
    id: 'incendio-mierla',
    url: 'https://www.instagram.com/infocercadillo/p/DbIfY3JsrBw/',
    image: '/images/instagram/incendio-mierla.jpg',
    caption: 'El incendio de Mierla golpeó muy cerca de Cercadillo. Toca trabajar más duro, pero levantaremos esta tierra una vez más.',
    date: '23 jul 2026',
    kind: 'post',
  },
  {
    id: 'reel-mina',
    url: 'https://www.instagram.com/infocercadillo/reel/DZ70MTiMPip/',
    image: '/images/instagram/reel-mina.jpg',
    caption: 'El pueblo está más vivo de lo que creen: informarse, resolver dudas y defender el territorio.',
    date: '23 jun 2026',
    kind: 'reel',
  },
];
