import React, { useEffect, useState } from 'react';

/**
 * Barra fina que indica cuánto queda por leer del capítulo abierto. Se queda
 * pegada al borde superior del área de scroll, justo debajo de la cabecera,
 * tanto en móvil como en escritorio.
 */
export default function ReadingProgress({ resetKey }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = document.getElementById('main-scroll-container');
    if (!container) return;

    const update = () => {
      const scrollable = container.scrollHeight - container.clientHeight;
      setProgress(scrollable > 0 ? Math.min(100, (container.scrollTop / scrollable) * 100) : 0);
    };

    update();
    container.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      container.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [resetKey]);

  return (
    <div className="pointer-events-none sticky top-0 z-30 h-[3px] w-full" aria-hidden="true">
      <div className="h-full bg-armuna-light/90" style={{ width: `${progress}%` }} />
    </div>
  );
}
