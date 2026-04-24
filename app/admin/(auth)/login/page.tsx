"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  ShieldCheck,
  ShieldAlert,
  ChevronDown,
  Check,
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
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* BAGIAN KIRI: GAMBAR & BRANDING */}
      <div
        className={`relative hidden w-1/2 flex-col justify-between overflow-hidden p-12 text-white transition-colors duration-500 lg:flex ${role === "super" ? "bg-slate-900" : "bg-blue-900"}`}
      >
        {/* === SOLUSI BACKGROUND HILANG === */}
        {/* 1. Layer Gradient (Backup kalau gambar gak ada) */}
        <div
          className={`absolute inset-0 z-0 bg-gradient-to-br ${role === "super" ? "from-slate-800 to-black" : "from-blue-600 to-blue-900"}`}
        />

        {/* 2. Gambar Asli (Fallback ke Unsplash agar tidak error Next/Image) */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
          <img
            src="/images/hero_office.png"
            alt="Background Kantor"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Hiasan Blur */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-white opacity-10 blur-3xl"></div>

        {/* === DROPDOWN PILIH ADMIN === */}
        <div className="relative z-20">
          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="group flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-md transition hover:bg-white/20"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 transition-colors ${role === "super" ? "bg-red-500/20 text-red-300" : "bg-blue-400/20 text-blue-300"}`}
              >
                {role === "super" ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
              </div>

              <div className="mr-2 text-left">
                <span className="block text-[10px] font-bold tracking-wider text-white/60 uppercase">
                  PORTAL LOGIN
                </span>
                <span className="block text-sm leading-none font-bold text-white">
                  {role === "super" ? "Super Administrator" : "Administrator Biasa"}
                </span>
              </div>

              <ChevronDown
                size={16}
                className={`text-white/70 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* MENU DROPDOWN */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 z-50 mt-2 w-64 overflow-hidden rounded-xl bg-white py-2 text-slate-800 shadow-2xl ring-1 ring-black/5"
                >
                  {/* Opsi Admin Biasa */}
                  <button
                    onClick={() => {
                      setRole("admin");
                      setIsDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-3 border-b border-slate-100 px-4 py-3 transition hover:bg-blue-50"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <ShieldCheck size={16} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold text-slate-800">Admin Biasa</p>
                      <p className="text-[10px] text-slate-500">Akses layanan surat & berita</p>
                    </div>
                    {role === "admin" && <Check size={16} className="text-blue-600" />}
                  </button>

                  {/* Opsi Super Admin */}
                  <button
                    onClick={() => {
                      setRole("super");
                      setIsDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 transition hover:bg-red-50"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                      <ShieldAlert size={16} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold text-slate-800">Super Admin</p>
                      <p className="text-[10px] text-slate-500">Akses penuh sistem & user</p>
                    </div>
                    {role === "super" && <Check size={16} className="text-red-600" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Text Sambutan Kiri */}
        <div className="relative z-10 max-w-md">
          <h2 className="mb-4 text-4xl leading-tight font-extrabold">
            {role === "super" ? (
              <>
                Panel Kendali <span className="text-red-400">Pusat Sistem</span>
              </>
            ) : (
              <>
                Kelola Layanan <span className="text-blue-400">Wergu Wetan</span>
              </>
            )}
          </h2>
          <p className="leading-relaxed text-white/80">
            {role === "super"
              ? "Akses tingkat tinggi untuk manajemen pengguna, konfigurasi sistem, dan audit log keamanan."
              : "Sistem informasi manajemen kependudukan dan layanan surat online terpadu kelurahan."}
          </p>
        </div>

        <div className="relative z-10 text-xs text-white/40">
          &copy; {new Date().getFullYear()} Pemerintah Kabupaten Kudus. All rights reserved.
        </div>
      </div>

      {/* BAGIAN KANAN: FORM LOGIN */}
      <div className="flex w-full items-center justify-center p-6 md:p-12 lg:w-1/2">
        <motion.div
          key={role} // Animasi ulang pas ganti role
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-xl md:p-10"
        >
          {/* Header Form */}
          <div className="mb-8 text-center">
            <div
              className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm transition-colors ${role === "super" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}
            >
              {role === "super" ? <ShieldAlert size={32} /> : <ShieldCheck size={32} />}
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              {role === "super" ? "Login Super Admin" : "Login Petugas"}
            </h1>
            <p className="mt-2 text-sm text-slate-500">Masukkan kredensial Anda yang terdaftar.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="ml-1 text-xs font-bold text-slate-700">Email / NIP</label>
              <div className="group relative">
                <Mail
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500"
                  size={20}
                />
                <input
                  type="email"
                  placeholder={
                    role === "super" ? "root@werguwetan.go.id" : "admin@werguwetan.go.id"
                  }
                  className={`w-full rounded-xl border bg-slate-50 py-3.5 pr-4 pl-12 text-sm text-slate-800 transition-all placeholder:text-slate-400 focus:ring-2 focus:outline-none ${role === "super" ? "focus:border-red-500 focus:ring-red-500/20" : "focus:border-blue-500 focus:ring-blue-500/20"}`}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="ml-1 text-xs font-bold text-slate-700">Password</label>
              <div className="group relative">
                <Lock
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full rounded-xl border bg-slate-50 py-3.5 pr-12 pl-12 text-sm text-slate-800 transition-all placeholder:text-slate-400 focus:ring-2 focus:outline-none ${role === "super" ? "focus:border-red-500 focus:ring-red-500/20" : "focus:border-blue-500 focus:ring-blue-500/20"}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 ${role === "super" ? "bg-slate-800 shadow-red-500/20 hover:bg-black" : "bg-blue-600 shadow-blue-600/20 hover:bg-blue-700"}`}
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  Masuk Dashboard <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="/home"
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
            >
              &larr; Kembali ke Website Utama
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
