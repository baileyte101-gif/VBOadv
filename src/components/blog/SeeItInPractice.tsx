import Image from 'next/image'
import { CASE_STUDY_CARDS, SEE_IT_LABEL } from '@/lib/work'
// The card's look lives in the case studies' stylesheet; every rule in it is
// scoped under .vw, so importing it here changes nothing else on the post.
import '@/app/case-studies/work.css'

// "See it in practice" (Vega, 2026-10-22, item 1c): the case study a post is
// the practice of, as its own /case-studies card, directly after the post
// body and before the "Back to Insights" line that closes the article
// (Jules's placement, 2026-10-22), inside the article's 720px column. Set by
// the post's `caseStudy` front matter.
export default function SeeItInPractice({ slug }: { slug?: string }) {
  const card = slug ? CASE_STUDY_CARDS[slug] : undefined
  if (!card || !card.shown) return null

  return (
    <section className="mt-12" aria-labelledby="see-it-title">
      <div>
        <h2 id="see-it-title" className="section-label">
          {SEE_IT_LABEL}
        </h2>
        <div className="vw">
          <a className="vw-card" href={card.path}>
            <div className={card.photo ? 'vw-card-media vw-card-media-photo' : 'vw-card-media'}>
              <Image
                src={card.image.src}
                alt=""
                width={card.image.width}
                height={card.image.height}
                sizes="(min-width: 768px) 720px, 100vw"
              />
            </div>
            <div className="vw-card-body">
              <h3>{card.client}</h3>
              <p>{card.cardLine}</p>
              <span className="vw-card-more" aria-hidden>
                &rarr;
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
