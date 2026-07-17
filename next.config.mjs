import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray package-lock.json exists in the home directory; pin the tracing
  // root to this project so deployment file tracing is correct.
  outputFileTracingRoot: projectRoot,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // The shipped thumbnails are first-party SVG placeholders. We sandbox them
    // (no scripts, attachment disposition) so serving SVG stays safe.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      { source: "/projects/billzap", destination: "/billzap", permanent: true },
      { source: "/projects/melody-flow", destination: "/melody-flow", permanent: true },
      {
        source: "/projects/chrome-extensions",
        destination: "/image-size-inspector",
        permanent: true,
      },
      {
        source: "/projects/jp-fitness",
        destination: "/work/jp-fitness",
        permanent: true,
      },
      { source: "/projects", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
