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
      <div className="relative mt-[-100px] flex w-full flex-col items-center justify-center bg-[#0B132B] px-4 pt-[200px] pb-[100px] text-center md:pt-[240px] md:pb-[140px]">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
          className="mb-6 text-6xl leading-none tracking-tight text-white md:text-[80px]"
        >
          Kontak
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-2xl"
        >
          <p className="text-lg font-medium tracking-wide text-slate-300 md:text-xl">
            Hubungi kami atau sampaikan aspirasi Anda secara daring.
          </p>
        </motion.div>
      </div>

      <div className="relative z-30 container mx-auto grid grid-cols-1 gap-10 px-6 pt-16 lg:grid-cols-12">
        {/* ===== KOLOM KIRI: INFO KONTAK ===== */}
        <div className="space-y-6 lg:col-span-4">
          {/* Card Info Kontak */}
          <div className="rounded-[3rem] border border-slate-100 bg-white p-10 shadow-xl">
            <h3 className="mb-6 border-b border-slate-100 pb-4 text-xl font-black text-slate-800">
              Informasi Kontak
            </h3>
            <div className="space-y-6">
              <ContactInfoItem Icon={MapPin} label="Alamat Kantor" value={info.alamat} />
              <ContactInfoItem Icon={Phone} label="Nomor Telepon / WA" value={info.phone} />
              <ContactInfoItem Icon={Mail} label="Email Resmi" value={info.email} />
              <ContactInfoItem
                Icon={Clock}
                label="Jam Pelayanan"
                value="Senin – Jumat, 08:00 – 15:00 WIB"
              />
            </div>
          </div>

          {/* Peta Google Maps */}
          <div className="h-72 overflow-hidden rounded-[3rem] border-8 border-white shadow-xl">
            <iframe
              className="h-full w-full"
              loading="lazy"
              src="https://maps.google.com/maps?q=Wergu%20Wetan%20Kudus&t=&z=15&ie=UTF8&iwloc=&output=embed"
              title="Peta Kelurahan Wergu Wetan"
            />
          </div>

          {/* Tombol WA langsung */}
          <a
            href={`https://wa.me/${info.phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-500 py-4 font-black text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600 active:scale-95"
          >
            <Phone size={20} /> Hubungi via WhatsApp
          </a>
        </div>

        {/* ===== KOLOM KANAN: FORM ASPIRASI ===== */}
        <div className="rounded-[3.5rem] border border-slate-100 bg-white p-10 shadow-2xl md:p-14 lg:col-span-8">
          {formStatus === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 text-center"
            >
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-lg shadow-emerald-100">
                <CheckCircle size={48} />
              </div>
              <h3 className="mb-4 text-3xl font-black text-slate-800">Pesan Terkirim! 🎉</h3>
              <p className="mx-auto mb-10 max-w-md text-lg text-slate-500">
                Terima kasih atas aspirasi Anda. Petugas kami akan merespons secepatnya melalui
                WhatsApp yang Anda daftarkan.
              </p>
              <button
                onClick={() => setFormStatus("idle")}
                className="rounded-2xl bg-blue-600 px-10 py-4 font-black text-white shadow-lg shadow-blue-200 transition-all active:scale-95"
              >
                Kirim Pesan Lagi
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-10">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                    <MessageSquare size={20} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-800">Formulir Aspirasi</h2>
                </div>
                <p className="ml-[52px] text-slate-500">
                  Isi formulir di bawah ini untuk menyampaikan pesan, saran, atau keluhan kepada
                  pihak Kelurahan.
                </p>
              </div>

              <form action={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                      Nama Lengkap *
                    </label>
                    <input
                      name="nama"
                      type="text"
                      required
                      className="w-full rounded-2xl border-2 border-transparent bg-slate-50 px-5 py-4 font-bold text-slate-900 transition outline-none focus:border-blue-500/20"
                      placeholder="Budi Santoso"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                      Nomor WhatsApp *
                    </label>
                    <input
                      name="whatsapp"
                      type="tel"
                      required
                      className="w-full rounded-2xl border-2 border-transparent bg-slate-50 px-5 py-4 font-bold text-slate-900 transition outline-none focus:border-blue-500/20"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    Pesan / Aspirasi *
                  </label>
                  <textarea
                    name="pesan"
                    rows={7}
                    required
                    className="w-full resize-none rounded-3xl border-2 border-transparent bg-slate-50 p-5 font-medium text-slate-800 transition outline-none focus:border-blue-500/20"
                    placeholder="Tuliskan saran, keluhan, atau pertanyaan Anda di sini..."
                  />
                </div>
                <p className="text-xs text-slate-400">
                  * Wajib diisi. Nomor WhatsApp Anda bersifat rahasia dan hanya digunakan untuk
                  membalas pesan.
                </p>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex w-full items-center justify-center gap-3 rounded-3xl bg-blue-600 py-5 text-lg font-black text-white shadow-2xl shadow-blue-500/20 transition hover:bg-blue-700 active:scale-95 disabled:opacity-70"
                >
                  {isPending ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
                  {isPending ? "Mengirim..." : "Kirim Aspirasi"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactInfoItem({ Icon, label, value }: any) {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <Icon size={18} />
      </div>
      <div>
        <p className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
          {label}
        </p>
        <p className="leading-relaxed font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
