/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable the dev tools overlay completely
  devIndicators: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Temporarily ignore TypeScript errors during build for deployment
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig