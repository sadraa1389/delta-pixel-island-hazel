# لیان | آتلیه عطر

فروشگاه اینترنتی لوکس عطر با رابط کاملاً فارسی و راست‌چین. این مخزن در مرحلهٔ اول فقط **زیرساخت و معماری** را شامل می‌شود.

## وضعیت فعلی

- هویت بصری، توکن‌های طراحی، Layout، Header و Footer
- مسیرهای اصلی فروشگاه بدون دادهٔ نمایشی
- کامپوننت‌های پایهٔ UI
- اسکیمای Prisma و SQL برای مراحل بعد
- بدون Authentication، سبد خرید عملیاتی، یا نظرات

## پشته

- React 19 و TypeScript
- مسیریابی فایل‌محور (TanStack Start / App Router style)
- Tailwind CSS
- PostgreSQL + Prisma (اسکیما آماده، کلاینت هنوز متصل نیست)
- طراحی Mobile-First و RTL

## ساختار

```text
src/
  routes/           مسیرهای فروشگاه
  components/
    layout/         شِل صفحه و Container
    header/         هدر و ناوبری
    footer/         فوتر
    ui/             کامپوننت‌های پایه
    brand/          هویت بصری
  config/           تنظیمات سایت
  lib/
    catalog/        تایپ‌های دامنه
    database/       محل اتصال بعدی Prisma
    validations/    اسکیماهای Zod در مراحل بعد
    utils/          ابزارهای مشترک
prisma/schema.prisma
database.sql
```

## مسیرها

| مسیر | وضعیت |
| --- | --- |
| `/` | صفحهٔ اصلی و هویت برند |
| `/products` | اسکلت کاتالوگ |
| `/categories` | اسکلت دسته‌بندی |
| `/brands` | اسکلت برندها |
| `/articles` | اسکلت مقالات |
| `/special` | اسکلت مجموعه ویژه |
| `/search` | اسکلت جستجو |
| `/cart` | اسکلت سبد خرید |
| `/account` | اسکلت حساب کاربری |

## مرحلهٔ بعد

اتصال Prisma، مدل محصولات، و تکمیل کاتالوگ — بدون ورود به Auth یا Cart تا زمان تعریف‌شده در برنامهٔ توسعه.
