/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // If your repository is at username.github.io/my-retell-landing
  basePath: '/my-retell-landing',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // This ensures that assets are served from the correct path
  assetPrefix: '/my-retell-landing',
}

module.exports = nextConfig