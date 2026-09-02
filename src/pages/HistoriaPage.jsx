import React from 'react';
import { navItems } from '../components/Nav';

const eras = [
  {
    title: 'Edad Media (siglos XI–XV)',
    events: [
      {
        year: '1100',
        text: 'Repoblación cristiana de la zona bajo Alfonso VI, con el conde Raimundo de Borgoña y el obispo Jerónimo de Perigord al frente.',
        tab: 'libro',
      },
      {
        year: '1164',
        text: 'Primera mención documental de Moriscos: la «collationam Sancti Christofori de Morisco», con 56 vecinos y parroquia de San Pedro.',
        tab: 'iglesia',
      },
      {
        year: '1265',
        text: 'La parroquia figura en el Libro de todos los préstamos de la Catedral de Salamanca, bajo «MORISCO de Valdevilloria».',
        tab: 'iglesia',
      },
      {
        year: '1451',
        text: 'Fundación de la Granja Agustina de La Flecha Baja, con su aceña hidráulica y oratorio renacentista.',
        tab: 'ruta-nocturna',
      },
    ],
  },
  {
    title: 'Edad Moderna (siglos XVI–XVIII)',
    events: [
      {
        year: 'S. XVI',
        text: 'Gran reforma y ampliación de la Iglesia de San Pedro Apóstol, que le da la fisonomía que conserva hoy.',
        tab: 'iglesia',
      },
      {
        year: 'S. XVI',
        text: 'Fray Luis de León se retira al soto de La Flecha tras su encarcelamiento inquisitorial.',
        tab: 'ruta-nocturna',
      },
      {
        year: 'S. XVI–XVIII',
        text: 'Los despoblados medievales de El Hoyo y La Cruz son absorbidos por el término de Moriscos.',
        tab: 'libro',
      },
      {
        year: '1609',
        text: 'Decretos de expulsión de los moriscos: el topónimo del pueblo ya existía siglos antes, sin relación con la expulsión.',
        tab: 'escudo',
      },
      {
        year: '1752',
        text: 'El Catastro del Marqués de la Ensenada detalla las propiedades, rentas y cargas eclesiásticas del municipio.',
        tab: 'iglesia',
      },
      {
        year: '1835',
        text: 'La Desamortización de Mendizábal saca la Granja Agustina de La Flecha a manos privadas.',
        tab: 'ruta-nocturna',
      },
    ],
  },
  {
    title: 'Siglo XIX',
    events: [
      {
        year: '1812',
        text: 'Batalla de El Parapeto y el Teso de la Cabaña, antesala de la Batalla de los Arapiles, en plena Guerra de la Independencia.',
        tab: 'ruta-nocturna',
      },
      {
        year: '1845–1850',
        text: 'Pascual Madoz describe el pueblo (unas 40 casas) en su Diccionario geográfico-estadístico-histórico.',
      },
      {
        year: '1877',
        text: 'Inauguración de la línea de ferrocarril Medina-Salamanca, con estación propia en Moriscos.',
        tab: 'libro',
      },
      {
        year: '1902 / 1904',
        text: 'Miguel de Unamuno visita y escribe sobre el soto de La Flecha en Paisajes y en la Oda a Salamanca.',
        tab: 'ruta-nocturna',
      },
    ],
  },
  {
    title: 'Siglo XX',
    events: [
      {
        year: '1941',
        text: 'El suceso de la «horca de Marino», episodio de crónica negra y memoria civil de la posguerra.',
        tab: 'libro',
      },
      {
        year: 'Años 60–70',
        text: 'La mecanización agrícola acaba con la tracción animal, la charca-abrevadero y las Eras de trilla tradicionales.',
        tab: 'lugares',
      },
      {
        year: 'Años 70',
        text: 'Una piscifactoría y un chalet inconcluso dañan gravemente la Granja Agustina de La Flecha.',
        tab: 'ruta-nocturna',
      },
      {
        year: '1988',
        text: 'Las Fiestas Patronales de la Virgen de la Peregrina se trasladan definitivamente del Domingo de Pentecostés al verano.',
        tab: 'fiestas',
      },
      {
        year: '1995',
        text: 'Comienza el archivo gráfico continuo (fotografías y vídeos) de las fiestas del pueblo.',
        tab: 'fiestas',
      },
    ],
  },
  {
    title: 'Siglo XXI',
    events: [
      {
        year: '2011',
        text: 'La Granja Agustina de La Flecha entra en la Lista Roja del Patrimonio de Hispania Nostra.',
        tab: 'ruta-nocturna',
      },
      {
        year: '2016',
        text: 'Restauración científica del lienzo barroco de la Virgen Peregrina, patrona del pueblo.',
        tab: 'iglesia',
      },
      {
        year: 'Actualidad',
        text: 'Moriscos se integra en el área metropolitana de Salamanca, mientras preserva su memoria a través del portal Morisqueños y esta wiki.',
        tab: 'sobre-la-web',
      },
    ],
  },
];

export default function HistoriaPage({ onNavigate }) {
  return (
    <div className="container-editorial py-10 sm:py-16">
      <p className="kicker">Eje cronológico</p>
      <h1 className="mt-2 text-balance font-serif text-3xl sm:text-5xl font-bold text-pergamino">
        Historia de Moriscos
      </h1>
      <p className="mt-4 text-balance text-lg text-pergamino-muted/80">
        Mil años de historia documentada: de la repoblación medieval del alfoz salmantino en el siglo XI hasta su integración en el área metropolitana en el siglo XXI.
      </p>

      <div className="mt-12 space-y-12">
        {eras.map((era) => (
          <div key={era.title} className="card-editorial p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-armuna-light border-b border-noche-border pb-3">
              {era.title}
            </h2>
            <div className="mt-6 space-y-6">
              {era.events.map((ev, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                  <span className="font-mono text-sm font-bold text-piedra-300 bg-piedra-900/80 px-3 py-1 rounded-lg shrink-0 border border-noche-border">
                    {ev.year}
                  </span>
                  <div className="flex-1">
                    <p className="text-pergamino-muted/85 leading-relaxed text-sm sm:text-base">
                      {ev.text}
                    </p>
                    {ev.tab && (
                      <button
                        type="button"
                        onClick={() => onNavigate(ev.tab)}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-armuna-light hover:underline cursor-pointer"
                      >
                        Ver más en {navItems.find((n) => n.id === ev.tab)?.label ?? ev.tab} →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
