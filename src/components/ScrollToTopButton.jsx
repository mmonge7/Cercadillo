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
    const THRESHOLD = 400; // px de scroll antes de mostrar el botón

    const getScrollTop = () => {
      if (containerRef?.current) return containerRef.current.scrollTop;
      return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    };

    const onScroll = () => {
      setVisible(getScrollTop() > THRESHOLD);
    };

    onScroll(); // estado inicial correcto si ya se entra con scroll

    if (containerRef?.current) {
      const el = containerRef.current;
      el.addEventListener('scroll', onScroll, { passive: true });
      return () => el.removeEventListener('scroll', onScroll);
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [containerRef, resetKey]);

  const scrollToTop = () => {
    if (containerRef?.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      title="Volver arriba"
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        zIndex: 90,
        right: 'max(20px, env(safe-area-inset-right, 0px))',
        bottom: 'max(24px, calc(20px + env(safe-area-inset-bottom, 0px)))',
        width: 46,
        height: 46,
        borderRadius: '50%',
        border: '1px solid rgba(234, 179, 8, 0.45)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #7A4D2B 0%, #523118 100%)',
        color: '#F4EDE0',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.45)',
        transition: 'transform 0.2s ease, opacity 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px) scale(1.06)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
    >
      <ArrowUp size={22} strokeWidth={2.4} />
    </button>
  );
}
