import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { studioNotificationEmail, clientConfirmationEmail } from "@/lib/emailTemplates";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.event !== "invitee.created") {
    return NextResponse.json({ ok: true });
  }

  const p = body.payload;
  const booking = {
    inviteeName: p.invitee?.name ?? "",
    inviteeEmail: p.invitee?.email ?? "",
    eventTypeName: p.event_type?.name ?? "Session",
    startTime: p.event?.start_time ?? "",
    endTime: p.event?.end_time ?? "",
    timezone: p.invitee?.timezone ?? "America/New_York",
    cancelUrl: p.invitee?.cancel_url ?? "",
    rescheduleUrl: p.invitee?.reschedule_url ?? "",
  };

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const studioEmail = process.env.CONTACT_RECEIVER_EMAIL || user;

  if (!user || !pass) {
    return NextResponse.json({ error: "Email not configured" }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const notification = studioNotificationEmail(booking);
  const confirmation = clientConfirmationEmail(booking);

  await Promise.all([
    transporter.sendMail({
      from: `"Multi Rec Studio" <${user}>`,
      to: studioEmail,
      subject: notification.subject,
      html: notification.html,
    }),
    transporter.sendMail({
      from: `"Multi Rec Studio" <${user}>`,
      to: booking.inviteeEmail,
      replyTo: studioEmail,
      subject: confirmation.subject,
      html: confirmation.html,
    }),
  ]);

  return NextResponse.json({ ok: true });
}
