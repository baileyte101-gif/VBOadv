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
  // The search-snippet description (the page's meta description) when it
  // differs from the on-page excerpt. Falls back to `excerpt` when absent,
  // which is how every post before 2026-10-15 behaves.
  metaDescription?: string
  // Last meaningful change, YYYY-MM-DD. Drives sitemap lastmod so a post that
  // was edited after publication tells crawlers to recrawl. Absent on posts
  // that have not changed since they went live; `date` is used then.
  updated?: string
  // The search title (the <title> tag only, before " | VBO Insights") when the
  // headline is too long for Google's display. The H1, the social cards, the
  // Article headline and the /insights card keep `title`. Vega, 2026-10-22.
  seoTitle?: string
  // A case study this post is the practice of: its short slug under
  // /case-studies (e.g. "sir-galloway"). Renders that case study's card under
  // the post, labelled "See it in practice". Vega, 2026-10-22.
  caseStudy?: string
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
