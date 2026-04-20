"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, Users, Settings, Image as ImageIcon,
  LogOut, ShieldAlert, ShieldCheck, Loader2, Home, Building, Newspaper, Phone
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

  const isSuper = role === 'super';
  const isLoading = !mounted;

  // Warna Aksen Utama
  const accentColor = isLoading ? "slate" : (isSuper ? "red" : "blue");

  // Style Logo Header
  const logoBgClass = isLoading
    ? "bg-slate-800 text-slate-500"
    : (isSuper ? "bg-red-500/20 text-red-400 shadow-red-900/20" : "bg-blue-500/20 text-blue-400 shadow-blue-900/20");

  // Style Teks Role
  const roleTextClass = isLoading
    ? "text-slate-600"
    : (isSuper ? "text-red-400" : "text-blue-400");

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col justify-between z-40 border-r border-slate-800 transition-colors duration-300">

      {/* HEADER SIDEBAR */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          {/* Logo dengan Loading State */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg ${logoBgClass}`}>
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : (isSuper ? <ShieldAlert size={22} /> : <ShieldCheck size={22} />)}
          </div>

          <div>
            <h1 className="font-bold text-lg leading-none tracking-tight text-slate-200">Wergu Admin</h1>
            <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 ${roleTextClass}`}>
              {isLoading ? "Memuat..." : (isSuper ? 'Super Access' : 'Petugas Area')}
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
            isActive={isActive('/admin/dashboard')}
            accent={accentColor}
            isLoading={isLoading}
          />

          <div className="mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider px-4">
            1. Konten Beranda
          </div>
          <SidebarLink
            href="/admin/halaman/beranda"
            icon={ImageIcon}
            label="Banner Utama (Hero)"
            isActive={isActive('/admin/halaman/beranda')}
            accent={accentColor}
            isLoading={isLoading}
          />
          <SidebarLink
            href="/admin/halaman/beranda/sambutan"
            icon={FileText}
            label="Teks & TTD Sambutan"
            isActive={isActive('/admin/halaman/beranda/sambutan')}
            accent={accentColor}
            isLoading={isLoading}
          />
          <SidebarLink
            href="/admin/halaman/beranda/layanan-icon"
            icon={Home}
            label="Menu Layanan Cepat"
            isActive={isActive('/admin/halaman/beranda/layanan-icon')}
            accent={accentColor}
            isLoading={isLoading}
          />

          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-4 mb-2 mt-6">
            2. Konten Publikasi
          </div>
          <SidebarLink
            href="/admin/halaman/berita"
            icon={Newspaper}
            label="Kabar & Berita Terkini"
            isActive={isActive('/admin/halaman/berita')}
            accent={accentColor}
            isLoading={isLoading}
          />

          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-4 mb-2 mt-6">
            3. Halaman Tentang Kami
          </div>
          <SidebarLink
            href="/admin/halaman/tentang-kami"
            icon={ImageIcon}
            label="Banner & Sampul"
            isActive={pathname === '/admin/halaman/tentang-kami'}
            accent={accentColor}
            isLoading={isLoading}
          />
          <SidebarLink
            href="/admin/halaman/tentang-kami/teks"
            icon={FileText}
            label="Visi Misi & Tugas"
            isActive={isActive('/admin/halaman/tentang-kami/teks')}
            accent={accentColor}
            isLoading={isLoading}
          />
          <SidebarLink
            href="/admin/halaman/tentang-kami/struktur"
            icon={Users}
            label="Struktur Organisasi"
            isActive={isActive('/admin/halaman/tentang-kami/struktur')}
            accent={accentColor}
            isLoading={isLoading}
          />
          <SidebarLink
            href="/admin/halaman/tentang-kami/statistik"
            icon={LayoutDashboard}
            label="Statistik & Monografi"
            isActive={isActive('/admin/halaman/tentang-kami/statistik')}
            accent={accentColor}
            isLoading={isLoading}
          />

          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-4 mb-2 mt-6">
            4. Halaman Layanan
          </div>
          <SidebarLink
            href="/admin/halaman/layanan"
            icon={FileText}
            label="Layanan Request Warga"
            isActive={isActive('/admin/halaman/layanan')}
            accent={accentColor}
            isLoading={isLoading}
          />

          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-4 mb-2 mt-6">
            5. Footer & Pengaturan 
          </div>
          <SidebarLink
            href="/admin/halaman/kontak"
            icon={Phone}
            label="Info Footer & Kontak"
            isActive={isActive('/admin/halaman/kontak')}
            accent={accentColor}
            isLoading={isLoading}
          />

          {/* === NAVIGASI KHUSUS SUPER ADMIN === */}
          {/* Hanya muncul jika sudah mounted DAN role === 'super' */}
          {mounted && isSuper && (
            <div className="mt-8 pt-4 border-t border-white/5 animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider px-4">
                Super Admin Area
              </div>

              <Link
                href="/admin/settings"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm group relative overflow-hidden
                  ${isActive('/admin/settings')
                    ? 'bg-red-500/15 text-red-400 shadow-[inset_3px_0_0_0_#f87171]'
                    : 'text-slate-400 hover:bg-red-500/10 hover:text-red-300'
                  }`}
              >
                <Settings size={18} className={`transition-transform duration-500 group-hover:rotate-90 ${isActive('/admin/settings') ? 'text-red-400' : ''}`} />
                <span className="relative z-10">Manajemen Admin</span>
                {isActive('/admin/settings') && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent pointer-events-none" />
                )}
              </Link>
            </div>
          )}
        </nav>
      </div>

      {/* FOOTER SIDEBAR */}
      <div className="p-4 border-t border-white/5 bg-slate-900/50">
        <Link
          href="/admin/login"
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all font-medium text-sm group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
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

  if (accent === "red") { // Super Admin Style
    activeClass = "bg-red-500/15 text-red-400 shadow-[inset_3px_0_0_0_#f87171]";
    iconClass = "text-red-400";
    hoverClass = "hover:bg-red-500/10 hover:text-red-300";
  } else if (accent === "blue") { // Admin Biasa Style
    activeClass = "bg-blue-500/15 text-blue-400 shadow-[inset_3px_0_0_0_#60a5fa]";
    iconClass = "text-blue-400";
    hoverClass = "hover:bg-blue-500/10 hover:text-blue-300";
  } else { // Loading Style (Slate)
    activeClass = "bg-slate-800 text-slate-300";
    iconClass = "text-slate-300";
    hoverClass = "hover:bg-slate-800";
  }

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm group relative overflow-hidden
      ${isActive ? activeClass : `text-slate-400 ${hoverClass}`}`}
    >
      <Icon size={18} className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? iconClass : ''}`} />
      <span className="relative z-10">{label}</span>
      {isActive && !isLoading && <div className={`absolute inset-0 bg-gradient-to-r ${accent === 'red' ? 'from-red-500/10' : 'from-blue-500/10'} to-transparent pointer-events-none`} />}
    </Link>
  );
}