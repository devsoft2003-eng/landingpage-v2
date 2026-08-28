import Link from "next/link";
import { siteConfig } from "@/config/site";

export function AboutPreview() {
  return (
    <section className="section-pad bg-navy-900/40">
      <div className="container-shell grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="eyebrow">About DevSoft</p>
          <h2 className="mt-3 text-3xl font-semibold text-ice md:text-4xl">
            A Nagpur-based technology company for secure operational software.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist">
            DevSoft develops software for digital investigation, forensic analysis, field operations, and the
            administrative systems that sit around them. The company is based in Nagpur and works with authorised
            organisations that need reliable tools rather than generic enterprise templates.
          </p>
          <Link href="/about" className="mt-6 inline-flex text-sm font-medium text-cyan hover:underline">
            About the company
          </Link>
        </div>
        <div className="rounded-2xl border border-white/10 p-6 text-sm text-mist">
          <div className="text-ice">{siteConfig.address.line1}</div>
          <div>
            {siteConfig.address.city} {siteConfig.address.postalCode}, {siteConfig.address.region}
          </div>
          <div className="mt-4">{siteConfig.email}</div>
        </div>
      </div>
    </section>
  );
}
