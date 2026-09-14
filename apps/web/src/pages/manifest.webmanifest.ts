export function GET() {
  return new Response(JSON.stringify({
    name: 'Ice Benitez | Product Engineer',
    short_name: 'Ice Benitez',
    description: 'Portfolio of Ice Benitez, a product engineer.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  }), {
    headers: { 'Content-Type': 'application/manifest+json' },
  });
}
