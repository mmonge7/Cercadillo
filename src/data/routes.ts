export type TrailRoute = {
  id: string;
  title: string;
  activity: 'senderismo' | 'btt';
  distanceKm: number | null;
  url: string;
};

/*
 * Primera base de rutas reales que pasan por Cercadillo, localizadas en
 * Wikiloc (es.wikiloc.com). Es un punto de partida sencillo: cada tarjeta
 * enlaza directamente a la ficha completa en Wikiloc (track GPX, perfil de
 * elevación, fotos...). Iremos ampliando y puliendo esta sección --por
 * ejemplo con un mapa interactivo propio-- según se vaya decidiendo.
 */
export const routes: TrailRoute[] = [
  {
    id: 'riofrio-cercadillo-alcolea-atienza',
    title: 'Riofrío del Llano – Cercadillo – Alcolea de las Peñas – Atienza',
    activity: 'btt',
    distanceKm: 38,
    url: 'https://es.wikiloc.com/rutas-mountain-bike/riofrio-del-llano-cercadillo-alcolea-de-las-penas-atienza-guadalajara-espana-38km-8552437',
  },
  {
    id: 'cercadillo-imon',
    title: 'Cercadillo – Imón',
    activity: 'senderismo',
    distanceKm: null,
    url: 'https://es.wikiloc.com/rutas-senderismo/cercadillo-imon-165799670',
  },
  {
    id: 'alcolea-cercadillo-santamera',
    title: 'Alcolea de las Peñas – Cercadillo – Santamera',
    activity: 'senderismo',
    distanceKm: null,
    url: 'https://es.wikiloc.com/rutas-senderismo/alcolea-de-las-penas-cercadillo-santamera-92854237',
  },
];
