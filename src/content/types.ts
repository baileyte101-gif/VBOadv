/**
 * Content model for the fifteen pages of the 2026-08 big build.
 *
 * Copy is stored as the exact strings Mary wrote in clients/vbo/copy/*.md and is
 * never edited here. Two consequences worth knowing before touching this file:
 *
 *   1. Body strings keep Mary's inline markdown (`**bold**` and `[text](/href)`)
 *      so a content module can be diffed against the source file character for
 *      character. RichText renders it; nothing rewrites it.
 *   2. FAQ answers feed the visible page and the FAQPage JSON-LD from the same
 *      string, so the schema cannot drift from what a reader sees. Vega checks
 *      that they match; this makes it structural rather than a promise.
 *
 * No em dashes or en dashes. Verified by codepoint scan, not by eye.
 */

/** A paragraph of body copy. Keeps Mary's inline markdown verbatim. */
export type Paragraph = string

/** An ordered step list, used by /contact's "What Happens Next". */
export type OrderedList = {
  kind: 'ordered'
  items: Paragraph[]
}

/** A run of paragraphs. The default block. */
export type Prose = {
  kind: 'prose'
  items: Paragraph[]
}

/** A bullet list. Used where Mary wrote one, and only there. */
export type UnorderedList = {
  kind: 'unordered'
  items: Paragraph[]
}

/**
 * Consecutive lines that belong together but are not a list: the contact
 * page's email, phone and location. Rendered one per line, which is how they
 * are written and how they are meant to be read.
 */
export type Lines = {
  kind: 'lines'
  items: Paragraph[]
}

/**
 * A labelled block: bold lead-in, then the rest of the sentence. Used by the
 * hub pages, where each service or industry entry starts with its own name.
 * Stored as one string because that is how Mary wrote it; the lead-in is bold
 * markdown inside the paragraph, not a separate field.
 */
export type Block = Prose | OrderedList | UnorderedList | Lines

export type Section = {
  /** Rendered as an H2. */
  heading: string
  blocks: Block[]
}

export type FaqEntry = {
  question: string
  /** Feeds both the visible answer and the FAQPage schema. */
  answer: string
}

export type Breadcrumb = {
  name: string
  /** Absolute URL. Must return 200. Never a 404. */
  item: string
}

export type ServiceSchema = {
  name: string
  description: string
  serviceType: string[]
}

export type ContactField = {
  name: 'name' | 'email' | 'business' | 'message'
  /** Mary's exact label. Rendered as a real <label>, never a placeholder. */
  label: string
  type: 'text' | 'email' | 'textarea'
  required: boolean
}

export type ContactForm = {
  /** Four fields. Every extra field costs inquiries, so it stays at four. */
  fields: ContactField[]
  submitLabel: string
  microcopy: string
}

export type PageContent = {
  /** Route path, e.g. '/services'. Canonical is derived from this. */
  path: string
  /** Title tag. Under 60 characters. */
  title: string
  /** Meta description. Under 155 characters. */
  description: string
  /** The single H1. */
  h1: string
  /** Paragraphs between the H1 and the first H2. */
  intro: Paragraph[]
  sections: Section[]
  /** Heading above the FAQ block. Mary uses "Common Questions" throughout. */
  faqHeading: string
  faq: FaqEntry[]
  /** The closing block. Contact has none. */
  close?: Section
  /** Position 1 is always Home; the rest are page specific. */
  breadcrumb: Breadcrumb[]
  /** Omitted on /contact and /about, which are not services. */
  service?: ServiceSchema
  /** Eyebrow above the H1. Short, structural, no marketing adjective. */
  eyebrow: string
  /** Present on /contact only. Lifted from Mary's field table. */
  form?: ContactForm
}
