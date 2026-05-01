import AdminBannerManager from "@/components/admin/AdminBannerManager";
import AdminLayananManager from "@/components/admin/AdminLayananManager"; // === FITUR BARU ===
import { FileText, AlertCircle } from "lucide-react";

import prisma from "@/lib/db";
export const dynamic = "force-dynamic";

export default async function AdminDaftarLayananPage() {

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



      {/* COMPONENT MANAJEMEN PENGAJUAN SURAT === FITUR BARU === */}
      <AdminLayananManager />
    </div>
  );
}
