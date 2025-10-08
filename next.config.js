/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/Bhaveshmeghwal21.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Bhaveshmeghwal21.github.io/' : '',
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true,
}

module.exports = nextConfig
