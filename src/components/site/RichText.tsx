import { Fragment } from 'react'
import Link from 'next/link'

/**
 * Renders the small slice of inline markdown Mary's copy actually uses:
 * `**bold**` and `[text](/href)`. Nothing else, deliberately.
 *
 * The point is that content modules can hold the copy byte for byte as written
 * in clients/vbo/copy/*.md, so "build the strings exactly as written" is
 * verifiable by diff instead of by trust. A heavier markdown library would also
 * transform typography (smart quotes, and notably hyphens into en dashes),
 * which is exactly what the no-dash rule forbids. This parser transforms
 * nothing it is not asked to.
 *
 * Internal links go through next/link so navigation stays client side.
 * External links (http, mailto, tel) render as plain anchors.
 */

const TOKEN = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g
const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/
const BOLD = /^\*\*([^*]+)\*\*$/
const ITALIC = /^\*([^*]+)\*$/
const CODE = /^`([^`]+)`$/

function isInternal(href: string) {
  return href.startsWith('/')
}

export function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter((p) => p !== '')

  return (
    <>
      {parts.map((part, i) => {
        const link = part.match(LINK)
        if (link) {
          const [, label, href] = link
          return isInternal(href) ? (
            <Link key={i} href={href} className="link-gold">
              {label}
            </Link>
          ) : (
            // External. target="_blank" + rel="noopener" as of 2026-08-18
            // (Tim's review round, D2: client names link to their own site,
            // new tab, noopener). Applies to every external markdown link in
            // body copy, not only client names, since that is the correct
            // behavior for any link that sends a reader off the site.
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-gold"
            >
              {label}
            </a>
          )
        }

        const bold = part.match(BOLD)
        if (bold) {
          return (
            <strong key={i} className="font-semibold text-[#F2EDE4]">
              {bold[1]}
            </strong>
          )
        }

        const italic = part.match(ITALIC)
        if (italic) {
          return <em key={i}>{italic[1]}</em>
        }

        // `llms.txt` and similar. A real <code> element, so a screen reader and
        // an answer engine both know it is a filename rather than prose.
        const code = part.match(CODE)
        if (code) {
          return (
            <code key={i} className="font-mono text-[0.92em] text-[#F2EDE4]">
              {code[1]}
            </code>
          )
        }

        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}

export function Paragraphs({
  items,
  className = '',
}: {
  items: string[]
  className?: string
}) {
  return (
    <>
      {items.map((text, i) => (
        <p key={i} className={`prose-body ${className}`}>
          <Inline text={text} />
        </p>
      ))}
    </>
  )
}
