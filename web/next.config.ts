import type { NextConfig } from "next";

const CANONICAL_HOST = "unbit.app";

const nextConfig: NextConfig = {
  // Inlined at build time; used as the sitemap lastModified for site changes.
  env: { BUILD_TIME: new Date().toISOString() },
  async redirects() {
    // Production only: send every *.vercel.app host (e.g. unbit-mu.vercel.app) to the canonical
    // domain with a permanent 308. Preview deployments keep working on their own URLs.
    if (process.env.VERCEL_ENV !== "production") return [];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<sub>.+)\\.vercel\\.app" }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
