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
  Store,
  ChevronDown,
  MessageSquareQuote,
  Grid,
  MonitorPlay,
  Target,
  BarChart,
  Megaphone,
  Briefcase,
  ClipboardList,
  UserCog
} from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminSidebar({ role }: { role: "admin" | "super" }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  
  // Helper for matching parent paths
  const isPathGroupActive = (basePath: string) => {
    return pathname === basePath || pathname.startsWith(basePath + "/");
  };

  const handleLogout = () => {
    document.cookie = "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  const isSuper = role === "super";

  const accentColor = isSuper ? "red" : "blue";

  const logoBgClass = isSuper
    ? "bg-red-500/20 text-red-400 shadow-red-900/20"
    : "bg-blue-500/20 text-blue-400 shadow-blue-900/20";

  const roleTextClass = isSuper ? "text-red-400" : "text-blue-400";

  return (
    <aside className="fixed top-0 left-0 z-40 flex h-screen w-64 flex-col justify-between border-r border-slate-800 bg-slate-900 text-white transition-colors duration-300">
      <div className="flex h-full flex-col overflow-hidden">
        {/* HEADER SIDEBAR */}
        <div className="shrink-0 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-lg transition-all duration-300 ${logoBgClass}`}
            >
              {isSuper ? (
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
                {isSuper ? "Super Access" : "Petugas Area"}
              </span>
            </div>
          </div>
        </div>

        {/* === NAVIGASI UTAMA === */}
        <div className="no-scrollbar flex-1 space-y-1.5 overflow-y-auto px-4 pb-6">
          <SidebarLink
            href="/admin/dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
            isActive={isActive("/admin/dashboard")}
            accent={accentColor}
            isLoading={false}
          />

          <div className="my-4 h-px bg-slate-800/60" />

          <SidebarDropdown
            label="Tampilan Beranda"
            icon={Home}
            accent={accentColor}
            isLoading={false}
            isActive={isPathGroupActive("/admin/halaman/beranda")}
          >
            <SidebarLink
              href="/admin/halaman/beranda"
              icon={ImageIcon}
              label="Kelola Banner"
              isActive={isActive("/admin/halaman/beranda")}
              accent={accentColor}
              isLoading={false}
              isSub={true}
            />
            <SidebarLink
              href="/admin/halaman/beranda/sambutan"
              icon={MessageSquareQuote}
              label="Teks Sambutan"
              isActive={isActive("/admin/halaman/beranda/sambutan")}
              accent={accentColor}
              isLoading={false}
              isSub={true}
            />
            <SidebarLink
              href="/admin/halaman/beranda/layanan-icon"
              icon={Grid}
              label="Menu Layanan"
              isActive={isActive("/admin/halaman/beranda/layanan-icon")}
              accent={accentColor}
              isLoading={false}
              isSub={true}
            />
          </SidebarDropdown>

          <SidebarDropdown
            label="Tentang Kami"
            icon={Building}
            accent={accentColor}
            isLoading={false}
            isActive={isPathGroupActive("/admin/halaman/tentang-kami")}
          >
            <SidebarLink
              href="/admin/halaman/tentang-kami"
              icon={ImageIcon}
              label="Kelola Banner"
              isActive={pathname === "/admin/halaman/tentang-kami"}
              accent={accentColor}
              isLoading={false}
              isSub={true}
            />
            <SidebarLink
              href="/admin/halaman/tentang-kami/teks"
              icon={Target}
              label="Visi Misi & Tugas"
              isActive={isActive("/admin/halaman/tentang-kami/teks")}
              accent={accentColor}
              isLoading={false}
              isSub={true}
            />
            <SidebarLink
              href="/admin/halaman/tentang-kami/struktur"
              icon={Users}
              label="Struktur Organisasi"
              isActive={isActive("/admin/halaman/tentang-kami/struktur")}
              accent={accentColor}
              isLoading={false}
              isSub={true}
            />
            <SidebarLink
              href="/admin/halaman/tentang-kami/statistik"
              icon={BarChart}
              label="Statistik Warga"
              isActive={isActive("/admin/halaman/tentang-kami/statistik")}
              accent={accentColor}
              isLoading={false}
              isSub={true}
            />
          </SidebarDropdown>

          <SidebarDropdown
            label="Halaman Berita"
            icon={Newspaper}
            accent={accentColor}
            isLoading={false}
            isActive={isPathGroupActive("/admin/halaman/berita")}
          >
            <SidebarLink
              href="/admin/halaman/berita"
              icon={ImageIcon}
              label="Kelola Banner"
              isActive={pathname === "/admin/halaman/berita"}
              accent={accentColor}
              isLoading={false}
              isSub={true}
            />
            <SidebarLink
              href="/admin/halaman/berita/daftar"
              icon={Megaphone}
              label="Daftar Berita"
              isActive={isActive("/admin/halaman/berita/daftar")}
              accent={accentColor}
              isLoading={false}
              isSub={true}
            />
          </SidebarDropdown>

          <SidebarDropdown
            label="Halaman Potensi Desa"
            icon={Store}
            accent={accentColor}
            isLoading={false}
            isActive={isPathGroupActive("/admin/halaman/potensi-desa")}
          >
            <SidebarLink
              href="/admin/halaman/potensi-desa"
              icon={ImageIcon}
              label="Kelola Banner"
              isActive={pathname === "/admin/halaman/potensi-desa"}
              accent={accentColor}
              isLoading={false}
              isSub={true}
            />
            <SidebarLink
              href="/admin/halaman/potensi-desa/daftar"
              icon={Target}
              label="Daftar UMKM"
              isActive={isActive("/admin/halaman/potensi-desa/daftar")}
              accent={accentColor}
              isLoading={false}
              isSub={true}
            />
          </SidebarDropdown>

          <SidebarDropdown
            label="Halaman Layanan"
            icon={Briefcase}
            accent={accentColor}
            isLoading={false}
            isActive={isPathGroupActive("/admin/halaman/layanan")}
          >
            <SidebarLink
              href="/admin/halaman/layanan"
              icon={ImageIcon}
              label="Kelola Banner"
              isActive={pathname === "/admin/halaman/layanan"}
              accent={accentColor}
              isLoading={false}
              isSub={true}
            />
            <SidebarLink
              href="/admin/halaman/layanan/daftar"
              icon={ClipboardList}
              label="Daftar Layanan"
              isActive={isActive("/admin/halaman/layanan/daftar")}
              accent={accentColor}
              isLoading={false}
              isSub={true}
            />
          </SidebarDropdown>

          <SidebarDropdown
            label="Halaman Kontak"
            icon={Phone}
            accent={accentColor}
            isLoading={false}
            isActive={isPathGroupActive("/admin/halaman/kontak") || isPathGroupActive("/admin/pesan-masuk")}
          >
            <SidebarLink
              href="/admin/halaman/kontak"
              icon={ImageIcon}
              label="Kelola Banner"
              isActive={pathname === "/admin/halaman/kontak"}
              accent={accentColor}
              isLoading={false}
              isSub={true}
            />
            <SidebarLink
              href="/admin/halaman/kontak/daftar"
              icon={Settings}
              label="Informasi Kontak"
              isActive={isActive("/admin/halaman/kontak/daftar")}
              accent={accentColor}
              isLoading={false}
              isSub={true}
            />
            <SidebarLink
              href="/admin/pesan-masuk"
              icon={MessageSquareQuote}
              label="Kotak Masuk Warga"
              isActive={isActive("/admin/pesan-masuk")}
              accent={accentColor}
              isLoading={false}
              isSub={true}
            />
          </SidebarDropdown>

          {/* === NAVIGASI KHUSUS SUPER ADMIN === */}
          {isSuper && (
            <div className="animate-in fade-in slide-in-from-left-4 mt-6 border-t border-white/5 pt-4 duration-500">
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
                <UserCog
                  size={18}
                  className={`shrink-0 transition-transform duration-500 group-hover:rotate-12 ${isActive("/admin/settings") ? "text-red-400" : ""}`}
                />
                <span className="relative z-10 truncate">Manajemen Admin</span>
                {isActive("/admin/settings") && (
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent" />
                )}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER SIDEBAR */}
      <div className="shrink-0 border-t border-white/5 bg-slate-900/50 p-4">
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

// --- COMPONENT DROPDOWN ---
function SidebarDropdown({ label, icon: Icon, isActive, accent, children }: any) {
  const [isOpen, setIsOpen] = useState(isActive);

  useEffect(() => {
    if (isActive) setIsOpen(true);
  }, [isActive]);

  let activeClass = "";
  let iconClass = "";

  if (accent === "red") {
    activeClass = "bg-red-500/10 text-red-400";
    iconClass = "text-red-400";
  } else if (accent === "blue") {
    activeClass = "bg-blue-500/10 text-blue-400";
    iconClass = "text-blue-400";
  } else {
    activeClass = "bg-slate-800 text-slate-300";
    iconClass = "text-slate-300";
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${isActive || isOpen ? activeClass : "text-slate-400 hover:bg-slate-800"}`}
      >
        <div className="flex items-center gap-3">
          <Icon
            size={18}
            className={`shrink-0 transition-transform duration-300 ${isActive || isOpen ? iconClass : ""}`}
          />
          <span className="truncate">{label}</span>
        </div>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-300 opacity-60 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="ml-[22px] mt-1 flex flex-col gap-1 border-l border-slate-700/50 pl-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT KECIL UTK LINK ---
function SidebarLink({ href, icon: Icon, label, isActive, accent, isSub = false }: any) {
  let activeClass = "";
  let iconClass = "";
  let hoverClass = "";

  if (accent === "red") {
    activeClass = isSub ? "bg-red-500/15 text-red-400" : "bg-red-500/15 text-red-400 shadow-[inset_3px_0_0_0_#f87171]";
    iconClass = "text-red-400";
    hoverClass = "hover:bg-red-500/10 hover:text-red-300";
  } else if (accent === "blue") {
    activeClass = isSub ? "bg-blue-500/15 text-blue-400" : "bg-blue-500/15 text-blue-400 shadow-[inset_3px_0_0_0_#60a5fa]";
    iconClass = "text-blue-400";
    hoverClass = "hover:bg-blue-500/10 hover:text-blue-300";
  } else {
    activeClass = "bg-slate-800 text-slate-300";
    iconClass = "text-slate-300";
    hoverClass = "hover:bg-slate-800";
  }

  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 font-medium transition-all duration-300 ${isSub ? "text-[13px]" : "text-sm"} ${isActive ? activeClass : `text-slate-400 ${hoverClass}`}`}
    >
      <Icon
        size={isSub ? 16 : 18}
        className={`shrink-0 transition-transform duration-300 ${isActive ? iconClass : "opacity-70 group-hover:opacity-100"} ${!isSub && "group-hover:scale-110"}`}
      />
      <span className="relative z-10 truncate">{label}</span>
      {isActive && !isSub && (
        <div
          className={`absolute inset-0 pointer-events-none bg-gradient-to-r ${accent === "red" ? "from-red-500/10" : "from-blue-500/10"} to-transparent`}
        />
      )}
    </Link>
  );
}
