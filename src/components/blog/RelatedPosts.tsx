import Link from 'next/link'
import type { Post } from '@/types/blog'
import { formatDate } from '@/lib/blog-utils'

interface RelatedPostsProps {
  posts: Post[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="bg-[#1C1C1C] py-16 px-6 md:px-10 lg:px-24 mt-0">
      <div className="max-w-[900px] mx-auto">
        <span className="section-label">More from VBO</span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="group border border-[#B8962E]/10 p-6 hover:border-[#B8962E]/35 transition-all duration-200"
            >
              <span className="font-mono text-[9px] tracking-[2px] uppercase text-[#B8962E] block mb-3">
                {post.category}
              </span>
              <h4 className="font-headline font-black text-xl uppercase text-[#F2EDE4] leading-tight mb-3 group-hover:text-white transition-colors">
                {post.title}
              </h4>
              <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-[#6B6F73]">
                {formatDate(post.date)} &middot; {post.readTime} read
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
