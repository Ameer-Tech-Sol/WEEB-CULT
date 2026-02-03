// src/app/api/test-db/route.js
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "test-db route reachable",
    ts: new Date().toISOString(),
  });
}
