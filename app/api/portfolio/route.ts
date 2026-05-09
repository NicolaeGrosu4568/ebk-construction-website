import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("order_index", { ascending: true });

  if (error) return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  return NextResponse.json(data);
}
