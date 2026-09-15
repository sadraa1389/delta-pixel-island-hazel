import { createFileRoute } from "@tanstack/react-router";
import { getSql } from "@/lib/db";

export const Route = createFileRoute("/api/articles")({
  server: { handlers: { GET: async ({ request }) => {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");
    const sql = await getSql();
    if (slug) {
      const rows = await sql.query<Record<string, unknown>>("select id,slug,title,excerpt,content,cover_url as \"coverUrl\",published_at as \"publishedAt\" from articles where slug=$1 and published_at is not null and published_at <= now() limit 1", [slug]);
      return rows[0] ? Response.json({ data: rows[0] }) : Response.json({ error: "مقاله پیدا نشد." }, { status: 404 });
    }
    const rows = await sql.query<Record<string, unknown>>("select id,slug,title,excerpt,cover_url as \"coverUrl\",published_at as \"publishedAt\" from articles where published_at is not null and published_at <= now() order by published_at desc nulls last limit 20");
    return Response.json({ data: rows });
  } } },
});
