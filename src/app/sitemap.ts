import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const BASE_URL = 'https://vboadv.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...postEntries,
  ]
}
