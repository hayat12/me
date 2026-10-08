// Static export for GitHub Pages (free plan serves static files only).
// BASE_PATH is set by the deploy workflow ("/me" for https://hayat12.github.io/me/, "" for a user site / custom domain).
const basePath = process.env.BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};
export default nextConfig;
