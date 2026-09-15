import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/layout/section-placeholder";

export const Route = createFileRoute("/account/")({
  component: AccountPage,
});

function AccountPage() {
  return (
    <SectionPlaceholder
      eyebrow="کاربر"
      title="حساب کاربری"
      description="ورود، ثبت‌نام و پروفایل در مرحله بعد و پس از فعال‌سازی احراز هویت اضافه می‌شود."
    />
  );
}
