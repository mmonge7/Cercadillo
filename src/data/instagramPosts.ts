import { publicUrl } from '../utils/publicUrl';
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
//
// La cuadrícula de Inicio se ve mejor con 6 tarjetas (coincide con
// `lg:grid-cols-6` en InstagramFeed.jsx): al añadir una nueva, comenta la
// más antigua en vez de borrarla, para no perder el dato.
export const instagramPosts: InstagramPost[] = [
  {
    id: 'espuma-fiestas',
    url: 'https://www.instagram.com/infocercadillo/reel/Dc_jtULqYuu/',
    image: publicUrl('/images/instagram/reel-espuma-fiestas.jpg'),
    caption: 'Una lloradita y a seguir 🩵',
    date: '7 sep 2026',
    kind: 'reel',
  },
  {
    id: 'poesia',
    url: 'https://www.instagram.com/infocercadillo/reel/DclkoW6soF5/',
    image: publicUrl('/images/instagram/reel-poesia.jpg'),
    caption: 'Simplemente, poesía ✨',
    date: '28 ago 2026',
    kind: 'reel',
  },
  {
    id: 'corzo',
    url: 'https://www.instagram.com/infocercadillo/reel/DcTtxtYCec5/',
    image: publicUrl('/images/instagram/reel-corzo.jpg'),
    caption: 'Aquí, tal vez, haya oro. Pero lo que sí que hay es vida. Hay paisajes, hay pueblos, hay futuro.',
    date: '21 ago 2026',
    kind: 'reel',
  },
  {
    id: 'atardecer-iglesia',
    url: 'https://www.instagram.com/infocercadillo/p/Db_z-_fAnlG/',
    image: publicUrl('/images/instagram/atardecer-iglesia.jpg'),
    caption: 'No pudo haber mejor momento ni lugar que Cercadillo. Nuestro pueblo.',
    date: '13 ago 2026',
    kind: 'post',
  },
  {
    id: 'banco-fuente-soto',
    url: 'https://www.instagram.com/infocercadillo/p/DbtnvdROyPQ/',
    image: publicUrl('/images/instagram/banco-fuente-soto.jpg'),
    caption: 'Nuevo banco en la Fuente del Soto, para seguir disfrutando del pueblo en verano.',
    date: '6 ago 2026',
    kind: 'post',
  },
  {
    id: 'incendio-mierla',
    url: 'https://www.instagram.com/infocercadillo/p/DbIfY3JsrBw/',
    image: publicUrl('/images/instagram/incendio-mierla.jpg'),
    caption: 'El incendio de Mierla golpeó muy cerca de Cercadillo. Toca trabajar más duro, pero levantaremos esta tierra una vez más.',
    date: '23 jul 2026',
    kind: 'post',
  },
  // Desplazado fuera de la cuadrícula al añadir una publicación más reciente
  // (ver comentario de arriba: la selección se limita a las últimas 6). Se
  // deja comentado, en vez de borrarlo, para no perder el dato si se quiere
  // recuperar más adelante.
  // {
  //   id: 'reel-mina',
  //   url: 'https://www.instagram.com/infocercadillo/reel/DZ70MTiMPip/',
  //   image: publicUrl('/images/instagram/reel-mina.jpg'),
  //   caption: 'El pueblo está más vivo de lo que creen: informarse, resolver dudas y defender el territorio.',
  //   date: '23 jun 2026',
  //   kind: 'reel',
  // },
];
