import { useEffect, useMemo, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Fuse from 'fuse.js';
import { Search, X, Compass } from 'lucide-react';
import type { SearchItem } from '../pages/search-index.json';
import ErrorBoundary from './ErrorBoundary';

const BASE = import.meta.env.BASE_URL;

function SearchModalInner() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<SearchItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open && !loaded) {
      fetch(`${BASE}search-index.json`)
        .then((r) => r.json())
        .then((data: SearchItem[]) => {
          setItems(data);
          setLoaded(true);
        })
        .catch(() => setLoaded(true));
    }
  }, [open, loaded]);

  const MIN_QUERY_LENGTH = 2;

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'excerpt', weight: 0.3 },
          { name: 'badge', weight: 0.1 },
          { name: 'content', weight: 0.1 },
        ],
        threshold: 0.3,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [items],
  );

  const trimmedQuery = query.trim();
  const isTooShort = trimmedQuery.length > 0 && trimmedQuery.length < MIN_QUERY_LENGTH;

  // Si no se ha escrito nada, no se devuelven resultados por defecto
  const results = useMemo(() => {
    if (!trimmedQuery || trimmedQuery.length < MIN_QUERY_LENGTH) return [];
    return fuse.search(trimmedQuery).slice(0, 15).map((r) => r.item);
  }, [trimmedQuery, fuse]);

  const highlight = (text: string) => {
    if (!query.trim()) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="rounded bg-piedra-400/35 text-inherit dark:bg-piedra-400/40">
          {text.slice(idx, idx + query.length)}
        </mark>
        {text.slice(idx + query.length)}
      </>
    );
  };

  const buildItemUrl = (itemHref: string) => {
    const raw = BASE + itemHref.replace(/^\//, '');
    if (!trimmedQuery) return raw;
    const [pathPart, hashPart] = raw.split('#');
    const separator = pathPart.includes('?') ? '&' : '?';
    const withParam = `${pathPart}${separator}highlight=${encodeURIComponent(trimmedQuery)}`;
    return hashPart ? `${withParam}#${hashPart}` : withParam;
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 sm:w-auto sm:px-3.5 items-center justify-center gap-2 rounded-full border border-pergamino/20 bg-pergamino/15 text-sm font-semibold text-pergamino shadow-sm backdrop-blur-sm transition-colors hover:border-pergamino/35 hover:bg-pergamino/25"
        aria-label="Buscar en el sitio"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">Buscar</span>
      </button>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-noche/60 backdrop-blur-sm data-[state=open]:animate-[fade-up_0.15s_ease-out] motion-reduce:transition-none" />
        <Dialog.Content
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
          className="fixed z-[80] overflow-hidden rounded-2xl border border-noche-border bg-noche-surface shadow-2xl outline-none transition-all duration-150 data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 top-[calc(var(--mobile-topbar,68px)+8px)] left-1/2 -translate-x-1/2 w-[94vw] max-w-md sm:top-[76px] sm:left-auto sm:right-6 sm:translate-x-0 sm:w-[480px] lg:right-8"
        >
          <Dialog.Title className="sr-only">Buscar en Moriscos Wiki</Dialog.Title>
          <div className="flex items-center gap-2 border-b border-noche-border/80 px-4">
            <Search className="h-4 w-4 shrink-0 text-piedra-300" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar lugares, historia, fiestas, fuentes..."
              style={{ fontSize: '16px' }}
              className="h-12 sm:h-13 w-full bg-transparent font-body text-[16px] text-pergamino outline-none placeholder:text-pergamino-muted/50"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Borrar texto"
                className="rounded-full p-1 text-pergamino-muted/70 hover:bg-noche hover:text-pergamino"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <Dialog.Close asChild>
              <button
                aria-label="Cerrar búsqueda"
                className="rounded-full p-1.5 text-pergamino-muted/70 hover:bg-noche hover:text-pergamino"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2" role="listbox">
            {!loaded && (
              <p className="px-4 py-8 text-center text-sm text-pergamino-muted/60">Cargando índice…</p>
            )}

            {loaded && !trimmedQuery && (
              <div className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center text-pergamino-muted/60">
                <Compass className="h-7 w-7 text-piedra-400/50" />
                <p className="text-xs sm:text-sm">Escribe para buscar lugares, historia, personajes, fiestas o referencias documentales.</p>
              </div>
            )}

            {loaded && isTooShort && (
              <p className="px-4 py-6 text-center text-xs sm:text-sm text-pergamino-muted/60">
                Escribe al menos {MIN_QUERY_LENGTH} letras para buscar…
              </p>
            )}

            {loaded && !isTooShort && trimmedQuery.length >= MIN_QUERY_LENGTH && results.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-pergamino-muted/60">
                Sin resultados para “<span className="font-semibold text-pergamino">{query}</span>”.
              </p>
            )}

            {results.map((item) => (
              <a
                key={item.id}
                href={buildItemUrl(item.href)}
                className="flex flex-col gap-1 rounded-xl px-4 py-3 transition-colors hover:bg-piedra-400/15"
                onClick={() => setOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-piedra-400/30 bg-piedra-400/15 px-2 py-0.5 font-display text-[0.65rem] font-bold uppercase tracking-wider text-piedra-200">
                    {item.badge}
                  </span>
                </div>
                <span className="font-serif text-base font-bold text-pergamino">
                  {highlight(item.title)}
                </span>
                <span className="line-clamp-1 text-xs sm:text-sm text-pergamino-muted/75">
                  {highlight(item.excerpt)}
                </span>
              </a>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function SearchModal() {
  return (
    <ErrorBoundary label="el buscador">
      <SearchModalInner />
    </ErrorBoundary>
  );
}
