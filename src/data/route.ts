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
      'La ruta atraviesa las antiguas Eras de trilla, donde se medía el grano con la media fanega, y el pago de Valdepega, de tradición vinícola ("D.O. Valdepega").',
  },
  {
    id: 'charca-serra',
    order: 3,
    name: 'Charca de la Serrá',
    lat: 41.0102,
    lng: -5.6074,
    distanceKm: 2.6,
    description:
      'Depresión endorreica estacional (Laguna de la Serrada) reforestada por los cazadores locales como refugio de la perdiz roja, junto a la confluencia de los arroyos de Los Moriscos, el Vallejón, Gandil y Serranilla.',
  },
  {
    id: 'vertice-andorra',
    order: 4,
    name: 'Vértice Geodésico "Andorra"',
    lat: 40.9989,
    lng: -5.6091,
    distanceKm: 3.9,
    description:
      'Vértice del IGN nº 47879 (871,464 m), construido en 1991: el punto más alto del término, con un desnivel de 93 m hacia el Tormes y vistas nocturnas de las torres de la Catedral de Salamanca.',
  },
  {
    id: 'el-parapeto',
    order: 5,
    name: 'El Parapeto y el Teso de La Cabaña (1812)',
    lat: 40.9884,
    lng: -5.6103,
    distanceKm: 5.0,
    description:
      'En estas dos lomas se fortificaron las tropas del mariscal Marmont; aquí combatieron el 20 y el 22 de junio de 1812 las divisiones de Wellington, antesala de la Batalla de Los Arapiles.',
  },
  {
    id: 'cavenes-ripas',
    order: 6,
    name: 'Las Cavenes y Castillo de Ripas',
    lat: 40.9781,
    lng: -5.6119,
    distanceKm: 6.0,
    description:
      'Fosos y cárcavas vinculados a un antiguo lavado de oro romano; en la cima del Terrubio se señala el emplazamiento del desaparecido Castillo de Ripas, erigido en el siglo X por Ramiro II de León.',
  },
  {
    id: 'pesquera-acena',
    order: 7,
    name: 'La Pesquera y Aceña Agustina',
    lat: 40.9702,
    lng: -5.6098,
    distanceKm: 6.9,
    description:
      'Junto al azud o pesquera del Tormes se alzan los tajamares de la Aceña agustina del siglo XVI, donde se cobraba la maquila y las familias de Moriscos lavaban la ropa cada verano.',
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
