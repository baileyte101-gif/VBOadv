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
      // they redirect permanently (308) rather than 404ing. Ranking signal
      // transfers through the redirect. Do not remove these. Since 2026-10-22
      // the second one lands on /insights, as its successor does below.
      {
        source: '/insights/what-a-marketing-agency-actually-does',
        destination: '/insights/what-a-marketing-consultancy-actually-does',
        permanent: true,
      },
      {
        source: '/insights/small-founder-led-team-outruns-big-agency',
        destination: '/insights',
        permanent: true,
      },
      // 2026-10-22: pages no longer on the site. Permanent (308), so search
      // engines drop them and follow on to the destination.
      {
        source: '/insights/small-founder-led-team-outruns-big-firm',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/fractional-cmo',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ai-enabled-marketing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ai-enabled-marketing/:path*',
        destination: '/',
        permanent: true,
      },
      // 2026-10-22: the business card page is no longer on the site. Temporary
      // (307): printed QR codes point at /tim, and they land on the homepage.
      {
        source: '/tim',
        destination: '/',
        permanent: false,
      },
      {
        source: '/tim/:path*',
        destination: '/',
        permanent: false,
      },
      // 2026-10-05: Work renamed to Case Studies at Tim's request, index and
      // every case study under it. /work went live and indexable on
      // 2026-10-02 and is linked from social, so both the index and its
      // children redirect permanently (308) rather than 404ing. Do not remove.
      {
        source: '/work',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/work/:slug*',
        destination: '/case-studies/:slug*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
