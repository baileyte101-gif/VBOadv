import type { Author } from '@/types/blog'

interface AuthorBioProps {
  author: Author
}

export default function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="border-t border-[#B8962E]/15 pt-10 mt-10">
      <div className="flex items-start gap-6">
        {/* Avatar placeholder */}
        <div className="w-14 h-14 flex-shrink-0 bg-[#1C1C1C] border border-[#B8962E]/20 flex items-center justify-center">
          <span className="font-headline font-black text-[22px] text-[#B8962E]">
            {author.name.charAt(0)}
          </span>
        </div>
        <div>
          <span className="font-mono text-[10px] tracking-[2px] uppercase text-[#B8962E] block mb-1">
            About the Author
          </span>
          <p className="font-headline font-black text-xl uppercase text-[#F2EDE4] mb-2">
            {author.name}
          </p>
          <p className="font-mono text-[10px] tracking-[1.5px] uppercase text-[#8A8E92] mb-3">
            {author.title}
          </p>
          <p className="font-body text-sm leading-[22px] text-[#8A8E92]">
            {author.bio}
          </p>
        </div>
      </div>
    </div>
  )
}
