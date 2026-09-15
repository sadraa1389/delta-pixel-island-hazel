import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/layout/section-placeholder";

export const Route = createFileRoute("/brands/")({
  component: BrandsPage,
});

function BrandsPage() {
  return (
    <SectionPlaceholder
      eyebrow="خانه‌ها"
      title="برندها"
      description="معرفی برندها پس از تعریف مدل داده و بدون دادهٔ نمایشی انجام خواهد شد."
    />
  );
}
