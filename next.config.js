/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/my-retell-landing',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/my-retell-landing',
  trailingSlash: true,
  distDir: 'out',
  // Ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
