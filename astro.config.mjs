import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = 'https://pcresp0.github.io';
const base = '/moriscos-wiki/';

export default defineConfig({
  site: `${site}${base}`,
  base,
  trailingSlash: 'ignore',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
