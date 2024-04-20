/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["src", "../backend/src"],
  env: {
    BACKEND_URL_LOCAL: process.env.BACKEND_URL_LOCAL,
  },
};

export default nextConfig;
