import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.CALENDLY_API_TOKEN;
  if (!token) return NextResponse.json({ bookedDates: [] });

  const org = "https://api.calendly.com/organizations/c7477fce-ba49-4ae1-a99b-514bd0660ea6";
  const today = new Date();
  const future = new Date();
  future.setDate(future.getDate() + 60);

  const params = new URLSearchParams({
    organization: org,
    min_start_time: today.toISOString(),
    max_start_time: future.toISOString(),
    count: "100",
    status: "active",
  });

  try {
    const res = await fetch(`https://api.calendly.com/scheduled_events?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 300 },
    });
    const data = await res.json();
    const bookedDates: string[] = [
      ...new Set<string>(
        (data.collection ?? []).map((e: { start_time: string }) => e.start_time.slice(0, 10))
      ),
    ];
    return NextResponse.json({ bookedDates });
  } catch {
    return NextResponse.json({ bookedDates: [] });
  }
}
