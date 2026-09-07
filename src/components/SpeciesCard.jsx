import React from 'react';
import { ImageOff } from 'lucide-react';
import { useCommonsImage } from '../hooks/useCommonsImage';

/**
 * Ficha de una especie de flora o fauna, con una imagen de referencia
 * obtenida en vivo de Wikimedia Commons a partir del nombre científico.
 */
export default function SpeciesCard({ nombreComun, nombreCientifico, descripcion }) {
  const { status, image } = useCommonsImage(nombreCientifico);

  return (
    <div className="card-editorial overflow-hidden p-0">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-piedra-100">
        {status === 'loading' && <div className="h-full w-full animate-pulse bg-piedra-200" />}

        {status === 'ready' && image && (
          <img
            src={image.thumbUrl}
            alt={`${nombreComun} (${nombreCientifico})`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}

        {(status === 'empty' || status === 'error') && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-piedra-400">
            <ImageOff size={28} strokeWidth={1.5} />
            <span className="text-xs">Sin imagen disponible</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-pergamino">{nombreComun}</h3>
        {nombreCientifico && (
          <p className="mt-0.5 text-sm italic text-pergamino-muted/80">{nombreCientifico}</p>
        )}
        <p className="mt-2.5 text-sm leading-relaxed text-pergamino-muted/80">{descripcion}</p>

        {status === 'ready' && image?.author && (
          <p className="mt-3 text-[0.7rem] leading-snug text-pergamino-muted/60">
            Foto: {image.author}
            {image.license ? ` · ${image.license}` : ''} · Wikimedia Commons
          </p>
        )}
      </div>
    </div>
  );
}
