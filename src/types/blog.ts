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
  draft?: boolean
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
