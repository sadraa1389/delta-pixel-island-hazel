import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getSql } from "@/lib/db";

const schema = z.object({ email: z.string().trim().email("ایمیل معتبر وارد کنید.").max(254) });

export const Route = createFileRoute("/api/newsletter")({
  server: { handlers: { POST: async ({ request }) => {
    let body: unknown;
    try { body = await request.json(); } catch { return Response.json({ error: "داده ارسالی نامعتبر است." }, { status: 400 }); }
    const parsed = schema.safeParse(body);
    if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "ایمیل نامعتبر است." }, { status: 400 });
    const sql = await getSql();
    const existing = await sql.query("select id from newsletter_subscribers where lower(email)=lower($1)", [parsed.data.email]);
    if (existing[0]) return Response.json({ message: "این ایمیل قبلاً عضو خبرنامه شده است." });
    await sql.query("insert into newsletter_subscribers (id,email) values ($1,$2)", [`subscriber-${crypto.randomUUID()}`, parsed.data.email]);
    return Response.json({ message: "عضویت شما در خبرنامه با موفقیت انجام شد." }, { status: 201 });
  } } },
});
