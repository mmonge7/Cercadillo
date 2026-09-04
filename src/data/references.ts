export interface ReferenceItem {
  id: string;
  titulo: string;
  autorInstitucion: string;
  anioRegistro: string;
  categoria: 'archivos' | 'cartografia' | 'digital';
  tipoFuente: string;
  ubicacionArchivo?: string;
  url?: string;
  aportacionHistorica: string[];
}

export const referenceCategories: Record<ReferenceItem['categoria'], { label: string; badge: string }> = {
  digital: { label: 'Enciclopedias y portales digitales', badge: 'Portal Digital' },
  archivos: { label: 'Fuentes históricas y administrativas', badge: 'Fuente Histórica' },
  cartografia: { label: 'Datos geográficos y estadísticos', badge: 'Datos & Mapas' },
};

export const referencesData: ReferenceItem[] = [
  {
    id: 'wikipedia-cercadillo',
    titulo: 'Cercadillo',
    autorInstitucion: 'Wikipedia, la enciclopedia libre',
    anioRegistro: 'Consultado en 2026',
    categoria: 'digital',
    tipoFuente: 'Enciclopedia colaborativa',
    url: 'https://es.wikipedia.org/wiki/Cercadillo',
    aportacionHistorica: [
      'Población: 198 habitantes a mediados del siglo XIX (Madoz) y 17 habitantes según el censo del INE de 2011.',
      'Incorporación de Cercadillo al municipio de Sigüenza en 1973, junto con Horna y Bujarrabal.',
      'Descripción de la iglesia parroquial de la Natividad de Nuestra Señora (siglo XVI, tres naves, altares platerescos).',
      'Existencia de las ermitas de La Soledad y de Santo Domingo.',
    ],
  },
  {
    id: 'wikipedia-comun-atienza',
    titulo: 'Comunidad de Villa y Tierra de Atienza',
    autorInstitucion: 'Wikipedia, la enciclopedia libre',
    anioRegistro: 'Consultado en 2026',
    categoria: 'digital',
    tipoFuente: 'Enciclopedia colaborativa',
    url: 'https://es.wikipedia.org/wiki/Comunidad_de_villa_y_tierra_de_Atienza',
    aportacionHistorica: [
      'Conquista de Atienza por Alfonso VI en 1085 y arranque de la repoblación de la comarca.',
      'Fuero de 1149 otorgado por Alfonso VII, origen de la Comunidad de Villa y Tierra de Atienza (131 aldeas, entre ellas Cercadillo).',
      'Castillos que protegían el territorio, entre ellos el de Alcolea de las Peñas.',
      'Integración de Atienza y su tierra en la provincia de Guadalajara con la reforma de Javier de Burgos (1833).',
    ],
  },
  {
    id: 'madoz-1847',
    titulo: 'Diccionario geográfico-estadístico-histórico de España y sus posesiones de Ultramar',
    autorInstitucion: 'Pascual Madoz',
    anioRegistro: '1847',
    categoria: 'archivos',
    tipoFuente: 'Diccionario geográfico-estadístico del siglo XIX',
    aportacionHistorica: [
      'Censo de Cercadillo como municipio independiente con 198 habitantes a mediados del siglo XIX (citado por Wikipedia).',
    ],
  },
  {
    id: 'decreto-1973-siguenza',
    titulo: 'Decreto de incorporación de Cercadillo, Horna y Bujarrabal al municipio de Sigüenza',
    autorInstitucion: 'Boletín Oficial del Estado (BOE)',
    anioRegistro: '1973',
    categoria: 'archivos',
    tipoFuente: 'Disposición administrativa',
    aportacionHistorica: [
      'Base legal de la pérdida del ayuntamiento propio de Cercadillo y su incorporación a Sigüenza (citado por Wikipedia; no hemos podido localizar y verificar directamente el texto íntegro del decreto).',
    ],
  },
  {
    id: 'ine-cercadillo',
    titulo: 'Cifras oficiales de población: Cercadillo',
    autorInstitucion: 'Instituto Nacional de Estadística (INE)',
    anioRegistro: 'Censo 2011',
    categoria: 'cartografia',
    tipoFuente: 'Estadística oficial',
    url: 'https://www.ine.es/',
    aportacionHistorica: ['Población actual de Cercadillo: 17 habitantes.'],
  },
  {
    id: 'wikidata-cercadillo',
    titulo: 'Cercadillo (Q5762488)',
    autorInstitucion: 'Wikidata',
    anioRegistro: 'Consultado en 2026',
    categoria: 'cartografia',
    tipoFuente: 'Base de datos estructurada',
    url: 'https://www.wikidata.org/wiki/Q5762488',
    aportacionHistorica: ['Identificador y datos estructurados de Cercadillo como entidad geográfica.'],
  },
  {
    id: 'guias-pueblos-guadalajara',
    titulo: 'Guías y directorios de pueblos de Guadalajara',
    autorInstitucion: 'Escapada Rural / VerPueblos',
    anioRegistro: 'Consultado en 2026',
    categoria: 'digital',
    tipoFuente: 'Guías turísticas y directorios locales',
    url: 'https://www.escapadarural.com/que-hacer/cercadillo',
    aportacionHistorica: [
      'Altitud aproximada (994 m) y coordenadas geográficas del pueblo.',
      'Gentilicio popular de los vecinos de Cercadillo: "morcilleros".',
      'Cercanía a las salinas de Gormellón y existencia de fuente y lavadero tradicionales.',
      'Fuentes no oficiales: pendientes de contrastar con más detalle si aparece documentación mejor.',
    ],
  },
  {
    id: 'wikiloc-cercadillo',
    titulo: 'Rutas por Cercadillo',
    autorInstitucion: 'Wikiloc',
    anioRegistro: 'Consultado en 2026',
    categoria: 'cartografia',
    tipoFuente: 'Plataforma de rutas GPS',
    url: 'https://es.wikiloc.com/rutas/outdoor/espana/castilla-la-mancha/cercadillo',
    aportacionHistorica: [
      'Rutas reales de senderismo y BTT que atraviesan Cercadillo, usadas como base de la sección Rutas de esta web.',
    ],
  },
];
