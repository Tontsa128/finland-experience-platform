import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type VercelCountResponse = {
  data?: {
    visitors?: number;
    pageviews?: number;
  };
};

function helsinkiMonthStart(): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Helsinki",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(new Date());
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  if (!year || !month) throw new Error("Could not determine current month");
  return `${year}-${month}-01`;
}

async function getVisitorCount(since?: string): Promise<number> {
  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  const projectId = process.env.VERCEL_ANALYTICS_PROJECT_ID || "prj_qL634U7zyqCcNiQiszErcO4gyzCa";
  const teamId = process.env.VERCEL_ANALYTICS_TEAM_ID || "team_D2RKH5NDpa5nw2CSF0z8LxpE";

  if (!token) throw new Error("Missing VERCEL_ANALYTICS_TOKEN");

  const url = new URL("https://api.vercel.com/v1/query/web-analytics/visits/count");
  url.searchParams.set("projectId", projectId);
  url.searchParams.set("teamId", teamId);
  if (since) url.searchParams.set("since", since);

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`Vercel Analytics API returned ${response.status}`);
  }

  const payload = (await response.json()) as VercelCountResponse;
  const visitors = payload.data?.visitors;
  if (typeof visitors !== "number" || !Number.isFinite(visitors)) {
    throw new Error("Vercel Analytics API returned no visitor count");
  }
  return visitors;
}

export async function GET() {
  try {
    const [totalVisitors, monthlyVisitors] = await Promise.all([
      getVisitorCount(),
      getVisitorCount(helsinkiMonthStart()),
    ]);

    return NextResponse.json(
      { totalVisitors, monthlyVisitors, source: "vercel-web-analytics" },
      {
        headers: {
          "Cache-Control": "private, no-store, max-age=0",
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  } catch (error) {
    // Never expose tokens, raw upstream responses, or internal configuration.
    const message = error instanceof Error ? error.message : "Unknown analytics error";
    const status = message === "Missing VERCEL_ANALYTICS_TOKEN" ? 503 : 502;
    return NextResponse.json(
      { error: "Visitor statistics are temporarily unavailable" },
      {
        status,
        headers: {
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  }
}
