import React from 'react';

const ficha = [
  { label: 'Época', value: 'Siglos XII–XVI' },
  { label: 'Estilo', value: 'Mampostería con detalles mudéjares y reforma renacentista' },
  { label: 'Advocación', value: 'San Pedro Apóstol' },
];

const linea = [
  { year: '1164', text: 'Primera mención documental del pueblo y de la parroquia («collationam Sancti Christofori de Morisco»), con 56 vecinos.' },
  { year: '1265', text: 'La iglesia figura en el Libro de todos los préstamos de la Catedral de Salamanca, bajo «MORISCO de Valdevilloria».' },
  { year: 'S. XVI', text: 'Gran reforma y ampliación estructural que le da la fisonomía que conserva hoy.' },
  { year: 'S. XVIII', text: 'Se erige el retablo mayor en estilo rococó.' },
  { year: '1752', text: 'El Catastro del Marqués de la Ensenada detalla sus propiedades, rentas y cargas eclesiásticas.' },
  { year: '1845–1850', text: 'Pascual Madoz describe el casco urbano (unas 40 casas) articulado en torno al templo.' },
  { year: '2016', text: 'Restauración científica del lienzo barroco de la Virgen Peregrina, el 6 de agosto.' },
];

export default function IglesiaPage() {
  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">El monumento</p>
      <h1 className="mt-2 text-balance font-serif text-3xl sm:text-5xl font-bold text-pergamino">
        La Iglesia de San Pedro Apóstol
      </h1>
      <p className="mt-4 text-balance text-lg text-pergamino-muted/80">
        Es el monumento más importante de Moriscos y el centro neurálgico de su vida comunitaria, religiosa e histórica, con un registro documental que abarca más de 800 años.
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
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">
            Orígenes y cronología constructiva (siglos XII–XVI)
          </h2>
          <p className="mt-3 text-pergamino-muted/80 leading-relaxed">
            Aunque la estructura actual es fruto de reformas posteriores, la existencia del templo se remonta a los primeros tiempos de la repoblación leonesa. El edificio está construido principalmente en mampostería y sillarejo reforzado con cantería de <strong>Piedra de Villamayor</strong>, pero conserva en sus muros restos de ladrillos y aparejos que corroboran su origen mudéjar o la intervención de maestros de obra mudéjares locales. A finales de la Edad Media y a lo largo del siglo XVI, el templo sufrió una profunda reconstrucción y ampliación estructural que le otorgó la fisonomía que conserva hoy.
          </p>
        </div>

        <div className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">
            Presencia en archivos y documentos históricos
          </h2>
          <p className="mt-3 text-pergamino-muted/80 leading-relaxed">
            La iglesia cuenta con un registro documental que abarca más de 800 años. La primera mención es el documento de 1164 (4 de octubre), una escritura de compraventa eclesiástica donde Pedro Juan vende Mozodiel al canónigo D. Martín, y que cita la <em>«collationam Sancti Christofori de Morisco»</em>, con una comunidad de 56 vecinos y la parroquia dedicada a San Pedro. En el <em>Libro de todos los préstamos</em> de la Catedral de Salamanca (1265), la iglesia figura registrada con los derechos de cobro de diezmos y préstamos del cabildo catedralicio bajo la denominación de <em>«MORISCO de Valdevilloria»</em>. El Catastro del Marqués de la Ensenada (1752) detalla sus propiedades, rentas, diezmos y cargas eclesiásticas, y el Diccionario de Madoz (1845–1850) describe el casco urbano articulado en torno al templo.
          </p>
        </div>

        <div className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">
            Arquitectura y estructura del templo
          </h2>
          <p className="mt-3 text-pergamino-muted/80 leading-relaxed">
            Templo de <strong>nave única</strong>, con muros sólidos y proporciones sobrias típicas de la arquitectura rural de La Armuña. Posee un ábside fortalecido y una espadaña de cantería que remata el templo para albergar las campanas. En su interior destacan las valiosas armaduras y techumbres de madera que cubren la capilla mayor, la antecapilla y la nave central, muestra de la carpintería de lo blanco tradicional.
          </p>
        </div>

        <div className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">
            Tesoros artísticos en el interior
          </h2>
          <p className="mt-3 text-pergamino-muted/80 leading-relaxed">
            La cabecera del templo está presidida por un <strong>retablo mayor</strong> decorado en estilo rococó (siglo XVIII). Durante siglos, las paredes y capillas albergaron un valioso conjunto de pinturas murales y tablas renacentistas del siglo XVI que, por razones de seguridad, custodia y conservación museística, fueron trasladadas a la capital provincial y hoy se exhiben en el <strong>Museo de Bellas Artes de Salamanca</strong>. El templo custodia además la imagen de la patrona de Moriscos, la <strong>Virgen Peregrina</strong>, plasmada en un relevante lienzo barroco.
          </p>
        </div>

        <div className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">
            Restauraciones y reformas recientes
          </h2>
          <p className="mt-3 text-pergamino-muted/80 leading-relaxed">
            El 6 de agosto de 2016, el lienzo barroco de la Virgen Peregrina fue objeto de una minuciosa restauración científica realizada por el taller especializado Uffizzi Conservación y Restauración de Bienes Culturales. La intervención fue posible gracias al mecenazgo de Antonio García Malmierca, las gestiones del párroco Hilario Almeida y la investigación histórica de Miguel Blanco González.
          </p>
        </div>

        <div className="card-editorial p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light">
            Cofradías, curiosidades y vida comunitaria
          </h2>
          <p className="mt-3 text-pergamino-muted/80 leading-relaxed">
            La parroquia contó históricamente con la <strong>Cofradía del Santísimo Sacramento</strong> y la <strong>Cofradía de la Virgen Peregrina</strong>, encargadas de la ayuda mutua, los entierros de vecinos y las fiestas patronales. Al igual que ocurre con templos vecinos de la comarca, como la Iglesia de San Esteban en Castellanos de Moriscos, su empaque le valió en la zona el apelativo popular de una de las <em>«Catedrales de La Armuña»</em>. Durante las fiestas de la Virgen Peregrina, la iglesia es el punto de partida del repique manual de campanas, las procesiones por el pueblo y la tradicional subasta de roscas de pan bendito.
          </p>
        </div>
      </div>

      {/* Línea del tiempo */}
      <div className="mt-14">
        <p className="kicker">Cronología</p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-armuna-light">Hitos históricos de la parroquia</h2>
        <div className="mt-6 space-y-3">
          {linea.map((l) => (
            <div key={l.year} className="card-editorial p-4 flex flex-col sm:flex-row gap-3 sm:gap-6 items-start">
              <span className="font-mono text-sm font-bold text-piedra-300 bg-piedra-900/80 px-3 py-1 rounded-lg shrink-0 border border-noche-border">
                {l.year}
              </span>
              <p className="text-sm sm:text-base text-pergamino-muted/80 leading-relaxed">{l.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
