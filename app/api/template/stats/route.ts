import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { error: "Fitur unduh/unggah Excel dinonaktifkan sementara karena alasan keamanan (migrasi library)." },
    { status: 503 }
  );
}
