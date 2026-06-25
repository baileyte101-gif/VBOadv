import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, PostFrontmatter } from '@/types/blog'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  return posts
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const frontmatter = data as PostFrontmatter

  return {
    ...frontmatter,
    slug: frontmatter.slug || slug,
    content,
  }
}

export function getFeaturedPost(): Post | null {
  const posts = getAllPosts()
  return posts.find((p) => p.featured) ?? posts[0] ?? null
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): Post[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
