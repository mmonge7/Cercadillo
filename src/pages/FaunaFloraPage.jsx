import React from 'react';
import { ShieldCheck, Leaf, Bird, BookOpen } from 'lucide-react';
import { datosEspacio, elementosClave, flora, fauna, GRUPOS_FAUNA } from '../data/faunaFloraData';
import SpeciesCard from '../components/SpeciesCard';

const LIBRO_CAPITULO_ID = '01-marco-geografico-y-administrativo';

export default function FaunaFloraPage({ onNavigate }) {
  return (
    <div className="container-editorial py-10 sm:py-16">
      {/* Cabecera ligera: sin foto propia (las imágenes de especie llegan más
          abajo, en vivo, desde Wikimedia Commons), con la textura de marca. */}
      <div className="brand-panel relative overflow-hidden rounded-3xl border border-noche-border p-6 shadow-xl sm:p-10 lg:p-14">
        <div className="relative z-10">
          <p className="kicker">Un saladar a 1.000 metros de altitud</p>
          <h1 className="mt-3 max-w-2xl text-balance font-serif text-3xl sm:text-5xl font-bold text-pergamino">
            Fauna y Flora
          </h1>
          <p className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-pergamino-muted/80 sm:text-base">
            Casi el 29% del término de Cercadillo forma parte de un espacio protegido único: un valle salino de
            interior donde conviven águilas, murciélagos y plantas que en cualquier otro lugar de la meseta solo
            existirían en la costa.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-armuna/30 bg-armuna/10 px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-armuna-light">
              ZEPA {datosEspacio.zepa} · protege las aves
            </span>
            <span className="rounded-full border border-armuna/30 bg-armuna/10 px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-armuna-light">
              LIC/ZEC {datosEspacio.zec} · protege hábitats y el resto de fauna y flora
            </span>
          </div>

          <div className="mt-8 grid max-w-lg grid-cols-3 gap-4">
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-armuna-dark">
                {datosEspacio.porcentajeCercadillo}%
              </div>
              <div className="mt-0.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-piedra-300">
                Del término protegido
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-armuna-dark">2</div>
              <div className="mt-0.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-piedra-300">
                Microrreservas
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-armuna-dark">~15</div>
              <div className="mt-0.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-piedra-300">
                Parejas de rapaces
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Las dos figuras y los dos elementos clave, en una franja compacta. */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {elementosClave.map((el) => (
          <div key={el.id} className="card-editorial flex items-start gap-3.5 p-5">
            <ShieldCheck size={22} className="mt-0.5 shrink-0 text-armuna-light" />
            <div>
              <h2 className="font-serif text-base font-bold text-pergamino">{el.nombre}</h2>
              <p className="mt-1 text-sm leading-relaxed text-pergamino-muted/80">{el.descripcion}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Flora */}
      <div className="mt-12">
        <div className="mb-5 flex items-center gap-2.5 text-armuna-light">
          <Leaf size={20} />
          <h2 className="font-serif text-lg font-bold text-armuna-light sm:text-xl">Flora del saladar</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {flora.map((especie) => (
            <SpeciesCard key={especie.id} {...especie} />
          ))}
        </div>
      </div>

      {/* Fauna, agrupada */}
      <div className="mt-12">
        <div className="mb-5 flex items-center gap-2.5 text-armuna-light">
          <Bird size={20} />
          <h2 className="font-serif text-lg font-bold text-armuna-light sm:text-xl">Fauna</h2>
        </div>

        <div className="space-y-7">
          {GRUPOS_FAUNA.map((grupo) => {
            const especies = fauna.filter((especie) => especie.grupo === grupo);
            if (!especies.length) return null;
            return (
              <div key={grupo}>
                <h3 className="kicker mb-3.5">{grupo}</h3>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {especies.map((especie) => (
                    <SpeciesCard key={especie.id} {...especie} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA al capítulo del libro con el detalle completo y las fuentes. */}
      <div className="mt-12 card-editorial flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-3.5">
          <BookOpen size={22} className="mt-0.5 shrink-0 text-armuna-light" />
          <div>
            <h2 className="font-serif text-base font-bold text-pergamino">¿Quieres saber más?</h2>
            <p className="mt-1 text-sm leading-relaxed text-pergamino-muted/80">
              El listado completo de especies, los datos oficiales y las fuentes de esta sección están en El Libro,
              junto con el resto de la geografía de Cercadillo.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate?.('libro', LIBRO_CAPITULO_ID)}
          className="btn-primary shrink-0"
        >
          Leer el capítulo completo
        </button>
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-pergamino-muted/60">
        Las fotografías se buscan en el momento desde Wikimedia Commons por el nombre científico de cada especie, con
        su atribución. No son fotografías tomadas en Cercadillo.
      </p>
    </div>
  );
}
