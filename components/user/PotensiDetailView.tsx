"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, FileClock } from "lucide-react";
import Link from "next/link";

export default function PotensiDetailView({ potensi }: { potensi: any }) {
  // Pastikan layar selalu tergulung ke atas saat artikel baru dibuka
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [potensi?.id]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 1. HERO HEADER (Dark background for navbar & text) */}
      <div className="relative flex w-full flex-col justify-center bg-slate-900 px-4 pt-[180px] pb-[100px] md:pt-[220px] md:pb-[140px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 mix-blend-overlay"
          style={{
            backgroundImage: `url('${potensi.gambar || "/images/hero_neighborhood.png"}'), url('/images/hero_neighborhood.png')`,
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />

        {/* Header Content */}
        <div className="relative z-10 container mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/potensi-desa"
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <ArrowLeft size={16} /> Kembali ke Daftar Potensi
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-bold">
              <span className="flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 px-3 py-1 text-[11px] tracking-wider text-blue-300 uppercase backdrop-blur-md">
                <Tag size={12} /> {potensi.kategori}
              </span>
              <span className="text-white/30">•</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Calendar size={14} />
                {new Date(potensi.tanggal).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="mb-8 text-3xl leading-tight font-extrabold text-white md:text-5xl lg:text-6xl" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
              {potensi.judul}
            </h1>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-md">
                {potensi.penulis.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{potensi.penulis}</p>
                <p className="text-xs font-medium text-blue-200">Pemerintah Desa Wergu Wetan</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="container mx-auto max-w-4xl px-5 sm:px-6 pt-10 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto w-full max-w-3xl overflow-hidden"
        >
          {(!potensi.isi || potensi.isi.trim() === '' || potensi.isi === '<p></p>' || potensi.isi === '<p><br></p>') ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-100/50 px-6 py-20 text-center shadow-sm">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm ring-4 ring-slate-50">
                <FileClock className="h-10 w-10 text-slate-400" />
              </div>
              <h2 className="mb-3 text-2xl font-black text-slate-800">
                Konten Sedang Disiapkan
              </h2>
              <p className="mx-auto max-w-md text-slate-500 leading-relaxed">
                Redaksi kami sedang menyusun dan meninjau isi dari artikel potensi desa ini. Silakan kunjungi kembali halaman ini dalam waktu dekat untuk membaca informasi selengkapnya.
              </p>
            </div>
          ) : (
            <article 
              className="prose prose-slate prose-headings:font-bold prose-a:text-blue-600 prose-img:w-full prose-img:max-w-full prose-img:rounded-xl md:prose-lg w-full max-w-none break-words overflow-wrap-anywhere prose-p:leading-relaxed prose-p:text-slate-700"
              style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
            >
              <div dangerouslySetInnerHTML={{ __html: potensi.isi }} />
            </article>
          )}

          {/* 3. FOOTER / SHARE */}
          <div className="mt-16 flex items-center justify-between border-t border-slate-200 pt-8">
            <p className="text-sm font-bold tracking-widest text-slate-400 uppercase">
              Bagikan Artikel
            </p>
            <div className="flex gap-4">
              <button className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-600">
                Facebook
              </button>
              <button className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">
                Twitter
              </button>
              <button className="text-sm font-medium text-slate-400 transition-colors hover:text-green-600">
                WhatsApp
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
