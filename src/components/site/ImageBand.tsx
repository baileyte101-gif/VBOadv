import Image from 'next/image'
import type { PageImage } from '@/content/page-images'

/**
 * An in-body image band. Not a hero header: it sits between sections, the same
 * pattern /fractional-cmo already uses.
 *
 * While `src` is null it renders a placeholder frame at the exact final size
 * and position, printing the brief inside it. That way the layout can be judged
 * before the photography exists, and the brief travels with the slot instead of
 * living only in a document. Swapping in the real file is a one-line change in
 * src/content/page-images.ts. All fifteen images are now delivered and wired,
 * so this branch is dead on every current page, but it stays: Jules asked for
 * it to be kept as the right pattern for the next build (2026-08-17 QA return).
 *
 * `ground` is passed in by ContentPage rather than hardcoded, so the band
 * takes its own place in the page's ground rotation instead of always sitting
 * on plain (Jules's 2026-08-17 QA, section 2 item d).
 */
export default function ImageBand({ image, ground }: { image: PageImage; ground: string }) {
  const aspect = image.aspect === 'wide' ? 'aspect-[21/9]' : 'aspect-[16/9]'

  return (
    <section className={`content-section ${ground} border-b border-[#1C1C1C]`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-14">
        <figure className="max-w-[1200px] mx-auto reveal">
          {image.src ? (
            <div className={`relative w-full ${aspect} overflow-hidden`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              {/* Settles the image into the page's black without washing it out */}
              <div
                className="absolute inset-0 bg-[#0D0D0D] opacity-[0.18] pointer-events-none"
                aria-hidden
              />
            </div>
          ) : (
            <div
              className={`relative w-full ${aspect} overflow-hidden border border-[#B8962E]/30 bg-[var(--s2)] flex items-center justify-center`}
              role="img"
              aria-label={`Image placeholder. ${image.alt}`}
            >
              {/* Corner ticks, so the frame reads as a reserved slot rather than
                  a broken image. */}
              <span aria-hidden className="absolute left-3 top-3 w-5 h-[1px] bg-[#B8962E]/60" />
              <span aria-hidden className="absolute left-3 top-3 w-[1px] h-5 bg-[#B8962E]/60" />
              <span aria-hidden className="absolute right-3 bottom-3 w-5 h-[1px] bg-[#B8962E]/60" />
              <span aria-hidden className="absolute right-3 bottom-3 w-[1px] h-5 bg-[#B8962E]/60" />

              <div className="px-8 py-6 max-w-2xl text-center">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#B8962E] mb-3">
                  Image to come
                </p>
                <p className="text-[#F2EDE4]/70 text-sm leading-relaxed">{image.brief}</p>
              </div>
            </div>
          )}
        </figure>
      </div>
    </section>
  )
}
