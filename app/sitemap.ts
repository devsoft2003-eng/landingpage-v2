import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/config/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/products",
    "/solutions",
    "/services",
    "/security",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/download-terms",
    ...products.map((product) => `/products/${product.slug}`),
    ...products.filter((product) => product.downloadEnabled).map((product) => `/download/${product.slug}`),
  ];

  return paths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
