/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // There is no Professional Services hub page and we are not building one.
  // The bare /professional-services URL used to 404; send it to the homepage
  // instead. Permanent (308) so search engines stop treating it as its own
  // destination. The four vertical pages under /professional-services/{slug}
  // are unaffected: this rule matches the exact path only, no children.
  async redirects() {
    return [
      {
        source: '/professional-services',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
