/*
 * Pre-renderizado estático post-build.
 *
 * Por qué existe: la web es una SPA (todo el contenido se monta con
 * JavaScript desde un único index.html). Las URLs internas limpias
 * (/historia, /ni-catas-ni-minas, /libro/<capitulo>...) funcionan en el
 * navegador gracias al truco de public/404.html + history.replaceState (ver
 * ese archivo y src/utils/router.js), pero GitHub Pages -- hosting estático,
 * sin reescritura de servidor -- sigue respondiendo con un código HTTP 404
 * real a cualquier ruta que no sea un archivo físico. Googlebot respeta ese
 * código y descarta la URL como "no encontrada" sin llegar a ejecutar el
 * JavaScript que la rellenaría, así que ninguna sección aparte de la
 * portada podía indexarse (confirmado con la herramienta de inspección de
 * Search Console, 9 oct 2026).
 *
 * La solución, sin salir de GitHub Pages ni tocar el DNS: generar, además
 * del index.html de la raíz, un archivo real por cada ruta
 * (dist/historia/index.html, dist/ni-catas-ni-minas/index.html,
 * dist/libro/<capitulo>/index.html...) con el HTML ya renderizado de esa
 * sección. Así cada URL es un archivo físico que el servidor sirve con 200,
 * sin que Googlebot necesite ejecutar nada para ver el contenido -- y de
 * paso, cualquier bot de vista previa (WhatsApp, Twitter/X...) que no
 * ejecute JavaScript también ve ya el title/description/OG correctos de esa
 * sección (la limitación de "Fase 2" que documentaba estrategia-seo.md).
 *
 * Cómo: tras `vite build`, levanta el propio servidor de `vite preview`
 * (sirve dist/ tal cual se despliega, con fallback de SPA a 200 para
 * cualquier ruta -- justo lo que hace falta aquí para visitarlas todas),
 * visita cada ruta con un navegador headless (Playwright/Chromium) y
 * guarda el DOM ya renderizado por React -- incluido el <title>, las meta
 * tags y el JSON-LD que pone src/utils/seo.js -- como el index.html de esa
 * ruta. El bundle de JS no cambia: al cargar, React sigue hidratando y
 * tomando el control para la navegación normal dentro de la SPA.
 */
import { preview } from 'vite';
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { rootDir, getAllRoutePaths } from './routes.mjs';

const PORT = 4321;

async function main() {
  const routes = await getAllRoutePaths();
  const distDir = path.join(rootDir, 'dist');

  const server = await preview({
    root: rootDir,
    preview: { port: PORT, strictPort: true, host: '127.0.0.1' },
  });
  const baseUrl = `http://127.0.0.1:${PORT}`;

  // PRERENDER_CHROMIUM_PATH es solo para desarrollo local con un Chromium ya
  // instalado en otra ruta; en CI (`npx playwright install chromium`, ver
  // .github/workflows/deploy.yml) no hace falta y chromium.launch() usa el
  // binario estándar que esa instalación deja en su sitio.
  const browser = await chromium.launch(
    process.env.PRERENDER_CHROMIUM_PATH ? { executablePath: process.env.PRERENDER_CHROMIUM_PATH } : {},
  );
  const page = await browser.newPage();
  // El Service Worker (lo registra src/main.jsx en producción) no aporta
  // nada aquí y podría interferir cacheando respuestas entre rutas: se
  // bloquea solo para este proceso de pre-renderizado.
  await page.route('**/sw.js', (route) => route.abort());

  let count = 0;
  try {
    for (const routePath of routes) {
      await page.goto(`${baseUrl}${routePath}`, { waitUntil: 'networkidle' });
      // useSeo (src/utils/seo.js) aplica el title/meta/JSON-LD en un
      // useEffect, justo después del primer render: un pequeño margen
      // asegura que ya se ha aplicado antes de capturar el HTML.
      await page.waitForTimeout(150);

      const html = await page.content();
      const outDir = routePath === '/' ? distDir : path.join(distDir, routePath.replace(/^\/+/, ''));
      await fs.mkdir(outDir, { recursive: true });
      await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8');
      count++;
    }
  } finally {
    await browser.close();
    await server.httpServer.close();
  }

  console.log(`prerender.mjs: ${count} rutas pre-renderizadas como HTML estático en dist/`);
}

main().catch((err) => {
  console.error('prerender.mjs falló:', err);
  process.exit(1);
});
