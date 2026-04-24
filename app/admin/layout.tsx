"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader"; // <--- PASTIKAN INI ADA
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
      <div className="ml-64 flex min-h-screen flex-1 flex-col transition-all duration-300">
        {/* A. HEADER (WAJIB DIPASANG DISINI) */}
        {/* Ini yang bikin logo Administrator Portal muncul di atas Dashboard */}
        <AdminHeader />

        {/* B. KONTEN PAGE */}
        <main className="flex-1 p-8">
          <div className="animate-in fade-in zoom-in-95 mx-auto max-w-7xl duration-300">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
