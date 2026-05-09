import { NextRequest, NextResponse } from "next/server";
import { createServiceClient, requireAdminSession } from "@/lib/supabase/server";
import { z } from "zod";

const blogSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(300),
  slug: z.string().min(1).max(300),
  excerpt: z.string().max(500).optional().nullable(),
  content: z.string().max(50000).optional().nullable(),
  cover_image_url: z.string().url().optional().nullable(),
  published: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  const unauth = await requireAdminSession(req);
  if (unauth) return unauth;

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const unauth = await requireAdminSession(req);
  if (unauth) return unauth;

  const body = await req.json();
  const parsed = blogSchema.omit({ id: true }).safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error!.flatten().formErrors[0] ?? "Invalid input" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .insert(parsed.data)
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const unauth = await requireAdminSession(req);
  if (unauth) return unauth;

  const body = await req.json();
  const parsed = blogSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error!.flatten().formErrors[0] ?? "Invalid input" }, { status: 400 });
  }

  const { id, ...updates } = parsed.data;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("blog_posts")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const unauth = await requireAdminSession(req);
  if (unauth) return unauth;

  const body = await req.json();
  const { id } = z.object({ id: z.string().uuid() }).parse(body);

  const supabase = createServiceClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
