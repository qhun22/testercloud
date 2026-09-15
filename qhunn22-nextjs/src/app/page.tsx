"use client";

import { FormEvent, useEffect, useState } from "react";
import homeData from "@/data/home-data.json";

const videos = ["applv1.mp4", "sams.mp4", "xiao.mp4", "ooppv1.mp4"];
const formatPrice = (value: number) =>
  value ? `${new Intl.NumberFormat("vi-VN").format(value)}đ` : "Liên hệ";
const brands = homeData.brands.map(
  (brand) => [brand.name, brand.logo] as [string, string],
);
const products = homeData.products.map(
  (item) =>
    [
      item.name,
      formatPrice(item.price),
      item.originalPrice ? formatPrice(item.originalPrice) : "",
      item.image,
    ] as [string, string, string, string],
);
const hotSaleProducts = homeData.hotSaleProducts.map(
  (item) =>
    [
      item.name,
      formatPrice(item.price),
      item.originalPrice ? formatPrice(item.originalPrice) : "",
      item.image,
    ] as [string, string, string, string],
);
const reviewVideos = [
  "l-FBAfNRoCo",
  "WoRySc2P4KM",
  "Pc1P-Xch0YU",
  "HCHKwLL5VQw",
  "hzz9qEh0W8g",
];
const filterGroups = [
  ["Hệ điều hành", ["iOS", "Android"]],
  ["Dung lượng ROM", ["≤128 GB", "256 GB", "512 GB", "1 TB"]],
  ["Kết nối", ["NFC", "Bluetooth", "Hồng ngoại"]],
  [
    "Hiệu năng và Pin",
    [
      "Dưới 3000 mAh",
      "Pin từ 3000 - 4000 mAh",
      "Pin từ 4000 - 5500 mAh",
      "Pin trâu: trên 5500 mAh",
    ],
  ],
  ["Hỗ trợ mạng", ["5G", "4G"]],
  ["RAM", ["16 GB", "12 GB", "8 GB", "6 GB", "4 GB"]],
  [
    "Màn hình",
    ["Màn hình nhỏ", "Từ 5 - 6.5 inch", "Từ 6.5 - 6.8 inch", "Trên 6.8 inch"],
  ],
  ["Chuẩn màn hình", ["Retina (iPhone)", "2K/2K+", "1.5K", "FHD/FHD+"]],
  ["Tần số quét", ["Trên 144 Hz", "120 Hz", "90 Hz", "60 Hz"]],
  [
    "Camera",
    [
      "Quay phim Slow Motion",
      "AI Camera",
      "Hiệu ứng làm đẹp",
      "Zoom quang học",
      "Chống rung OIS",
    ],
  ],
];

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      style={{ width: 20, height: 20 }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  );
}

export default function Home() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [hotSaleTab, setHotSaleTab] = useState("suggested");
  const [hotSaleIndex, setHotSaleIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [liked, setLiked] = useState<string[]>([]);
  const [newsletterSent, setNewsletterSent] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveVideo((current) => (current + 1) % videos.length),
      7000,
    );
    return () => window.clearInterval(timer);
  }, []);

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterSent(true);
  };
  const toggleLiked = (name: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setLiked((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    );
  };

  return (
    <div id="qhPageWrap">
      <header className="qh-header">
        <div className="qh-mobile-header-bar">
          <button
            className="qh-mhb-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label="Mở menu"
          >
            <i className="ri-menu-line" />
          </button>
          <a href="#top" className="qh-mhb-logo">
            <img src="/static/logos/sean.gif" alt="QHUN22 Mobile" />
          </a>
          <button
            className="qh-mhb-btn"
            onClick={() => setSearchOpen(true)}
            aria-label="Tìm kiếm"
          >
            <i className="ri-search-line" />
          </button>
        </div>
        <div className="qh-header-container">
          <div className="qh-header-inner">
            <a href="#top" className="qh-logo">
              <img
                src="/static/logos/sean.gif"
                alt="QHUN22 Mobile"
                className="qh-logo-img"
              />
            </a>
            <div className="qh-search">
              <form
                className="qh-search-form"
                onSubmit={(event) => event.preventDefault()}
              >
                <input
                  className="qh-search-input"
                  placeholder="Nhập sản phẩm mà bạn muốn tìm..."
                />
                <button className="qh-search-btn" aria-label="Tìm kiếm">
                  <i className="ri-search-line" />
                </button>
              </form>
              <div className="qh-autocomplete-dropdown" />
            </div>
            <div className="qh-header-actions">
              <a
                href="#products"
                className="qh-header-icon qh-header-icon--stat"
              >
                <div className="qh-icon-circle">
                  <i className="ri-heart-3-line qh-icon-svg" />
                  <span className="qh-icon-badge qh-icon-badge--stat">
                    {liked.length}
                  </span>
                </div>
                <div className="qh-icon-text">
                  <span className="qh-icon-label">Danh Sách</span>
                  <span className="qh-icon-title">Yêu thích</span>
                </div>
              </a>
              <a href="#products" className="qh-header-icon qh-header-icon--stat">
                <div className="qh-icon-circle">
                  <i className="ri-shopping-cart-2-line qh-icon-svg" />
                  <span className="qh-icon-badge qh-icon-badge--stat">0</span>
                </div>
                <div className="qh-icon-text">
                  <span className="qh-icon-label">Thanh Toán</span>
                  <span className="qh-icon-title">Giỏ hàng</span>
                </div>
              </a>
              <a href="#products" className="qh-header-icon qh-header-icon--stat">
                <div className="qh-icon-circle">
                  <i className="ri-file-list-3-line qh-icon-svg" />
                  <span className="qh-icon-badge qh-icon-badge--stat">0</span>
                </div>
                <div className="qh-icon-text">
                  <span className="qh-icon-label">Kiểm tra</span>
                  <span className="qh-icon-title">Tra cứu đơn</span>
                </div>
              </a>
              <a href="#top" className="qh-header-icon">
                <div className="qh-icon-circle">
                  <i className="ri-user-3-line qh-icon-svg" />
                </div>
                <div className="qh-icon-text">
                  <span className="qh-icon-label">Xin chào</span>
                  <span className="qh-icon-title">Đăng nhập</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`qh-mobile-drawer-overlay ${drawerOpen ? "qh-mob-active" : ""}`}
        onClick={() => setDrawerOpen(false)}
      />
      <aside
        className={`qh-mobile-drawer ${drawerOpen ? "qh-mob-active" : ""}`}
      >
        <div className="qh-drawer-head">
          <div className="qh-drawer-head-logo">
            <img src="/static/logos/sean.gif" alt="QHUN22 Mobile" />
          </div>
          <button
            className="qh-drawer-head-close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Đóng menu"
          >
            <i className="ri-close-line" />
          </button>
        </div>
        <div className="qh-drawer-greeting-row">
          <div className="qh-drawer-greeting-name">Khách</div>
          <div className="qh-drawer-greeting-sub">Xin chào,</div>
        </div>
        <nav className="qh-drawer-nav">
          {[
            ["ri-home-5-line", "Trang chủ"],
            ["ri-heart-3-line", "Yêu thích"],
            ["ri-shopping-cart-2-line", "Giỏ hàng"],
            ["ri-file-list-3-line", "Tra cứu đơn"],
            ["ri-login-box-line", "Đăng nhập"],
          ].map(([icon, label]) => (
            <a
              href="#top"
              className="qh-drawer-nav-item"
              key={label}
              onClick={() => setDrawerOpen(false)}
            >
              <i className={icon} /> {label}
            </a>
          ))}
        </nav>
      </aside>
      <div
        className={`qh-mobile-search-panel ${searchOpen ? "qh-mob-active" : ""}`}
      >
        <div className="qh-msp-head">
          <button
            className="qh-msp-back"
            onClick={() => setSearchOpen(false)}
            aria-label="Quay lại"
          >
            <i className="ri-arrow-left-line" />
          </button>
          <form
            className="qh-msp-form"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              className="qh-msp-input"
              placeholder="Nhập sản phẩm bạn cần tìm"
            />
            <button className="qh-msp-submit">
              <i className="ri-search-2-line" />
            </button>
          </form>
        </div>
        <div className="qh-msp-body">
          <div className="qh-msp-section">
            <div className="qh-msp-section-title">Xu hướng tìm kiếm</div>
            <div className="qh-msp-chips">
              {[
                "iPhone 17",
                "Laptop",
                "Điện thoại Samsung",
                "iPhone 16",
                "Samsung Galaxy S26",
                "Máy lạnh",
              ].map((item) => (
                <a href="#products" className="qh-msp-chip" key={item}>
                  <i className="ri-fire-line" /> {item}
                </a>
              ))}
            </div>
          </div>
          <div className="qh-msp-section">
            <div className="qh-msp-section-title">Tìm kiếm gần đây</div>
            <ul className="qh-msp-recent-list">
              <li className="qh-msp-recent-empty">Chưa có lịch sử tìm kiếm</li>
            </ul>
          </div>
        </div>
      </div>

      <main className="qh-main" id="top">
        <section className="qh-home">
          <section className="qh-hero-slider">
            <div className="qh-hero-slider-wrap">
              <div className="qh-hero-stage" id="qhHeroSlider">
                {videos.map((video, index) => (
                  <div
                    className={`qh-hero-slide ${activeVideo === index ? "active" : ""}`}
                    key={video}
                  >
                    <video
                      className="qh-hero-video"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                    >
                      <source
                        src={`/static/videos/${video}`}
                        type="video/mp4"
                      />
                    </video>
                    <div className="qh-hero-overlay">
                      <div className="qh-hero-text" />
                    </div>
                  </div>
                ))}
                <button
                  className="qh-slider-nav qh-hero-nav prev"
                  onClick={() =>
                    setActiveVideo(
                      (activeVideo + videos.length - 1) % videos.length,
                    )
                  }
                  aria-label="Slide trước"
                >
                  <Arrow direction="left" />
                </button>
                <button
                  className="qh-slider-nav qh-hero-nav next"
                  onClick={() =>
                    setActiveVideo((activeVideo + 1) % videos.length)
                  }
                  aria-label="Slide sau"
                >
                  <Arrow direction="right" />
                </button>
                <div className="qh-hero-dots">
                  {videos.map((video, index) => (
                    <button
                      className={`qh-hero-dot ${activeVideo === index ? "active" : ""}`}
                      onClick={() => setActiveVideo(index)}
                      key={video}
                      aria-label={`Slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="qh-banner-slider">
            <div className="qh-banner-slider-wrap">
              <div className="qh-banner-track">
                {homeData.banners.slice(0, 4).map((banner) => (
                  <div className="qh-banner-item" key={banner.id}>
                    <a href="#offers">
                      <img src={banner.image} alt="Ưu đãi QHUN22" />
                    </a>
                  </div>
                ))}
              </div>
              <button
                className="qh-slider-nav qh-banner-nav prev"
                aria-label="Banner trước"
              >
                <Arrow direction="left" />
              </button>
              <button
                className="qh-slider-nav qh-banner-nav next"
                aria-label="Banner sau"
              >
                <Arrow direction="right" />
              </button>
            </div>
          </section>

          <div className="qh-featured-title-wrap">
            <span className="qh-featured-title">HÃNG NỔI BẬT</span>
          </div>
          <div className="qh-carousel-container">
            <div className="qh-carousel-track">
              {[...brands, ...brands].map(([name, logo], index) => (
                <a
                  className="qh-featured-brand"
                  href="#products"
                  title={name}
                  key={`${name}-${index}`}
                >
                  <img src={`/static/icons/${logo}`} alt={name} />
                </a>
              ))}
            </div>
          </div>

          <section className="qh-hotsale-section">
            <div
              className="qh-hotsale-header"
              style={{
                backgroundImage: "url('/media/hotsale/2026_header_bg.png')",
              }}
            >
              <div className="qh-hotsale-header-inner">
                <div className="qh-hotsale-tabs">
                  {[
                    ["suggested", "GỢI Ý"],
                    ["bestseller", "BÁN CHẠY"],
                    ["hotsale", "HOTSALE"],
                  ].map(([value, label]) => (
                    <button
                      className={`qh-hotsale-tab ${hotSaleTab === value ? "active" : ""}`}
                      data-tab={value}
                      onClick={() => setHotSaleTab(value)}
                      key={value}
                    >
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
                <div
                  className="qh-hotsale-countdown-row"
                  style={{
                    display: hotSaleTab === "hotsale" ? "flex" : "none",
                  }}
                >
                  <span className="qh-hotsale-countdown-label">
                    KẾT THÚC SAU
                  </span>
                  <div className="qh-hotsale-countdown">
                    <span className="qh-hotsale-time-box">
                      <span className="qh-hotsale-time">08</span>
                    </span>
                    <span className="qh-hotsale-sep">:</span>
                    <span className="qh-hotsale-time-box">
                      <span className="qh-hotsale-time">16</span>
                    </span>
                    <span className="qh-hotsale-sep">:</span>
                    <span className="qh-hotsale-time-box">
                      <span className="qh-hotsale-time">42</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="qh-hotsale-body"
              style={{
                backgroundImage: "url('/media/hotsale/2026_body_bg_desk.webp')",
              }}
            >
              <img
                src="/media/hotsale/2026_left_icon.webp"
                alt=""
                className="qh-hotsale-corner qh-hotsale-corner--tl"
              />
              <img
                src="/media/hotsale/2026_left_icon.webp"
                alt=""
                className="qh-hotsale-corner qh-hotsale-corner--bl"
              />
              <img
                src="/media/hotsale/2026_right_icon.webp"
                alt=""
                className="qh-hotsale-corner qh-hotsale-corner--tr"
              />
              <img
                src="/media/hotsale/2026_right_icon.webp"
                alt=""
                className="qh-hotsale-corner qh-hotsale-corner--br"
              />
              <div className="qh-hs-panel" id="qhPanelSuggested">
                <div className="qh-hotsale-slider-wrap">
                <button
                  className="qh-slider-nav qh-hotsale-nav prev"
                  aria-label="Trang trước"
                  onClick={() => setHotSaleIndex((current) => Math.max(0, current - 1))}
                >
                  <Arrow direction="left" />
                </button>
                <div className="qh-hotsale-overflow">
                  <div className="qh-hotsale-track" style={{ transform: `translateX(-${hotSaleIndex * 20.8}%)` }}>
                    {hotSaleProducts.map(([name, price, old, image]) => (
                      <a className="qh-hotsale-card" href="#products" key={name}>
                        <div className="qh-hotsale-card-img">
                          <img src={image} alt={name} />
                        </div>
                        <div className="qh-hotsale-card-info">
                          <h3 className="qh-hotsale-card-name">{name}</h3>
                          <div className="qh-hotsale-card-price">
                            <span className="qh-hotsale-price-now">
                              {price}
                            </span>
                            <span className="qh-hotsale-price-old">{old}</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                <button
                  className="qh-slider-nav qh-hotsale-nav next"
                  aria-label="Trang sau"
                  onClick={() => setHotSaleIndex((current) => Math.min(Math.max(0, hotSaleProducts.length - 5), current + 1))}
                >
                  <Arrow direction="right" />
                </button>
                </div>
              </div>
            </div>
          </section>

          <div className="qh-featured-title-wrap">
            <span className="qh-featured-title">SẢN PHẨM NỔI BẬT</span>
          </div>
          <form
            className="qh-filter-bar"
            id="qhFilterBar"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="qh-filter-group">
              <select className="qh-filter-select" defaultValue="">
                <option value="">Tất cả hàng</option>
                {brands.map(([brand]) => (
                  <option key={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div className="qh-filter-group">
              <select className="qh-filter-select" defaultValue="">
                <option value="">Tất cả mức giá</option>
                <option>Dưới 2 triệu</option>
                <option>Từ 2 - 4 triệu</option>
                <option>Trên 20 triệu</option>
              </select>
            </div>
            <div className="qh-filter-group">
              <select className="qh-filter-select" defaultValue="">
                <option value="">Mặc định</option>
                <option>Thấp tới cao</option>
                <option>Cao tới thấp</option>
              </select>
            </div>
            <div className="qh-filter-actions">
              <button
                type="button"
                className="qh-filter-btn qh-filter-btn-search"
                onClick={() => setFilterOpen(true)}
              >
                <i className="ri-equalizer-line" /> Lọc nâng cao
              </button>
              <button
                type="reset"
                className="qh-filter-btn qh-filter-btn-reset"
              >
                <i className="ri-refresh-line" /> Reset
              </button>
            </div>
          </form>
          <div
            className={`qh-advanced-filter-overlay ${filterOpen ? "open" : ""}`}
            onClick={() => setFilterOpen(false)}
          />
          <aside
            className={`qh-advanced-filter-drawer ${filterOpen ? "open" : ""}`}
            aria-hidden={!filterOpen}
          >
            <div className="qh-advanced-filter-head">
              <h3><i className="ri-equalizer-line" /> CHỌN THÔNG SỐ YÊU THÍCH</h3>
              <button type="button" className="qh-advanced-filter-close" onClick={() => setFilterOpen(false)} aria-label="Đóng bộ lọc">
                <i className="ri-close-line" />
              </button>
            </div>
            <div className="qh-advanced-filter-body">
              {filterGroups.map(([title, options]) => (
                <section className="qh-af-group" key={title as string}>
                  <h4>{title as string}</h4>
                  {(options as string[]).map((option) => (
                    <label key={option}><input type="checkbox" /> {option}</label>
                  ))}
                </section>
              ))}
            </div>
            <div className="qh-advanced-filter-foot">
              <button type="button" className="qh-filter-btn qh-filter-btn-reset" onClick={() => setFilterOpen(false)}><i className="ri-delete-bin-line" /> Xóa lọc nâng cao</button>
              <button type="button" className="qh-filter-btn qh-filter-btn-search" onClick={() => setFilterOpen(false)}><i className="ri-check-line" /> Áp dụng bộ lọc</button>
            </div>
          </aside>
          <div className="qh-product-grid" id="products">
            {products.map(([name, price, old, image]) => (
              <a href="#products" className="qh-product-card" key={name}>
                <div className="qh-product-image">
                  <img src={image} alt={name} />
                  <button
                    className={`wishlist-btn ${liked.includes(name) ? "liked" : ""}`}
                    onClick={(event) => toggleLiked(name, event)}
                    aria-label="Yêu thích"
                  >
                    <svg viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="qh-product-info">
                  <h3 className="qh-product-name">{name}</h3>
                  <div className="qh-product-price">
                    <span
                      style={{
                        fontSize: 13,
                        color: "#999",
                        textDecoration: "line-through",
                        display: "block",
                      }}
                    >
                      {old}
                    </span>
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#dc2626",
                      }}
                    >
                      {price}
                    </span>
                  </div>
                  <div className="qh-product-status">
                    <span className="status-tag in-stock">Còn hàng</span>
                    <span className="status-tag installment">Trả góp 0%</span>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      className="qh-btn qh-cart-quick-btn"
                      onClick={(event) => event.preventDefault()}
                    >
                      <i className="ri-shopping-cart-2-line" /> Thêm giỏ
                    </button>
                    <button
                      className="qh-btn qh-btn-outline qh-compare-btn"
                      onClick={(event) => {
                        event.preventDefault();
                        setCompareOpen(true);
                      }}
                    >
                      <i className="ri-arrow-left-right-line" /> So sánh
                    </button>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <section className="qh-review-section">
            <div className="qh-review-header">
              <div className="qh-review-header-left">
                <span className="qh-review-icon">
                  <i className="ri-play-circle-fill" />
                </span>
                <h2 className="qh-review-title">Review Sản Phẩm</h2>
              </div>
            </div>
            <div className="qh-review-inner">
              <div className="qh-review-slider-wrap">
                <button
                  className="qh-slider-nav qh-review-nav prev"
                  aria-label="Slide trước"
                  onClick={() => setReviewIndex((current) => Math.max(0, current - 1))}
                >
                  <Arrow direction="left" />
                </button>
                <div className="qh-review-overflow">
                  <div className="qh-review-track" style={{ transform: `translateX(-${reviewIndex * 20.8}%)` }}>
                    {reviewVideos.map((video) => (
                      <div className="qh-review-card" key={video}>
                        <div className="qh-review-video">
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${video}`}
                            title="Review sản phẩm"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="qh-slider-nav qh-review-nav next"
                  aria-label="Slide sau"
                  onClick={() => setReviewIndex((current) => Math.min(Math.max(0, reviewVideos.length - 5), current + 1))}
                >
                  <Arrow direction="right" />
                </button>
              </div>
            </div>
          </section>

          <div className="qh-two-boxes-wrap" id="offers">
            <section className="qh-review-section qh-box-offer">
              <div className="qh-review-header">
                <div className="qh-review-header-left">
                  <span className="qh-review-icon">
                    <i className="ri-coupon-3-fill" />
                  </span>
                  <h2 className="qh-review-title">ƯU ĐÃI ĐA NỀN TẢNG</h2>
                </div>
              </div>
              <div className="qh-review-inner">
                <div className="qh-offer-blog-grid">
                  {homeData.offers.map((item) => (
                    <a
                      className="qh-review-card qh-offer-blog-card"
                      href="#offers"
                      key={item.id}
                    >
                      <span className="qh-offer-blog-card-img-wrap">
                        <img src={item.image} alt="Ưu đãi" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </section>
            <section className="qh-review-section qh-box-blog">
              <div className="qh-review-header">
                <div className="qh-review-header-left">
                  <span className="qh-review-icon">
                    <i className="ri-article-line" />
                  </span>
                  <h2 className="qh-review-title">Blog</h2>
                </div>
              </div>
              <div className="qh-review-inner">
                <div className="qh-offer-blog-list">
                  {homeData.blogs.map((blog) => (
                    <article className="qh-offer-blog-item" key={blog.id}>
                      <div
                        className="qh-offer-blog-item-thumb"
                        style={{
                          backgroundImage: blog.image
                            ? `url(${blog.image})`
                            : undefined,
                        }}
                      />
                      <div className="qh-offer-blog-item-body">
                        <h3 className="qh-offer-blog-item-title">
                          {blog.title}
                        </h3>
                        <p className="qh-offer-blog-item-desc">
                          Kiến thức và tin tức công nghệ mới nhất từ QHUN22
                          Mobile.
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <section className="qh-usp-section">
            <div className="qh-usp-container">
              <div className="qh-featured-title-wrap">
                <span className="qh-featured-title">
                  TẠI SAO NÊN CHỌN CHÚNG TÔI?
                </span>
              </div>
              <div className="qh-usp-grid">
                {[
                  [
                    "ri-shield-check-line",
                    "Hàng Chính Hãng",
                    "Cam kết 100% sản phẩm chính hãng, đầy đủ phụ kiện.",
                  ],
                  [
                    "ri-arrow-go-back-line",
                    "Đổi Trả Dễ Dàng",
                    "Hỗ trợ đổi trả trong 7 ngày nếu lỗi kỹ thuật.",
                  ],
                  [
                    "ri-flashlight-line",
                    "Giao Hàng Nhanh",
                    "Giao hàng toàn quốc từ 1-2 ngày làm việc.",
                  ],
                  [
                    "ri-award-line",
                    "Bảo Hành Uy Tín",
                    "Bảo hành chính hãng từ 6-12 tháng.",
                  ],
                ].map(([icon, title, text]) => (
                  <div className="qh-usp-card" key={title}>
                    <div className="qh-usp-icon">
                      <i className={icon} />
                    </div>
                    <h3 className="qh-usp-card-title">{title}</h3>
                    <p className="qh-usp-card-desc">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </main>

      <footer className="qh-footer" id="footer">
        <div className="qh-footer-top">
          <div className="qh-footer-container">
            <div className="qh-footer-top-inner">
              <div className="qh-footer-feedback">
                <h2 className="qh-footer-feedback-title">
                  NHẬN TƯ VẤN VÀ ƯU ĐÃI
                </h2>
                <p className="qh-footer-feedback-desc">
                  Đăng ký ngay hôm nay để nhận được những ưu đãi đặc biệt và tư
                  vấn miễn phí từ chúng tôi!
                </p>
                {newsletterSent ? (
                  <p>Đăng ký thành công!</p>
                ) : (
                  <form
                    className="qh-footer-feedback-form"
                    onSubmit={submitNewsletter}
                  >
                    <input
                      className="qh-footer-feedback-input"
                      placeholder="Email hoặc số điện thoại"
                      required
                    />
                    <button className="qh-footer-feedback-btn">
                      ĐĂNG KÝ NGAY <span>→</span>
                    </button>
                  </form>
                )}
              </div>
              <div className="qh-footer-contact-block">
                <h3 className="qh-footer-block-title">LIÊN HỆ TRỰC TIẾP</h3>
                <div className="qh-footer-contact-row">
                  <div className="qh-footer-contact-icon">
                    <i className="ri-phone-fill" />
                  </div>
                  <div>
                    <span className="qh-footer-contact-label">Hotline</span>
                    <a
                      href="tel:0327221005"
                      className="qh-footer-contact-value"
                    >
                      032.722.1005
                    </a>
                  </div>
                </div>
                <div className="qh-footer-contact-row">
                  <div className="qh-footer-contact-icon">
                    <i className="ri-mail-fill" />
                  </div>
                  <div>
                    <span className="qh-footer-contact-label">Email</span>
                    <a
                      href="mailto:qhun22@gmail.com"
                      className="qh-footer-contact-value"
                    >
                      qhun22@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="qh-footer-social-block">
                <h3 className="qh-footer-block-title">KẾT NỐI VỚI CHÚNG TÔI</h3>
                <div className="qh-footer-social-circles">
                  <a href="#facebook" className="qh-footer-social-circle">
                    <i className="ri-facebook-fill" />
                  </a>
                  <a
                    href="https://zalo.me/0327221005"
                    className="qh-footer-social-circle"
                  >
                    <i className="ri-chat-3-fill" />
                  </a>
                  <a href="#tiktok" className="qh-footer-social-circle">
                    <i className="ri-tiktok-fill" />
                  </a>
                  <a href="#instagram" className="qh-footer-social-circle">
                    <i className="ri-instagram-fill" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="qh-footer-mid">
          <div className="qh-footer-container">
            <div className="qh-footer-grid">
              {[
                [
                  "TÀI KHOẢN",
                  "Tài khoản QHUN22",
                  "Đăng ký thành viên",
                  "Ưu đãi & Đặc quyền",
                ],
                [
                  "CHÍNH SÁCH",
                  "Chính sách đổi trả",
                  "Chính sách khuyến mãi",
                  "Chính sách bảo mật",
                  "Chính sách giao hàng",
                ],
                [
                  "CHĂM SÓC KHÁCH HÀNG",
                  "Tra cứu đơn hàng",
                  "Hỏi đáp - FAQs",
                  "Kiến thức mua sắm",
                ],
                [
                  "VỀ QHUN22",
                  "Trang chủ",
                  "Sản phẩm",
                  "Chính sách bảo hành",
                  "Cam kết chất lượng",
                ],
                [
                  "ĐỊA CHỈ LIÊN HỆ",
                  "Cửa hàng: B2, Tầng B2, Hanoi Centre, 175 Nguyễn Thái Học, Đống Đa, Hà Nội",
                  "Trung tâm vận hành: Lô C8, KCN Lại Yên, Hà Nội",
                ],
              ].map(([title, ...links]) => (
                <div className="qh-footer-col" key={title}>
                  <h3 className="qh-footer-col-title">{title}</h3>
                  <nav className="qh-footer-nav">
                    {links.map((link) => (
                      <a href="#footer" key={link}>
                        {link}
                      </a>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="qh-footer-bottom">
          <div className="qh-footer-container">
            <div className="qh-footer-bottom-inner">
              <div className="qh-footer-copyright">
                <p>© 2026 QHUN22 MOBILE.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div
        className={`qh-compare-overlay ${compareOpen ? "active" : ""}`}
        onClick={() => setCompareOpen(false)}
      />
      <div className={`qh-compare-bar ${compareOpen ? "active" : ""}`}>
        <div className="qh-compare-bar-head">
          <span className="qh-compare-bar-head-title">
            <i className="ri-arrow-left-right-line" /> SO SÁNH SẢN PHẨM
          </span>
          <button
            className="qh-compare-bar-toggle"
            onClick={() => setCompareOpen(false)}
          >
            <i className="ri-close-line" />
          </button>
        </div>
        <div className="qh-compare-bar-inner">
          <div className="qh-compare-bar-items">
            <p className="qh-compare-empty-state">
              <i className="ri-inbox-line" /> Chua có sản phẩm để so sánh.
            </p>
          </div>
          <div className="qh-compare-bar-actions">
            <button className="qh-compare-bar-clear">Xóa tất cả</button>
            <button className="qh-compare-bar-go" disabled>
              So sánh ngay
            </button>
          </div>
        </div>
      </div>
      {chatOpen && (
        <div className="qh-chat-window" style={{ display: "flex" }}>
          <div className="qh-chat-header">
            <div className="qh-chat-avatar">
              <img
                src="/static/icons/gatchan.png"
                className="qh-chat-bot-image"
                alt="Bot"
              />
            </div>
            <div className="qh-chat-header-info">
              <h6>TRỢ LÝ MUA SẮM</h6>
            </div>
            <button
              className="qh-chat-header-btn"
              onClick={() => setChatOpen(false)}
            >
              <i className="ri-close-line" />
            </button>
          </div>
          <div className="qh-chat-messages">
            <p>Xin chào! QHUN22 có thể giúp gì cho bạn?</p>
          </div>
          <div className="qh-chat-input-area">
            <input className="qh-chat-input" placeholder="Nhập tin nhắn..." />
            <button className="qh-chat-send">
              <i className="ri-send-plane-2-fill" />
            </button>
          </div>
        </div>
      )}
      <div className="qh-contact-bar" id="qh-contact-bar">
        <div className="qh-contact-bar-container">
          <button
            className="qh-contact-bar-item"
            onClick={() => setChatOpen(true)}
            title="Chat với AI"
          >
            <span className="qh-contact-bar-icon-wrap">
              <i className="ri-chat-3-fill" />
            </span>
            <span className="qh-contact-bar-tooltip">Chat</span>
          </button>
          <a href="https://zalo.me/0327221005" className="qh-contact-bar-item">
            <span className="qh-contact-bar-icon-wrap qh-contact-bar-icon-zalo">
              Z
            </span>
            <span className="qh-contact-bar-tooltip">Zalo</span>
          </a>
          <button
            className="qh-contact-bar-item"
            onClick={() => setCompareOpen(true)}
          >
            <span className="qh-contact-bar-icon-wrap">
              <i className="ri-arrow-left-right-line" />
            </span>
            <span className="qh-contact-bar-tooltip">So sánh</span>
          </button>
        </div>
      </div>
    </div>
  );
}
