import { NextRequest, NextResponse } from "next/server";
import { createServiceClient, requireAdminSession } from "@/lib/supabase/server";

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "webp", "avif"]);
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  const unauth = await requireAdminSession(req);
  if (unauth) return unauth;

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const folder = (formData.get("folder") as string | null)?.replace(/[^a-z0-9-_]/gi, "") || "general";

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "File too large. Maximum size is 5 MB." }, { status: 400 });
  }

  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json({ error: "Invalid file type. Allowed: JPG, PNG, WebP, AVIF." }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_EXT.has(ext)) {
    return NextResponse.json({ error: "Invalid file extension." }, { status: 400 });
  }

  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const supabase = createServiceClient();
  const { error } = await supabase.storage
    .from("portfolio-images")
    .upload(fileName, file, { contentType: file.type, upsert: false });

  if (error) return NextResponse.json({ error: "Upload failed" }, { status: 500 });

  const { data } = supabase.storage.from("portfolio-images").getPublicUrl(fileName);
  return NextResponse.json({ url: data.publicUrl });
}
