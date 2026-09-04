import React from 'react';
import VisitorStatsModal from '../components/VisitorStatsModal';
import InstagramFeed from '../components/InstagramFeed';
import { counters } from '../data/site';
import {
  History,
  MapPin,
  PartyPopper,
  Shield,
  Church,
  BookOpen,
  Map,
  Users,
  BookMarked,
  Library,
  Info,
} from 'lucide-react';

const sections = [
  {
    id: 'historia',
    icon: History,
    title: 'Historia',
    description: 'Eje cronológico del pueblo, de la repoblación medieval del siglo XI a la actualidad.',
  },
  {
    id: 'lugares',
    icon: MapPin,
    title: 'Lugares',
    description: 'El patrimonio documentado de Cercadillo: la iglesia, las ermitas y las infraestructuras tradicionales.',
  },
  {
    id: 'fiestas',
    icon: PartyPopper,
    title: 'Fiestas',
    description: 'La fiesta patronal de San Roque, los días 15 y 16 de agosto.',
  },
  {
    id: 'escudo',
    icon: Shield,
    title: 'El Escudo',
    description: 'Cercadillo no tiene escudo heráldico oficial: sección reservada por si en el futuro se define uno.',
    // Oculto de momento: Cercadillo no tiene escudo oficial (ver Nav.jsx).
    hidden: true,
  },
  {
    id: 'iglesia',
    icon: Church,
    title: 'La Iglesia',
    description: 'Arquitectura de la Iglesia de la Natividad de Nuestra Señora, el monumento principal del pueblo.',
  },
  {
    id: 'libro',
    icon: BookOpen,
    title: 'El Libro',
    description: 'Seis capítulos sobre la geografía, los orígenes medievales y el patrimonio de Cercadillo.',
  },
  {
    id: 'rutas',
    icon: Map,
    title: 'Rutas',
    description: 'Rutas de senderismo y BTT que atraviesan Cercadillo, recopiladas de Wikiloc.',
  },
  {
    id: 'genealogia',
    icon: Users,
    title: 'Genealogía',
    description: 'Página en construcción: próximamente, familias y paisanos de Cercadillo.',
  },
  {
    id: 'glosario',
    icon: BookMarked,
    title: 'Glosario',
    description: 'Página en construcción: vocabulario tradicional propio de Cercadillo.',
  },
  {
    id: 'referencias',
    icon: Library,
    title: 'Referencias',
    description: 'Fuentes documentales, archivos históricos, hemeroteca y estudios de los que proceden los datos.',
  },
  {
    id: 'sobre-la-web',
    icon: Info,
    title: 'Sobre la web',
    description: 'Por qué existe este proyecto y de dónde sale la información.',
  },
];

export default function InicioPage({ onNavigate }) {
  return (
    <div className="flex flex-col">
      {/* Definición del recorte orgánico de la foto del hero. clipPathUnits
          "objectBoundingBox" hace que el trazado (en valores 0-1) se adapte
          al tamaño real de la imagen en cualquier resolución. */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <clipPath id="hero-organic-clip" clipPathUnits="objectBoundingBox">
            <path d="M0.30,0 C0.10,0.176 0,0.412 0.075,0.647 C0.1375,0.838 0.05,0.971 0.225,1 L1,1 L1,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Hero */}
      <section className="container-editorial py-10 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <p className="kicker">El pueblo</p>
            <h1 className="mt-2 text-balance font-serif text-3xl sm:text-5xl font-bold text-pergamino">
              Cercadillo, una pedanía de Sigüenza
            </h1>
            <p className="mt-4 text-balance text-lg font-medium text-piedra-200">
              Este es un archivo digital abierto para documentar y dar a conocer la historia, los orígenes, la evolución y las curiosidades de Cercadillo, de forma que su memoria no dependa solo del recuerdo de sus vecinos.
            </p>
            <div className="mt-5 space-y-4 text-pergamino-muted/80 leading-relaxed">
              <p>
                Cercadillo es un pequeño núcleo de población de la provincia de Guadalajara, a 994 metros de altitud, en la
                Sierra Norte. Desde 1973 pertenece al municipio de Sigüenza, del que dista unos 16 km, y hoy cuenta con
                apenas 17 habitantes según el último censo del INE (2011).
              </p>
              <p>
                Documentado desde finales del siglo XI como una de las 131 aldeas de la Comunidad de Villa y Tierra de
                Atienza, Cercadillo fue municipio independiente hasta 1973, cuando se incorporó a Sigüenza junto a Horna y
                Bujarrabal. Conserva como patrimonio principal la iglesia parroquial de la Natividad de Nuestra Señora
                (siglo XVI) y dos ermitas, y celebra cada año sus fiestas patronales en honor a San Roque.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('libro')}
                className="btn-secondary cursor-pointer"
              >
                Descubre toda la historia en El Libro
              </button>
              <VisitorStatsModal />
            </div>
          </div>

          <div className="relative">
            <img
              src="/Cercadillo/images/iglesia-cercadillo-hero.jpg"
              alt="La iglesia de la Natividad de Nuestra Señora, en Cercadillo"
              className="h-64 w-full object-cover shadow-xl sm:h-80 lg:h-[420px]"
              style={{ clipPath: 'url(#hero-organic-clip)' }}
              width="400"
              height="300"
            />
          </div>
        </div>
      </section>

      {/* Tarjetas de Datos Clave (Counters) */}
      <section className="border-y border-noche-border bg-noche-surface/50 py-12">
        <div className="container-editorial">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {counters.map((c) => (
              <div key={c.label} className="card-editorial flex min-w-0 flex-col justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-wider text-armuna-light uppercase">{c.label}</p>
                  <p
                    className={`mt-2 whitespace-nowrap font-display font-black text-pergamino ${
                      c.value.length > 8 ? 'text-xl sm:text-2xl' : 'text-3xl'
                    }`}
                  >
                    {c.value} {c.suffix && <span className="text-xl font-normal text-armuna-light">{c.suffix}</span>}
                  </p>
                </div>
                <p className="mt-3 text-xs text-pergamino-muted/65">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InstagramFeed />

      {/* Cuadrícula de Secciones */}
      <section className="container-editorial py-14 sm:py-20">
        <p className="kicker">En esta web</p>
        <h2 className="mt-2 font-serif text-2xl sm:text-4xl font-bold text-pergamino">Qué vas a encontrar</h2>
        <p className="mt-3 text-pergamino-muted/70">
          Cada apartado documenta una parte distinta del pueblo: su historia y sus orígenes, sus lugares, su gente, sus
          tradiciones y sus curiosidades.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.filter((s) => !s.hidden).map(({ id, icon: Icon, title, description }) => (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className="group flex flex-col gap-3 rounded-2xl border border-noche-border bg-noche-card/80 p-6 text-left transition-all hover:-translate-y-1 hover:border-piedra-400/50 hover:bg-noche-surface hover:shadow-xl cursor-pointer"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-armuna/15 text-armuna-light group-hover:scale-110 transition-transform">
                <Icon size={20} strokeWidth={2} />
              </span>
              <span className="font-serif text-lg font-semibold text-pergamino group-hover:text-armuna-light transition-colors">{title}</span>
              <span className="text-sm text-pergamino-muted/70 leading-relaxed">{description}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
