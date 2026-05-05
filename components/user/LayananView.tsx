"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  CheckCircle,
  Loader2,
  FileText,
  CreditCard,
  Users,
  Baby,
  Heart,
  FileCheck,
  Truck,
  Home,
  ClipboardList,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import StaticBanner from "./StaticBanner";
import type { BannerHomepage } from "@prisma/client";

export default function LayananView({ banner }: { banner?: BannerHomepage | null }) {
  const { t } = useLanguage();
  const [layananCategory, setLayananCategory] = useState("umum");

  const categories = [
    { id: "umum", name: "Umum" },
    { id: "sertifikasi", name: "Sertifikasi" },
    { id: "pemerintahan", name: "Pemerintahan" },
    { id: "perizinan", name: "Perizinan" },
    { id: "sdm", name: "Pengembangan SDM" },
  ];

  const listLayanan = [
    { id: "ktp", name: "KTP", icon: CreditCard },
    { id: "kk", name: "Kartu Keluarga", icon: Users },
    { id: "akta-lahir", name: "Akta Kelahiran", icon: Baby },
    { id: "akta-mati", name: "Akta Kematian", icon: Heart },
    { id: "nikah", name: "Pengantar Nikah", icon: Heart },
    { id: "skck", name: "SKCK", icon: FileCheck },
    { id: "pindah", name: "Pindah Datang", icon: Truck },
    { id: "pbb", name: "PBB", icon: Home },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 1. HERO HEADER (StaticBanner) */}
      <StaticBanner
        title={banner?.judul || "Layanan Warga"}
        desc={banner?.deskripsi || "Layanan Cepat & Mudah untuk Warga Wergu Wetan"}
        imageURL={banner?.gambarURL || "/images/hero_office.png"}
        Icon={FileText}
      />

      {/* 2. STICKY SUB-NAVBAR (KATEGORI UTAMA) */}
      <div className="sticky top-[120px] z-40 h-[60px] border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="container mx-auto h-full px-4">
          <div className="no-scrollbar flex h-full items-center justify-start gap-1 overflow-x-auto md:justify-center">
            {categories.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setLayananCategory(item.id);
                  setTimeout(() => {
                    const el = document.getElementById("layanan-grid") || document.getElementById("layanan-fallback");
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 200;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }, 100);
                }}
                className={`relative flex h-full items-center gap-2 border-b-[3px] px-6 text-[13px] font-bold whitespace-nowrap transition-all outline-none lg:text-sm ${
                  layananCategory === item.id
                    ? "border-brand-base bg-blue-50/50 text-brand-base rounded-t-lg"
                    : "border-transparent text-text-muted hover:bg-slate-100 hover:text-brand-base hover:border-blue-400 rounded-t-lg"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. GRID UTAMA */}
      {layananCategory === "umum" ? (
        <div id="layanan-grid" className="container mx-auto mt-8 lg:mt-16 grid grid-cols-1 items-start gap-6 lg:gap-10 px-4 scroll-mt-[180px] lg:grid-cols-12">
          {/* KOLOM KIRI: CARD TUTORIAL (UKURAN 720PX BIAR PAS) */}
          <div className="space-y-6 lg:space-y-16 lg:col-span-8 lg:pb-[300px]">
            {listLayanan.map((layanan) => (
              <section
                id={layanan.id}
                key={layanan.id}
                // 👇 TINGGI DINAIKKAN KE 720PX UNTUK MENGHAPUS GAP BAWAH (HANYA DESKTOP)
                className="flex flex-col justify-center rounded-xl border border-slate-100 bg-white p-5 md:p-14 shadow-sm transition-all duration-300 scroll-mt-[200px] lg:min-h-[720px]"
              >
                <div className="flex flex-col gap-8 md:gap-12">
                  <div className="mb-2">
                    <p className="mb-3 text-[10px] font-bold tracking-widest text-brand-base uppercase">
                      LAYANAN ADMINISTRASI
                    </p>
                    <h2 className="text-2xl leading-tight font-extrabold text-text-dark md:text-4xl">
                      {layanan.name}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    <div className="space-y-6">
                      <h4 className="flex items-center gap-2 text-[11px] font-black tracking-[0.2em] text-text-muted uppercase">
                        <ClipboardList size={18} className="text-brand-base shrink-0" /> Persyaratan Dokumen
                      </h4>
                      <ul className="space-y-4">
                        {[
                          "Fotokopi Kartu Keluarga (Terbaru)",
                          "KTP Asli & Fotokopi 2 Lembar",
                          "Surat Pengantar RT & RW Setempat",
                        ].map((req, i) => (
                          <li
                            key={i}
                            className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 md:p-5 text-xs md:text-sm leading-relaxed font-bold text-text-dark"
                          >
                            <CheckCircle size={22} className="shrink-0 text-emerald-500" /> {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6">
                      <h4 className="flex items-center gap-2 text-[11px] font-black tracking-[0.2em] text-text-muted uppercase">
                        <Clock size={18} className="text-brand-base shrink-0" /> Prosedur Pelayanan
                      </h4>
                      <div className="space-y-5">
                        {[
                          "Bawa berkas persyaratan ke Balai Desa",
                          "Verifikasi dokumen oleh petugas pelayanan",
                          "Entri data & validasi sistem kelurahan",
                          "Pengambilan dokumen yang sudah jadi",
                        ].map((step, i) => (
                          <div key={i} className="flex items-center gap-5">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 font-black text-brand-base shadow-sm">
                              {i + 1}
                            </div>
                            <p className="text-sm leading-snug font-bold text-text-dark">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* KOLOM KANAN: TUTORIAL & INFORMASI (STICKY) */}
          <div className="sticky top-[200px] lg:col-span-4 self-start max-h-none overflow-visible lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto no-scrollbar rounded-xl pb-2">
            {/* QUICK NAVIGATION / DAFTAR LAYANAN */}
            <div className="mb-6 rounded-xl border border-slate-100 bg-white p-5 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
              <h3 className="mb-5 flex items-center gap-2 text-[12px] font-black tracking-[0.15em] text-text-dark uppercase">
                <FileText size={16} className="text-brand-base shrink-0" /> Indeks Layanan
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {listLayanan.map((layanan) => (
                  <button
                    key={`nav-${layanan.id}`}
                    onClick={() => {
                      const el = document.getElementById(layanan.id);
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 200;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      }
                    }}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-brand-base transition-all hover:scale-105 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
                  >
                    {layanan.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col rounded-xl border border-slate-100 bg-white p-5 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.12)]">
              <div className="mb-10">
                <h3 className="mb-3 flex items-center gap-3 text-2xl font-black text-text-dark">
                  <FileText size={28} className="text-brand-base shrink-0" /> Pusat Informasi
                </h3>
                <p className="text-sm leading-relaxed font-medium text-text-muted">
                  Panduan tata cara pengajuan dokumen secara luring dan daring, serta jadwal
                  kegiatan pelayanan terpadu desa.
                </p>
              </div>

              {/* Tata Cara Pengajuan */}
              <div className="flex-1 space-y-6">
                {/* Card 1 */}
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 md:p-6">
                  <h4 className="mb-5 flex items-center gap-2 font-black text-text-dark">
                    <Clock size={18} className="text-brand-base shrink-0" /> Alur Pengajuan
                  </h4>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-100/80 text-xs font-bold text-brand-base">
                        1
                      </div>
                      <span className="text-[13px] leading-relaxed font-bold text-text-muted">
                        Siapkan semua berkas yang diminta, lalu foto atau scan dengan jelas dan rapi.
                      </span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-100/80 text-xs font-bold text-brand-base">
                        2
                      </div>
                      <span className="text-[13px] leading-relaxed font-bold text-text-muted">
                        Kirimkan berkas tersebut via WhatsApp resmi kelurahan agar petugas kami bisa mengeceknya.
                      </span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-100/80 text-xs font-bold text-brand-base">
                        3
                      </div>
                      <span className="text-[13px] leading-relaxed font-bold text-text-muted">
                        Tinggal duduk manis! Jika berkas sudah pas, dokumenmu siap dalam maksimal 2x24 jam.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Card 2 Agenda Mendatang */}
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 md:p-6">
                  <h4 className="mb-5 flex items-center gap-2 font-black text-text-dark">
                    <Clock size={18} className="text-emerald-600 shrink-0" /> Agenda Mendatang
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 rounded-xl border border-emerald-100/50 bg-white p-4 shadow-sm">
                      <div className="min-w-[60px] shrink-0 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-center text-emerald-600">
                        <p className="text-[10px] font-black uppercase">Agt</p>
                        <p className="text-xl font-black">24</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-dark">Perekaman e-KTP Keliling</p>
                        <p className="mt-1 text-xs font-medium text-text-muted">
                          Balai Desa RW 03 (08:00 WIB)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-xl border border-emerald-100/50 bg-white p-4 shadow-sm">
                      <div className="min-w-[60px] shrink-0 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-center text-emerald-600">
                        <p className="text-[10px] font-black uppercase">Sep</p>
                        <p className="text-xl font-black">02</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-dark">Bazar Sembako & Posyandu</p>
                        <p className="mt-1 text-xs font-medium text-text-muted">
                          Halaman Pustu (07:00 WIB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tombol Aksi Langsung */}
              <div className="mt-8 border-t border-slate-100 pt-8 text-center">
                <p className="mb-4 text-xs font-black tracking-widest text-text-muted uppercase">
                  Butuh Bantuan Langsung?
                </p>
                <a
                  href="#"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-text-dark px-8 py-5 font-bold text-white shadow-lg shadow-slate-200 transition-colors hover:bg-text-dark"
                >
                  Hubungi Staf Pelayanan
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="layanan-fallback" className="container mx-auto mt-16 mb-20 flex flex-col items-center justify-center px-4 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-slate-100 shadow-sm">
            <Loader2 className="animate-spin text-text-muted" size={40} />
          </div>
          <h2 className="mb-4 text-3xl font-black text-text-dark">Sinkronisasi Layanan</h2>
          <p className="mx-auto max-w-lg text-[15px] leading-relaxed text-text-muted">
            Modul pelayanan dari kategori{" "}
            <span className="font-bold text-text-dark">
              {categories.find((c) => c.id === layananCategory)?.name}
            </span>{" "}
            masih dalam proses penataan sistem. Silakan mampir lagi nanti, kami sedang menyiapkannya khusus buat kamu!
          </p>
        </div>
      )}
    </div>
  );
}
