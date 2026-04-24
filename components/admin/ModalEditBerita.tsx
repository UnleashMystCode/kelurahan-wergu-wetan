"use client";

import { useState, useEffect, useTransition } from "react";
import { Save, X, Loader2 } from "lucide-react";
import { ubahKegiatan } from "@/actions/kegiatan.action";

type BeritaItem = {
  id: number;
  judul: string;
  isi: string;
  gambar: string | null;
  kategori: string;
  penulis: string;
  status: string;
};

const KATEGORI_OPTIONS = ["Kegiatan", "Pengumuman", "Pembangunan", "Ekonomi"];

export function ModalEditBerita({ item }: { item: BeritaItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Form state — dikontrol penuh agar selalu sinkron
  const [form, setForm] = useState({
    judul: item.judul,
    isi: item.isi,
    gambar: item.gambar || "",
    kategori: item.kategori,
    penulis: item.penulis,
    status: item.status,
  });

  // Reset form setiap kali modal dibuka (ambil data terbaru dari prop)
  useEffect(() => {
    if (isOpen) {
      setForm({
        judul: item.judul,
        isi: item.isi,
        gambar: item.gambar || "",
        kategori: item.kategori,
        penulis: item.penulis,
        status: item.status,
      });
    }
  }, [isOpen, item]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    startTransition(async () => {
      await ubahKegiatan(item.id, fd);
      setIsOpen(false);
    });
  };

  return (
    <>
      {/* Tombol Edit — dipanggil dari parent */}
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-slate-500 shadow-sm transition-all hover:bg-white hover:text-amber-600"
        title="Edit Berita"
      >
        ✏️
      </button>

      {/* Overlay Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={() => !isPending && setIsOpen(false)}
        >
          <div
            className="animate-in zoom-in-95 relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[3rem] bg-white p-10 shadow-2xl duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-8 flex items-start justify-between border-b border-slate-100 pb-5">
              <div>
                <h2 className="text-2xl font-black text-slate-800">Edit Berita</h2>
                <p className="mt-1 text-xs font-medium text-slate-400">
                  ID #{item.id} · Perubahan akan langsung diterapkan.
                </p>
              </div>
              <button
                disabled={isPending}
                onClick={() => setIsOpen(false)}
                className="shrink-0 rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Judul */}
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Judul Berita *
                </label>
                <input
                  name="judul"
                  required
                  value={form.judul}
                  onChange={handleChange}
                  className="w-full rounded-2xl border-2 border-transparent bg-slate-50 p-4 font-bold text-slate-900 transition outline-none focus:border-blue-500/20"
                />
              </div>

              {/* Row: Kategori + Penulis + Status */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    Genre / Tag
                  </label>
                  <select
                    name="kategori"
                    value={form.kategori}
                    onChange={handleChange}
                    className="w-full rounded-2xl border-2 border-transparent bg-slate-50 p-4 font-bold text-slate-900 transition outline-none focus:border-blue-500/20"
                  >
                    {KATEGORI_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    Penulis
                  </label>
                  <input
                    name="penulis"
                    value={form.penulis}
                    onChange={handleChange}
                    className="w-full rounded-2xl border-2 border-transparent bg-slate-50 p-4 font-bold text-slate-900 transition outline-none focus:border-blue-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    Status
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-2xl border-2 border-transparent bg-slate-50 p-4 font-bold text-slate-900 transition outline-none focus:border-blue-500/20"
                  >
                    <option value="Aktif">🟢 Live (Aktif)</option>
                    <option value="Non-Aktif">⚫ Takedown</option>
                  </select>
                </div>
              </div>

              {/* Gambar */}
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  URL Gambar Banner
                </label>
                <input
                  name="gambar"
                  type="url"
                  value={form.gambar}
                  onChange={handleChange}
                  className="w-full rounded-2xl border-2 border-transparent bg-slate-50 p-4 font-medium text-slate-900 transition outline-none focus:border-blue-500/20"
                  placeholder="https://..."
                />
              </div>

              {/* Preview Gambar */}
              {form.gambar && (
                <div className="h-40 overflow-hidden rounded-2xl border border-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.gambar} alt="preview" className="h-full w-full object-cover" />
                </div>
              )}

              {/* Konten */}
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Konten Berita *
                </label>
                <textarea
                  name="isi"
                  rows={8}
                  required
                  value={form.isi}
                  onChange={handleChange}
                  className="w-full resize-none rounded-3xl border-2 border-transparent bg-slate-50 p-5 font-medium text-slate-900 transition outline-none focus:border-blue-500/20"
                />
              </div>

              {/* Tombol */}
              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-2xl bg-slate-100 py-4 font-bold text-slate-500 transition hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex flex-[2] items-center justify-center gap-2 rounded-2xl bg-amber-500 py-4 font-black text-white shadow-xl shadow-amber-500/20 transition hover:bg-amber-600 disabled:opacity-70"
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
