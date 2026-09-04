import React from 'react';
import { Mail, Github, Instagram, MessageSquareQuote } from 'lucide-react';

export default function SobrePage({ onNavigate }) {
  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">El proyecto</p>
      <h1 className="mt-2 text-balance font-serif text-3xl sm:text-5xl font-bold text-pergamino">
        Sobre esta web
      </h1>
      <p className="mt-4 text-balance text-lg text-pergamino-muted/80">
        Cercadillo: Historia, Lugares y Curiosidades es un proyecto personal e independiente para reunir en un solo
        lugar la historia, la memoria y el patrimonio de Cercadillo (Sigüenza, Guadalajara), un pueblo de apenas 17
        habitantes cuya documentación estaba dispersa o, sencillamente, no existía en ningún sitio accesible.
      </p>

      <div className="mt-12 space-y-10">
        <article className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">¿Por qué existe esta web?</h2>
          <p className="mt-3 leading-relaxed text-pergamino-muted/80 text-sm sm:text-base">
            Los pueblos pequeños rara vez tienen un espacio digital propio que recoja su historia con cuidado.
            Cercadillo perdió su ayuntamiento en 1973 y hoy apenas llega a los 17 habitantes: esta web nace para que
            su memoria no dependa solo del boca a boca, y quede accesible para cualquier vecino, descendiente o
            curioso, ahora y en el futuro.
          </p>
        </article>

        <article className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">¿De dónde procede la información?</h2>
          <p className="mt-3 leading-relaxed text-pergamino-muted/80 text-sm sm:text-base">
            Los contenidos se basan en fuentes públicas verificables: Wikipedia, Wikidata, el Instituto Nacional de
            Estadística (INE), el Diccionario geográfico-estadístico-histórico de Pascual Madoz (1847) y guías de
            pueblos de Guadalajara. Es, deliberadamente, un punto de partida modesto y honesto, no una investigación
            exhaustiva. Puedes consultar el listado completo en el apartado de{' '}
            <button
              type="button"
              onClick={() => onNavigate('referencias')}
              className="cursor-pointer font-semibold text-armuna-light hover:underline"
            >
              Referencias
            </button>
            .
          </p>
        </article>

        {/* Contacto y Colaboración */}
        <article className="card-editorial p-6 sm:p-8 border-armuna-light/40 bg-noche-surface">
          <div className="flex items-center gap-3 text-armuna-light">
            <MessageSquareQuote size={28} />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-pergamino">Contacto y colaboración</h2>
          </div>
          <p className="mt-3.5 leading-relaxed text-sm sm:text-base text-pergamino-muted/85">
            Este es un archivo vivo y en constante enriquecimiento. Si tienes documentos antiguos, fotografías
            familiares, datos genealógicos o deseas aportar cualquier corrección, puedes ponerte en contacto directo:
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="mailto:marcosmonge5@gmail.com"
              className="inline-flex items-center gap-2.5 rounded-2xl border border-armuna/40 bg-armuna/15 px-5 py-3 text-sm sm:text-base font-bold text-pergamino shadow-md transition-all hover:bg-armuna/25"
            >
              <Mail size={18} className="text-armuna-light" />
              <span>marcosmonge5@gmail.com</span>
            </a>
            <a
              href="https://www.instagram.com/infocercadillo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-noche-border bg-noche px-4 py-3 text-sm font-semibold text-pergamino-muted hover:text-pergamino"
            >
              <Instagram size={17} />
              <span>@infocercadillo</span>
            </a>
            <a
              href="https://github.com/mmonge7/Cercadillo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-noche-border bg-noche px-4 py-3 text-sm font-semibold text-pergamino-muted hover:text-pergamino"
            >
              <Github size={17} />
              <span>GitHub</span>
            </a>
          </div>
        </article>

        <article className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">
            Código abierto: todo está en GitHub
          </h2>
          <p className="mt-3 leading-relaxed text-pergamino-muted/80 text-sm sm:text-base">
            El código fuente completo de esta web es público y puede consultarse, descargarse o auditarse libremente en{' '}
            <a
              href="https://github.com/mmonge7/Cercadillo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-armuna-light hover:underline"
            >
              github.com/mmonge7/Cercadillo
            </a>
            . En el repositorio se puede ver el historial completo de cambios, cómo está organizado el contenido y cómo
            contribuir o reportar un problema. No hay nada oculto: ni backend propietario, ni base de datos privada, ni
            analítica de terceros.
          </p>
        </article>

        <article className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">Cómo está construida</h2>
          <p className="mt-3 leading-relaxed text-pergamino-muted/80 text-sm sm:text-base">
            Es una aplicación de una sola página construida con{' '}
            <strong className="text-pergamino">React, Vite y Tailwind CSS</strong>, sin servidor ni base de datos: todo
            el contenido viaja dentro del propio código, así que cambiar de sección no descarga nada y es instantáneo.
            Es instalable como aplicación y funciona sin conexión gracias a un service worker, y todo el proceso de
            construcción y publicación se ejecuta automáticamente mediante GitHub Actions cada vez que se actualiza el
            contenido.
          </p>
        </article>

        <article className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">Aviso</h2>
          <p className="mt-3 leading-relaxed text-pergamino-muted/80 text-sm sm:text-base">
            Este es un proyecto personal e independiente, no oficial ni vinculado al Ayuntamiento de Sigüenza ni a
            ninguna institución. Está hecho con cariño hacia el pueblo, con la mejor intención de rigor y honestidad,
            pero puede contener imprecisiones o huecos: toda corrección y aportación es bienvenida.
          </p>
          <p className="mt-4 text-sm text-pergamino-muted/80 sm:text-base">
            Web diseñada y desarrollada por{' '}
            <span className="font-semibold text-piedra-200">los vecinos de Cercadillo</span>.
          </p>
        </article>
      </div>
    </div>
  );
}
