export type RoutePoint = {
  id: string;
  order: number;
  name: string;
  lat: number;
  lng: number;
  distanceKm: number;
  description: string;
  quote?: string;
};

// Coordenadas aproximadas del itinerario Moriscos -> La Flecha (7,7 km),
// trazadas sobre el camino tradicional descrito en el Capítulo 5.
export const routePoints: RoutePoint[] = [
  {
    id: 'casco-urbano',
    order: 1,
    name: 'Casco Urbano y Frontón',
    lat: 41.0327,
    lng: -5.6032,
    distanceKm: 0,
    description:
      'Punto de partida junto al frontón municipal, tradicional lugar de encuentro vecinal antes de emprender la ruta hacia La Flecha.',
    quote: '"De aquí salían las cuadrillas de mozos, ya anochecido, con el candil por delante." — memoria oral',
  },
  {
    id: 'eras-valdepega',
    order: 2,
    name: 'Las Eras y Pago de Valdepega',
    lat: 41.0198,
    lng: -5.6058,
    distanceKm: 1.4,
    description:
      'El camino atraviesa las antiguas eras de trilla y el pago de Valdepega, tierras profundas de alto rendimiento cerealista.',
  },
  {
    id: 'charca-serra',
    order: 3,
    name: 'Charca de la Serrá',
    lat: 41.0102,
    lng: -5.6074,
    distanceKm: 2.6,
    description:
      'Depresión endorreica estacional que actúa como abrevadero natural y refugio de avifauna esteparia: alcaravanes, avutardas y sisones.',
  },
  {
    id: 'vertice-andorra',
    order: 4,
    name: 'Vértice Geodésico "Andorra"',
    lat: 40.9989,
    lng: -5.6091,
    distanceKm: 3.9,
    description:
      'El punto más alto del itinerario, a 871,4 metros de altitud, con vistas abiertas sobre el piedemonte salmantino y el valle del Tormes.',
  },
  {
    id: 'el-parapeto',
    order: 5,
    name: 'Escenario de la Batalla de 1812 ("El Parapeto")',
    lat: 40.9884,
    lng: -5.6103,
    distanceKm: 5.0,
    description:
      'Paraje vinculado por la tradición local a un episodio menor de la Guerra de la Independencia durante la campaña de los Arapiles.',
  },
  {
    id: 'cavenes-ripas',
    order: 6,
    name: 'Las Cavenes y Castillo de Ripas',
    lat: 40.9781,
    lng: -5.6119,
    distanceKm: 6.0,
    description:
      'Restos y oquedades del antiguo despoblado medieval de Ribas, con la memoria toponímica de un castillo hoy desaparecido.',
  },
  {
    id: 'pesquera-acena',
    order: 7,
    name: 'La Pesquera y Aceña Agustina',
    lat: 40.9702,
    lng: -5.6098,
    distanceKm: 6.9,
    description:
      'Estructura de pesca fluvial y molino de agua históricamente gestionados por la comunidad agustina propietaria de La Flecha.',
  },
  {
    id: 'oratorio-flecha',
    order: 8,
    name: 'Oratorio de La Flecha y Sillón de Unamuno',
    lat: 40.9658,
    lng: -5.6067,
    distanceKm: 7.7,
    description:
      'Destino final de la ruta: el soto donde se retiró Fray Luis de León y el asiento de piedra vinculado a los paseos de Unamuno.',
    quote: '"¡Qué descansada vida / la del que huye del mundanal ruïdo!" — Fray Luis de León',
  },
];
