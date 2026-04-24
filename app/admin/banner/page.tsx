import AdminBannerManager from "@/components/admin/AdminBannerManager"; // Panggil Komponen Baru

import prisma from "@/lib/db";
export const dynamic = "force-dynamic";

export default async function AdminBannerPage() {
  // Ambil data dari database
  const banners = await prisma.bannerHomepage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Banner</h1>
        <p className="mt-1 text-slate-500">Upload gambar promo untuk halaman depan website.</p>
      </div>

      {/* Tempel Komponen Interaktif di sini */}
      <AdminBannerManager initialData={banners} />
    </div>
  );
}
