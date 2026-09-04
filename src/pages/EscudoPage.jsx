import React from 'react';
import { Shield, Hammer } from 'lucide-react';

export default function EscudoPage() {
  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">Heráldica municipal</p>
      <h1 className="mt-2 text-balance font-serif text-3xl sm:text-5xl font-bold text-pergamino">
        El Escudo
      </h1>
      <p className="mt-4 text-balance text-lg text-pergamino-muted/80">
        Cercadillo, al perder su ayuntamiento propio en 1973, no tiene un escudo heráldico oficial propio.
      </p>

      <div className="card-editorial mt-10 flex flex-col items-center gap-4 p-10 text-center">
        <div className="flex items-center gap-3 text-armuna-light">
          <Shield size={28} />
          <Hammer size={24} />
        </div>
        <h2 className="font-serif text-2xl font-bold text-pergamino">Sección reservada</h2>
        <p className="max-w-prose text-sm leading-relaxed text-pergamino-muted/80 sm:text-base">
          Esta página está lista para el día en que el pueblo defina un símbolo propio. Mientras tanto no
          hay ningún escudo que mostrar aquí, y por eso la sección permanece oculta del menú principal.
        </p>
      </div>
    </div>
  );
}
