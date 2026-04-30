import prisma from "@/lib/db";
import KontakView from "@/components/user/KontakView";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Kontak & Aspirasi | Kelurahan Wergu Wetan",
  description: "Hubungi Kelurahan Wergu Wetan atau sampaikan aspirasi Anda secara online.",
};

export default async function KontakPage() { await new Promise((resolve) => setTimeout(resolve, 500));
  const banner = await prisma.bannerHomepage.findFirst({ where: { halaman: "kontak" } });

  // Ambil konfigurasi kontak dari DB (jika sudah diisi Admin)
  const configs = await prisma.siteConfig.findMany();
  const getConfig = (key: string, fallback: string) =>
    configs.find((c) => c.key === key)?.value || fallback;

  const kontakInfo = {
    phone: getConfig("phone", "(0291) 430xxx"),
    email: getConfig("email", "pemdes@werguwetan.go.id"),
    alamat: getConfig("alamat", "Jl. Jendral Sudirman No. 12, Wergu Wetan, Kudus, Jawa Tengah"),
  };

  return <KontakView banner={banner} kontakInfo={kontakInfo} />;
}
