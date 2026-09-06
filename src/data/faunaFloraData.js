/*
 * Datos de la sección Fauna y Flora: designaciones de protección que afectan
 * al término de Cercadillo y las especies de flora y fauna asociadas al
 * paisaje salino. Investigación recogida en el documento del proyecto
 * "investigacion-zepa-lic-cercadillo.md"; cifras y fechas oficiales
 * pendientes de confirmación final con la Junta de Comunidades de
 * Castilla-La Mancha (ver ese documento para el detalle y las fuentes).
 */

export const zonasProtegidas = [
  {
    id: 'zepa',
    codigo: 'ES0000165',
    nombre: 'ZEPA Sierra Norte de Guadalajara',
    tipo: 'Zona de Especial Protección para las Aves',
    descripcion:
      'Designada bajo la Directiva Aves de la Unión Europea para proteger poblaciones de aves silvestres y sus hábitats.',
  },
  {
    id: 'lic-zec',
    codigo: 'ES4240165',
    nombre: 'LIC/ZEC Sierra Norte de Guadalajara',
    tipo: 'Lugar de Interés Comunitario / Zona de Especial Conservación',
    descripcion:
      'Designado bajo la Directiva Hábitats para proteger tipos de hábitat y especies de interés comunitario, con una superficie aproximada de 11.585,19 ha.',
  },
  {
    id: 'microrreserva',
    codigo: null,
    nombre: 'Microrreserva de los Saladares',
    tipo: 'Microrreserva de flora',
    descripcion:
      'Protege el paisaje salino de interior en el término de Cercadillo, un hábitat singular en la meseta a unos 1.000 m de altitud.',
  },
];

export const flora = [
  {
    id: 'almajo',
    nombreComun: 'Almajo salado',
    nombreCientifico: 'Suaeda vera',
    descripcion:
      'Arbusto halófilo característico de los saladares, tolerante a suelos con alta concentración de sales.',
  },
  {
    id: 'limonio',
    nombreComun: 'Limonio',
    nombreCientifico: 'Limonium sp.',
    descripcion: 'Planta perenne de flores azuladas o violáceas, típica de ambientes salinos del interior peninsular.',
  },
  {
    id: 'suaeda',
    nombreComun: 'Sosa',
    nombreCientifico: 'Suaeda spp.',
    descripcion: 'Grupo de plantas suculentas adaptadas a la salinidad, formando parte del matorral halófilo del saladar.',
  },
  {
    id: 'escorzonera',
    nombreComun: 'Escorzonera de flor pequeña',
    nombreCientifico: 'Microcnemum coralloides',
    descripcion:
      'Especie muy rara y protegida, propia de saladares de interior; su presencia es uno de los motivos de la protección del entorno.',
  },
  {
    id: 'lecherina',
    nombreComun: 'Lecherina de mar',
    nombreCientifico: 'Frankenia pulverulenta',
    descripcion: 'Pequeña planta halófila postrada, adaptada a los suelos salinos y yesosos de la zona.',
  },
];

export const GRUPOS_FAUNA = ['Aves del saladar', 'Rapaces', 'Quirópteros'];

export const fauna = [
  {
    id: 'aguilucho',
    nombreComun: 'Aguilucho cenizo',
    nombreCientifico: 'Circus pygargus',
    grupo: 'Aves del saladar',
    descripcion: 'Rapaz migratoria que nidifica en el suelo, ligada a los espacios abiertos de la sierra y su entorno.',
  },
  {
    id: 'alcaraván',
    nombreComun: 'Alcaraván',
    nombreCientifico: 'Burhinus oedicnemus',
    grupo: 'Aves del saladar',
    descripcion: 'Ave esteparia de hábitos crepusculares y nocturnos, muy ligada a los paisajes abiertos y salinos.',
  },
  {
    id: 'sisón',
    nombreComun: 'Sisón',
    nombreCientifico: 'Tetrax tetrax',
    grupo: 'Aves del saladar',
    descripcion: 'Ave esteparia en declive en toda Europa, indicadora de la calidad de los espacios agrarios y estepas.',
  },
  {
    id: 'terrera',
    nombreComun: 'Terrera común',
    nombreCientifico: 'Calandrella brachydactyla',
    grupo: 'Aves del saladar',
    descripcion: 'Pequeño pájaro esteparia que nidifica en el suelo de zonas abiertas con vegetación rala.',
  },
  {
    id: 'aguila-real',
    nombreComun: 'Águila real',
    nombreCientifico: 'Aquila chrysaetos',
    grupo: 'Rapaces',
    descripcion: 'Gran rapaz forestal y rupícola, una de las especies amenazadas citadas en los informes sobre la sierra.',
  },
  {
    id: 'buitre-leonado',
    nombreComun: 'Buitre leonado',
    nombreCientifico: 'Gyps fulvus',
    grupo: 'Rapaces',
    descripcion: 'Carroñero de gran envergadura, frecuente en los roquedos y cortados de la Sierra Norte.',
  },
  {
    id: 'aguila-culebrera',
    nombreComun: 'Águila culebrera',
    nombreCientifico: 'Circaetus gallicus',
    grupo: 'Rapaces',
    descripcion: 'Rapaz especializada en la caza de reptiles, ligada a los espacios forestales y de matorral de la sierra.',
  },
  {
    id: 'busardo',
    nombreComun: 'Busardo ratonero',
    nombreCientifico: 'Buteo buteo',
    grupo: 'Rapaces',
    descripcion: 'La rapaz diurna más común de la zona, presente todo el año en bosques y espacios abiertos.',
  },
  {
    id: 'murcielagos',
    nombreComun: 'Murciélagos',
    nombreCientifico: null,
    grupo: 'Quirópteros',
    descripcion:
      'Las fuentes consultadas citan la presencia de quirópteros protegidos en la zona sin precisar la especie exacta; dato pendiente de confirmación oficial.',
  },
];
