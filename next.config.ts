import type { NextConfig } from "next";

// Security response headers applied to every route.
//
// We intentionally do NOT ship a full Content-Security-Policy yet: the app
// relies on Next.js inline bootstrap scripts, an inline `style` on <html> for
// theme colors (src/app/layout.tsx), Tailwind/inline styles, next/image, and
// Leaflet which loads CSS/JS/images from external hosts (unpkg.com,
// cdnjs.cloudflare.com, *.tile.openstreetmap.org) plus fetches from
// nominatim.openstreetmap.org. A naive `script-src 'self'` / `style-src 'self'`
// would break those pages. The real stored-XSS fix is sanitize-html applied at
// write+render time (see src/lib/sanitize.ts), so these headers are
// defense-in-depth.
//
// TODO: tighten script-src with nonces and add a full CSP once the inline
// bootstrap/theme scripts and Leaflet's external origins are enumerated and a
// nonce strategy is wired through the layout.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Scoped CSP directives that are safe regardless of inline scripts/styles:
  // block plugins/embeds (object-src) and restrict <base href> and framing.
  {
    key: "Content-Security-Policy",
    value: "object-src 'none'; base-uri 'self'; frame-ancestors 'self'",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
