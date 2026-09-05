import React, { useEffect, useState } from 'react';

/*
 * Calendario festivo de Cercadillo. Cada festividad tiene fecha fija (mes y
 * día de inicio/fin), así que la cuenta atrás y el orden cronológico se
 * recalculan en el navegador para que valgan automáticamente en cualquier
 * año, sin tocar código.
 *
 * Para añadir una fiesta nueva solo hace falta un objeto más en FESTIVALS.
 * `program` es la lista de actos del día a día; se deja vacía hasta que
 * tengamos la información real de cada festividad.
 */
const FESTIVALS = [
  {
    id: 'san-roque',
    name: 'San Roque',
    startMonth: 7, // agosto (0 = enero)
    startDay: 15,
    endMonth: 7,
    endDay: 16,
    intro:
      'la festividad patronal, los días 15 y 16 de agosto, cuando vecinos, emigrados y "morcilleros" regresan al pueblo',
    description: (
      <p className="mt-3 leading-relaxed text-pergamino-muted/80">
        Como en muchos pueblos pequeños de la España interior, la festividad de{' '}
        <strong className="text-pergamino">San Roque</strong> concentra el punto álgido de la vida social del
        pueblo: son las fechas en las que Cercadillo recupera parte del bullicio y la vida en comunidad que tenía
        cuando todavía era municipio independiente (ver capítulo 4 de El Libro).
      </p>
    ),
    program: [], // pendiente: programa de actos de San Roque
  },
  {
    id: 'santa-barbara',
    name: 'Santa Bárbara',
    startMonth: 11, // diciembre
    startDay: 4,
    endMonth: 11,
    endDay: 4,
    intro: 'la festividad de Santa Bárbara, el 4 de diciembre',
    description: null, // pendiente: Marcos nos pasará la reseña de esta festividad
    program: [], // pendiente: programa de actos de Santa Bárbara
  },
];

function festivalRangeForYear(festival, year) {
  const start = new Date(year, festival.startMonth, festival.startDay, 0, 0, 0, 0);
  const end = new Date(year, festival.endMonth, festival.endDay, 23, 59, 59, 999);
  return { start, end };
}

function nextOccurrence(festival, now) {
  let year = now.getFullYear();
  let range = festivalRangeForYear(festival, year);
  if (now > range.end) {
    year += 1;
    range = festivalRangeForYear(festival, year);
  }
  return { festival, ...range, year };
}

// Festividades ordenadas por la fecha en la que van a llegar, empezando por
// la más próxima a partir de "now" (si una está en marcha, va la primera).
function orderChronologically(now) {
  return FESTIVALS.map((festival) => nextOccurrence(festival, now)).sort(
    (a, b) => a.start.getTime() - b.start.getTime(),
  );
}

const dateFmt = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long' });
const dateFmtWithYear = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

function computeCountdown(now = new Date()) {
  const occurrences = orderChronologically(now);

  // Si hay una festividad en marcha ahora mismo, esa manda sobre cualquier otra
  const ongoingOcc = occurrences.find((o) => now >= o.start && now <= o.end);
  const target = ongoingOcc || occurrences[0];

  const { festival, start, end, year } = target;
  const isSingleDay = festival.startMonth === festival.endMonth && festival.startDay === festival.endDay;
  const range = isSingleDay
    ? dateFmtWithYear.format(start)
    : `${dateFmt.format(start)} – ${dateFmtWithYear.format(end)}`;

  if (ongoingOcc) {
    return {
      ongoing: true,
      festival,
      year,
      label: `¡La festividad de ${festival.name} de ${year} está en marcha!`,
      dates: `Hasta el ${dateFmtWithYear.format(end)}.`,
    };
  }

  const diff = start.getTime() - now.getTime();
  return {
    ongoing: false,
    festival,
    year,
    label: `Faltan para ${festival.name} ${year}`,
    dates: isSingleDay ? `El ${range}.` : `Del ${range}.`,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function ProgramaFiesta({ festival }) {
  if (festival.program && festival.program.length > 0) {
    return (
      <ul className="mt-4 space-y-3">
        {festival.program.map((item, index) => (
          <li
            key={index}
            className="rounded-xl border border-noche-border/60 bg-noche/70 p-4 sm:flex sm:items-baseline sm:gap-4"
          >
            {item.time && (
              <span className="block font-display text-sm font-bold text-armuna-light sm:w-24 sm:shrink-0">
                {item.time}
              </span>
            )}
            <div>
              <p className="font-semibold text-pergamino">{item.title}</p>
              {item.description && (
                <p className="mt-1 text-sm leading-relaxed text-pergamino-muted/80">{item.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="card-editorial mt-4 p-6 sm:p-8">
      <h3 className="font-serif text-lg font-bold text-armuna-light sm:text-xl">Nos falta el programa</h3>
      <p className="mt-3 leading-relaxed text-pergamino-muted/80">
        Todavía no tenemos documentado el programa de actos de {festival.name}. Si nos lo cuentas —fechas, actos,
        tradiciones propias del pueblo—, lo añadimos encantados. Puedes escribirnos a través de los enlaces del pie
        de página.
      </p>
    </div>
  );
}

export default function FiestasPage() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const countdown = computeCountdown(now);
  const orderedFestivals = orderChronologically(now).map((o) => o.festival);

  const units = [
    { key: 'days', value: countdown.days, label: 'días' },
    { key: 'hours', value: countdown.hours, label: 'horas' },
    { key: 'minutes', value: countdown.minutes, label: 'min' },
    { key: 'seconds', value: countdown.seconds, label: 'seg' },
  ];

  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">Vida festiva</p>
      <h1 className="mt-2 text-balance font-serif text-3xl font-bold text-pergamino sm:text-5xl">
        Fiestas de Cercadillo
      </h1>
      <p className="mt-4 text-balance text-lg text-pergamino-muted/80">
        Cercadillo celebra a lo largo del año {FESTIVALS.map((f) => f.intro).join(', y ')}.
      </p>

      {/* Cuenta atrás */}
      <div className="mt-8 rounded-2xl border border-noche-border bg-noche-card/90 p-6 backdrop-blur-md sm:p-8">
        <p className="kicker">Cuenta atrás</p>
        <p className="mt-2 font-serif text-lg font-bold text-pergamino">{countdown.label}</p>

        {countdown.ongoing ? (
          <p className="mt-6 text-center font-display text-4xl font-bold text-armuna-light">🎉</p>
        ) : (
          <div className="mt-6 grid grid-cols-4 gap-3 text-center">
            {units.map((unit) => (
              <div key={unit.key} className="rounded-xl border border-noche-border/60 bg-noche/70 p-3">
                <span className="block font-display text-2xl font-bold text-armuna-light sm:text-4xl">
                  {unit.value}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-pergamino-muted/60">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="mt-4 text-center text-xs italic text-pergamino-muted/65 sm:text-sm">{countdown.dates}</p>
      </div>

      {/* Detalle de cada festividad, en el orden en que van a ir llegando */}
      {orderedFestivals.map((festival) => (
        <div key={festival.id} className="mt-14">
          <p className="kicker">Festividad</p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-armuna-light sm:text-3xl">{festival.name}</h2>

          {festival.description}

          <div className="mt-6">
            <p className="kicker">Programa</p>
            <ProgramaFiesta festival={festival} />
          </div>
        </div>
      ))}
    </div>
  );
}
