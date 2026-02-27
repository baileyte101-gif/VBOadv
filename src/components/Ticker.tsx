'use client'

interface TickerProps {
  items: string[]
  textColorClass?: string
  bgClass?: string
  speed?: number
  separator?: string
}

export default function Ticker({
  items,
  textColorClass = 'text-[#6B6F73]',
  bgClass = 'bg-[#0D0D0D]',
  speed = 30,
  separator = '/',
}: TickerProps) {
  // Duplicate items for seamless infinite loop
  const track = [...items, ...items]

  return (
    <div
      className={`${bgClass} border-t border-b border-[#B8962E]/25 py-3 overflow-hidden`}
    >
      <div
        className={`flex whitespace-nowrap ${textColorClass} font-mono text-[11px] tracking-[0.22em] uppercase`}
        style={{
          animation: `ticker ${speed}s linear infinite`,
          width: 'max-content',
        }}
      >
        {track.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-5">{item}</span>
            <span className="text-[#B8962E]/50 px-1">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
