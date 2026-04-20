"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
// Import motion dan AnimatePresence untuk animasi
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Menu, X, LogIn, Search, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(true);
  // State baru untuk mengontrol mode pencarian
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const pathname = usePathname();
  const { t } = useLanguage();
  // Ref untuk input agar bisa auto-focus saat dibuka
  const inputRef = useRef<HTMLInputElement>(null);

  // Efek Cek Scroll
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 20) { setScrolled(true); } else { setScrolled(false); }
    };
    checkScroll();
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  // Efek Auto-focus saat search dibuka
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Reset search saat pindah halaman
  useEffect(() => {
    setIsSearchOpen(false);
    setIsOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { name: t.navbar.news, path: "/berita" },
    { name: "Tentang Kami", path: "/tentang-kami" }, // Ganti dari /profil ke /tentang-kami
    { name: t.navbar.services, path: "/layanan" },
    { name: t.navbar.contact, path: "/kontak" },
  ];

  // Variasi animasi Framer Motion
  const containerVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  const searchBarVariants: Variants = {
    hidden: { opacity: 0, width: "40px" },
    visible: { opacity: 1, width: "100%", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, width: "90%", transition: { duration: 0.3 } }
  };

  return (
    <>
      <nav
      className={`w-full transition-all duration-500 h-[80px] flex items-center ${scrolled
        ? "bg-white border-b border-slate-100 shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center w-full relative">

        {/* --- BAGIAN KIRI: LOGO --- */}
        <Link 
          href="/home" 
          onClick={(e) => {
            if (pathname === "/home") {
              e.preventDefault();
              window.scrollTo(0, 0);
              if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
              window.location.reload();
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }} 
          className={`flex items-start gap-3 relative z-20 transition-opacity duration-300 ${isSearchOpen ? 'md:opacity-0 lg:opacity-100' : 'opacity-100'}`}
        >
          <Image
            src="/logo-kudus.svg"
            alt="Logo Kab. Kudus"
            width={36}
            height={34}
            className="object-contain shrink-0"
          />
          {/* TEKS STATIC */}
          <div className="flex flex-col justify-between whitespace-nowrap h-[34px]">
            <h1 className={`font-bold text-xl md:text-2xl leading-tight transition-colors duration-500 ${scrolled || isOpen ? "text-slate-800" : "text-white"
              }`}>
              Wergu Wetan
            </h1>
            <p className={`text-[9px] tracking-[0.2em] uppercase font-medium transition-colors duration-500 ${scrolled || isOpen ? "text-slate-500" : "text-blue-200"
              }`}>
              {t.navbar.city}
            </p>
          </div>
        </Link>


        {/* --- BAGIAN KANAN: MENU DESKTOP / SEARCH BAR --- */}
        <div className="hidden md:flex items-center flex-1 justify-end relative h-full ml-4 lg:ml-8">
          <AnimatePresence mode="wait">
            {!isSearchOpen ? (
              // === TAMPILAN 1: MENU NORMAL ===
              <motion.div
                key="normal-menu"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center gap-4 lg:gap-6 absolute right-0"
              >
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={(e) => {
                      if (pathname === item.path) {
                        e.preventDefault();
                        window.scrollTo(0, 0);
                        if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
                        window.location.reload();
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`text-sm font-bold transition-colors duration-300 relative group whitespace-nowrap ${
                      scrolled 
                        ? (isActive(item.path) ? "text-blue-600" : "text-slate-600 hover:text-blue-600")
                        : "text-white"
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                  </Link>
                ))}

                <button
                  onClick={() => setIsSearchOpen(true)}
                  className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center ${scrolled
                    ? "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
                    : "text-white hover:text-white hover:bg-white/10"
                    }`}
                >
                  <Search size={18} />
                </button>

                <Link
                  href="/admin/login"
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all whitespace-nowrap ${scrolled
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                    : "bg-white text-blue-600 hover:bg-blue-50 hover:shadow-md"
                    }`}
                >
                  {t.navbar.adminLogin}
                </Link>
              </motion.div>
            ) : (
              // === TAMPILAN 2: SEARCH BAR EXPANDED (IBM STYLE) ===
              <motion.div
                key="search-bar"
                variants={searchBarVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`absolute right-0 h-[48px] flex items-center rounded-2xl overflow-hidden z-30 ${scrolled
                  ? "bg-slate-100 shadow-inner"
                  : "bg-white/20 backdrop-blur-md border border-white/20"
                  }`}
              >
                {/* Input Field (Placing padding-left higher since icon moved) */}
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Cari layanan, berita, atau informasi..."
                  className={`flex-1 bg-transparent border-none outline-none h-full font-medium pl-6 pr-2 w-full ${scrolled
                    ? "text-slate-800 placeholder:text-slate-400"
                    : "text-white placeholder:text-white/60"
                    }`}
                  onKeyDown={(e) => e.key === 'Escape' && setIsSearchOpen(false)}
                />

                {/* GROUP BUTTONS ON THE RIGHT (Search & Close) */}
                <div className="flex items-center gap-1 pr-1.5 shrink-0">
                  {/* Tombol Search (Fungsional) */}
                  <button
                    className={`p-2.5 rounded-xl transition-all ${scrolled
                      ? "text-slate-500 hover:text-blue-600 hover:bg-slate-200"
                      : "text-white/80 hover:text-white hover:bg-white/20"
                      }`}
                    aria-label="Submit Search"
                  >
                    <Search size={20} />
                  </button>

                  {/* Tombol Close (X) */}
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className={`p-2.5 rounded-xl transition-all ${scrolled
                      ? "text-slate-500 hover:text-red-500 hover:bg-slate-200"
                      : "text-white/80 hover:text-white hover:bg-white/20"
                      }`}
                    aria-label="Close Search"
                  >
                    <X size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* TOMBOL MOBILE MENU */}
        <div className={`md:hidden relative z-20 transition-opacity ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <button
            className={`p-2 rounded-lg transition-colors ${scrolled ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>
    </nav>

    {/* --- MOBILE MENU OVERLAY --- */}
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden bg-white border-b border-slate-100 overflow-hidden shadow-xl"
        >
          <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
            {menuItems.map((item, idx) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={item.path}
                  onClick={(e) => {
                    setIsOpen(false);
                    if (pathname === item.path) {
                      e.preventDefault();
                      window.scrollTo(0, 0);
                      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
                      window.location.reload();
                    }
                  }}
                  className={`text-lg font-bold flex items-center justify-between ${
                    isActive(item.path) ? "text-blue-600" : "text-slate-600"
                  }`}
                >
                  {item.name}
                  <ChevronRight size={18} className={isActive(item.path) ? "text-blue-600" : "text-slate-300"} />
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="pt-6 border-t border-slate-100"
            >
              <Link
                href="/admin/login"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-transform"
              >
                <LogIn size={20} />
                Portal Admin
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}