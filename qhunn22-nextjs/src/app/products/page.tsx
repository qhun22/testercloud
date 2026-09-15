import Link from "next/link";
import { catalogProducts, formatPrice } from "@/lib/catalog";

export const metadata = {
  title: "Tất cả sản phẩm | QHUN22 Mobile",
  description: "Danh mục điện thoại chính hãng tại QHUN22 Mobile.",
};

export default function ProductsPage() {
  return (
    <main className="catalog-page">
      <div className="catalog-shell">
        <Link className="catalog-back" href="/">
          ← Trang chủ
        </Link>
        <header className="catalog-heading">
          <p className="catalog-eyebrow">QHUN22 MOBILE</p>
          <h1>Tất cả sản phẩm</h1>
          <p>{catalogProducts.length} sản phẩm đang được cập nhật từ hệ thống.</p>
        </header>
        <div className="catalog-grid">
          {catalogProducts.map((product) => (
            <Link className="catalog-card" href={`/product/${product.slug}`} key={product.id}>
              <div className="catalog-card-image">
                <img src={product.image} alt={product.name} />
                {product.discountPercent > 0 && (
                  <span className="catalog-discount">-{product.discountPercent}%</span>
                )}
              </div>
              <div className="catalog-card-body">
                <p className="catalog-brand">{product.brand}</p>
                <h2>{product.name}</h2>
                <strong>{formatPrice(product.price)}</strong>
                {product.originalPrice > product.price && (
                  <del>{formatPrice(product.originalPrice)}</del>
                )}
                <span className={product.stock > 0 ? "catalog-stock" : "catalog-stock sold-out"}>
                  {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Hết hàng"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}