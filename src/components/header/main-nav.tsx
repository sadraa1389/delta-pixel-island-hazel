import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type MainNavProps = {
  className?: string;
  onNavigate?: () => void;
};

export function MainNav({ className, onNavigate }: MainNavProps) {
  return (
    <nav aria-label="منوی اصلی" className={cn("flex items-center", className)}>
      <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-8">
        {siteConfig.nav.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              onClick={onNavigate}
              className="inline-flex min-h-11 items-center text-sm tracking-wide text-foreground transition-colors duration-150 hover:text-gold"
              activeProps={{
                className: "text-gold",
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
