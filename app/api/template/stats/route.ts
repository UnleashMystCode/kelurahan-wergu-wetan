import { NextResponse } from "next/server";
import * as XLSX from "xlsx"; // Pastikan library ini terpanggil

export async function GET() {
  // 1. Buat Data Dummy untuk Template
  const data = [
    { label: "Penduduk", value: "3.500+" },
    { label: "Kepala Keluarga", value: "1.200" },
    { label: "RT / RW", value: "28 / 4" },
    { label: "Layanan Digital", value: "24 Jam" },
    { label: "Luas Wilayah", value: "45 Ha" },
  ];

  // 2. Buat Workbook & Worksheet Baru
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Statistik");

  // 3. Generate Buffer File .xlsx
  const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  // 4. Kirim sebagai Download
  return new NextResponse(buf, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="template_statistik_wergu.xlsx"', // <-- Ekstensi .xlsx
    },
  });
}