import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <section className={cn("border-b border-border bg-cream py-12 sm:py-16", className)}>
      <Container>
        {eyebrow ? (
          <p className="mb-3 font-serif text-xs tracking-[0.28em] text-gold uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
