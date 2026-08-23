import { statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const baseUrl = 'https://icebenitez.com';

function getLastModified(sourceFile: string) {
  try {
    // Get the directory of this file (src/pages)
    const currentDir = dirname(fileURLToPath(import.meta.url));
    // Resolve the source file relative to this directory
    const filePath = resolve(currentDir, sourceFile);
    return statSync(filePath)
      .mtime.toISOString()
      .split('T')[0];
  } catch {
    // Fallback to current date if file stat fails
    return new Date().toISOString().split('T')[0];
  }
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
