/**
 * Visible homepage FAQ. Vega P1-4, option A, Tim approved 2026-08-28.
 *
 * The homepage has shipped a four-question FAQPage schema block since Phase
 * 1.1 (src/app/page.tsx), but none of the four questions or answers ever
 * appeared on the page: markup describing content that does not exist is a
 * Google structured-data mismatch, and on a site that sells SEO that is
 * worth fixing properly rather than deleting the asset.
 *
 * Only THREE of the four schema questions are surfaced here, by design.
 * Question 3 in the schema ("What kinds of businesses does VBO Advertising
 * work with?") answers with a line naming "professional services firms" as
 * client experience. That claim already left the rest of the visible site
 * (Mary's flag, 2026-08-18) and VBO's live client roster does not support
 * it today. Vega's ticket, Mack's brief and Tim's approval on 2026-08-28 are
 * explicit: hold that one block, do not surface it, flag it for Mary to
 * rewrite or cut. The schema block in page.tsx is left untouched by this
 * change; only three of its four questions get a matching visible answer
 * here. Text below is copied verbatim from that schema, not new copy.
 *
 * Markup and styling reuse the accordion pattern already shipped and
 * approved on the vertical pages (src/components/LandingPageTemplate.tsx,
 * `.faq-accordion-*` classes in globals.css) rather than inventing a new
 * visual pattern for the homepage.
 */

const visibleFaqItems = [
  {
    question: 'What does VBO Advertising do?',
    answer:
      'VBO Advertising is a founder-led marketing consultancy and studio based in Miami, Florida. We set the marketing strategy first, then run disciplined execution across paid media, social, SEO, brand, and creative, all in one connected system for small and mid-size businesses.',
  },
  {
    question: 'Where is VBO Advertising located?',
    answer:
      'VBO Advertising is based in Coconut Grove, Miami, Florida. We work with clients across South Florida (Miami-Dade, Broward, and Palm Beach counties) and serve select clients nationally.',
  },
  {
    question: 'What is integrated marketing?',
    answer:
      'Integrated marketing means your brand, budget, channels, creative, and measurement all work together as one system, not as five disconnected vendors. VBO builds and runs that system for small and mid-size businesses so every part of your marketing pulls in the same direction.',
  },
]

export default function HomeFAQ() {
  return (
    <section className="relative z-[1] py-24 md:py-32 lg:py-36 px-8 md:px-12 lg:px-20 xl:px-24">
      <div className="max-w-[1200px] mx-auto">
        <p className="section-label">Frequently Asked Questions</p>
        <div className="section-accent" />
        <h2 className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[clamp(2.25rem,5vw,4rem)] max-w-[860px] mb-12">
          Common Questions
        </h2>

        <div className="faq-accordion-list max-w-3xl">
          {visibleFaqItems.map((item) => (
            <details key={item.question} className="faq-accordion-item">
              <summary className="faq-accordion-q">
                <span className="font-headline text-[18px] md:text-[20px] font-bold uppercase text-[var(--color-vbo-gold)] leading-[1.3] tracking-wide">
                  {item.question}
                </span>
                <span className="faq-accordion-icon" aria-hidden="true" />
              </summary>
              <p className="faq-accordion-a font-body text-[18px] text-[var(--color-vbo-egg)] opacity-80 leading-[28px] max-w-none">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
