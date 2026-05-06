import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Log submission (will be replaced with Resend + Supabase when keys are configured)
    console.log("Contact form submission:", { name, email, phone, service, message });

    // TODO: Send email via Resend
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "EBK Website <noreply@ebkconstruction.co.uk>",
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `New Enquiry from ${name}`,
    //   html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone}</p><p><b>Service:</b> ${service}</p><p><b>Message:</b> ${message}</p>`,
    // });

    // TODO: Save to Supabase
    // const supabase = createClient(...);
    // await supabase.from("contact_submissions").insert({ name, email, phone, service, message });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
