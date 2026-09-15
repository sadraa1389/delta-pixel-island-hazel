import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, Boxes, ClipboardList, MessageSquare, Package, Users } from "lucide-react";
import { getSql } from "@/lib/db";

export const Route = createFileRoute("/admin/")({
  loader: async () => {
    const sql = await getSql();
    const [products, users, pendingReviews, orders] = await Promise.all([
      sql.query<{ count: string }>("select count(*)::text as count from products"),
      sql.query<{ count: string }>('select count(*)::text as count from "user"'),
      sql.query<{ count: string }>("select count(*)::text as count from reviews where status='PENDING'"),
      sql.query<{ count: string }>("select 0::text as count"),
    ]);

    return {
      products: Number(products[0]?.count ?? 0),
      users: Number(users[0]?.count ?? 0),
      pendingReviews: Number(pendingReviews[0]?.count ?? 0),
      orders: Number(orders[0]?.count ?? 0),
    };
  },
  component: AdminDashboard,
});

const cards = [
  { key: "products", title: "محصولات", icon: Package, href: "/admin/products" },
  { key: "users", title: "کاربران", icon: Users, href: "/admin/users" },
  { key: "pendingReviews", title: "نظرات در انتظار", icon: MessageSquare, href: "/admin/reviews" },
  { key: "orders", title: "سفارش‌ها", icon: ClipboardList, href: "/admin/orders" },
] as const;

function AdminDashboard() {
  const stats = Route.useLoaderData();

  return (
    <main dir="rtl" className="min-h-screen bg-ink px-4 py-8 text-ivory sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-ivory/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-serif text-xs tracking-[0.3em] text-gold">ADMIN PANEL</p>
            <h1 className="mt-3 font-display text-3xl font-medium sm:text-4xl">داشبورد مدیریت</h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-ivory/60">
              نمای کلی فروشگاه و دسترسی سریع به بخش‌های مدیریتی.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-ivory/60 transition-colors hover:text-gold"
          >
            مشاهده فروشگاه
            <ArrowLeft className="size-4" />
          </Link>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.key}
                to={card.href}
                className="group rounded-xl border border-ivory/10 bg-ivory/[0.03] p-5 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-ivory/[0.05]"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-10 items-center justify-center rounded-lg border border-gold/20 text-gold">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <ArrowLeft className="size-4 text-ivory/30 transition-transform group-hover:-translate-x-1 group-hover:text-gold" />
                </div>
                <p className="mt-6 text-sm text-ivory/55">{card.title}</p>
                <p className="mt-1 font-display text-3xl">{stats[card.key].toLocaleString("fa-IR")}</p>
              </Link>
            );
          })}
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border border-ivory/10 bg-ivory/[0.03] p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="size-5 text-gold" strokeWidth={1.5} />
              <h2 className="font-display text-xl">وضعیت فروشگاه</h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-ivory/55">
              داشبورد مرحله دوم آماده است. آمار فعلی مستقیماً از دیتابیس خوانده می‌شود و در مرحله سفارش‌ها، نمودار فروش و درآمد نیز به داده‌های واقعی متصل خواهد شد.
            </p>
          </div>

          <div className="rounded-xl border border-gold/20 bg-gold/[0.04] p-6">
            <div className="flex items-center gap-3">
              <Boxes className="size-5 text-gold" strokeWidth={1.5} />
              <h2 className="font-display text-xl">مرحله بعد</h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-ivory/55">
              مدیریت محصولات، ایجاد و ویرایش کالاها، موجودی، قیمت و تصاویر در مرحله ۳ پیاده‌سازی می‌شود.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
