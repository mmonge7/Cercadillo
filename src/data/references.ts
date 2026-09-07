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
    id: 'plan-gestion-doc1',
    titulo: 'Plan de Gestión "Valle y Salinas del Salado" — Documento 1: Diagnóstico del Espacio Natura 2000',
    autorInstitucion: 'Junta de Comunidades de Castilla-La Mancha',
    anioRegistro: 'Firmado en 2017',
    categoria: 'archivos',
    tipoFuente: 'Plan de gestión oficial de espacio Red Natura 2000',
    url: 'https://www.castillalamancha.es/sites/default/files/documentos/paginas/archivos/doc_1_es0000165_es0000489_firmado.pdf',
    aportacionHistorica: [
      'Nombre y códigos oficiales del espacio: ZEC "Valle y Salinas del Salado" (ES0000165) y ZEPA del mismo nombre (ES0000489), superficie total 12.031,23 ha.',
      'Cercadillo aparece nombrado explícitamente: 649,29 de sus 2.255,01 ha (28,79% del término) están dentro del espacio protegido.',
      'Los dos Elementos Clave del espacio (vegetación halófila y rapaces rupícolas) y la tabla oficial de flora y fauna de interés comunitario y regional, base de la sección Fauna y Flora.',
    ],
  },
  {
    id: 'plan-gestion-doc2',
    titulo: 'Plan de Gestión "Valle y Salinas del Salado" — Documento 2: Objetivos y Medidas de Conservación',
    autorInstitucion: 'Junta de Comunidades de Castilla-La Mancha',
    anioRegistro: 'Firmado en 2017',
    categoria: 'archivos',
    tipoFuente: 'Plan de gestión oficial de espacio Red Natura 2000',
    url: 'https://www.castillalamancha.es/sites/default/files/documentos/paginas/archivos/doc_2_es0000165_es0000489_firmado.pdf',
    aportacionHistorica: [
      'Indicadores del Estado de Conservación Favorable de cada Elemento Clave, con cifras de población de referencia (águila real, halcón peregrino, alimoche).',
      'Cita expresa el encinar en dehesa del entorno de Cercadillo entre los "otros elementos valiosos" del espacio, junto al tarayal halófilo del arroyo de Cercadillo.',
      'Zonificación del espacio y otras especies de importancia no incluidas en la tabla oficial de interés comunitario y regional.',
    ],
  },
  {
    id: 'plan-gestion-doc3',
    titulo: 'Plan de Gestión "Valle y Salinas del Salado" — Documento 3: Participación Ciudadana e Información Pública',
    autorInstitucion: 'Junta de Comunidades de Castilla-La Mancha',
    anioRegistro: 'Firmado en 2017 (jornada de participación en 2014)',
    categoria: 'archivos',
    tipoFuente: 'Plan de gestión oficial de espacio Red Natura 2000',
    url: 'https://www.castillalamancha.es/sites/default/files/documentos/paginas/archivos/doc_3_es0000165_es0000489_firmado.pdf',
    aportacionHistorica: [
      'Confirma que Cercadillo fue una de las pedanías convocadas expresamente a la jornada de participación ciudadana de 2014 en el Ayuntamiento de Sigüenza.',
      'Recoge las aportaciones reales de vecinos, agricultores y representantes de la actividad salinera sobre la tensión entre conservación y vida rural en la comarca.',
    ],
  },
  {
    id: 'wikipedia-valle-salinas-salado',
    titulo: 'Valle y salinas del Salado',
    autorInstitucion: 'Wikipedia, la enciclopedia libre',
    anioRegistro: 'Consultado en 2026',
    categoria: 'digital',
    tipoFuente: 'Enciclopedia colaborativa',
    url: 'https://es.wikipedia.org/wiki/Valle_y_salinas_del_Salado',
    aportacionHistorica: [
      'Fuente complementaria sobre el espacio protegido; usada solo como apoyo, ya que sus códigos LIC/ZEPA no coinciden con los del Plan de Gestión oficial (se ha priorizado siempre este último).',
    ],
  },
  {
    id: 'naturaspain-zepa-salado',
    titulo: 'ZEPA "Valle y Salinas del Salado"',
    autorInstitucion: 'NaturaSpain',
    anioRegistro: 'Consultado en 2026',
    categoria: 'digital',
    tipoFuente: 'Portal de espacios naturales protegidos',
    url: 'https://www.naturaspain.com/zona-zepa-zepa-valle-y-salinas-del-salado.html',
    aportacionHistorica: [
      'Datos adicionales de porcentaje de hábitats y alguna especie no confirmada en la tabla oficial del Plan de Gestión, usados con reserva.',
    ],
  },
  {
    id: 'documento-familiar-cercadiello-cercadillo',
    titulo: '"De \'Cercadiello\' a Cercadillo": investigación histórica y toponímica',
    autorInstitucion: 'Eusebio Monge Molinero y otros vecinos e investigadores de Cercadillo',
    anioRegistro: 'Recopilación familiar inédita, aportada en 2026',
    categoria: 'archivos',
    tipoFuente: 'Documento de investigación local inédito, con bibliografía académica propia',
    aportacionHistorica: [
      'Los seis despoblados documentados en el término: Los Majanos, Los Pozos, Santa Catalina, Soto, la Torre de Alvar Díaz y Val de San Pedro.',
      'El encargo y la tasación del retablo de la iglesia (1560-1567), con los nombres de los artesanos y su valor en maravedís, citando a Herrera Casado.',
      'El inventario de veinticinco calles y plazas del pueblo en el siglo XVIII, procedente de los autos generales de la época.',
      'El detalle de las salinas de Cercadillo-Santamera, conocidas como "de Gormellón" o "La Escuadra", desde la Edad Media hasta su cierre hacia 1980.',
      'El contexto arévaco y romano de la comarca, y la desamortización de 1835-1855 como causa temprana del declive demográfico.',
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
