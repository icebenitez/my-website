const baseUrl = 'https://icebenitez.com';

export function GET() {
  const urls = [
    { path: '/', lastModified: '2025-08-24' },
    { path: '/privacy-policy/', lastModified: '2025-04-22' },
    { path: '/terms-of-service/', lastModified: '2025-04-22' },
  ];
  const body = urls
    .map(({ path, lastModified }) => `  <url><loc>${baseUrl}${path}</loc><lastmod>${lastModified}</lastmod></url>`)
    .join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
