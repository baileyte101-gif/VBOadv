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
      // 2026-08-31: "agency" removed from the site's language, so both blog
      // slugs changed. These two URLs are indexed and carry external links, so
      // they redirect permanently (308) to the new slugs rather than 404ing.
      // Ranking signal transfers through the redirect. Do not remove these.
      {
        source: '/insights/what-a-marketing-agency-actually-does',
        destination: '/insights/what-a-marketing-consultancy-actually-does',
        permanent: true,
      },
      {
        source: '/insights/small-founder-led-team-outruns-big-agency',
        destination: '/insights/small-founder-led-team-outruns-big-firm',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
