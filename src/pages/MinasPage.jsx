import React from 'react';
import { Instagram, Twitter, ExternalLink, AlertTriangle } from 'lucide-react';

const fuentes = [
  {
    id: 'eldiario-quimera',
    medio: 'eldiario.es',
    titulo: 'La quimera del oro en la Sierra Norte de Guadalajara: la comarca rechaza el proyecto',
    url: 'https://www.eldiario.es/castilla-la-mancha/social/quimera-oro-sierra-norte-guadalajara-rechaza-comarca_1_13082546.html',
  },
  {
    id: 'eldiario-documentacion',
    medio: 'eldiario.es',
    titulo: 'La empresa que quiere buscar oro en Guadalajara ha presentado documentación para seguir con el proyecto',
    url: 'https://www.eldiario.es/castilla-la-mancha/provincias/guadalajara/empresa-quiere-buscar-oro-guadalajara-presentado-documentacion-seguir-proyecto_1_13243253.html',
  },
  {
    id: 'eldiario-bruselas',
    medio: 'eldiario.es',
    titulo: 'La lucha contra las minas de oro de Guadalajara llega a Bruselas de la mano de otros pueblos contra el extractivismo',
    url: 'https://www.eldiario.es/castilla-la-mancha/provincias/guadalajara/lucha-minas-oro-guadalajara-llega-bruselas-mano-pueblos-extractivismo_1_13218172.html',
  },
  {
    id: 'decano-oroberia',
    medio: 'El Decano de Guadalajara',
    titulo: 'Oroberia no desiste en su empeño de buscar oro en la Sierra Norte de Guadalajara',
    url: 'https://eldecanodeguadalajara.com/index.php/news/17592/oroberia-no-desiste-en-su-empe%C3%B1o-de-buscar-oro-en-la-sierra-norte-de-guadalajara/',
  },
  {
    id: 'nuevaalcarria-cauces',
    medio: 'Nueva Alcarria',
    titulo: 'La investigación de oro en la Sierra Norte amenaza a 40 kilómetros de cauces fluviales',
    url: 'https://nuevaalcarria.com/articulos/la-investigacion-de-oro-en-la-sierra-norte-amenaza-a-40-kilometros-de-cauces-fluviales',
  },
  {
    id: 'cope-cercadillo',
    medio: 'COPE Guadalajara',
    titulo: 'Cercadillo, la pequeña Galia de Guadalajara, frente al gigante minero que amenaza su entorno natural',
    url: 'https://www.cope.es/emisoras/castilla-la-mancha/guadalajara-provincia/siguenza/noticias/cercadillo-pequena-galia-guadalajara-gigante-minero-amenaza-entorno-natural-zona-20260503_3356741.html',
  },
  {
    id: 'guadalajaradiario-plataforma',
    medio: 'Guadalajara Diario',
    titulo: 'La Plataforma Valle del Río Cañamares muestra su rechazo al proyecto de Oroberia',
    url: 'https://www.guadalajaradiario.es/provincia/69902-la-plataforma-valle-rio-canamares-muestra-su-rechazo-al-proyecto-oroberia.html',
  },
];

export default function MinasPage() {
  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">Actualidad · Sierra Norte de Guadalajara</p>
      <h1 className="mt-2 text-balance font-serif text-3xl sm:text-5xl font-bold text-pergamino">
        Ni catas ni minas
      </h1>
      <p className="mt-4 text-balance text-lg text-pergamino-muted/80">
        Un proyecto de investigación minera de oro a gran escala afecta a la Sierra Norte de Guadalajara, incluido
        el término de Sigüenza al que pertenece Cercadillo. Esta sección reúne, de forma resumida y con enlaces a
        las fuentes originales, qué se sabe hasta ahora, por qué preocupa y cómo está respondiendo la comarca.
      </p>

      <div className="mt-12 space-y-10">
        <article className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">¿Qué está pasando?</h2>
          <p className="mt-3 leading-relaxed text-pergamino-muted/80 text-sm sm:text-base">
            La empresa Oroberia SLU, filial española de la australiana Global Mining Enterprises, registró en agosto
            de 2025 varios permisos de investigación minera para buscar oro y otros metales en la Sierra Norte de
            Guadalajara. En conjunto suman cerca de 15.000 hectáreas repartidas en tres proyectos (GUA, DALA y JARA)
            que afectan a una veintena de municipios, entre ellos Sigüenza, con una inversión conjunta anunciada de
            más de 3,5 millones de euros a tres años.
          </p>
          <p className="mt-3 leading-relaxed text-pergamino-muted/80 text-sm sm:text-base">
            En noviembre la Junta de Comunidades de Castilla-La Mancha rechazó la fórmula de tramitar los permisos
            por separado y exigió una única evaluación de impacto ambiental conjunta. Oroberia solicitó además la
            autorización arqueológica necesaria para continuar, un trámite contra el que se han presentado cerca de
            400 alegaciones individuales. La compañía ha respondido presentando un proyecto consolidado, que a día
            de hoy sigue en fase de revisión técnica y legal antes de entrar en información pública.
          </p>
        </article>

        <article className="card-editorial p-6 sm:p-8">
          <div className="flex items-center gap-3 text-armuna-light">
            <AlertTriangle size={24} />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-pergamino">Por qué preocupa</h2>
          </div>
          <p className="mt-3.5 leading-relaxed text-pergamino-muted/80 text-sm sm:text-base">
            Los informes y denuncias recogidos por la prensa señalan varios riesgos ambientales: más de 40 kilómetros
            de cauces fluviales de la comarca quedarían dentro del área afectada, con posibilidad de drenaje ácido de
            mina si se remueven sulfuros del subsuelo, liberando metales pesados como arsénico o cadmio hacia ríos y
            acuíferos. Al tratarse de mineral de baja ley, el proceso probablemente requeriría lixiviación con
            cianuro para extraer el oro. Cerca de dos tercios de la superficie solicitada se solapa con hábitats de
            interés comunitario y espacios de la Red Natura 2000, con especies amenazadas como el águila real, además
            del riesgo de fragmentar el hábitat forestal de la sierra. A esto se suman las molestias ya conocidas en
            este tipo de explotaciones a cielo abierto: polvo, ruido y voladuras, como las que llevan años
            documentándose en la cantera de Naharros, cercana a la zona.
          </p>
        </article>

        <article className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">
            El impacto en un pueblo como Cercadillo
          </h2>
          <p className="mt-3 leading-relaxed text-pergamino-muted/80 text-sm sm:text-base">
            Sigüenza, el municipio del que Cercadillo es pedanía, figura entre los términos incluidos en uno de los
            tres proyectos (JARA). La minería mecanizada moderna genera poco empleo local y suele traer mano de obra
            de fuera, mientras que la comarca lleva años apostando por el turismo rural, la agricultura y la
            ganadería extensiva como vía para frenar la despoblación. Para pueblos muy pequeños como Cercadillo, con
            apenas una veintena de habitantes, cualquier alteración seria del entorno natural que los rodea pesa de
            forma desproporcionada frente al beneficio económico prometido.
          </p>
        </article>

        <article className="card-editorial p-6 sm:p-8 border-armuna-light/40 bg-noche-surface">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">La respuesta vecinal</h2>
          <p className="mt-3 leading-relaxed text-pergamino-muted/80 text-sm sm:text-base">
            La oposición al proyecto se articula principalmente a través de la Plataforma Valle del Río
            Cañamares-Sierra Norte, que agrupa a ayuntamientos, asociaciones y colectivos ecologistas de la comarca.
            Además de las cerca de 400 alegaciones presentadas contra la autorización arqueológica, la plataforma ha
            llevado su reivindicación hasta Bruselas junto a otros pueblos españoles enfrentados a proyectos
            extractivos similares. En Cercadillo, el rechazo se ha hecho visible con el lema{' '}
            <span className="font-semibold text-pergamino">
              &ldquo;Ni catas, ni minas: la tierra no se vende, se defiende&rdquo;
            </span>
            , que puede verse en las publicaciones del pueblo en Instagram.
          </p>
        </article>

        <article className="card-editorial p-6 sm:p-8">
          <div className="flex items-center gap-3 text-armuna-light">
            <Instagram size={24} />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-pergamino">Sigue la actualidad y colabora</h2>
          </div>
          <p className="mt-3.5 leading-relaxed text-sm sm:text-base text-pergamino-muted/85">
            Esta es una situación viva que sigue evolucionando. Si tienes información actualizada, documentos o
            enlaces a noticias que deban incluirse aquí, puedes hacerlos llegar a través de los mismos canales del
            pueblo:
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="https://www.instagram.com/infocercadillo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-2xl border border-armuna/40 bg-armuna/15 px-5 py-3 text-sm sm:text-base font-bold text-pergamino shadow-md transition-all hover:bg-armuna/25"
            >
              <Instagram size={18} className="text-armuna-light" />
              <span>@infocercadillo</span>
            </a>
            <a
              href="https://twitter.com/infocercadillo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-noche-border bg-noche px-4 py-3 text-sm font-semibold text-pergamino-muted hover:text-pergamino"
            >
              <Twitter size={17} />
              <span>@infocercadillo</span>
            </a>
          </div>
        </article>

        <article className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">Fuentes</h2>
          <p className="mt-3 leading-relaxed text-pergamino-muted/80 text-sm sm:text-base">
            Resumen elaborado a partir de las siguientes informaciones publicadas en prensa. Se recomienda
            consultar cada enlace para el detalle completo y las actualizaciones más recientes.
          </p>
          <ul className="mt-5 space-y-3">
            {fuentes.map((f) => (
              <li key={f.id}>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 text-sm sm:text-base leading-relaxed text-pergamino-muted/85 hover:text-pergamino"
                >
                  <ExternalLink size={16} className="mt-1 shrink-0 text-armuna-light" />
                  <span>
                    <span className="font-semibold text-piedra-200">{f.medio}:</span> {f.titulo}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </article>

        <article className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">Aviso</h2>
          <p className="mt-3 leading-relaxed text-pergamino-muted/80 text-sm sm:text-base">
            Esta sección se ha creado como modelo informativo introductorio y se irá actualizando a medida que el
            proyecto avance y surjan nuevas noticias. Es un resumen de fuentes periodísticas públicas, no una
            posición oficial de ninguna administración, y puede contener imprecisiones o quedar desactualizada:
            cualquier corrección o aportación es bienvenida.
          </p>
        </article>
      </div>
    </div>
  );
}
