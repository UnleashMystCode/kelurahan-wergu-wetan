import prisma from "@/lib/db"; // Singleton
import BeritaView from "@/components/user/BeritaView";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const banner = await prisma.bannerHomepage.findFirst({
    where: { halaman: "berita" },
  });

  const newsData = await prisma.kegiatan.findMany({
    orderBy: { tanggal: "desc" },
  });

  return (
    <main>
      <BeritaView banner={banner} newsData={newsData} />
    </main>
  );
}
