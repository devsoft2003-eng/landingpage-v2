import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, productSlugList } from "@/config/products";
import { createMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductMark, ProductPlatformIcons } from "@/components/products/product-mark";
import { ProductInterfaceArt } from "@/components/products/product-interface-art";
import { PlaceholderNote } from "@/components/products/placeholder-note";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productSlugList.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const titles: Record<string, string> = {
    tracelens: "TraceLens | Digital Evidence & Intelligence Analysis Platform",
    nigrani: "Nigrani | IPDR Forensic Analyzer",
    kartavyanama: "KartvyaNama | Professional Android Application | DevSoft",
  };
  return createMetadata({
    title: titles[product.slug] ?? `${product.name} | DevSoft`,
    description: product.excerpt,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 grid-backdrop" />
        <div className="container-shell relative grid gap-10 py-16 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <ProductMark slug={product.slug} size="lg" />
              <Badge>{product.category}</Badge>
            </div>
            <h1 className="mt-6 text-4xl font-semibold text-ice md:text-5xl">{product.name}</h1>
            <p className="mt-3 text-lg text-cyan">{product.tagline}</p>
            <p className="mt-5 max-w-xl text-mist">{product.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {product.downloadEnabled ? (
                <Button asChild>
                  <Link href={`/download/${product.slug}`}>Download {product.shortName}</Link>
                </Button>
              ) : null}
              {product.brochureHref ? (
                <Button asChild variant="secondary">
                  <a href={product.brochureHref} target="_blank" rel="noreferrer">
                    Product brochure (PDF)
                  </a>
                </Button>
              ) : null}
              <Button asChild variant={product.downloadEnabled ? "secondary" : "primary"}>
                <Link href={`/contact?product=${product.slug}`}>Request a demo</Link>
              </Button>
            </div>
            <ProductPlatformIcons slug={product.slug} />
            <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-mist">Platforms</dt>
                <dd className="text-ice">{product.platforms.join(" · ")}</dd>
              </div>
              <div>
                <dt className="text-mist">Version</dt>
                <dd className="text-ice">
                  {product.version ?? "Not published"}
                  {product.versionConfirmed ? "" : " (pending confirmation)"}
                </dd>
              </div>
            </dl>
          </div>
          <ProductInterfaceArt slug={product.slug} />
        </div>
      </section>

      {product.placeholders?.length ? <PlaceholderNote items={product.placeholders} /> : null}

      <section className="section-pad">
        <div className="container-shell">
          <h2 className="text-2xl font-semibold text-ice">Key capabilities</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {product.capabilities.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/8 p-5">
                <h3 className="font-semibold text-ice">{item.title}</h3>
                <p className="mt-2 text-sm text-mist">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {product.workflow ? (
        <section className="section-pad bg-navy-900/40">
          <div className="container-shell">
            <h2 className="text-2xl font-semibold text-ice">Workflow</h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {product.workflow.map((step) => (
                <li key={step.step} className="rounded-2xl border border-white/8 p-5">
                  <div className="font-mono text-cyan">{step.step}</div>
                  <h3 className="mt-2 font-semibold text-ice">{step.title}</h3>
                  <p className="mt-2 text-sm text-mist">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <section className="section-pad">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-ice">Features</h2>
            <ul className="mt-6 space-y-2 text-sm text-mist">
              {product.features.map((feature) => (
                <li key={feature} className="rounded-xl border border-white/8 px-4 py-3">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {product.benefits ? (
              <>
                <h2 className="text-2xl font-semibold text-ice">Benefits</h2>
                <ul className="mt-6 space-y-2 text-sm text-mist">
                  {product.benefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
            {product.securityNotes ? (
              <>
                <h2 className="mt-10 text-2xl font-semibold text-ice">Security</h2>
                <ul className="mt-6 space-y-2 text-sm text-mist">
                  {product.securityNotes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
            {product.requirements ? (
              <>
                <h2 className="mt-10 text-2xl font-semibold text-ice">System requirements</h2>
                <ul className="mt-6 space-y-2 text-sm text-mist">
                  {product.requirements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {product.releaseNotes ? (
        <section className="section-pad bg-navy-900/40">
          <div className="container-shell">
            <h2 className="text-2xl font-semibold text-ice">Release notes</h2>
            {product.releaseNotes.map((note) => (
              <article key={note.version} className="mt-6 rounded-2xl border border-white/8 p-6">
                <h3 className="font-semibold text-ice">
                  {note.version} · {note.date}
                  {note.confirmed ? "" : " · placeholder"}
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-mist">
                  {note.notes.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {product.faqs ? (
        <section className="section-pad">
          <div className="container-shell max-w-3xl">
            <h2 className="text-2xl font-semibold text-ice">FAQ</h2>
            <div className="mt-6 space-y-4">
              {product.faqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl border border-white/8 p-5">
                  <summary className="cursor-pointer font-medium text-ice">{faq.question}</summary>
                  <p className="mt-3 text-sm text-mist">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="pb-20">
        <div className="container-shell flex flex-wrap gap-3">
          {product.downloadEnabled ? (
            <Button asChild size="lg">
              <Link href={`/download/${product.slug}`}>Download {product.shortName}</Link>
            </Button>
          ) : (
            <Button asChild size="lg">
              <Link href={`/contact?product=${product.slug}`}>Request a demo</Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
