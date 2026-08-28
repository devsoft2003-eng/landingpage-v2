import Link from "next/link";

const solutions = [
  {
    id: "digital-investigation",
    title: "Digital investigation",
    text: "Workspaces and analysis tools for reviewing digital material, reconstructing activity, and preparing case outputs.",
  },
  {
    id: "intelligence",
    title: "Intelligence analysis",
    text: "Relationship, entity, and pattern review for authorised intelligence and investigation teams.",
  },
  {
    id: "forensics",
    title: "Digital forensics",
    text: "IPDR-oriented analysis and hashed evidence packages, led by Nigrani for authorised Indian law-enforcement use.",
  },
  {
    id: "field-operations",
    title: "Field operations",
    text: "Mobile applications and offline-capable deployments for staff working away from a central laboratory.",
  },
  {
    id: "enterprise",
    title: "Secure enterprise operations",
    text: "Portals and administrative systems — including subscriber information access and workforce management — for authorised organisations.",
  },
  {
    id: "data",
    title: "Data intelligence",
    text: "Structured search, visualisation, and reporting so large operational datasets can be briefed with clarity.",
  },
];

export function SolutionsPreview() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Solutions</p>
            <h2 className="mt-3 text-3xl font-semibold text-ice md:text-4xl">Where DevSoft is used</h2>
          </div>
          <Link href="/solutions" className="text-sm text-cyan hover:underline">
            Explore solutions
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <article key={solution.id} className="rounded-2xl border border-white/8 p-6">
              <h3 className="text-lg font-semibold text-ice">{solution.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{solution.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
