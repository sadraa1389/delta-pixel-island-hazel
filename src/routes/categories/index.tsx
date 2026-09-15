import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/layout/section-placeholder";

export const Route = createFileRoute("/categories/")({
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <SectionPlaceholder
      eyebrow="ساختار"
      title="دسته‌بندی"
      description="خانواده‌های بویایی و دسته‌های فروش در مرحله بعد به این مسیر متصل می‌شوند."
    />
  );
}
