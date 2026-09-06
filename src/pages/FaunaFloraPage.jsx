import React from 'react';
import { ShieldCheck, AlertTriangle, Leaf, Bird } from 'lucide-react';
import { zonasProtegidas, flora, fauna, GRUPOS_FAUNA } from '../data/faunaFloraData';
import SpeciesCard from '../components/SpeciesCard';

export default function FaunaFloraPage({ onNavigate }) {
  return (
    <div className="container-editorial py-10 sm:py-16">
      {/* Cabecera de la sección: sin foto propia (se explica al final por qué las
          imágenes de especies vienen de Wikimedia Commons), con la textura de la
          identidad visual del sitio en vez de una imagen de portada. */}
      <div className="brand-panel relative overflow-hidden rounded-3xl border border-noche-border p-6 shadow-xl sm:p-10 lg:p-14">
        <div className="relative z-10">
          <p className="kicker">Un pueblo entre saladares · Red Natura 2000</p>
          <h1 className="mt-3 max-w-2xl text-balance font-serif text-3xl sm:text-5xl font-bold text-pergamino">
            Fauna y Flora
          </h1>
          <p className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-pergamino-muted/80 sm:text-base">
            El término de Cercadillo alberga un paisaje salino singular en pleno interior peninsular, protegido por
            tres figuras distintas de conservación. Estas son las especies de aves, rapaces y plantas que hacen de
            este entorno un lugar único.
          </p>
        </div>
      </div>

      <div className="mt-12 space-y-10">
        {/* Las tres figuras de protección */}
        <div className="grid gap-5 sm:grid-cols-3">
          {zonasProtegidas.map((zona) => (
            <article key={zona.id} className="card-editorial p-6">
              <div className="flex items-center gap-2.5 text-armuna-light">
                <ShieldCheck size={22} />
                <span className="kicker">{zona.tipo}</span>
              </div>
              <h2 className="mt-2.5 font-serif text-lg font-bold text-pergamino">{zona.nombre}</h2>
              {zona.codigo && (
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-pergamino-muted/60">
                  Código {zona.codigo}
                </p>
              )}
              <p className="mt-2.5 text-sm leading-relaxed text-pergamino-muted/80">{zona.descripcion}</p>
            </article>
          ))}
        </div>

        {/* El paisaje salino y el enlace a Ni catas ni minas */}
        <article className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">Un saladar a 1.000 metros de altitud</h2>
          <p className="mt-3 leading-relaxed text-pergamino-muted/80 text-sm sm:text-base">
            Los saladares de interior son un tipo de hábitat muy escaso: suelos con alta concentración de sales que
            solo unas pocas plantas especializadas (halófilas) son capaces de colonizar. Encontrar uno en la meseta
            castellana, lejos de cualquier costa y a una altitud próxima a los 1.000 metros, es una rareza geológica y
            botánica que explica por qué el entorno de Cercadillo cuenta con tres figuras de protección superpuestas:
            la ZEPA, el LIC/ZEC y la microrreserva de los Saladares.
          </p>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-armuna-light/40 bg-noche-surface p-4 sm:p-5">
            <AlertTriangle size={22} className="mt-0.5 shrink-0 text-armuna-light" />
            <div>
              <p className="text-sm leading-relaxed text-pergamino-muted/85 sm:text-base">
                Este mismo paisaje protegido es uno de los argumentos centrales frente al proyecto de investigación
                minera que amenaza la Sierra Norte de Guadalajara.
              </p>
              <button
                type="button"
                onClick={() => onNavigate?.('ni-catas-ni-minas')}
                className="btn-secondary mt-3.5"
              >
                Ver por qué preocupa el proyecto minero
              </button>
            </div>
          </div>
        </article>

        {/* Flora */}
        <div>
          <div className="mb-5 flex items-center gap-2.5 text-armuna-light">
            <Leaf size={22} />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">Flora del saladar</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {flora.map((especie) => (
              <SpeciesCard key={especie.id} {...especie} />
            ))}
          </div>
        </div>

        {/* Fauna, agrupada */}
        <div>
          <div className="mb-5 flex items-center gap-2.5 text-armuna-light">
            <Bird size={22} />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">Fauna</h2>
          </div>

          <div className="space-y-8">
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

        {/* Fuentes y atribución de las fotos */}
        <article className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-lg font-bold text-pergamino">Sobre las fotografías y las fuentes</h2>
          <p className="mt-3 text-sm leading-relaxed text-pergamino-muted/80">
            Las imágenes de esta página se obtienen en el momento de la visita desde Wikimedia Commons, buscando por
            el nombre científico de cada especie, y llevan siempre la atribución de su autor y licencia cuando está
            disponible. No son fotografías tomadas en Cercadillo, sino imágenes de referencia de cada especie.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-pergamino-muted/80">
            Los datos de designación (códigos, superficies y fechas) proceden de fuentes públicas y de prensa
            comarcal y están pendientes de una verificación final con la Junta de Comunidades de Castilla-La Mancha.
          </p>
        </article>
      </div>
    </div>
  );
}
