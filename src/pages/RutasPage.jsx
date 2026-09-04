import React from 'react';
import { Footprints, Bike, ExternalLink } from 'lucide-react';
import { routes } from '../data/routes';

const ACTIVITY = {
  senderismo: { label: 'Senderismo', Icon: Footprints },
  btt: { label: 'BTT / Mountain bike', Icon: Bike },
};

export default function RutasPage() {
  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">Guía de campo y senderismo</p>
      <h1 className="mt-2 text-balance font-serif text-3xl font-bold text-pergamino sm:text-5xl">
        Rutas por Cercadillo y su entorno
      </h1>
      <p className="mt-4 text-balance text-lg leading-relaxed text-pergamino-muted/80">
        Una primera selección de rutas de senderismo y BTT que atraviesan Cercadillo, recopiladas de Wikiloc. Cada
        tarjeta enlaza a la ficha completa (track GPX, perfil de elevación y fotos). Iremos ampliando esta sección
        con más rutas y, más adelante, con un mapa interactivo propio.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {routes.map((route) => {
          const activity = ACTIVITY[route.activity];
          const Icon = activity.Icon;
          return (
            <a
              key={route.id}
              href={route.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-editorial group flex flex-col justify-between gap-4 transition-transform hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center gap-2 text-armuna-light">
                  <Icon size={20} />
                  <span className="text-xs font-semibold uppercase tracking-wider">{activity.label}</span>
                </div>
                <h2 className="mt-3 font-serif text-xl font-bold text-pergamino">{route.title}</h2>
                {route.distanceKm != null && (
                  <p className="mt-2 text-sm text-pergamino-muted/70">{route.distanceKm} km</p>
                )}
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-armuna-light group-hover:underline">
                Ver en Wikiloc <ExternalLink size={14} />
              </span>
            </a>
          );
        })}
      </div>

      <p className="mt-10 text-sm text-pergamino-muted/60">
        ¿Conoces otra ruta por Cercadillo que debería estar aquí? Escríbenos a través de los enlaces del pie de
        página.
      </p>
    </div>
  );
}
