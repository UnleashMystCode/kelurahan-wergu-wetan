"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
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

export default function LayananView({ banner }: any) {
  const { t } = useLanguage();
  const [layananCategory, setLayananCategory] = useState("umum");

  const categories = [
    { id: "sertifikasi", name: "Sertifikasi" },
    { id: "pemerintahan", name: "Pemerintahan" },
    { id: "perizinan", name: "Perizinan" },
    { id: "sdm", name: "Pengembangan SDM" },
    { id: "umum", name: "Umum" },
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
      {/* 1. HERO HEADER (Minimalist Dark Style) */}
      <div className="relative mt-[-100px] flex w-full flex-col items-center justify-center bg-[#0B132B] px-4 pt-[200px] pb-[100px] text-center md:pt-[240px] md:pb-[140px]">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
          className="mb-6 text-6xl leading-none tracking-tight text-white md:text-[80px]"
        >
          Layanan
        </motion.h1>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-2xl"
        >
          <p className="text-lg font-medium tracking-wide text-slate-300 md:text-xl">
            Panduan lengkap & administrasi digital Kelurahan Wergu Wetan.
          </p>
        </motion.div>
      </div>

      {/* 2. STICKY SUB-NAVBAR (KATEGORI UTAMA) */}
      <div className="sticky top-[120px] z-40 h-[60px] border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="container mx-auto h-full px-4">
          <div className="no-scrollbar flex h-full items-center justify-start gap-1 overflow-x-auto md:justify-center">
            {categories.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setLayananCategory(item.id);
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
                className={`relative flex h-full items-center gap-2 border-b-[3px] px-6 text-[13px] font-bold whitespace-nowrap transition-all outline-none lg:text-sm ${
                  layananCategory === item.id
                    ? "border-blue-600 bg-blue-50/50 text-blue-600"
                    : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-blue-600"
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
        <div className="container mx-auto mt-16 grid grid-cols-1 items-start gap-10 px-4 lg:grid-cols-12">
          {/* KOLOM KIRI: CARD TUTORIAL (UKURAN 720PX BIAR PAS) */}
          <div className="space-y-16 lg:col-span-8">
            {listLayanan.map((layanan) => (
              <section
                id={layanan.id}
                key={layanan.id}
                // 👇 TINGGI DINAIKKAN KE 720PX UNTUK MENGHAPUS GAP BAWAH
                className="flex min-h-[720px] flex-col justify-center rounded-[3rem] border border-slate-100 bg-white p-10 shadow-sm transition-all duration-300 md:p-14"
              >
                <div className="flex flex-col gap-12">
                  <div className="mb-2">
                    <p className="mb-3 text-[10px] font-bold tracking-widest text-blue-600 uppercase">
                      LAYANAN ADMINISTRASI
                    </p>
                    <h2 className="text-3xl leading-tight font-extrabold text-slate-800 md:text-4xl">
                      {layanan.name}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    <div className="space-y-6">
                      <h4 className="flex items-center gap-2 text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase">
                        <ClipboardList size={18} className="text-blue-600" /> Persyaratan Dokumen
                      </h4>
                      <ul className="space-y-4">
                        {[
                          "Fotokopi Kartu Keluarga (Terbaru)",
                          "KTP Asli & Fotokopi 2 Lembar",
                          "Surat Pengantar RT & RW Setempat",
                        ].map((req, i) => (
                          <li
                            key={i}
                            className="flex gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-5 text-sm leading-relaxed font-bold text-slate-700"
                          >
                            <CheckCircle size={22} className="shrink-0 text-emerald-500" /> {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6">
                      <h4 className="flex items-center gap-2 text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase">
                        <Clock size={18} className="text-blue-600" /> Prosedur Pelayanan
                      </h4>
                      <div className="space-y-5">
                        {[
                          "Bawa berkas persyaratan ke Balai Desa",
                          "Verifikasi dokumen oleh petugas pelayanan",
                          "Entri data & validasi sistem kelurahan",
                          "Pengambilan dokumen yang sudah jadi",
                        ].map((step, i) => (
                          <div key={i} className="flex items-center gap-5">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 font-black text-blue-600 shadow-sm">
                              {i + 1}
                            </div>
                            <p className="text-sm leading-snug font-bold text-slate-800">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* KOLOM KANAN: TUTORIAL & INFORMASI (STICKY 720PX) */}
          <div className="sticky top-[200px] lg:col-span-4">
            <div className="flex min-h-[720px] flex-col rounded-[3rem] border border-slate-100 bg-white p-10 shadow-[0_30px_70px_rgba(0,0,0,0.12)]">
              <div className="mb-10">
                <h3 className="mb-3 flex items-center gap-3 text-2xl font-black text-slate-800">
                  <FileText size={28} className="text-blue-600" /> Pusat Informasi
                </h3>
                <p className="text-sm leading-relaxed font-medium text-slate-500">
                  Panduan tata cara pengajuan dokumen secara luring dan daring, serta jadwal
                  kegiatan pelayanan terpadu desa.
                </p>
              </div>

              {/* Tata Cara Pengajuan */}
              <div className="flex-1 space-y-6">
                {/* Card 1 */}
                <div className="rounded-3xl border border-blue-100 bg-blue-50/50 p-6">
                  <h4 className="mb-5 flex items-center gap-2 font-black text-slate-800">
                    <Clock size={18} className="text-blue-600" /> Alur Pengajuan
                  </h4>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-100/80 text-xs font-bold text-blue-600">
                        1
                      </div>
                      <span className="text-[13px] leading-relaxed font-bold text-slate-600">
                        Lengkapi & unggah berkas persyaratan melalui kontak WA terlampir.
                      </span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-100/80 text-xs font-bold text-blue-600">
                        2
                      </div>
                      <span className="text-[13px] leading-relaxed font-bold text-slate-600">
                        Hubungi narahubung WA resmi kelurahan untuk verifikasi data sementara.
                      </span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-100/80 text-xs font-bold text-blue-600">
                        3
                      </div>
                      <span className="text-[13px] leading-relaxed font-bold text-slate-600">
                        Dokumen diproses pada jam kerja maksimal 2x24 jam sejak tervalidasi.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Card 2 Agenda Mendatang */}
                <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6">
                  <h4 className="mb-5 flex items-center gap-2 font-black text-slate-800">
                    <Clock size={18} className="text-emerald-600" /> Agenda Mendatang
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 rounded-2xl border border-emerald-100/50 bg-white p-4 shadow-sm">
                      <div className="min-w-[60px] shrink-0 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-center text-emerald-600">
                        <p className="text-[10px] font-black uppercase">Agt</p>
                        <p className="text-xl font-black">24</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Perekaman e-KTP Keliling</p>
                        <p className="mt-1 text-xs font-medium text-slate-500">
                          Balai Desa RW 03 (08:00 WIB)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-2xl border border-emerald-100/50 bg-white p-4 shadow-sm">
                      <div className="min-w-[60px] shrink-0 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-center text-emerald-600">
                        <p className="text-[10px] font-black uppercase">Sep</p>
                        <p className="text-xl font-black">02</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Bazar Sembako & Posyandu</p>
                        <p className="mt-1 text-xs font-medium text-slate-500">
                          Halaman Pustu (07:00 WIB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tombol Aksi Langsung */}
              <div className="mt-8 border-t border-slate-100 pt-8 text-center">
                <p className="mb-4 text-xs font-black tracking-widest text-slate-400 uppercase">
                  Butuh Bantuan Langsung?
                </p>
                <a
                  href="#"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-800 px-8 py-5 font-bold text-white shadow-lg shadow-slate-200 transition-colors hover:bg-slate-900"
                >
                  Hubungi Staf Pelayanan
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto mt-24 mb-32 flex flex-col items-center justify-center px-4 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-slate-100 shadow-sm">
            <Loader2 className="animate-spin text-slate-400" size={40} />
          </div>
          <h2 className="mb-4 text-3xl font-black text-slate-800">Sinkronisasi Layanan</h2>
          <p className="mx-auto max-w-lg text-[15px] leading-relaxed text-slate-500">
            Modul pelayanan dari kategori{" "}
            <span className="font-bold text-slate-700">
              {categories.find((c) => c.id === layananCategory)?.name}
            </span>{" "}
            sedang dalam tahap penataan sistem birokrasi terpadu. Periksa kembali secara berkala.
          </p>
        </div>
      )}
    </div>
  );
}
