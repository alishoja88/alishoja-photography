/**@type {import('next').NextConfig} */
const nextConfig = {
  // Keep standalone for Docker optimization but remove env bundling
  output: 'standalone',
  // Remove env bundling - let Next.js read from process.env at runtime
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;