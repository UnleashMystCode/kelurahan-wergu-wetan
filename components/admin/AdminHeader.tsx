"use client";

import { useState, useEffect } from "react";
import { 
  Bell, Search, User, ShieldCheck, ShieldAlert, ChevronDown, 
  Calendar, Loader2 
} from "lucide-react";

export default function AdminHeader() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // 1. STATE ROLE
  const [role, setRole] = useState<"admin" | "super">("admin");
  
  // 2. STATE MOUNTED (Anti-Kedip)
  // Kita pakai ini untuk tau apakah browser sudah selesai baca localStorage atau belum
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Cek LocalStorage
    const savedRole = localStorage.getItem("userRole") as "admin" | "super";
    if (savedRole) {
      setRole(savedRole);
    }
    // Beritahu sistem bahwa komponen sudah "siap" (mounted)
    setMounted(true);
  }, []);

  // --- LOGIKA WARNA DINAMIS ---
  const isSuper = role === 'super';

  // Kalau belum siap (mounted = false), pakai warna NETRAL (Slate/Abu).
  // Kalau sudah siap, baru pakai warna Merah/Biru.
  const themeColor = !mounted ? "slate" : (isSuper ? "red" : "blue");
  
  // Class Tailwind Dinamis
  const logoBg = !mounted ? "bg-slate-200 text-slate-400" : (isSuper ? "bg-red-600 shadow-red-600/20 text-white" : "bg-blue-600 shadow-blue-600/20 text-white");
  const titleColor = !mounted ? "text-slate-400" : (isSuper ? "text-red-600" : "text-blue-600");
  const ringColor = !mounted ? "" : (isSuper ? "border-red-500 ring-red-500/10" : "border-blue-500 ring-blue-500/10");
  const hoverText = !mounted ? "" : (isSuper ? "hover:text-red-600" : "hover:text-blue-600");
  const hoverBg = !mounted ? "" : (isSuper ? "hover:bg-red-50" : "hover:bg-blue-50");
  
  // Text Label
  const portalTitle = !mounted ? "LOADING..." : (isSuper ? "SUPER ADMIN" : "ADMINISTRATOR");
  const userLabel = !mounted ? "..." : (isSuper ? "Root User" : "Petugas Admin");
  const userInitial = !mounted ? "?" : (isSuper ? "S" : "A");

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 h-20 flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm transition-all duration-300">
      
      {/* 1. KIRI: BRANDING */}
      <div className="flex items-center gap-4">
        {/* LOGO: Abu (Loading) -> Merah/Biru (Selesai) */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-colors duration-300 ${logoBg}`}>
           {!mounted ? <Loader2 size={24} className="animate-spin" /> : (isSuper ? <ShieldAlert size={24} /> : <ShieldCheck size={24} />)}
        </div>
        
        <div className="hidden md:block">
          <h2 className="font-extrabold text-slate-800 text-lg leading-none tracking-tight transition-all">
            {portalTitle} <span className={`transition-colors duration-300 ${titleColor}`}>PORTAL</span>
          </h2>
          <p className="text-[11px] text-slate-500 font-medium mt-1 tracking-wide">
            SISTEM INFORMASI DESA
          </p>
        </div>
      </div>

      {/* 2. TENGAH & KANAN: AREA INTERAKTIF */}
      <div className="flex items-center gap-3 md:gap-6">

        {/* A. SEARCH BAR */}
        <div className={`hidden md:flex items-center transition-all duration-300 rounded-xl px-4 py-2.5 border 
          ${isSearchFocused 
            ? `w-80 bg-white shadow-sm ring-4 ${ringColor}` 
            : 'w-64 bg-slate-50 border-slate-200'
          }`}>
          <Search size={18} className={`transition-colors ${isSearchFocused ? titleColor : 'text-slate-400'}`} />
          <input 
            type="text" 
            placeholder={!mounted ? "Memuat..." : (isSuper ? "Cari data sensitif..." : "Cari menu...")}
            className="bg-transparent border-none outline-none text-sm ml-3 w-full text-slate-700 placeholder:text-slate-400 font-medium"
            disabled={!mounted}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>

        {/* B. FILTER TOOLS */}
        <div className="flex items-center gap-2 border-r border-slate-200 pr-4 mr-2">
           <button className={`hidden xl:flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold transition shadow-sm ${hoverBg} ${hoverText}`}>
              <Calendar size={16} />
              <span>Bulan Ini</span>
              <ChevronDown size={14} className="opacity-50" />
           </button>
        </div>

        {/* C. NOTIFIKASI & PROFIL */}
        <div className="flex items-center gap-4">
          <button className={`relative w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 transition border border-slate-200 ${hoverBg} ${hoverText}`}>
            <Bell size={20} />
            {mounted && (
                <span className={`absolute top-2 right-2.5 w-2 h-2 rounded-full border border-white animate-pulse ${isSuper ? 'bg-orange-500' : 'bg-red-500'}`}></span>
            )}
          </button>
          
          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition">
            <div className="text-right hidden lg:block">
              <p className="text-sm font-bold text-slate-800 leading-none">{userLabel}</p>
              {mounted && (
                 <p className={`text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full inline-block border transition-colors
                    ${isSuper ? 'text-red-600 bg-red-50 border-red-100' : 'text-blue-600 bg-blue-50 border-blue-100'}`}>
                    Online
                 </p>
              )}
            </div>
            
            {/* AVATAR: Abu -> Warna Role */}
            <div className={`w-10 h-10 text-white rounded-full flex items-center justify-center font-bold border-2 border-white shadow-md transition-colors duration-500
              ${!mounted 
                ? 'bg-slate-200 text-slate-400' 
                : (isSuper ? 'bg-gradient-to-tr from-red-600 to-orange-500' : 'bg-gradient-to-tr from-blue-600 to-cyan-400')
              }`}>
              {userInitial}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}