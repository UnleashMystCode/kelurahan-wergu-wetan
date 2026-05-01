"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronRight, FileText, User, Tag, Search, Loader2 } from "lucide-react";
import Link from "next/link";

export default function BeritaView({ banner, newsData = [] }: any) {
  const [activeTag, setActiveTag] = useState("Semua");

  const tags = ["Semua", "Kegiatan", "Pengumuman", "Ekonomi", "Pembangunan"];
  const HEADER_OFFSET = 120; // Sesuai ClientLayout (Topbar 40 + Navbar 80)
  const SUBMENU_HEIGHT = 60;

  // Filter: Hanya menampilkan yang 'Aktif', sesuai Tag yang dipilih
  const filtered = (newsData || [])
    .filter((n: any) => n.status === "Aktif")
    .filter((n: any) => activeTag === "Semua" || n.kategori === activeTag);

  const stickyRef = useRef<HTMLDivElement>(null);

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    if (stickyRef.current) {
      const y = stickyRef.current.offsetTop - HEADER_OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 1. HERO HEADER (Minimalist Dark Search Style) */}
      <div className="relative mt-[-100px] flex w-full flex-col items-center justify-center bg-[#0B132B] px-4 pt-[260px] pb-[100px] text-center md:pt-[300px] md:pb-[140px]">
        <div className="mx-auto w-full max-w-4xl">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
            className="mb-6 text-5xl leading-none tracking-tight text-white md:text-[80px]"
          >
            Berita
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-10 w-full px-4"
          >
            <p className="text-lg font-medium text-slate-300 md:text-xl">
              Telusuri arsip publikasi, laporan kegiatan, pencapaian kinerja, serta siaran pers resmi
              liputan Kelurahan Wergu Wetan.
            </p>
          </motion.div>
        </div>


      </div>

      {/* 2. STICKY SUB-NAVBAR (Gaya Sinkron dengan Profil & Beranda) */}
      <div
        ref={stickyRef}
        className="sticky z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md transition-all"
        style={{ top: `${HEADER_OFFSET}px`, height: `${SUBMENU_HEIGHT}px` }}
      >
        <div className="container mx-auto h-full px-4">
          <div className="no-scrollbar flex h-full items-center justify-start gap-1 overflow-x-auto md:justify-center">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`group relative flex h-full items-center gap-2 border-b-[3px] px-6 text-[13px] font-bold whitespace-nowrap transition-all lg:text-sm ${
                  activeTag === tag
                    ? "border-blue-600 bg-blue-50/50 text-blue-600 rounded-t-lg"
                    : "border-transparent text-slate-500 hover:bg-slate-100 hover:text-blue-600 hover:border-blue-400 rounded-t-lg"
                } `}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. NEWS LIST (CLEAN SERIF DOCUMENT STYLE) */}
      <div className="relative z-30 container mx-auto px-6 pt-16">
        <div className="mx-auto flex max-w-4xl flex-col pt-6">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeTag} // Key changes when category changes, triggering exit/enter for the whole block
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {filtered.map((item: any, idx: number) => (
                  <div key={item.id} className="group mb-14 flex flex-col">
                    <Link href={`/berita/${item.slug}`} className="mb-3 block">
                      <h3
                        style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
                        className="text-[26px] leading-[1.25] tracking-tight text-slate-800 transition-colors group-hover:text-blue-700 md:text-[32px]"
                      >
                        {item.judul}
                      </h3>
                    </Link>

                    <div className="mt-2 flex flex-wrap items-center text-[14.5px] font-medium tracking-wide text-slate-500">
                      <span className="text-slate-600">
                        {item.kategori} {item.penulis ? `, ${item.penulis}` : ""}
                      </span>
                      <span className="mx-4 font-light text-slate-300">|</span>
                      <span>
                        {new Date(item.tanggal).toLocaleDateString("id-ID", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-slate-100 shadow-sm">
                  <FileText className="text-slate-400" size={40} />
                </div>
                <h2 className="mb-4 text-2xl font-black text-slate-800">
                  Belum Ada Publikasi
                </h2>
                <p className="mx-auto max-w-lg text-[15px] leading-relaxed text-slate-500">
                  Modul publikasi untuk kategori "{activeTag}" saat ini belum memiliki konten. Periksa kembali secara berkala.
                </p>
              </div>
            )}
          </AnimatePresence>

          {/* Simple Dummy Pagination matching the screenshot (1 2 3 ... 173 NEXT) */}
          {filtered.length > 0 && (
            <div className="mt-12 mb-20 flex items-center justify-center gap-6 text-[13px] font-bold text-slate-400">
              <button className="border-b-[2px] border-slate-800 px-1 pb-1 text-slate-800">
                1
              </button>
              <button className="px-1 transition-colors hover:text-slate-800">2</button>
              <button className="px-1 transition-colors hover:text-slate-800">3</button>
              <span className="px-1 text-slate-300">...</span>
              <button className="px-1 transition-colors hover:text-slate-800">17</button>
              <button className="ml-4 px-1 tracking-widest uppercase transition-colors hover:text-slate-800">
                NEXT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
