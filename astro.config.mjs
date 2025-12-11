// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import keystatic from "@keystatic/astro";
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://xeontek-web.vercel.app/',
  prefetch: true,
  trailingSlash: 'never',
  
  env: {
    schema: {
      WEB3FORM_API_KEY: envField.string({ context: 'server', access: 'secret' }),
    }
  },
  

  vite: {
    plugins: [tailwindcss()]
  },
  server: {
    port: 3000
  },

  output: 'server',
  adapter: vercel(),
  integrations: [react(), ...(process.env.SKIP_KEYSTATIC ? [] : [keystatic()]), sitemap()]
});