"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Image as ImageIcon,
  LogOut,
  ShieldAlert,
  ShieldCheck,
  Loader2,
  Home,
  Building,
  Newspaper,
  Phone,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();

  // 1. State Role & Mounted (Anti-Kedip)
  const [role, setRole] = useState<"admin" | "super">("admin");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Cek LocalStorage
    const savedRole = localStorage.getItem("userRole") as "admin" | "super";
    if (savedRole) {
      setRole(savedRole);
    }
    // Tandai bahwa komponen sudah siap (mounted)
    setMounted(true);
  }, []);

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("userRole");
  };

  // --- LOGIKA WARNA DINAMIS ---
  // Jika belum mounted (loading), pakai warna Netral (Slate).
  // Jika sudah mounted, baru cek role (Merah/Biru).

  const isSuper = role === "super";
  const isLoading = !mounted;

  // Warna Aksen Utama
  const accentColor = isLoading ? "slate" : isSuper ? "red" : "blue";

  // Style Logo Header
  const logoBgClass = isLoading
    ? "bg-slate-800 text-slate-500"
    : isSuper
      ? "bg-red-500/20 text-red-400 shadow-red-900/20"
      : "bg-blue-500/20 text-blue-400 shadow-blue-900/20";

  // Style Teks Role
  const roleTextClass = isLoading ? "text-slate-600" : isSuper ? "text-red-400" : "text-blue-400";

  return (
    <aside className="fixed top-0 left-0 z-40 flex h-screen w-64 flex-col justify-between border-r border-slate-800 bg-slate-900 text-white transition-colors duration-300">
      {/* HEADER SIDEBAR */}
      <div className="p-6">
        <div className="mb-10 flex items-center gap-3">
          {/* Logo dengan Loading State */}
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-lg transition-all duration-300 ${logoBgClass}`}
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : isSuper ? (
              <ShieldAlert size={22} />
            ) : (
              <ShieldCheck size={22} />
            )}
          </div>

          <div>
            <h1 className="text-lg leading-none font-bold tracking-tight text-slate-200">
              Wergu Admin
            </h1>
            <span
              className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${roleTextClass}`}
            >
              {isLoading ? "Memuat..." : isSuper ? "Super Access" : "Petugas Area"}
            </span>
          </div>
        </div>

        {/* === NAVIGASI UTAMA === */}
        <nav className="space-y-1">
          {/* Helper Function untuk Link Item biar kodingan rapi */}
          <SidebarLink
            href="/admin/dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
            isActive={isActive("/admin/dashboard")}
            accent={accentColor}
            isLoading={isLoading}
          />

          <div className="mb-2 px-4 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
            1. Konten Beranda
          </div>
          <SidebarLink
            href="/admin/halaman/beranda"
            icon={ImageIcon}
            label="Banner Utama (Hero)"
            isActive={isActive("/admin/halaman/beranda")}
            accent={accentColor}
            isLoading={isLoading}
          />
          <SidebarLink
            href="/admin/halaman/beranda/sambutan"
            icon={FileText}
            label="Teks & TTD Sambutan"
            isActive={isActive("/admin/halaman/beranda/sambutan")}
            accent={accentColor}
            isLoading={isLoading}
          />
          <SidebarLink
            href="/admin/halaman/beranda/layanan-icon"
            icon={Home}
            label="Menu Layanan Cepat"
            isActive={isActive("/admin/halaman/beranda/layanan-icon")}
            accent={accentColor}
            isLoading={isLoading}
          />

          <div className="mt-6 mb-2 px-4 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
            2. Konten Publikasi
          </div>
          <SidebarLink
            href="/admin/halaman/berita"
            icon={Newspaper}
            label="Kabar & Berita Terkini"
            isActive={isActive("/admin/halaman/berita")}
            accent={accentColor}
            isLoading={isLoading}
          />

          <div className="mt-6 mb-2 px-4 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
            3. Halaman Tentang Kami
          </div>
          <SidebarLink
            href="/admin/halaman/tentang-kami"
            icon={ImageIcon}
            label="Banner & Sampul"
            isActive={pathname === "/admin/halaman/tentang-kami"}
            accent={accentColor}
            isLoading={isLoading}
          />
          <SidebarLink
            href="/admin/halaman/tentang-kami/teks"
            icon={FileText}
            label="Visi Misi & Tugas"
            isActive={isActive("/admin/halaman/tentang-kami/teks")}
            accent={accentColor}
            isLoading={isLoading}
          />
          <SidebarLink
            href="/admin/halaman/tentang-kami/struktur"
            icon={Users}
            label="Struktur Organisasi"
            isActive={isActive("/admin/halaman/tentang-kami/struktur")}
            accent={accentColor}
            isLoading={isLoading}
          />
          <SidebarLink
            href="/admin/halaman/tentang-kami/statistik"
            icon={LayoutDashboard}
            label="Statistik & Monografi"
            isActive={isActive("/admin/halaman/tentang-kami/statistik")}
            accent={accentColor}
            isLoading={isLoading}
          />

          <div className="mt-6 mb-2 px-4 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
            4. Halaman Layanan
          </div>
          <SidebarLink
            href="/admin/halaman/layanan"
            icon={FileText}
            label="Layanan Request Warga"
            isActive={isActive("/admin/halaman/layanan")}
            accent={accentColor}
            isLoading={isLoading}
          />

          <div className="mt-6 mb-2 px-4 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
            5. Footer & Pengaturan
          </div>
          <SidebarLink
            href="/admin/halaman/kontak"
            icon={Phone}
            label="Info Footer & Kontak"
            isActive={isActive("/admin/halaman/kontak")}
            accent={accentColor}
            isLoading={isLoading}
          />

          {/* === NAVIGASI KHUSUS SUPER ADMIN === */}
          {/* Hanya muncul jika sudah mounted DAN role === 'super' */}
          {mounted && isSuper && (
            <div className="animate-in fade-in slide-in-from-left-4 mt-8 border-t border-white/5 pt-4 duration-500">
              <div className="mb-2 px-4 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Super Admin Area
              </div>

              <Link
                href="/admin/settings"
                className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive("/admin/settings")
                    ? "bg-red-500/15 text-red-400 shadow-[inset_3px_0_0_0_#f87171]"
                    : "text-slate-400 hover:bg-red-500/10 hover:text-red-300"
                }`}
              >
                <Settings
                  size={18}
                  className={`transition-transform duration-500 group-hover:rotate-90 ${isActive("/admin/settings") ? "text-red-400" : ""}`}
                />
                <span className="relative z-10">Manajemen Admin</span>
                {isActive("/admin/settings") && (
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent" />
                )}
              </Link>
            </div>
          )}
        </nav>
      </div>

      {/* FOOTER SIDEBAR */}
      <div className="border-t border-white/5 bg-slate-900/50 p-4">
        <Link
          href="/admin/login"
          onClick={handleLogout}
          className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition-all hover:bg-white/5 hover:text-white"
        >
          <LogOut
            size={18}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Keluar Sistem
        </Link>
      </div>
    </aside>
  );
}

// --- COMPONENT KECIL UTK LINK (Biar Clean Code) ---
function SidebarLink({ href, icon: Icon, label, isActive, accent, isLoading }: any) {
  // Tentukan warna berdasarkan accent (slate/red/blue)
  let activeClass = "";
  let iconClass = "";
  let hoverClass = "";

  if (accent === "red") {
    // Super Admin Style
    activeClass = "bg-red-500/15 text-red-400 shadow-[inset_3px_0_0_0_#f87171]";
    iconClass = "text-red-400";
    hoverClass = "hover:bg-red-500/10 hover:text-red-300";
  } else if (accent === "blue") {
    // Admin Biasa Style
    activeClass = "bg-blue-500/15 text-blue-400 shadow-[inset_3px_0_0_0_#60a5fa]";
    iconClass = "text-blue-400";
    hoverClass = "hover:bg-blue-500/10 hover:text-blue-300";
  } else {
    // Loading Style (Slate)
    activeClass = "bg-slate-800 text-slate-300";
    iconClass = "text-slate-300";
    hoverClass = "hover:bg-slate-800";
  }

  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${isActive ? activeClass : `text-slate-400 ${hoverClass}`}`}
    >
      <Icon
        size={18}
        className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? iconClass : ""}`}
      />
      <span className="relative z-10">{label}</span>
      {isActive && !isLoading && (
        <div
          className={`absolute inset-0 bg-gradient-to-r ${accent === "red" ? "from-red-500/10" : "from-blue-500/10"} pointer-events-none to-transparent`}
        />
      )}
    </Link>
  );
}
