import { statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getCollection } from 'astro:content';
import { SITE_URL } from '../site';

const baseUrl = SITE_URL;

function getLastModified(sourceFile: string) {
  try {
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const filePath = resolve(currentDir, sourceFile);
    return statSync(filePath)
      .mtime.toISOString()
      .split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

export async function GET() {
  const posts = (await getCollection('blog'))
    .filter((post) => post.data.status === 'published');

  const urls = [
    { path: '/', sourceFile: './index.astro' },
    ...posts.map((post) => ({
      path: `/${post.id}/`,
      lastmod: post.data.date.toISOString().split('T')[0],
    })),
  ];

  const body = urls
    .map(({ path, sourceFile, lastmod }) => {
      const mod = lastmod || getLastModified(sourceFile!);
      return `  <url><loc>${baseUrl}${path}</loc><lastmod>${mod}</lastmod></url>`;
    })
    .join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
