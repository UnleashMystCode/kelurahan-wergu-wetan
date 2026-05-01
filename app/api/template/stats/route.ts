import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import prisma from "@/lib/db"; // Tambahkan Prisma untuk menarik data asli

export const dynamic = "force-dynamic"; // Pastikan route ini tidak di-cache statis

export async function GET() {
  try {
    // 1. Coba Tarik Data Asli dari Database
    const dbStats = await prisma.homeStatistic.findMany({
      orderBy: { id: "asc" },
    });

    let data;
    let filename = "";
    
    if (dbStats.length > 0) {
      // Jika ada data aktif di database, berikan data tersebut
      data = dbStats.map((stat) => ({
        label: stat.label,
        value: stat.value,
      }));
      filename = `Data_Aktif_Statistik_Wergu_${Date.now()}.xlsx`;
    } else {
      // Jika database kosong, berikan Dummy Template
      data = [
        { label: "Penduduk", value: "3.500+" },
        { label: "Kepala Keluarga", value: "1.200" },
        { label: "RT / RW", value: "28 / 4" },
        { label: "Layanan Digital", value: "24 Jam" },
        { label: "Luas Wilayah", value: "45 Ha" },
      ];
      filename = `Template_Contoh_Statistik_Wergu.xlsx`;
    }

    // 2. Buat Workbook & Worksheet Baru
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Statistik");

    // 3. Generate Buffer File .xlsx
    const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // Konversi ke format web-standard agar tidak crash di Next.js App Router
    const uint8Array = new Uint8Array(buf);

    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": uint8Array.length.toString(),
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error: any) {
    console.error("API Route Error:", error);
    return new NextResponse(`Error: ${error.message}\n${error.stack}`, { status: 500 });
  }
}
