import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton({ containerRef, resetKey }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

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

    onScroll(); // estado inicial correcto

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

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      title="Volver arriba"
      onClick={scrollToTop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        zIndex: 90,
        right: 'max(20px, env(safe-area-inset-right, 0px))',
        bottom: 'max(24px, calc(20px + env(safe-area-inset-bottom, 0px)))',
        width: 46,
        height: 46,
        borderRadius: '50%',
        border: '1px solid rgba(234, 179, 8, 0.45)',
        cursor: visible ? 'pointer' : 'default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(122, 77, 43, 0.95) 0%, rgba(82, 49, 24, 0.98) 100%)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        color: '#F4EDE0',
        boxShadow: visible
          ? '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(234, 179, 8, 0.2)'
          : 'none',
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible
          ? hovered
            ? 'translateY(-3px) scale(1.08)'
            : 'translateY(0) scale(1)'
          : 'translateY(14px) scale(0.85)',
        transition:
          'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      <ArrowUp size={22} strokeWidth={2.4} />
    </button>
  );
}
