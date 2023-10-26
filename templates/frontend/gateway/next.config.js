/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  reactStrictMode: true,
  redirects: async () => {
    return [
    ];
  },
  env: {
    // adding CONTRACT_NAME as a public env variable
    NEXT_PUBLIC_CONTRACT_NAME: process.env.CONTRACT_NAME,
  }
};

module.exports = nextConfig;