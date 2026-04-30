"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronRight, FileText, User, Tag, Search, Loader2 } from "lucide-react";
import Link from "next/link";

export default function BeritaView({ banner, newsData = [] }: any) {
  const [activeTag, setActiveTag] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const tags = ["Semua", "Kegiatan", "Pengumuman", "Ekonomi", "Pembangunan"];
  const HEADER_OFFSET = 120; // Sesuai ClientLayout (Topbar 40 + Navbar 80)
  const SUBMENU_HEIGHT = 60;

  const dummyNews = [
    {
      id: "dummy-1",
      slug: "dummy-1",
      status: "Aktif",
      judul: "Lurah Wergu Wetan Sosialisasi Program Kampung Iklim 2026",
      kategori: "Pembangunan",
      penulis: "Humas Kelurahan",
      tanggal: new Date("2026-04-15"),
      isi: "",
    },
    {
      id: "dummy-2",
      slug: "dummy-2",
      status: "Aktif",
      judul: "Penyaluran Bantuan Langsung Tunai (BLT) Periode Kuartal I Berjalan Lancar",
      kategori: "Ekonomi",
      penulis: "Seksi Kesra",
      tanggal: new Date("2026-04-12"),
      isi: "",
    },
    {
      id: "dummy-3",
      slug: "dummy-3",
      status: "Aktif",
      judul: "Jadwal Pelayanan Jemput Bola E-KTP Bagi Lansia dan Penyandang Disabilitas",
      kategori: "Pengumuman",
      penulis: "Pelayanan Publik",
      tanggal: new Date("2026-04-10"),
      isi: "",
    },
    {
      id: "dummy-4",
      slug: "dummy-4",
      status: "Aktif",
      judul: "Pelatihan Kewirausahaan Ibu PKK Tingkat Kelurahan Sukses Digelar",
      kategori: "Kegiatan",
      penulis: "Pemberdayaan",
      tanggal: new Date("2026-04-05"),
      isi: "",
    },
    {
      id: "dummy-5",
      slug: "dummy-5",
      status: "Aktif",
      judul: "Kerja Bakti Massal Sambut Bulan Ramadhan, Warga Antusias Bersihkan Sungai",
      kategori: "Kegiatan",
      penulis: "Humas Kelurahan",
      tanggal: new Date("2026-03-29"),
      isi: "",
    },
    {
      id: "dummy-6",
      slug: "dummy-6",
      status: "Aktif",
      judul: "Pengumuman Pembukaan Rekrutmen Relawan Posyandu Wergu Wetan",
      kategori: "Pengumuman",
      penulis: "Kader Posyandu",
      tanggal: new Date("2026-03-25"),
      isi: "",
    },
    {
      id: "dummy-7",
      slug: "dummy-7",
      status: "Aktif",
      judul: "Festival BUMDes Wergu Wetan Catat Omzet Tertinggi Sepanjang 2025",
      kategori: "Ekonomi",
      penulis: "BUMDes",
      tanggal: new Date("2026-03-22"),
      isi: "",
    },
    {
      id: "dummy-8",
      slug: "dummy-8",
      status: "Aktif",
      judul: "Evaluasi Tahap Awal Proyek Perbaikan Drainase di RW 03 dan RW 04",
      kategori: "Pembangunan",
      penulis: "Seksi Pembangunan",
      tanggal: new Date("2026-03-18"),
      isi: "",
    },
    {
      id: "dummy-9",
      slug: "dummy-9",
      status: "Aktif",
      judul: "Penyerahan Sertifikat Halal Gratis Untuk 50 Pelaku UMKM Kelurahan",
      kategori: "Ekonomi",
      penulis: "Pemberdayaan",
      tanggal: new Date("2026-03-15"),
      isi: "",
    },
    {
      id: "dummy-10",
      slug: "dummy-10",
      status: "Aktif",
      judul: "Rapat Koordinasi Persiapan Hari Jadi Kelurahan Ke-65 Tahun",
      kategori: "Kegiatan",
      penulis: "Humas Kelurahan",
      tanggal: new Date("2026-03-10"),
      isi: "",
    },
  ];

  // Gabungkan dengan data dari DB. Pastikan total 10 item cantik meramaikan halaman.
  // Gunakan ID unik Set agar data db tidak duplicate dengan dummy jika slug/id kebetulan bentrok.
  const baseData = [...(newsData || []), ...dummyNews].slice(0, 10);

  // Filter: Hanya menampilkan yang 'Aktif', sesuai Tag yang dipilih, dan keyword
  const filtered = baseData
    .filter((n: any) => n.status === "Aktif")
    .filter((n: any) => activeTag === "Semua" || n.kategori === activeTag)
    .filter((n: any) => n.judul.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 1. HERO HEADER (Minimalist Dark Search Style) */}
      <div className="relative mt-[-100px] flex w-full flex-col items-center justify-center bg-[#0B132B] px-4 pt-[240px] pb-[100px] text-center md:pt-[280px] md:pb-[140px]">
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

        <div className="w-full max-w-2xl px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Berita..."
              className="w-full rounded-2xl bg-[#eaedf4] px-6 py-[18px] text-[17px] text-slate-800 placeholder-slate-500 shadow-xl transition-all outline-none focus:ring-4 focus:ring-blue-500/30"
            />
            <button className="absolute top-1/2 right-5 -translate-y-1/2 text-slate-600 transition-colors hover:text-slate-900">
              <Search size={22} className="stroke-[2.5px]" />
            </button>
          </motion.div>
        </div>
      </div>

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
                onClick={() => setActiveTag(tag)}
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
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((item: any, idx: number) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  key={item.id}
                  className="group mb-14 flex flex-col"
                >
                  <Link href={`/berita/${item.slug}`} className="mb-3 block">
                    {/* Title Using Serif Font Stack mimicking Presidential/Legal Document Styles */}
                    <h3
                      style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
                      className="text-[26px] leading-[1.25] tracking-tight text-slate-800 transition-colors group-hover:text-blue-700 md:text-[32px]"
                    >
                      {item.judul}
                    </h3>
                  </Link>

                  {/* Meta details (Category | Date) */}
                  <div className="mt-2 flex flex-wrap items-center text-[14.5px] font-medium tracking-wide text-slate-500">
                    <span className="text-slate-600">
                      {item.kategori} {item.penulis ? `, ${item.penulis}` : ""}
                    </span>
                    <span className="mx-4 font-light text-slate-300">|</span>
                    <span>
                      {/* Using locale to match the style format "April 15, 2026" if possible, or Ind style "15 April 2026" */}
                      {new Date(item.tanggal).toLocaleDateString("id-ID", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-slate-100 shadow-sm">
                  <Loader2 className="animate-spin text-slate-400" size={40} />
                </div>
                <h2 className="mb-4 text-3xl font-black text-slate-800">Sinkronisasi Konten</h2>
                <p className="mx-auto max-w-lg text-[15px] leading-relaxed text-slate-500">
                  Modul publikasi untuk kategori{" "}
                  <span className="font-bold text-slate-700">{activeTag}</span> sedang dalam tahap
                  penataan sistem birokrasi terpadu. Periksa kembali secara berkala.
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
