import { Lock, Cpu, HardDrive, ShieldCheck, HeartPulse, Layers, Headset } from "lucide-react";

const reasons = [
  {
    icon: Lock,
    title: "Security-focused development",
    text: "Products are designed for authorised operational use, with access control and controlled distribution where software is issued.",
  },
  {
    icon: Cpu,
    title: "Modern technology",
    text: "Contemporary application architecture, maintainable codebases, and interfaces built for demanding professional environments.",
  },
  {
    icon: HardDrive,
    title: "Local and offline operation",
    text: "Where the mission requires it, deployments can be planned for isolated networks and offline workstations — as with Nigrani’s desktop option.",
  },
  {
    icon: ShieldCheck,
    title: "Data privacy",
    text: "Sensitive operational data should stay under the agency’s control. We do not treat public cloud as a default for investigation workloads.",
  },
  {
    icon: HeartPulse,
    title: "Mission-critical reliability",
    text: "Interfaces and workflows are shaped for high-stakes review, not consumer novelty.",
  },
  {
    icon: Layers,
    title: "Scalable architecture",
    text: "Systems are structured so additional products, users, and datasets can be introduced without discarding the operating model.",
  },
  {
    icon: Headset,
    title: "Professional support",
    text: "Demonstration, deployment discussion, and product support for authorised organisations.",
  },
];

export function WhyDevSoft() {
  return (
    <section className="section-pad bg-navy-900/40">
      <div className="container-shell">
        <p className="eyebrow">Why DevSoft</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-ice md:text-4xl">
          Built for trust in environments where mistakes are not abstract.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <article key={reason.title} className="rounded-2xl border border-white/8 bg-navy-950/50 p-6">
              <reason.icon className="h-5 w-5 text-cyan" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-ice">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{reason.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
