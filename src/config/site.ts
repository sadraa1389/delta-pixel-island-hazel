export type NavItem = {
  to: string;
  label: string;
};

export const siteConfig = {
  name: "لیان",
  nameLatin: "LIAN",
  tagline: "آتلیه عطر",
  description:
    "مزون لیان، خانه‌ای برای عطرهای لوکس با طراحی مینیمال و تجربه‌ای فارسی و راست‌چین.",
  copyright: "لیان. تمامی حقوق محفوظ است.",
  nav: [
    { to: "/products", label: "عطرها" },
    { to: "/categories", label: "دسته‌بندی" },
    { to: "/brands", label: "برندها" },
    { to: "/special", label: "ویژه" },
    { to: "/articles", label: "مقالات" },
  ] as const satisfies readonly NavItem[],
  footerNav: [
    { to: "/products", label: "عطرها" },
    { to: "/brands", label: "برندها" },
    { to: "/articles", label: "مقالات" },
    { to: "/search", label: "جستجو" },
  ] as const satisfies readonly NavItem[],
} as const;
