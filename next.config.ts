import type { NextConfig } from "next";

const ghPagesBasePath = process.env.GH_PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: ghPagesBasePath || undefined,
  assetPrefix: ghPagesBasePath || undefined,
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
