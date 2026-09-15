import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/layout/section-placeholder";

export const Route = createFileRoute("/products/")({
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <SectionPlaceholder
      eyebrow="کاتالوگ"
      title="عطرها"
      description="فهرست محصولات در مرحله بعد و پس از اتصال پایگاه داده پیاده‌سازی می‌شود."
    />
  );
}
