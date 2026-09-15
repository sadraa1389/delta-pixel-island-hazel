import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getSql } from "@/lib/db";

const reviewSchema = z.object({
  productId: z.string().min(1).max(100),
  userName: z.string().trim().min(2, "نام را وارد کنید.").max(80),
  text: z.string().trim().min(5, "متن دیدگاه خیلی کوتاه است.").max(2000),
  rating: z.coerce.number().int().min(1).max(5),
});

export const Route = createFileRoute("/api/reviews")({
  server: { handlers: {
    GET: async ({ request }) => {
      const url = new URL(request.url);
      const productId = url.searchParams.get("productId");
      if (!productId) return Response.json({ error: "شناسه محصول الزامی است." }, { status: 400 });
      const page = Math.max(1, Number(url.searchParams.get("page") || 1));
      const limit = Math.min(20, Math.max(1, Number(url.searchParams.get("limit") || 3)));
      const sql = await getSql();
      const rows = await sql.query<Record<string, unknown>>("select id,user_name as \"userName\",text,rating,created_at as \"createdAt\" from reviews where product_id=$1 and status='APPROVED' order by created_at desc limit $2 offset $3", [productId, limit, (page-1)*limit]);
      const count = await sql.query<{ count: string }>("select count(*)::text as count from reviews where product_id=$1 and status='APPROVED'", [productId]);
      return Response.json({ data: rows, pagination: { page, limit, total: Number(count[0]?.count ?? 0) } });
    },
    POST: async ({ request }) => {
      let body: unknown;
      try { body = await request.json(); } catch { return Response.json({ error: "داده ارسالی نامعتبر است." }, { status: 400 }); }
      const parsed = reviewSchema.safeParse(body);
      if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "اطلاعات نامعتبر است." }, { status: 400 });
      const sql = await getSql();
      const product = await sql.query<{ id: string }>("select id from products where id=$1 and status='ACTIVE'", [parsed.data.productId]);
      if (!product[0]) return Response.json({ error: "محصول پیدا نشد." }, { status: 404 });
      await sql.query("insert into reviews (id,product_id,user_name,text,rating,status) values ($1,$2,$3,$4,$5,'PENDING')", [`review-${crypto.randomUUID()}`, parsed.data.productId, parsed.data.userName, parsed.data.text, parsed.data.rating]);
      return Response.json({ message: "دیدگاه شما ثبت شد و پس از بررسی منتشر می‌شود." }, { status: 201 });
    },
  } },
});
