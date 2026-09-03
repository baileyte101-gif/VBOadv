import type { Client } from '@/lib/clients'

/**
 * ClientGlassTile: the frosted-glass client logo card.
 *
 * Extracted 2026-08-11 while building the section 01 marble strip, which
 * needed a smaller copy of the same tile WhoWeWorkWith.tsx (since removed)
 * used at full size. Visual spec (border, gradient, backdrop blur, box
 * shadow, hover glow, shimmer sweep, Peixoto lockup handling) is copied
 * verbatim from that component. Only the size is parameterized.
 *
 * `default` = 220px desktop / 180px mobile, the original full-section size.
 * `compact` = 150px desktop / 116px mobile, for a strip rather than a
 * full section. Both switch at the `lg` (1024px) breakpoint, matching
 * Jules's approved mockup (`Jules/designs/vbo/website/section-01-2026-08/
 * treatment-04-tim/index.html`).
 */
export default function ClientGlassTile({
  client,
  size = 'default',
}: {
  client: Client
  size?: 'default' | 'compact'
}) {
  const compact = size === 'compact'

  return (
    <a
      href={client.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${client.name}`}
      className={`client-glass group relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 ease-out hover:border-[#B8962E]/50 hover:-translate-y-1 ${
        compact ? 'h-[116px] lg:h-[150px]' : 'h-[180px] md:h-[220px]'
      }`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Gold glow that fades in on hover */}
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(184,150,46,0.22) 0%, rgba(184,150,46,0) 65%)',
        }}
      />

      {/* Diagonal shimmer sweep on hover */}
      <span
        aria-hidden
        className="client-shimmer pointer-events-none absolute inset-y-0 -left-1/2 w-1/2"
        style={{
          background: 'linear-gradient(75deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
        }}
      />

      {/* Logo */}
      <div
        className={`relative flex items-center justify-center w-full h-full ${
          compact ? 'px-5 md:px-6' : 'px-8 md:px-10'
        }`}
      >
        {client.variant === 'image' && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={client.logo}
            alt={`${client.name} logo`}
            className="opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ease-out"
            style={{
              maxWidth: '70%',
              maxHeight: '70%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        )}

        {client.variant === 'peixoto-lockup' && (
          <div
            className={`flex flex-col items-center justify-center opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ease-out ${
              compact ? 'gap-1.5' : 'gap-2.5 md:gap-3'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={client.logo}
              alt="Peixoto Wear"
              className={compact ? 'w-auto h-10 lg:h-12' : 'w-auto h-[78px] md:h-[96px]'}
            />
            <span
              className={`font-headline font-black text-[#F2EDE4] uppercase leading-none ${
                compact ? 'text-[10px] lg:text-[11px] tracking-[0.28em] lg:tracking-[0.3em]' : 'text-[14px] md:text-[16px] tracking-[0.32em] md:tracking-[0.36em]'
              }`}
            >
              Peixoto
            </span>
          </div>
        )}
      </div>
    </a>
  )
}
