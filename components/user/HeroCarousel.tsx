"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, FileText, Phone, User, ArrowRight } from "lucide-react";
import Link from "next/link";

type Banner = {
  id: number;
  gambarURL: string;
  judul: string | null;
  deskripsi: string | null;
  tagline?: string | null;
};

type HeroCarouselProps = {
  banners?: Banner[];
  showButtons?: boolean;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  secondaryBtnIcon?: "user" | "phone";
};

export default function HeroCarousel({
  banners = [],
  showButtons = true,
  secondaryBtnText = "Hubungi Kami",
  secondaryBtnLink = "/kontak",
  secondaryBtnIcon = "phone"
}: HeroCarouselProps) {

  const [index, setIndex] = useState(0);

  // Fallback default banner jika DB kosong (misalnya pasca-reset)
  const DEFAULT_BANNERS: Banner[] = [
    {
      id: 0,
      gambarURL: "/images/hero_office.png",
      tagline: "Pelayanan Prima",
      judul: "Selamat Datang di Kelurahan Wergu Wetan",
      deskripsi: "Kami siap memberikan pelayanan terbaik untuk masyarakat Wergu Wetan, Kota Kudus, Jawa Tengah.",
    },
    {
      id: -1,
      gambarURL: "/images/hero_digital.png",
      tagline: "Layanan Digital",
      judul: "Pengajuan Surat Kini Lebih Mudah",
      deskripsi: "Ajukan surat keterangan, domisili, dan berbagai layanan administrasi secara online, kapan saja.",
    },
    {
      id: -2,
      gambarURL: "/images/hero_community.png",
      tagline: "Transparansi Desa",
      judul: "Pusat Informasi & Kegiatan Warga",
      deskripsi: "Ikuti terus perkembangan, agenda terkini, serta transparansi pembangunan di lingkungan kelurahan.",
    },
    {
      id: -3,
      gambarURL: "/images/hero_neighborhood.png",
      tagline: "Aspirasi Masyarakat",
      judul: "Suara Anda Membangun Desa",
      deskripsi: "Sampaikan kritik, saran, maupun aspirasi Anda secara konstruktif demi kemajuan wilayah kita bersama.",
    },
  ];

  const activeBanners = (banners && banners.length > 0) ? banners : DEFAULT_BANNERS;

  useEffect(() => {
    if (!activeBanners || activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % activeBanners.length);
    }, 12000); // Diperlambat ke 12 detik
    return () => clearInterval(interval);
  }, [banners]); // Tetap pantau 'banners' dari luar

  const nextSlide = () => setIndex((prev) => (prev + 1) % activeBanners.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);

  const currentBanner = activeBanners[index] || activeBanners[0];

  return (
    // Memakai calc(100vh+100px) untuk menutupi margin-top negatif (-100px) dari navbar transparan
    // sehingga slider benar-benar fix mentok di dasar layar tanpa ada kebocoran submenu di bawahnya.
    <div className="relative h-[calc(100vh+100px)] min-h-[700px] w-full overflow-hidden bg-slate-900 group">

      {/* 1. GAMBAR BACKGROUND */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-none"
            style={{ backgroundImage: `url(${currentBanner.gambarURL})` }}
          />
          <div className="absolute inset-0 bg-black/50 md:bg-black/40 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* 2. KONTEN TEKS */}
      <div className="absolute inset-0 flex items-center justify-start text-left z-20 pt-[80px] pointer-events-none">
        <div className="container mx-auto px-4 md:px-6 pointer-events-auto">
          <div className="max-w-3xl">
            {/* Tagline */}
            {currentBanner.tagline && (
              <motion.span
                key={`tag-${index}`}
                initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                className="inline-block py-1.5 px-5 rounded-full bg-blue-600/90 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md shadow-lg border border-white/10"
              >
                {currentBanner.tagline}
              </motion.span>
            )}

            {/* Judul (Diperkecil sesuai referensi gambar) */}
            <motion.h1
              key={`title-${index}`}
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight drop-shadow-lg tracking-tight"
            >
              {currentBanner.judul || "Selamat Datang"}
            </motion.h1>

            {/* Deskripsi */}
            <motion.p
              key={`desc-${index}`}
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="text-base md:text-lg text-slate-200 max-w-2xl leading-relaxed drop-shadow-md mb-8"
            >
              {currentBanner.deskripsi}
            </motion.p>

            {/* --- TOMBOL --- */}
            {showButtons && (
              <motion.div
                key={`btns-${index}`}
                initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/layanan"
                  className="group bg-transparent hover:bg-white text-white hover:text-slate-900 border border-white font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2 w-fit text-sm"
                >
                  Selengkapnya <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* 3. NAVIGASI (GARIS & JUDUL) */}
      {activeBanners.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-12 pb-6 z-30 pointer-events-none">
          <div className="container mx-auto px-4 md:px-6 pointer-events-auto">
            <div className="flex w-full gap-4 md:gap-8">
              {activeBanners.map((banner, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="flex-1 flex flex-col items-start gap-3 group"
                >
                  <div className="flex items-center gap-2.5 w-full">
                    {/* Buletan biasa (clean look) */}
                    <div className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300 ${i === index ? 'bg-blue-600 scale-110' : 'bg-transparent border border-white/30 group-hover:bg-white/20'}`} />
                    {/* Judul Slide */}
                    <span className={`text-[10px] md:text-sm font-semibold transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis ${i === index ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                      {banner.tagline || banner.judul || `Slide ${i + 1}`}
                    </span>
                  </div>
                  {/* Garis progress (Warna disesuaikan ke blue-600) */}
                  <div className="w-full h-[3px] bg-white/20 rounded-full overflow-hidden relative">
                      {i === index && (
                         <motion.div 
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 12, ease: "linear" }}
                            className="absolute top-0 left-0 h-full bg-blue-600"
                         />
                      )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}