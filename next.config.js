/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/my-retell-landing',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/my-retell-landing',
  trailingSlash: true,
  // Add any static files from public directly
  distDir: 'out',
}

module.exports = nextConfig