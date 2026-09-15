import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as cn, i as Container } from "./router-CviMXQ47.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-header-BIHoxB2b.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ eyebrow, title, description, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("border-b border-border bg-cream py-12 sm:py-16", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, { children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 font-serif text-xs tracking-[0.28em] text-gold uppercase",
				children: eyebrow
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-medium text-foreground sm:text-4xl",
				children: title
			}),
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-base text-muted-foreground",
				children: description
			}) : null
		] })
	});
}
//#endregion
export { PageHeader as t };
