import { createFileRoute } from "@tanstack/react-router";
import { getSql } from "@/lib/db";

export const Route = createFileRoute("/api/products/$slug")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const sql = await getSql();
        const rows = await sql.query<Record<string, unknown>>(`
          select p.id,p.slug,p.name,p.name_fa,p.description,p.price_amount,p.compare_amount,p.stock_qty,p.gender_target,p.concentration,p.fragrance_family,p.volume_ml,
          b.name as brand,b.name_fa as brand_fa,b.slug as brand_slug,c.name_fa as category,c.slug as category_slug,
          coalesce((select round(avg(r.rating),1) from reviews r where r.product_id=p.id and r.status='APPROVED'),0) as average_rating,
          coalesce((select count(*) from reviews r where r.product_id=p.id and r.status='APPROVED'),0) as review_count
          from products p join brands b on b.id=p.brand_id join categories c on c.id=p.category_id where p.slug=$1 and p.status='ACTIVE' limit 1
        `, [params.slug]);
        if (!rows[0]) return Response.json({ error: "محصول پیدا نشد." }, { status: 404 });
        const images = await sql.query<{ url: string; alt: string | null }>("select url,alt from product_images where product_id=$1 order by sort_order,id", [rows[0].id]);
        return Response.json({ data: { ...rows[0], images } });
      },
    },
  },
});
