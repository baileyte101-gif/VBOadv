'use client'

import { useState } from 'react'
import type { Post, Category } from '@/types/blog'
import FilterBar from './FilterBar'
import FeaturedPost from './FeaturedPost'
import PostCard from './PostCard'

interface InsightsIndexProps {
  posts: Post[]
  featured: Post | null
}

export default function InsightsIndex({ posts, featured }: InsightsIndexProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  // Pre-launch state: no published posts yet. Show a "Coming Soon" block in
  // place of the filter bar + grid. The first published post replaces this
  // automatically.
  if (posts.length === 0) {
    return (
      <section className="bg-[#1C1C1C] border-t border-[#B8962E]/12 py-28 md:py-40 px-6 md:px-10 lg:px-24 text-center">
        <div className="max-w-[640px] mx-auto">
          <span className="font-mono text-[10px] tracking-[2.5px] uppercase text-[#B8962E] block mb-6">
            Coming Soon
          </span>
          <h2 className="font-headline font-black text-[40px] md:text-[56px] leading-[0.95] uppercase text-[#F2EDE4] mb-6">
            Our First Insight Is Coming Soon.
          </h2>
          <p className="font-body text-[17px] leading-[27px] text-[#6B6F73] max-w-[460px] mx-auto">
            We&apos;re putting the finishing touches on the first pieces. Check back shortly.
          </p>
        </div>
      </section>
    )
  }

  const gridPosts = posts.filter((p) => p.slug !== featured?.slug)

  const filteredGrid =
    activeCategory === 'All'
      ? gridPosts
      : gridPosts.filter((p) => p.category === activeCategory)

  const filteredFeatured =
    activeCategory === 'All' || activeCategory === featured?.category
      ? featured
      : null

  return (
    <>
      {/* Filter Bar */}
      <FilterBar active={activeCategory} onSelect={setActiveCategory} />

      {/* Featured Post */}
      {filteredFeatured && (
        <section className="bg-[#0D0D0D] py-20 px-6 md:px-10 lg:px-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-10">
              <span className="section-label mb-0">Featured</span>
            </div>
            <FeaturedPost post={filteredFeatured} />
          </div>
        </section>
      )}

      {/* Post Grid */}
      {filteredGrid.length > 0 && (
        <section className="bg-[#1C1C1C] py-20 px-6 md:px-10 lg:px-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-baseline justify-between mb-12">
              <h2 className="font-headline font-black text-[36px] uppercase text-[#F2EDE4]">
                {activeCategory === 'All' ? 'All Posts' : activeCategory}
              </h2>
              <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-[#6B6F73]">
                {filteredGrid.length} {filteredGrid.length === 1 ? 'Article' : 'Articles'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGrid.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {filteredGrid.length === 0 && !filteredFeatured && (
        <section className="bg-[#1C1C1C] py-32 px-6 text-center">
          <p className="font-mono text-[11px] tracking-[2px] uppercase text-[#6B6F73]">
            No posts in this category yet.
          </p>
        </section>
      )}
    </>
  )
}
