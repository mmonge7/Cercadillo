import React, { useEffect, useState } from 'react';

/*
 * Calendario festivo de Cercadillo. Cada festividad tiene fecha fija (mes y
 * día de inicio/fin), así que la cuenta atrás se recalcula en el navegador
 * para que valga automáticamente en cualquier año, sin tocar código.
 *
 * Para añadir una fiesta nueva solo hace falta un objeto más en FESTIVALS.
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
    details: (
      <p className="mt-3 leading-relaxed text-pergamino-muted/80">
        Como en muchos pueblos pequeños de la España interior, la festividad de{' '}
        <strong className="text-pergamino">San Roque</strong> concentra el punto álgido de la vida social del
        pueblo: son las fechas en las que Cercadillo recupera parte del bullicio y la vida en comunidad que tenía
        cuando todavía era municipio independiente (ver capítulo 4 de El Libro).
      </p>
    ),
  },
  {
    id: 'santa-barbara',
    name: 'Santa Bárbara',
    startMonth: 11, // diciembre
    startDay: 4,
    endMonth: 11,
    endDay: 4,
    intro: 'la festividad de Santa Bárbara, el 4 de diciembre',
    details: null, // pendiente: Marcos nos pasará el detalle de esta festividad
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

const dateFmt = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long' });
const dateFmtWithYear = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

function computeCountdown(now = new Date()) {
  // Próxima ocurrencia de cada festividad (este año si no ha pasado, si no el que viene)
  const occurrences = FESTIVALS.map((festival) => nextOccurrence(festival, now));

  // Si hay una festividad en marcha ahora mismo, esa manda sobre cualquier otra
  const ongoingOcc = occurrences.find((o) => now >= o.start && now <= o.end);

  // Si no hay ninguna en marcha, la próxima es la que tenga el "start" más cercano
  const target =
    ongoingOcc || occurrences.reduce((closest, o) => (o.start < closest.start ? o : closest));

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

export default function FiestasPage() {
  const [countdown, setCountdown] = useState(() => computeCountdown());

  useEffect(() => {
    const interval = setInterval(() => setCountdown(computeCountdown()), 1000);
    return () => clearInterval(interval);
  }, []);

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

      {/* Detalle de cada festividad */}
      {FESTIVALS.map((festival) => (
        <div key={festival.id} className="mt-14">
          <p className="kicker">Festividad</p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-armuna-light sm:text-3xl">{festival.name}</h2>

          {festival.details ? (
            festival.details
          ) : (
            <div className="card-editorial mt-4 p-6 sm:p-8">
              <h3 className="font-serif text-lg font-bold text-armuna-light sm:text-xl">Nos falta el programa</h3>
              <p className="mt-3 leading-relaxed text-pergamino-muted/80">
                Todavía no tenemos documentado el programa de actos de {festival.name}. Si nos lo cuentas —fechas,
                actos, tradiciones propias del pueblo—, lo añadimos encantados. Puedes escribirnos a través de los
                enlaces del pie de página.
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
