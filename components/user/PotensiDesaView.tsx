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

  const stickyRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    if (stickyRef.current) {
      const y = stickyRef.current.offsetTop - HEADER_OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 1. HERO HEADER (Disesuaikan dengan TentangKamiView & HomeView) */}
      <div className="relative mt-[-100px] h-[600px] w-full overflow-hidden bg-slate-900 md:h-[700px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${banner?.gambarURL || "/images/hero_neighborhood.png"}')` }}
        />
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Konten Teks (Visual Centering sama persis dengan TentangKamiView) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 pt-[100px] text-center">
          <div className="mx-auto max-w-4xl">
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
      </div>

      {/* 2. STICKY SUB-NAVBAR (Seragam dengan page lainnya) */}
      <div
        ref={stickyRef}
        className={`sticky z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md transition-all duration-300`}
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

      {/* 3. MASONRY / BENTO GRID KONTEN (Tanpa Flickering / Layout Bugs) */}
      <div className="container mx-auto mt-12 mb-20 min-h-[800px] max-w-6xl px-4">
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <Search size={48} className="mb-4 text-slate-300" />
            <h3 className="text-xl font-bold text-slate-700">Tidak ada potensi ditemukan</h3>
            <p className="mt-2 text-slate-500">
              Coba gunakan kata kunci atau kategori yang berbeda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredData.map((item, i) => (
              <motion.div
                key={`${activeCategory}-${item.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  href={`/potensi-desa/${item.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl bg-white transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                >
                  <div className="relative h-[240px] w-full overflow-hidden">
                    <img
                      src={item.gambar || "/images/hero_office.png"}
                      alt={item.judul}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    {/* Very subtle overlay to make the image slightly deeper on hover */}
                    <div className="absolute inset-0 bg-slate-900/0 transition-colors duration-500 group-hover:bg-slate-900/5" />

                    {/* Minimalist Dark Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-slate-900/60 px-3 py-1.5 text-[10px] font-semibold tracking-widest text-white backdrop-blur-md">
                        {item.kategori}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                    <div>
                      <h4 className="mb-3 text-xl leading-snug font-bold text-slate-800 transition-colors duration-300 group-hover:text-blue-600">
                        {item.judul}
                      </h4>
                      <p className="mb-6 line-clamp-3 text-[14px] leading-relaxed text-slate-500">
                        {item.deskripsiSingkat}
                      </p>
                    </div>

                    {/* Minimalist Link Action */}
                    <div className="mt-auto flex items-center text-[13px] font-bold text-slate-400 transition-colors duration-300 group-hover:text-blue-600">
                      Baca Selengkapnya
                      <ChevronRight
                        size={16}
                        className="ml-1 transition-transform duration-300 ease-out group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
