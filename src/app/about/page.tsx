import { notFound } from 'next/navigation'

/**
 * Parked, 2026-08-18 (Tim's round 2 review, R2-2). Verbatim: "let's not roll
 * out the about page on this rollout, I'm not sold but don't want to hold
 * back the other pages, so let's just save this about page for the future
 * to be worked on, and don't include about us in this roll out."
 *
 * The page and its content stay in the repo (src/content/pages/about.ts,
 * about-band.jpg) so it is cheap to bring back. This route just refuses to
 * render it: a real 404, not reachable and not indexable. Every inbound
 * /about link elsewhere on the site was unlinked to plain text in the same
 * pass (see clients/vbo/2026-08-18-TIM-review-round-big-build.md, R2-2), and
 * /about was pulled from navigation.ts (never had an entry there),
 * SiteFooter.tsx, sitemap.ts and the hand-built nav in
 * public/ai-enabled-marketing/index.html, so nothing on the live site
 * points here anymore.
 *
 * To restore: replace this file's contents with what git history shows
 * before this change, then re-add /about to SiteFooter.tsx, sitemap.ts and
 * the static nav.
 */
export default function Page() {
  notFound()
}
