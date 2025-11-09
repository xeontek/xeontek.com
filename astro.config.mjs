// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://xeontek-web.vercel.app/',
  prefetch: true,
  trailingSlash: 'never',

  vite: {
    plugins: [tailwindcss()]
  },

  output: 'server',
  adapter: vercel(),
  integrations: [react()]
});