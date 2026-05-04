"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, LayoutDashboard, Settings, FileText, Image as ImageIcon, Store, Users, X, ArrowRight } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  role: "admin" | "super";
}

export default function CommandPalette({ isOpen, onClose, role }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Daftar menu yang bisa dicari beserta kata kunci alias (keywords)
  const allLinks = [
    { name: "Dashboard Utama", url: "/admin/dashboard", icon: LayoutDashboard, keywords: ["dashboard", "dasboard", "beranda", "utama", "statistik"] },
    
    // TAMPILAN BERANDA
    { name: "Kelola Banner Beranda", url: "/admin/halaman/beranda", icon: ImageIcon, keywords: ["banner", "gambar", "beranda", "depan", "slide", "carousel"] },
    { name: "Kelola Sambutan Lurah", url: "/admin/halaman/beranda/sambutan", icon: FileText, keywords: ["sambutan", "lurah", "kepala desa", "beranda", "teks", "pesan"] },
    { name: "Kelola Menu Layanan Icon", url: "/admin/halaman/beranda/layanan-icon", icon: Store, keywords: ["layanan", "menu", "icon", "beranda", "tengah"] },

    // TENTANG KAMI
    { name: "Kelola Banner Tentang Kami", url: "/admin/halaman/tentang-kami", icon: ImageIcon, keywords: ["banner", "gambar", "tentang", "kami", "profil", "desa"] },
    { name: "Visi Misi & Tugas", url: "/admin/halaman/tentang-kami/teks", icon: FileText, keywords: ["visi", "misi", "tugas", "fungsi", "tentang", "profil"] },
    { name: "Struktur Organisasi", url: "/admin/halaman/tentang-kami/struktur", icon: Users, keywords: ["struktur", "organisasi", "perangkat", "desa", "bagan"] },
    { name: "Statistik Warga", url: "/admin/halaman/tentang-kami/statistik", icon: LayoutDashboard, keywords: ["statistik", "warga", "penduduk", "data", "grafik"] },

    // BERITA
    { name: "Kelola Banner Berita", url: "/admin/halaman/berita", icon: ImageIcon, keywords: ["banner", "gambar", "berita", "artikel", "pengumuman"] },
    { name: "Kelola Daftar Berita", url: "/admin/halaman/berita/daftar", icon: FileText, keywords: ["berita", "artikel", "pengumuman", "kabar", "informasi", "kegiatan", "tambah", "edit"] },
    
    // POTENSI DESA
    { name: "Kelola Banner Potensi Desa", url: "/admin/halaman/potensi-desa", icon: ImageIcon, keywords: ["banner", "gambar", "potensi", "umkm", "desa", "produk"] },
    { name: "Kelola Daftar UMKM / Potensi", url: "/admin/halaman/potensi-desa/daftar", icon: Store, keywords: ["umkm", "usaha", "potensi", "desa", "produk", "jualan", "toko", "bisnis"] },

    // LAYANAN
    { name: "Kelola Banner Layanan", url: "/admin/halaman/layanan", icon: ImageIcon, keywords: ["banner", "gambar", "layanan", "surat", "pengajuan"] },
    { name: "Kelola Daftar Layanan Surat", url: "/admin/halaman/layanan/daftar", icon: FileText, keywords: ["layanan", "surat", "pengajuan", "dokumen", "ktp", "kk", "formulir"] },

    // KONTAK & PESAN
    { name: "Kelola Banner Kontak", url: "/admin/halaman/kontak", icon: ImageIcon, keywords: ["banner", "gambar", "kontak", "hubungi", "pesan"] },
    { name: "Informasi Kontak Desa", url: "/admin/halaman/kontak/daftar", icon: Settings, keywords: ["kontak", "alamat", "telepon", "email", "jam kerja", "sosmed"] },
    { name: "Kotak Pesan Warga", url: "/admin/pesan-masuk", icon: Users, keywords: ["pesan", "masuk", "warga", "kontak", "inbox", "saran", "aduan", "komplain"] },
  ];

  if (role === "super") {
    allLinks.push({ name: "Manajemen Admin", url: "/admin/settings", icon: Settings, keywords: ["admin", "pengguna", "user", "petugas", "password", "akun", "settings", "pengaturan"] });
  }

  // Filter pencarian yang lebih pintar (Fuzzy / Multi-word)
  const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const filteredLinks = query === "" 
    ? allLinks 
    : allLinks.filter((link) => {
        const searchTarget = `${link.name.toLowerCase()} ${link.keywords.join(" ")}`;
        // Cari kombinasi kata: misal "dasboard banner", maka ia akan mencari tautan yang mengandung "dasboard" ATAU "banner"
        // Kita menggunakan skor kecocokan sederhana:
        return searchTerms.some(term => searchTarget.includes(term));
      });

  // Menangani efek ketika modal terbuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50); // Kasih jeda sedikit agar animasi selesai
      document.body.style.overflow = "hidden"; // Kunci scroll belakang
    } else {
      setQuery("");
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Menangani tombol ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-32">
      {/* Background gelap overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Kotak Modal */}
      <div className="animate-in fade-in zoom-in-95 relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
        
        {/* Input Area */}
        <div className="flex items-center border-b border-slate-100 px-4">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            className="h-14 w-full border-0 bg-transparent pl-4 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 sm:text-lg"
            placeholder="Ketik untuk mencari menu..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Hasil Pencarian */}
        <div className="max-h-80 overflow-y-auto p-2 no-scrollbar">
          {filteredLinks.length > 0 ? (
            <ul className="space-y-1">
              {filteredLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <li key={index}>
                    <button
                      onClick={() => {
                        router.push(link.url);
                        onClose();
                      }}
                      className="group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600 group-focus:bg-blue-100 group-focus:text-blue-600">
                          <Icon size={16} />
                        </div>
                        <span className="font-medium text-slate-700 transition-colors group-hover:text-blue-700 group-focus:text-blue-700">
                          {link.name}
                        </span>
                      </div>
                      <ArrowRight size={16} className="text-slate-300 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-blue-500 group-focus:translate-x-1 group-focus:opacity-100 group-focus:text-blue-500" />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="py-14 text-center text-slate-500">
              <Search className="mx-auto mb-3 h-8 w-8 opacity-20" />
              <p className="text-sm font-medium">Menu tidak ditemukan.</p>
              <p className="text-xs mt-1 text-slate-400">Coba gunakan kata kunci lain (misal: "Banner").</p>
            </div>
          )}
        </div>
        
        {/* Footer Info */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="flex h-5 items-center rounded border border-slate-200 bg-white px-1.5 font-medium shadow-sm">
              ↑
            </span>
            <span className="flex h-5 items-center rounded border border-slate-200 bg-white px-1.5 font-medium shadow-sm">
              ↓
            </span>
            <span>Navigasi</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 items-center rounded border border-slate-200 bg-white px-1.5 font-medium shadow-sm">
              Enter
            </span>
            <span>Pilih</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 items-center rounded border border-slate-200 bg-white px-1.5 font-medium shadow-sm">
              ESC
            </span>
            <span>Tutup</span>
          </div>
        </div>
      </div>
    </div>
  );
}
