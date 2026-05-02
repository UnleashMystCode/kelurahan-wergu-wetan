"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Search,
} from "lucide-react";

import Link from "next/link";

const categories = [
  "Semua",
  "Ekonomi & UMKM",
  "Sosial & Organisasi",
  "Ikonik & Fasilitas",
  "Keagamaan",
];

export default function PotensiDesaView({ banner, potensiItems = [] }: { banner?: any, potensiItems?: any[] }) {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const HEADER_OFFSET = 120; // Topbar 40px + Navbar 80px
  const SUBMENU_HEIGHT = 60;

  const filteredData = potensiItems.filter((item) => {
    return activeCategory === "Semua" || item.kategori === activeCategory;
  });

  const anchorRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
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
      {/* 1. HERO HEADER (Disesuaikan dengan TentangKamiView & HomeView) */}
      <div className="relative mt-[-100px] flex w-full flex-col items-center justify-center overflow-hidden bg-slate-900 px-4 pt-[220px] pb-[60px] text-center md:pt-[240px] md:pb-[80px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${banner?.gambarURL || "/images/hero_neighborhood.png"}')` }}
        />
        {/* Konten Teks */}
        <div className="relative z-20 mx-auto max-w-4xl">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl"
            >
              {banner?.judul || "Potensi Kelurahan"}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mx-auto max-w-2xl text-lg leading-relaxed text-blue-50 opacity-90 drop-shadow-md md:text-xl"
            >
              {banner?.deskripsi ||
                "Eksplorasi keberagaman aset, potensi unggulan UMKM, wisata ikonik, hingga dinamika sosial masyarakat Wergu Wetan."}
            </motion.p>
          </div>
      </div>

      {/* Anchor for scrolling to tabs */}
      <div ref={anchorRef} className="w-full h-0" />

      {/* 2. STICKY SUB-NAVBAR (Sinkron dengan BeritaView) */}
      <div
        className="sticky z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md transition-all duration-300"
        style={{ top: `${HEADER_OFFSET}px`, height: `${SUBMENU_HEIGHT}px` }}
      >
        <div className="container mx-auto h-full px-4">
          <div className="no-scrollbar flex h-full items-center justify-start gap-1 overflow-x-auto md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`group relative flex h-full items-center gap-2 border-b-[3px] px-6 text-[13px] font-bold whitespace-nowrap transition-all md:text-sm ${
                  activeCategory === cat
                    ? "border-blue-600 bg-blue-50/50 text-blue-600 rounded-t-lg"
                    : "border-transparent text-slate-500 hover:bg-slate-100 hover:text-blue-600 hover:border-blue-400 rounded-t-lg"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-30 container mx-auto px-6 pt-12 pb-20 max-w-[1200px]">
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <Search size={48} className="mb-4 text-slate-300" />
            <h3 className="text-xl font-bold text-slate-700">Tidak ada potensi ditemukan</h3>
            <p className="mt-2 text-slate-500">
              Coba gunakan kata kunci atau kategori yang berbeda.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* FEATURED / HOT TOPIC ARTICLE */}
            {filteredData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group mb-10"
              >
                <Link
                  href={`/potensi-desa/${filteredData[0].slug}`}
                  className="flex flex-col bg-[#f0f4f8] md:flex-row group"
                >
                  <div className="relative h-[280px] w-full shrink-0 overflow-hidden md:h-[340px] md:w-[52%]">
                    <img
                      src={filteredData[0].gambar || "/images/hero_office.png"}
                      alt={filteredData[0].judul}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.currentTarget.src = "/images/hero_office.png" }}
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 md:w-[48%] md:p-14">
                    <h3 className="mb-5 text-[26px] leading-[1.3] font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-700 md:text-[32px]">
                      {filteredData[0].judul}
                    </h3>
                    <div className="mt-auto text-[14px] font-medium tracking-wide text-slate-400">
                      {new Date(filteredData[0].createdAt || Date.now()).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* REGULAR LIST */}
            {filteredData.slice(1).map((item, i) => (
              <motion.div
                key={`${activeCategory}-${item.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group border-b border-slate-300 py-8 first:pt-0 last:border-0"
              >
                <Link
                  href={`/potensi-desa/${item.slug}`}
                  className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8 group transition-transform duration-300 hover:translate-x-4"
                >
                  {/* Thumbnail Kiri */}
                  <div className="relative h-[240px] w-full shrink-0 bg-slate-100 md:h-[220px] md:w-[360px]">
                    <img
                      src={item.gambar || "/images/hero_office.png"}
                      alt={item.judul}
                      className="h-full w-full object-cover"
                      onError={(e) => { e.currentTarget.src = "/images/hero_office.png" }}
                    />
                  </div>

                  {/* Konten Kanan */}
                  <div className="flex flex-col justify-start md:pt-1">
                    <h4 className="mb-3 text-[22px] leading-[1.3] font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-700 md:text-[26px]">
                      {item.judul}
                    </h4>
                    <p className="mb-4 line-clamp-3 text-[16px] leading-[1.6] text-slate-500">
                      {item.deskripsiSingkat || "Deskripsi singkat mengenai potensi desa ini belum tersedia."}
                    </p>
                    
                    <div className="mt-2 text-[14px] font-medium tracking-wide text-slate-400">
                      {new Date(item.createdAt || Date.now()).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Pagination / Show More */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
              <button className="flex h-[42px] w-[42px] items-center justify-center bg-[#1a56db] text-[15px] text-white transition-colors">
                1
              </button>
              {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  className="flex h-[42px] w-[42px] items-center justify-center border border-slate-200 bg-white text-[15px] text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:border-[#1a56db] hover:bg-[#1a56db]/90 hover:text-white hover:shadow-md"
                >
                  {num}
                </button>
              ))}
              <button className="flex h-[42px] items-center justify-center border border-slate-200 bg-white px-5 text-[15px] text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:border-[#1a56db] hover:bg-[#1a56db]/90 hover:text-white hover:shadow-md">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
