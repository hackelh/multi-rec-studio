import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, email, company, subject, message } = body as Record<string, string>;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_RECEIVER_EMAIL || user;

  if (!user || !pass) {
    return NextResponse.json({ error: "Email not configured" }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Multi Rec Studio - Site web" <${user}>`,
      to,
      replyTo: email,
      subject: `[Site web] ${subject}`,
      text: [
        `Nom: ${name}`,
        `Téléphone: ${phone || "-"}`,
        `Courriel: ${email}`,
        `Entreprise: ${company || "-"}`,
        `Sujet: ${subject}`,
        "",
        message,
      ].join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
