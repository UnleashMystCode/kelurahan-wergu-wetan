
import AdminBannerManager from "@/components/admin/AdminBannerManager";
import AdminLayananManager from "@/components/admin/AdminLayananManager"; // === FITUR BARU ===
import { FileText, AlertCircle } from "lucide-react";

import prisma from "@/lib/db";
export const dynamic = 'force-dynamic';

export default async function AdminLayananPage() {
  // Ambil semua banner history untuk halaman layanan
  const banners = await prisma.bannerHomepage.findMany({
    where: { halaman: "layanan" },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8 pb-20">

      {/* HEADER PAGE */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
          <FileText size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Kelola Halaman Layanan</h1>
          <p className="text-slate-500 text-sm">Atur Banner / Header untuk halaman pengajuan surat warga.</p>
        </div>
      </div>

      {/* SECTION BANNER */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
          <h2 className="text-lg font-bold text-slate-700 border-l-4 border-blue-600 pl-3">A. Hero Banner Layanan</h2>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl flex gap-3 mb-6 text-sm text-blue-700 border border-blue-100">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p>
            Banner yang Anda upload di sini akan menjadi <strong>Background Header</strong> di halaman Layanan Digital.
            Banner terbaru akan otomatis aktif.
          </p>
        </div>

        {/* COMPONENT MANAGER (Sudah kamu buat sebelumnya) */}
        <AdminBannerManager initialData={banners} fixedPage="layanan" />
      </div>

      {/* COMPONENT MANAJEMEN PENGAJUAN SURAT === FITUR BARU === */}
      <AdminLayananManager />

    </div>
  );
}