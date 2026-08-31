export type Counter = {
  label: string;
  value: string;
  suffix?: string;
  detail: string;
};

export const counters: Counter[] = [
  { label: 'Primera mención documental', value: '1164', detail: 'Año del primer registro escrito del topónimo' },
  { label: 'Vértice geodésico "Andorra"', value: '871,4', suffix: 'm', detail: 'Punto más alto del entorno inmediato' },
  { label: 'Distancia a Salamanca', value: '9', suffix: 'km', detail: 'Capital provincial, hacia el sur' },
  { label: 'Distancia a La Flecha', value: '7,7', suffix: 'km', detail: 'Siguiendo la Ruta Nocturna' },
];

export const hitos = [
  {
    title: 'Repoblación de 1100',
    year: 'Siglos XI-XII',
    summary:
      'Moriscos nace como aldea de repoblación dentro del alfoz de Salamanca, en un mosaico de pobladores cristianos, mozárabes y mudéjares.',
    href: '/libro/02-toponimia-repoblacion',
  },
  {
    title: 'Batalla de 1812',
    year: 'Guerra de la Independencia',
    summary:
      'Los movimientos previos a la Batalla de los Arapiles dejan su huella en el paraje conocido como "El Parapeto".',
    href: '/libro/06-conflictos-belicos',
  },
  {
    title: 'El suceso de 1941',
    year: 'Posguerra',
    summary:
      'Un episodio de crónica negra local, transmitido por la memoria oral, que este proyecto documenta con prudencia y rigor.',
    href: '/libro/07-sucesos-cronica-negra',
  },
  {
    title: 'Fray Luis de León',
    year: 'Siglo XVI',
    summary:
      'El soto de La Flecha, a 7,7 km de Moriscos, fue refugio contemplativo del poeta y humanista salmantino.',
    href: '/libro/05-despoblado-ribas-flecha',
  },
];

export const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'El Libro', href: '/libro' },
  { label: 'Ruta Nocturna', href: '/ruta-nocturna' },
  { label: 'Genealogía', href: '/genealogia' },
  { label: 'Glosario', href: '/glosario' },
];
