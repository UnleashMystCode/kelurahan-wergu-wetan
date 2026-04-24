"use client";

import { useState } from "react";
import * as XLSX from "xlsx"; // Library Excel
import { FileSpreadsheet, Search, CheckCircle, XCircle, Clock } from "lucide-react";

// Tipe data sesuai Prisma
type Pengajuan = {
  id: number;
  nama: string;
  nik: string;
  jenisSurat: string;
  status: string;
  whatsapp: string;
  createdAt: Date;
};

export default function AdminSuratView({ data }: { data: Pengajuan[] }) {
  const [filter, setFilter] = useState("");

  // FUNGSI EKSPOR KE EXCEL 📊
  const handleExportExcel = () => {
    // 1. Siapkan data yang mau dicetak (Rapikan formatnya)
    const dataSiapCetak = data.map((item) => ({
      "Tanggal Request": item.createdAt.toLocaleDateString("id-ID"),
      NIK: item.nik,
      "Nama Warga": item.nama,
      "Jenis Surat": item.jenisSurat,
      "No. WhatsApp": item.whatsapp,
      "Status Saat Ini": item.status,
    }));

    // 2. Buat Workbook (Buku Excel) baru
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataSiapCetak);

    // 3. Atur lebar kolom otomatis (biar rapi)
    const wscols = [{ wch: 15 }, { wch: 20 }, { wch: 25 }, { wch: 25 }, { wch: 15 }, { wch: 15 }];
    ws["!cols"] = wscols;

    // 4. Masukkan Sheet ke Buku
    XLSX.utils.book_append_sheet(wb, ws, "Rekap Data Surat");

    // 5. Download File
    XLSX.writeFile(wb, `Laporan-Surat-WerguWetan-${Date.now()}.xlsx`);
  };

  // Logika Pencarian Sederhana
  const filteredData = data.filter(
    (item) =>
      item.nama.toLowerCase().includes(filter.toLowerCase()) ||
      item.jenisSurat.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* TOOLBAR ATAS */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row">
        {/* Input Pencarian */}
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-3 left-3 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Cari Nama Warga atau Jenis Surat..."
            className="w-full rounded-lg border border-slate-300 py-2 pr-4 pl-10 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        {/* Tombol EXCEL */}
        <button
          onClick={handleExportExcel}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2 font-bold text-white shadow-md transition hover:bg-green-700"
        >
          <FileSpreadsheet size={20} /> Export Excel
        </button>
      </div>

      {/* TABEL DATA */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="border-b bg-slate-50 text-xs font-bold text-slate-700 uppercase">
            <tr>
              <th className="p-4">Tanggal</th>
              <th className="p-4">Pemohon</th>
              <th className="p-4">Jenis Surat</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredData.map((req) => (
              <tr key={req.id} className="transition hover:bg-blue-50">
                <td className="p-4 text-slate-500">
                  {new Date(req.createdAt).toLocaleDateString("id-ID")}
                </td>
                <td className="p-4">
                  <div className="font-bold text-slate-900">{req.nama}</div>
                  <div className="text-xs text-slate-500">NIK: {req.nik}</div>
                </td>
                <td className="p-4 font-medium text-slate-700">{req.jenisSurat}</td>
                <td className="p-4">
                  <span
                    className={`flex w-fit items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${req.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}
                  >
                    {req.status === "Pending" ? <Clock size={12} /> : <CheckCircle size={12} />}
                    {req.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="rounded border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 hover:underline">
                    Proses
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="p-10 text-center text-slate-400">Data tidak ditemukan.</div>
        )}
      </div>
    </div>
  );
}
