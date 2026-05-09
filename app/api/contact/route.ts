import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

function validate(data: Record<string, string>) {
  const errors: string[] = [];
  if (!data.name || data.name.trim().length < 2) errors.push("Name is required");
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("Valid email is required");
  if (!data.message || data.message.trim().length < 10) errors.push("Message must be at least 10 characters");
  if (data.name?.length > 200) errors.push("Name too long");
  if (data.message?.length > 5000) errors.push("Message too long");
  return errors;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-vercel-forwarded-for") ??
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, phone, service, message } = body;

    const errors = validate({ name, email, message });
    if (errors.length > 0) {
      return NextResponse.json({ error: errors[0] }, { status: 400 });
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = escapeHtml(phone?.trim() || "");
    const safeService = escapeHtml(service?.trim() || "");
    const safeMessage = escapeHtml(message.trim());

    const supabase = createServiceClient();
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
        service: service?.trim() || null,
        message: message.trim(),
      });

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
    }

    await resend.emails.send({
      from: "EBK Construction <noreply@ebkconstruction.co.uk>",
      to: process.env.CONTACT_EMAIL ?? "info@ebkconstruction.co.uk",
      subject: `New Enquiry from ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a3a6b; padding: 24px; text-align: center;">
            <h1 style="color: #c8a96e; margin: 0; font-size: 24px;">EBK Construction</h1>
            <p style="color: white; margin: 8px 0 0; font-size: 14px;">New Enquiry Received</p>
          </div>
          <div style="padding: 32px; background: #f8f8f8;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666; font-size: 13px; width: 120px;">Name</td><td style="padding: 8px 0; color: #1a3a6b; font-weight: bold;">${safeName}</td></tr>
              <tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #1a3a6b;">${safeEmail}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Phone</td><td style="padding: 8px 0; color: #333;">${safePhone || "—"}</td></tr>
              <tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Service</td><td style="padding: 8px 0; color: #333;">${safeService || "—"}</td></tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: white; border-left: 3px solid #c8a96e;">
              <p style="color: #666; font-size: 13px; margin: 0 0 8px;">Message</p>
              <p style="color: #333; margin: 0; line-height: 1.6;">${safeMessage}</p>
            </div>
          </div>
          <div style="padding: 16px; text-align: center; background: #1a3a6b;">
            <p style="color: white; opacity: 0.6; font-size: 12px; margin: 0;">EBK Construction LTD · ebkconstruction.co.uk</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
