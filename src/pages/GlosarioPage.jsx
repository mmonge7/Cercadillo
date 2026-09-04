import React from 'react';
import { BookMarked, Hammer } from 'lucide-react';

export default function GlosarioPage() {
  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">El habla de la tierra</p>
      <h1 className="mt-2 text-balance font-serif text-3xl font-bold text-pergamino sm:text-5xl">Glosario</h1>
      <p className="mt-4 text-balance text-lg text-pergamino-muted/80">
        Esta sección recogerá el vocabulario tradicional propio de Cercadillo y su comarca: aperos, medidas
        agrícolas, topónimos y palabras que forman parte de la memoria oral del pueblo.
      </p>

      <div className="card-editorial mt-10 flex flex-col items-center gap-4 p-10 text-center">
        <div className="flex items-center gap-3 text-armuna-light">
          <BookMarked size={28} />
          <Hammer size={24} />
        </div>
        <h2 className="font-serif text-2xl font-bold text-pergamino">Página en construcción</h2>
        <p className="max-w-prose text-sm leading-relaxed text-pergamino-muted/80 sm:text-base">
          No hemos encontrado fuentes públicas fiables sobre el habla y el vocabulario tradicional específico de
          Cercadillo, así que preferimos dejar esta sección vacía en vez de rellenarla con términos genéricos que no
          serían realmente suyos. Si conoces palabras, expresiones o nombres de aperos propios del pueblo, escríbenos
          a través de los enlaces del pie de página.
        </p>
      </div>
    </div>
  );
}
