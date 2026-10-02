import type { ReactNode } from 'react'

export type InlineLinkSpec = {
  /** Exact substring of the text to turn into a link. */
  anchor: string
  href: string
  /** Opens in a new tab with noopener (client websites). */
  external?: boolean
}

/**
 * Wraps exact substrings of a copy string in links, without adding or
 * removing a single character of the copy. That matters in two places: the
 * approved copy stays word for word, and where the same string also feeds
 * structured data (FAQ answers, the homepage field) the visible text and the
 * machine-readable text cannot drift apart.
 *
 * An anchor that is not found is skipped and the text renders plain, so a
 * copy edit can never break the page, only drop a link.
 */
export function linkify(
  text: string,
  links: InlineLinkSpec[] = [],
  className = 'link-gold'
): ReactNode {
  if (links.length === 0) return text
  const ordered = [...links].sort((a, b) => text.indexOf(a.anchor) - text.indexOf(b.anchor))
  const out: ReactNode[] = []
  let rest = text
  let key = 0
  for (const link of ordered) {
    const at = rest.indexOf(link.anchor)
    if (at < 0) continue
    if (at > 0) out.push(rest.slice(0, at))
    out.push(
      <a
        key={key++}
        href={link.href}
        className={className}
        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {link.anchor}
      </a>
    )
    rest = rest.slice(at + link.anchor.length)
  }
  if (rest) out.push(rest)
  return out
}
