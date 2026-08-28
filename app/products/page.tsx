import Link from "next/link";
import { products } from "@/config/products";
import { Badge } from "@/components/ui/card";
import { ProductMark } from "@/components/products/product-mark";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Products",
  description:
    "DevSoft products for digital investigation, IPDR forensics, field operations, subscriber information access, and organisational administration.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <div className="section-pad">
      <div className="container-shell">
        <p className="eyebrow">Products</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-ice md:text-5xl">
          Purpose-built software for investigation and operations.
        </h1>
        <p className="mt-4 max-w-2xl text-mist">
          TraceLens, Nigrani, KartvyaNama, Talash Gateway, EMS, and Task Master / Tapal. Each product page states what
          is confirmed from existing DevSoft material and what is still pending sign-off.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="glass rounded-3xl p-7 transition hover:-translate-y-0.5 hover:border-cyan/30"
            >
              <div className="flex items-start justify-between">
                <ProductMark slug={product.slug} />
                <Badge>{product.category}</Badge>
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-ice">{product.name}</h2>
              <p className="mt-1 text-sm text-cyan">{product.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-mist">{product.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
