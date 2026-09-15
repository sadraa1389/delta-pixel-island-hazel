import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getSql } from "@/lib/db";

const querySchema = z.object({
  q: z.string().trim().max(100).optional(),
  category: z.string().trim().max(60).optional(),
  brand: z.string().trim().max(60).optional(),
  gender: z.enum(["FEMININE", "MASCULINE", "UNISEX"]).optional(),
  sort: z.enum(["newest", "price_asc", "price_desc", "rating"]).default("newest"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(48).default(12),
});

export const Route = createFileRoute("/api/products")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const parsed = querySchema.safeParse(Object.fromEntries(url.searchParams));
        if (!parsed.success) return Response.json({ error: "پارامترهای جستجو نامعتبر است." }, { status: 400 });
        const { q, category, brand, gender, sort, page, limit } = parsed.data;
        const sql = await getSql();
        const values: unknown[] = [];
        const where: string[] = ["p.status = 'ACTIVE'"];
        const add = (value: unknown) => { values.push(value); return `$${values.length}`; };
        if (q) { const p = add(`%${q}%`); where.push(`(p.name_fa ilike ${p} or p.name ilike ${p} or b.name_fa ilike ${p} or b.name ilike ${p})`); }
        if (category) { const p = add(category); where.push(`c.slug = ${p}`); }
        if (brand) { const p = add(brand); where.push(`b.slug = ${p}`); }
        if (gender) { const p = add(gender); where.push(`p.gender_target = ${p}`); }
        const order = sort === "price_asc" ? "p.price_amount asc" : sort === "price_desc" ? "p.price_amount desc" : sort === "rating" ? "average_rating desc, p.created_at desc" : "p.created_at desc";
        const offset = (page - 1) * limit;
        const countRows = await sql.query<{ count: string }>(`select count(*)::text as count from products p join brands b on b.id=p.brand_id join categories c on c.id=p.category_id where ${where.join(" and ")}`, values);
        const dataValues = [...values, limit, offset];
        const rows = await sql.query<Record<string, unknown>>(`
          select p.id,p.slug,p.name,p.name_fa,p.description,p.price_amount,p.compare_amount,p.stock_qty,p.gender_target,p.concentration,p.volume_ml,b.name as brand,b.name_fa as brand_fa,c.name_fa as category,
          coalesce((select round(avg(r.rating),1) from reviews r where r.product_id=p.id and r.status='APPROVED'),0) as average_rating,
          coalesce((select count(*) from reviews r where r.product_id=p.id and r.status='APPROVED'),0) as review_count,
          coalesce((select pi.url from product_images pi where pi.product_id=p.id order by pi.sort_order asc limit 1),'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85') as image
          from products p join brands b on b.id=p.brand_id join categories c on c.id=p.category_id where ${where.join(" and ")} order by ${order} limit $${dataValues.length-1} offset $${dataValues.length}
        `, dataValues);
        return Response.json({ data: rows, pagination: { page, limit, total: Number(countRows[0]?.count ?? 0), totalPages: Math.ceil(Number(countRows[0]?.count ?? 0) / limit) } });
      },
    },
  },
});
