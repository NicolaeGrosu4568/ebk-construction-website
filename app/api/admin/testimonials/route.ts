import { NextRequest, NextResponse } from "next/server";
import { createServiceClient, requireAdminSession } from "@/lib/supabase/server";
import { z } from "zod";

const testimonialSchema = z.object({
  id: z.string().uuid().optional(),
  client_name: z.string().min(1).max(200),
  client_role: z.string().max(200).optional().nullable(),
  content: z.string().min(1).max(2000),
  rating: z.number().int().min(1).max(5).optional().nullable(),
  published: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  const unauth = await requireAdminSession(req);
  if (unauth) return unauth;

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const unauth = await requireAdminSession(req);
  if (unauth) return unauth;

  const body = await req.json();
  const parsed = testimonialSchema.omit({ id: true }).safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error!.flatten().formErrors[0] ?? "Invalid input" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("testimonials")
    .insert(parsed.data)
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const unauth = await requireAdminSession(req);
  if (unauth) return unauth;

  const body = await req.json();
  const parsed = testimonialSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error!.flatten().formErrors[0] ?? "Invalid input" }, { status: 400 });
  }

  const { id, ...updates } = parsed.data;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("testimonials")
    .update(updates)
    .eq("id", id);

  if (error) return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const unauth = await requireAdminSession(req);
  if (unauth) return unauth;

  const body = await req.json();
  const parsed = z.object({ id: z.string().uuid() }).safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const { id } = parsed.data;

  const supabase = createServiceClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
