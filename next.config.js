/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  devIndicators: {
    buildActivity: false
  },
  poweredByHeader: false,
};

module.exports = nextConfig; 