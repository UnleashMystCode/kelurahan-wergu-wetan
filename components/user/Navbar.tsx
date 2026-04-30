"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Menu, X, Search, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const pathname = usePathname();
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    checkScroll();
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    setIsSearchOpen(false);
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { name: t.navbar.news, path: "/berita" },
    { name: "Tentang Kami", path: "/tentang-kami" },
    { name: "Potensi Desa", path: "/potensi-desa" },
    { name: t.navbar.services, path: "/layanan" },
    { name: t.navbar.contact, path: "/kontak" },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  const searchBarVariants: Variants = {
    hidden: { opacity: 0, width: "40px" },
    visible: { opacity: 1, width: "100%", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, width: "90%", transition: { duration: 0.3 } },
  };

  return (
    <>
      <nav
        className={`flex h-[80px] w-full items-center transition-all duration-500 ${
          scrolled || isOpen ? "border-b border-slate-100 bg-white shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="relative container mx-auto flex w-full items-center justify-between px-4 md:px-6">
          {/* --- BAGIAN KIRI: LOGO --- */}
          <Link
            href="/home"
            onClick={(e) => {
              if (pathname === "/home") {
                e.preventDefault();
                window.scrollTo(0, 0);
                if ("scrollRestoration" in history) history.scrollRestoration = "manual";
                window.location.reload();
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className={`relative z-20 flex items-start gap-3 transition-opacity duration-300 ${isSearchOpen ? "md:opacity-0 lg:opacity-100" : "opacity-100"}`}
          >
            <Image
              src="/logo-kudus.svg"
              alt="Logo Kab. Kudus"
              width={36}
              height={34}
              className="shrink-0 object-contain"
            />
            <div className="flex h-[34px] flex-col justify-between whitespace-nowrap">
              <h1
                className={`text-xl leading-tight font-bold transition-colors duration-500 md:text-2xl ${
                  scrolled || isOpen ? "text-slate-800" : "text-white"
                }`}
              >
                Wergu Wetan
              </h1>
              <p
                className={`text-[9px] font-medium tracking-[0.2em] uppercase transition-colors duration-500 ${
                  scrolled || isOpen ? "text-slate-500" : "text-blue-200"
                }`}
              >
                {t.navbar.city}
              </p>
            </div>
          </Link>

          {/* --- BAGIAN KANAN: MENU DESKTOP / SEARCH BAR --- */}
          <div className="relative ml-4 hidden h-full flex-1 items-center justify-end md:flex lg:ml-8">
            <AnimatePresence mode="wait">
              {!isSearchOpen ? (
                // === TAMPILAN 1: MENU NORMAL ===
                <motion.div
                  key="normal-menu"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 flex items-center justify-end gap-2 lg:gap-6"
                >
                  {/* --- BAGIAN MENU UTAMA --- */}
                  <div className="mr-1 flex items-center gap-4 lg:mr-3 lg:gap-6">
                    {menuItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={(e) => {
                          if (pathname === item.path) {
                            e.preventDefault();
                            window.scrollTo(0, 0);
                            if ("scrollRestoration" in history)
                              history.scrollRestoration = "manual";
                            window.location.reload();
                          } else {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                        className={`group relative text-sm font-bold whitespace-nowrap transition-colors duration-300 ${
                          scrolled
                            ? isActive(item.path)
                              ? "text-blue-600"
                              : "text-slate-600 hover:text-blue-600"
                            : "text-white"
                        }`}
                      >
                        {item.name}
                        <span
                          className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"}`}
                        ></span>
                      </Link>
                    ))}
                  </div>

                  {/* --- BAGIAN SEARCH + CTA PILL --- */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsSearchOpen(true)}
                      className={`flex items-center justify-center rounded-xl p-2.5 transition-all duration-300 ${
                        scrolled
                          ? "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
                          : "text-white hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Search size={18} />
                    </button>

                    <Link
                      href="/ayo-sehat"
                      className={`ml-1 flex items-center justify-center rounded-full px-5 py-2 text-[13.5px] font-medium tracking-wide whitespace-nowrap transition-all duration-300 ${
                        scrolled
                          ? "border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                          : "border border-white/60 bg-transparent text-white hover:bg-white hover:text-slate-900"
                      }`}
                    >
                      Ayo Sehat!
                    </Link>
                  </div>
                </motion.div>
              ) : (
                // === TAMPILAN 2: SEARCH BAR EXPANDED (IBM STYLE) ===
                <motion.div
                  key="search-bar"
                  ref={searchContainerRef}
                  variants={searchBarVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`absolute right-0 z-30 flex h-[48px] items-center overflow-hidden rounded-2xl ${
                    scrolled
                      ? "bg-slate-100 shadow-inner"
                      : "border border-white/20 bg-white/20 backdrop-blur-md"
                  }`}
                >
                  {/* Input Field */}
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Cari layanan, berita, atau informasi..."
                    className={`h-full w-full flex-1 border-none bg-transparent pr-2 pl-6 font-medium outline-none ${
                      scrolled
                        ? "text-slate-800 placeholder:text-slate-400"
                        : "text-white placeholder:text-white/60"
                    }`}
                    onKeyDown={(e) => e.key === "Escape" && setIsSearchOpen(false)}
                  />

                  {/* GROUP BUTTONS ON THE RIGHT (Search) */}
                  <div className="flex shrink-0 items-center gap-1 pr-1.5">
                    <button
                      className={`rounded-xl p-2.5 transition-all ${
                        scrolled
                          ? "text-slate-500 hover:bg-slate-200 hover:text-blue-600"
                          : "text-white/80 hover:bg-white/20 hover:text-white"
                      }`}
                      aria-label="Submit Search"
                    >
                      <Search size={20} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* TOMBOL MOBILE MENU */}
          <div
            className={`relative z-20 transition-opacity md:hidden ${isSearchOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}
          >
            <button
              className={`rounded-lg p-2 transition-colors ${scrolled || isOpen ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
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
            className="overflow-hidden border-b border-slate-100 bg-white shadow-xl md:hidden"
          >
            <div className="container mx-auto flex flex-col gap-6 px-6 py-8">
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
                        if ("scrollRestoration" in history) history.scrollRestoration = "manual";
                        window.location.reload();
                      }
                    }}
                    className={`flex items-center justify-between text-lg font-bold ${
                      isActive(item.path) ? "text-blue-600" : "text-slate-600"
                    }`}
                  >
                    {item.name}
                    <ChevronRight
                      size={18}
                      className={isActive(item.path) ? "text-blue-600" : "text-slate-300"}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
