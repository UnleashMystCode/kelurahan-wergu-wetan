"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronRight, FileText, User, Tag, Search, Loader2, Newspaper } from "lucide-react";
import Link from "next/link";
import StaticBanner from "./StaticBanner";

export default function BeritaView({ banner, newsData = [] }: any) {
  const [activeTag, setActiveTag] = useState("Semua");

  const tags = ["Semua", "Kegiatan", "Pengumuman", "Ekonomi", "Pembangunan"];
  const HEADER_OFFSET = 120; // Sesuai ClientLayout (Topbar 40 + Navbar 80)
  const SUBMENU_HEIGHT = 60;

  // Filter: Hanya menampilkan yang 'Aktif', sesuai Tag yang dipilih
  const filtered = (newsData || [])
    .filter((n: any) => n.status === "Aktif")
    .filter((n: any) => activeTag === "Semua" || n.kategori === activeTag);

  const anchorRef = useRef<HTMLDivElement>(null);

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    // Use a small timeout to allow React to update the DOM (in case list gets shorter)
    setTimeout(() => {
      if (anchorRef.current) {
        // Find the absolute Y position of the anchor in the document
        const y = anchorRef.current.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 10);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 1. HERO HEADER (StaticBanner) */}
      <StaticBanner
        title={banner?.judul || "Berita"}
        desc={banner?.deskripsi || "Telusuri arsip publikasi, laporan kegiatan, pencapaian kinerja, serta siaran pers resmi liputan Kelurahan Wergu Wetan."}
        imageURL={banner?.gambarURL || "/images/hero_office.png"}
        Icon={Newspaper}
      />

      {/* Anchor for scrolling to tabs */}
      <div ref={anchorRef} className="w-full h-0" />

      {/* 2. STICKY SUB-NAVBAR (Gaya Sinkron dengan Profil & Beranda) */}
      <div
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
                    ? "border-brand-base bg-blue-50/50 text-brand-base rounded-t-lg"
                    : "border-transparent text-text-muted hover:bg-slate-100 hover:text-brand-base hover:border-blue-400 rounded-t-lg"
                } `}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. NEWS LIST (MATCHING POTENSI DESA LAYOUT) */}
      <div className="relative z-30 container mx-auto px-6 pt-12 pb-20 max-w-[1200px]">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-slate-100 shadow-sm">
                <FileText className="text-text-muted" size={40} />
              </div>
              <h2 className="mb-4 text-2xl font-black text-text-dark">
                Belum Ada Publikasi
              </h2>
              <p className="mx-auto max-w-lg text-[15px] leading-relaxed text-text-muted">
                Modul publikasi untuk kategori "{activeTag}" saat ini belum memiliki konten. Periksa kembali secara berkala.
              </p>
            </div>
          ) : (
            <motion.div
              key={activeTag}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              {/* FEATURED SECTIONS: Only show if category is "Semua" */}
              {activeTag === "Semua" && (
                <>
                  {/* MEGA FEATURED CARD (1st item) */}
                  {filtered.length > 0 && (
                    <Link
                      href={`/berita/${filtered[0].slug}`}
                      className="group mb-2 flex flex-col md:flex-row shadow-sm"
                    >
                      <div className="relative h-[280px] w-full shrink-0 overflow-hidden md:h-[340px] md:w-1/2">
                        <img
                          src={filtered[0].gambar || "/images/hero_office.png"}
                          alt={filtered[0].judul}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => { e.currentTarget.src = "/images/hero_office.png" }}
                        />
                      </div>
                      <div className="flex flex-col justify-center bg-brand-base p-6 md:w-1/2 md:p-14">
                        <h3 className="mb-auto text-[28px] leading-snug font-bold text-white md:text-[34px]">
                          {filtered[0].judul}
                        </h3>
                        <div className="mt-8 text-[15px] font-medium text-blue-100">
                          {new Date(filtered[0].tanggal || Date.now()).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </Link>
                  )}

                  {/* 3 TEXT-ONLY SUB-FEATURED CARDS (2nd to 4th items) */}
                  {filtered.length > 1 && (
                    <div className="mb-4 bg-slate-100">
                      <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-slate-200/60">
                        {filtered.slice(1, 4).map((item: any) => (
                          <Link
                            key={`featured-sub-${item.id}`}
                            href={`/berita/${item.slug}`}
                            className="group relative flex flex-col p-5 md:p-8 transition-all duration-300 bg-slate-100 hover:z-10 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl"
                          >
                            <div className="flex items-start">
                              <div className="mr-3 mt-[7px] h-2 w-2 shrink-0 bg-brand-base"></div>
                              <h3 className="text-[17px] font-medium leading-[1.4] text-text-dark transition-colors duration-300 group-hover:text-brand-dark">
                                {item.judul}
                              </h3>
                            </div>
                            <div className="mt-4 pl-5 text-[14px] text-text-muted">
                              {new Date(item.tanggal || Date.now()).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* "MORE" BUTTON */}
                  {filtered.length > 4 && (
                    <div className="mb-6 flex w-full justify-center bg-brand-base py-[14px] transition-colors hover:bg-blue-800">
                      <Link href="#" className="flex items-center gap-2 text-[16px] font-medium text-white">
                        More <ChevronRight size={18} className="rounded-full bg-white text-brand-base" />
                      </Link>
                    </div>
                  )}
                </>
              )}

              {/* DENSE TEXT LIST */}
              {((activeTag === "Semua" && filtered.length > 4) || (activeTag !== "Semua" && filtered.length > 0)) && (
                <div className="mb-10 flex flex-col">
                  {(activeTag === "Semua" ? filtered.slice(4) : filtered).map((item: any) => (
                    <Link
                      key={`list-${item.id}`}
                      href={`/berita/${item.slug}`}
                      className="group flex flex-col border-b border-slate-300 py-[18px] transition-colors hover:bg-slate-50 md:flex-row md:items-center md:justify-between px-2"
                    >
                      <h4 className="text-[16px] font-normal text-text-dark transition-colors duration-300 group-hover:text-brand-base md:w-[80%]">
                        {item.judul}
                      </h4>
                      <div className="mt-2 shrink-0 text-[13.5px] text-text-muted md:mt-0 md:text-right">
                        {new Date(item.tanggal || Date.now()).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Boxed Pagination */}
              {filtered.length > 0 && (
                <div className="mt-14 mb-10 flex flex-wrap items-center justify-center gap-2">
                  <button className="flex h-[42px] w-[42px] items-center justify-center bg-brand-base text-[15px] text-white transition-colors">
                    1
                  </button>
                  {[2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      className="flex h-[42px] w-[42px] items-center justify-center border border-slate-200 bg-white text-[15px] text-text-muted transition-all duration-300 hover:-translate-y-1 hover:border-brand-base hover:bg-brand-base/90 hover:text-white hover:shadow-md"
                    >
                      {num}
                    </button>
                  ))}
                  <button className="flex h-[42px] items-center justify-center border border-slate-200 bg-white px-5 text-[15px] text-text-muted transition-all duration-300 hover:-translate-y-1 hover:border-brand-base hover:bg-brand-base/90 hover:text-white hover:shadow-md">
                    Next
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
