import React from 'react';
import { Hammer } from 'lucide-react';

const patrimonio = [
  {
    title: 'Iglesia Parroquial de la Natividad de Nuestra Señora',
    description:
      'El edificio más monumental del pueblo, construido en el siglo XVI. Consta de tres naves y conserva en su interior altares platerescos.',
    tab: 'iglesia',
  },
  {
    title: 'Ermita de La Soledad',
    description:
      'Una de las dos ermitas históricas de Cercadillo, tradicional punto de rogativas y devoción de los vecinos.',
  },
  {
    title: 'Ermita de Santo Domingo',
    description:
      'La segunda ermita del término, parte del mismo patrimonio religioso que la iglesia parroquial y la ermita de La Soledad.',
  },
  {
    title: 'Fuente y lavadero',
    description:
      'Infraestructuras comunitarias tradicionales, punto de encuentro vecinal hasta la llegada del agua corriente doméstica.',
  },
];

export default function LugaresPage({ onNavigate }) {
  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">Geografía y memoria</p>
      <h1 className="mt-2 text-balance font-serif text-3xl sm:text-5xl font-bold text-pergamino">
        Lugares de Cercadillo
      </h1>
      <p className="mt-4 text-balance text-lg text-pergamino-muted/80">
        El patrimonio de Cercadillo que hoy podemos documentar con fuentes públicas: una iglesia del siglo XVI, dos
        ermitas y las infraestructuras tradicionales del pueblo.
      </p>

      <div className="mt-12">
        <div className="grid gap-5 sm:grid-cols-2">
          {patrimonio.map((l) => (
            <div key={l.title} className="card-editorial flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-pergamino">{l.title}</h3>
                <p className="mt-2 text-sm text-pergamino-muted/75 leading-relaxed">{l.description}</p>
              </div>
              {l.tab && (
                <button
                  type="button"
                  onClick={() => onNavigate(l.tab)}
                  className="mt-4 text-xs font-semibold text-armuna-light hover:underline text-left cursor-pointer"
                >
                  Ver más en {l.tab.replace('-', ' ')} →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card-editorial mt-12 flex flex-col items-center gap-3 p-8 text-center">
        <Hammer size={24} className="text-armuna-light" />
        <h2 className="font-serif text-xl font-bold text-pergamino">Nos falta documentar más lugares</h2>
        <p className="max-w-prose text-sm leading-relaxed text-pergamino-muted/80">
          Todavía no tenemos fuentes verificables sobre parajes naturales, cotas del término o lugares desaparecidos
          propios de Cercadillo. Si conoces topónimos, caminos históricos o rincones del pueblo que deberían estar
          aquí, escríbenos a través de los enlaces del pie de página — es justo el tipo de aportación que más ayuda a
          completar esta sección.
        </p>
        <p className="text-sm text-pergamino-muted/70">
          Mientras tanto, puedes ver las rutas de senderismo y BTT que atraviesan el término en{' '}
          <button
            type="button"
            onClick={() => onNavigate('rutas')}
            className="underline decoration-dotted underline-offset-2 hover:text-armuna-light cursor-pointer"
          >
            Rutas
          </button>
          .
        </p>
      </div>
    </div>
  );
}
