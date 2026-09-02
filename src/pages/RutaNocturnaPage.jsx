import React, { Suspense, lazy } from 'react';

// Leaflet solo hace falta en esta página: se carga aparte para que el resto de
// la web arranque con menos JavaScript.
const RouteMap = lazy(() => import('../components/RouteMap'));

export default function RutaNocturnaPage({ target }) {
  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">Guía de campo y senderismo</p>
      <h1 className="mt-2 text-balance font-serif text-3xl font-bold text-pergamino sm:text-5xl">
        Ruta Nocturna: de Moriscos al soto de La Flecha
      </h1>
      <p className="mt-4 text-balance text-lg leading-relaxed text-pergamino-muted/80">
        Un itinerario senderista e histórico de 7,7 kilómetros que atraviesa el vértice geodésico &laquo;Andorra&raquo;,
        los escenarios de la batalla de 1812 y el antiguo despoblado de Ribas, hasta alcanzar el oratorio donde se
        retiró Fray Luis de León junto al río Tormes.
      </p>

      <div className="mt-10">
        <Suspense
          fallback={
            <div className="flex h-[420px] items-center justify-center rounded-2xl border border-noche-border bg-noche-surface/60 text-sm text-pergamino-muted/70 sm:h-[520px]">
              Cargando el mapa de la ruta…
            </div>
          }
        >
          <RouteMap target={target} />
        </Suspense>
      </div>
    </div>
  );
}
