import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { verticals, verticalSlugs } from "@/lib/verticals";
import LandingPageTemplate from "@/components/LandingPageTemplate";
import { GA4PageTracker } from "@/components/GA4Tracker";

type Props = {
  params: { vertical: string };
};

export async function generateStaticParams() {
  return verticalSlugs.map((vertical) => ({ vertical }));
}

// Verticals approved for organic indexing. Anything not listed here stays
// noindexed (the page is still reachable, just won't be crawled). When a new
// vertical goes live, add its slug here.
const INDEXABLE_VERTICALS = new Set(["law-firms"]);

const PRODUCTION_HOST = "https://www.vboadv.com";

export function generateMetadata({ params }: Props): Metadata {
  const { vertical: slug } = params;
  const vertical = verticals[slug];

  if (!vertical) return {};

  const isIndexable = INDEXABLE_VERTICALS.has(slug);
  const canonicalUrl = `${PRODUCTION_HOST}/professional-services/${slug}`;

  return {
    title: vertical.ogTitle,
    description: vertical.ogDescription,
    robots: isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    ...(isIndexable && {
      alternates: { canonical: canonicalUrl },
    }),
    openGraph: {
      title: vertical.ogTitle,
      description: vertical.ogDescription,
      type: "website",
      siteName: "VBO Advertising",
      url: canonicalUrl,
    },
  };
}

// Per-vertical Service schema. Hardcoded per-slug (only law-firms is indexable
// today). When another vertical flips indexable, add its entry here.
const SERVICE_SCHEMAS: Record<string, Record<string, unknown>> = {
  "law-firms": {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Marketing for Law Firms in South Florida",
    provider: { "@id": "https://www.vboadv.com/#organization" },
    description:
      "VBO helps boutique law firms in South Florida turn strong credentials into a predictable source of new clients through marketing strategy, paid media, SEO, brand, and creative.",
    serviceType: "Legal Marketing",
    areaServed: [
      { "@type": "City", name: "Miami" },
      { "@type": "City", name: "Fort Lauderdale" },
      { "@type": "City", name: "West Palm Beach" },
    ],
  },
};

const BREADCRUMB_NAMES: Record<string, string> = {
  "law-firms": "Law Firms",
  "dental-practices": "Dental Practices",
  "med-spas": "Med Spas",
  "financial-advisors": "Financial Advisors",
  "accounting-firms": "Accounting Firms",
};

export default function VerticalPage({ params }: Props) {
  const { vertical: slug } = params;
  const vertical = verticals[slug];

  if (!vertical) notFound();

  const serviceSchema = SERVICE_SCHEMAS[slug] ?? null;

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
        name: "Professional Services",
        item: "https://www.vboadv.com/professional-services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: BREADCRUMB_NAMES[slug] ?? slug,
        item: `https://www.vboadv.com/professional-services/${slug}`,
      },
    ],
  };

  const faqSchema =
    vertical.faq && vertical.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: vertical.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Suspense fallback={null}>
        <GA4PageTracker />
      </Suspense>
      <Suspense fallback={null}>
        <LandingPageTemplate vertical={vertical} />
      </Suspense>
    </>
  );
}
