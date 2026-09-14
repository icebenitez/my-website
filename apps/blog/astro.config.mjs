// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://blog.icebenitez.com',
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
