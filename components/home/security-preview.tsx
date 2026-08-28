import Link from "next/link";

export function SecurityPreview() {
  return (
    <section className="section-pad bg-navy-900/40">
      <div className="container-shell grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Technology & security</p>
          <h2 className="mt-3 text-3xl font-semibold text-ice md:text-4xl">
            Security-first, without publishing the keys to the kingdom.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-mist">
            DevSoft builds software for authorised agencies and professional organisations. We describe what products
            do and how they are issued. We do not publish detection internals, exploit methods, or deployment secrets.
            Distribution of installable packages is registered, verified, and streamed from private storage.
          </p>
          <Link href="/security" className="mt-6 inline-flex text-sm font-medium text-cyan hover:underline">
            Read the security approach
          </Link>
        </div>
        <ul className="grid gap-3 text-sm">
          {[
            "Authorised-use positioning for investigation and operations software",
            "Controlled downloads with server-side validation",
            "On-premises and offline options where the product supports them",
            "No public direct links to installer binaries",
          ].map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-navy-950/60 px-4 py-3 text-mist">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
