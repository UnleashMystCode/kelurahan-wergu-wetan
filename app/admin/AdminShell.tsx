"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { usePathname } from "next/navigation";

interface AdminShellProps {
  children: React.ReactNode;
  userRole: "admin" | "super";
}

export default function AdminShell({ children, userRole }: AdminShellProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. SIDEBAR (Fixed Kiri) */}
      <AdminSidebar role={userRole} />

      {/* 2. WRAPPER KANAN */}
      <div className="ml-64 flex min-h-screen flex-1 flex-col transition-all duration-300">
        {/* A. HEADER (WAJIB DIPASANG DISINI) */}
        <AdminHeader role={userRole} />

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
