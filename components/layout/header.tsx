"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { mainNavigation } from "@/config/nav";
import { products } from "@/config/products";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { ProductMark } from "@/components/products/product-mark";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-navy-950/80 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="container-shell flex h-[4.25rem] items-center justify-between md:h-[4.75rem]">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {mainNavigation.map((item) =>
            "hasDropdown" in item && item.hasDropdown ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 text-sm text-mist hover:text-ice"
                  aria-haspopup="true"
                  aria-expanded={productsOpen}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                <div
                  className={cn(
                    "absolute left-0 top-full pt-3 transition",
                    productsOpen ? "visible opacity-100" : "invisible opacity-0",
                  )}
                >
                  <div className="glass w-[380px] rounded-2xl p-3">
                    {products.map((product) => (
                      <Link
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/5"
                      >
                        <ProductMark slug={product.slug} />
                        <span>
                          <span className="block text-sm font-medium text-ice">{product.name}</span>
                          <span className="block text-xs text-mist">{product.tagline}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="text-sm text-mist hover:text-ice">
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="hidden lg:block">
          <Button asChild size="sm">
            <Link href="/contact">Contact DevSoft</Link>
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="fixed inset-0 top-[4.25rem] z-40 bg-navy-950/95 backdrop-blur-xl lg:hidden">
          <nav className="container-shell flex h-[calc(100vh-4.25rem)] flex-col gap-2 overflow-y-auto py-8" aria-label="Mobile">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-lg text-ice"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 grid gap-2">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="rounded-xl border border-white/8 px-3 py-3"
                  onClick={() => setOpen(false)}
                >
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-mist">{product.tagline}</div>
                </Link>
              ))}
            </div>
            <Button asChild className="mt-6">
              <Link href="/contact" onClick={() => setOpen(false)}>
                Contact DevSoft
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
