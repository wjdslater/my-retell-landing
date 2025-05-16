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
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during build
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
