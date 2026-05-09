import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 3;
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-vercel-forwarded-for") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const body = await req.json();
  const { client_name, client_role, content, rating } = body;

  if (!client_name?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "Name and review are required." }, { status: 400 });
  }

  if (client_name.trim().length > 200 || content.trim().length > 2000) {
    return NextResponse.json({ error: "Input too long." }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("testimonials").insert({
    client_name: client_name.trim(),
    client_role: client_role?.trim() || null,
    content: content.trim(),
    rating: typeof rating === "number" && rating >= 1 && rating <= 5 ? rating : 5,
    published: false,
    submitted_by_client: true,
  });

  if (error) return NextResponse.json({ error: "Failed to submit review." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
