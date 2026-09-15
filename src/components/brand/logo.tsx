import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

type LogoProps = {
  className?: string;
  tone?: "default" | "inverse";
};

export function Logo({ className, tone = "default" }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label={siteConfig.name}
      className={cn(
        "inline-flex items-baseline gap-2.5 no-underline",
        className,
      )}
    >
      <span className="font-serif text-xl font-medium tracking-[0.32em] text-gold">
        {siteConfig.nameLatin}
      </span>
      <span
        className={cn(
          "text-sm font-medium tracking-wide",
          tone === "inverse" ? "text-ivory" : "text-foreground",
        )}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}
