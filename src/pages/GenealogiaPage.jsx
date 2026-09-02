import React, { useEffect, useRef } from 'react';
import { Award, Trees } from 'lucide-react';
import { personajes } from '../data/personajesData';
import Markdown from '../components/Markdown';

export default function GenealogiaPage({ target }) {
  const targetRef = useRef(null);

  useEffect(() => {
    if (!target || !targetRef.current) return;
    targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [target]);

  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">Bosque genealógico</p>
      <h1 className="mt-2 text-balance font-serif text-3xl font-bold text-pergamino sm:text-5xl">
        Paisanos ilustres y memoria familiar
      </h1>
      <p className="mt-4 text-balance text-lg text-pergamino-muted/80">
        Son &laquo;morisqueños&raquo; quienes cuentan con un lazo de unión con el pueblo de Moriscos. Esta condición se
        acredita incorporándose al Bosque Genealógico, con registros que se remontan a 1645.
      </p>

      <div className="card-editorial mt-10 p-6 sm:p-8">
        <div className="flex items-center gap-3 text-armuna-light">
          <Trees size={28} />
          <h2 className="font-serif text-2xl font-bold text-pergamino">El Bosque Genealógico</h2>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-pergamino-muted/80 sm:text-base">
          El archivo parroquial de San Pedro Apóstol custodia un registro demográfico excepcional que permite
          reconstruir los árboles genealógicos de las familias morisqueñas desde el siglo XVII. Los apellidos
          tradicionales (Blanco, Romo, Pedraz, Crespo, Salvador, Domínguez, García...) entrelazan la historia del
          municipio con las localidades vecinas de Castellanos de Moriscos, Cabrerizos y Aldealengua.
        </p>
      </div>

      <div className="mt-14">
        <p className="kicker">Biografías destacadas</p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-armuna-light sm:text-3xl">
          Personajes e hijos ilustres
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {personajes.map((p) => {
            const isTarget = p.id === target;
            return (
              <article
                key={p.id}
                id={p.id}
                ref={isTarget ? targetRef : null}
                className={`card-editorial flex flex-col ${isTarget ? 'search-target border-armuna-light/60' : ''}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded border border-noche-border bg-piedra-900/80 px-2.5 py-1 font-mono text-xs text-piedra-300">
                    {p.years || 'Historia viva'}
                  </span>
                  {p.tag ? (
                    <span className="rounded border border-armuna/20 bg-armuna/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-armuna-light">
                      {p.tag}
                    </span>
                  ) : (
                    <Award size={16} className="text-armuna-light" />
                  )}
                </div>
                <h3 className="mt-3 font-serif text-lg font-bold text-pergamino">{p.name}</h3>
                {p.role && <p className="mt-0.5 text-xs font-semibold text-armuna-light">{p.role}</p>}
                <Markdown content={p.content} className="prose-chapter prose-sm mt-3 text-xs sm:text-sm" />
              </article>
            );
          })}
        </div>
      </div>

      <div className="card-editorial mt-16 p-6 sm:p-8">
        <h2 className="font-serif text-2xl font-bold text-armuna-light">¿Eres morisqueño?</h2>
        <p className="mt-3 leading-relaxed text-pergamino-muted/80">
          Comprueba si ya figuras en el Bosque Genealógico o solicita tu incorporación escribiendo a{' '}
          <a
            href="mailto:moriscos.info@gmail.com"
            className="font-semibold text-armuna-light hover:underline"
          >
            moriscos.info@gmail.com
          </a>
          . Podrás decidir qué datos hacer públicos y aparecer etiquetado en el archivo fotográfico &laquo;Ventanas del
          Ayer y Hoy&raquo;, con más de 250 morisqueños identificados desde 1930.
        </p>
      </div>
    </div>
  );
}
