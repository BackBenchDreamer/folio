import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel/static';
import remarkReadingTime from './src/utils/remark-reading-time.mjs';

// Note: Sitemap is generated via src/pages/sitemap.xml.ts endpoint
// @astrojs/sitemap v3 is incompatible with @astrojs/vercel/static in Astro 4

export default defineConfig({
  site: 'https://jeyv.in',
  output: 'static',
  adapter: vercel(),
  integrations: [
    mdx({
      remarkPlugins: [remarkReadingTime],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
