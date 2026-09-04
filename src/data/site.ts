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

export const hitos = [
  {
    title: 'Repoblación de 1100',
    year: 'Siglos XI-XII',
    summary:
      'El conde Ramón de Borgoña y el obispo Jerónimo de Perigord repueblan el alfoz salmantino; Vela de Aragón funda la vecina Castellanos de Morisco.',
    href: '/libro/02-toponimia-repoblacion',
  },
  {
    title: 'Batalla de 1812',
    year: 'Guerra de la Independencia',
    summary:
      'Wellington y Marmont combaten en El Parapeto y La Cabaña los días 20 y 22 de junio, antesala de la Batalla de Los Arapiles.',
    href: '/libro/06-conflictos-belicos',
  },
  {
    title: 'El suceso de 1941',
    year: '15 de agosto, posguerra',
    summary:
      'La emboscada de "la horca de Marino" a las hermanas Salvador Domínguez, documentada por la prensa y la memoria civil local.',
    href: '/libro/07-sucesos-cronica-negra',
  },
  {
    title: 'Fray Luis de León',
    year: 'Siglo XVI',
    summary:
      'El soto de La Flecha, a 7,7 km de Moriscos, fue refugio contemplativo del poeta agustino tras su encierro inquisitorial.',
    href: '/libro/05-despoblado-ribas-flecha',
  },
];

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
  { label: 'Glosario', href: '/glosario' },
  { label: 'Referencias', href: '/referencias' },
  { label: 'Sobre la web', href: '/sobre-la-web' },
];
