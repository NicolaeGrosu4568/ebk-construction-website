import { NextRequest, NextResponse } from "next/server";
import { createServiceClient, requireAdminSession } from "@/lib/supabase/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const unauth = await requireAdminSession(req);
  if (unauth) return unauth;

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const unauth = await requireAdminSession(req);
  if (unauth) return unauth;

  const body = await req.json();
  const parsed = z.object({
    id: z.string().uuid(),
    archived: z.boolean().optional(),
    read: z.boolean().optional(),
  }).safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error!.flatten().formErrors[0] ?? "Invalid input" }, { status: 400 });
  }

  const { id, ...updates } = parsed.data;
  const supabase = createServiceClient();
  const { error } = await supabase
    .from("contact_submissions")
    .update(updates)
    .eq("id", id);

  if (error) return NextResponse.json({ error: "Failed to update enquiry" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
