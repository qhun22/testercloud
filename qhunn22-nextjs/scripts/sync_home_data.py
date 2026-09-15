import json
import random
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE_DB = ROOT / "tailieuthamkhaonocommit" / "db.sqlite3"
OUTPUT = Path(__file__).resolve().parents[1] / "src" / "data" / "home-data.json"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

logo_by_slug = {
    "apple": "logo_iphone_ngang_eac93ff477.webp",
    "samsung": "logo_samsung_ngang_1624d75bd8.webp",
    "xiaomi": "logo_xiaomi_ngang_0faf267234.webp",
    "oppo": "logo_oppo_ngang_68d31fcd73.webp",
    "vivo": "logo_vivo_ngang_45494ff733.webp",
    "realme": "logo_realme_ngang_0185815a13.webp",
    "honor": "logo_honor_ngang_814fca59e4.webp",
    "red-magic": "logo_redmagic_ngang_505d29c537.webp",
    "tecno": "logo_tecno_ngang_c587e5f1fa.webp",
    "benco": "logo_benco_ngang_d31d9c3b77.webp",
}

connection = sqlite3.connect(SOURCE_DB)
connection.row_factory = sqlite3.Row

brands = [
    {**dict(row), "logo": logo_by_slug.get(row["slug"], "")}
    for row in connection.execute(
        "select id, name, slug from store_brand where is_active = 1 order by name"
    )
]

product_rows = connection.execute(
    """
    select p.id, p.name, p.slug, p.image, p.price, p.original_price,
           p.discount_percent, p.stock, p.brand_id, b.name as brand_name,
           d.original_price as detail_original_price,
           d.discount_percent as detail_discount_percent,
           (select min(v.price) from store_productvariant v where v.detail_id = d.id) as variant_price,
           (select min(v.original_price) from store_productvariant v where v.detail_id = d.id) as variant_original_price,
           (select max(v.discount_percent) from store_productvariant v where v.detail_id = d.id) as variant_discount_percent
    from store_product p
    left join store_brand b on b.id = p.brand_id
    left join store_productdetail d on d.product_id = p.id
    where p.is_active = 1
    order by case when p.stock > 0 then 0 else 1 end, p.id desc
    """
).fetchall()

def product(row):
    original = row["detail_original_price"] or row["original_price"] or row["variant_original_price"] or 0
    discount = row["detail_discount_percent"] or row["discount_percent"] or row["variant_discount_percent"] or 0
    price = row["price"] or row["variant_price"] or 0
    if not price and original and discount:
        price = round(original * (100 - discount) / 100 / 5000) * 5000
    return {
        "id": row["id"], "name": row["name"], "slug": row["slug"],
        "image": f"/media/{row['image']}" if row["image"] else "",
        "price": int(price), "originalPrice": int(original),
        "discountPercent": int(discount), "stock": int(row["stock"] or 0),
        "brand": row["brand_name"] or "",
    }

products = [product(row) for row in product_rows]
hot_ids = [row["product_id"] for row in connection.execute(
    "select product_id from store_hotsaleproduct where is_active = 1 order by sort_order, id limit 10"
)]
product_by_id = {item["id"]: item for item in products}
hot_sale = [product_by_id[item_id] for item_id in hot_ids if item_id in product_by_id]

banners = [
    {"id": row["banner_id"], "image": f"/media/{row['image']}"}
    for row in connection.execute(
        "select banner_id, image from store_banner order by banner_id"
    )
]
banners_by_id = {item["id"]: item for item in banners}
offer_ids = ["83861", "83862", "83863", "83864"]
offers = [banners_by_id[item] for item in offer_ids if item in banners_by_id]

blogs = [
    {"id": row["id"], "title": row["title"], "image": f"/media/{row['image']}" if row["image"] else ""}
    for row in connection.execute(
        "select id, title, image from store_blogpost where is_active = 1 order by created_at desc limit 4"
    )
]

payload = {
    "brands": brands,
    "products": products[:15],
    "suggestedProducts": products[:10],
    "hotSaleProducts": hot_sale,
    "banners": banners,
    "offers": offers,
    "blogs": blogs,
}
OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Synced {len(products)} products, {len(brands)} brands, {len(banners)} banners, {len(blogs)} blogs")
