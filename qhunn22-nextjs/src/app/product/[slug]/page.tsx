import { notFound } from "next/navigation";
import { catalogProducts, getProductBySlug } from "@/lib/catalog";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return catalogProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.name} | QHUN22 Mobile` : "Sản phẩm | QHUN22 Mobile" };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}