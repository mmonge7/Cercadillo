# Moriscos · Memoria & Territorio

Plataforma web documental sobre la historia, geografía, etnografía y memoria viva de **Moriscos** (Salamanca, La Armuña) y el entorno de **La Flecha**.

Sitio en producción: **https://pcresp0.github.io/moriscos-wiki/**

Este documento es una guía **técnica** del proyecto: explica por qué se tomó cada decisión de arquitectura, cómo está organizado el código y qué contiene exactamente cada sección del sitio, para que cualquier persona con perfil técnico pueda entenderlo, mantenerlo o ampliarlo sin tener que leer todo el código fuente.

---

## 1. Qué es este proyecto y por qué existe

Moriscos (Salamanca) contaba ya con un portal comunitario histórico, **"Morisqueños"** (moriscos.info, alojado en Google Sites), con noticias, genealogía y archivo fotográfico. Este proyecto nace como una **plataforma editorial moderna** que:

- Reorganiza y presenta en formato de "libro digital" (11 capítulos) la historia, geografía y etnografía documentada del municipio.
- Añade capas interactivas que el portal original no podía ofrecer: buscador instantáneo, mapa interactivo de una ruta senderista, tooltips de glosario dentro del texto, modo oscuro, tabla de contenidos con scroll-spy, etc.
- Prioriza el rendimiento y la accesibilidad al ser un sitio **100% estático** (HTML pre-renderizado en build time), servido gratis desde GitHub Pages.

El contenido histórico (capítulos, glosario, genealogía) procede de un documento de recopilación histórica proporcionado por el propietario del proyecto y se ha volcado a Markdown estructurado; no es contenido generado sin fuente.

---

## 2. Stack tecnológico y justificación de cada elección

| Pieza | Elección | Por qué |
|---|---|---|
| Framework | **Astro 7** | Genera HTML estático en build time ("islands architecture"): cero JavaScript por defecto, solo se hidratan los componentes interactivos que lo piden explícitamente (`client:*`). Ideal para un sitio mayoritariamente de contenido/lectura. |
| Contenido | **Astro Content Layer API** (`content.config.ts` + `loader: glob(...)`) | Permite tratar los `.md` de capítulos, glosario y personajes como una base de datos tipada (Zod), con validación de frontmatter en build time y autogeneración de tipos TypeScript. |
| Estilos | **Tailwind CSS v4** vía `@tailwindcss/vite` | Config "CSS-first" (`@theme` en `src/styles/global.css`), sin `tailwind.config.js`. Se eligió v4 en vez de v3 porque es la versión soportada activamente y compatible con Astro 7; v3 arrastraba vulnerabilidades de `@astrojs/tailwind` (paquete ya no compatible con Astro ≥6). |
| Interactividad | **React 18**, solo en islas puntuales (`@astrojs/react`) | Astro permite mezclar frameworks; se usa React únicamente donde hace falta estado complejo (buscador, mapa), no en todo el sitio, para minimizar el JS que llega al navegador. |
| Buscador | **Fuse.js** (búsqueda difusa en cliente) sobre un índice generado en build time | Se descartó Pagefind (requiere un paso extra de post-build y no funciona en `astro dev`) a favor de un endpoint JSON (`search-index.json.ts`) generado por Astro con los datos de las content collections, consumido por Fuse.js en el navegador. Más simple de mantener y depurar. |
| Modal accesible | **Radix UI** (`@radix-ui/react-dialog`) | Primitivas de diálogo con foco atrapado, `aria-*` y cierre por teclado ya resueltos, en vez de reinventar accesibilidad a mano. |
| Mapa | **Leaflet + react-leaflet** | Mapa interactivo ligero y sin coste de licencia (tiles de OpenStreetMap) para la Ruta Nocturna. |
| Iconografía | **lucide-react** | Set de iconos SVG consistente, tree-shakeable. Se renderizan también dentro de componentes `.astro` **sin** directiva `client:*` (Astro los sirve como HTML/SVG estático en build time, cero JS extra) en la barra lateral, el drawer móvil y la cabecera. |
| Tipografía | **@fontsource** (Cinzel, Playfair Display, Plus Jakarta Sans) autoalojada | Evita depender de Google Fonts en tiempo de ejecución (mejor privacidad y rendimiento, sin salto de layout por fuentes tardías). |
| PWA | **vite-plugin-pwa** (manifest) + **workbox-build** (service worker, generado aparte en `scripts/generate-sw.mjs`) | Instalable en móvil/escritorio y funciona offline tras la primera visita. Se explica el porqué del script separado en la sección 9. |
| Lint | **oxlint** | Linter en Rust, arranca en milisegundos incluso en un proyecto pequeño; cubre JS/TS/JSX sin necesitar configurar ESLint + plugins. |
| Tests | **Vitest** | Mismo motor (Vite) que ya usa Astro por debajo, cero configuración adicional de bundler; tests unitarios rápidos para la lógica de navegación y búsqueda (ver `tests/`). |
| Despliegue | **GitHub Actions → GitHub Pages** (`actions/deploy-pages`) | Gratuito, integrado en el propio repositorio, sin infraestructura que mantener. |

### Por qué "arquitectura de islas" y no un SPA

El sitio es, en esencia, un libro con capítulos, un glosario y una galería: contenido que debe indexar bien en buscadores, cargar rápido y funcionar sin JavaScript si hace falta. Un SPA (Next.js/Vite en modo cliente, por ejemplo) enviaría un bundle de JS para renderizar texto que no cambia. Astro renderiza ese texto a HTML en build time y **solo** envía JavaScript para los cuatro puntos realmente interactivos: el buscador, el mapa, el menú móvil y los tooltips del glosario. El resto de la página (texto, imágenes, navegación) es HTML/CSS puro.

---

## 3. Arquitectura general

```
Contenido en Markdown (src/content/*)
        │  (Content Layer API, validado con Zod en content.config.ts)
        ▼
Páginas Astro (src/pages/*.astro)  ──renderizan en build time──▶  HTML estático (dist/)
        │
        ├─ Componentes Astro (.astro): se renderizan a HTML puro, sin runtime en el cliente
        │   (Header, Footer, Hero, HitoCard, PersonCard, GlossaryCard, TableOfContents, MobileToc...)
        │
        └─ Islas React (.tsx) con directiva client:*: se hidratan en el navegador
            (SearchModal → client:idle, RouteMap → client:only="react")

GitHub Actions (push a main)
        │
        ├─ npm ci && npm run build   → genera dist/ (sitio 100% estático)
        └─ actions/deploy-pages      → publica dist/ en GitHub Pages
```

Puntos clave del modelo de renderizado:

- **`output: "static"` (por defecto en Astro)**: todas las rutas —incluidas las dinámicas `libro/[slug]`— se resuelven en build time mediante `getStaticPaths()`, generando un `.html` por cada capítulo. No hay servidor Node en producción; GitHub Pages solo sirve ficheros estáticos.
- **Islas React** (`client:idle`, `client:only="react"`): el JS de React solo se descarga y ejecuta para esos componentes puntuales, nunca para el resto de la página.
- **`<script>` inline en componentes `.astro`**: para interactividad sencilla (abrir/cerrar el menú móvil, el ToC móvil, el tema claro/oscuro, la barra de progreso de lectura) se usa JavaScript vanilla sin frameworks, porque no necesita gestión de estado compleja y así se evita cargar React para algo trivial.

---

## 4. Estructura de carpetas

```
├── astro.config.mjs        Configuración de Astro: integraciones (react, sitemap), Vite (plugin de Tailwind),
│                            site/base para GitHub Pages (ver sección 7).
├── src/
│   ├── content.config.ts   Definición de las 3 "content collections" (chapters, glosario, personajes) y su
│   │                       esquema Zod. Usa el Content Layer API (loader: glob) introducido en Astro 5.
│   ├── content/
│   │   ├── chapters/       11 ficheros .md, uno por capítulo del libro (ver sección 5).
│   │   ├── glosario/       13 ficheros .md, uno por término etnográfico.
│   │   └── personajes/     3 ficheros .md, uno por paisano ilustre.
│   ├── data/
│   │   ├── site.ts         Datos estructurados en TypeScript (no Markdown) porque son listas cortas y muy
│   │   │                   ligadas a la UI: contadores de la home, hitos históricos destacados, enlaces de nav.
│   │   └── route.ts        Los 8 puntos de la Ruta Nocturna (coordenadas lat/lng, distancia, descripción, cita).
│   ├── layouts/
│   │   └── BaseLayout.astro  <html> raíz: head, meta tags, manifest/SW, script anti-flash de tema oscuro,
│   │                          monta Sidebar + MobileDrawer + Header + Footer alrededor del <slot/>.
│   ├── components/         Ver detalle en la sección 6.
│   ├── pages/               Ver detalle en la sección 5 (cada .astro = una ruta del sitio).
│   ├── utils/
│   │   └── nav.ts          `isActiveHref()`: única fuente de verdad para saber qué enlace de navegación
│   │                       está activo, compartida por Header, Sidebar y MobileDrawer (con test en tests/).
│   └── styles/
│       └── global.css      Tailwind v4 "CSS-first": @theme con la paleta de color, tipografías, keyframes,
│                           alias de variables CSS planas (--ink, --primary, --accent...) y clases de
│                           utilidad reutilizables (@layer components: .btn-primary, .brand-panel...).
├── public/                 Estáticos servidos tal cual: favicon, robots.txt, public/icons/ (iconos PWA
│                           192/512/maskable generados con sharp a partir de icon-master.svg).
├── scripts/
│   └── generate-sw.mjs    Genera dist/sw.js con workbox-build tras `astro build` (ver sección 9).
├── tests/                 Tests unitarios con Vitest (navegación activa, buscador con Fuse.js).
├── .github/workflows/
│   └── deploy.yml          Pipeline de CI/CD (build + deploy a GitHub Pages) en cada push a main.
└── dist/                   Salida del build (generada, no versionada).
```

---

## 5. Contenido y páginas: qué hay en cada sección

### 5.1. Modelo de contenido (`src/content/`)

Las tres colecciones se definen y validan en `src/content.config.ts`:

- **`chapters`** — frontmatter: `number`, `title`, `dek` (subtítulo/resumen), `order`, `readingMinutes`. El cuerpo Markdown usa `##` para las secciones que alimentan la tabla de contenidos (ver `TableOfContents.astro`) y `###` para subsecciones que no aparecen en el índice.
- **`glosario`** — frontmatter: `term`, `category` (enum: `Aperos | Naturaleza | Medidas | Topónimos | Oficios | Cultivos`), `short` (una frase). El cuerpo Markdown es la definición extendida.
- **`personajes`** — frontmatter: `name`, `years`, `role`, `tag`. El cuerpo Markdown es la biografía.

Cada entrada tiene un `id` derivado del nombre de fichero (p. ej. `05-despoblado-ribas-flecha.md` → id `05-despoblado-ribas-flecha`), que se usa para construir las URLs (`/libro/05-despoblado-ribas-flecha`) y los anclajes de glosario/personajes (`/glosario#maquila`).

### 5.2. Páginas (`src/pages/`) — una ruta por fichero

| Ruta | Fichero | Contenido |
|---|---|---|
| `/` | `index.astro` | Portada: hero con ilustración SVG propia, contadores clave (superficie, altitud del vértice geodésico, distancia a Salamanca, población), 4 tarjetas de "hitos históricos", vista previa de los primeros 6 capítulos, llamada a la Ruta Nocturna. |
| `/libro` | `libro/index.astro` | Índice completo de los 11 capítulos, con número, título, resumen y minutos de lectura estimados. |
| `/libro/[slug]` | `libro/[slug].astro` | Lector de un capítulo: barra de progreso de lectura, tabla de contenidos (fija en escritorio, hoja flotante en móvil), tooltips de glosario en el propio texto, navegación al capítulo anterior/siguiente. Se genera una página HTML por cada uno de los 11 capítulos vía `getStaticPaths()`. |
| `/ruta-nocturna` | `ruta-nocturna.astro` | Mapa interactivo (Leaflet) con los 8 hitos de la ruta senderista Moriscos → La Flecha (7,7 km), sincronizado con una lista lateral clicable. |
| `/genealogia` | `genealogia.astro` | Galería de los 3 "paisanos ilustres" documentados, más una llamada a la acción para el Bosque Genealógico real (geneaweb.org/moriscos, registros desde 1645). |
| `/glosario` | `glosario.astro` | Los 13 términos etnográficos, con filtro por categoría (botones que muestran/ocultan tarjetas por `data-category`, sin recarga de página). |
| `/404` | `404.astro` | Página de error personalizada. |
| `/search-index.json` | `search-index.json.ts` | **Endpoint, no página visible.** Un `APIRoute` de Astro que en build time lee las tres content collections + `route.ts` y genera un array JSON `{id, title, excerpt, href, badge}` con todo el contenido buscable. Lo consume `SearchModal.tsx` en el cliente. |

### 5.3. Datos estructurados (`src/data/`)

- **`site.ts`**: `counters` (los 4 datos destacados de la home), `hitos` (las 4 tarjetas de hitos históricos con enlace al capítulo correspondiente) y `navLinks` (los enlaces del menú, usados tanto en `Header.astro` como en `Footer.astro` para no duplicar la lista).
- **`route.ts`**: array tipado `RoutePoint[]` con los 8 puntos de la Ruta Nocturna (id, orden, nombre, lat/lng, distancia acumulada en km, descripción, cita opcional). Es la única fuente de verdad tanto para el mapa (`RouteMap.tsx`) como para el índice de búsqueda.

Estos dos ficheros están en TypeScript (no en Markdown/content collections) porque son estructuras pequeñas, muy acopladas a props de componentes concretos, y se benefician del tipado estático directo en vez de pasar por un esquema Zod.

---

## 6. Componentes: qué hace cada uno y por qué existe

### Astro (renderizados a HTML, sin JS de framework)

- **`Sidebar.astro`** — Barra lateral fija de escritorio (`lg:block`, ~230px, oculta por debajo de `lg`). Fondo `.brand-panel` (degradado tierra→verde con textura de líneas repetida, ver sección 7), logo, y la navegación principal con un icono `lucide-react` por sección (renderizado sin `client:*`, o sea, HTML/SVG estático). El enlace activo se calcula con `isActiveHref()` (`src/utils/nav.ts`).
- **`Header.astro`** — Barra superior. En **móvil** es `fixed` a todo el ancho, altura `var(--mobile-topbar)` (con `env(safe-area-inset-top)`), con botón de menú (abre `MobileDrawer`), logo y buscador/tema. En **escritorio** es `sticky` dentro de la columna de contenido (a la derecha del Sidebar), más baja (68px), y en vez del logo muestra el nombre de la sección activa.
- **`MobileDrawer.astro`** — Panel que se desliza **desde la izquierda** (mismo `.brand-panel` que el Sidebar) por debajo de `lg`, con la misma navegación e iconos. Controlado por un `<script>` inline (abrir/cerrar, cerrar con Escape o clic fuera).
- **`ThemeToggle.astro`** — Alterna la clase `dark` en `<html>` y persiste la preferencia en `localStorage`. El script anti-parpadeo que lee esa preferencia **antes** del primer render vive en `BaseLayout.astro` (evita el "flash" de tema claro al cargar en modo oscuro).
- **`MobileToc.astro`** — Botón flotante "Índice" + hoja inferior, visible solo en móvil (`lg:hidden`), para suplir la tabla de contenidos que en escritorio va fija en la barra lateral. Reutiliza los mismos atributos `data-toc-link`/`data-target` que `TableOfContents.astro`, de modo que un único `IntersectionObserver` mantiene resaltado el enlace activo en ambas versiones (móvil y escritorio) a la vez.
- **`TableOfContents.astro`** — Genera la lista de enlaces a partir de los encabezados `##` (`depth === 2`) que Astro extrae automáticamente del Markdown del capítulo, y usa un `IntersectionObserver` para resaltar la sección visible mientras se hace scroll (*scroll-spy*).
- **`ReadingProgress.astro`** — Barra fija superior cuyo ancho se actualiza en cada evento de `scroll` según el porcentaje de la página leída.
- **`GlossaryTooltips.astro`** — Se incluye solo en `libro/[slug].astro`. En el cliente recorre el DOM del artículo con un `TreeWalker`, localiza la primera aparición de cada término del glosario dentro del texto y la envuelve en un `<button>` con un tooltip flotante (posicionado con `getBoundingClientRect`) que muestra la definición corta y un enlace al glosario completo. Distingue estado "previsualización al pasar el ratón" de "fijado al hacer clic" para que un tap en móvil no cierre el tooltip que acaba de abrir.
- **`Footer.astro`** — También con fondo `.brand-panel`. Incluye los enlaces de navegación, contacto, dos iconos circulares de redes (LinkedIn/GitHub, SVG inline, `target="_blank" rel="noopener noreferrer"`), el crédito de autoría y el copyright, con `padding-bottom` sumando `env(safe-area-inset-bottom)`.
- **`Hero.astro`**, **`CounterGrid.astro`**, **`HitoCard.astro`**, **`PersonCard.astro`**, **`GlossaryCard.astro`**, **`SEO.astro`** — Componentes de presentación puros (reciben props, pintan HTML/Tailwind). `SEO.astro` centraliza las etiquetas `<title>`, `og:*` y `twitter:*` para que cada página solo tenga que pasar `title`/`description`/`image`.

### React (islas hidratadas en el cliente)

- **`SearchModal.tsx`** (`client:idle`, se hidrata cuando el navegador está inactivo, no bloquea la carga inicial) — Diálogo de Radix UI con atajo `⌘K`/`Ctrl K`. Al abrirse por primera vez hace `fetch('/search-index.json')` y filtra los resultados con **Fuse.js** (búsqueda difusa, tolerante a erratas) sobre `title`, `excerpt` y `badge`. Resalta la coincidencia de texto en los resultados.
- **`RouteMap.tsx`** (`client:only="react"`, no se intenta renderizar en el servidor porque Leaflet necesita `window`/`document`) — Mapa Leaflet con tiles de OpenStreetMap, una polilínea que une los 8 puntos de `route.ts` y marcadores cuyo icono cambia de tamaño/color según estén activos; al seleccionar un punto de la lista lateral, el mapa hace `flyTo` hasta él.

---

## 7. Diseño y sistema visual

Definido íntegramente en `src/styles/global.css` mediante el bloque `@theme` de Tailwind v4 (sin fichero de configuración JS):

- **Paleta**: tonos inspirados en el paisaje y el patrimonio local — `piedra` (arenisca de Villamayor), `armuña` (tierra), `soto` (verde ribera del Tormes), `pergamino` (modo claro) y `noche` (modo oscuro). Además, `:root` expone un **alias plano** de las mismas variables con nomenclatura genérica (`--ink`, `--paper`, `--primary`, `--primary-deep`, `--accent`, `--forest`, `--gold`, `--line`, `--font-display`, `--font-body`, `--mobile-topbar`) para mantener coherencia de patrón con otros proyectos del autor y para poder usarlas como valores CSS directos (no solo como clases de Tailwind).
- **Tipografía**: `Cinzel` para elementos de marca/kicker, `Playfair Display` para titulares editoriales, `Plus Jakarta Sans` para el cuerpo de texto.
- **Modo oscuro**: basado en clase (`darkMode: 'class'` vía `@custom-variant dark`), alternado por `ThemeToggle.astro`.
- **`.brand-panel`**: degradado tierra→verde (`--primary` → `--primary-deep` → `--forest`) con una textura sutil de líneas diagonales repetidas al 6% de opacidad; lo comparten `Sidebar.astro`, `MobileDrawer.astro` y `Footer.astro` para dar continuidad visual entre cabecera, menú y pie.
- **Utilidades reutilizables** en `@layer components`: `.btn-primary`, `.btn-secondary`, `.kicker`, `.container-editorial`, `.nav-item` (enlaces de navegación con estado activo), `.prose-armuna` (tipografía larga de los capítulos, basada en `@tailwindcss/typography`).
- **Resaltado al navegar desde el buscador**: se usa el pseudo-selector **CSS nativo `:target`** (no JavaScript) para animar con un pulso dorado el elemento cuyo `id` coincide con el `#hash` de la URL. Es más robusto que temporizar la animación en JS porque el navegador lo reevalúa automáticamente contra el DOM en tiempo real, incluso si el elemento se monta más tarde (p. ej. un marcador dentro de la isla React del mapa).

---

## 8. SEO, accesibilidad y rendimiento

- **`@astrojs/sitemap`** genera `sitemap-index.xml` automáticamente en cada build a partir de las rutas estáticas.
- **`SEO.astro`** añade `canonical`, Open Graph y Twitter Cards en todas las páginas.
- **`public/robots.txt`** apunta al sitemap generado.
- Fuentes autoalojadas (`@fontsource/*`) para evitar peticiones externas y parpadeo de texto sin estilo (FOUT/FOIT).
- Accesibilidad: enlace "Saltar al contenido principal", `aria-*` en botones y diálogos, foco gestionado por Radix UI en el buscador, contraste comprobado en ambos temas.
- Al ser un sitio 100% estático, no hay tiempo de respuesta de servidor/base de datos: el HTML ya viene generado y GitHub Pages lo sirve por CDN.
- **PWA instalable y offline**: `manifest.webmanifest` (nombre, iconos 192/512/maskable, `theme_color`/`background_color` acordes a la paleta) + `sw.js` (workbox) precachean HTML/CSS/JS/fuentes/iconos; las imágenes de contenido futuras se sirven con estrategia `CacheFirst` en vez de ir al precache inicial, para no disparar el peso de la primera visita si algún día hay una galería de fotos pesada.

---

## 9. Despliegue y CI/CD

El pipeline vive en `.github/workflows/deploy.yml` y se dispara en cada `push` a `main` (o manualmente vía `workflow_dispatch`):

1. `actions/checkout` + `actions/setup-node` (**Node 22**, requisito mínimo de Astro 7; Node 20 falla el build).
2. `npm ci` (instalación reproducible a partir de `package-lock.json`).
3. `npm run build` → ejecuta `astro build` **y luego** `node scripts/generate-sw.mjs`.
4. `actions/configure-pages` + `actions/upload-pages-artifact` + `actions/deploy-pages` → publica `dist/` como GitHub Pages.

### Por qué el service worker se genera en un script aparte

`vite-plugin-pwa` (estrategia `generateSW`) engancha su generación del SW al ciclo de vida de un build de Vite normal de una sola pasada. Astro, en cambio, ejecuta **varias pasadas de Vite** internamente al construir un sitio estático (una para los endpoints/páginas, otra para los assets del cliente...), y ese desfase hace que el hook del plugin nunca llegue a disparar el `generateSW` sobre el `dist/` final (se comprobó en este proyecto: el plugin sí generaba `manifest.webmanifest`, pero **no** `sw.js`). La solución robusta, en vez de pelear con el orden de hooks, es dejar que el plugin de Vite solo emita el manifest, y generar el service worker **después**, con una llamada directa a `generateSW()` de `workbox-build` (`scripts/generate-sw.mjs`) apuntando al `dist/` ya completo. Es el mismo enfoque que usaba la comunidad antes de que existiera `@vite-pwa/astro` (que a día de hoy tampoco soporta todavía Astro 7).

Detalles de configuración importantes en `astro.config.mjs`:

- `site` y `base` están fijados a `https://pcresp0.github.io` y `/moriscos-wiki/` (con barra final). Todas las rutas internas se construyen con `import.meta.env.BASE_URL`; **si `base` no termina en `/`, las concatenaciones de rutas se rompen** (bug ya corregido durante el desarrollo).
- El repositorio de GitHub Pages está configurado con `build_type: workflow` (el origen del sitio es el artefacto de Actions, no una rama `gh-pages` ni la carpeta `/docs`).

---

## 10. Desarrollo local

```bash
npm install       # instala dependencias
npm run dev       # servidor de desarrollo con recarga en caliente (astro dev)
npm run build     # genera el sitio estático en dist/ + el service worker (sw.js)
npm run preview   # sirve dist/ localmente para verificar el build de producción
npm run lint      # oxlint sobre todo el proyecto
npm test          # tests unitarios con Vitest (navegación + buscador)
```

Requisitos: **Node.js ≥ 22.12** (Astro 7 no arranca con versiones anteriores).

> En `astro dev` no existe `sw.js` (solo se genera en `npm run build`); el registro del service worker en `BaseLayout.astro` falla en silencio en desarrollo, lo cual es intencional y no requiere ninguna acción.

### Cómo añadir contenido

- **Un capítulo nuevo**: crear `src/content/chapters/12-mi-capitulo.md` con el frontmatter requerido (`number`, `title`, `dek`, `order`, `readingMinutes`) y actualizar el texto "N capítulos" hardcodeado en `src/pages/index.astro` y `src/pages/libro/index.astro` si cambia el total.
- **Un término de glosario**: crear `src/content/glosario/mi-termino.md` con `term`, `category` y `short`; aparecerá automáticamente en `/glosario` y será localizable por `GlossaryTooltips.astro` en los capítulos y por el buscador.
- **Un punto de la Ruta Nocturna**: añadir una entrada al array en `src/data/route.ts`.

---

## 11. Limitaciones conocidas y notas de contenido

- El contenido histórico (capítulos, glosario, biografías) procede de un documento de recopilación aportado por el autor del proyecto; algunos episodios (sucesos de crónica negra, datos de personas identificables) contienen información sensible que conviene revisar antes de una difusión pública amplia.
- El buscador indexa en build time: si se añade contenido nuevo, hay que volver a construir el sitio (`npm run build`) para que aparezca en los resultados.
- No hay backend ni base de datos: cualquier funcionalidad futura de formularios (p. ej. "aportar una fotografía") requeriría un servicio externo (Formspree, un pequeño *serverless function*, etc.), ya que GitHub Pages solo sirve estáticos.

---

## 12. Colaborar

¿Tienes fotografías, documentos o correcciones sobre Moriscos? Escribe a **moriscos.info@gmail.com**.

