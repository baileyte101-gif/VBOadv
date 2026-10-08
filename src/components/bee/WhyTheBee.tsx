import Image from 'next/image'
import Link from 'next/link'
import BeeLane from '@/components/bee/BeeLane'
import { HOME_WHY_LABEL, HOME_WHY_BODY, HOME_WHY_LINK } from '@/lib/bee-copy'

/**
 * Homepage section 06, Why the bee (bee brand evolution, 2026-10-08). After
 * About, on Egg (Tim kept it light), linking to the story page. The flying
 * bee crosses into it as its top reaches mid-screen, turns black on the Egg
 * ground, and lands beside the link; with reduced motion or no JavaScript the
 * bee simply sits there.
 *
 * Words: Mary, section 2 option 1 (src/lib/bee-copy.ts). Photo: Grammar
 * School Mills, Manchester, published 1908, public domain (credits on
 * /why-the-bee; record in Jules's notes, section 7). Server component: no
 * JavaScript of its own.
 */
export default function WhyTheBee() {
  return (
    <section
      id="why-the-bee"
      data-bee="fly"
      data-bee-fly="why"
      data-bee-sec="why"
      aria-labelledby="why-the-bee-heading"
      className="bee-why relative isolate overflow-hidden px-8 md:px-12 lg:px-20 xl:px-24 pt-20 md:pt-28 lg:pt-32 pb-24 md:pb-32 lg:pb-40"
    >
      <BeeLane />

      {/* Ghost section number, the homepage's 01 to 05 continued. */}
      <div className="bee-why-ghost" aria-hidden>
        06
      </div>

      <div className="relative z-10" data-bee-content>
        <div className="bee-why-grid">
          <div className="bee-why-text">
            <h2 id="why-the-bee-heading" className="bee-why-label">
              {HOME_WHY_LABEL}
            </h2>
            <div className="section-accent" aria-hidden />
            <p className="bee-why-body">{HOME_WHY_BODY}</p>
            <div className="bee-why-linkrow">
              <Link href="/why-the-bee" className="bee-why-link">
                {HOME_WHY_LINK} <span aria-hidden="true">&rarr;</span>
              </Link>
              {/* The bee at rest: the flight's landing spot and the still bee. */}
              <svg
                className="vbo-bee-rest"
                data-bee-sec="rest"
                viewBox="0 0 512 512"
                aria-hidden="true"
                focusable="false"
              >
                <use href="#vbo-bee" />
              </svg>
            </div>
          </div>

          <figure className="bee-why-photo">
            <Image
              src="/images/why-the-bee/manchester-grammar-school-mills-1908.jpg"
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 45vw, 100vw"
              alt="Grammar School Mills, Manchester, in a photograph published in 1908: a brick mill with a tall chimney, and the old bridge to Victoria Station."
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
