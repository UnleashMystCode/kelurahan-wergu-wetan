import AdminBannerManager from "@/components/admin/AdminBannerManager";
import prisma from "@/lib/db";
export const dynamic = "force-dynamic";

export default async function AdminBerandaPage() {
  // 1. Ambil Data Banner Khusus Home
  const banners = await prisma.bannerHomepage.findMany({
    where: { halaman: "home" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10 pb-20">
      {/* JUDUL HALAMAN */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Banner Beranda</h1>
        <p className="text-slate-500">Atur gambar slide banner utama di halaman depan.</p>
      </div>

      {/* BAGIAN BANNER (Reused Component - Locked to 'home') */}
      <section>
        <AdminBannerManager initialData={banners} fixedPage="home" />
      </section>
    </div>
  );
}
