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
  secondaryBtnIcon = "phone",
}: HeroCarouselProps) {
  const [index, setIndex] = useState(0);

  // Fallback default banner jika DB kosong (misalnya pasca-reset)
  const DEFAULT_BANNERS: Banner[] = [
    {
      id: 0,
      gambarURL: "/images/hero_office.png",
      tagline: "Pelayanan Prima",
      judul: "Selamat Datang di Kelurahan Wergu Wetan",
      deskripsi:
        "Kami siap memberikan pelayanan terbaik untuk masyarakat Wergu Wetan, Kota Kudus, Jawa Tengah.",
    },
    {
      id: -1,
      gambarURL: "/images/hero_digital.png",
      tagline: "Layanan Digital",
      judul: "Pengajuan Surat Kini Lebih Mudah",
      deskripsi:
        "Ajukan surat keterangan, domisili, dan berbagai layanan administrasi secara online, kapan saja.",
    },
    {
      id: -2,
      gambarURL: "/images/hero_community.png",
      tagline: "Transparansi Desa",
      judul: "Pusat Informasi & Kegiatan Warga",
      deskripsi:
        "Ikuti terus perkembangan, agenda terkini, serta transparansi pembangunan di lingkungan kelurahan.",
    },
    {
      id: -3,
      gambarURL: "/images/hero_neighborhood.png",
      tagline: "Aspirasi Masyarakat",
      judul: "Suara Anda Membangun Desa",
      deskripsi:
        "Sampaikan kritik, saran, maupun aspirasi Anda secara konstruktif demi kemajuan wilayah kita bersama.",
    },
  ];

  const activeBanners = banners && banners.length > 0 ? banners : DEFAULT_BANNERS;

  useEffect(() => {
    if (!activeBanners || activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % activeBanners.length);
    }, 12000); // Diperlambat ke 12 detik
    return () => clearInterval(interval);
  }, [banners]); // Tetap pantau 'banners' dari luar

  const nextSlide = () => setIndex((prev) => (prev + 1) % activeBanners.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);

  const currentBanner = activeBanners[index] || activeBanners[0];

  return (
    // Memakai calc(100vh+100px) untuk menutupi margin-top negatif (-100px) dari navbar transparan
    // sehingga slider benar-benar fix mentok di dasar layar tanpa ada kebocoran submenu di bawahnya.
    <div className="group relative h-[calc(100vh+100px)] min-h-[700px] w-full overflow-hidden bg-slate-900">
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
          <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/90 via-transparent to-black/30 md:bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* 2. KONTEN TEKS */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-start pt-[80px] text-left">
        <div className="pointer-events-auto container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            {/* Tagline */}
            {currentBanner.tagline && (
              <motion.span
                key={`tag-${index}`}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="mb-4 inline-block rounded-full border border-white/10 bg-blue-600/90 px-5 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase shadow-lg backdrop-blur-md md:text-xs"
              >
                {currentBanner.tagline}
              </motion.span>
            )}

            {/* Judul (Diperkecil sesuai referensi gambar) */}
            <motion.h1
              key={`title-${index}`}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mb-5 text-3xl leading-tight font-bold tracking-tight text-white drop-shadow-lg md:text-4xl lg:text-5xl"
            >
              {currentBanner.judul || "Selamat Datang"}
            </motion.h1>

            {/* Deskripsi */}
            <motion.p
              key={`desc-${index}`}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="mb-8 max-w-2xl text-base leading-relaxed text-slate-200 drop-shadow-md md:text-lg"
            >
              {currentBanner.deskripsi}
            </motion.p>

            {/* --- TOMBOL --- */}
            {showButtons && (
              <motion.div
                key={`btns-${index}`}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <Link
                  href="/layanan"
                  className="group flex w-fit items-center gap-2 rounded-full border border-white bg-transparent px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white hover:text-slate-900"
                >
                  Selengkapnya{" "}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* 3. NAVIGASI (GARIS & JUDUL) */}
      {activeBanners.length > 1 && (
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-30 bg-gradient-to-t from-black/80 to-transparent pt-12 pb-6">
          <div className="pointer-events-auto container mx-auto px-4 md:px-6">
            <div className="flex w-full gap-4 md:gap-8">
              {activeBanners.map((banner, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="group flex flex-1 flex-col items-start gap-3"
                >
                  <div className="flex w-full items-center gap-2.5">
                    {/* Buletan biasa (clean look) */}
                    <div
                      className={`h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300 ${i === index ? "scale-110 bg-blue-600" : "border border-white/30 bg-transparent group-hover:bg-white/20"}`}
                    />
                    {/* Judul Slide */}
                    <span
                      className={`overflow-hidden text-[10px] font-semibold text-ellipsis whitespace-nowrap transition-all duration-300 md:text-sm ${i === index ? "text-white" : "text-white/40 group-hover:text-white/70"}`}
                    >
                      {banner.tagline || banner.judul || `Slide ${i + 1}`}
                    </span>
                  </div>
                  {/* Garis progress (Warna disesuaikan ke blue-600) */}
                  <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/20">
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
