import catalogData from "@/data/catalog-data.json";

export type CatalogProduct = (typeof catalogData.products)[number];

export const catalogProducts = catalogData.products;
export const catalogBrands = catalogData.brands;

export function getProductBySlug(slug: string) {
  return catalogProducts.find((product) => product.slug === slug);
}

export function formatPrice(value: number) {
  return value ? `${new Intl.NumberFormat("vi-VN").format(value)}đ` : "Liên hệ";
}