import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/")({ component: Home });

const highlights = [
  {
    to: "/products",
    title: "عطرها",
    text: "کاتالوگ عطرهای مزون، در مرحله بعد به این فضا متصل می‌شود.",
  },
  {
    to: "/brands",
    title: "برندها",
    text: "خانه‌های عطر و روایت هر برند، با معماری آماده برای توسعه.",
  },
  {
    to: "/articles",
    title: "مقالات",
    text: "یادداشت‌های بویایی و راهنمای انتخاب، در مسیرهای بعدی.",
  },
] as const;

function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ivory">
        <Container className="flex min-h-[72vh] flex-col justify-center py-20 sm:min-h-[78vh] sm:py-28">
          <p className="font-serif text-sm tracking-[0.35em] text-gold uppercase">
            {siteConfig.tagline}
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-tight sm:text-6xl">
            سکوت، طلا، و بویی که می‌ماند
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-ivory/70 sm:text-lg">
            {siteConfig.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button variant="gold" size="lg" asChild>
              <Link to="/products">
                مشاهده عطرها
                <ArrowLeft className="size-4" strokeWidth={1.5} />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-ivory/20 text-ivory hover:border-gold hover:bg-transparent hover:text-gold"
              asChild
            >
              <Link to="/special">مجموعه ویژه</Link>
            </Button>
          </div>
        </Container>
        <div className="hairline" />
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="font-serif text-xs tracking-[0.28em] text-gold uppercase">
              معماری مزون
            </p>
            <h2 className="mt-3 font-display text-2xl font-medium sm:text-3xl">
              زیرساختی آرام برای تجربه‌ای لوکس
            </h2>
            <p className="mt-4 text-muted-foreground">
              در این مرحله فقط اسکلت فروشگاه، هویت بصری و مسیرهای اصلی آماده شده‌اند.
              هیچ دادهٔ نمایشی به صفحات تزریق نشده است.
            </p>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-border transition-[border-color,box-shadow] duration-150 hover:border-gold/50 hover:shadow-border-hover"
                >
                  <h3 className="font-display text-lg font-medium">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                    {item.text}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-gold">
                    ورود به بخش
                    <ArrowLeft className="size-4 transition-transform duration-150 group-hover:-translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
