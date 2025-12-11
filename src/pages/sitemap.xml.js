export async function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
  <loc>https://www.xeontek.com</loc>
  </url>
  <url>
  <loc>https://www.xeontek.com/about</loc>
  </url>
  <url>
  <loc>https://www.xeontek.com/careers</loc>
  </url>
  <url>
  <loc>https://www.xeontek.com/contact</loc>
  </url>
  <url>
  <loc>https://www.xeontek.com/privacy</loc>
  </url>
  <url>
  <loc>https://www.xeontek.com/terms</loc>
  </url>
  <url>
  <loc>https://www.xeontek.com/whitepaper</loc>
  </url>
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}