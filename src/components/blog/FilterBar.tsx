'use client'

import { CATEGORIES, type Category } from '@/types/blog'

interface FilterBarProps {
  active: Category
  onSelect: (cat: Category) => void
}

export default function FilterBar({ active, onSelect }: FilterBarProps) {
  return (
    <div className="bg-[#1C1C1C] border-t border-[#B8962E]/12 border-b border-b-[#B8962E]/12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-24">
        <div className="flex items-center overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`font-mono text-[11px] tracking-[2px] uppercase px-7 py-5 border-b-2 whitespace-nowrap transition-all duration-200 ${
                active === cat
                  ? 'text-[#F2EDE4] border-[#B8962E]'
                  : 'text-[#8A8E92] border-transparent hover:text-[#F2EDE4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
