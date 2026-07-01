import type { APIContext } from 'astro';

export async function GET(_context: APIContext) {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://jeyv.in/sitemap.xml
`,
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    }
  );
}
