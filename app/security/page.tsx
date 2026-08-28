import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Security",
  description:
    "DevSoft’s security-first approach to product design, software distribution, and operational deployments.",
  path: "/security",
});

export default function SecurityPage() {
  return (
    <div className="section-pad">
      <div className="container-shell max-w-3xl">
        <p className="eyebrow">Security</p>
        <h1 className="mt-3 text-4xl font-semibold text-ice">A security-first company posture.</h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-mist">
          <p>
            DevSoft builds software used in investigation, intelligence, and organisational operations. The public
            website explains purpose and value. It does not document internal algorithms, detection signatures, or
            infrastructure diagrams.
          </p>
          <h2 className="text-xl font-semibold text-ice">Product distribution</h2>
          <p>
            Installable packages are not linked as static public files. KartvyaNama, and any future downloadable
            product, is issued through registration, verification, a short-lived token, and a server-side stream from
            private storage.
          </p>
          <h2 className="text-xl font-semibold text-ice">Deployment models</h2>
          <p>
            Where a product supports it, DevSoft can discuss on-premises and offline operation so sensitive material
            does not have to leave an agency network. Nigrani, for example, is documented with both web workstation and
            offline Windows options.
          </p>
          <h2 className="text-xl font-semibold text-ice">What we collect</h2>
          <p>
            Download registration records organisation and contact details so software is issued to identifiable
            requestors. That data is not shown on the public site and is available only to authenticated administrators.
          </p>
          <h2 className="text-xl font-semibold text-ice">What we do not claim here</h2>
          <p>
            This page does not assert specific certifications, encryption product names, or uptime percentages that
            have not been independently confirmed for publication.
          </p>
        </div>
      </div>
    </div>
  );
}
