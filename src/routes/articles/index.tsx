import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";

export const Route = createFileRoute("/articles/")({ component: ArticlesPage });

function ArticlesPage() {
  const [articles, setArticles] = useState<Array<{ id:string; slug:string; title:string; excerpt?:string; coverUrl?:string }>>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetch("/api/articles").then(r => r.json()).then(j => setArticles(j.data ?? [])).finally(() => setLoading(false)); }, []);
  return <><PageHeader eyebrow="روایت" title="مجله عطر" description="راهنمای انتخاب عطر، نت‌ها و دنیای برندهای لوکس." /><section className="py-12 sm:py-16"><Container>{loading ? <p className="py-12 text-center text-muted-foreground">در حال بارگذاری...</p> : articles.length === 0 ? <p className="py-12 text-center text-muted-foreground">هنوز مقاله‌ای منتشر نشده است.</p> : <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{articles.map(a => <Link key={a.id} to="/articles/$slug" params={{slug:a.slug}} className="overflow-hidden rounded-xl border border-border hover:border-gold">{a.coverUrl && <img src={a.coverUrl} alt="" className="aspect-video w-full object-cover" loading="lazy" />}<div className="p-5"><h2 className="font-semibold">{a.title}</h2>{a.excerpt && <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{a.excerpt}</p>}</div></Link>)}</div>}</Container></section></>;
}
