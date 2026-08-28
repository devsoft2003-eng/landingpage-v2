import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IntelligenceVisual } from "@/components/home/intelligence-visual";
import { CapabilityStrip } from "@/components/home/capability-strip";
import { FeaturedProducts } from "@/components/home/featured-products";
import { WhyDevSoft } from "@/components/home/why-devsoft";
import { SolutionsPreview } from "@/components/home/solutions-preview";
import { SecurityPreview } from "@/components/home/security-preview";
import { ProductShowcase } from "@/components/home/product-showcase";
import { AboutPreview } from "@/components/home/about-preview";
import { ContactCta } from "@/components/home/contact-cta";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "DevSoft | Secure Technology & Digital Investigation Solutions",
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-backdrop" />
        <div className="container-shell relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="eyebrow">Secure enterprise systems</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ice md:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-mist md:text-lg">{siteConfig.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/products">
                  Explore Products <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Contact DevSoft</Link>
              </Button>
            </div>
          </div>
          <IntelligenceVisual />
        </div>
      </section>
      <CapabilityStrip />
      <FeaturedProducts />
      <WhyDevSoft />
      <SolutionsPreview />
      <SecurityPreview />
      <ProductShowcase />
      <AboutPreview />
      <ContactCta />
    </>
  );
}
