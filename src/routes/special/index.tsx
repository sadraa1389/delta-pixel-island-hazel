import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/layout/section-placeholder";

export const Route = createFileRoute("/special/")({
  component: SpecialPage,
});

function SpecialPage() {
  return (
    <SectionPlaceholder
      eyebrow="انتخاب مزون"
      title="ویژه"
      description="مجموعه‌های محدود و پیشنهادهای ویژه بعداً روی همین مسیر قرار می‌گیرند."
    />
  );
}
