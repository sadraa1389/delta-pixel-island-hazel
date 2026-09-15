import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/search/")({ component: SearchPage });

function SearchPage() {
  const current = useSearch({ from: "/search/" }) as { q?: string };
  const navigate = useNavigate();
  const [q, setQ] = useState(current.q ?? "");
  return <><PageHeader eyebrow="کشف" title="جستجوی عطر" description="نام عطر یا برند موردنظر خود را جستجو کنید." /><section className="py-12"><Container><form className="mx-auto flex max-w-xl gap-2" onSubmit={(event) => { event.preventDefault(); void navigate({ to: "/products", search: { q } as never }); }}><div className="flex-1"><Label htmlFor="store-search">عبارت جستجو</Label><Input id="store-search" name="q" value={q} onChange={(e) => setQ(e.target.value)} className="mt-2" placeholder="نام عطر یا برند" autoComplete="off" /></div><Button type="submit" className="mt-7">جستجو</Button></form></Container></section></>;
}
