import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/download/contact-form";

export const metadata = createMetadata({
  title: "Contact DevSoft",
  description: "Contact DevSoft in Nagpur for product demonstrations, support, and professional enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="section-pad">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 text-4xl font-semibold text-ice">Talk to DevSoft</h1>
          <p className="mt-4 text-sm leading-relaxed text-mist">
            Use this form for business, product, or support enquiries. For authorised agencies, include your department
            name so the right product specialist can respond.
          </p>
          <dl className="mt-8 space-y-3 text-sm">
            <div>
              <dt className="text-mist">Email</dt>
              <dd className="text-ice">{siteConfig.email}</dd>
            </div>
            <div>
              <dt className="text-mist">Location</dt>
              <dd className="text-ice">
                {siteConfig.address.line1}, {siteConfig.address.city} {siteConfig.address.postalCode}
              </dd>
            </div>
            <div>
              <dt className="text-mist">Telephone</dt>
              <dd className="text-amber">{siteConfig.phone.note}</dd>
            </div>
          </dl>
        </div>
        <Suspense fallback={<div className="glass h-96 animate-pulse rounded-3xl" />}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
