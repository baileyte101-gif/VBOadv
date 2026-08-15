/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // The bare /professional-services path now has a real destination: the
  // industries hub at /industries, built 2026-08-15. It previously 308'd to the
  // homepage because no hub existed.
  //
  // The four vertical pages under /professional-services/{slug} are unaffected.
  // This rule matches the exact path only, no children, and those four keep
  // their exact current addresses because they are indexed and carrying
  // impressions. No URL migrations in this build.
  async redirects() {
    return [
      {
        source: '/professional-services',
        destination: '/industries',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
