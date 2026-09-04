import React from 'react';
import { Trees, Hammer } from 'lucide-react';

export default function GenealogiaPage() {
  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">Bosque genealógico</p>
      <h1 className="mt-2 text-balance font-serif text-3xl font-bold text-pergamino sm:text-5xl">
        Paisanos y memoria familiar
      </h1>
      <p className="mt-4 text-balance text-lg text-pergamino-muted/80">
        Esta sección recogerá los apellidos tradicionales y las familias de Cercadillo, junto con biografías de
        vecinos y "morcilleros" ilustres con vínculo al pueblo.
      </p>

      <div className="card-editorial mt-10 flex flex-col items-center gap-4 p-10 text-center">
        <div className="flex items-center gap-3 text-armuna-light">
          <Trees size={28} />
          <Hammer size={24} />
        </div>
        <h2 className="font-serif text-2xl font-bold text-pergamino">Página en construcción</h2>
        <p className="max-w-prose text-sm leading-relaxed text-pergamino-muted/80 sm:text-base">
          Estamos recopilando la información de las familias de Cercadillo. En cuanto esté lista, aquí encontrarás
          el árbol genealógico del pueblo y las biografías de sus vecinos más destacados.
        </p>
      </div>
    </div>
  );
}
