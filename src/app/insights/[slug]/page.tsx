import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import CTASection from '@/components/CTASection'
import ReadingProgress from '@/components/blog/ReadingProgress'
import AuthorBio from '@/components/blog/AuthorBio'
import RelatedPosts from '@/components/blog/RelatedPosts'
import { getAllPosts, getPostBySlug, getRelatedPosts, formatDate } from '@/lib/blog'
import { AUTHORS } from '@/types/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: `${post.title} | VBO Insights`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `https://www.vboadv.com/insights/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://www.vboadv.com/insights/${post.slug}`,
    },
  }
}

function ArticleSchema({ post }: { post: NonNullable<ReturnType<typeof getPostBySlug>> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'VBO Advertising',
      url: 'https://www.vboadv.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.vboadv.com/images/logo-transparent.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.vboadv.com/insights/${post.slug}`,
    },
    url: `https://www.vboadv.com/insights/${post.slug}`,
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// MDX component overrides — styled to match VBO design system
const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className="font-headline font-black text-[32px] md:text-[38px] uppercase text-[#F2EDE4] mt-14 mb-6 leading-tight"
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      className="font-headline font-black text-[24px] uppercase text-[#F2EDE4] mt-10 mb-4 leading-tight"
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className="font-body text-[17px] leading-[28px] text-[#C8C4BB] mb-6"
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="mb-6 space-y-2 pl-0 list-none" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      {...props}
      className="font-body text-[17px] leading-[28px] text-[#C8C4BB] pl-6 relative before:content-['—'] before:absolute before:left-0 before:text-[#B8962E] before:font-mono"
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="text-[#F2EDE4] font-semibold" />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className="text-[#F2EDE4] italic" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      {...props}
      className="border-l-2 border-[#B8962E] pl-6 my-8 py-1"
    />
  ),
  hr: () => <hr className="border-0 border-t border-[#B8962E]/20 my-12" />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className="text-[#B8962E] underline underline-offset-2 hover:text-[#F2EDE4] transition-colors"
    />
  ),
}

export default function InsightPost({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const author = AUTHORS[post.author] ?? {
    name: post.author,
    title: 'VBO',
    bio: '',
  }

  const related = getRelatedPosts(post.slug, post.category, 3)

  return (
    <>
      <ArticleSchema post={post} />
      <ReadingProgress />
      <Nav />

      {/* Breadcrumb */}
      <div className="pt-24 pb-0 px-6 md:px-10 lg:px-24 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="font-mono text-[10px] tracking-[1.8px] uppercase text-[#6B6F73] hover:text-[#B8962E] transition-colors"
          >
            VBO
          </Link>
          <span className="text-[#B8962E] font-mono text-[10px]">/</span>
          <Link
            href="/insights"
            className="font-mono text-[10px] tracking-[1.8px] uppercase text-[#6B6F73] hover:text-[#B8962E] transition-colors"
          >
            Insights
          </Link>
          <span className="text-[#B8962E] font-mono text-[10px]">/</span>
          <span className="font-mono text-[10px] tracking-[1.8px] uppercase text-[#F2EDE4] truncate max-w-[200px]">
            {post.category}
          </span>
        </div>
      </div>

      {/* Article Header */}
      <header className="bg-[#0D0D0D] pt-10 pb-0 px-6 md:px-10 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-20 items-start">
          {/* Left: meta + title + excerpt */}
          <div>
            <div className="flex flex-wrap items-center gap-4 mb-7">
              <span className="font-mono text-[10px] tracking-[2px] uppercase text-[#0D0D0D] bg-[#B8962E] px-3.5 py-1.5">
                {post.category}
              </span>
              <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-[#6B6F73]">
                {formatDate(post.date)}
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-[#6B6F73] inline-block" />
              <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-[#6B6F73]">
                {post.readTime} read
              </span>
            </div>

            <h1 className="font-headline font-black text-[52px] md:text-[68px] leading-[0.92] uppercase text-[#F2EDE4] mb-6 max-w-[640px]">
              {post.title}
            </h1>

            <p className="font-body text-[18px] leading-[28px] text-[#6B6F73] max-w-[520px]">
              {post.excerpt}
            </p>
          </div>

          {/* Right: article summary panel */}
          <div className="lg:pt-2 hidden lg:block">
            <div className="border border-[#B8962E]/15 p-8 bg-[#1C1C1C]">
              <span className="font-mono text-[9px] tracking-[2.5px] uppercase text-[#B8962E] block mb-5">
                In This Article
              </span>
              <p className="font-body text-sm leading-[22px] text-[#6B6F73] mb-6">
                {post.excerpt}
              </p>
              <div className="border-t border-[#B8962E]/12 pt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-[#6B6F73]">
                    Author
                  </span>
                  <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-[#F2EDE4]">
                    {post.author}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-[#6B6F73]">
                    Read time
                  </span>
                  <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-[#F2EDE4]">
                    {post.readTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-[#6B6F73]">
                    Category
                  </span>
                  <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-[#B8962E]">
                    {post.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero image strip */}
      <div className="bg-[#0D0D0D] px-6 md:px-10 lg:px-24 pb-0 mt-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="h-[280px] md:h-[360px] bg-gradient-to-br from-[#1C1C1C] via-[#24282C] to-[#1a1a18] flex items-center justify-center overflow-hidden relative">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 1400px) 1400px, 100vw"
                className="object-cover"
              />
            ) : (
              <span className="font-headline font-black text-[240px] leading-none text-[#B8962E]/[0.05] select-none">
                01
              </span>
            )}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8962E]/20" />
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="bg-[#0D0D0D] px-6 md:px-10 lg:px-24 py-16">
        <div className="max-w-[720px] mx-auto">
          <MDXRemote source={post.content} components={mdxComponents} />

          {/* Author bio */}
          {author.bio && <AuthorBio author={author} />}

          {/* Back to Insights */}
          <div className="mt-12 pt-8 border-t border-[#1C1C1C]">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[2px] uppercase text-[#6B6F73] hover:text-[#B8962E] transition-colors"
            >
              <span>&larr;</span> Back to Insights
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <RelatedPosts posts={related} />

      {/* CTA */}
      <CTASection />
    </>
  )
}
