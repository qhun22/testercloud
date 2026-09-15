"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { catalogProducts, formatPrice } from "@/lib/catalog";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const results = useMemo(
    () =>
      catalogProducts.filter((product) =>
        [product.name, product.brand, product.category]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
      ),
    [normalizedQuery],
  );

  return (
    <main className="catalog-page">
      <div className="catalog-shell">
        <Link className="catalog-back" href="/">← Trang chủ</Link>
        <header className="catalog-heading">
          <p className="catalog-eyebrow">QHUN22 MOBILE</p>
          <h1>Tìm kiếm sản phẩm</h1>
          <form className="catalog-search" onSubmit={(event) => event.preventDefault()}>
            <input
              aria-label="Tìm kiếm sản phẩm"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Nhập tên sản phẩm, hãng hoặc danh mục"
              value={query}
            />
            <button type="submit">Tìm kiếm</button>
          </form>
          <p>{results.length} kết quả</p>
        </header>
        <div className="catalog-grid">
          {results.map((product) => (
            <Link className="catalog-card" href={`/product/${product.slug}`} key={product.id}>
              <div className="catalog-card-image"><img src={product.image} alt={product.name} /></div>
              <div className="catalog-card-body">
                <p className="catalog-brand">{product.brand}</p>
                <h2>{product.name}</h2>
                <strong>{formatPrice(product.price)}</strong>
              </div>
            </Link>
          ))}
        </div>
        {results.length === 0 && <p className="catalog-empty">Không tìm thấy sản phẩm phù hợp.</p>}
      </div>
    </main>
  );
}