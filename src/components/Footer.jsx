import React from 'react';
import { Instagram, Twitter } from 'lucide-react';
import { navItems } from './Nav';

const enlaces = ['libro', 'referencias', 'sobre-la-web'];

export default function Footer({ onNavigate }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="brand-panel mt-auto shrink-0 border-t border-noche-border text-xs text-pergamino-muted/70 sm:text-sm"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)', paddingTop: '2rem' }}
    >
      <div className="container-editorial flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/infocercadillo/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Cercadillo: @infocercadillo"
            title="Instagram: @infocercadillo"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-pergamino/25 text-pergamino/80 transition-colors hover:border-[#E1306C] hover:text-[#E1306C]"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://twitter.com/infocercadillo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter de Cercadillo: @infocercadillo"
            title="Twitter: @infocercadillo"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-pergamino/25 text-pergamino/80 transition-colors hover:border-[#1DA1F2] hover:text-[#1DA1F2]"
          >
            <Twitter size={18} />
          </a>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Enlaces del pie">
          {enlaces.map((id) => {
            const item = navItems.find((n) => n.id === id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                className="cursor-pointer transition-colors hover:text-pergamino"
              >
                {item?.label ?? id}
              </button>
            );
          })}
        </nav>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="text-sm text-pergamino/80">
            Web diseñada y desarrollada por{' '}
            <span className="font-semibold text-pergamino">los vecinos de Cercadillo</span>
          </p>
          <p className="text-xs text-pergamino/50">
            &copy; {year} · Cercadillo · Historia, Lugares y Curiosidades
          </p>
        </div>
      </div>
    </footer>
  );
}
