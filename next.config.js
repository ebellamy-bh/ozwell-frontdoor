/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  // Fixed BUILD_ID so repeated builds produce byte-identical output
  generateBuildId: () => 'build',

  // Static HTML export for static hosting (Cloudflare Pages)
  output: isDev ? undefined : 'export',

  // Trailing slash for consistent URLs — matches the WordPress URL structure
  trailingSlash: true,

  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],

  // Image optimization must be disabled for static export
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
