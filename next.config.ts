import type { NextConfig } from "next";

const blogSlugs = [
  "why-every-business-needs-modern-website",
  "react-vs-nextjs",
  "benefits-custom-website-development",
  "how-ai-changing-web-development",
  "seo-best-practices-business-websites",
  "saas-development-guide",
  "lead-generation-website-tips",
  "ssg-vs-ssr-isr-csr-nextjs",
];

const geoSlugs = [
  "web-developer-usa",
  "software-developer-canada",
  "saas-developer-australia",
  "website-developer-uk",
  "react-developer-germany",
  "ai-website-developer-switzerland",
  "seo-website-developer-pakistan",
  "web-developer-uae",
  "web-developer-saudi-arabia",
  "web-developer-netherlands",
];

const corePages = ["about", "services", "projects", "contact"];

const redirects = [
  { source: "/index.html", destination: "/", permanent: true },
  ...corePages.map((page) => ({
    source: `/${page}.html`,
    destination: `/${page}`,
    permanent: true,
  })),
  ...blogSlugs.map((slug) => ({
    source: `/blog/${slug}.html`,
    destination: `/blog/${slug}`,
    permanent: true,
  })),
  { source: "/blog/index.html", destination: "/blog", permanent: true },
  ...geoSlugs.map((slug) => ({
    source: `/geo/${slug}.html`,
    destination: `/geo/${slug}`,
    permanent: true,
  })),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: { exclude: ["error", "warn"] },
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 600, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return redirects;
  },
};

export default nextConfig;
