import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { AppErrorComponent } from "@/lib/error-component";
import appCss from "../styles.css?url";

function NotFoundPage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-serif text-xs tracking-[0.28em] text-gold uppercase">
        ۴۰۴
      </p>
      <h1 className="mt-4 font-display text-3xl font-medium">صفحه پیدا نشد</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        مسیر مورد نظر در مزون لیان وجود ندارد.
      </p>
      <Button className="mt-8" asChild>
        <Link to="/">بازگشت به خانه</Link>
      </Button>
    </section>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${siteConfig.name} | ${siteConfig.tagline}` },
      { name: "description", content: siteConfig.description },
      { name: "theme-color", content: "#0A0A0A" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootDocument,
  errorComponent: AppErrorComponent,
  notFoundComponent: NotFoundPage,
});

function RootDocument() {
  return (
    <html lang="fa" dir="rtl" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <PreviewHostBridge />
        <AuthProvider>
          <SiteShell>
            <Outlet />
          </SiteShell>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
