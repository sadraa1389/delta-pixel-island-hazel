import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-ink text-ivory">
      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="max-w-md">
          <Logo tone="inverse" />
          <p className="mt-4 text-sm leading-7 text-ivory/70">
            {siteConfig.description}
          </p>
        </div>

        <nav aria-label="پیوندهای پاورقی">
          <p className="font-serif text-xs tracking-[0.28em] text-gold uppercase">
            فروشگاه
          </p>
          <ul className="mt-4 grid gap-1 sm:grid-cols-2">
            {siteConfig.footerNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="inline-flex min-h-11 items-center text-sm text-ivory/80 transition-colors duration-150 hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-ivory/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.copyright}
          </p>
          <p className="font-serif tracking-[0.24em] text-gold uppercase">
            {siteConfig.tagline}
          </p>
        </Container>
      </div>
    </footer>
  );
}
