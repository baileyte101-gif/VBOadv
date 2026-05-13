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
  faq?: {
    question: string;
    answer: string;
  }[];
}

export const verticals: Record<string, VerticalData> = {
  "law-firms": {
    slug: "law-firms",
    ogTitle: "Marketing for Law Firms in South Florida | VBO Advertising",
    ogDescription:
      "VBO helps boutique law firms turn strong credentials into consistent client growth. Book a free 30-minute call.",
    hero: {
      headline: "Your Firm's Reputation Deserves Marketing That Keeps Up",
      subheadline:
        "VBO helps boutique law firms in South Florida turn strong credentials into a predictable source of new clients.",
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
      "We understand the ethics of legal marketing, including Florida Bar advertising rules",
      "Our approach is built for firms that compete on quality, not volume",
    ],
    faq: [
      {
        question: "Does VBO understand Florida Bar advertising rules?",
        answer:
          "Yes. We work specifically with law firms in South Florida and design marketing programs that comply with Florida Bar Rule 4-7 advertising regulations. Our process includes a compliance review on any client-facing content before it ships.",
      },
      {
        question: "What does law firm marketing typically cost with VBO?",
        answer:
          "Engagements are structured monthly. Strategy-only engagements start around $5,000 per month. Full integrated marketing engagements for boutique law firms range from $7,500 to $15,000 per month based on scope, channels, and creative production needs. We provide a custom proposal after a free 30-minute consultation.",
      },
      {
        question: "How long until we see results from law firm marketing?",
        answer:
          "Paid media drives results within 30 to 60 days. SEO and content programs typically show meaningful organic gains in 3 to 6 months and compound from there. Brand and website work creates immediate trust signals on day one. We set expectations and milestones at the start of every engagement.",
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
        question: "Will I work directly with the founder or a junior account manager?",
        answer:
          "You work directly with Tim Bailey, the founder, and senior operators. We do not have a junior account manager layer between you and the strategists. This is the structural reason we deliver faster than traditional agencies.",
      },
      {
        question: "What does the first 30 days look like with VBO?",
        answer:
          "Week 1: discovery on your firm, current marketing, competitors, and growth goals. Week 2: market positioning workshop and strategy presentation. Weeks 3 and 4: implementation kickoff including any technical setup, brand refinements, and campaign launches. You see direction and momentum within the first month.",
      },
    ],
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
    ogTitle:
      "Marketing for Med Spas + Aesthetic Clinics in South Florida | VBO Advertising",
    ogDescription:
      "VBO helps med spas and aesthetic clinics build brands that attract high-value clients. Book a free call.",
    hero: {
      headline:
        "Your Clients Are Searching for You. Make Sure They Find You First.",
      subheadline:
        "VBO helps med spas and aesthetic clinics in South Florida build brands that attract premium clients and fill treatment schedules.",
      body: "The med-aesthetic market in South Florida is crowded. The clinics that win are not always the best at what they do. They are the ones with the clearest brand, the strongest online presence, and a marketing system that works while they are treating patients.",
    },
    image1: {
      direction:
        "Luxurious, modern aesthetic clinic interior. Clean lines, soft lighting, premium materials. Or a beauty/wellness-adjacent lifestyle shot. No before/after shots, no needles or syringes.",
      mood: "Luxurious, aspirational, serene.",
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
            "Visual identity, photography direction, and content that positions your clinic as the premium choice. Because in aesthetics, your brand IS the product.",
        },
      ],
    },
    image2: {
      direction:
        "A detail shot: luxury product arrangement, modern interior design element, or a South Florida lifestyle scene (palm trees, clean architecture, ocean tones).",
      mood: "Premium, aspirational, South Florida luxury.",
    },
    socialProofAdditional: [
      "We understand the aesthetics market: visual branding, consultation-driven funnels, and high-intent local search",
      "Built for clinics that want premium clients, not coupon hunters",
    ],
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
