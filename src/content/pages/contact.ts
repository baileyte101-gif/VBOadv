import type { PageContent } from '@/content/types'

/**
 * GENERATED from clients/vbo/copy/15-contact.md (Mary, approved by Tim 2026-08-15).
 *
 * Every rendered string is byte-for-byte the approved copy. Do not edit copy
 * here: change the source file and regenerate, or raise it with Mary. The
 * FAQ answers below feed both the visible page and the FAQPage JSON-LD, so
 * the two cannot drift apart.
 */
export const contactPage: PageContent = {
  "path": "/contact",
  "title": "Contact VBO Advertising | Miami, Florida",
  "description": "Tell us what you're trying to fix and we'll tell you whether we can help. Based in Coconut Grove, Miami. Serving South Florida.",
  "h1": "Let's Talk About What You're Trying to Fix",
  "eyebrow": "Contact",
  "intro": [
    "Tell us what isn't working. That's the whole ask, and it's a more useful opening than a list of services you'd like quoted.",
    "A conversation isn't a commitment. A fair number of them end with us saying the thing you need isn't the thing we sell, and that's a good outcome for both sides."
  ],
  "sections": [
    {
      "heading": "What Happens Next",
      "blocks": [
        {
          "kind": "ordered",
          "items": [
            "**You send a note.** Four fields. The only one that really matters is the last.",
            "**Tim reads it.** Not a queue, not an assistant, not a shared inbox nobody owns.",
            "**You get a reply within one business day.**",
            "**The first conversation is a conversation.** We'll ask what you're running and what's frustrating you, tell you what we'd look at first, and be straight about whether we're the right people. No deck, no pitch."
          ]
        }
      ]
    },
    {
      "heading": "The Form",
      "blocks": [
        {
          "kind": "prose",
          "items": [
            "*(Four fields. Every extra field costs inquiries, so it stays at four.)*"
          ]
        }
      ]
    },
    {
      "heading": "Or Reach Us Directly",
      "blocks": [
        {
          "kind": "lines",
          "items": [
            "**Email:** hello@vboadv.com",
            "**Phone:** 864-640-6558",
            "**Where:** Coconut Grove, Miami, Florida"
          ]
        }
      ]
    },
    {
      "heading": "Not Sure What You Need?",
      "blocks": [
        {
          "kind": "prose",
          "items": [
            "Plenty of people aren't, and that's a normal place to be. [Everything VBO does](/services) is set out on one page in plain terms. If what you actually want is somebody senior to look at what's running and tell you the truth about it, that's [marketing consulting](/marketing-consultant), and it's a defined piece of work rather than a retainer. If you'd rather know who you'd be dealing with first, that's [who we are](/about)."
          ]
        }
      ]
    }
  ],
  "faqHeading": "Common Questions",
  "faq": [],
  "breadcrumb": [
    {
      "name": "Home",
      "item": "https://www.vboadv.com"
    },
    {
      "name": "Contact",
      "item": "https://www.vboadv.com/contact"
    }
  ],
  "form": {
    "fields": [
      {
        "name": "name",
        "label": "Your name",
        "type": "text",
        "required": true
      },
      {
        "name": "email",
        "label": "Email",
        "type": "email",
        "required": true
      },
      {
        "name": "business",
        "label": "Business",
        "type": "text",
        "required": true
      },
      {
        "name": "message",
        "label": "What are you trying to fix?",
        "type": "textarea",
        "required": true
      }
    ],
    "submitLabel": "Send it",
    "microcopy": "We read every one. No list, no automated sequence."
  }
}
