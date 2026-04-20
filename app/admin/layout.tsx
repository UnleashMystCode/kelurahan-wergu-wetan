"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader"; // <--- PASTIKAN INI ADA
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* 1. SIDEBAR (Fixed Kiri) */}
      <AdminSidebar />

      {/* 2. WRAPPER KANAN */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen transition-all duration-300">
        
        {/* A. HEADER (WAJIB DIPASANG DISINI) */}
        {/* Ini yang bikin logo Administrator Portal muncul di atas Dashboard */}
        <AdminHeader /> 

        {/* B. KONTEN PAGE */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-300">
             {children}
          </div>
        </main>

      </div>
      
    </div>
  );
}