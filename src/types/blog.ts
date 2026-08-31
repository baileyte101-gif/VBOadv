export interface PostFrontmatter {
  title: string
  slug: string
  date: string
  category: string
  readTime: string
  excerpt: string
  author: string
  featured?: boolean
  image?: string
  // Alt text for the hero image. Falls back to the title when absent, which
  // duplicates the H1 sitting directly above it. Set this on new posts.
  imageAlt?: string
  draft?: boolean
  // Last meaningful change, YYYY-MM-DD. Drives sitemap lastmod so a post that
  // was edited after publication tells crawlers to recrawl. Absent on posts
  // that have not changed since they went live; `date` is used then.
  updated?: string
}

export interface Post extends PostFrontmatter {
  content: string
}

export type Category =
  | 'All'
  | 'Strategy'
  | 'Creative'
  | 'Performance'
  | 'Brand'
  | 'Culture'

export interface Author {
  name: string
  title: string
  bio: string
}

export const AUTHORS: Record<string, Author> = {
  'Tim Bailey': {
    name: 'Tim Bailey',
    title: 'Founder, VBO',
    bio: 'Tim Bailey founded VBO after 10+ years helping brands from Fortune 500 companies to growing independents build marketing systems that actually work. He lives in Coconut Grove, Miami.',
  },
}

export const CATEGORIES: Category[] = [
  'All',
  'Strategy',
  'Creative',
  'Performance',
  'Brand',
  'Culture',
]
