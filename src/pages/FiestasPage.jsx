import React, { useEffect, useState } from 'react';

/*
 * Las fiestas de San Roque son en fechas fijas: 15 y 16 de agosto. La cuenta
 * atrás se calcula en el navegador para que valga automáticamente en
 * cualquier año, sin tocar código.
 */
function festivalRange(year) {
  const start = new Date(year, 7, 15, 0, 0, 0, 0); // 15 de agosto
  const end = new Date(year, 7, 16, 23, 59, 59, 999); // 16 de agosto
  return { start, end };
}

function nextFestival(now) {
  let year = now.getFullYear();
  let range = festivalRange(year);
  if (now > range.end) {
    year += 1;
    range = festivalRange(year);
  }
  return { ...range, year };
}

const dateFmt = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long' });
const dateFmtWithYear = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

function computeCountdown(now = new Date()) {
  const { start, end, year } = nextFestival(now);
  const range = `${dateFmt.format(start)} – ${dateFmtWithYear.format(end)}`;

  if (now >= start && now <= end) {
    return {
      ongoing: true,
      year,
      label: `¡Las fiestas de San Roque de ${year} están en marcha!`,
      dates: `Hasta el ${dateFmtWithYear.format(end)}.`,
    };
  }

  const diff = start.getTime() - now.getTime();
  return {
    ongoing: false,
    year,
    label: `Faltan para San Roque ${year}`,
    dates: `Del ${range}.`,
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
        La fiesta patronal de Cercadillo se celebra en honor a San Roque, los días 15 y 16 de agosto, cuando
        vecinos, emigrados y "morcilleros" regresan al pueblo.
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

      {/* Fiesta mayor */}
      <div className="mt-14">
        <p className="kicker">Fiesta mayor</p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-armuna-light sm:text-3xl">
          San Roque, patrón de Cercadillo
        </h2>
        <p className="mt-3 leading-relaxed text-pergamino-muted/80">
          Como en muchos pueblos pequeños de la España interior, la festividad de <strong className="text-pergamino">San
          Roque</strong> concentra el punto álgido de la vida social del pueblo: son las fechas en las que Cercadillo
          recupera parte del bullicio y la vida en comunidad que tenía cuando todavía era municipio independiente
          (ver capítulo 4 de El Libro).
        </p>
      </div>

      <div className="card-editorial mt-10 p-6 sm:p-8">
        <h3 className="font-serif text-lg font-bold text-armuna-light sm:text-xl">Nos falta el programa</h3>
        <p className="mt-3 leading-relaxed text-pergamino-muted/80">
          Todavía no tenemos documentado el programa de actos de las fiestas de San Roque, ni el resto del calendario
          festivo de Cercadillo a lo largo del año. Si nos lo cuentas —fechas, actos, tradiciones propias del
          pueblo—, lo añadimos encantados. Puedes escribirnos a través de los enlaces del pie de página.
        </p>
      </div>
    </div>
  );
}
