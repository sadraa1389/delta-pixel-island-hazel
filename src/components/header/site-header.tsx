import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { MainNav } from "@/components/header/main-nav";
import { MobileNav } from "@/components/header/mobile-nav";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <div className="flex min-w-0 items-center gap-8">
          <Logo />
          <MainNav className="hidden lg:flex" />
        </div>

        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/search" aria-label="جستجو">
              <Search className="size-5" strokeWidth={1.5} />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/account" aria-label="حساب کاربری">
              <User className="size-5" strokeWidth={1.5} />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/cart" aria-label="سبد خرید">
              <ShoppingBag className="size-5" strokeWidth={1.5} />
            </Link>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
