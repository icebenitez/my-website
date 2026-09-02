import { statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getCollection } from 'astro:content';

const baseUrl = 'https://icebenitez.com';

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
  const projects = (await getCollection('projects'))
    .filter((p) => p.data.status === 'published');
  const posts = (await getCollection('blog'))
    .filter((post) => post.data.status === 'published');

  const urls = [
    { path: '/', sourceFile: './index.astro' },
    { path: '/services/', sourceFile: './services/index.astro' },
    { path: '/projects/', sourceFile: './projects/index.astro' },
    { path: '/blog/', sourceFile: './blog/index.astro' },
    { path: '/contact/', sourceFile: './contact/index.astro' },
    { path: '/privacy-policy/', sourceFile: './privacy-policy/index.astro' },
    { path: '/terms-of-service/', sourceFile: './terms-of-service/index.astro' },
    ...projects.map((p) => ({
      path: `/projects/${p.id}/`,
      lastmod: p.data.date.toISOString().split('T')[0],
    })),
    ...posts.map((post) => ({
      path: `/blog/${post.id}/`,
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
