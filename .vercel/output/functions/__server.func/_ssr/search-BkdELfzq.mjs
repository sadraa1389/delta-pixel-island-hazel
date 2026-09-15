import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as PageHeader } from "./page-header-BIHoxB2b.mjs";
import { a as cn, i as Container } from "./router-CviMXQ47.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-BkdELfzq.js
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, type = "text", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("h-11 w-full rounded-md border border-border bg-surface px-3.5 text-sm text-foreground", "placeholder:text-muted-foreground", "transition-[border-color,box-shadow] duration-150 ease-out", "focus-visible:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-sm font-medium text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
function SearchPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "کشف",
		title: "جستجو",
		description: "جستجوی زندهٔ محصولات در مرحله بعد به این فرم متصل می‌شود."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-12 sm:py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mx-auto max-w-xl",
			onSubmit: (event) => {
				event.preventDefault();
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "store-search",
				children: "عبارت جستجو"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "store-search",
				name: "q",
				className: "mt-2",
				placeholder: "نام عطر، برند یا نت",
				autoComplete: "off"
			})]
		}) })
	})] });
}
//#endregion
export { SearchPage as component };
