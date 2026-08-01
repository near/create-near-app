/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['reown'],
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
