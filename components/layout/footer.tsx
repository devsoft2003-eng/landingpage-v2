"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { footerNavigation } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/layout/logo";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-navy-900/80">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-5">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">{siteConfig.tagline}</p>
          <p className="mt-3 text-sm text-mist">
            {siteConfig.address.line1}, {siteConfig.address.city} {siteConfig.address.postalCode}
          </p>
          <a className="mt-2 inline-block text-sm text-cyan hover:underline" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </div>
        {(
          [
            ["Products", footerNavigation.products],
            ["Solutions", footerNavigation.solutions],
            ["Company", footerNavigation.company],
          ] as const
        ).map(([title, items]) => (
          <div key={title}>
            <h2 className="mb-4 text-sm font-semibold text-ice">{title}</h2>
            <ul className="space-y-2 text-sm text-mist">
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-ice">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/8">
        <div className="container-shell flex flex-col gap-3 py-5 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.copyrightYearStart}
            {year > siteConfig.copyrightYearStart ? `–${year}` : ""} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {footerNavigation.legal.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-ice">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
