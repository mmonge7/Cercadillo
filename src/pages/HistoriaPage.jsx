import React from 'react';
import { navItems } from '../components/Nav';

const CAP_ORIGENES = '02-origenes-medievales-comun-de-atienza';
const CAP_PATRIMONIO = '03-patrimonio-iglesia-y-ermitas';
const CAP_MUNICIPIO = '04-de-municipio-a-pedania';
const CAP_FIESTAS = '05-fiestas-y-tradiciones';

const eras = [
  {
    title: 'Antes de la repoblación',
    events: [
      {
        year: 'Época arévaca y romana',
        text: 'La comarca donde se sitúa Cercadillo estuvo habitada por los arévacos y, siglos después, formó parte de las rutas de Roma en Hispania: la calzada que unía Segontia (la actual Sigüenza) con Termantia pasaba cerca de las salinas de Imón. No hay evidencia arqueológica de asentamiento en el propio término de Cercadillo en esta época.',
        tab: 'libro',
        target: CAP_ORIGENES,
      },
    ],
  },
  {
    title: 'Edad Media (siglos XI–XV)',
    events: [
      {
        year: '1085',
        text: 'Alfonso VI conquista Atienza y arranca la repoblación cristiana de la comarca en la que más tarde nacerá Cercadillo.',
        tab: 'libro',
        target: CAP_ORIGENES,
      },
      {
        year: '1149',
        text: 'Alfonso VII otorga el fuero de Atienza y nace la Comunidad de Villa y Tierra de Atienza, con Cercadillo entre sus 131 aldeas.',
        tab: 'libro',
        target: CAP_ORIGENES,
      },
      {
        year: 'Siglos XII–XIII',
        text: 'La comarca recibe privilegios reales posteriores, tradicionalmente atribuidos a Alfonso VIII y Fernando III.',
        tab: 'libro',
        target: CAP_ORIGENES,
      },
      {
        year: '1301 y 1353',
        text: 'Se documenta la Torre de Alvar Díaz, una fortificación defensiva propia de Cercadillo en el valle del río Salado, hoy despoblada y conocida como La Torrecilla.',
        tab: 'libro',
        target: CAP_ORIGENES,
      },
    ],
  },
  {
    title: 'Edad Moderna (siglos XVI–XVIII)',
    events: [
      {
        year: 'S. XVI',
        text: 'Se construye la Iglesia de la Natividad de Nuestra Señora, el monumento principal que conserva hoy Cercadillo.',
        tab: 'iglesia',
      },
      {
        year: '1560–1567',
        text: 'Martín de Bandoma y Martín de Cobarrubias labran el retablo mayor de la iglesia, que finalmente se tasa en 251.460 maravedís.',
        tab: 'iglesia',
      },
      {
        year: '1564',
        text: 'El estanco real de la sal obliga a cerrar las salinas de Cercadillo-Santamera, conocidas como "de Gormellón" o "La Escuadra".',
        tab: 'libro',
        target: CAP_FIESTAS,
      },
      {
        year: 'S. XVIII',
        text: 'Los autos generales de la época registran veinticinco calles y plazas del pueblo, un inventario que permite reconstruir su trazado urbano.',
        tab: 'libro',
        target: CAP_PATRIMONIO,
      },
    ],
  },
  {
    title: 'Siglo XIX',
    events: [
      {
        year: '1833',
        text: 'La reforma provincial de Javier de Burgos integra Atienza y su tierra —Cercadillo incluido— en la nueva provincia de Guadalajara.',
        tab: 'libro',
        target: CAP_ORIGENES,
      },
      {
        year: '1835',
        text: 'Primera medida desamortizadora: se autoriza la venta de los bienes propios de los municipios, entre ellos los de la comarca de Atienza.',
        tab: 'libro',
        target: CAP_MUNICIPIO,
      },
      {
        year: '1845–1850',
        text: 'Pascual Madoz censa a Cercadillo como municipio independiente, con 198 habitantes, en su Diccionario geográfico-estadístico-histórico.',
        tab: 'libro',
        target: CAP_MUNICIPIO,
      },
      {
        year: '1855',
        text: 'La desamortización de Pascual Madoz —el mismo autor del diccionario— transfiere también las tierras municipales, empobreciendo a los pueblos de la comarca.',
        tab: 'libro',
        target: CAP_MUNICIPIO,
      },
      {
        year: '1869',
        text: 'El desestanco de la sal permite reabrir las salinas de Cercadillo-Santamera, que el industrial Silverio Ibace pone de nuevo en marcha.',
        tab: 'libro',
        target: CAP_FIESTAS,
      },
    ],
  },
  {
    title: 'Siglo XX',
    events: [
      {
        year: '1973',
        text: 'Cercadillo pierde su ayuntamiento propio y se incorpora al municipio de Sigüenza junto a Horna y Bujarrabal.',
        tab: 'libro',
        target: CAP_MUNICIPIO,
      },
      {
        year: 'H. 1980',
        text: 'Las salinas de Cercadillo-Santamera cesan definitivamente su actividad, incapaces de competir con la sal industrial.',
        tab: 'libro',
        target: CAP_FIESTAS,
      },
    ],
  },
  {
    title: 'Siglo XXI',
    events: [
      {
        year: '2011',
        text: 'El censo del INE registra 17 habitantes en Cercadillo.',
        tab: 'libro',
        target: CAP_MUNICIPIO,
      },
      {
        year: 'Actualidad',
        text: 'Nace esta web como proyecto abierto para documentar y actualizar la memoria de Cercadillo.',
        tab: 'sobre-la-web',
      },
    ],
  },
];

export default function HistoriaPage({ onNavigate }) {
  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">Eje cronológico</p>
      <h1 className="mt-2 text-balance font-serif text-3xl sm:text-5xl font-bold text-pergamino">
        Historia de Cercadillo
      </h1>
      <p className="mt-4 text-balance text-lg text-pergamino-muted/80">
        De la comarca arévaca y romana a la repoblación medieval del siglo XI, y de ahí a la pequeña pedanía de
        Sigüenza que es Cercadillo hoy. Es una cronología breve, construida solo con fuentes públicas verificables
        (ver capítulo 6 de <button type="button" onClick={() => onNavigate('libro')} className="underline decoration-dotted underline-offset-2 hover:text-armuna-light cursor-pointer">El Libro</button>).
      </p>

      <div className="mt-12 space-y-12">
        {eras.map((era) => (
          <div key={era.title} className="card-editorial p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light border-b border-noche-border pb-3">
              {era.title}
            </h2>
            <div className="mt-6 space-y-6">
              {era.events.map((ev, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                  <span className="font-mono text-sm font-bold text-piedra-300 bg-piedra-900/80 px-3 py-1 rounded-lg shrink-0 border border-noche-border">
                    {ev.year}
                  </span>
                  <div className="flex-1">
                    <p className="text-pergamino-muted/85 leading-relaxed text-sm sm:text-base">
                      {ev.text}
                    </p>
                    {ev.tab && (
                      <button
                        type="button"
                        onClick={() => onNavigate(ev.tab, ev.target)}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-armuna-light hover:underline cursor-pointer"
                      >
                        Ver más en {navItems.find((n) => n.id === ev.tab)?.label ?? ev.tab} →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
