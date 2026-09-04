import React from 'react';

const emblematicos = [
  {
    title: 'Parque Grande',
    description:
      'Centro neurálgico de las Fiestas Patronales en honor a la Virgen de la Peregrina: aquí se celebra el chupinazo inicial, el repique manual de campanas, la chocolatada popular, los talleres infantiles y la parrillada popular de cierre.',
  },
  {
    title: 'Parque Chico y Plaza Chica',
    description:
      'Espacios de ocio familiar y animación festiva, escenario de los vermús con charanga y del "Asaltacalles", la carrera infantil de carretones simulados.',
  },
  {
    title: 'Plaza Grande, Centro Social y Bar de Chinarrilla',
    description:
      'En el corazón del casco urbano. La biblioteca actual se construyó originalmente como centro social y taberna comunitaria, donde funcionó el histórico Bar de Chinarrilla (regentado por Narci), lugar donde se cataba el vino artesanal de Valdepega, bautizado irónicamente "D.O. Valdepega". En la plaza se instalan hoy los escenarios de las orquestas y las casetas festivas.',
  },
  {
    title: 'Iglesia Parroquial de San Pedro Apóstol',
    description:
      'El edificio más monumental del pueblo, una de las "Catedrales de La Armuña". Con orígenes entre los siglos XII y XVI, alberga el retablo mayor rococó, armaduras de madera y el lienzo barroco restaurado de la Virgen Peregrina.',
    tab: 'iglesia',
  },
];

const parajes = [
  {
    title: 'Vértice Geodésico "Andorra" (871,4 m)',
    description:
      'En la cota más alta del municipio (el topónimo árabe al-Andurra alude a matorrales o terreno escarpado). Un balcón natural sobre la penillanura de La Armuña y la vega del Tormes, 93 m sobre el río y 63 m sobre la Plaza Mayor de Salamanca.',
    tab: 'rutas',
  },
  {
    title: 'Laguna de la Serrada',
    description:
      'Depresión endorreica en el alto de una colina en cresta, que le da nombre. Punto de agua clave para el ganado; sus márgenes fueron reforestados por la Asociación de Cazadores local como refugio y criadero de la perdiz roja.',
    tab: 'rutas',
  },
  {
    title: 'Pago de Valdepega',
    description:
      'Vallejo abrigado ("valle de las pegas", urracas) que albergó la tradición vitivinícola de autoconsumo de Moriscos. Conserva la última viña superviviente del término municipal.',
  },
  {
    title: 'Carrelavieja y La Pardaleja',
    description:
      'Microtopónimos agrícolas: Carrelavieja alude a la antigua "carrera" o camino en desuso; La Pardaleja remite al color pardo de sus tierras o a la abundancia histórica de pardales (gorriones).',
  },
  {
    title: 'Las Cavenes (o Cahenes)',
    description:
      'Socavones y cárcavas en la cornisa fluvial hacia el Tormes, restos de antiguas explotaciones mineras romanas de oro a cielo abierto mediante lavado de arenas aluviales (ruina montium).',
    tab: 'rutas',
  },
  {
    title: 'El Teso de La Cabaña y El Parapeto',
    description:
      'Cerros estratégicos donde las tropas francesas del mariscal Marmont instalaron trincheras en junio de 1812, antes de ser desalojadas por las tropas de Wellington previas a la Batalla de Los Arapiles.',
    tab: 'rutas',
  },
];

const desaparecidos = [
  {
    title: 'La Charca Municipal y Abrevadero',
    what:
      'Frente a la Calle de las Ánimas y la casa de Natalia y Damián (última yunta de bueyes del pueblo hasta los años 70), una gran balsa comunal recogía la escorrentía pluvial para dar de beber a bueyes, mulas y caballos, ya que el agua de los pozos locales era muy dura.',
    why: 'La mecanización agrícola de los 60-70 y la llegada del agua corriente la dejaron sin función; fue desecada y hoy son parques y zonas verdes del casco urbano.',
  },
  {
    title: 'Las Eras de Trilla',
    what:
      'Extensas explanadas de tierra apisonada a las afueras donde se trillaba, se aventaba el grano al viento y se medía con la media fanega de madera para llenar los costales.',
    why: 'Las cosechadoras mecánicas eliminaron el trabajo manual; desde los 90-2000 estos terrenos periurbanos se recalificaron para el crecimiento residencial.',
  },
  {
    title: 'El trazado original del Camino de la Aceña',
    what: 'Camino histórico que nacía en el antiguo frontón municipal y conectaba Moriscos con la Aceña hidráulica de La Flecha, para moler trigo y traer agua blanda.',
    why: 'La concentración parcelaria de mediados del siglo XX rediseñó las fincas para el paso de tractores, interrumpiendo el paso directo con Cabrerizos y desviando el tránsito por el Camino de Valdepega.',
  },
  {
    title: 'El Pontón de Piedras sobre el Regato',
    what: 'Pasarela de grandes losas de cantería para cruzar el arroyo en la antigua Calzada de Medina sin quedar atrapado en los lodazales.',
    why: 'Quedó soterrado tras la canalización del arroyo y las obras de pavimentación de los accesos urbanos.',
  },
  {
    title: 'El núcleo de la Estación de Ferrocarril',
    what: 'Poblado secundario surgido a partir de 1877 con la línea Medina-Salamanca (km 69,380), con almacenes de grano, casetas de guardagujas y viviendas ferroviarias.',
    why: 'La automatización de las vías y el paso del transporte de grano del tren al camión eliminaron los puestos presenciales; hoy es solo un apeadero automatizado de Media Distancia.',
  },
  {
    title: 'Los despoblados medievales de El Hoyo y La Cruz',
    what: 'Antiguas alquerías y aldeas medievales independientes dentro del alfoz salmantino.',
    why: 'Desaparecieron entre los siglos XVI y XVIII por concentración de la propiedad, crisis demográficas y presión fiscal; sus términos fueron absorbidos por Moriscos (El Hoyo quedó inmortalizado en el escudo municipal).',
  },
  {
    title: 'La Granja Agustina de La Flecha Baja y la Aceña',
    what: 'Finca agustina fundada en 1451, con aceña hidráulica, oratorio renacentista, palomar, huertas y soto fluvial. Refugio de Fray Luis de León y Miguel de Unamuno.',
    why: 'Tras la Desamortización de Mendizábal (1835) pasó a manos privadas; en los 70 una piscifactoría alteró el cauce y destruyó la isla del soto, y un chalet quedó inconcluso sobre la propia aceña. Tras expolios de piedra, entró en 2011 en la Lista Roja del Patrimonio de Hispania Nostra.',
    tab: 'rutas',
  },
  {
    title: 'El campo de tiro al plato y el circuito de MotoCross',
    what: 'Tiro al plato en el triángulo sobrante de la concentración parcelaria entre el Camino de la Aceña y Valdepega; circuito de MotoCross diseñado por jóvenes en los 80 sobre los socavones romanos de Las Cavenes.',
    why: 'Desaparecieron al endurecerse las normativas de seguridad y al primarse la protección ambiental de los escarpes del Tormes.',
  },
];

export default function LugaresPage({ onNavigate }) {
  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">Geografía y memoria</p>
      <h1 className="mt-2 text-balance font-serif text-3xl sm:text-5xl font-bold text-pergamino">
        Lugares de Moriscos
      </h1>
      <p className="mt-4 text-balance text-lg text-pergamino-muted/80">
        El término municipal y el casco urbano albergan un patrimonio geográfico, histórico y urbano repleto de rincones con historia. Algunos son puntos clave de la vida comunitaria actual; otros han sido transformados por el paso del tiempo, la mecanización agrícola o la expansión urbanística.
      </p>

      {/* 1. Lugares Emblemáticos */}
      <div className="mt-12">
        <p className="kicker">Vida comunitaria</p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-armuna-light">Localizaciones emblemáticas actuales</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {emblematicos.map((l) => (
            <div key={l.title} className="card-editorial flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-pergamino">{l.title}</h3>
                <p className="mt-2 text-sm text-pergamino-muted/75 leading-relaxed">{l.description}</p>
              </div>
              {l.tab && (
                <button
                  type="button"
                  onClick={() => onNavigate(l.tab)}
                  className="mt-4 text-xs font-semibold text-armuna-light hover:underline text-left cursor-pointer"
                >
                  Ver más en {l.tab.replace('-', ' ')} →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Parajes Naturales */}
      <div className="mt-14">
        <p className="kicker">Entorno y paisaje</p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-armuna-light">Parajes y cotas del término</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {parajes.map((p) => (
            <div key={p.title} className="card-editorial flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-base font-bold text-pergamino">{p.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-pergamino-muted/75 leading-relaxed">{p.description}</p>
              </div>
              {p.tab && (
                <button
                  type="button"
                  onClick={() => onNavigate(p.tab)}
                  className="mt-4 text-xs font-semibold text-armuna-light hover:underline text-left cursor-pointer"
                >
                  Ver en el mapa →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Lugares Desaparecidos */}
      <div className="mt-14">
        <p className="kicker">Memoria colectiva</p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-armuna-light">Lugares desaparecidos o transformados</h2>
        <div className="mt-6 space-y-4">
          {desaparecidos.map((d) => (
            <div key={d.title} className="card-editorial p-5 sm:p-6">
              <h3 className="font-serif text-lg font-bold text-pergamino">{d.title}</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 text-sm">
                <div className="bg-noche/60 rounded-xl p-3 border border-noche-border/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-armuna-light">Qué era</span>
                  <p className="mt-1 text-pergamino-muted/80">{d.what}</p>
                </div>
                <div className="bg-noche/60 rounded-xl p-3 border border-noche-border/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-soto-light">Por qué desapareció</span>
                  <p className="mt-1 text-pergamino-muted/80">{d.why}</p>
                </div>
              </div>
              {d.tab && (
                <button
                  type="button"
                  onClick={() => onNavigate(d.tab)}
                  className="mt-3 text-xs font-semibold text-armuna-light hover:underline text-left cursor-pointer"
                >
                  Ver detalle en {d.tab.replace('-', ' ')} →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
