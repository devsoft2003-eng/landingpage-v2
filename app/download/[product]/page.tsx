import { notFound } from "next/navigation";
import { getProduct } from "@/config/products";
import { createMetadata } from "@/lib/seo";
import { DownloadExperience } from "@/components/download/download-experience";
import type { Metadata } from "next";

type Props = { params: Promise<{ product: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product: slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return createMetadata({
    title: `Download ${product.name}`,
    description: `Registered download for ${product.name}. Provide organisation details before the package is released.`,
    path: `/download/${product.slug}`,
  });
}

export default async function DownloadPage({ params }: Props) {
  const { product: slug } = await params;
  const product = getProduct(slug);
  if (!product || !product.downloadEnabled) notFound();
  return <DownloadExperience product={product} />;
}
