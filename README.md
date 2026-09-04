# Cercadillo · Historia, Lugares y Curiosidades

Archivo digital abierto sobre la historia, la geografía y la memoria viva de **Cercadillo**, una pedanía de Sigüenza (Guadalajara) de apenas 17 habitantes que perdió su ayuntamiento propio en 1973 y hasta ahora no contaba con ningún espacio digital que recogiera su historia.

Sitio en producción: **https://mmonge7.github.io/Cercadillo/**

Este documento es una guía **técnica** del proyecto: explica cómo está organizado el código, qué contiene cada sección y qué decisiones de arquitectura se tomaron y por qué, para que cualquier persona con perfil técnico pueda mantenerlo o ampliarlo sin tener que leer todo el código fuente.

---

## 1. Qué es este proyecto y por qué existe

Cercadillo no tenía ningún portal, wiki ni archivo digital propio. Este proyecto nace para que su historia, su patrimonio y su día a día no dependan solo del boca a boca de sus vecinos:

- Presenta en formato de «libro digital» (capítulos, ver sección 5) la historia y el patrimonio documentado del pueblo.
- Añade capas interactivas: buscador instantáneo, cuenta atrás de la fiesta patronal, sección de rutas de senderismo y BTT, y un resumen de la actividad reciente de la cuenta de Instagram del pueblo.
- Prioriza el rendimiento en móviles de gama media: la web se instala como aplicación, funciona sin conexión y cambiar de sección no descarga nada.

El contenido histórico se basa en fuentes públicas verificables (Wikipedia, Wikidata, el INE, el *Diccionario geográfico-estadístico-histórico* de Pascual Madoz de 1847 y guías de pueblos de Guadalajara), listadas en detalle en la sección **Referencias** de la propia web. Es, deliberadamente, un punto de partida modesto y honesto: donde no hay fuente fiable (glosario local, genealogía), la web lo dice abiertamente en vez de inventar contenido genérico (ver sección 5.2).

---

## 2. Stack tecnológico y justificación de cada elección

| Pieza | Elección | Por qué |
|---|---|---|
| Base | **Vite + React 19** (aplicación de una sola página) | Toda la web es un único documento HTML: navegar entre secciones es cambiar una variable de estado, sin peticiones de red ni reconstrucción del DOM. |
| Contenido | **Markdown en `src/content/` compilado a módulos JS** (`scripts/build-content-data.mjs`) | Los `.md` son la fuente de verdad editable a mano; en el build se convierten en `src/data/*.js` y viajan dentro del bundle, disponibles al instante y sin conexión. |
| Estilos | **Tailwind CSS v4** vía `@tailwindcss/vite` | Configuración «CSS-first» (`@theme` en `src/index.css`), sin `tailwind.config.js`. |
| Buscador | **Fuse.js** sobre un índice generado en el build | Búsqueda difusa (tolerante a erratas) en el navegador. Cada resultado sabe a qué sección y a qué elemento concreto tiene que saltar. |
| Modal accesible | **Radix UI** (`@radix-ui/react-dialog`) | Primitivas de diálogo con foco atrapado, `aria-*` y cierre por teclado ya resueltos. |
| Iconografía | **lucide-react** | Set de iconos SVG consistente y *tree-shakeable*. |
| Tipografía | **@fontsource** (Cinzel, Playfair Display, Plus Jakarta Sans) autoalojada | Evita depender de Google Fonts en tiempo de ejecución y funciona sin conexión. |
| PWA | **vite-plugin-pwa** (Workbox) | Instalable en móvil y escritorio, y funciona sin conexión tras la primera visita. |
| Gestos | **react-swipeable** | Abrir y cerrar el menú lateral deslizando el dedo en móvil, con una zona muerta de 30 px en el borde para no pisar el gesto «atrás» de iOS. |
| Iconos y capturas | **sharp** (`scripts/generate-icons.mjs`) | Genera en el build los favicons, iconos PWA y la imagen de vista previa (Open Graph/Twitter Card) a partir de la foto de la iglesia. |
| Lint | **oxlint** | Linter en Rust, arranca en milisegundos; cubre JS/TS/JSX sin configurar ESLint + plugins. |
| Tests | **Vitest** | Mismo motor (Vite) que ya usa el proyecto; tests unitarios del enrutado, el buscador y la integridad del contenido (ver `tests/`). |
| Despliegue | **GitHub Actions → GitHub Pages** | Gratuito, integrado en el propio repositorio, sin infraestructura que mantener. |

> **Dependencias presentes pero sin usar todavía:** `leaflet` y `react-leaflet` (más `src/components/RouteMap.tsx` y `src/data/route.ts`) quedaron del planteamiento inicial de un mapa interactivo para la sección Rutas. Hoy esa sección (`RutasPage.jsx`) es una rejilla de tarjetas que enlazan a Wikiloc, sin mapa embebido — ver sección 12.

---

## 3. Arquitectura general

```
Contenido en Markdown (src/content/*)
        │  scripts/build-content-data.mjs (se ejecuta en npm run dev y npm run build)
        ▼
Módulos de datos (src/data/chaptersData.js, glosarioData.js, personajesData.js, searchIndex.js)
        │
        ▼
index.html + src/main.jsx ──▶ src/App.jsx
        │
        ├─ Estado de ruta: { tab, target }, sincronizado con el hash de la URL (src/utils/router.js)
        ├─ Armazón fijo: cabecera, menú lateral, menú deslizante, pie y #main-scroll-container
        └─ Una página React por sección (src/pages/*.jsx), importadas de forma estática

GitHub Actions (push a main)
        │
        ├─ npm ci && npm run build   → genera dist/ (contenido, iconos, bundle y service worker)
        └─ actions/deploy-pages      → publica dist/ en GitHub Pages
```

Puntos clave del modelo:

- **Armazón fijo de altura `100dvh`**: `html`, `body` y `#root` tienen `overflow: hidden`, y todo el scroll ocurre dentro de `#main-scroll-container`. Así la cabecera y el menú nunca se mueven, y las áreas seguras del iPhone (`env(safe-area-inset-*)`) se respetan en cabecera, menú, pie y botón de «volver arriba».
- **Sin *lazy loading* de páginas**: las secciones se importan estáticamente, de modo que cambiar de sección no espera ninguna descarga.
- **Rutas por hash**: la navegación es estado de React, pero se refleja en la URL (`#/libro/05-...`). Eso mantiene funcionando el botón «atrás» del móvil, los enlaces compartidos y los marcadores del navegador.

---

## 4. Estructura de carpetas

```
├── index.html              Documento raíz: meta tags, Open Graph, iconos y el <div id="root">.
├── vite.config.js          Configuración de Vite: React, Tailwind, base «/Cercadillo/» y PWA (Workbox).
├── src/
│   ├── main.jsx             Punto de entrada: monta App y registra el service worker.
│   ├── App.jsx               Armazón + enrutado: estado { tab, target }, cabeceras, menús, scroll y pie.
│   ├── index.css              Tailwind v4 «CSS-first»: @theme con la paleta y tipografías, y las clases
│   │                          reutilizables (.card-editorial, .kicker, .btn-primary, .prose-chapter...).
│   ├── content/
│   │   ├── chapters/         6 ficheros .md, uno por capítulo de El Libro (contenido real de Cercadillo).
│   │   ├── glosario/          13 ficheros .md heredados de un proyecto hermano (ver sección 12: NO
│   │   │                      corresponden a Cercadillo y no se muestran en la web, solo contaminan el
│   │   │                      índice del buscador — pendientes de vaciar o sustituir).
│   │   └── personajes/         3 ficheros .md, mismo caso que glosario/: no son de Cercadillo y no se
│   │                           renderizan en ninguna página (GenealogiaPage no los usa).
│   ├── data/
│   │   ├── chaptersData.js    GENERADOS a partir de src/content por scripts/build-content-data.mjs.
│   │   ├── glosarioData.js     No editar a mano: se sobrescriben en cada build. (Sin uso en pantalla.)
│   │   ├── personajesData.js                                                    (Sin uso en pantalla.)
│   │   ├── searchIndex.js
│   │   ├── instagramPosts.ts  Selección manual de publicaciones de @infocercadillo para el Inicio.
│   │   ├── references.ts      Fuentes documentales de la sección Referencias (escritas a mano).
│   │   ├── routes.ts           Rutas de senderismo/BTT de la sección Rutas, con enlace a Wikiloc.
│   │   ├── route.ts            Hitos de un mapa interactivo sin usar actualmente (ver sección 12).
│   │   └── site.ts             Contadores de la portada (altitud, población...) y un array `hitos` sin
│   │                            usar en pantalla, heredado del proyecto hermano.
│   ├── pages/                 Una sección de la web por fichero .jsx/.tsx (ver sección 5.2).
│   ├── components/            Ver detalle en la sección 6.
│   └── utils/
│       ├── router.js          parseHash/buildHash: única fuente de verdad de las rutas (con test).
│       ├── search.js           Configuración de Fuse.js compartida por el buscador y sus tests.
│       ├── markdownBlocks.js   Analizador del markdown, compartido por la app y el script de contenido.
│       └── slugify.js          Genera las anclas de los apartados de cada capítulo.
├── public/                  Estáticos servidos tal cual: favicon, robots.txt, imágenes (incluida
│                             images/instagram/ con las capturas curadas del feed) e iconos PWA
│                             (generados con sharp desde la foto de la iglesia).
├── scripts/
│   ├── build-content-data.mjs  Markdown → módulos JS + índice del buscador.
│   └── generate-icons.mjs      Favicons, iconos PWA e imagen de vista previa (Open Graph/Twitter).
├── tests/                   Tests unitarios con Vitest (enrutado, buscador, integridad del contenido).
├── .github/workflows/       CI/CD: despliegue a GitHub Pages, backup diario y merge main → develop.
└── dist/                    Salida del build (generada, no versionada).
```

---

## 5. Contenido y secciones

### 5.1. Modelo de contenido (`src/content/`)

- **`chapters`** — frontmatter: `number`, `title`, `dek` (subtítulo/resumen), `order`, `readingMinutes`. El cuerpo Markdown usa `##` para los apartados que alimentan el índice del capítulo y `###` para subsecciones que no aparecen en ese índice. Es el único de los tres tipos de contenido con material real de Cercadillo.
- **`glosario`** y **`personajes`** — existen como tipo de contenido (frontmatter y *pipeline* de build ya montados) pero hoy los ficheros que hay dentro son los heredados de un proyecto hermano sobre otro pueblo, no de Cercadillo, y ninguna página los muestra: están ahí en espera de contenido real (ver sección 12).

El nombre del fichero es el identificador (`05-...md` → `05-...`) y es lo que se usa en las rutas (`#/libro/05-...`) y en los saltos del buscador.

Del markdown se soporta el subconjunto que realmente usan los textos: encabezados, párrafos, listas con y sin numerar, negrita, cursiva y enlaces. Se analiza con `src/utils/markdownBlocks.js` en vez de con una librería, para no meter un parser completo en el bundle.

### 5.2. Secciones (`src/pages/`)

| Ruta | Fichero | Contenido |
|---|---|---|
| `#/` | `InicioPage.jsx` | Portada: presentación del pueblo, contadores clave (altitud, población, distancia a Sigüenza, gentilicio), últimas publicaciones de Instagram y cuadrícula con el resto de secciones. |
| `#/historia` | `HistoriaPage.jsx` | Eje cronológico del pueblo, de la repoblación medieval del siglo XI a la actualidad. |
| `#/lugares` | `LugaresPage.jsx` | Patrimonio documentado: la iglesia, las ermitas y las infraestructuras tradicionales. |
| `#/fiestas` | `FiestasPage.jsx` | La fiesta patronal de San Roque (15 y 16 de agosto). |
| `#/escudo` | `EscudoPage.jsx` | **Oculta del menú** (`hidden: true` en `navItems`): Cercadillo no tiene escudo heráldico oficial. Se deja el código y la ruta listos por si en el futuro se define un símbolo propio. |
| `#/iglesia` | `IglesiaPage.jsx` | Arquitectura de la Iglesia de la Natividad de Nuestra Señora (siglo XVI), el monumento principal del pueblo. |
| `#/libro` y `#/libro/<slug>` | `LibroPage.jsx` | Índice de los capítulos y lector de capítulo: barra de progreso de lectura, índice de apartados y navegación al capítulo anterior o siguiente. |
| `#/rutas` | `RutasPage.jsx` | Rutas de senderismo y BTT que atraviesan Cercadillo, recopiladas de Wikiloc; cada tarjeta enlaza a la ficha completa. |
| `#/genealogia` | `GenealogiaPage.jsx` | Página en construcción: aún no hay fuentes verificadas sobre familias y paisanos de Cercadillo. |
| `#/glosario` | `GlosarioPage.jsx` | Página en construcción: aún no hay fuentes verificadas sobre vocabulario tradicional propio de Cercadillo (ver sección 12: deliberadamente vacía en vez de rellena con contenido genérico). |
| `#/referencias` | `ReferenciasPage.jsx` | Fuentes documentales con filtro por tipo, aportación de cada una y enlace al archivo original. |
| `#/sobre-la-web` | `SobrePage.jsx` | Por qué existe el proyecto, de dónde sale la información, y cómo contactar o colaborar. |

Cada página recibe `onNavigate(tab, target)` para navegar y, cuando aplica, `target` con el elemento concreto al que debe saltar (un capítulo o una fuente).

---

## 6. Componentes (`src/components/`)

- **`Nav.jsx`** — Exporta las tres formas de la navegación y la lista `navItems`, única fuente de verdad de las secciones: `DesktopTopBar` (marca y buscador, `lg` en adelante), `Sidebar` (menú fijo de escritorio) y `Nav` con su `Drawer` (cabecera móvil y menú deslizante, que se cierra con Escape, al tocar fuera o deslizando).
- **`SearchModal.tsx`** — Diálogo de Radix UI con atajo `⌘K`/`Ctrl K`. Filtra el índice generado en el build con Fuse.js y, al elegir un resultado, navega a la sección y al elemento concreto.
- **`InstagramFeed.jsx`** — Rejilla de las últimas publicaciones de `@infocercadillo`, curadas a mano en `src/data/instagramPosts.ts` (sin integración con la API de Instagram, ver sección 12). Cada tarjeta enlaza al post original.
- **`Markdown.jsx`** — Convierte el markdown del contenido en elementos reales de React y pone un `id` a cada encabezado `##` para poder enlazarlo desde el índice del capítulo.
- **`ReadingProgress.jsx`** — Barra fina pegada al borde superior del área de scroll que indica cuánto queda por leer del capítulo abierto.
- **`VisitorStatsModal.tsx`** — Registro de visitas de los últimos 30 días **guardado solo en `localStorage`**: la web no envía nada a ningún servidor ni usa analítica de terceros, así que las cifras son de ese dispositivo.
- **`ScrollToTopButton.jsx`** — Botón flotante que aparece a partir de 400 px de scroll dentro de `#main-scroll-container`, respetando el área segura inferior.
- **`Footer.jsx`** — Enlaces a Instagram y Twitter (`@infocercadillo`), accesos a Libro/Referencias/Sobre la web y autoría, con `padding-bottom` que suma `env(safe-area-inset-bottom)`.
- **`ErrorBoundary.tsx`** — Aísla los fallos: si una sección lanza un error, se muestra un aviso en su lugar y el resto de la web sigue usable. Envuelve la aplicación completa, cada sección y el buscador.
- **`RouteMap.tsx`** — Componente de mapa (Leaflet) sin usar actualmente por ninguna página, ver sección 12.

---

## 7. Diseño y sistema visual

Definido íntegramente en `src/index.css` con el bloque `@theme` de Tailwind v4 (sin fichero de configuración JS):

- **Paleta**: tonos claros y neutros inspirados en el paisaje y el patrimonio local — `piedra`, `armuna` (tierra y trigo), `soto`, `pergamino` (texto) y `noche` (fondos claros, pese al nombre: la variante `dark` de Tailwind se usa como único tema visual del sitio, fijada con la clase `dark` en el `<html>`, pero los tokens que la alimentan están definidos en tonos cálidos y claros, no oscuros).
- **Tipografía**: `Cinzel` para marca y titulares, `Playfair Display` como serif de apoyo y `Plus Jakarta Sans` para el cuerpo de texto.
- **Clases reutilizables**: `.container-editorial` (ancho de lectura), `.card-editorial` (tarjeta con borde y desenfoque), `.kicker`, `.btn-primary`, `.btn-secondary`, `.nav-item`, `.prose-chapter` (texto largo de capítulos, sobre `@tailwindcss/typography`), `.brand-panel` (pie con textura de campo de trigo) y `.dialog-overlay`/`.dialog-content` (aparición de los diálogos).
- **Animación de entrada**: una única animación GPU de 0,18 s al montar cada sección, anulada si el sistema pide reducir el movimiento.

---

## 8. Accesibilidad y rendimiento

- Enlace «Saltar al contenido principal», `aria-*` en botones y diálogos, foco gestionado por Radix UI en el buscador, y el menú deslizante pasa a `visibility: hidden` al cerrarse para no quedar en el orden de tabulación.
- Se respeta el zoom del navegador: el `<meta name="viewport">` no lleva `user-scalable=no` ni `maximum-scale`; sí lleva `viewport-fit=cover`, necesario para que funcionen las áreas seguras del iPhone.
- `prefers-reduced-motion` anula las animaciones de entrada y de los diálogos.
- Fuentes autoalojadas para evitar peticiones externas y parpadeo de texto sin estilo.
- **PWA instalable y sin conexión**: `manifest.webmanifest` (iconos 192/512/maskable) y un service worker de Workbox que precachea HTML, CSS, JS, tipografías (solo `woff2`) e imágenes.

---

## 9. SEO: limitación conocida

Al ser una SPA sin renderizado en servidor, los buscadores que no ejecutan JavaScript solo ven el HTML de `index.html`: título, descripción, Open Graph e imagen de la portada. El contenido de los capítulos **no** se sirve como HTML pre-renderizado.

Mitigación activa: `index.html` lleva título, descripción, Open Graph y Twitter Cards, así que al compartir cualquier enlace se ve una tarjeta correcta con la imagen de la iglesia de Cercadillo (generada en el build por `scripts/generate-icons.mjs`).

> Nota: cuando se cambia esta imagen, algunas apps de mensajería (WhatsApp, Facebook) guardan en caché la vista previa anterior del enlace y no la actualizan solas. Para forzar el refresco puede usarse el [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) pegando la URL y pulsando «Scrape Again».

Si en el futuro la visibilidad en buscadores pasa a ser importante, la vía natural es pre-renderizar las secciones en el build manteniendo el mismo código de las páginas.

---

## 10. Despliegue y CI/CD

El pipeline vive en `.github/workflows/deploy.yml` y se dispara en cada `push` a `main` (o manualmente vía `workflow_dispatch`):

1. `actions/checkout` + `actions/setup-node` (**Node 22**).
2. `npm ci` (instalación reproducible a partir de `package-lock.json`).
3. `npm run build` → genera el contenido desde Markdown, los iconos PWA y el bundle de Vite con el service worker.
4. `actions/configure-pages` + `actions/upload-pages-artifact` + `actions/deploy-pages` → publica `dist/` como GitHub Pages.

Detalle importante: `base` está fijado a `/Cercadillo/` en `vite.config.js` (con barra final) porque el sitio se sirve en un subdirectorio de GitHub Pages. **Si `base` no termina en `/`, las concatenaciones de rutas se rompen.**

Hay además dos workflows de mantenimiento: un backup diario de `main` en una rama con fecha, y un merge diario de `main` en `develop`.

---

## 11. Desarrollo local

```bash
npm install       # instala dependencias
npm run dev       # genera el contenido y arranca Vite con recarga en caliente
npm run content   # regenera src/data/* a partir de src/content/* (sin arrancar nada)
npm run build     # genera el sitio completo en dist/ (contenido + iconos + bundle + sw.js)
npm run preview   # sirve dist/ localmente para verificar el build de producción
npm run lint      # oxlint sobre todo el proyecto
npm run typecheck # comprobación de tipos con TypeScript
npm test          # tests unitarios con Vitest
```

En desarrollo no existe `sw.js` (solo se genera en `npm run build`) y el registro del service worker está limitado a producción, así que no interfiere con la recarga en caliente.

### Cómo añadir contenido

- **Un capítulo nuevo**: crear `src/content/chapters/07-mi-capitulo.md` con su frontmatter (`number`, `title`, `dek`, `order`, `readingMinutes`) y ejecutar `npm run content`. Aparece automáticamente en el índice del libro y en el buscador.
- **Una ruta de senderismo/BTT**: añadir una entrada al array de `src/data/routes.ts` con el enlace a Wikiloc.
- **Una fuente documental**: añadir una entrada a `src/data/references.ts`.
- **Refrescar el feed de Instagram**: añadir una entrada nueva en `src/data/instagramPosts.ts` y guardar la captura correspondiente en `public/images/instagram/` (ver sección 12: no hay integración automática con Instagram).

Los ficheros de `src/data/*Data.js` y `searchIndex.js` están generados: cualquier cambio hecho a mano se pierde en el siguiente build.

---

## 12. Limitaciones conocidas y deuda técnica

- **Glosario y Genealogía sin contenido propio**: no se ha encontrado fuente pública fiable sobre el vocabulario tradicional ni las familias de Cercadillo, así que ambas páginas muestran honestamente un aviso de «página en construcción» en vez de rellenarse con contenido genérico o de otro pueblo.
- **Contenido heredado sin depurar**: los 13 ficheros de `src/content/glosario/` y los 3 de `src/content/personajes/` (y el array `hitos` de `src/data/site.ts`) proceden de un proyecto hermano sobre otro pueblo y no describen Cercadillo. Ninguna página los muestra, pero glosario y personajes sí se compilan al índice del buscador, por lo que **hoy el buscador puede devolver resultados que no son de Cercadillo**. Pendiente: vaciar esas carpetas (o sustituirlas por contenido real) y quitar `hitos` si no se va a usar.
- **`EscudoPage.jsx` sin actualizar**: la página sigue titulada «El escudo de Moriscos». Está oculta del menú (`hidden: true`) porque Cercadillo no tiene escudo oficial, pero el texto interno no se ha revisado por si en algún momento se enlaza directamente.
- **Mapa interactivo sin conectar**: `leaflet`, `react-leaflet`, `RouteMap.tsx` y `src/data/route.ts` están en el proyecto pero ninguna página los usa; la sección Rutas es hoy una lista de tarjetas a Wikiloc, sin mapa embebido.
- **Feed de Instagram curado a mano**: no hay integración con la API de Instagram (Meta cerró la API pública sencilla en diciembre de 2024); refrescar `InstagramFeed` requiere editar `src/data/instagramPosts.ts` y añadir la captura correspondiente a mano.
- **El buscador se indexa en el build**: si se añade contenido, hay que reconstruir el sitio para que aparezca en los resultados.
- **El contador de visitas es local a cada dispositivo**: no hay backend ni analítica; un contador global real exigiría un servicio externo.
- **No hay backend ni base de datos**: GitHub Pages solo sirve estáticos, así que cualquier funcionalidad futura de formularios (por ejemplo «aportar una fotografía» desde la propia web) requeriría un servicio externo.

---

## 13. Colaborar

¿Tienes fotografías, documentos, datos genealógicos o correcciones sobre Cercadillo? Escríbenos por Instagram o Twitter: **[@infocercadillo](https://www.instagram.com/infocercadillo/)**.
