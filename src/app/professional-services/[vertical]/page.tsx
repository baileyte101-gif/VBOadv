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

export default function VerticalPage({ params }: Props) {
  const { vertical: slug } = params;
  const vertical = verticals[slug];

  if (!vertical) notFound();

  return (
    <>
      <Suspense fallback={null}>
        <GA4PageTracker />
      </Suspense>
      <Suspense fallback={null}>
        <LandingPageTemplate vertical={vertical} />
      </Suspense>
    </>
  );
}
