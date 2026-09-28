import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "Platform checkout is disabled. Book directly with the service provider.",
    },
    { status: 410 },
  );
}
