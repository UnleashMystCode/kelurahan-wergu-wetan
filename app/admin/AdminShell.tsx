"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import CommandPalette from "@/components/admin/CommandPalette";
import { usePathname } from "next/navigation";

interface AdminShellProps {
  children: React.ReactNode;
  userRole: "admin" | "super";
}

export default function AdminShell({ children, userRole }: AdminShellProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // State untuk interaktif UI
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Mencegah Ctrl+K membuka pencarian browser, malah membuka Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. SIDEBAR (Fixed Kiri) */}
      <AdminSidebar role={userRole} isCollapsed={isCollapsed} />

      {/* 2. WRAPPER KANAN */}
      <div 
        className={`flex min-h-screen flex-1 flex-col transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-64"}`}
      >
        {/* A. HEADER */}
        <AdminHeader 
          role={userRole} 
          isCollapsed={isCollapsed} 
          onToggleSidebar={() => setIsCollapsed(!isCollapsed)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* B. KONTEN PAGE */}
        <main className="flex-1 p-8">
          <div className="animate-in fade-in zoom-in-95 mx-auto max-w-7xl duration-300">
            {children}
          </div>
        </main>
      </div>

      {/* 3. COMMAND PALETTE (MODAL) */}
      <CommandPalette 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        role={userRole} 
      />
    </div>
  );
}
