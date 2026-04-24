import AdminBannerManager from "@/components/admin/AdminBannerManager";

import prisma from "@/lib/db";
export const dynamic = "force-dynamic";

export default async function AdminProfilPage() {
  // Ambil Banner khusus halaman PROFIL
  const banners = await prisma.bannerHomepage.findMany({
    where: { halaman: "tentang-kami" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Kelola Halaman Tentang Kami</h1>
        <p className="text-slate-500">Atur konten untuk halaman tentang kami kelurahan.</p>
      </div>

      {/* BANNER MANAGER KHUSUS PROFIL */}
      <section>
        <h2 className="mb-4 border-l-4 border-blue-600 pl-3 text-lg font-bold text-slate-700">
          A. Hero Banner Tentang Kami
        </h2>
        {/* fixedPage="tentang-kami" akan mengunci dropdown & teks */}
        <AdminBannerManager initialData={banners} fixedPage="tentang-kami" />
      </section>

      {/* Nanti di sini bisa ditambah form Visi Misi, Struktur Organisasi, dll */}
      <div className="rounded-2xl border-2 border-dashed border-slate-300 p-10 text-center text-slate-400">
        Fitur edit Visi Misi & Struktur akan segera hadir di sini.
      </div>
    </div>
  );
}
