import { NextResponse } from "next/server";
import { syncEventSources } from "@/lib/event-sync";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const token = process.env.EVENT_SYNC_TOKEN;
  if (!token || request.headers.get("authorization") !== `Bearer ${token}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await syncEventSources();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Tapahtumien synkronointi epäonnistui." }, { status: 500 });
  }
}
