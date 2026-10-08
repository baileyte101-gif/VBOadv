import type { MetadataRoute } from 'next'

// The icons Android and Chrome use when someone saves vboadv.com to a home
// screen: the bee from the 2026-10-08 logo pack (web-icons/), wired the way
// Jules's pack README asks. "browser" keeps the site a normal web page; this
// file only supplies the name and the icons.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VBO Advertising',
    short_name: 'VBO',
    start_url: '/',
    display: 'browser',
    background_color: '#0D0D0D',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
