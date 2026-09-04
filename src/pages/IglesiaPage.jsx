import React from 'react';

const ficha = [
  { label: 'Época', value: 'Siglo XVI' },
  { label: 'Estilo', value: 'Tres naves, altares platerescos' },
  { label: 'Advocación', value: 'Natividad de Nuestra Señora' },
];

export default function IglesiaPage() {
  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">El monumento</p>
      <h1 className="mt-2 text-balance font-serif text-3xl sm:text-5xl font-bold text-pergamino">
        La Iglesia de la Natividad de Nuestra Señora
      </h1>
      <p className="mt-4 text-balance text-lg text-pergamino-muted/80">
        Es el monumento más importante de Cercadillo y, junto con sus dos ermitas, el testimonio más visible de la
        vida religiosa y comunitaria del pueblo.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {ficha.map((f) => (
          <div key={f.label} className="card-editorial p-5">
            <p className="font-display text-xs tracking-widest text-armuna-light uppercase font-bold">{f.label}</p>
            <p className="mt-1.5 font-serif text-base font-semibold text-pergamino">{f.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-8">
        <div className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">Arquitectura</h2>
          <p className="mt-3 text-pergamino-muted/80 leading-relaxed">
            El templo, construido en el siglo XVI, consta de <strong>tres naves</strong>. En su interior conserva
            <strong> altares platerescos</strong>, el estilo decorativo del Renacimiento español que combina la
            tradición gótica tardía con la nueva ornamentación clásica, característico de buena parte de la
            arquitectura religiosa castellana de esa época.
          </p>
        </div>

        <div className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">Lo que todavía no sabemos</h2>
          <p className="mt-3 text-pergamino-muted/80 leading-relaxed">
            A diferencia de otras iglesias rurales muy documentadas, no hemos encontrado fuentes públicas con el
            expediente completo de construcción, reformas o restauraciones de este templo, ni con el detalle de sus
            retablos o imágenes. Si tienes esa información —o simplemente fotografías del interior o el exterior—,
            escríbenos a través de los enlaces del pie de página: nos ayudaría muchísimo a completar esta página.
          </p>
        </div>
      </div>
    </div>
  );
}
