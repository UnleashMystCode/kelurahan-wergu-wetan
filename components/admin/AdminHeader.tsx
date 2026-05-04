"use client";

import {
  Bell,
  Search,
  User,
  ShieldCheck,
  ShieldAlert,
  ChevronDown,
  Calendar,
  Menu,
  Command,
} from "lucide-react";

interface AdminHeaderProps {
  role: "admin" | "super";
  isCollapsed: boolean;
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
}

export default function AdminHeader({ role, isCollapsed, onToggleSidebar, onOpenSearch }: AdminHeaderProps) {
  // --- LOGIKA WARNA DINAMIS ---
  const isSuper = role === "super";
  const themeColor = isSuper ? "red" : "blue";

  // Class Tailwind Dinamis
  const logoBg = isSuper
      ? "bg-red-600 shadow-red-600/20 text-white"
      : "bg-blue-600 shadow-blue-600/20 text-white";
  const titleColor = isSuper ? "text-red-600" : "text-blue-600";
  const ringColor = isSuper
      ? "border-red-500 ring-red-500/10"
      : "border-blue-500 ring-blue-500/10";
  const hoverText = isSuper ? "hover:text-red-600" : "hover:text-blue-600";
  const hoverBg = isSuper ? "hover:bg-red-50" : "hover:bg-blue-50";

  // Text Label
  const portalTitle = isSuper ? "SUPER ADMIN" : "ADMINISTRATOR";
  const userLabel = isSuper ? "Root User" : "Petugas Admin";
  const userInitial = isSuper ? "S" : "A";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-8 shadow-sm backdrop-blur-md transition-all duration-300">
      {/* 1. KIRI: BRANDING & TOGGLE */}
      <div className="flex items-center gap-4">
        {/* Toggle Button */}
        <button 
          onClick={onToggleSidebar}
          className={`flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 focus:outline-none`}
        >
          <Menu size={20} />
        </button>

        {/* LOGO */}
        <div
          className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl shadow-lg transition-colors duration-300 ${logoBg}`}
        >
          {isSuper ? (
            <ShieldAlert size={20} className="md:w-6 md:h-6" />
          ) : (
            <ShieldCheck size={20} className="md:w-6 md:h-6" />
          )}
        </div>

        <div className="hidden md:block">
          <h2 className="text-lg leading-none font-extrabold tracking-tight text-slate-800 transition-all">
            {portalTitle}{" "}
            <span className={`transition-colors duration-300 ${titleColor}`}>PORTAL</span>
          </h2>
          <p className="mt-1 text-[11px] font-medium tracking-wide text-slate-500">
            SISTEM INFORMASI DESA
          </p>
        </div>
      </div>

      {/* 2. TENGAH & KANAN: AREA INTERAKTIF */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* A. SEARCH BAR (Trigger Command Palette) */}
        <button
          onClick={onOpenSearch}
          className={`hidden items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 w-64 transition-all duration-300 hover:bg-white hover:border-slate-300 md:flex group`}
        >
          <div className="flex items-center gap-3">
            <Search
              size={18}
              className="text-slate-400 group-hover:text-slate-600 transition-colors"
            />
            <span className="text-sm font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
              Pencarian Cepat...
            </span>
          </div>
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-slate-200 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-500">
            <Command size={10} />K
          </kbd>
        </button>

        {/* B. FILTER TOOLS */}
        <div className="mr-2 flex items-center gap-2 border-r border-slate-200 pr-4">
          <button
            className={`hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-sm transition xl:flex ${hoverBg} ${hoverText}`}
          >
            <Calendar size={16} />
            <span>Bulan Ini</span>
            <ChevronDown size={14} className="opacity-50" />
          </button>
        </div>

        {/* C. NOTIFIKASI & PROFIL */}
        <div className="flex items-center gap-4">
          <button
            className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition ${hoverBg} ${hoverText}`}
          >
            <Bell size={20} />
            <span
              className={`absolute top-2 right-2.5 h-2 w-2 animate-pulse rounded-full border border-white ${isSuper ? "bg-orange-500" : "bg-red-500"}`}
            ></span>
          </button>

          {/* User Profile */}
          <div className="flex cursor-pointer items-center gap-3 pl-2 transition hover:opacity-80">
            <div className="hidden text-right lg:block">
              <p className="text-sm leading-none font-bold text-slate-800">{userLabel}</p>
              <p
                className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold transition-colors ${isSuper ? "border-red-100 bg-red-50 text-red-600" : "border-blue-100 bg-blue-50 text-blue-600"}`}
              >
                Online
              </p>
            </div>

            {/* AVATAR: Abu -> Warna Role */}
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white font-bold text-white shadow-md transition-colors duration-500 ${
                isSuper
                  ? "bg-gradient-to-tr from-red-600 to-orange-500"
                  : "bg-gradient-to-tr from-blue-600 to-cyan-400"
              }`}
            >
              {userInitial}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
