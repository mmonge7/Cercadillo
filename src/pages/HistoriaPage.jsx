import React from 'react';
import { navItems } from '../components/Nav';

const eras = [
  {
    title: 'Edad Media (siglos XI–XV)',
    events: [
      {
        year: '1085',
        text: 'Alfonso VI conquista Atienza y arranca la repoblación cristiana de la comarca en la que más tarde nacerá Cercadillo.',
        tab: 'libro',
      },
      {
        year: '1149',
        text: 'Alfonso VII otorga el fuero de Atienza y nace la Comunidad de Villa y Tierra de Atienza, con Cercadillo entre sus 131 aldeas.',
        tab: 'libro',
      },
      {
        year: 'Siglos XII–XIII',
        text: 'La comarca recibe privilegios reales posteriores, tradicionalmente atribuidos a Alfonso VIII y Fernando III.',
        tab: 'libro',
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
    ],
  },
  {
    title: 'Siglo XIX',
    events: [
      {
        year: '1833',
        text: 'La reforma provincial de Javier de Burgos integra Atienza y su tierra —Cercadillo incluido— en la nueva provincia de Guadalajara.',
        tab: 'libro',
      },
      {
        year: '1845–1850',
        text: 'Pascual Madoz censa a Cercadillo como municipio independiente, con 198 habitantes, en su Diccionario geográfico-estadístico-histórico.',
        tab: 'libro',
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
        Casi mil años de historia documentada: de la repoblación medieval del siglo XI a la pequeña pedanía de
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
                        onClick={() => onNavigate(ev.tab)}
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
