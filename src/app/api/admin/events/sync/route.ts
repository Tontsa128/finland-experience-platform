import { NextRequest, NextResponse } from "next/server";
import { getAdminContext } from "@/lib/admin-auth";
import { syncEventSources } from "@/lib/event-sync";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const admin = await getAdminContext();
  if (!admin || !["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"].includes(admin.profile.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const result = await syncEventSources({ sourceIds: Array.isArray(body.sourceIds) ? body.sourceIds.filter((id: unknown): id is string => typeof id === "string") : undefined, force: true });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Synkronointi epäonnistui." }, { status: 500 });
  }
}
