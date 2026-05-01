import AdminBannerManager from "@/components/admin/AdminBannerManager";
import prisma from "@/lib/db";
export const dynamic = "force-dynamic";

export default async function AdminTentangKamiBannerPage() {
  // Ambil Banner khusus halaman Tentang Kami
  const banners = await prisma.bannerHomepage.findMany({
    where: { halaman: "tentang-kami" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Banner Tentang Kami</h1>
        <p className="text-slate-500">Atur gambar banner utama untuk halaman Profil/Tentang Kami.</p>
      </div>

      <section>
        <AdminBannerManager initialData={banners} fixedPage="tentang-kami" />
      </section>
    </div>
  );
}
