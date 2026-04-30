import LayananView from "@/components/user/LayananView";
import prisma from "@/lib/db";
export const dynamic = "force-dynamic";

export default async function LayananPage() { await new Promise((resolve) => setTimeout(resolve, 500));
  // 1. Ambil Banner Database
  const banner = await prisma.bannerHomepage.findFirst({
    where: { halaman: "layanan" },
    orderBy: { createdAt: "desc" },
  });

  // 2. Tampilkan View
  // Tipe data sudah kita sesuaikan di LayananView, jadi harusnya aman
  return <LayananView banner={banner} />;
}
