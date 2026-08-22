export function GET() {
  return new Response('User-agent: *\nAllow: /\nDisallow: /private/\n\nSitemap: https://icebenitez.com/sitemap.xml\n', {
    headers: { 'Content-Type': 'text/plain' },
  });
}
