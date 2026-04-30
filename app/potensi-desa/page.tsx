import PotensiDesaView from "@/components/user/PotensiDesaView";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function PotensiDesaPage() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const banner = await prisma.bannerHomepage.findFirst({
    where: { halaman: "potensi-desa" },
    orderBy: { createdAt: "desc" },
  });

  return <PotensiDesaView banner={banner} />;
}
