import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, PostFrontmatter } from '@/types/blog'
export { formatDate } from '@/lib/blog-utils'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

// Preview gate for draft posts, the same shape as the case studies'
// *_SHOWN gates in src/lib/work.ts: a preview deployment or a local build
// renders draft posts at their real URLs (and lists them on /insights) so
// they can be reviewed, and a production build never does. Publishing a
// post is one edit in its own MDX file (`draft: false`, plus the real
// date), nowhere else. Until then a production build serves 404 for the
// post, and the sitemap, the production /insights index and getAllPosts()
// never see it. llms.txt is hand-curated and unaffected either way.
const DRAFTS_SHOWN = process.env.VERCEL_ENV !== 'production'

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

// Published posts only. The sitemap, the featured pick and related posts all
// run on this, so a draft can never leak into any of them, on any build.
export function getAllPosts(): Post[] {
  const posts = getAllPostSlugs()
    .map((fileSlug) => readPostFile(fileSlug))
    .filter((post): post is Post => post !== null)
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  return posts
}

// What this build may RENDER: published posts, plus drafts on previews and
// local builds only (DRAFTS_SHOWN above). The /insights index listing and the
// post routes run on this so draft previews are reachable; in a production
// build it is exactly getAllPosts().
export function getVisiblePosts(): Post[] {
  if (!DRAFTS_SHOWN) return getAllPosts()
  return getAllPostSlugs()
    .map((fileSlug) => readPostFile(fileSlug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

// Resolve by the public (frontmatter) slug first — the URL the site links to,
// the sitemap lists, and the canonical points at — then fall back to the raw
// filename so any dated-path URL still resolves instead of 404ing.
export function getPostBySlug(slug: string): Post | null {
  const byPublicSlug = getVisiblePosts().find((post) => post.slug === slug)
  if (byPublicSlug) return byPublicSlug

  // Fall back to the raw filename, but never serve a draft on the public site
  // (previews and local builds may, per DRAFTS_SHOWN).
  const byFile = readPostFile(slug)
  if (byFile && (!byFile.draft || DRAFTS_SHOWN)) return byFile
  return null
}

export function getFeaturedPost(): Post | null {
  const posts = getAllPosts()
  return posts.find((p) => p.featured) ?? posts[0] ?? null
}

// Same category first, newest first, exactly as before; then, if that leaves
// room (a category with no siblings, like Culture or Performance today), the
// newest other published posts fill up to `limit`. Vega, 2026-10-22: two of
// the 10/22 posts rendered no related posts at all.
export function getRelatedPosts(currentSlug: string, category: string, limit = 3): Post[] {
  const others = getAllPosts().filter((p) => p.slug !== currentSlug)
  const same = others.filter((p) => p.category === category)
  const rest = others.filter((p) => p.category !== category)
  return [...same, ...rest].slice(0, limit)
}

