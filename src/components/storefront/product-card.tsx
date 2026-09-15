import { Link } from "@tanstack/react-router";
import { ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export type StoreProduct = {
  id: string; slug: string; name_fa: string; brand_fa: string; price_amount: number; compare_amount?: number | null;
  stock_qty: number; image: string; average_rating?: number | string; review_count?: number | string;
};

const money = (value: number) => new Intl.NumberFormat("fa-IR").format(value) + " تومان";

export function ProductCard({ product }: { product: StoreProduct }) {
  const discount = product.compare_amount && product.compare_amount > product.price_amount
    ? Math.round((1 - product.price_amount / product.compare_amount) * 100) : 0;
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-background">
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block" aria-label={`مشاهده ${product.name_fa}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img src={product.image} alt={product.name_fa} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          {discount > 0 && <span className="absolute right-3 top-3 rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-gold-foreground">{discount}٪</span>}
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div><p className="text-xs text-muted-foreground">{product.brand_fa}</p><Link to="/products/$slug" params={{ slug: product.slug }} className="mt-1 block font-semibold hover:text-gold">{product.name_fa}</Link></div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground"><Star className="size-3.5 fill-current" /><span>{Number(product.average_rating || 0).toLocaleString("fa-IR")}</span><span>({Number(product.review_count || 0).toLocaleString("fa-IR")})</span></div>
        <div className="flex items-end justify-between gap-2"><div><strong>{money(Number(product.price_amount))}</strong>{discount > 0 && <del className="mr-2 text-xs text-muted-foreground">{money(Number(product.compare_amount))}</del>}</div><Button size="icon" variant="gold" aria-label="افزودن به سبد خرید"><ShoppingBag className="size-4" /></Button></div>
      </div>
    </article>
  );
}
