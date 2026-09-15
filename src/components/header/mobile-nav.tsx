import { Menu } from "lucide-react";
import { useState } from "react";
import { MainNav } from "@/components/header/main-nav";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="باز کردن منو"
        >
          <Menu className="size-5" strokeWidth={1.5} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>
            <span className="font-serif tracking-[0.32em] text-gold">
              {siteConfig.nameLatin}
            </span>
            <span className="ms-2 font-sans text-sm font-medium tracking-wide text-foreground">
              {siteConfig.name}
            </span>
          </SheetTitle>
          <SheetDescription className="absolute m-[-1px] size-px overflow-hidden border-0 p-0 whitespace-nowrap">
            پیوندهای فروشگاه {siteConfig.name}
          </SheetDescription>
        </SheetHeader>
        <div className="px-6 py-6">
          <MainNav onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
