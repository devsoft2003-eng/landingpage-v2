import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export function ContactCta() {
  return (
    <section className="section-pad">
      <div className="container-shell overflow-hidden rounded-[32px] border border-cyan/20 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.16),transparent_42%),linear-gradient(180deg,#111a2e,#0a1020)] px-8 py-14 text-center">
        <p className="eyebrow justify-center">Contact</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold text-ice md:text-5xl">
          Let’s build technology for your mission.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-mist">
          Whether you need a demonstration of TraceLens or Nigrani, a registered KartvyaNama package, or a scoped
          engineering discussion — start with a professional enquiry.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/contact">Contact DevSoft</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
