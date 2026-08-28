import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About DevSoft",
  description: "DevSoft is a Nagpur-based technology company building secure software for investigation and operations.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="section-pad">
      <div className="container-shell max-w-3xl">
        <p className="eyebrow">About</p>
        <h1 className="mt-3 text-4xl font-semibold text-ice">DevSoft</h1>
        <p className="mt-5 text-mist leading-relaxed">
          DevSoft is a technology company based in Nagpur, India. We develop secure software products and related
          engineering services for digital investigation, intelligence analysis, law-enforcement forensics, field
          operations, and the administrative systems that support those missions.
        </p>
        <p className="mt-4 text-mist leading-relaxed">
          The current public product set includes Nigrani (IPDR forensic analysis), Talash Gateway (authorised
          subscriber information access), EMS, and Task Master / Tapal, together with TraceLens and KartvyaNama as
          products being introduced on this site.
        </p>
        <p className="mt-4 text-mist leading-relaxed">
          We do not publish client lists, officer names, or operational case studies on the public website.
        </p>
        <address className="mt-10 not-italic text-sm text-mist">
          <div className="text-ice">{siteConfig.name}</div>
          <div>{siteConfig.address.line1}</div>
          <div>
            {siteConfig.address.city} {siteConfig.address.postalCode}, {siteConfig.address.region},{" "}
            {siteConfig.address.country}
          </div>
          <div className="mt-3">{siteConfig.email}</div>
          <p className="mt-2 text-amber">{siteConfig.phone.note}</p>
        </address>
      </div>
    </div>
  );
}
