/*
 * Datos de la sección Fauna y Flora, tomados del Plan de Gestión oficial del
 * espacio Natura 2000 "Valle y Salinas del Salado" (ZEC ES0000165 / ZEPA
 * ES0000489, Junta de Comunidades de Castilla-La Mancha, 2017). Esta es una
 * selección deliberadamente breve para una página dinámica y visual; el
 * listado completo de especies y las fuentes están en el capítulo 1 de
 * El Libro. Ver el documento de investigación del proyecto para el detalle.
 */

export const datosEspacio = {
  nombre: 'Valle y Salinas del Salado',
  zec: 'ES0000165',
  zepa: 'ES0000489',
  superficieTotalHa: 12031.23,
  superficieCercadilloHa: 649.29,
  porcentajeCercadillo: 28.79,
};

export const elementosClave = [
  {
    id: 'vegetacion-halofila',
    nombre: 'Vegetación halófila',
    descripcion:
      'El mosaico de plantas capaces de vivir en suelo salino: juncales, praderas y matorrales que solo existen aquí, tierra adentro, gracias a la sal que aflora del subsuelo.',
  },
  {
    id: 'rapaces-rupicolas',
    nombre: 'Rapaces rupícolas',
    descripcion:
      'Águila real, halcón peregrino y alimoche común, que crían en los cortados rocosos del espacio. Entre las tres suman entre 15 y 18 parejas reproductoras.',
  },
];

export const flora = [
  {
    id: 'suaeda-vera',
    nombreComun: 'Almajo dulce',
    nombreCientifico: 'Suaeda vera',
    descripcion: 'Matorral leñoso y carnoso que da nombre al paisaje de los saladares.',
  },
  {
    id: 'camphorosma',
    nombreComun: 'Alcanforada',
    nombreCientifico: 'Camphorosma monspeliaca',
    descripcion: 'Endemismo mediterráneo de matorral salino, presente en el entorno de las salinas de Imón.',
  },
  {
    id: 'glaux-maritima',
    nombreComun: 'Lechuguilla de mar',
    nombreCientifico: 'Glaux maritima',
    descripcion: 'Planta de marisma costera que aquí aparece a 1.000 metros de altitud, tierra adentro.',
  },
  {
    id: 'halimium',
    nombreComun: 'Alcayuela',
    nombreCientifico: 'Halimium ocymoides',
    descripcion: 'Endemismo ibérico-magrebí de jarales y brezales húmedos.',
  },
  {
    id: 'thymus',
    nombreComun: 'Tomillo picante',
    nombreCientifico: 'Thymus mastigophorus',
    descripcion: 'Endemismo de la meseta Norte, exclusivo de tomillares sobre yesos y margas.',
  },
  {
    id: 'ruppia',
    nombreComun: 'Ruppia',
    nombreCientifico: 'Ruppia maritima',
    descripcion: 'Planta acuática halófila que tapiza el fondo de las balsas saladas.',
  },
];

export const GRUPOS_FAUNA = ['Rapaces rupícolas', 'Aves de las salinas', 'Mamíferos'];

export const fauna = [
  {
    id: 'aguila-real',
    nombreComun: 'Águila real',
    nombreCientifico: 'Aquila chrysaetos',
    grupo: 'Rapaces rupícolas',
    descripcion: 'Elemento clave del espacio: 4 parejas reproductoras en los cortados del entorno.',
  },
  {
    id: 'halcon-peregrino',
    nombreComun: 'Halcón peregrino',
    nombreCientifico: 'Falco peregrinus',
    grupo: 'Rapaces rupícolas',
    descripcion: 'El ave más rápida del mundo en picado; 3 parejas nidifican en el espacio.',
  },
  {
    id: 'alimoche',
    nombreComun: 'Alimoche común',
    nombreCientifico: 'Neophron percnopterus',
    grupo: 'Rapaces rupícolas',
    descripcion: 'Rapaz carroñera migradora, presente de febrero a septiembre; entre 8 y 11 parejas.',
  },
  {
    id: 'cigüeña-negra',
    nombreComun: 'Cigüeña negra',
    nombreCientifico: 'Ciconia nigra',
    grupo: 'Aves de las salinas',
    descripcion: 'Especie vulnerable, de paso por la laguna del Madrigal y las salinas en migración.',
  },
  {
    id: 'grulla',
    nombreComun: 'Grulla común',
    nombreCientifico: 'Grus grus',
    grupo: 'Aves de las salinas',
    descripcion: 'Visitante habitual de la laguna del Madrigal durante sus movimientos migratorios.',
  },
  {
    id: 'aguilucho-lagunero',
    nombreComun: 'Aguilucho lagunero',
    nombreCientifico: 'Circus aeruginosus',
    grupo: 'Aves de las salinas',
    descripcion: 'Cría de forma más o menos regular en el entorno de la laguna del Madrigal.',
  },
  {
    id: 'nutria',
    nombreComun: 'Nutria europea',
    nombreCientifico: 'Lutra lutra',
    grupo: 'Mamíferos',
    descripcion: 'Mamífero semiacuático ligado a las riberas del Salado y el Cercadillo, en buen estado.',
  },
  {
    id: 'murcielago-herradura',
    nombreComun: 'Murciélago grande de herradura',
    nombreCientifico: 'Rhinolophus ferrumequinum',
    grupo: 'Mamíferos',
    descripcion: 'Una de las dos especies que forman colonias en la Cueva de los Murciélagos de Santamera.',
  },
  {
    id: 'gato-montes',
    nombreComun: 'Gato montés',
    nombreCientifico: 'Felis silvestris',
    grupo: 'Mamíferos',
    descripcion: 'Refugiado en los bosques de encina y rebollo que rodean el valle salino.',
  },
];
