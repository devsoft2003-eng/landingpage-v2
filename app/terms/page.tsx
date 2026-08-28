import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms of Use",
  description: "Terms for using the DevSoft website and requesting products or services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="section-pad">
      <div className="container-shell max-w-3xl text-sm leading-relaxed text-mist">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold text-ice">Terms of Use</h1>
        <p className="mt-2 text-xs">Last updated 24 August 2026. Placeholders remain where legal counsel must confirm wording.</p>
        <h2 className="mt-8 text-lg font-semibold text-ice">Website</h2>
        <p className="mt-2">
          This site describes DevSoft products and services. It does not create a licence to use any product. Product
          licences, if any, are issued separately.
        </p>
        <h2 className="mt-6 text-lg font-semibold text-ice">Authorised use</h2>
        <p className="mt-2">
          Investigation and forensic products are intended for authorised organisational use. You must not use this
          website or DevSoft software to attempt unauthorised access to systems or data.
        </p>
        <h2 className="mt-6 text-lg font-semibold text-ice">Content</h2>
        <p className="mt-2">
          Product pages distinguish confirmed information from items pending confirmation. Do not treat placeholder
          sections as specifications.
        </p>
        <h2 className="mt-6 text-lg font-semibold text-ice">Liability</h2>
        <p className="mt-2">
          Limitation of liability, governing law, and dispute resolution clauses require confirmation by DevSoft and
          are not stated as final on this page.
        </p>
      </div>
    </div>
  );
}
