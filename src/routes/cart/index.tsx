import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/layout/section-placeholder";

export const Route = createFileRoute("/cart/")({
  component: CartPage,
});

function CartPage() {
  return (
    <SectionPlaceholder
      eyebrow="سفارش"
      title="سبد خرید"
      description="سبد خرید و تسویه در این مرحله پیاده‌سازی نشده است."
    />
  );
}
