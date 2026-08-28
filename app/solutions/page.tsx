import { createMetadata } from "@/lib/seo";
import { ContactCta } from "@/components/home/contact-cta";

export const metadata = createMetadata({
  title: "Solutions",
  description:
    "DevSoft solutions for digital investigation, intelligence analysis, digital forensics, field operations, and secure enterprise workflows.",
  path: "/solutions",
});

const items = [
  {
    id: "digital-investigation",
    title: "Digital investigation",
    text: "TraceLens provides an investigation workspace for authorised teams reviewing digital evidence, documents, communications, and relationships.",
  },
  {
    id: "intelligence",
    title: "Intelligence analysis",
    text: "Entity views, search, and visualisation help analysts brief complex activity without turning the public website into a tradecraft manual.",
  },
  {
    id: "digital-forensics",
    title: "Digital forensics",
    text: "Nigrani is DevSoft’s IPDR forensic analyzer for authorised Indian law-enforcement use, including hashed evidence packages and offline desktop deployment.",
  },
  {
    id: "field-operations",
    title: "Field operations",
    text: "KartvyaNama is issued as a professional Android application through a registered download. Nigrani also supports offline Windows use for isolated environments.",
  },
  {
    id: "enterprise",
    title: "Secure enterprise operations",
    text: "Talash Gateway, EMS, and Task Master / Tapal address subscriber information access, workforce administration, and operational task coordination.",
  },
  {
    id: "data-intelligence",
    title: "Data intelligence",
    text: "Across products, the emphasis is structured analysis and reporting — not ad-hoc spreadsheets shared outside controlled systems.",
  },
];

export default function SolutionsPage() {
  return (
    <div className="section-pad">
      <div className="container-shell">
        <p className="eyebrow">Solutions</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-ice md:text-5xl">
          Technology mapped to operational missions.
        </h1>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map((item) => (
            <article id={item.id} key={item.id} className="scroll-mt-28 rounded-3xl border border-white/10 p-7">
              <h2 className="text-2xl font-semibold text-ice">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
      <ContactCta />
    </div>
  );
}
