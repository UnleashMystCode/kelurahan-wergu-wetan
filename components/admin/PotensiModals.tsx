"use client";

import { useState, useTransition } from "react";
import { Plus, Save, X, Loader2, Edit3 } from "lucide-react";
import { simpanPotensi } from "@/actions/potensi.action";

const KATEGORI = [
  "Ekonomi & UMKM",
  "Sosial & Organisasi",
  "Ikonik & Fasilitas",
  "Keagamaan",
];

export function ModalTambahPotensi() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await simpanPotensi(fd);
      setIsOpen(false);
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-95"
      >
        <Plus size={20} strokeWidth={3} /> Tambah UMKM/Potensi
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={() => !isPending && setIsOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8 flex items-center justify-between border-b pb-4">
              <h2 className="text-2xl font-black text-slate-800">Tambah Data Potensi Desa</h2>
              <button
                disabled={isPending}
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
              >
                <X size={28} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    Judul UMKM / Potensi *
                  </label>
                  <input
                    name="judul"
                    type="text"
                    required
                    className="w-full rounded-xl border-2 border-transparent bg-slate-50 p-4 font-bold text-slate-900 transition outline-none focus:border-blue-500/20"
                    placeholder="Masukkan nama..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    Kategori
                  </label>
                  <select
                    name="kategori"
                    className="w-full rounded-xl border-2 border-transparent bg-slate-50 p-4 font-bold text-slate-900 transition outline-none focus:border-blue-500/20"
                  >
                    {KATEGORI.map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    URL Gambar Thumbnail (Opsional)
                  </label>
                  <input
                    name="gambar"
                    type="url"
                    className="w-full rounded-xl border-2 border-transparent bg-slate-50 p-4 font-medium text-slate-900 transition outline-none focus:border-blue-500/20"
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    Tanggal Publish
                  </label>
                  <input
                    name="tanggal"
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-xl border-2 border-transparent bg-slate-50 p-4 font-bold text-slate-900 transition outline-none focus:border-blue-500/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Deskripsi Singkat (Tampil di Kartu) *
                </label>
                <textarea
                  name="deskripsiSingkat"
                  rows={2}
                  required
                  className="w-full resize-none rounded-xl border-2 border-transparent bg-slate-50 p-5 font-medium text-slate-900 transition outline-none focus:border-blue-500/20"
                  placeholder="Deskripsi pendek untuk kartu potensi..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Isi Artikel Lengkap (Tampil di Halaman Detail) *
                </label>
                <textarea
                  name="isi"
                  rows={6}
                  required
                  className="w-full resize-none rounded-xl border-2 border-transparent bg-slate-50 p-5 font-medium text-slate-900 transition outline-none focus:border-blue-500/20"
                  placeholder="Ceritakan selengkapnya tentang potensi ini..."
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-xl bg-slate-100 py-4 font-bold text-slate-500 transition hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-black text-white shadow-xl shadow-blue-500/20 transition hover:bg-blue-700 disabled:opacity-70"
                >
                  {isPending ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                  {isPending ? "Menyimpan..." : "Simpan Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export function ModalEditPotensi({ item }: { item: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.append("id", item.id.toString());
    startTransition(async () => {
      await simpanPotensi(fd);
      setIsOpen(false);
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-blue-50 p-2.5 text-blue-600 transition-all hover:bg-blue-600 hover:text-white"
        title="Edit Potensi"
      >
        <Edit3 size={17} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={() => !isPending && setIsOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8 flex items-center justify-between border-b pb-4">
              <h2 className="text-2xl font-black text-slate-800">Edit Data Potensi Desa</h2>
              <button
                disabled={isPending}
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
              >
                <X size={28} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    Judul UMKM / Potensi *
                  </label>
                  <input
                    name="judul"
                    type="text"
                    defaultValue={item.judul}
                    required
                    className="w-full rounded-xl border-2 border-transparent bg-slate-50 p-4 font-bold text-slate-900 transition outline-none focus:border-blue-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    Kategori
                  </label>
                  <select
                    name="kategori"
                    defaultValue={item.kategori}
                    className="w-full rounded-xl border-2 border-transparent bg-slate-50 p-4 font-bold text-slate-900 transition outline-none focus:border-blue-500/20"
                  >
                    {KATEGORI.map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    URL Gambar Thumbnail (Opsional)
                  </label>
                  <input
                    name="gambar"
                    type="url"
                    defaultValue={item.gambar || ""}
                    className="w-full rounded-xl border-2 border-transparent bg-slate-50 p-4 font-medium text-slate-900 transition outline-none focus:border-blue-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    Tanggal Publish
                  </label>
                  <input
                    name="tanggal"
                    type="date"
                    defaultValue={item.tanggal ? new Date(item.tanggal).toISOString().split("T")[0] : ""}
                    className="w-full rounded-xl border-2 border-transparent bg-slate-50 p-4 font-bold text-slate-900 transition outline-none focus:border-blue-500/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Deskripsi Singkat *
                </label>
                <textarea
                  name="deskripsiSingkat"
                  rows={2}
                  defaultValue={item.deskripsiSingkat}
                  required
                  className="w-full resize-none rounded-xl border-2 border-transparent bg-slate-50 p-5 font-medium text-slate-900 transition outline-none focus:border-blue-500/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Isi Artikel Lengkap *
                </label>
                <textarea
                  name="isi"
                  rows={6}
                  defaultValue={item.isi}
                  required
                  className="w-full resize-none rounded-xl border-2 border-transparent bg-slate-50 p-5 font-medium text-slate-900 transition outline-none focus:border-blue-500/20"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-xl bg-slate-100 py-4 font-bold text-slate-500 transition hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-black text-white shadow-xl shadow-blue-500/20 transition hover:bg-blue-700 disabled:opacity-70"
                >
                  {isPending ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                  {isPending ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
