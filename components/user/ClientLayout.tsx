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
      <div className="flex flex-col min-h-screen"> 
        
        {/* HEADER WRAPPER (FIXED) */}
        <header className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full">
          
          {/* BAGIAN 1: TopBar */}
          <div className="relative z-[60]">
             <TopBar />
          </div>
          
          {/* BAGIAN 2: Navbar */}
          <div className="relative w-full z-[50]">
              <Navbar />
          </div>

        </header>

        {/* KONTEN UTAMA */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}