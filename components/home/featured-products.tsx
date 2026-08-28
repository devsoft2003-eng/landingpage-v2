import Link from "next/link";
import { products } from "@/config/products";
import { Badge } from "@/components/ui/card";
import { ProductMark } from "@/components/products/product-mark";

export function FeaturedProducts() {
  const featured = products.filter((product) => product.featured);
  return (
    <section className="section-pad">
      <div className="container-shell">
        <p className="eyebrow">Featured products</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-ice md:text-4xl">
          Software built for investigation, intelligence, and operations.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {featured.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="glass group rounded-3xl p-7 transition hover:-translate-y-0.5 hover:border-cyan/30"
            >
              <div className="flex items-start justify-between gap-4">
                <ProductMark slug={product.slug} />
                <Badge tone={product.downloadEnabled ? "cyan" : "mist"}>
                  {product.downloadEnabled ? "Download" : product.status === "brochure" ? "Brochure" : "Demo"}
                </Badge>
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-ice">{product.name}</h3>
              <p className="mt-1 text-sm text-cyan">{product.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-mist">{product.excerpt}</p>
              <span className="mt-6 inline-flex text-sm font-medium text-cyan group-hover:underline">
                View product
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
