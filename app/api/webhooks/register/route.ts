import { NextRequest, NextResponse } from "next/server";

// Call this once after deployment: GET /api/webhooks/register
// It registers the Calendly webhook pointing to this site's domain.
export async function GET(req: NextRequest) {
  const token = process.env.CALENDLY_API_TOKEN;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!token || !appUrl) {
    return NextResponse.json(
      { error: "Missing CALENDLY_API_TOKEN or NEXT_PUBLIC_APP_URL in env" },
      { status: 500 }
    );
  }

  const callbackUrl = `${appUrl}/api/webhooks/calendly`;

  const res = await fetch("https://api.calendly.com/webhook_subscriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: callbackUrl,
      events: ["invitee.created", "invitee.canceled"],
      organization: "https://api.calendly.com/organizations/c7477fce-ba49-4ae1-a99b-514bd0660ea6",
      user: "https://api.calendly.com/users/ea044597-9fa9-4643-9baf-83503d9b206b",
      scope: "user",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data }, { status: res.status });
  }

  return NextResponse.json({ ok: true, webhook: data.resource?.uri, callback: callbackUrl });
}
