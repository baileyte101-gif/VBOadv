import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, PostFrontmatter } from '@/types/blog'
export { formatDate } from '@/lib/blog-utils'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

// Read a post by its source filename (without the .mdx extension).
function readPostFile(fileSlug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${fileSlug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const frontmatter = data as PostFrontmatter

  return {
    ...frontmatter,
    slug: frontmatter.slug || fileSlug,
    content,
  }
}

export function getAllPosts(): Post[] {
  const posts = getAllPostSlugs()
    .map((fileSlug) => readPostFile(fileSlug))
    .filter((post): post is Post => post !== null)
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  return posts
}

// Resolve by the public (frontmatter) slug first — the URL the site links to,
// the sitemap lists, and the canonical points at — then fall back to the raw
// filename so any dated-path URL still resolves instead of 404ing.
export function getPostBySlug(slug: string): Post | null {
  const byPublicSlug = getAllPosts().find((post) => post.slug === slug)
  if (byPublicSlug) return byPublicSlug

  // Fall back to the raw filename, but never serve a draft on the public site.
  const byFile = readPostFile(slug)
  if (byFile && !byFile.draft) return byFile
  return null
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

