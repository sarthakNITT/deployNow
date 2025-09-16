/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [],
    },
    transpilePackages: ["@repo/db"],
  }
  
  module.exports = nextConfig