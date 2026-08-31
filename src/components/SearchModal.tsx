import { useEffect, useMemo, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Fuse from 'fuse.js';
import { Search, X } from 'lucide-react';
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

  const MIN_QUERY_LENGTH = 3;

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

  const results = useMemo(() => {
    if (!trimmedQuery) return items.slice(0, 8);
    if (trimmedQuery.length < MIN_QUERY_LENGTH) return [];
    return fuse.search(trimmedQuery).slice(0, 15).map((r) => r.item);
  }, [trimmedQuery, fuse, items]);

  const highlight = (text: string) => {
    if (!query.trim()) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="rounded bg-piedra-300/50 text-inherit dark:bg-piedra-500/40">
          {text.slice(idx, idx + query.length)}
        </mark>
        {text.slice(idx + query.length)}
      </>
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-10 items-center gap-2 rounded-full border border-pergamino/20 bg-pergamino/15 px-3.5 text-sm font-semibold text-pergamino shadow-sm backdrop-blur-sm transition-colors hover:border-pergamino/35 hover:bg-pergamino/25"
        aria-label="Buscar en el sitio"
      >
        <Search className="h-4 w-4" />
        <span>Buscar</span>
      </button>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-noche/60 backdrop-blur-sm data-[state=open]:animate-[fade-up_0.2s_ease-out] motion-reduce:transition-none" />
        <Dialog.Content
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
          className="fixed left-1/2 top-24 z-[80] w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-piedra-border/60 bg-pergamino shadow-2xl outline-none transition-all duration-200 data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 dark:border-noche-border dark:bg-noche-surface"
        >
          <Dialog.Title className="sr-only">Buscar en Moriscos: Memoria &amp; Territorio</Dialog.Title>
          <div className="flex items-center gap-2 border-b border-piedra-border/60 px-4 dark:border-noche-border">
            <Search className="h-4 w-4 shrink-0 text-tinta/50 dark:text-pergamino-muted/50" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Escribe al menos 3 letras para buscar en toda la web…"
              className="h-14 w-full bg-transparent font-body text-base outline-none placeholder:text-tinta/40 dark:placeholder:text-pergamino-muted/40"
            />
            <Dialog.Close asChild>
              <button aria-label="Cerrar búsqueda" className="rounded-full p-1.5 hover:bg-piedra-50 dark:hover:bg-noche">
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>
          <ul className="max-h-[60vh] overflow-y-auto p-2" role="listbox">
            {!loaded && <li className="px-4 py-6 text-sm text-tinta/50 dark:text-pergamino-muted/50">Cargando índice…</li>}
            {loaded && isTooShort && (
              <li className="px-4 py-6 text-sm text-tinta/50 dark:text-pergamino-muted/50">Escribe al menos 3 letras para buscar…</li>
            )}
            {loaded && !isTooShort && trimmedQuery.length >= MIN_QUERY_LENGTH && results.length === 0 && (
              <li className="px-4 py-6 text-sm text-tinta/50 dark:text-pergamino-muted/50">Sin resultados para “{query}”.</li>
            )}
            {(!isTooShort ? results : []).map((item) => (
              <li key={item.id}>
                <a
                  href={BASE + item.href.replace(/^\//, '')}
                  className="flex flex-col gap-1 rounded-xl px-4 py-3 hover:bg-piedra-50 dark:hover:bg-noche"
                  onClick={() => setOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-soto/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-soto dark:bg-piedra-300/10 dark:text-piedra-300">
                      {item.badge}
                    </span>
                  </div>
                  <span className="font-serif text-base font-semibold text-tinta dark:text-pergamino-muted">
                    {highlight(item.title)}
                  </span>
                  <span className="line-clamp-1 text-sm text-tinta/60 dark:text-pergamino-muted/60">
                    {highlight(item.excerpt)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
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

