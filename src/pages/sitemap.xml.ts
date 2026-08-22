import { statSync } from 'node:fs';
import { resolve } from 'node:path';

const baseUrl = 'https://icebenitez.com';

function getLastModified(sourceFile: string) {
  return statSync(resolve(process.cwd(), 'src/pages', sourceFile))
    .mtime.toISOString()
    .split('T')[0];
}

export function GET() {
  const urls = [
    { path: '/', sourceFile: './index.astro' },
    { path: '/privacy-policy/', sourceFile: './privacy-policy/index.astro' },
    { path: '/terms-of-service/', sourceFile: './terms-of-service/index.astro' },
  ];
  const body = urls
    .map(({ path, sourceFile }) => `  <url><loc>${baseUrl}${path}</loc><lastmod>${getLastModified(sourceFile)}</lastmod></url>`)
    .join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
