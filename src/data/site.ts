export type Counter = {
  label: string;
  value: string;
  suffix?: string;
  detail: string;
};

export const counters: Counter[] = [
  { label: 'Altitud', value: '994', suffix: 'm', detail: 'Sobre el nivel del mar' },
  { label: 'Población', value: '17', detail: 'Habitantes según el último censo (INE 2011) · eran 198 a mediados del siglo XIX' },
  { label: 'Distancia a Sigüenza', value: '16', suffix: 'km', detail: 'Municipio al que pertenece Cercadillo desde 1973 (línea recta)' },
  { label: 'Gentilicio', value: 'Morcilleros', detail: 'Como se conoce tradicionalmente a los vecinos de Cercadillo' },
];

// (El array `hitos`, con hitos históricos del pueblo hermano de Moriscos,
// Salamanca, se eliminó por no usarse en ninguna página y no corresponder a
// Cercadillo — ver README, sección 12.)

export const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Historia', href: '/historia' },
  { label: 'Lugares', href: '/lugares' },
  { label: 'Fiestas', href: '/fiestas' },
  { label: 'El Escudo', href: '/escudo' },
  { label: 'La Iglesia', href: '/iglesia' },
  { label: 'El Libro', href: '/libro' },
  { label: 'Rutas', href: '/rutas' },
  { label: 'Genealogía', href: '/genealogia' },
  { label: 'Galería', href: '/galeria' },
  { label: 'Referencias', href: '/referencias' },
  { label: 'Sobre la web', href: '/sobre-la-web' },
];
