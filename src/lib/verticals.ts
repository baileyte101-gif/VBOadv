export interface VerticalData {
  slug: string;
  ogTitle: string;
  ogDescription: string;
  hero: {
    headline: string;
    subheadline: string;
    body: string;
  };
  image1: {
    direction: string;
    mood: string;
    src?: string;
    alt?: string;
  };
  painPoints: string[];
  whatWeDo: {
    header: string;
    services: { title: string; description: string }[];
  };
  image2: {
    direction: string;
    mood: string;
    src?: string;
    alt?: string;
  };
  socialProofAdditional: string[];
  // Optional SEO content section (H2 + body) rendered between the Social Proof
  // and FAQ sections. Used by law-firms to target "ai marketing for law firms"
  // (Phase 1, Vega 2026-07-22). Omit for verticals that do not need it.
  aiMarketing?: {
    heading: string;
    body: string;
  };
  faq?: {
    question: string;
    answer: string;
  }[];
  // Body-level internal links (SEO). Rendered only when present: `home` as a
  // short section between FAQ and the founder block, `insights` inside the
  // bottom CTA. Hrefs are fixed in the template ("/" and "/insights").
  crossLinks?: {
    home?: { before: string; linkText: string; after: string };
    insights?: { before: string; linkText: string; after: string };
  };
  // Founder headshot alt override (SEO). Template falls back to the generic
  // "Tim Bailey, Founder of VBO Advertising" when absent.
  founderAlt?: string;
}

export const verticals: Record<string, VerticalData> = {
  "law-firms": {
    slug: "law-firms",
    ogTitle: "Marketing for Law Firms in Miami | VBO Advertising",
    ogDescription:
      "VBO helps boutique law firms in Miami turn strong credentials into consistent client growth. Book a free 30-minute call.",
    hero: {
      headline: "Marketing for Law Firms in Miami",
      subheadline:
        "Your firm's reputation deserves marketing that keeps up. Based in Coconut Grove, VBO helps boutique law firms in Miami turn strong credentials into a predictable source of new clients.",
      body: "Most law firms rely on referrals and reputation. That works until it plateaus. VBO builds the marketing infrastructure that makes sure the right clients find you before they find your competitor down the street.",
    },
    image1: {
      direction:
        "Modern law office interior, architectural detail of a professional building, or abstract shot suggesting precision and structure. No gavels, no generic courtroom shots.",
      mood: "Confident, established, premium.",
      src: "/images/law-firms/Image 1/law-firms-hero-band.png",
      alt: "Modern boutique law firm reception in South Florida at golden hour, brushed gold accent lighting against deep walnut paneling",
    },
    painPoints: [
      "Your website looks credible but is not generating leads on its own",
      "You have built your practice on referrals, but the pipeline is unpredictable month to month",
      "You have tried a marketing agency before and the results did not match the pitch",
      "Competing firms in your market are showing up on Google and you are not",
      "You know you need to invest in digital marketing but do not know where the money should go first",
    ],
    whatWeDo: {
      header: "Marketing That Actually Works for Law Firms",
      services: [
        {
          title: "Strategy + Positioning",
          description:
            "We define your market position before spending a dollar. Who you serve best, what makes your firm different, and how to communicate that clearly to the clients you actually want.",
        },
        {
          title: "Digital Presence",
          description:
            "A website that ranks, converts, and reflects the quality of your legal work. Not a template. A system built to generate consultations.",
        },
        {
          title: "Paid Media",
          description:
            "Targeted Google & Meta Ad campaigns that put your firm in front of people searching for exactly the legal help you provide. Every dollar tracked.",
        },
        {
          title: "Brand + Creative",
          description:
            "Visual identity and messaging that builds trust before the first phone call. From your website to your business card to your Google profile.",
        },
      ],
    },
    image2: {
      direction:
        "Detail shot: a well-designed office space, a South Florida urban/architectural scene, or a stylized workspace. Not a person at a desk staring at a laptop.",
      mood: "Polished, intentional, South Florida.",
      src: "/images/law-firms/Image 2/law-firms-secondary-band.png",
      alt: "Downtown Miami office tower facade at twilight, brushed bronze louvers and a gold reflection against a dusk navy sky",
    },
    socialProofAdditional: [
      "We understand the ethics of legal marketing, including Florida Bar Rule 4-7 advertising requirements, and we build every campaign to stay inside them",
      "Our approach is built for firms that compete on quality, not volume",
    ],
    aiMarketing: {
      heading: "AI Marketing for Law Firms",
      body: "Legal marketing has a volume problem. Intake, content, review responses, and campaign reporting all have to happen constantly, and most firms either let them slip or pay associate rates for work that should never touch an associate. We use AI on our side of the work to carry that load, with a senior strategist reviewing everything before it goes out. Your firm gets the output of a much larger team without the overhead of one, and nothing reaches the public that a person has not read.",
    },
    faq: [
      {
        question: "Does VBO understand Florida Bar advertising rules?",
        answer:
          "Yes. We work specifically with law firms in South Florida and design marketing programs that comply with Florida Bar Rule 4-7 advertising regulations. Our process includes a compliance review on any client-facing content before it ships.",
      },
      {
        question: "Do you work with solo attorneys or only firms with multiple attorneys?",
        answer:
          "We work with both. Most of our clients are boutique firms with 2 to 15 attorneys, but solo practices with a strong specialty and growth ambition are a great fit. We do not work with firms that compete on volume.",
      },
      {
        question: "Can you help with our Google Business Profile and reviews?",
        answer:
          "Yes. Local SEO including Google Business Profile optimization, citation building, and review acquisition strategy is part of our digital presence work for law firms. Local pack visibility drives a significant share of new client inquiries for South Florida law firms.",
      },
      {
        question: "How much does law firm marketing cost?",
        answer:
          "Cost depends on the mix your firm needs. Strategy, digital presence, and paid media are priced differently, and a solo practice needs a different system than a 15-attorney firm. We do not publish blanket packages because a generic number would not be honest. Book a 30-minute call and we will give you a real range for your firm, not a teaser rate.",
      },
      {
        question: "How long before we see results?",
        answer:
          "Paid media can start generating qualified consultations within the first few weeks. Search visibility and reputation-driven growth take longer, usually 3 to 6 months to compound. We tell you this up front so the timeline never surprises you.",
      },
      {
        question: "Are you only based in Miami, or do you work with firms elsewhere?",
        answer:
          "We're based in Coconut Grove, and most of our law firm clients are right here in Miami. We also work with boutique firms across South Florida, including Fort Lauderdale and West Palm Beach, and take on select firms outside the region when the fit is right.",
      },
      {
        question: "Do you use AI for law firm marketing?",
        answer:
          "Yes, on our side of the work. We use it for research, drafting, analysis and reporting, and a senior strategist reviews every piece before it reaches you or the public. It never publishes on its own. That matters more in legal than in most industries, because Florida Bar Rule 4-7 advertising requirements apply to everything your firm puts out, and compliance is not something we hand to a machine.",
      },
    ],
    crossLinks: {
      home: {
        before: "This is how ",
        linkText: "VBO Advertising",
        after: " builds marketing systems for every client, not just law firms.",
      },
      insights: {
        before: "Read more about how we think about marketing strategy on the ",
        linkText: "VBO Insights blog",
        after: ".",
      },
    },
    founderAlt:
      "Tim Bailey, founder of VBO Advertising, a Coconut Grove, Miami marketing consultancy working with boutique law firms",
  },

  "dental-practices": {
    slug: "dental-practices",
    ogTitle:
      "Marketing for Dental Practices in South Florida | VBO Advertising",
    ogDescription:
      "VBO helps independent dental practices attract more of the right patients through smarter marketing. Book a free call.",
    hero: {
      headline:
        "Your Practice Deserves Marketing as Good as the Care You Provide",
      subheadline:
        "VBO helps independent dental practices in South Florida attract better patients, fill schedules, and build a brand that reflects the quality of their work.",
      body: "Most dental practices either overspend on marketing that does not convert or rely entirely on insurance directories and word of mouth. VBO builds the system in between: clear positioning, strong digital presence, and campaigns that bring the right patients through the door.",
    },
    image1: {
      direction:
        "Modern, clean dental office interior. Bright, well-designed clinical space. Or an abstract/architectural shot of a modern medical building exterior. No close-ups of teeth.",
      mood: "Clean, modern, clinical but warm.",
    },
    painPoints: [
      "Your website looks fine but patients are booking with the practice down the street instead",
      "You are spending money on marketing but have no idea what is actually working",
      "Your Google reviews are strong but your website does not convert visitors into appointments",
      "Insurance-driven patients fill your schedule but your high-value cosmetic and implant cases are inconsistent",
      "You have outgrown your current marketing but do not know what the next step looks like",
    ],
    whatWeDo: {
      header: "Marketing That Actually Works for Dental Practices",
      services: [
        {
          title: "Strategy + Positioning",
          description:
            "We help you define what kind of practice you want to be known for. General, cosmetic, implants, family: your marketing should attract the patients you actually want to see.",
        },
        {
          title: "Digital Presence",
          description:
            "A website that ranks for the procedures and neighborhoods that matter most. Built to convert visitors into booked appointments, not just page views.",
        },
        {
          title: "Paid Media",
          description:
            "Google Ads targeting patients actively searching for dental services in your area. We focus spend on your highest-value procedures and track every lead.",
        },
        {
          title: "Brand + Creative",
          description:
            "Photography direction, visual identity, and messaging that makes your practice feel premium, trustworthy, and modern. First impressions happen online now.",
        },
      ],
    },
    image2: {
      direction:
        "Detail shot of a modern waiting room, a clean reception desk, or a South Florida street/building scene. Not clinical equipment.",
      mood: "Welcoming, elevated, professional.",
    },
    socialProofAdditional: [
      "We understand patient acquisition economics and lifetime value by procedure type",
      "Built for practices that compete on quality and patient experience, not lowest price",
    ],
  },

  "med-spas": {
    slug: "med-spas",
    ogTitle: "Medical Spa Marketing in Miami | VBO Advertising",
    ogDescription:
      "VBO helps med spas and aesthetic clinics in Miami build brands that attract high-value clients. Book a free 30-minute call.",
    hero: {
      headline: "Medical Spa Marketing in Miami",
      subheadline:
        "Your clients are searching for you. Make sure they find you first. Based in Coconut Grove, VBO helps med spas and aesthetic clinics in Miami build brands that attract premium clients and fill treatment schedules.",
      body: "The med-aesthetic market in South Florida is crowded. The clinics that win are not always the best at what they do. They are the ones with the clearest brand, the strongest online presence, and a marketing system that works while they are treating patients.",
    },
    image1: {
      direction:
        "Luxurious, modern aesthetic clinic interior. Clean lines, soft lighting, premium materials. Or a beauty/wellness-adjacent lifestyle shot. No before/after shots, no needles or syringes.",
      mood: "Luxurious, aspirational, serene.",
      src: "/images/med-spas/Image 1/med-spas-hero-band.png",
      alt: "Modern med spa treatment room in Miami with soft ambient lighting and premium finishes",
    },
    painPoints: [
      "Your Instagram looks great but it is not translating into booked consultations",
      "You are competing with dozens of med spas in your area and struggling to stand out",
      "Your website does not reflect the premium experience clients get when they walk in",
      "You are relying on Groupon or discount promotions to fill the schedule, which attracts the wrong clients",
      "You know you should be investing in Google Ads and SEO but do not know where to start",
    ],
    whatWeDo: {
      header:
        "Marketing That Actually Works for Med Spas + Aesthetic Clinics",
      services: [
        {
          title: "Strategy + Positioning",
          description:
            "We help you own a position in your market. Whether it is the luxury Botox clinic in Coral Gables or the go-to body contouring practice in Brickell, clarity is what drives premium clients.",
        },
        {
          title: "Digital Presence",
          description:
            "A website that matches the quality of your treatments. Built to rank for high-intent searches, showcase your work, and convert browsers into booked consultations.",
        },
        {
          title: "Paid Media",
          description:
            "Targeted campaigns on Google and Meta that reach people actively researching treatments in your area. We optimize for consultations booked, not impressions.",
        },
        {
          title: "Brand + Creative",
          description:
            "Visual identity, photography direction, and content that positions your clinic as the premium choice. Because in aesthetics, your brand is the product.",
        },
      ],
    },
    image2: {
      direction:
        "A detail shot: luxury product arrangement, modern interior design element, or a South Florida lifestyle scene (palm trees, clean architecture, ocean tones).",
      mood: "Premium, aspirational, South Florida luxury.",
      src: "/images/med-spas/Image 2/med-spas-secondary-band.png",
      alt: "Curated arrangement of premium skincare products on a marble surface with warm Miami light",
    },
    socialProofAdditional: [
      "We understand the aesthetics market: visual branding, consultation-driven funnels, and high-intent local search",
      "We understand the advertising rules for aesthetic treatments, including FTC guidance on before-and-after claims",
      "Built for clinics that want premium clients, not discount shoppers",
    ],
    faq: [
      {
        question: "How much does med spa marketing cost?",
        answer:
          "Cost depends on what your spa actually needs. A single-location practice building its first real digital presence needs a different plan than a multi-location group scaling paid media across markets. We do not publish a flat package because a generic number would not be honest. Book a 30-minute call and we will give you a real range for your business, not a teaser rate.",
      },
      {
        question: "How long before we see results?",
        answer:
          "Paid media can start bringing in qualified consultation requests within the first few weeks. Search visibility and brand-driven bookings take longer, usually 3 to 6 months to compound. We tell you this up front so the timeline never surprises you.",
      },
      {
        question:
          "Do you work with single-location med spas or only multi-location groups?",
        answer:
          "We work with both. Most of our med spa and aesthetic clinic clients run one or two locations and want to compete with the bigger groups without losing what makes them premium. We also take on multi-location practices ready to scale the same disciplined marketing across every location.",
      },
      {
        question: "Can you help with our Google Business Profile and reviews?",
        answer:
          "Yes. Local SEO, including Google Business Profile optimization, citation consistency, and review strategy, is part of our digital presence work for med spas. Most consultation requests start with a local search, so this is one of the hardest-working pieces of the system.",
      },
      {
        question:
          "Do you understand the advertising rules around aesthetic treatments?",
        answer:
          "Yes. Med spa and aesthetic marketing carries real constraints: FTC guidance on before-and-after claims and endorsements, and platform ad policies around injectables and body procedures. We build every campaign to stay inside those lines from the start, not clean it up after a rejected ad.",
      },
      {
        question:
          "Are you only based in Miami, or do you work with med spas elsewhere?",
        answer:
          "We're based in Coconut Grove, and most of our med spa and aesthetic clinic clients are right here in Miami, in neighborhoods like Coral Gables and Brickell. We also work with practices across South Florida, including Fort Lauderdale and West Palm Beach, and take on select clients outside the region when the fit is right.",
      },
    ],
    crossLinks: {
      home: {
        before: "This is how ",
        linkText: "VBO Advertising",
        after:
          " builds marketing systems for every client, not just med spas and aesthetic clinics.",
      },
      insights: {
        before:
          "Read more about how we think about marketing strategy on the ",
        linkText: "VBO Insights blog",
        after: ".",
      },
    },
  },

  "financial-advisors": {
    slug: "financial-advisors",
    ogTitle:
      "Marketing for Financial Advisors in South Florida | VBO Advertising",
    ogDescription:
      "VBO helps independent financial advisors and RIAs attract ideal clients through clear positioning and smart digital strategy. Book a free call.",
    hero: {
      headline:
        "Your Expertise Builds Wealth. Your Marketing Should Build Your Practice.",
      subheadline:
        "VBO helps independent financial advisors and RIAs in South Florida attract the right clients through clear positioning and a digital presence that reflects the quality of your advice.",
      body: "Most financial advisors are excellent at what they do and invisible online. Referrals carry the practice, but they are unpredictable. VBO builds the marketing system that makes sure qualified prospects find you, trust you, and book the first meeting.",
    },
    image1: {
      direction:
        "Sophisticated, professional. Modern office with a view, financial district architecture, a well-designed workspace. No stock photos of charts and graphs, no handshakes.",
      mood: "Trustworthy, sophisticated, established.",
    },
    painPoints: [
      "Your practice runs on referrals, which is great until the pipeline goes quiet for a quarter",
      "Your website exists but you would not send a prospect there to learn about your firm",
      "Younger clients are researching advisors online before they ever pick up the phone, and you are not showing up",
      "You know your firm is different, but your marketing looks exactly like every other advisor in town",
      "You have considered hiring a marketing agency but the ones you have talked to do not understand compliance or your business model",
    ],
    whatWeDo: {
      header: "Marketing That Actually Works for Financial Advisors",
      services: [
        {
          title: "Strategy + Positioning",
          description:
            "We help you define your ideal client profile and build messaging around it. Are you the advisor for tech executives? Business owners planning exits? Young professionals building wealth? Clarity attracts. Vagueness repels.",
        },
        {
          title: "Digital Presence",
          description:
            "A website that builds trust immediately. Clear credentials, a defined investment philosophy, and a frictionless path to scheduling a first meeting. Built to convert, not just inform.",
        },
        {
          title: "Paid Media",
          description:
            "Targeted campaigns on Google and LinkedIn that reach people actively searching for financial guidance in your area or your niche. Compliant, trackable, and focused on qualified leads.",
        },
        {
          title: "Brand + Creative",
          description:
            "A visual identity and content strategy that positions you as the obvious choice for your ideal client. Professional, modern, and distinctly yours.",
        },
      ],
    },
    image2: {
      direction:
        "South Florida cityscape (Brickell skyline, waterfront view), a modern office detail, or an abstract shot suggesting growth and stability. Not Wall Street cliche.",
      mood: "Calm confidence, stability, premium.",
    },
    socialProofAdditional: [
      "We understand the compliance considerations of marketing financial services",
      "Built for advisors who compete on trust and expertise, not lowest fees",
    ],
  },

  "accounting-firms": {
    slug: "accounting-firms",
    ogTitle:
      "Marketing for Accounting Firms in South Florida | VBO Advertising",
    ogDescription:
      "VBO helps independent accounting firms stand out and attract better clients through smart positioning and digital strategy. Book a free call.",
    hero: {
      headline:
        "Great Firms Get Overlooked When Their Marketing Does Not Match Their Work",
      subheadline:
        "VBO helps independent accounting firms in South Florida attract higher-value clients through clear positioning and a digital presence that earns trust before the first conversation.",
      body: "Most accounting firms have a website that checks a box but does not generate business. The firms that grow are the ones that communicate their value clearly, show up when prospects search, and look like the premium choice before anyone picks up the phone. That is what VBO builds.",
    },
    image1: {
      direction:
        "Modern professional environment. Clean workspace, architectural detail, or a polished South Florida office building exterior. Not a calculator and spreadsheet.",
      mood: "Precise, modern, trustworthy.",
    },
    painPoints: [
      "Tax season fills your calendar, but the rest of the year is unpredictable",
      "You want to grow advisory and consulting revenue but your marketing only attracts compliance work",
      "Your website has not been updated in years and you would rather not send prospects to it",
      "Competing firms in your market look more established online, even though your work is stronger",
      "You have relied on referrals and networking for years, and it works, but you know it will not scale",
    ],
    whatWeDo: {
      header: "Marketing That Actually Works for Accounting Firms",
      services: [
        {
          title: "Strategy + Positioning",
          description:
            "We help you define what your firm is known for and who it serves best. Tax planning for business owners? Advisory for startups? Forensic accounting? The clearer you are, the better clients you attract.",
        },
        {
          title: "Digital Presence",
          description:
            "A website that positions your firm as the obvious choice. Built to rank for the services and locations that matter, convert visitors into consultations, and look like a firm that charges what you are worth.",
        },
        {
          title: "Paid Media",
          description:
            "Targeted Google campaigns that reach business owners and individuals actively searching for accounting help in your area. Focused on qualified leads during the seasons and cycles that matter most to your firm.",
        },
        {
          title: "Brand + Creative",
          description:
            "Visual identity and messaging that sets you apart from the sea of sameness in accounting marketing. Professional, sharp, and modern, not generic.",
        },
      ],
    },
    image2: {
      direction:
        "Detail shot: organized modern workspace, a South Florida street scene or building facade, or a clean abstract composition suggesting structure and order.",
      mood: "Organized, elevated, professional.",
    },
    socialProofAdditional: [
      "We understand the seasonality of accounting and how to market around it",
      "Built for firms that want to grow beyond compliance into advisory relationships",
    ],
  },
};

export const verticalSlugs = Object.keys(verticals);

export const BOOKING_URL = "https://calendar.app.google/rzHzc2dM8saJFsfk7";
export const TIM_EMAIL = "tim@vboadv.com";
