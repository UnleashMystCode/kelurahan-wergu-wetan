import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "@/context/LanguageContext";
import ClientLayout from "@/components/user/ClientLayout";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://wergu-wetan.com"),
  title: "Website Informasi Kelurahan Wergu Wetan",
  description: "Portal resmi penyedia informasi layanan, pengumuman, dan persyaratan administrasi warga Kelurahan Wergu Wetan. Semua pengurusan dokumen fisik dilayani langsung di kantor balai desa pada jam kerja.",
  openGraph: {
    title: "Kelurahan Wergu Wetan - Portal Layanan & Informasi",
    description: "Pusat informasi kegiatan desa, layanan administrasi warga, dan potensi UMKM lokal Wergu Wetan.",
    url: "https://wergu-wetan.com", // Ganti dengan URL domain asli jika sudah ada
    siteName: "Kelurahan Wergu Wetan",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/hero_office.png",
        width: 1200,
        height: 630,
        alt: "Balai Desa Kelurahan Wergu Wetan",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={jakarta.className}>
        <LanguageProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: { background: "#333", color: "#fff", borderRadius: "10px" },
              success: {
                style: { background: "#ecfdf5", color: "#047857", border: "1px solid #a7f3d0" },
              },
              error: {
                style: { background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" },
              },
            }}
          />

          {/* HANYA PANGGIL CLIENTLAYOUT SAJA */}
          {/* Jangan ada <TopBar /> atau <Navbar /> disini lagi */}

          <ClientLayout>{children}</ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
