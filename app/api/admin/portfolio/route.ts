import { NextRequest, NextResponse } from "next/server";
import { createServiceClient, requireAdminSession } from "@/lib/supabase/server";
import { z } from "zod";

const projectSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  category: z.string().min(1).max(100),
  project_type: z.string().max(100).optional().nullable(),
  location: z.string().max(200).optional().nullable(),
  short_description: z.string().max(500).optional().nullable(),
  full_description: z.string().max(5000).optional().nullable(),
  cover_image_url: z.string().url().optional().nullable(),
  images: z.array(z.string().url()).optional(),
  published: z.boolean().optional(),
  order_index: z.number().int().optional(),
});

export async function GET(req: NextRequest) {
  const unauth = await requireAdminSession(req);
  if (unauth) return unauth;

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const unauth = await requireAdminSession(req);
  if (unauth) return unauth;

  const body = await req.json();
  const parsed = projectSchema.omit({ id: true }).safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error!.flatten().formErrors[0] ?? "Invalid input" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("projects")
    .insert(parsed.data)
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const unauth = await requireAdminSession(req);
  if (unauth) return unauth;

  const body = await req.json();
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error!.flatten().formErrors[0] ?? "Invalid input" }, { status: 400 });
  }

  const { id, ...updates } = parsed.data;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("projects")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const unauth = await requireAdminSession(req);
  if (unauth) return unauth;

  const body = await req.json();
  const { id } = z.object({ id: z.string().uuid() }).parse(body);

  const supabase = createServiceClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
