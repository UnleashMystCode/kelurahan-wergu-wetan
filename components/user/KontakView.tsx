"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle, PhoneCall, Clock, Loader2, MessageSquare } from "lucide-react";
import StaticBanner from "./StaticBanner"; // Tidak dipakai lagi, diganti hero minimalis
import { kirimPesan } from "@/actions/kontak.action";

type KontakInfo = { phone: string; email: string; alamat: string };

export default function KontakView({ banner, kontakInfo }: { banner?: any; kontakInfo?: KontakInfo }) {
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
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* 1. HERO HEADER (Minimalist Dark Style) */}
      <div className="relative w-full bg-[#0B132B] mt-[-100px] pt-[200px] pb-[100px] md:pt-[240px] md:pb-[140px] flex flex-col items-center justify-center text-center px-4">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }} 
          className="text-6xl md:text-[80px] text-white mb-6 tracking-tight leading-none"
        >
          Kontak
        </motion.h1>
        
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="w-full max-w-2xl">
           <p className="text-lg md:text-xl text-slate-300 font-medium tracking-wide">Hubungi kami atau sampaikan aspirasi Anda secara daring.</p>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 pt-16 relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* ===== KOLOM KIRI: INFO KONTAK ===== */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card Info Kontak */}
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 mb-6 pb-4 border-b border-slate-100">Informasi Kontak</h3>
            <div className="space-y-6">
              <ContactInfoItem Icon={MapPin} label="Alamat Kantor" value={info.alamat} />
              <ContactInfoItem Icon={Phone} label="Nomor Telepon / WA" value={info.phone} />
              <ContactInfoItem Icon={Mail} label="Email Resmi" value={info.email} />
              <ContactInfoItem Icon={Clock} label="Jam Pelayanan" value="Senin – Jumat, 08:00 – 15:00 WIB" />
            </div>
          </div>

          {/* Peta Google Maps */}
          <div className="h-72 rounded-[3rem] overflow-hidden shadow-xl border-8 border-white">
            <iframe
              className="w-full h-full"
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
            className="flex items-center justify-center gap-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-emerald-200 transition active:scale-95"
          >
            <Phone size={20} /> Hubungi via WhatsApp
          </a>
        </div>

        {/* ===== KOLOM KANAN: FORM ASPIRASI ===== */}
        <div className="lg:col-span-8 bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-slate-100">
          {formStatus === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-100">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-4">Pesan Terkirim! 🎉</h3>
              <p className="text-slate-500 mb-10 text-lg max-w-md mx-auto">Terima kasih atas aspirasi Anda. Petugas kami akan merespons secepatnya melalui WhatsApp yang Anda daftarkan.</p>
              <button
                onClick={() => setFormStatus("idle")}
                className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-blue-200 active:scale-95 transition-all"
              >
                Kirim Pesan Lagi
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                    <MessageSquare size={20} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-800">Formulir Aspirasi</h2>
                </div>
                <p className="text-slate-500 ml-[52px]">Isi formulir di bawah ini untuk menyampaikan pesan, saran, atau keluhan kepada pihak Kelurahan.</p>
              </div>

              <form action={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Lengkap *</label>
                    <input
                      name="nama"
                      type="text"
                      required
                      className="w-full bg-slate-50 px-5 py-4 rounded-2xl outline-none font-bold text-slate-900 border-2 border-transparent focus:border-blue-500/20 transition"
                      placeholder="Budi Santoso"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nomor WhatsApp *</label>
                    <input
                      name="whatsapp"
                      type="tel"
                      required
                      className="w-full bg-slate-50 px-5 py-4 rounded-2xl outline-none font-bold text-slate-900 border-2 border-transparent focus:border-blue-500/20 transition"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pesan / Aspirasi *</label>
                  <textarea
                    name="pesan"
                    rows={7}
                    required
                    className="w-full bg-slate-50 p-5 rounded-3xl outline-none font-medium text-slate-800 border-2 border-transparent focus:border-blue-500/20 transition resize-none"
                    placeholder="Tuliskan saran, keluhan, atau pertanyaan Anda di sini..."
                  />
                </div>
                <p className="text-xs text-slate-400">* Wajib diisi. Nomor WhatsApp Anda bersifat rahasia dan hanya digunakan untuk membalas pesan.</p>
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black shadow-2xl shadow-blue-500/20 hover:bg-blue-700 transition flex items-center justify-center gap-3 text-lg disabled:opacity-70 active:scale-95"
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
      <div className="w-11 h-11 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-slate-800 font-bold leading-relaxed">{value}</p>
      </div>
    </div>
  );
}