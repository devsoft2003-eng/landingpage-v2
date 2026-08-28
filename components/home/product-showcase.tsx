import Link from "next/link";
import { getProduct } from "@/config/products";
import { ProductInterfaceArt } from "@/components/products/product-interface-art";

export function ProductShowcase() {
  const flagship = ["tracelens", "nigrani", "kartavyanama"] as const;
  return (
    <section className="section-pad">
      <div className="container-shell">
        <p className="eyebrow">Product showcase</p>
        <h2 className="mt-3 text-3xl font-semibold text-ice md:text-4xl">Flagship platforms</h2>
        <div className="mt-10 grid gap-8">
          {flagship.map((slug, index) => {
            const product = getProduct(slug);
            if (!product) return null;
            return (
              <article
                key={slug}
                className={`grid items-center gap-8 rounded-[28px] border border-white/10 bg-navy-900/40 p-6 lg:grid-cols-2 lg:p-10 ${index % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
              >
                <ProductInterfaceArt slug={slug} />
                <div>
                  <h3 className="text-2xl font-semibold text-ice">{product.name}</h3>
                  <p className="mt-2 text-cyan">{product.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-mist">{product.description}</p>
                  <Link href={`/products/${slug}`} className="mt-6 inline-flex text-sm font-medium text-cyan hover:underline">
                    Open {product.name}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
