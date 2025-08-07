/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: { unoptimized: true },
  typescript: {
    ignoreBuildErrors: true,
  },
};
module.exports = nextConfig;
