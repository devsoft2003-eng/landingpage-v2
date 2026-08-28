import Image from "next/image";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <Link href="/" className="inline-flex items-center rounded-xl bg-white p-1" aria-label="DevSoft home">
        <Image
          src="/images/devsoft-mark.png"
          alt=""
          width={256}
          height={256}
          className="h-8 w-8 object-contain"
          priority
        />
        <span className="sr-only">DevSoft</span>
      </Link>
    );
  }

  return (
    <Link href="/" className="inline-flex items-center rounded-xl bg-white px-3 py-1.5" aria-label="DevSoft home">
      <Image
        src="/images/devsoft-logo.png"
        alt="DevSoft — Innovate, Secure, Serve"
        width={537}
        height={133}
        className="h-10 w-auto max-w-[min(240px,62vw)] object-contain object-left sm:h-11 sm:max-w-[280px]"
        priority
      />
    </Link>
  );
}
