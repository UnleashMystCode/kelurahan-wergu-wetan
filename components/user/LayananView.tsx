"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send, Clock, CheckCircle, Loader2, FileText,
    CreditCard, Users, Baby,
    Heart, FileCheck, Truck, Home, ClipboardList
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
            <div className="relative w-full bg-[#0B132B] mt-[-100px] pt-[200px] pb-[100px] md:pt-[240px] md:pb-[140px] flex flex-col items-center justify-center text-center px-4">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }} 
                  className="text-6xl md:text-[80px] text-white mb-6 tracking-tight leading-none"
                >
                  Layanan
                </motion.h1>
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="w-full max-w-2xl">
                   <p className="text-lg md:text-xl text-slate-300 font-medium tracking-wide">Panduan lengkap & administrasi digital Kelurahan Wergu Wetan.</p>
                </motion.div>
            </div>

            {/* 2. STICKY SUB-NAVBAR (KATEGORI UTAMA) */}
            <div className="sticky top-[120px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm h-[60px]">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar h-full gap-1">
                        {categories.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setLayananCategory(item.id);
                                    window.scrollTo({ top: 300, behavior: "smooth" });
                                }}
                                className={`relative h-full flex items-center gap-2 px-6 transition-all whitespace-nowrap border-b-[3px] outline-none text-[13px] lg:text-sm font-bold ${layananCategory === item.id ? "border-blue-600 text-blue-600 bg-blue-50/50" : "border-transparent text-slate-500 hover:text-blue-600 hover:bg-slate-50"
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
            <div className="container mx-auto px-4 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                {/* KOLOM KIRI: CARD TUTORIAL (UKURAN 720PX BIAR PAS) */}
                <div className="lg:col-span-8 space-y-16">
                    {listLayanan.map((layanan) => (
                        <section
                            id={layanan.id}
                            key={layanan.id}
                            // 👇 TINGGI DINAIKKAN KE 720PX UNTUK MENGHAPUS GAP BAWAH
                            className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-10 md:p-14 min-h-[720px] flex flex-col justify-center transition-all duration-300"
                        >
                            <div className="flex flex-col gap-12">
                                <div className="mb-2">
                                     <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-3">LAYANAN ADMINISTRASI</p>
                                     <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
                                         {layanan.name}
                                     </h2>
                                 </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <h4 className="flex items-center gap-2 font-black text-slate-400 text-[11px] uppercase tracking-[0.2em]">
                                            <ClipboardList size={18} className="text-blue-600" /> Persyaratan Dokumen
                                        </h4>
                                        <ul className="space-y-4">
                                            {[
                                                "Fotokopi Kartu Keluarga (Terbaru)",
                                                "KTP Asli & Fotokopi 2 Lembar",
                                                "Surat Pengantar RT & RW Setempat"
                                            ].map((req, i) => (
                                                <li key={i} className="flex gap-4 bg-slate-50 p-5 rounded-3xl border border-slate-100 text-slate-700 font-bold text-sm leading-relaxed">
                                                    <CheckCircle size={22} className="text-emerald-500 shrink-0" /> {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="flex items-center gap-2 font-black text-slate-400 text-[11px] uppercase tracking-[0.2em]">
                                            <Clock size={18} className="text-blue-600" /> Prosedur Pelayanan
                                        </h4>
                                        <div className="space-y-5">
                                            {[
                                                "Bawa berkas persyaratan ke Balai Desa",
                                                "Verifikasi dokumen oleh petugas pelayanan",
                                                "Entri data & validasi sistem kelurahan",
                                                "Pengambilan dokumen yang sudah jadi"
                                            ].map((step, i) => (
                                                <div key={i} className="flex gap-5 items-center">
                                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black shrink-0 border border-blue-100 shadow-sm">
                                                        {i + 1}
                                                    </div>
                                                    <p className="text-slate-800 font-bold text-sm leading-snug">{step}</p>
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
                <div className="lg:col-span-4 sticky top-[200px]">
                    <div className="bg-white rounded-[3rem] shadow-[0_30px_70px_rgba(0,0,0,0.12)] border border-slate-100 p-10 flex flex-col min-h-[720px]">
                        
                        <div className="mb-10">
                            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3 mb-3">
                                <FileText size={28} className="text-blue-600" /> Pusat Informasi
                            </h3>
                            <p className="text-slate-500 font-medium text-sm leading-relaxed">
                                Panduan tata cara pengajuan dokumen secara luring dan daring, serta jadwal kegiatan pelayanan terpadu desa.
                            </p>
                        </div>

                        {/* Tata Cara Pengajuan */}
                        <div className="space-y-6 flex-1">
                            {/* Card 1 */}
                            <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6">
                                <h4 className="font-black text-slate-800 flex items-center gap-2 mb-5">
                                    <Clock size={18} className="text-blue-600" /> Alur Pengajuan
                                </h4>
                                <ul className="space-y-5">
                                    <li className="flex gap-4 items-start">
                                        <div className="w-7 h-7 rounded-full bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 border border-blue-200">1</div>
                                        <span className="text-[13px] text-slate-600 font-bold leading-relaxed">Lengkapi & unggah berkas persyaratan melalui kontak WA terlampir.</span>
                                    </li>
                                    <li className="flex gap-4 items-start">
                                        <div className="w-7 h-7 rounded-full bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 border border-blue-200">2</div>
                                        <span className="text-[13px] text-slate-600 font-bold leading-relaxed">Hubungi narahubung WA resmi kelurahan untuk verifikasi data sementara.</span>
                                    </li>
                                    <li className="flex gap-4 items-start">
                                        <div className="w-7 h-7 rounded-full bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 border border-blue-200">3</div>
                                        <span className="text-[13px] text-slate-600 font-bold leading-relaxed">Dokumen diproses pada jam kerja maksimal 2x24 jam sejak tervalidasi.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Card 2 Agenda Mendatang */}
                            <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-6">
                                <h4 className="font-black text-slate-800 flex items-center gap-2 mb-5">
                                    <Clock size={18} className="text-emerald-600" /> Agenda Mendatang
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex gap-4 items-start bg-white p-4 rounded-2xl border border-emerald-100/50 shadow-sm">
                                        <div className="bg-emerald-50 text-emerald-600 rounded-xl px-3 py-2 text-center min-w-[60px] border border-emerald-100 shrink-0">
                                            <p className="text-[10px] font-black uppercase">Agt</p>
                                            <p className="text-xl font-black">24</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm">Perekaman e-KTP Keliling</p>
                                            <p className="text-xs text-slate-500 font-medium mt-1">Balai Desa RW 03 (08:00 WIB)</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start bg-white p-4 rounded-2xl border border-emerald-100/50 shadow-sm">
                                        <div className="bg-emerald-50 text-emerald-600 rounded-xl px-3 py-2 text-center min-w-[60px] border border-emerald-100 shrink-0">
                                            <p className="text-[10px] font-black uppercase">Sep</p>
                                            <p className="text-xl font-black">02</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm">Bazar Sembako & Posyandu</p>
                                            <p className="text-xs text-slate-500 font-medium mt-1">Halaman Pustu (07:00 WIB)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tombol Aksi Langsung */}
                        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Butuh Bantuan Langsung?</p>
                            <a href="#" className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 transition-colors text-white py-5 px-8 rounded-2xl font-bold w-full shadow-lg shadow-slate-200">
                                Hubungi Staf Pelayanan
                            </a>
                        </div>
                    </div>
                </div>

            </div>
            ) : (
                <div className="container mx-auto px-4 mt-24 mb-32 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6 border border-slate-200 shadow-sm">
                         <Loader2 className="animate-spin text-slate-400" size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 mb-4">Sinkronisasi Layanan</h2>
                    <p className="text-slate-500 max-w-lg mx-auto leading-relaxed text-[15px]">
                        Modul pelayanan dari kategori <span className="font-bold text-slate-700">{categories.find(c => c.id === layananCategory)?.name}</span> sedang dalam tahap penataan sistem birokrasi terpadu. Periksa kembali secara berkala.
                    </p>
                </div>
            )}
        </div>
    );
}