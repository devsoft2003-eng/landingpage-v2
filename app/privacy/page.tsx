import { createMetadata } from "@/lib/seo";

export const metadata = {
  ...createMetadata({
    title: "Privacy Policy",
    description: "How DevSoft handles information collected through this website, including download registration.",
    path: "/privacy",
  }),
};

export default function PrivacyPage() {
  return (
    <Legal
      title="Privacy Policy"
      updated="24 August 2026"
      sections={[
        [
          "Who we are",
          "This website is operated by DevSoft, Shakti Vihar, Koradi Road, Nagpur 440030, India. Contact: contact@dev-soft.in. Legal entity details (CIN, GST, registered office beyond the published address) are placeholders until confirmed.",
        ],
        [
          "Information we collect",
          "If you send an enquiry we store your name, email, optional organisation and phone, enquiry type, and message. If you register to download software we store name, organisation, designation, email, mobile number, city, state, country, purpose, consent, time, IP address, and browser user agent. We do not ask for passwords on public forms.",
        ],
        [
          "Why we collect it",
          "Information provided through download forms is used to maintain download records, understand product adoption, provide product updates or support where applicable, and protect the distribution of DevSoft software. Enquiries are used to respond to you.",
        ],
        [
          "Retention",
          "Retention periods for download and enquiry records should be confirmed against your organisation’s policy. Until then, records are kept only as long as needed for support, security, and legitimate operational reporting.",
        ],
        [
          "Sharing",
          "Downloader information is not published. It is available to authenticated DevSoft administrators. We do not sell this information.",
        ],
        [
          "Your requests",
          "To ask about access or correction of download or enquiry records, email contact@dev-soft.in from the address you used. We may need to verify the request.",
        ],
      ]}
    />
  );
}

function Legal({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: Array<[string, string]>;
}) {
  return (
    <div className="section-pad">
      <div className="container-shell max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold text-ice">{title}</h1>
        <p className="mt-2 text-xs text-mist">Last updated {updated}. This text is informational and is not legal advice.</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-mist">
          {sections.map(([heading, body]) => (
            <section key={heading}>
              <h2 className="text-lg font-semibold text-ice">{heading}</h2>
              <p className="mt-2">{body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
