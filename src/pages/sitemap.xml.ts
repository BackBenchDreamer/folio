import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { siteConfig } from '@/config/site.config';

export async function GET(_context: APIContext) {
  const site = siteConfig.siteUrl;

  // Static pages
  const staticPages = [
    '',
    '/projects',
    '/blog',
    '/art',
  ];

  // Blog posts
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const blogPages = posts.map(p => `/blog/${p.slug}`);

  const allPaths = [...staticPages, ...blogPages];

  const urls = allPaths.map(path => {
    const loc = `${site}${path}/`.replace(/\/\/$/, '/');
    return `  <url><loc>${loc}</loc></url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
