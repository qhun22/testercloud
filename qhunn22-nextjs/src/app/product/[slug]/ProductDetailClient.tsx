"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CatalogProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";

type CartItem = { productId: number; slug: string; name: string; price: number; quantity: number; variantId?: number };

export default function ProductDetailClient({ product }: { product: CatalogProduct }) {
  const variants = product.variants;
  const storages = [...new Set(variants.map((variant) => variant.storage).filter(Boolean))];
  const colors = [...new Map(variants.map((variant) => [variant.color_name, variant])).values()];
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id);
  const [added, setAdded] = useState(false);
  const selectedVariant = variants.find((variant) => variant.id === selectedVariantId) ?? variants[0];
  const selectedStorage = selectedVariant?.storage ?? "";
  const selectedColor = selectedVariant?.color_name ?? "";
  const specificationGroups = product.specification?.groups ?? [];
  const currentPrice = selectedVariant?.price || product.price;
  const originalPrice = selectedVariant?.original_price || product.originalPrice;
  const availability = selectedVariant?.stock_quantity || product.stock;
  const videoUrl = product.detail?.youtube_id ? `https://www.youtube-nocookie.com/embed/${product.detail.youtube_id}` : null;
  const variantLabel = useMemo(() => `${selectedColor || "Màu mặc định"}${selectedStorage ? ` · ${selectedStorage}` : ""}`, [selectedColor, selectedStorage]);

  const selectVariant = (storage: string, color: string) => {
    const next = variants.find((variant) => variant.storage === storage && variant.color_name === color)
      ?? variants.find((variant) => variant.storage === storage)
      ?? variants.find((variant) => variant.color_name === color);
    if (next) setSelectedVariantId(next.id);
  };

  const addToCart = () => {
    const current = window.localStorage.getItem("qh-cart");
    const cart: CartItem[] = current ? JSON.parse(current) : [];
    const item = cart.find((entry) => entry.productId === product.id && entry.variantId === selectedVariant?.id);
    if (item) item.quantity += 1;
    else cart.push({ productId: product.id, slug: product.slug, name: product.name, price: currentPrice, quantity: 1, variantId: selectedVariant?.id });
    window.localStorage.setItem("qh-cart", JSON.stringify(cart));
    setAdded(true);
  };

  return (
    <main className="pd-page">
      <div className="pd-breadcrumb"><Link href="/">Trang chủ</Link><span>›</span>{product.brand && <><Link href={`/products?brand=${encodeURIComponent(product.brand)}`}>{product.brand}</Link><span>›</span></>}<span className="current">{product.name}</span></div>
      <h1 className="pd-product-name">{product.name}</h1>
      <div className="pd-grid">
        <div className="pd-images"><div className="pd-main-image"><button className="pd-img-nav prev" type="button" aria-label="Ảnh trước">‹</button><img src={product.image || "/static/logos/sean.gif"} alt={`${product.name} - Điện thoại chính hãng QHUN22 Mobile`} width="500" height="500" /><button className="pd-img-nav next" type="button" aria-label="Ảnh sau">›</button></div></div>
        <div className="pd-info">
          <div className="pd-price-section"><span className="pd-price-current">{formatPrice(currentPrice)}</span>{originalPrice > currentPrice && <span className="pd-price-original">{formatPrice(originalPrice)}</span>}<span className="pd-sku-inline">SKU: <strong>{selectedVariant?.sku || product.detail?.sku || "-"}</strong></span></div>
          <div className="pd-installment">Hỗ trợ trả góp 0% và giao hàng toàn quốc</div>
          {storages.length > 0 && <div className="pd-variant-section"><div className="pd-variant-label">Lựa chọn dung lượng</div><div className="pd-storage-options">{storages.map((storage) => { const storageVariant = variants.find((variant) => variant.storage === storage); return <button className={`pd-storage-btn${selectedStorage === storage ? " selected" : ""}`} key={storage} onClick={() => selectVariant(storage, selectedColor)} type="button"><div className="pd-storage-name">{storage}</div><div className="pd-storage-price">{formatPrice(storageVariant?.price || product.price)}</div></button>; })}</div></div>}
          {colors.length > 0 && <div className="pd-variant-section"><div className="pd-variant-label">Lựa chọn màu</div><div className="pd-color-options">{colors.map((color) => <button className={`pd-color-btn${selectedColor === color.color_name ? " selected" : ""}`} key={color.id} onClick={() => selectVariant(selectedStorage, color.color_name)} type="button"><span className="pd-color-thumb" style={{ backgroundColor: color.color_hex || "#eeeeee" }} /><span className="pd-color-info"><span className="pd-color-name">{color.color_name || "Màu mặc định"}</span></span></button>)}</div></div>}
          <div className={availability > 0 ? "pd-stock-status" : "pd-stock-status sold-out"}>{availability > 0 ? `Còn hàng · ${variantLabel}` : "Hết hàng"}</div>
          <div className="pd-buy-section"><button className="pd-btn-cart" onClick={addToCart} type="button">{added ? "Đã thêm vào giỏ" : "Thêm vào giỏ hàng"}</button><Link className="pd-btn-buy" href="/cart">Mua ngay</Link></div>
          <button className="pd-wishlist-mobile" type="button">♡ <span>Thêm yêu thích</span></button>
        </div>
      </div>
      {videoUrl && <div className="pd-extra-row"><div className="pd-extra-box"><h2 className="pd-extra-title">Video về sản phẩm</h2><div className="pd-video-wrapper"><iframe src={videoUrl} title={`Video ${product.name}`} allowFullScreen /></div></div><div className="pd-extra-box"><h2 className="pd-extra-title">Cam kết sản phẩm</h2><ul className="pd-commit-list"><li>Miễn phí vận chuyển toàn quốc</li><li>Bảo hành chính hãng</li><li>Kiểm tra hàng trước khi thanh toán</li></ul></div></div>}
      {specificationGroups.length > 0 && <div className="pd-extra-box pd-spec-section"><h2 className="pd-extra-title">Thông số kỹ thuật</h2>{specificationGroups.map((group) => <section key={group.title}><h3>{group.title}</h3>{group.items.map((item) => <p key={`${group.title}-${item.label}`}><strong>{item.label}:</strong> {item.value}</p>)}</section>)}</div>}
    </main>
  );
}