# Moriscos · Memoria & Territorio

Plataforma web documental sobre la historia, geografía, etnografía y memoria viva de **Moriscos** (Salamanca) y el entorno de **La Flecha**.

Construido con [Astro](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com), React (islas interactivas), Leaflet y Fuse.js.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```

## Estructura

- `src/content/` — Capítulos del libro, glosario y personajes (Markdown + Content Collections).
- `src/components/` — Componentes de UI (Astro + islas React).
- `src/data/` — Datos estructurados (ruta nocturna, contadores, navegación).
- `src/pages/` — Rutas del sitio.

## Despliegue

El sitio se despliega automáticamente en **GitHub Pages** mediante GitHub Actions (`.github/workflows/deploy.yml`) en cada push a `main`.

URL de producción: https://pcresp0.github.io/moriscos-wiki/

## Colaborar

¿Tienes fotografías, documentos o correcciones sobre Moriscos? Escribe a moriscos.info@gmail.com.
