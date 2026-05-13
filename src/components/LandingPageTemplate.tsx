"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { type VerticalData, BOOKING_URL, TIM_EMAIL } from "@/lib/verticals";
import { trackCTAClick, getBookingUrlWithUTM } from "./GA4Tracker";

interface Props {
  vertical: VerticalData;
}

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const STAGGER_PARENT = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const ENTER_TRANSITION = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

const VIEWPORT_ONCE = { once: true, margin: "-80px" };

function CTAButton({
  vertical,
  label,
  bookingUrl,
}: {
  vertical: string;
  label: string;
  bookingUrl: string;
}) {
  return (
    <a
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCTAClick(label, vertical)}
      className="inline-block font-mono text-xs uppercase tracking-[0.18em] border border-[var(--color-vbo-gold)] text-[var(--color-vbo-egg)] px-8 py-3 hover:bg-[var(--color-vbo-gold)] hover:text-[var(--color-vbo-black)] transition-colors duration-200"
    >
      Book a 30-Minute Call
    </a>
  );
}

function StockImage({
  src,
  alt,
  direction,
  mood,
  aspectClass,
  applyFilter,
}: {
  src?: string;
  alt?: string;
  direction: string;
  mood: string;
  aspectClass: string;
  applyFilter?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative w-full ${aspectClass} overflow-hidden`}>
        <Image
          src={src}
          alt={alt || ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        {applyFilter && (
          <>
            <div
              className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundSize: "150px 150px",
              }}
            />
            <div className="absolute inset-0 bg-[var(--color-vbo-black)] opacity-[0.18] pointer-events-none" />
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${aspectClass} bg-[var(--color-vbo-graphite)] border border-[var(--color-vbo-graphite)] overflow-hidden`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-vbo-gold)] mb-4">
          Stock Image Placeholder
        </span>
        <p className="text-sm font-body text-[var(--color-vbo-egg)] opacity-50 max-w-md leading-relaxed">
          {direction}
        </p>
        <p className="text-xs font-body text-[var(--color-vbo-egg)] opacity-30 mt-2 italic">
          Mood: {mood}
        </p>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-vbo-gold)] opacity-40" />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[12px] uppercase tracking-[3.6px] text-[var(--color-vbo-gold)] block mb-6">
      {children}
    </span>
  );
}

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
            className="h-12 w-auto"
            priority
          />
        </a>

        <a
          href="/"
          className="justify-self-center font-mono text-sm md:text-base text-[#F2EDE4] tracking-[0.2em] uppercase transition-colors duration-200 relative group whitespace-nowrap hover:text-[#B8962E]"
        >
          Home
          <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#B8962E]/40 group-hover:bg-[#B8962E] transition-colors duration-300" />
        </a>

        <div className="justify-self-end" aria-hidden="true" />
      </div>
    </nav>
  );
}

function StickyScrollCTA({
  bookingUrl,
  vertical,
}: {
  bookingUrl: string;
  vertical: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroCTA = document.querySelector("[data-hero-cta]");
    if (!heroCTA) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroCTA);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-[var(--color-vbo-black)] border-t border-[var(--color-vbo-graphite)] px-6 py-3">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-vbo-egg)] opacity-60 hidden sm:block">
            Ready to talk?
          </span>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick("sticky-scroll-cta", vertical)}
            className="block sm:inline-block w-full sm:w-auto font-mono text-xs uppercase tracking-[0.18em] border border-[var(--color-vbo-gold)] text-[var(--color-vbo-egg)] px-8 py-3 text-center hover:bg-[var(--color-vbo-gold)] hover:text-[var(--color-vbo-black)] transition-colors duration-200"
          >
            Book a 30-Minute Call
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LandingPageTemplate({ vertical }: Props) {
  const searchParams = useSearchParams();
  const bookingUrl = getBookingUrlWithUTM(BOOKING_URL, searchParams);

  return (
    <>
      <NavBar />
      <StickyScrollCTA bookingUrl={bookingUrl} vertical={vertical.slug} />

      <main className="min-h-screen font-body text-[18px] leading-[28px] pt-20">
        {/* ===== HERO ===== */}
        <section className="relative px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <motion.div
            className="max-w-[1200px] mx-auto"
            variants={STAGGER_PARENT}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={FADE_UP} transition={ENTER_TRANSITION}>
              <SectionLabel>VBO Advertising</SectionLabel>
            </motion.div>
            <motion.h1
              variants={FADE_UP}
              transition={ENTER_TRANSITION}
              className="font-headline text-[40px] md:text-[64px] lg:text-[80px] font-black uppercase text-[var(--color-vbo-white)] leading-[0.92] max-w-4xl mb-8"
            >
              {vertical.hero.headline}
            </motion.h1>
            <motion.p
              variants={FADE_UP}
              transition={ENTER_TRANSITION}
              className="font-body text-[18px] md:text-[20px] text-[var(--color-vbo-egg)] max-w-2xl mb-4 leading-[28px]"
            >
              {vertical.hero.subheadline}
            </motion.p>
            <motion.p
              variants={FADE_UP}
              transition={ENTER_TRANSITION}
              className="font-body text-[18px] text-[var(--color-vbo-egg)] opacity-70 max-w-2xl mb-10 leading-[28px]"
            >
              {vertical.hero.body}
            </motion.p>
            <motion.div
              variants={FADE_UP}
              transition={ENTER_TRANSITION}
              className="flex flex-col sm:flex-row items-start gap-4"
              data-hero-cta
            >
              <CTAButton
                vertical={vertical.slug}
                label="hero-cta"
                bookingUrl={bookingUrl}
              />
              <a
                href="#how-we-work"
                className="inline-block font-mono text-xs uppercase tracking-[0.18em] border border-[var(--color-vbo-egg)] border-opacity-30 text-[var(--color-vbo-egg)] px-8 py-3 hover:border-[var(--color-vbo-gold)] hover:text-[var(--color-vbo-gold)] transition-colors duration-200"
              >
                See How We Work
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ===== STOCK IMAGE #1 ===== */}
        <section className="px-6 py-8">
          <motion.div
            className="max-w-[1200px] mx-auto"
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            transition={ENTER_TRANSITION}
          >
            <StockImage
              src={vertical.image1.src}
              alt={vertical.image1.alt}
              direction={vertical.image1.direction}
              mood={vertical.image1.mood}
              aspectClass="aspect-[16/7] md:aspect-[16/6]"
              applyFilter={true}
            />
          </motion.div>
        </section>

        {/* ===== PAIN POINTS ===== */}
        <section className="px-6 py-16 md:py-24 lg:py-[120px] bg-[var(--color-vbo-graphite)]">
          <motion.div
            className="max-w-[1200px] mx-auto"
            variants={STAGGER_PARENT}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.div variants={FADE_UP} transition={ENTER_TRANSITION}>
              <SectionLabel>The Problem</SectionLabel>
            </motion.div>
            <motion.h2
              variants={FADE_UP}
              transition={ENTER_TRANSITION}
              className="font-headline text-[36px] md:text-[56px] font-black uppercase text-[var(--color-vbo-white)] leading-[1] mb-12"
            >
              Sound Familiar?
            </motion.h2>
            <motion.div
              variants={STAGGER_PARENT}
              className="space-y-6 max-w-3xl"
            >
              {vertical.painPoints.map((point, i) => (
                <motion.div
                  key={i}
                  variants={FADE_UP}
                  transition={ENTER_TRANSITION}
                  className="flex items-start gap-4"
                >
                  <span className="shrink-0 w-2 h-2 mt-2.5 bg-[var(--color-vbo-gold)] rounded-full" />
                  <p className="font-body text-[18px] text-[var(--color-vbo-egg)] opacity-90 leading-[28px] italic">
                    &ldquo;{point}&rdquo;
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ===== WHAT WE DO ===== */}
        <section className="px-6 py-16 md:py-24 lg:py-[120px]">
          <motion.div
            className="max-w-[1200px] mx-auto"
            variants={STAGGER_PARENT}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.div variants={FADE_UP} transition={ENTER_TRANSITION}>
              <SectionLabel>Our Services</SectionLabel>
            </motion.div>
            <motion.h2
              variants={FADE_UP}
              transition={ENTER_TRANSITION}
              className="font-headline text-[36px] md:text-[56px] font-black uppercase text-[var(--color-vbo-white)] leading-[1] mb-12"
            >
              {vertical.whatWeDo.header}
            </motion.h2>
            <motion.div
              variants={STAGGER_PARENT}
              className="grid md:grid-cols-2 gap-8 lg:gap-12"
            >
              {vertical.whatWeDo.services.map((service, i) => (
                <motion.div
                  key={i}
                  variants={FADE_UP}
                  transition={ENTER_TRANSITION}
                  className="space-y-3"
                >
                  <h3 className="font-headline text-[28px] font-black uppercase text-[var(--color-vbo-gold)] leading-[1]">
                    {service.title}
                  </h3>
                  <p className="font-body text-[18px] text-[var(--color-vbo-egg)] opacity-70 leading-[28px]">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ===== STOCK IMAGE #2 ===== */}
        <section className="px-6 py-8">
          <motion.div
            className="max-w-[1200px] mx-auto"
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            transition={ENTER_TRANSITION}
          >
            <StockImage
              src={vertical.image2.src}
              alt={vertical.image2.alt}
              direction={vertical.image2.direction}
              mood={vertical.image2.mood}
              aspectClass="aspect-[16/7] md:aspect-[16/5]"
            />
          </motion.div>
        </section>

        {/* ===== HOW WE WORK ===== */}
        <section
          id="how-we-work"
          className="px-6 py-16 md:py-24 lg:py-[120px] bg-[var(--color-vbo-graphite)]"
        >
          <motion.div
            className="max-w-[1200px] mx-auto"
            variants={STAGGER_PARENT}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.div variants={FADE_UP} transition={ENTER_TRANSITION}>
              <SectionLabel>The Process</SectionLabel>
            </motion.div>
            <motion.h2
              variants={FADE_UP}
              transition={ENTER_TRANSITION}
              className="font-headline text-[36px] md:text-[56px] font-black uppercase text-[var(--color-vbo-white)] leading-[1] mb-12"
            >
              Our Process
            </motion.h2>
            <motion.div
              variants={STAGGER_PARENT}
              className="grid md:grid-cols-3 gap-8 lg:gap-12"
            >
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description:
                    "We learn your business, your goals, and where the gaps are. No assumptions.",
                },
                {
                  step: "02",
                  title: "Strategy",
                  description:
                    "We build a clear plan. You approve it before anything moves forward.",
                },
                {
                  step: "03",
                  title: "Execution",
                  description:
                    "We implement, measure, and refine. You see results, not just reports.",
                },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  variants={FADE_UP}
                  transition={ENTER_TRANSITION}
                  className="space-y-4"
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--color-vbo-gold)]">
                    {item.step}
                  </span>
                  <h3 className="font-headline text-[32px] font-black uppercase text-[var(--color-vbo-white)] leading-[1]">
                    {item.title}
                  </h3>
                  <p className="font-body text-[18px] text-[var(--color-vbo-egg)] opacity-70 leading-[28px]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ===== SOCIAL PROOF ===== */}
        <section className="px-6 py-16 md:py-24 lg:py-[120px]">
          <motion.div
            className="max-w-[1200px] mx-auto"
            variants={STAGGER_PARENT}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.div variants={FADE_UP} transition={ENTER_TRANSITION}>
              <SectionLabel>Why VBO</SectionLabel>
            </motion.div>
            <motion.h2
              variants={FADE_UP}
              transition={ENTER_TRANSITION}
              className="font-headline text-[36px] md:text-[56px] font-black uppercase text-[var(--color-vbo-white)] leading-[1] mb-12"
            >
              Built on Experience
            </motion.h2>
            <motion.div variants={STAGGER_PARENT} className="space-y-6 max-w-3xl">
              {[
                "10+ years of marketing experience across industries",
                "Former client portfolio includes McDonald's, Royal Caribbean, Formula E",
                "Based in Miami. Built for South Florida businesses.",
                ...vertical.socialProofAdditional,
              ].map((proof, i) => (
                <motion.div
                  key={i}
                  variants={FADE_UP}
                  transition={ENTER_TRANSITION}
                  className="flex items-start gap-4"
                >
                  <span className="shrink-0 w-2 h-2 mt-2.5 bg-[var(--color-vbo-gold)] rounded-full" />
                  <p className="font-body text-[18px] text-[var(--color-vbo-egg)] leading-[28px]">
                    {proof}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ===== FAQ ===== */}
        {vertical.faq && vertical.faq.length > 0 && (
          <section className="px-6 py-16 md:py-24 lg:py-[120px]">
            <motion.div
              className="max-w-[1200px] mx-auto"
              variants={STAGGER_PARENT}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
            >
              <motion.div variants={FADE_UP} transition={ENTER_TRANSITION}>
                <SectionLabel>Frequently Asked Questions</SectionLabel>
              </motion.div>
              <motion.h2
                variants={FADE_UP}
                transition={ENTER_TRANSITION}
                className="font-headline text-[36px] md:text-[56px] font-black uppercase text-[var(--color-vbo-white)] leading-[1] mb-12"
              >
                Common Questions
              </motion.h2>
              <motion.div variants={STAGGER_PARENT} className="space-y-8 max-w-3xl">
                {vertical.faq.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={FADE_UP}
                    transition={ENTER_TRANSITION}
                    className="border-l-2 border-[var(--color-vbo-gold)]/30 pl-6"
                  >
                    <h3 className="font-headline text-[20px] md:text-[22px] font-bold uppercase text-[var(--color-vbo-gold)] leading-[1.2] mb-3 tracking-wide">
                      {item.question}
                    </h3>
                    <p className="font-body text-[18px] text-[var(--color-vbo-egg)] opacity-80 leading-[28px]">
                      {item.answer}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </section>
        )}

        {/* ===== ABOUT TIM ===== */}
        <section className="px-6 py-16 md:py-24 lg:py-[120px] bg-[var(--color-vbo-graphite)]">
          <motion.div
            className="max-w-[1200px] mx-auto"
            variants={STAGGER_PARENT}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.div variants={FADE_UP} transition={ENTER_TRANSITION}>
              <SectionLabel>The Founder</SectionLabel>
            </motion.div>
            <motion.h2
              variants={FADE_UP}
              transition={ENTER_TRANSITION}
              className="font-headline text-[36px] md:text-[56px] font-black uppercase text-[var(--color-vbo-white)] leading-[1] mb-10"
            >
              Who You Will Be Working With
            </motion.h2>
            <div className="flex flex-col md:flex-row gap-10 lg:gap-14 items-start">
              <motion.div
                variants={FADE_UP}
                transition={ENTER_TRANSITION}
                className="shrink-0 relative w-full max-w-[240px] md:max-w-[280px]"
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/headshot.jpg"
                    alt="Tim Bailey, Founder of VBO Advertising"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 80vw, 280px"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#B8962E]/25 pointer-events-none" />
              </motion.div>
              <motion.div
                variants={FADE_UP}
                transition={ENTER_TRANSITION}
                className="space-y-4"
              >
                <p className="font-body text-[18px] text-[var(--color-vbo-egg)] opacity-90 leading-[28px] max-w-2xl">
                  Tim Bailey is the founder of VBO Advertising, a marketing
                  consultancy in Miami. VBO sits between a strategy firm and a
                  full-service agency: we define the direction, then help you
                  execute it. Our clients are not the biggest companies. They are
                  the most serious ones.
                </p>
                <div className="space-y-1">
                  <p className="font-body font-semibold text-[var(--color-vbo-white)]">
                    Tim Bailey
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-vbo-egg)] opacity-50">
                    Founder, VBO Advertising
                  </p>
                  <a
                    href={`mailto:${TIM_EMAIL}`}
                    className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-vbo-gold)] hover:text-[var(--color-vbo-gold-light)] transition-colors"
                  >
                    {TIM_EMAIL}
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ===== BOTTOM CTA ===== */}
        <section className="px-6 py-20 md:py-28">
          <motion.div
            className="max-w-[1200px] mx-auto text-center"
            variants={STAGGER_PARENT}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.h2
              variants={FADE_UP}
              transition={ENTER_TRANSITION}
              className="font-headline text-[36px] md:text-[56px] lg:text-[72px] font-black uppercase text-[var(--color-vbo-white)] leading-[0.92] mb-6"
            >
              Let Us Take a Look
            </motion.h2>
            <motion.p
              variants={FADE_UP}
              transition={ENTER_TRANSITION}
              className="font-body text-[18px] text-[var(--color-vbo-egg)] opacity-70 max-w-xl mx-auto mb-10 leading-[28px]"
            >
              Book a free 30-minute call. We will share a few specific
              observations about your firm&apos;s marketing and answer questions.
              No pitch, no pressure.
            </motion.p>
            <motion.div
              variants={FADE_UP}
              transition={ENTER_TRANSITION}
              className="flex flex-col items-center gap-4"
            >
              <CTAButton
                vertical={vertical.slug}
                label="bottom-cta"
                bookingUrl={bookingUrl}
              />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-vbo-egg)] opacity-40 mt-2">
                Or email Tim directly at{" "}
                <a
                  href={`mailto:${TIM_EMAIL}`}
                  className="text-[var(--color-vbo-gold)] hover:text-[var(--color-vbo-gold-light)] transition-colors"
                >
                  {TIM_EMAIL}
                </a>
              </p>
            </motion.div>
          </motion.div>
        </section>

        <div className="h-16" />
      </main>
    </>
  );
}
