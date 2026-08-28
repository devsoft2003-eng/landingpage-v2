import Image from "next/image";
import { Shield } from "lucide-react";
import { productIcons } from "@/config/product-icons";
import type { ProductSlug } from "@/types";
import { cn } from "@/lib/utils";

export function ProductMark({ slug, size = "md" }: { slug: ProductSlug; size?: "md" | "lg" }) {
  const icons = productIcons[slug];
  const dim = size === "lg" ? "h-20 w-20" : "h-14 w-14";

  if (!icons) {
    return (
      <span className={cn("grid place-items-center rounded-2xl border border-white/10 bg-white/5", dim)}>
        <Shield className="h-6 w-6 text-cyan" aria-hidden="true" />
      </span>
    );
  }

  return (
    <span className={cn("relative overflow-hidden rounded-[22%] shadow-[0_8px_24px_rgba(0,0,0,0.35)]", dim)}>
      <Image src={icons.primary} alt="" width={125} height={125} className="h-full w-full object-cover" />
    </span>
  );
}

export function ProductPlatformIcons({ slug }: { slug: ProductSlug }) {
  const icons = productIcons[slug];
  if (!icons?.windows && !icons?.android) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-4">
      {icons.windows ? (
        <figure className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
          <Image src={icons.windows} alt="" width={56} height={56} className="h-14 w-14 rounded-[22%]" />
          <figcaption className="text-sm text-ice">Windows</figcaption>
        </figure>
      ) : null}
      {icons.android ? (
        <figure className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
          <Image src={icons.android} alt="" width={56} height={56} className="h-14 w-14 rounded-[22%]" />
          <figcaption className="text-sm text-ice">Android</figcaption>
        </figure>
      ) : null}
    </div>
  );
}
