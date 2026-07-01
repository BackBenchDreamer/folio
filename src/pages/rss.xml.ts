import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/config/site.config';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // Gated by feature flag — return 404 if disabled
  if (!siteConfig.features.rss) {
    return new Response(null, { status: 404 });
  }

  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: `${siteConfig.displayName} — Writing`,
    description: siteConfig.seo.description,
    site: context.site ?? siteConfig.siteUrl,
    items: sorted.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: '/rss/styles.xsl',
  });
}
