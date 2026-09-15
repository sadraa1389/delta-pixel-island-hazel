import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ProductCard, type StoreProduct } from "@/components/storefront/product-card";

export const Route = createFileRoute("/products/")({ component: ProductsPage });

function ProductsPage() {
  const search = useSearch({ from: "/products/" }) as { q?: string };
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch(`/api/products?${search.q ? `q=${encodeURIComponent(search.q)}` : ""}`, { signal: controller.signal, credentials: "include" })
      .then(async (r) => { if (!r.ok) throw new Error("خطا در دریافت محصولات"); return r.json(); })
      .then((json) => setProducts(json.data ?? []))
      .catch((e) => { if (e.name !== "AbortError") setError("دریافت محصولات با مشکل مواجه شد."); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [search.q]);

  return <><PageHeader eyebrow="کاتالوگ" title="عطرها" description="مجموعه‌ای منتخب از عطرهای لوکس و ماندگار." /><section className="py-12 sm:py-16"><Container>
    {loading && <p className="py-12 text-center text-muted-foreground">در حال بارگذاری محصولات...</p>}
    {error && <p className="py-12 text-center text-destructive">{error}</p>}
    {!loading && !error && products.length === 0 && <div className="py-16 text-center"><p className="text-lg">محصولی پیدا نشد.</p><Link to="/products" className="mt-3 inline-block text-gold">مشاهده همه محصولات</Link></div>}
    {!loading && !error && products.length > 0 && <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-5">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
  </Container></section></>;
}
