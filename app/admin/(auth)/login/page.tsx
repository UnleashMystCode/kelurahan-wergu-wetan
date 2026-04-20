"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, Loader2,
  ShieldCheck, ShieldAlert, ChevronDown, Check
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // STATE ROLE: 'admin' (Biasa) atau 'super' (Super Admin)
  const [role, setRole] = useState<"admin" | "super">("admin");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi Login
    console.log(`Login sebagai: ${role.toUpperCase()}`);

    // PENTING: Simpan role ke LocalStorage agar Sidebar di dashboard tahu
    // apakah harus menampilkan menu Super Admin atau tidak.
    localStorage.setItem("userRole", role);

    setTimeout(() => {
      setLoading(false);
      router.push("/admin/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50">

      {/* BAGIAN KIRI: GAMBAR & BRANDING */}
      <div className={`hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 text-white transition-colors duration-500 ${role === 'super' ? 'bg-slate-900' : 'bg-blue-900'}`}>

        {/* === SOLUSI BACKGROUND HILANG === */}
        {/* 1. Layer Gradient (Backup kalau gambar gak ada) */}
        <div className={`absolute inset-0 z-0 bg-gradient-to-br ${role === 'super' ? 'from-slate-800 to-black' : 'from-blue-600 to-blue-900'}`} />

        {/* 2. Gambar Asli (Fallback ke Unsplash agar tidak error Next/Image) */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
          <img
            src="/images/hero_office.png"
            alt="Background Kantor"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hiasan Blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-10 -mr-20 -mt-20"></div>

        {/* === DROPDOWN PILIH ADMIN === */}
        <div className="relative z-20">
          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/20 transition group"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border border-white/20 transition-colors ${role === 'super' ? 'bg-red-500/20 text-red-300' : 'bg-blue-400/20 text-blue-300'}`}>
                {role === 'super' ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
              </div>

              <div className="text-left mr-2">
                <span className="block text-[10px] text-white/60 tracking-wider font-bold uppercase">PORTAL LOGIN</span>
                <span className="block text-sm font-bold text-white leading-none">
                  {role === 'super' ? 'Super Administrator' : 'Administrator Biasa'}
                </span>
              </div>

              <ChevronDown size={16} className={`text-white/70 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* MENU DROPDOWN */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl overflow-hidden py-2 z-50 text-slate-800 ring-1 ring-black/5"
                >
                  {/* Opsi Admin Biasa */}
                  <button
                    onClick={() => { setRole('admin'); setIsDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition border-b border-slate-100"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <ShieldCheck size={16} />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-sm font-bold text-slate-800">Admin Biasa</p>
                      <p className="text-[10px] text-slate-500">Akses layanan surat & berita</p>
                    </div>
                    {role === 'admin' && <Check size={16} className="text-blue-600" />}
                  </button>

                  {/* Opsi Super Admin */}
                  <button
                    onClick={() => { setRole('super'); setIsDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition"
                  >
                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                      <ShieldAlert size={16} />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-sm font-bold text-slate-800">Super Admin</p>
                      <p className="text-[10px] text-slate-500">Akses penuh sistem & user</p>
                    </div>
                    {role === 'super' && <Check size={16} className="text-red-600" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Text Sambutan Kiri */}
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">
            {role === 'super' ? (
              <>Panel Kendali <span className="text-red-400">Pusat Sistem</span></>
            ) : (
              <>Kelola Layanan <span className="text-blue-400">Wergu Wetan</span></>
            )}
          </h2>
          <p className="text-white/80 leading-relaxed">
            {role === 'super'
              ? "Akses tingkat tinggi untuk manajemen pengguna, konfigurasi sistem, dan audit log keamanan."
              : "Sistem informasi manajemen kependudukan dan layanan surat online terpadu kelurahan."}
          </p>
        </div>

        <div className="relative z-10 text-xs text-white/40">
          &copy; {new Date().getFullYear()} Pemerintah Kabupaten Kudus. All rights reserved.
        </div>
      </div>

      {/* BAGIAN KANAN: FORM LOGIN */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <motion.div
          key={role} // Animasi ulang pas ganti role
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10"
        >
          {/* Header Form */}
          <div className="text-center mb-8">
            <div className={`inline-flex justify-center items-center w-16 h-16 rounded-2xl mb-4 shadow-sm transition-colors ${role === 'super' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
              {role === 'super' ? <ShieldAlert size={32} /> : <ShieldCheck size={32} />}
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              {role === 'super' ? 'Login Super Admin' : 'Login Petugas'}
            </h1>
            <p className="text-slate-500 text-sm mt-2">Masukkan kredensial Anda yang terdaftar.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Email / NIP</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" size={20} />
                <input
                  type="email"
                  placeholder={role === 'super' ? "root@werguwetan.go.id" : "admin@werguwetan.go.id"}
                  className={`w-full bg-slate-50 border text-slate-800 text-sm rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 ${role === 'super' ? 'focus:ring-red-500/20 focus:border-red-500' : 'focus:ring-blue-500/20 focus:border-blue-500'}`}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 border text-slate-800 text-sm rounded-xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 ${role === 'super' ? 'focus:ring-red-500/20 focus:border-red-500' : 'focus:ring-blue-500/20 focus:border-blue-500'}`}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-bold py-3.5 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 ${role === 'super' ? 'bg-slate-800 hover:bg-black shadow-red-500/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'}`}
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <>Masuk Dashboard <ArrowRight size={20} /></>}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/home" className="text-sm text-slate-500 hover:text-blue-600 font-medium transition-colors inline-flex items-center gap-1">
              &larr; Kembali ke Website Utama
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}