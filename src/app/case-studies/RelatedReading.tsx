import { getAllPosts } from '@/lib/blog'
import { RELATED_READING_LABEL } from '@/lib/work'

// "Related reading" at the end of a case study (Vega, 2026-10-22, item 1b):
// the blog posts this case study is the proof for, by their published titles,
// each linking its post. Set per case study in src/lib/work.ts. Only published
// posts render, so a draft or a retired slug can never show here.
export default function RelatedReading({ slugs }: { slugs: string[] }) {
  const posts = getAllPosts()
  const items = slugs
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
  if (items.length === 0) return null

  return (
    <section className="vw-sec ground-plain vw-reading" aria-labelledby="vw-reading-title">
      <div className="vw-wrap">
        <h2 id="vw-reading-title" className="vw-label">
          {RELATED_READING_LABEL}
        </h2>
        <ul className="vw-reading-list">
          {items.map((post) => (
            <li key={post.slug}>
              <a href={`/insights/${post.slug}`}>
                <span>{post.title}</span>
                <span className="vw-reading-more" aria-hidden>
                  &rarr;
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
