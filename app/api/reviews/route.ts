import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { client_name, client_role, content, rating } = body;

  if (!client_name?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "Name and review are required." }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("testimonials").insert({
    client_name: client_name.trim(),
    client_role: client_role?.trim() || null,
    content: content.trim(),
    rating: rating ?? 5,
    published: false,
    submitted_by_client: true,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
