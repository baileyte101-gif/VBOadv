import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import TheProblem from '@/components/TheProblem'
import TheApproach from '@/components/TheApproach'
import HowWeWork from '@/components/HowWeWork'
import Industries from '@/components/Industries'
import About from '@/components/About'
import CTASection from '@/components/CTASection'
import Image from 'next/image'

const heroTickerItems = [
  'EFFICIENCY',
  'ALIGNMENT',
  'GROWTH',
  'CLARITY',
  'STRATEGY',
  'PERFORMANCE',
  'STRUCTURE',
  'DIRECTION',
  'PRECISION',
  'EXECUTION',
  'HUMAN',
]

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Ticker
        items={heroTickerItems}
        textColorClass="text-[#6B6F73]"
        bgClass="bg-[#0D0D0D]"
        speed={30}
      />
      <TheProblem />
      <TheApproach />
      <HowWeWork />
      <Industries />
      <About />
      <CTASection />

      {/* Footer */}
      <footer className="bg-[#0D0D0D] border-t border-[#1C1C1C] py-8 px-8 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Image
            src="/images/logo-transparent.png"
            alt="VBO"
            width={834}
            height={222}
            className="h-8 w-auto"
          />

          <p className="font-mono text-[#6B6F73] text-[10px] tracking-[0.2em] uppercase text-center">
            © 2026 VBO Consulting. Miami, FL. All rights reserved.
          </p>

          <a
            href="mailto:hello@vboadv.com"
            className="font-mono text-[#6B6F73] hover:text-[#B8962E] text-xs tracking-wider transition-colors duration-200"
          >
            hello@vboadv.com
          </a>
        </div>
      </footer>
    </main>
  )
}
