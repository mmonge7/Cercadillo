import React, { useEffect, useRef, useState } from 'react';
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

/** Resalta, dentro de la barra de épocas, cuál es la que está a la vista mientras se hace scroll. */
function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    const root = document.getElementById('main-scroll-container');
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((el) => el !== null);
    if (!root || !sections.length) return;

    // Al llegar al final de la página la última época puede no cruzar nunca
    // la franja superior que vigila el observer de abajo: mientras estemos
    // pegados al fondo se fuerza a mano y se ignoran sus eventos, para que
    // no se pisen entre sí.
    const lastId = sectionIds[sectionIds.length - 1];
    const atBottomRef = { current: false };

    const observer = new IntersectionObserver(
      (entries) => {
        if (atBottomRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { root, rootMargin: '-10% 0px -75% 0px' },
    );
    sections.forEach((section) => observer.observe(section));

    const onScroll = () => {
      const atBottom = root.scrollTop + root.clientHeight >= root.scrollHeight - 4;
      atBottomRef.current = atBottom;
      if (atBottom) setActiveId(lastId);
    };
    root.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      root.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join('|')]);

  return activeId;
}

/** Envuelve un hito y lo hace aparecer con un pequeño desvanecido al entrar en pantalla. */
function RevealOnScroll({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const root = document.getElementById('main-scroll-container');
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { root, threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function HistoriaPage({ onNavigate }) {
  const eraSlugs = eras.map((era) => era.slug);
  const activeEra = useScrollSpy(eraSlugs);
  const navRef = useRef(null);

  // Cuando la época activa cambia por el propio scroll, su píldora se
  // mantiene visible dentro de la barra horizontal (por si hay muchas épocas
  // y no caben todas en pantalla a la vez, sobre todo en móvil). Se mueve
  // solo el scroll horizontal de la propia barra — nunca scrollIntoView,
  // que también movería el scroll vertical de la página y pelearía con el
  // salto a la época al hacer clic.
  useEffect(() => {
    const nav = navRef.current;
    const btn = nav?.querySelector(`[data-era="${activeEra}"]`);
    if (!nav || !btn) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    if (btnRect.left < navRect.left || btnRect.right > navRect.right) {
      const delta = btnRect.left - navRect.left - (nav.clientWidth - btn.clientWidth) / 2;
      nav.scrollTo({ left: nav.scrollLeft + delta, behavior: 'smooth' });
    }
  }, [activeEra]);

  const scrollToEra = (slug) => {
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">Eje cronológico interactivo</p>
      <h1 className="mt-2 text-balance font-serif text-3xl sm:text-5xl font-bold text-pergamino">
        Historia de Cercadillo
      </h1>
      <p className="mt-4 text-balance text-lg text-pergamino-muted/80">
        De la comarca arévaca y romana a la repoblación medieval del siglo XI, y de ahí a la pequeña pedanía de
        Sigüenza que es Cercadillo hoy. Toca una época para saltar a ella, o simplemente haz scroll: la cronología es
        breve, construida solo con fuentes públicas verificables (ver capítulo 6 de{' '}
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
        ref={navRef}
        aria-label="Saltar a una época"
        className="sticky top-0 z-20 -mx-4 mt-8 flex gap-2 overflow-x-auto border-y border-noche-border bg-noche/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-3"
      >
        {eras.map((era) => (
          <button
            key={era.slug}
            type="button"
            data-era={era.slug}
            onClick={() => scrollToEra(era.slug)}
            aria-current={activeEra === era.slug ? 'true' : undefined}
            className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-3.5 py-1.5 font-display text-xs font-bold uppercase tracking-wide transition-colors ${
              activeEra === era.slug
                ? 'border-armuna-light bg-armuna-light/15 text-armuna-light'
                : 'border-noche-border text-pergamino-muted/60 hover:text-pergamino'
            }`}
          >
            {era.shortTitle}
          </button>
        ))}
      </nav>

      <div className="relative mt-10 pl-9 sm:pl-11">
        <div className="absolute bottom-1 top-1 w-px bg-noche-border" style={{ left: 15 }} aria-hidden="true" />

        <div className="space-y-14">
          {eras.map((era) => (
            <section key={era.slug} id={era.slug} className="relative scroll-mt-20">
              <span
                className="absolute top-0 h-4 w-4 rounded-full border-2 border-noche bg-armuna-light sm:h-[18px] sm:w-[18px]"
                style={{ left: -29 }}
                aria-hidden="true"
              />
              <h2 className="font-serif text-xl font-bold text-armuna-light sm:text-2xl">{era.title}</h2>

              <div className="mt-6 space-y-6">
                {era.events.map((ev, idx) => (
                  <RevealOnScroll key={idx} className="relative">
                    <span
                      className="absolute top-1.5 h-2.5 w-2.5 rounded-full bg-piedra-300"
                      style={{ left: -26 }}
                      aria-hidden="true"
                    />
                    <span className="inline-block rounded-lg border border-noche-border bg-piedra-900/80 px-3 py-1 font-mono text-sm font-bold text-piedra-300">
                      {ev.year}
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-pergamino-muted/85 sm:text-base">{ev.text}</p>
                    {ev.tab && (
                      <button
                        type="button"
                        onClick={() => onNavigate(ev.tab, ev.target)}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-armuna-light hover:underline cursor-pointer"
                      >
                        Ver más en {navItems.find((n) => n.id === ev.tab)?.label ?? ev.tab} →
                      </button>
                    )}
                  </RevealOnScroll>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
