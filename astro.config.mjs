import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import fs from 'node:fs';
import { SITE } from './src/config/site.config.ts';

// ¿Hay posts publicados? (sin draft: true). Si no, /blog no entra al sitemap.
const BLOG_DIR = './src/content/blog';
const hasPosts = fs.existsSync(BLOG_DIR) && fs.readdirSync(BLOG_DIR)
  .filter((f) => /\.mdx?$/.test(f))
  .some((f) => !/^draft:\s*true/m.test(fs.readFileSync(`${BLOG_DIR}/${f}`, 'utf8')));

export default defineConfig({
  site: SITE.url,
  integrations: [
    sitemap({
      // /equipo solo existe si hay médicos publicados en medicalTeam
      filter: (page) =>
        (SITE.medicalTeam.length > 0 || !page.endsWith('/equipo')) &&
        (hasPosts || !page.endsWith('/blog')),
    }),
    mdx(),
  ],
  trailingSlash: 'never',
  build: { format: 'file' },
});
