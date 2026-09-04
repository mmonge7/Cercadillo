import React from 'react';
import { Instagram, Play, ArrowRight } from 'lucide-react';
import { instagramPosts } from '../data/instagramPosts';

export default function InstagramFeed() {
  return (
    <section className="border-y border-noche-border bg-noche-surface/40 py-14 sm:py-20">
      <div className="container-editorial">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">Vida del pueblo</p>
            <h2 className="mt-2 font-serif text-2xl sm:text-4xl font-bold text-pergamino">Últimas publicaciones</h2>
            <p className="mt-3 max-w-2xl text-pergamino-muted/70">
              Lo que compartimos en el día a día de Cercadillo: paisajes, vida vecinal y las causas que nos importan.
            </p>
          </div>
          <a
            href="https://www.instagram.com/infocercadillo/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-pergamino/20 bg-pergamino/10 px-4 py-2.5 text-sm font-semibold text-pergamino shadow-sm transition-colors hover:border-pergamino/35 hover:bg-pergamino/20 cursor-pointer"
          >
            <Instagram size={17} />
            Síguenos @infocercadillo
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              title={post.caption}
              className="group relative block aspect-[4/5] overflow-hidden rounded-xl border border-noche-border bg-noche-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={post.image}
                alt={post.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {post.kind === 'reel' && (
                <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
                  <Play size={13} fill="currentColor" />
                </span>
              )}
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-2.5 pt-6 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span className="line-clamp-2 text-[11px] leading-snug text-white/90">{post.caption}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-noche-border bg-noche-card/70 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-pergamino-muted/80">
            ¿Tienes fotos, vídeos o historias de Cercadillo? Nos encantaría compartirlas en la cuenta del pueblo.
          </p>
          <a
            href="https://www.instagram.com/infocercadillo/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-armuna-light transition-colors hover:text-armuna cursor-pointer"
          >
            Colabora con nosotros <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
