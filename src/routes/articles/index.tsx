import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/layout/section-placeholder";

export const Route = createFileRoute("/articles/")({
  component: ArticlesPage,
});

function ArticlesPage() {
  return (
    <SectionPlaceholder
      eyebrow="روایت"
      title="مقالات"
      description="صفحهٔ مجله و یادداشت‌های عطر در مراحل بعدی توسعه داده می‌شود."
    />
  );
}
