import React from 'react';
import { Images, Hammer } from 'lucide-react';

export default function GaleriaPage() {
  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">Memoria visual</p>
      <h1 className="mt-2 text-balance font-serif text-3xl font-bold text-pergamino sm:text-5xl">
        Galería fotográfica
      </h1>
      <p className="mt-4 text-balance text-lg text-pergamino-muted/80">
        Esta sección reunirá un repositorio con todas las fotografías que tenemos del pueblo: su paisaje, su
        arquitectura, sus fiestas y la vida cotidiana de Cercadillo a lo largo del tiempo.
      </p>

      <div className="card-editorial mt-10 flex flex-col items-center gap-4 p-10 text-center">
        <div className="flex items-center gap-3 text-armuna-light">
          <Images size={28} />
          <Hammer size={24} />
        </div>
        <h2 className="font-serif text-2xl font-bold text-pergamino">Página en construcción</h2>
        <p className="max-w-prose text-sm leading-relaxed text-pergamino-muted/80 sm:text-base">
          Estamos organizando las fotografías del pueblo para poder mostrarlas aquí. Si tienes imágenes de
          Cercadillo que quieras compartir, escríbenos a través de los enlaces del pie de página.
        </p>
      </div>
    </div>
  );
}
