// Genera el service worker (sw.js) sobre el dist/ final con workbox-build.
// Necesario porque vite-plugin-pwa no emite el SW de forma fiable en el
// pipeline de build multi-pasada de Astro; el manifest.webmanifest y el
// registerSW.js sí los genera correctamente el plugin de Vite, así que este
// script solo se encarga de la pieza que falta.
import { generateSW } from 'workbox-build';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const distDir = path.resolve(fileURLToPath(import.meta.url), '../../dist');

const { count, size, warnings } = await generateSW({
  globDirectory: distDir,
  globPatterns: ['**/*.{html,css,js,svg,png,ico,woff,woff2,jpg,jpeg,webp}'],
  swDest: path.join(distDir, 'sw.js'),
  skipWaiting: true,
  clientsClaim: true,
  cleanupOutdatedCaches: true,
  navigateFallback: undefined,
  runtimeCaching: [
    {
      urlPattern: ({ request }) => request.destination === 'image',
      handler: 'CacheFirst',
      options: {
        cacheName: 'moriscos-images',
        expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
  ],
});

if (warnings.length) {
  console.warn('[generate-sw] warnings:', warnings);
}
console.log(`[generate-sw] service worker generated: ${count} files precached, ${(size / 1024).toFixed(1)} KB`);
