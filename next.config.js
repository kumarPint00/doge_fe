/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true ,
     missingSuspenseWithCSRBailout: false,
      serverActions: true,
  },
 images: { unoptimized: true },
  typescript: {
    ignoreBuildErrors: true,
  },
};
module.exports = nextConfig;
