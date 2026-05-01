import AdminBannerManager from "@/components/admin/AdminBannerManager";
import prisma from "@/lib/db";
export const dynamic = "force-dynamic";

export default async function AdminKontakBannerPage() {
  const banners = await prisma.bannerHomepage.findMany({
    where: { halaman: "kontak" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Banner Hubungi Kami</h1>
        <p className="text-slate-500">Atur gambar banner utama untuk halaman Kontak & Lokasi.</p>
      </div>

      <section>
        <AdminBannerManager initialData={banners} fixedPage="kontak" />
      </section>
    </div>
  );
}
