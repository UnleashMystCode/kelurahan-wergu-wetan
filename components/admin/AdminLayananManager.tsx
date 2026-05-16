"use client";

import { Info } from "lucide-react";

export default function AdminLayananManager() {
  return (
    <div className="mt-8 rounded-xl border border-slate-100 bg-white p-8 shadow-sm">
      <div className="mb-8 border-b border-slate-50 pb-4">
        <h2 className="border-l-4 border-blue-600 pl-3 text-lg font-bold text-text-dark">
          Manajemen Direktori Layanan & Ulasan (IKM)
        </h2>
        <p className="mt-1 ml-4 text-xs text-slate-400">
          Modul ini sedang dalam tahap pengembangan struktur awal.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 rounded-full bg-blue-50 p-4 text-blue-500">
          <Info size={40} />
        </div>
        <h3 className="text-xl font-bold text-slate-700">Dalam Tahap Pengembangan</h3>
        <p className="mt-2 max-w-md text-sm text-slate-500">
          Halaman ini nantinya akan digunakan untuk mengelola daftar <strong>Panduan Layanan Kelurahan</strong> (seperti syarat buat KTP, KK) dan memantau <strong>Ulasan / Indeks Kepuasan Masyarakat (IKM)</strong> dari warga. Desain dan fungsionalitas penuh akan segera diimplementasikan.
        </p>
      </div>
    </div>
  );
}
