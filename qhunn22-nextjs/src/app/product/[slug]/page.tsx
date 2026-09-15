import Link from "next/link";
import { notFound } from "next/navigation";
import { catalogProducts, formatPrice, getProductBySlug } from "@/lib/catalog";

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

  const detail = product.detail;
  const specificationGroups = product.specification?.groups ?? [];

  return (
    <main className="product-page">
      <div className="product-shell">
        <Link className="catalog-back" href="/products">← Tất cả sản phẩm</Link>
        <div className="product-overview">
          <div className="product-gallery">
            <img src={product.image} alt={product.name} />
          </div>
          <section className="product-summary">
            <p className="catalog-brand">{product.brand}</p>
            <h1>{product.name}</h1>
            <p className="product-sku">SKU: {detail?.sku || "Đang cập nhật"}</p>
            <div className="product-price">
              <strong>{formatPrice(product.price)}</strong>
              {product.originalPrice > product.price && <del>{formatPrice(product.originalPrice)}</del>}
            </div>
            <p className={product.stock > 0 ? "product-availability" : "product-availability sold-out"}>
              {product.stock > 0 ? `Còn hàng (${product.stock})` : "Tạm hết hàng"}
            </p>
            {product.variants.length > 0 && (
              <div className="product-variants">
                <h2>Phiên bản</h2>
                {product.variants.map((variant) => (
                  <div className="product-variant" key={variant.id}>
                    <span>{variant.color_name || "Màu mặc định"} · {variant.storage || "Tiêu chuẩn"}</span>
                    <strong>{formatPrice(variant.price)}</strong>
                  </div>
                ))}
              </div>
            )}
            <Link className="product-action" href={`/cart?product=${product.slug}`}>Thêm vào giỏ hàng</Link>
          </section>
        </div>
        {(detail?.description || product.description) && (
          <section className="product-description">
            <h2>Thông tin sản phẩm</h2>
            <p>{detail?.description || product.description}</p>
          </section>
        )}
        {specificationGroups.length > 0 && (
          <section className="product-specifications">
            <h2>Thông số kỹ thuật</h2>
            <div className="specification-groups">
              {specificationGroups.map((group) => (
                <section className="specification-group" key={group.title}>
                  <h3>{group.title}</h3>
                  {group.items.map((item) => (
                    <div className="specification-row" key={`${group.title}-${item.label}`}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </section>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}