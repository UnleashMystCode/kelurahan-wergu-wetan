"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
  PhoneCall,
  Clock,
  Loader2,
  MessageSquare,
} from "lucide-react";
import StaticBanner from "./StaticBanner"; // Tidak dipakai lagi, diganti hero minimalis
import { kirimPesan } from "@/actions/kontak.action";

type KontakInfo = { phone: string; email: string; alamat: string };

export default function KontakView({
  banner,
  kontakInfo,
}: {
  banner?: any;
  kontakInfo?: KontakInfo;
}) {
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");
  const [isPending, startTransition] = useTransition();

  const info = kontakInfo || {
    phone: "(0291) 430xxx",
    email: "pemdes@werguwetan.go.id",
    alamat: "Jl. Jendral Sudirman No. 12, Wergu Wetan, Kudus, Jawa Tengah",
  };

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await kirimPesan(formData);
        setFormStatus("success");
      } catch {
        alert("Gagal mengirim pesan, coba lagi.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 1. HERO HEADER (Minimalist Dark Style) */}
      <div className="relative mt-[-100px] flex w-full flex-col items-center justify-center bg-[#0B132B] px-4 pt-[220px] pb-[60px] text-center md:pt-[240px] md:pb-[80px]">
        <div className="mx-auto max-w-4xl">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
            className="mb-6 text-5xl leading-tight tracking-tight text-white drop-shadow-lg md:text-6xl lg:text-[80px]"
          >
            Kontak
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg font-medium tracking-wide text-slate-300 md:text-xl"
          >
            Hubungi kami atau sampaikan aspirasi Anda secara daring.
          </motion.p>
        </div>
      </div>

      <div className="relative z-30 container mx-auto mt-8 lg:mt-16 grid grid-cols-1 gap-6 lg:gap-10 px-4 md:px-8 lg:grid-cols-12">
        {/* ===== KOLOM KIRI: INFO KONTAK & MAP ===== */}
        <div className="flex flex-col gap-10 lg:col-span-5">
          {/* Card Info Kontak */}
          <div className="rounded-xl border border-slate-100 bg-white p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            <h3 className="mb-6 flex items-center gap-3 text-xl font-black text-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">
                <MapPin size={20} />
              </div>
              Informasi Kontak
            </h3>
            <div className="space-y-6">
              <ContactInfoItem Icon={MapPin} label="Alamat Kantor" value={info.alamat} />
              <ContactInfoItem Icon={Phone} label="Telepon / WA" value={info.phone} />
              <ContactInfoItem Icon={Mail} label="Email Resmi" value={info.email} />
              <ContactInfoItem
                Icon={Clock}
                label="Jam Pelayanan"
                value="Senin – Jumat, 08:00 – 15:00"
              />
            </div>
          </div>

          {/* Peta & Tombol WA dalam satu card untuk kekompakan */}
          <div className="flex flex-col gap-6 rounded-xl border border-slate-100 bg-white p-5 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            <div className="h-64 w-full overflow-hidden rounded-xl bg-slate-100">
              <iframe
                className="h-full w-full border-0"
                loading="lazy"
                src="https://maps.google.com/maps?q=Wergu%20Wetan%20Kudus&t=&z=15&ie=UTF8&iwloc=&output=embed"
                title="Peta Kelurahan Wergu Wetan"
              />
            </div>
            <a
              href={`https://wa.me/${info.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-500 py-4 font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-600 active:scale-95"
            >
              <PhoneCall size={20} className="transition-transform group-hover:rotate-12" />
              Hubungi via WhatsApp
            </a>
          </div>
        </div>

        {/* ===== KOLOM KANAN: FORM ASPIRASI ===== */}
        <div className="flex flex-col rounded-xl border border-slate-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] lg:col-span-7">
          <div className="p-5 md:p-10 lg:p-12">
            {formStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-xl shadow-emerald-100">
                  <CheckCircle size={40} />
                </div>
                <h3 className="mb-3 text-2xl font-black text-slate-800 md:text-3xl">Pesan Terkirim! 🎉</h3>
                <p className="mx-auto mb-8 max-w-sm text-base text-slate-500 md:text-lg">
                  Terima kasih atas aspirasi Anda. Kami akan segera merespons melalui WhatsApp Anda.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="rounded-xl bg-slate-900 px-8 py-3.5 font-bold text-white shadow-lg transition-all hover:bg-blue-600 active:scale-95"
                >
                  Kirim Pesan Baru
                </button>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <MessageSquare size={20} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800">Formulir Aspirasi</h2>
                  </div>
                  <p className="ml-[52px] text-sm text-slate-500 md:text-base">
                    Sampaikan pesan, saran, atau keluhan Anda kepada Pemerintah Kelurahan.
                  </p>
                </div>

                <form action={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                        Nama Lengkap
                      </label>
                      <input
                        name="nama"
                        type="text"
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 font-medium text-slate-800 transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
                        placeholder="Cth: Budi Santoso"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                        Nomor WhatsApp
                      </label>
                      <input
                        name="whatsapp"
                        type="tel"
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 font-medium text-slate-800 transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
                        placeholder="Cth: 08123456789"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                      Pesan / Aspirasi
                    </label>
                    <textarea
                      name="pesan"
                      rows={5}
                      required
                      className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-medium text-slate-800 transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
                      placeholder="Tuliskan aspirasi Anda di sini secara detail..."
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4 pt-2">
                    <p className="max-w-[250px] text-[11px] leading-relaxed text-slate-400 md:text-xs">
                      * Data diri Anda aman dan hanya digunakan untuk keperluan tindak lanjut aspirasi.
                    </p>
                    <button
                      type="submit"
                      disabled={isPending}
                      className="group flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-70 md:px-8"
                    >
                      {isPending ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <Send size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      )}
                      <span className="hidden sm:inline">{isPending ? "Mengirim..." : "Kirim Aspirasi"}</span>
                      <span className="sm:hidden">{isPending ? "Proses..." : "Kirim"}</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoItem({ Icon, label, value }: any) {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
          {label}
        </p>
        <p className="leading-relaxed font-bold text-slate-800 break-words">{value}</p>
      </div>
    </div>
  );
}
