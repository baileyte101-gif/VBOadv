import Link from 'next/link'
import type { Post } from '@/types/blog'
import { formatDate } from '@/lib/blog'

interface FeaturedPostProps {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <div className="border border-[#B8962E]/18 overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
      {/* Image Side */}
      <div className="h-[320px] lg:h-[420px] relative overflow-hidden bg-[#1C1C1C]">
        <div className="w-full h-full bg-gradient-to-br from-[#1C1C1C] via-[#24282C] to-[#1a1a18] flex items-center justify-center">
          <span className="font-headline font-black text-[200px] leading-none text-[#B8962E]/[0.08] select-none">
            01
          </span>
        </div>
        {/* Category tag */}
        <span className="absolute top-6 left-6 font-mono text-[10px] tracking-[2px] uppercase text-[#0D0D0D] bg-[#B8962E] px-3.5 py-1.5">
          {post.category}
        </span>
      </div>

      {/* Content Side */}
      <div className="p-12 lg:p-14 flex flex-col justify-center">
        <div className="flex items-center gap-5 mb-5">
          <span className="font-mono text-[10px] tracking-[2px] uppercase text-[#B8962E]">
            {post.category}
          </span>
          <span className="w-[3px] h-[3px] rounded-full bg-[#6B6F73] inline-block" />
          <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-[#6B6F73]">
            {formatDate(post.date)}
          </span>
          <span className="w-[3px] h-[3px] rounded-full bg-[#6B6F73] inline-block" />
          <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-[#6B6F73]">
            {post.readTime} read
          </span>
        </div>

        <h2 className="font-headline font-black text-[42px] md:text-[52px] leading-none uppercase text-[#F2EDE4] mb-5">
          {post.title}
        </h2>

        <p className="font-body text-[17px] leading-[26px] text-[#6B6F73] mb-8 max-w-[480px]">
          {post.excerpt}
        </p>

        <Link
          href={`/insights/${post.slug}`}
          className="group inline-flex items-center gap-3 font-mono text-[11px] tracking-[2px] uppercase text-[#F2EDE4] border-b border-[#B8962E] pb-1 self-start hover:text-[#B8962E] transition-colors"
        >
          Read Article
          <span className="text-sm group-hover:translate-x-1 transition-transform inline-block">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  )
}
