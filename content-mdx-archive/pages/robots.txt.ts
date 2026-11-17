import { SITE_URL } from '../site';

export function GET() {
  return new Response(`User-agent: *\nAllow: /\nDisallow: /private/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
