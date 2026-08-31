import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

const site = 'https://pcresp0.github.io';
const base = '/moriscos-wiki/';

export default defineConfig({
  site: `${site}${base}`,
  base,
  trailingSlash: 'ignore',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'load',
  },
  integrations: [react(), sitemap()],
  vite: {
    plugins: [
      tailwindcss(),
      VitePWA({
        base,
        registerType: 'autoUpdate',
        injectRegister: false,
        // El SW real (workbox) se genera aparte en scripts/generate-sw.mjs, ejecutado
        // tras `astro build`: el hook de este plugin no llega a disparar el generateSW
        // dentro del pipeline de build multi-pasada de Astro. Este plugin solo se
        // encarga aquí de emitir el manifest.webmanifest con los datos correctos.
        includeAssets: [
          'favicon.ico',
          'favicon.svg',
          'favicon.png',
          'icons/apple-touch-icon.png',
          'icons/icon-192.png',
          'icons/icon-512.png',
          'images/og-default.png',
        ],
        manifest: {
          id: base,
          name: 'Moriscos · Historia, Lugares y Curiosidades',
          short_name: 'Moriscos',
          description:
            'Historia, geografía, etnografía y memoria viva de Moriscos (Salamanca, La Armuña) y el entorno de La Flecha.',
          lang: 'es',
          start_url: base,
          scope: base,
          display: 'standalone',
          theme_color: '#8C4A32',
          background_color: '#2A241D',
          icons: [
            { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
            {
              src: 'icons/icon-maskable-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
      }),
    ],
  },
});

