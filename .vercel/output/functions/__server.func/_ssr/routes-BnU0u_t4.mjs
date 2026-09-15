import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as ArrowLeft } from "../_libs/lucide-react.mjs";
import { i as Container, n as Button, r as siteConfig } from "./router-CviMXQ47.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BnU0u_t4.js
var import_jsx_runtime = require_jsx_runtime();
var highlights = [
	{
		to: "/products",
		title: "عطرها",
		text: "کاتالوگ عطرهای مزون، در مرحله بعد به این فضا متصل می‌شود."
	},
	{
		to: "/brands",
		title: "برندها",
		text: "خانه‌های عطر و روایت هر برند، با معماری آماده برای توسعه."
	},
	{
		to: "/articles",
		title: "مقالات",
		text: "یادداشت‌های بویایی و راهنمای انتخاب، در مسیرهای بعدی."
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-ink text-ivory",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "flex min-h-[72vh] flex-col justify-center py-20 sm:min-h-[78vh] sm:py-28",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-sm tracking-[0.35em] text-gold uppercase",
					children: siteConfig.tagline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 max-w-3xl font-display text-4xl font-medium leading-tight sm:text-6xl",
					children: "سکوت، طلا، و بویی که می‌ماند"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-xl text-base leading-8 text-ivory/70 sm:text-lg",
					children: siteConfig.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "gold",
						size: "lg",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/products",
							children: ["مشاهده عطرها", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
								className: "size-4",
								strokeWidth: 1.5
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "lg",
						className: "border-ivory/20 text-ivory hover:border-gold hover:bg-transparent hover:text-gold",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/special",
							children: "مجموعه ویژه"
						})
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline" })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16 sm:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-xs tracking-[0.28em] text-gold uppercase",
					children: "معماری مزون"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-2xl font-medium sm:text-3xl",
					children: "زیرساختی آرام برای تجربه‌ای لوکس"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: "در این مرحله فقط اسکلت فروشگاه، هویت بصری و مسیرهای اصلی آماده شده‌اند. هیچ دادهٔ نمایشی به صفحات تزریق نشده است."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-12 grid gap-4 sm:grid-cols-3",
			children: highlights.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				className: "group flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-border transition-[border-color,box-shadow] duration-150 hover:border-gold/50 hover:shadow-border-hover",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-medium",
						children: item.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 flex-1 text-sm leading-7 text-muted-foreground",
						children: item.text
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-6 inline-flex items-center gap-2 text-sm text-gold",
						children: ["ورود به بخش", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4 transition-transform duration-150 group-hover:-translate-x-0.5" })]
					})
				]
			}) }, item.to))
		})] })
	})] });
}
//#endregion
export { Home as component };
