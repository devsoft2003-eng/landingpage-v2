import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Services",
  description:
    "DevSoft services: custom software, mobile applications, secure environments, and security assessment for authorised organisations.",
  path: "/services",
});

const services = [
  {
    title: "Custom software development",
    text: "Tailored systems for high-security operational requirements, designed with the same discipline as DevSoft’s product line.",
  },
  {
    title: "Mobile application development",
    text: "Android and iOS applications for field staff who need secure, practical tools away from a desk.",
  },
  {
    title: "Secure environments",
    text: "Deployment discussions for encrypted, sovereignty-conscious environments. We do not assume public cloud is appropriate for every workload.",
  },
  {
    title: "Security assessment",
    text: "Assessment of websites, mobile apps, desktop software, APIs, databases, and deployments to identify weaknesses and misconfiguration. Reports are delivered to the commissioning organisation.",
  },
];

export default function ServicesPage() {
  return (
    <div className="section-pad">
      <div className="container-shell">
        <p className="eyebrow">Services</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-ice">Engineering and assessment for operational systems.</h1>
        <p className="mt-4 max-w-2xl text-mist">
          Services are offered to organisations that already work with DevSoft products or need a scoped build. We do
          not publish client names or engagement outcomes on this site.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="rounded-3xl border border-white/10 p-7">
              <h2 className="text-xl font-semibold text-ice">{service.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
