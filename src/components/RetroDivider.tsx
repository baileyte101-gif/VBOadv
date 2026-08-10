/**
 * Retro divider — the jersey chest-band vocabulary scaled down to punctuate
 * rather than frame: a solid band, outlined display letterforms, one gold strip.
 *
 * Job: hard punctuation between the case-building half of the page and the
 * execution half. Deliberately heading-free — it is a beat, not a section.
 */
export default function RetroDivider() {
  return (
    <div className="relative bg-[#0D0D0D] border-t border-[#B8962E]/20">
      <div className="py-5 md:py-[26px] px-6 md:px-10 text-center">
        <span className="retro-outline font-extrabold tracking-[0.08em] text-[0.95rem] md:text-[1.15rem]">
          Behind the work.
        </span>
      </div>
      <div className="retro-divider-strip" />
    </div>
  )
}
