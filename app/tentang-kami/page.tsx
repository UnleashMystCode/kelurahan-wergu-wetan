import TentangKamiView from "@/components/user/TentangKamiView";

import prisma from "@/lib/db";
export const dynamic = "force-dynamic";

export default async function ProfilPage() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // 1. UBAH DISINI: Pakai 'findMany' bukan 'findFirst'
  // Agar dapat Array [] (banyak gambar), bukan Object {} (satu gambar)
  const banners = await prisma.bannerHomepage.findMany({
    where: { halaman: "tentang-kami" },
    orderBy: { createdAt: "desc" },
  });

  // 2. Ambil Data Lain (Tetap sama)
  const perangkat = await prisma.perangkatDesa.findMany({
    orderBy: { urutan: "asc" },
  });

  const konten = await prisma.profilKonten.findMany();
  const stats = (await prisma.homeStatistic.findMany()) || [];

  // 3. Kirim data ke View
  return <TentangKamiView banners={banners} perangkat={perangkat} konten={konten} stats={stats} />;
}
