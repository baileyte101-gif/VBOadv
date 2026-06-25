import Link from 'next/link'
import type { Post } from '@/types/blog'
import { formatDate } from '@/lib/blog-utils'

const GRADIENT_CLASSES = [
  'from-[#1C1C1C] to-[#2a2520]',
  'from-[#1a1a18] to-[#252525]',
  'from-[#20201e] to-[#1C1C1C]',
  'from-[#1C1C1C] to-[#282420]',
  'from-[#1e1e1c] to-[#242424]',
  'from-[#221e1a] to-[#1C1C1C]',
]

interface PostCardProps {
  post: Post
  index: number
}

export default function PostCard({ post, index }: PostCardProps) {
  const gradientClass = GRADIENT_CLASSES[index % GRADIENT_CLASSES.length]
  const ghostNum = String(index + 1).padStart(2, '0')

  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group bg-[#0D0D0D] border border-[#B8962E]/10 flex flex-col transition-all duration-200 hover:border-[#B8962E]/40 hover:-translate-y-0.5"
    >
      {/* Card Image */}
      <div className="h-[200px] relative overflow-hidden">
        <div
          className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}
        >
          <span className="font-headline font-black text-[120px] leading-none text-[#B8962E]/[0.07] select-none">
            {ghostNum}
          </span>
        </div>
        {/* Category Tag */}
        <span className="absolute top-4 left-4 font-mono text-[9px] tracking-[2px] uppercase text-[#0D0D0D] bg-[#B8962E] px-[10px] py-1">
          {post.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-7 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3.5">
          <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-[#6B6F73]">
            {formatDate(post.date)}
          </span>
          <span className="w-[3px] h-[3px] rounded-full bg-[#6B6F73] inline-block" />
          <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-[#6B6F73]">
            {post.readTime} read
          </span>
        </div>

        <h3 className="font-headline font-black text-[26px] leading-[1.05] uppercase text-[#F2EDE4] mb-3 group-hover:text-white transition-colors">
          {post.title}
        </h3>

        <p className="font-body text-sm leading-[22px] text-[#6B6F73] flex-1 mb-5">
          {post.excerpt}
        </p>

        <span className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[1.8px] uppercase text-[#F2EDE4] border-b border-[#B8962E] pb-1 self-start group-hover:text-[#B8962E] transition-colors">
          Read Article
          <span className="text-sm group-hover:translate-x-1 transition-transform inline-block">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  )
}
