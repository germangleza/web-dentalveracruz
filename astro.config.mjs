import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { SITE } from './src/config/site.config.ts';

export default defineConfig({
  site: SITE.url,
  integrations: [
    sitemap({
      // /equipo solo existe si hay médicos publicados en medicalTeam
      filter: (page) => SITE.medicalTeam.length > 0 || !page.endsWith('/equipo'),
    }),
    mdx(),
  ],
  trailingSlash: 'never',
  build: { format: 'file' },
});
