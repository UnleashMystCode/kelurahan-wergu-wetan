
import HomeView from "@/components/user/HomeView";
import prisma from "@/lib/db";
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const banners = await prisma.bannerHomepage.findMany({ where: { halaman: "home" }, orderBy: { createdAt: "desc" } }) || [];
  const stats = await prisma.homeStatistic.findMany() || [];
  const services = await prisma.homeService.findMany() || [];
  const welcome = await prisma.homeWelcome.findFirst() || null;
  
  const tentangKamiBanner = await prisma.bannerHomepage.findFirst({
    where: { halaman: "tentang-kami" },
    orderBy: { createdAt: "desc" }
  }) || null;
  
  // AMBIL BERITA DARI DATABASE ADMIN (Kegiatan)
  const kegiatan = await prisma.kegiatan.findMany({
    orderBy: { tanggal: "desc" },
    take: 3 // Ambil 3 terbaru saja untuk Home
  }) || [];

  const agenda = [
    { id: 1, title: "Laporan Keterangan Pertanggungjawaban (LKPJ) Tahun 2024", date: "25 Oktober 2025", lokasi: "Kantor Kelurahan" },
    { id: 2, title: "Rencana Pembangunan Jangka Menengah Kelurahan", date: "01 Januari 2026", lokasi: "Aula Pertemuan" },
    { id: 3, title: "Realisasi Program Pemberdayaan UMKM Lokal", date: "15 November 2025", lokasi: "Area Wergu Wetan" },
  ];

  return (
    <main>
      <HomeView 
        stats={stats} 
        services={services} 
        welcome={welcome} 
        agenda={agenda}
        banners={banners}
        kegiatan={kegiatan}
        profilBanner={tentangKamiBanner}
      />
    </main>
  );
}