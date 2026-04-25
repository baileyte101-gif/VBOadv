/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      // Professional Services landing pages — proxied from the dedicated
      // landing-page Vercel project so URLs stay under vboadv.com.
      // Add more verticals here as they go live.
      {
        source: '/professional-services/law-firms',
        destination:
          'https://professional-services-landing.vercel.app/professional-services/law-firms',
      },
      {
        source: '/professional-services/law-firms/:path*',
        destination:
          'https://professional-services-landing.vercel.app/professional-services/law-firms/:path*',
      },
    ]
  },
}

module.exports = nextConfig
