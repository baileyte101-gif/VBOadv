import Image from 'next/image'

/**
 * Life — new section, position 7. Ground: the retro chest band (solid band plus
 * one thinner parallel accent stripe, outlined display letterforms).
 *
 * Job: the first hard evidence, mid-scroll, that a person built this.
 *
 * Deliberately heading-free. It is an imagery beat, not a content section, so it
 * carries no H2 and no H3 and must not be given one.
 */
export default function Life() {
  return (
    <section className="p-0">
      {/* Chest band */}
      <div className="relative z-[2] bg-[#0D0D0D] border-t border-[#B8962E]/20 px-6 md:px-10 py-5 md:py-[22px] flex items-center">
        <span className="retro-outline retro-outline-lg font-extrabold tracking-[0.05em] text-[1.15rem] md:text-[1.6rem]">
          Life / Miami
        </span>
      </div>

      {/* Accent stripe */}
      <div className="retro-strip" />

      {/* Fixed-height band is the aspect-ratio container: the image fills it via
          inset-0 + object-cover, so no source dimension can shift layout. */}
      <div className="relative h-[400px] md:h-[560px]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/life-miami-street.jpg"
            alt="A man seen from behind, face not visible, walking mid-stride along a calm tree-lined downtown Miami street at midday, glancing at a phone held in one hand and carrying a small cafecito cup in the other, two pedestrians at a distance, shot in the desaturated house grade with warm colour and visible film grain"
            fill
            /* Crop biased toward the bottom of the frame: the source is wider
               than this band, so cover has to trim top and bottom regardless.
               Protecting his feet reads as an intentional tight crop; trimming
               them reads as a mistake. */
            className="object-cover"
            style={{ objectPosition: '50% 78%' }}
            sizes="100vw"
          />
          {/* Legibility scrim under the copy. Thin the image's contrast where the
              line sits, never the type. */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(0deg, rgba(13,13,13,.78) 0%, rgba(13,13,13,.32) 40%, rgba(13,13,13,0) 68%)',
            }}
            aria-hidden
          />
        </div>

        <div className="absolute bottom-6 md:bottom-10 left-0 p-6 md:p-10 max-w-[640px]">
          <p
            className="font-headline font-black text-[#F2EDE4] uppercase leading-[1.05] text-[clamp(1.7rem,3.4vw,2.5rem)] max-w-[9ch]"
            style={{ textShadow: '0 2px 14px rgba(0,0,0,.55)' }}
          >
            The work should look this easy.
          </p>
        </div>
      </div>

      {/* Accent stripe */}
      <div className="retro-strip" />
    </section>
  )
}
