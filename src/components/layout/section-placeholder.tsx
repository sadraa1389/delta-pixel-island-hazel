import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";

type SectionPlaceholderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function SectionPlaceholder({
  eyebrow,
  title,
  description,
}: SectionPlaceholderProps) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="rounded-xl border border-border bg-surface px-6 py-16 text-center shadow-border sm:px-10">
            <div className="mx-auto mb-6 h-px w-16 bg-gold" />
            <p className="text-sm text-muted-foreground">
              این بخش در مرحله بعد تکمیل می‌شود.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
