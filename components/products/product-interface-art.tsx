import Image from "next/image";
import { productIcons } from "@/config/product-icons";

export function ProductInterfaceArt({ slug }: { slug: string }) {
  const icons = productIcons[slug as keyof typeof productIcons];

  if (!icons) {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-950">
        <div className="flex items-center gap-1.5 border-b border-white/8 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-3 text-[10px] uppercase tracking-widest text-mist">Product</span>
        </div>
        <div className="grid h-56 place-items-center text-sm text-mist">Official icon pending</div>
      </div>
    );
  }

  return (
    <div className="grid place-items-center rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(0,120,255,0.18),transparent_55%),#05070c] p-8">
      <Image
        src={icons.primary}
        alt=""
        width={160}
        height={160}
        className="h-28 w-28 rounded-[28%] shadow-[0_20px_50px_rgba(0,0,0,0.45)] sm:h-36 sm:w-36"
      />
    </div>
  );
}
