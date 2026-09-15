import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/search/")({
  component: SearchPage,
});

function SearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="کشف"
        title="جستجو"
        description="جستجوی زندهٔ محصولات در مرحله بعد به این فرم متصل می‌شود."
      />
      <section className="py-12 sm:py-16">
        <Container>
          <form
            className="mx-auto max-w-xl"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Label htmlFor="store-search">عبارت جستجو</Label>
            <Input
              id="store-search"
              name="q"
              className="mt-2"
              placeholder="نام عطر، برند یا نت"
              autoComplete="off"
            />
          </form>
        </Container>
      </section>
    </>
  );
}
