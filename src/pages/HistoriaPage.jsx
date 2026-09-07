import React, { useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { navItems } from '../components/Nav';

const CAP_ORIGENES = '02-origenes-medievales-comun-de-atienza';
const CAP_PATRIMONIO = '03-patrimonio-iglesia-y-ermitas';
const CAP_MUNICIPIO = '04-de-municipio-a-pedania';
const CAP_FIESTAS = '05-fiestas-y-tradiciones';

const eras = [
  {
    slug: 'antes-de-la-repoblacion',
    shortTitle: 'Antigüedad',
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
    slug: 'edad-media',
    shortTitle: 'Edad Media',
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
    slug: 'edad-moderna',
    shortTitle: 'Edad Moderna',
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
    slug: 'siglo-xix',
    shortTitle: 'Siglo XIX',
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
    slug: 'siglo-xx',
    shortTitle: 'Siglo XX',
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
    slug: 'siglo-xxi',
    shortTitle: 'Siglo XXI',
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

const NODE_WIDTH = 'w-[196px] sm:w-[232px]';

export default function HistoriaPage({ onNavigate }) {
  // La cronología se aplana en una sola fila: cada hito conserva de qué
  // época viene para poder agrupar visualmente y para que la barra de
  // épocas sepa a qué hito saltar.
  const nodes = useMemo(
    () =>
      eras.flatMap((era) =>
        era.events.map((ev, idx) => ({
          ...ev,
          eraSlug: era.slug,
          eraShortTitle: era.shortTitle,
          isEraStart: idx === 0,
        })),
      ),
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const nodeRefs = useRef([]);
  const activeEraSlug = nodes[activeIndex]?.eraSlug;

  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    const node = nodeRefs.current[index];
    if (!container || !node) return;
    const target = node.offsetLeft - (container.clientWidth - node.clientWidth) / 2;
    container.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  };

  const selectNode = (index) => {
    setActiveIndex(index);
    scrollToIndex(index);
  };

  const selectEra = (slug) => {
    const index = nodes.findIndex((n) => n.eraSlug === slug);
    if (index === -1) return;
    selectNode(index);
  };

  const nudge = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 460, behavior: 'smooth' });
  };

  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">Eje cronológico interactivo</p>
      <h1 className="mt-2 text-balance font-serif text-3xl sm:text-5xl font-bold text-pergamino">
        Historia de Cercadillo
      </h1>
      <p className="mt-4 text-balance text-lg text-pergamino-muted/80">
        De la comarca arévaca y romana a la repoblación medieval del siglo XI, y de ahí a la pequeña pedanía de
        Sigüenza que es Cercadillo hoy. Desliza la línea de tiempo hacia los lados o toca una época para saltar a
        ella: es breve, construida solo con fuentes públicas verificables (ver capítulo 6 de{' '}
        <button
          type="button"
          onClick={() => onNavigate('libro')}
          className="underline decoration-dotted underline-offset-2 hover:text-armuna-light cursor-pointer"
        >
          El Libro
        </button>
        ).
      </p>

      <nav
        aria-label="Saltar a una época"
        className="sticky top-0 z-20 -mx-4 mt-8 flex gap-2 overflow-x-auto border-y border-noche-border bg-noche/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-3"
      >
        {eras.map((era) => (
          <button
            key={era.slug}
            type="button"
            onClick={() => selectEra(era.slug)}
            aria-current={activeEraSlug === era.slug ? 'true' : undefined}
            className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-3.5 py-1.5 font-display text-xs font-bold uppercase tracking-wide transition-colors ${
              activeEraSlug === era.slug
                ? 'border-armuna-light bg-armuna-light/15 text-armuna-light'
                : 'border-noche-border text-pergamino-muted/60 hover:text-pergamino'
            }`}
          >
            {era.shortTitle}
          </button>
        ))}
      </nav>

      <div className="mt-6 hidden items-center justify-end gap-2 sm:flex">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Desplazar la línea de tiempo hacia épocas anteriores"
          className="cursor-pointer rounded-full border border-noche-border p-1.5 text-pergamino-muted/70 transition-colors hover:border-armuna-light/50 hover:text-armuna-light"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Desplazar la línea de tiempo hacia épocas posteriores"
          className="cursor-pointer rounded-full border border-noche-border p-1.5 text-pergamino-muted/70 transition-colors hover:border-armuna-light/50 hover:text-armuna-light"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="relative mt-3 sm:mt-4">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-noche to-transparent sm:w-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-noche to-transparent sm:w-10"
          aria-hidden="true"
        />

        <div
          ref={scrollRef}
          className="snap-x snap-proximity overflow-x-auto px-4 pb-4 sm:px-6"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="relative flex" style={{ minWidth: 'max-content' }}>
            <div
              className="pointer-events-none absolute left-0 right-0 top-[31px] h-px bg-noche-border"
              aria-hidden="true"
            />

            {nodes.map((node, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={`${node.eraSlug}-${index}`}
                  ref={(el) => {
                    nodeRefs.current[index] = el;
                  }}
                  className={`relative shrink-0 snap-start ${NODE_WIDTH} px-3 ${
                    node.isEraStart && index !== 0 ? 'ml-1 border-l border-noche-border/70 pl-5' : ''
                  }`}
                >
                  <div className="flex h-5 items-end">
                    {node.isEraStart && (
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wide text-armuna-light">
                        {node.eraShortTitle}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => selectNode(index)}
                    aria-expanded={isActive}
                    className="mt-1 block w-full cursor-pointer text-left"
                  >
                    <span
                      className={`block h-3.5 w-3.5 rounded-full border-2 transition-colors ${
                        isActive ? 'border-armuna-light bg-armuna-light' : 'border-piedra-300 bg-noche'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="mt-2 block font-mono text-sm font-bold text-piedra-300">{node.year}</span>
                  </button>

                  {isActive && (
                    <div className="mt-2 rounded-lg border border-noche-border bg-noche-card/80 p-3 text-sm leading-relaxed text-pergamino-muted/85">
                      <p>{node.text}</p>
                      {node.tab && (
                        <button
                          type="button"
                          onClick={() => onNavigate(node.tab, node.target)}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-armuna-light hover:underline cursor-pointer"
                        >
                          Ver más en {navItems.find((n) => n.id === node.tab)?.label ?? node.tab} →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
