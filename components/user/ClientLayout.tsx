"use client";

import { usePathname } from "next/navigation";
import TopBar from "@/components/user/TopBar";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
// 1. Tambahkan import LanguageProvider di sini
import { LanguageProvider } from "@/context/LanguageContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    // 2. Bungkus seluruh konten dengan LanguageProvider agar useLanguage() bisa diakses
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        {/* HEADER WRAPPER (FIXED) */}
        <header className="fixed top-0 right-0 left-0 z-50 flex w-full flex-col">
          {/* BAGIAN 1: TopBar */}
          <div className="relative z-[60]">
            <TopBar />
          </div>

          {/* BAGIAN 2: Navbar */}
          <div className="relative z-[50] w-full">
            <Navbar />
          </div>
        </header>

        {/* KONTEN UTAMA */}
        <main className="flex-grow">{children}</main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}
