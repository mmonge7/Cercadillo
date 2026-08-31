import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton({ containerRef, resetKey }) {
  const [visible, setVisible] = useState(false);

  // Al cambiar de página/sección (resetKey), ocultar el botón de
  // inmediato aunque la nueva página también arranque con scroll.
  useEffect(() => {
    setVisible(false);
  }, [resetKey]);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    const THRESHOLD = 400; // px de scroll antes de mostrar el botón
    const onScroll = () => {
      setVisible(el.scrollTop > THRESHOLD);
    };

    onScroll(); // estado inicial correcto si ya se entra con scroll
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [containerRef, resetKey]);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      title="Volver arriba"
      className="lg:!hidden"
      onClick={() => {
        containerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      style={{
        position: 'fixed',
        zIndex: 90,
        right: 'max(16px, env(safe-area-inset-right, 0px))',
        bottom: 'max(20px, calc(16px + env(safe-area-inset-bottom, 0px)))',
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--primary)', // color principal de la paleta
        color: 'white',
        boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
      }}
    >
      <ArrowUp size={22} strokeWidth={2.4} />
    </button>
  );
}
