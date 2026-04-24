import AdminBannerManager from "@/components/admin/AdminBannerManager";
import AdminLayananManager from "@/components/admin/AdminLayananManager"; // === FITUR BARU ===
import { FileText, AlertCircle } from "lucide-react";

import prisma from "@/lib/db";
export const dynamic = "force-dynamic";

export default async function AdminLayananPage() {
  // Ambil semua banner history untuk halaman layanan
  const banners = await prisma.bannerHomepage.findMany({
    where: { halaman: "layanan" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 pb-20">
      {/* HEADER PAGE */}
      <div className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          <FileText size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Kelola Halaman Layanan</h1>
          <p className="text-sm text-slate-500">
            Atur Banner / Header untuk halaman pengajuan surat warga.
          </p>
        </div>
      </div>

      {/* SECTION BANNER */}
      <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3 border-b border-slate-50 pb-4">
          <h2 className="border-l-4 border-blue-600 pl-3 text-lg font-bold text-slate-700">
            A. Hero Banner Layanan
          </h2>
        </div>

        <div className="mb-6 flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <p>
            Banner yang Anda upload di sini akan menjadi <strong>Background Header</strong> di
            halaman Layanan Digital. Banner terbaru akan otomatis aktif.
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
