import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      return NextResponse.json({
        fallback: true,
        mailto: "mailto:" + (to || "hello@nordicescape.fi") + "?subject=" + encodeURIComponent("Nordic Escape inquiry from " + name) + "&body=" + encodeURIComponent(message + "\n\nReply to: " + email)
      });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: "Nordic Escape inquiry from " + name,
        text: message + "\n\nCustomer email: " + email,
      }),
    });

    if (!response.ok) return NextResponse.json({ error: "Email provider rejected the message" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to send message" }, { status: 500 });
  }
}
