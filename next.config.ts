import type { NextConfig } from "next";

const isExport = process.env.NEXT_EXPORT === "true";
const ghPagesBasePath = process.env.GH_PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: isExport ? "export" : "standalone",
  basePath: ghPagesBasePath || undefined,
  assetPrefix: ghPagesBasePath || undefined,
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
