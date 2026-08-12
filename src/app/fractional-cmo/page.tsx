import type { Metadata } from "next";
import Image from "next/image";
import { INDEXABLE_PAGES } from "@/lib/indexable";

const PRODUCTION_HOST = "https://www.vboadv.com";
const SLUG = "fractional-cmo";
const CANONICAL = `${PRODUCTION_HOST}/${SLUG}`;
const IS_INDEXABLE = INDEXABLE_PAGES.has(SLUG);

const TITLE = "Fractional CMO Services: The Role, and What It Costs | VBO";

// MV-F01. 154 characters. Also the OG description, character for character.
const META_DESCRIPTION =
  "What a fractional CMO is, what the role covers week to week, what drives the cost, and who actually does the work once someone senior owns your marketing.";

export const metadata: Metadata = {
  title: TITLE,
  description: META_DESCRIPTION,
  robots: IS_INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false },
  ...(IS_INDEXABLE && { alternates: { canonical: CANONICAL } }),
  openGraph: {
    title: TITLE,
    description: META_DESCRIPTION,
    type: "website",
    siteName: "VBO Advertising",
    url: CANONICAL,
  },
};

// Jules delivered. Alt text is Jules's MV-F12 supersede, not Mary's draft.
const IMAGE_1 = {
  src: "/images/fractional-cmo/fractional-cmo-hero-band.jpg",
  alt: "Someone leaning over a sunlit work table covered in marked-up printed marketing plans, hands planted, late afternoon light across the pages.",
};

const IMAGE_2 = {
  src: "/images/fractional-cmo/fractional-cmo-secondary-band.jpg",
  alt: "Two people at a table working through a marked-up printed document together, one pointing at a line, faces out of frame.",
};

const FAQ: { question: string; answer: string }[] = [
  {
    question:
      "What is a fractional CMO?",
    answer:
      "A senior marketing leader who runs your marketing part of the time instead of all of it. Same responsibility a chief marketing officer carries for direction, spend and results, held on a share of the hours. What makes it work is that one senior person owns the outcome instead of handing over a plan and stepping back.",
  },
  {
    question:
      "What does a fractional CMO actually do week to week?",
    answer:
      "The week is mostly unglamorous, and the part worth checking is what happens after a decision gets made. A plan says what should change. A seat changes it, inside the same week. So there are decisions in there, and there's also the work those decisions produce: the briefs, the reviews, the fix when a channel stalls. Nothing sits in a queue waiting for you to go find somebody to run it.",
  },
  {
    question:
      "How much does a fractional CMO cost?",
    answer:
      "There isn't one number, and the more useful answer is what the bill looks like. It's a predictable monthly fee, agreed before anything starts, so it doesn't move around on you. The exception is media: when we're running your ad spend, that piece is a percentage of it, so it moves when you move it. We don't publish a rate card because a number that fit every business wouldn't be honest. The real number for your business exists. It comes out of a conversation, not a page.",
  },
  {
    question:
      "Is a fractional CMO the same as an outsourced CMO, a part-time CMO, or an interim CMO?",
    answer:
      "The first two, yes. Outsourced CMO and part-time CMO describe the same seat we fill. Virtual CMO, remote CMO, CMO as a service and fractional marketing director are mostly the same idea wearing different labels. Interim is the exception. An interim CMO holds the chair close to full-time for a set stretch while a company runs a search for a permanent hire, and that isn't what we sell. If that's what you need, say so early, because it saves everyone a month.",
  },
  {
    question:
      "When should a business hire a fractional CMO instead of a full-time one?",
    answer:
      "When there's enough marketing happening that somebody senior should be deciding where the money goes, and not enough to fill a full-time leader's week. That's the window. If the work would genuinely fill the week and you can carry the hire, hire full-time, because full-time is better when it's justified. And if the question underneath is whether you need an outside team at all, we wrote about what a marketing agency actually does.",
  },
  {
    question:
      "How long does a fractional CMO engagement usually last?",
    answer:
      "There's no fixed term. It's ongoing, and it lasts as long as the seat is doing something a full-time hire or an internal promotion couldn't do better. Some businesses keep it for years. Others reach the point where the marketing has grown enough to justify hiring someone full-time, and that's a good outcome rather than a failure. We'd rather tell you when you've reached it than wait for you to notice.",
  },
  {
    question:
      "Who would actually be our fractional CMO?",
    answer:
      "Tim Bailey, VBO's founder. He holds the seat himself, so the person who sets your direction is the person running it week to week, and the work comes out of the same operation rather than getting placed with somebody else. There's no bench behind him and that's a choice, not a gap. Our clients are our priority, we are not a high-volume agency. If capacity is the reason we can't take you on, we'll say so rather than take the retainer and thin out.",
  },
  {
    question:
      "Do you work with businesses outside South Florida?",
    answer:
      "Yes. Almost nothing about this role depends on being in the room. The decisions come off the numbers and the work, and both of those travel. What location does change is the occasional day when sitting at the same table beats a call, and that's a convenience rather than a requirement. South Florida is home and a good share of the work is here. Where your business sits matters far less than whether the work is a fit.",
  },
];

// ---------------------------------------------------------------------------
// SCHEMA. Three blocks. The root Organization, Person and LocalBusiness render
// sitewide from src/app/layout.tsx. Do not duplicate them here.
// No offers, no Offer, no priceRange on this page's own nodes.
// ---------------------------------------------------------------------------

const AREA_SERVED = [
  "Coconut Grove",
  "Miami",
  "South Florida",
  "Miami Beach",
  "Coral Gables",
  "Brickell",
  "Wynwood",
  "Doral",
  "Hialeah",
  "Aventura",
  "Fort Lauderdale",
  "Hollywood",
  "Boca Raton",
  "West Palm Beach",
].map((name) => ({ "@type": "City", name }));

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Fractional CMO Services",
  // R1 pattern, per Vega. Never an inline Organization object.
  provider: { "@id": "https://www.vboadv.com/#organization" },
  // MV-F05, v2. BOTH sentences come from section 1 (MV-F03): sentence 1 is the
  // opening sentence, sentence 2 is the second sentence of the third paragraph.
  // Neither contains an apostrophe, so visible-to-schema parity is exact.
  description:
    "A fractional CMO is a senior marketing leader who runs your marketing part of the time instead of all of it. One senior person decides what to do, watches whether it worked, and stays close enough to the work to change it.",
  serviceType: [
    "Fractional CMO",
    "Fractional Chief Marketing Officer",
    "Outsourced CMO",
    "Part-Time CMO",
    "Fractional Marketing Leadership",
  ],
  areaServed: AREA_SERVED,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

// TWO levels. The vertical route now matches this shape (2026-08-12): its old
// three-level pattern pointed position 2 at /professional-services, which used
// to 404 and now 308s to the homepage, so the middle item was dropped there too.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.vboadv.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Fractional CMO",
      item: CANONICAL,
    },
  ],
};

// ---------------------------------------------------------------------------
// Local presentational pieces. Server-only, no hooks, no client bundle.
// Classes match src/components/LandingPageTemplate.tsx exactly.
// ---------------------------------------------------------------------------

function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-3 items-center h-16">
        <a
          href="/"
          className="flex items-center justify-self-start"
          aria-label="VBO Advertising home"
        >
          <Image
            src="/images/logo-transparent.png"
            alt="VBO Advertising"
            width={834}
            height={222}
            className="h-8 md:h-12 w-auto max-w-none"
            priority
          />
        </a>
        <a
          href="/"
          className="justify-self-center font-mono text-sm md:text-base text-[#F2EDE4] tracking-[0.2em] uppercase transition-colors duration-200 relative group whitespace-nowrap hover:text-[#B8962E]"
        >
          Home
        </a>
        <div className="justify-self-end" aria-hidden="true" />
      </div>
    </nav>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[12px] uppercase tracking-[3.6px] text-[var(--color-vbo-gold)] block mb-6">
      {children}
    </span>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-headline text-[36px] md:text-[56px] font-black uppercase text-[var(--color-vbo-white)] leading-[1] mb-8">
      {children}
    </h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-[18px] text-[var(--color-vbo-egg)] opacity-80 leading-[28px] max-w-3xl mb-6 last:mb-0">
      {children}
    </p>
  );
}

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-[var(--color-vbo-gold)] hover:text-[var(--color-vbo-gold-light)] underline underline-offset-4 decoration-[var(--color-vbo-gold)]/40 transition-colors"
    >
      {children}
    </a>
  );
}

function Section({
  id,
  heading,
  label,
  tinted,
  children,
}: {
  id: string;
  heading: string;
  label?: string;
  tinted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`px-6 py-16 md:py-24 lg:py-[120px] ${
        tinted ? "bg-[var(--color-vbo-graphite)]" : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        {label && <SectionLabel>{label}</SectionLabel>}
        <H2>{heading}</H2>
        {children}
      </div>
    </section>
  );
}

function ImageBand({
  image,
  aspectClass,
  applyFilter,
  priority,
}: {
  image: { src: string; alt: string };
  aspectClass: string;
  applyFilter?: boolean;
  priority?: boolean;
}) {
  return (
    <section className="px-6 py-8">
      <div className="max-w-[1200px] mx-auto">
        <div className={`relative w-full ${aspectClass} overflow-hidden`}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority={priority}
          />
          {applyFilter && (
            <div className="absolute inset-0 bg-[var(--color-vbo-black)] opacity-[0.18] pointer-events-none" />
          )}
        </div>
      </div>
    </section>
  );
}

// FAQ 5 is the only answer carrying a link (O5). The visible string and the
// schema string stay character-identical: the anchor wraps a substring of the
// same constant, so it adds and removes nothing.
function FaqAnswer({ item }: { item: { question: string; answer: string } }) {
  const O5_ANCHOR = "what a marketing agency actually does";
  if (!item.answer.includes(O5_ANCHOR)) {
    return (
      <p className="font-body text-[18px] text-[var(--color-vbo-egg)] opacity-80 leading-[28px]">
        {item.answer}
      </p>
    );
  }
  const [before, after] = item.answer.split(O5_ANCHOR);
  return (
    <p className="font-body text-[18px] text-[var(--color-vbo-egg)] opacity-80 leading-[28px]">
      {before}
      <InlineLink href="/insights/what-a-marketing-agency-actually-does">
        {O5_ANCHOR}
      </InlineLink>
      {after}
    </p>
  );
}

// ---------------------------------------------------------------------------

export default function FractionalCmoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <NavBar />

      <main className="min-h-screen font-body text-[18px] leading-[28px] pt-20">
        {/* ===== HERO ===== MV-F02 Option A, 33 words. Sentence 3 is the spine. */}
        <section className="relative px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="max-w-[1200px] mx-auto">
            <SectionLabel>VBO Advertising</SectionLabel>
            <h1 className="font-headline text-[40px] md:text-[64px] lg:text-[80px] font-black uppercase text-[var(--color-vbo-white)] leading-[0.92] max-w-4xl mb-8">
              Fractional CMO Services: What the Role Is, and When You Need One
            </h1>
            <p className="font-body text-[18px] md:text-[20px] text-[var(--color-vbo-egg)] max-w-2xl mb-10 leading-[28px]">
              You need someone senior owning your marketing and can&apos;t justify a
              full-time hire. A fractional CMO fills that gap. We hold the seat, and we
              do the work that comes out of it.
            </p>
          </div>
        </section>

        <ImageBand
          image={IMAGE_1}
          aspectClass="aspect-[16/7] md:aspect-[16/6]"
          applyFilter
          priority
        />

        {/* ===== 1 ===== MV-F03, 177 words, longest on the page */}
        <Section id="what-it-is" heading="What a Fractional CMO Is" label="The Role">
          <Body>
            A fractional CMO is a senior marketing leader who runs your marketing part
            of the time instead of all of it. Fractional chief marketing officer is
            the long version of the same title. Same seat, same responsibility for the
            direction and for the results, held on a share of the hours.
          </Body>
          <Body>
            The role began as a seat at the top with nothing underneath it. Someone
            senior came in a day or two a week, set the direction, and handed the work
            down to the marketing department and the agencies. That assumed there was
            a department to hand it to. For a lot of businesses this size there
            isn&apos;t one, so what showed up was a plan, a bill, and nothing
            different on Monday.
          </Body>
          <Body>
            The modern version of the job is a seat rather than a document, and it has
            hands attached. One senior person decides what to do, watches whether it
            worked, and stays close enough to the work to change it. What they own is
            the outcome, not the plan that was supposed to produce it.
          </Body>
        </Section>

        {/* ===== 2 ===== MV-F04. Row 6 fallback shipped: contact/written-update
            sentence deleted (Mack's call, unconfirmed claim). 115 words. */}
        <Section
          id="week-to-week"
          heading="What a Fractional CMO Actually Does, Week to Week"
          tinted
        >
          <Body>
            A normal week looks less like strategy and more like running a department.
            Someone reads last week&apos;s numbers and changes something because of
            them, briefs the people producing the work, reviews it before it goes out,
            and answers the question nobody else in the building can answer, which is
            whether the money is going to the right place.
          </Body>
          <Body>
            When spend jumps or a channel stalls, the person who set the direction is
            the one looking into it, so it doesn&apos;t sit until the next review.
          </Body>
          <Body>
            Strategy is in there. It just shows up as decisions rather than a deck.
            And we do the work those decisions call for instead of handing it back to
            you.
          </Body>
        </Section>

        {/* ===== 3 ===== MV-F04, 138 words */}
        <Section id="when-you-need-one" heading="When You Need One, and When You Don't">
          <Body>
            You need one when there&apos;s real money going out every month, more than
            one channel running, and nobody senior deciding where it goes. That&apos;s
            the situation the seat is built for.
          </Body>
          <Body>
            You don&apos;t need one if marketing hasn&apos;t started yet, because
            there&apos;s nothing to lead and you&apos;d be paying someone to wait. You
            don&apos;t need one if you can afford a full-time marketing leader and
            there&apos;s enough work to fill their week, because full-time is better
            when it&apos;s justified. And when a company needs somebody to hold the
            chair for a few months while it runs a search, that&apos;s an interim
            placement, which is a different arrangement from this one.
          </Body>
          <Body>
            If you don&apos;t yet know what&apos;s actually wrong, a seat isn&apos;t
            the first thing you need, and that&apos;s worth an email before it&apos;s
            a hiring decision at all.
          </Body>
        </Section>

        {/* ===== 4 ===== MV-F07, 144 words. No figure and no percentage of any kind. */}
        <Section id="cost" heading="What a Fractional CMO Costs" tinted>
          <Body>
            You&apos;ve already priced the full-time version. That&apos;s usually how
            people get here.
          </Body>
          <Body>
            What it costs depends on a few things you can check yourself: how much
            marketing is already running, how many channels are genuinely live rather
            than just open, whether there&apos;s anyone in-house to work with, and
            what state the measurement is in, because a business that can&apos;t tell
            what&apos;s working needs more hours early. The biggest lever is volume,
            which is how much work is actually getting produced every month.
          </Body>
          <Body>
            The shape is a predictable monthly fee, agreed up front. The one part that
            moves is media: when we&apos;re running your ad spend, that piece is
            charged as a percentage of it. We don&apos;t publish a rate card, because
            a number that fit every business wouldn&apos;t be honest. Tell us
            what&apos;s running now and we&apos;ll give you a real one for yours.
          </Body>
        </Section>

        {/* ===== 5 ===== MV-F08, 144 words. H2 is Mary's Ruling 1 replacement, ships
            per Vega's ruling on this ticket. Vega's locked original, if she overrides:
            "Outsourced CMO, Part-Time CMO, Interim CMO: The Same Job, Different Names" */}
        <Section
          id="other-names"
          heading="Outsourced CMO, Part-Time CMO, Interim CMO: What the Names Actually Mean"
        >
          <Body>
            You&apos;ll see the same job sold as an outsourced CMO, a part-time CMO, a
            virtual or remote CMO, CMO as a service, a fractional marketing director,
            an outsourced marketing director, or a fractional marketing executive. The
            label usually says more about who wrote it than about what gets done, and
            nearly all of them describe one thing, which is senior marketing
            leadership on a share of the hours. Call it a fractional CMO, an
            outsourced CMO or a part-time CMO and you&apos;re describing the seat we
            fill.
          </Body>
          <Body>
            Interim CMO is the real exception. An interim holds the chair close to
            full-time for a set stretch while a company runs a search for a permanent
            hire. That&apos;s a different arrangement and it isn&apos;t what we sell,
            so if that&apos;s what you need, say so on the first call and nobody
            wastes a month finding out.
          </Body>
        </Section>

        <ImageBand image={IMAGE_2} aspectClass="aspect-[16/7] md:aspect-[16/5]" />

        {/* ===== 6 ===== MV-F04, 125 words */}
        <Section id="startups-b2b" heading="Fractional CMO for Startups and B2B" tinted>
          <Body>
            The seat fits a business that already has demand to work with and nobody
            senior shaping it. In a startup that usually means there&apos;s a product
            people want, a founder doing the marketing between everything else, and a
            growth number attached to money that was raised on a plan.
          </Body>
          <Body>
            In B2B and SaaS it usually means a long sales cycle, a small team, and
            marketing that has drifted into supporting the sales calls instead of
            building anything ahead of them.
          </Body>
          <Body>
            It fits less well when almost nothing is running yet, and it works
            differently when the founder is genuinely the best marketer in the company
            and intends to stay that way. That&apos;s worth saying out loud on the
            first call rather than three months in.
          </Body>
        </Section>

        {/* ===== 7 ===== MV-F04. Row 14 fallback shipped: "agreed month to month"
            deleted (Mack's call, unconfirmed contract term). 130 words. */}
        <Section id="how-it-runs" heading="How the Engagement Runs">
          <Body>
            One person owns the direction, and the work it produces runs in the same
            place. That&apos;s{" "}
            <InlineLink href="/insights/your-marketing-feels-busy">what integrated marketing actually means</InlineLink>
            . Brand, budget, creative and measurement answer to the same person, so
            the ads match what the brand promised and the money follows the numbers.
            No scattered tactics. No reactive spending. No fragmented execution.
          </Body>
          <Body>
            It&apos;s ongoing.
          </Body>
          <Body>
            A fractional CMO agency usually means a firm supplying both the seat and
            the hands behind it. Both sit in the same place here, without the layers.
            We keep the operation small on purpose and run the production side with
            modern tools, so the senior hours go to your business instead of to people
            briefing each other. Fewer people between you and the work, and the person
            you hired is the one doing it.
          </Body>
        </Section>

        {/* ===== 8 ===== MV-F09, 104 words. Rebuilt: no enterprise credentials. */}
        <Section id="who-you-get" heading="Who Your Fractional CMO Would Be" tinted>
          <Body>
            Tim Bailey, founder of VBO, based in Coconut Grove. He&apos;s the person
            who would hold the seat, and there&apos;s nobody behind him to hand it to.
          </Body>
          <Body>
            VBO is his own business, not something he does between other things. 10+
            years of marketing experience across industries sits behind it. He runs
            the operation that would run your marketing, so the direction and the
            delivery stay with the same person.
          </Body>
          <Body>
            Our clients are our priority, we are not a high-volume agency. The person
            who sets the direction is the person who runs it, and you won&apos;t be
            handed to somebody junior once the contract is signed.
          </Body>
        </Section>

        {/* ===== 9 ===== 91 words. Contains O1, O2, O3. The page's only named work. */}
        <Section id="who-we-work-with" heading="Who We Work With">
          <Body>
            <InlineLink href="/">VBO Advertising</InlineLink>
            {" "}
            works with founder-led businesses across a lot of industries. Two of them
            have their own pages, because the marketing genuinely differs:{" "}
            <InlineLink href="/professional-services/law-firms">law firms</InlineLink>
            , where what you&apos;re allowed to say is regulated, and{" "}
            <InlineLink href="/professional-services/med-spas">med spas</InlineLink>
            , where the offer moves with the season.
          </Body>
          <Body>
            With IPPE Soccer Tours we rebuilt the brand and the website: new logo, new
            colors, new fonts, new site. Brand and site in the same hands is the range
            this seat has to cover, and it&apos;s the part people mean when they ask
            who&apos;s actually doing the work.
          </Body>
        </Section>

        {/* ===== 10 ===== MV-F10, 86 words */}
        <Section id="where-we-work" heading="Where We Work" tinted>
          <Body>
            We&apos;re in Coconut Grove, and plenty of the work is with Miami
            businesses, which helps on the days somebody wants to sit in a room
            together.
          </Body>
          <Body>
            Everywhere else the seat runs remotely, and for this role that changes
            very little. If your business is elsewhere in the country, the week looks
            the same and the only real difference is the time zone. Raise the distance
            on the first email if it worries you. It rarely changes the answer, and
            when it would, we say so early.
          </Body>
        </Section>

        {/* ===== 11 ===== FAQ. Visible strings and FAQPage strings are the same
            objects, so parity cannot drift. */}
        <Section id="faq" heading="Common Questions" label="Frequently Asked Questions">
          <div className="space-y-8 max-w-3xl">
            {FAQ.map((item) => (
              <div
                key={item.question}
                className="border-l-2 border-[var(--color-vbo-gold)]/30 pl-6"
              >
                <h3 className="font-headline text-[20px] md:text-[22px] font-bold uppercase text-[var(--color-vbo-gold)] leading-[1.2] mb-3 tracking-wide">
                  {item.question}
                </h3>
                <FaqAnswer item={item} />
              </div>
            ))}
          </div>
        </Section>

        {/* ===== CLOSE ===== O6 sits one line above, so the CTA is last.
            MV-F11 is 34 words. One conversion path only (D4: email version). */}
        <section className="px-6 pb-20 md:pb-28">
          <div className="max-w-[1200px] mx-auto">
            <p className="font-body text-[16px] text-[var(--color-vbo-egg)] opacity-60 leading-[26px] max-w-3xl mb-8">
              If you&apos;d like more of how we think about marketing first,
              there&apos;s{" "}
              <InlineLink href="/insights">more from us</InlineLink>
              .
            </p>
            <p className="font-body text-[18px] text-[var(--color-vbo-egg)] leading-[28px] max-w-3xl">
              Tell us what&apos;s running now and who&apos;s doing it, and we&apos;ll
              tell you whether a fractional CMO is the right answer for your business,
              including if it isn&apos;t. Email{" "}
              <InlineLink href="mailto:hello@vboadv.com">hello@vboadv.com</InlineLink>
              {" "}
              and we&apos;ll start there.
            </p>
          </div>
        </section>

        <div className="h-16" />
      </main>
    </>
  );
}
