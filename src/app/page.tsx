import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Bestsellers, Manifesto } from "@/components/home/bestsellers";
import { Story } from "@/components/home/story";
import { Why } from "@/components/home/why";
import { Testimonials } from "@/components/home/testimonials";
import { Gallery } from "@/components/home/gallery";
import { FinalCta } from "@/components/home/final-cta";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Ignite Wax — Premium Hand-Poured Soy Candles",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

/** Organization + WebSite structured data for rich results. */
function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/hero-serenity.jpg`,
    description: siteConfig.description,
    sameAs: [],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <div className="pb-4">
        <Hero />
        <Bestsellers />
        <Manifesto />
        <Story />
        <Why />
        <Testimonials />
        <Gallery />
        <FinalCta />
      </div>
    </>
  );
}
