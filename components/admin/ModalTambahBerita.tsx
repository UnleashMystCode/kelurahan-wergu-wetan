"use client";

import { useState, useTransition } from "react";
import { Plus, Save, X, Loader2 } from "lucide-react";
import { tambahKegiatan } from "@/actions/kegiatan.action";

const KATEGORI = ["Kegiatan", "Pengumuman", "Pembangunan", "Ekonomi"];

export function ModalTambahBerita() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
            await tambahKegiatan(fd);
            setIsOpen(false);
        });
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-all shadow-xl shadow-blue-600/20 active:scale-95"
            >
                <Plus size={20} strokeWidth={3} /> Tulis Berita Baru
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[200] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => !isPending && setIsOpen(false)}>
                    <div className="bg-white p-10 rounded-[3rem] w-full max-w-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-8 border-b pb-4">
                            <h2 className="text-2xl font-black text-slate-800">Tulis Berita Baru</h2>
                            <button disabled={isPending} onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-xl transition"><X size={28} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Judul Berita *</label>
                                    <input name="judul" type="text" required className="w-full bg-slate-50 p-4 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-blue-500/20 text-slate-900 transition" placeholder="Masukkan judul..." />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Genre / Tag</label>
                                    <select name="kategori" className="w-full bg-slate-50 p-4 rounded-2xl font-bold outline-none text-slate-900 border-2 border-transparent focus:border-blue-500/20 transition">
                                        {KATEGORI.map(k => <option key={k}>{k}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Penulis</label>
                                    <input name="penulis" defaultValue="Admin Desa" className="w-full bg-slate-50 p-4 rounded-2xl font-bold outline-none text-slate-900 border-2 border-transparent focus:border-blue-500/20 transition" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal Terbit</label>
                                    <input name="tanggal" type="date" className="w-full bg-slate-50 p-4 rounded-2xl font-bold outline-none text-slate-900 border-2 border-transparent focus:border-blue-500/20 transition" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</label>
                                    <select name="status" className="w-full bg-slate-50 p-4 rounded-2xl font-bold outline-none text-slate-900 border-2 border-transparent focus:border-blue-500/20 transition">
                                        <option value="Aktif">🟢 Live (Aktif)</option>
                                        <option value="Non-Aktif">⚫ Takedown (Draft)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">URL Gambar Banner</label>
                                <input name="gambar" type="url" className="w-full bg-slate-50 p-4 rounded-2xl font-medium outline-none text-slate-900 border-2 border-transparent focus:border-blue-500/20 transition" placeholder="https://..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Konten Berita *</label>
                                <textarea name="isi" rows={6} required className="w-full bg-slate-50 p-5 rounded-3xl font-medium outline-none border-2 border-transparent focus:border-blue-500/20 text-slate-900 transition resize-none" placeholder="Tulis konten di sini..." />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" disabled={isPending} onClick={() => setIsOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold hover:bg-slate-200 transition">Batal</button>
                                <button type="submit" disabled={isPending} className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-70">
                                    {isPending ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                                    {isPending ? "Menyimpan..." : "Simpan Berita"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
