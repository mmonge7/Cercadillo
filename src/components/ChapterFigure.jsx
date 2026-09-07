import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { publicUrl } from '../utils/publicUrl';

/** Una foto de capítulo, con su pie, que se amplía a pantalla completa al tocarla. */
function SingleFigure({ src, alt, caption }) {
  const [open, setOpen] = useState(false);

  return (
    <figure className="m-0">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button
            type="button"
            aria-label={`Ampliar imagen: ${alt || caption || 'fotografía'}`}
            className="block w-full cursor-zoom-in overflow-hidden rounded-xl border border-noche-border shadow-sm"
          >
            <img
              src={publicUrl(src)}
              alt={alt}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
            />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm dialog-overlay" />
          <Dialog.Content
            className="fixed inset-0 z-[101] flex flex-col items-center justify-center p-4 outline-none sm:p-10 dialog-content"
            aria-describedby={undefined}
          >
            <Dialog.Title className="sr-only">{alt || caption || 'Fotografía del capítulo'}</Dialog.Title>
            <img
              src={publicUrl(src)}
              alt={alt}
              className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
            {caption && <p className="mt-3 max-w-2xl text-center text-sm text-piedra-900/90 sm:text-base">{caption}</p>}
            <Dialog.Close
              aria-label="Cerrar imagen"
              className="absolute right-4 top-4 cursor-pointer rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
            >
              <X size={20} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {caption && <figcaption className="mt-2 text-sm italic text-pergamino-muted/70">{caption}</figcaption>}
    </figure>
  );
}

/** Bloque de una o dos fotos (lado a lado en pantallas anchas) dentro de un capítulo. */
export default function ChapterFigure({ images }) {
  if (!images?.length) return null;

  if (images.length === 1) {
    return (
      <div className="my-6">
        <SingleFigure {...images[0]} />
      </div>
    );
  }

  return (
    <div className="my-6 grid gap-4 sm:grid-cols-2">
      {images.map((img, i) => (
        <SingleFigure key={i} {...img} />
      ))}
    </div>
  );
}
