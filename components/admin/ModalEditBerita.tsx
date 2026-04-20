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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
                className="p-3 text-slate-500 hover:text-amber-600 bg-slate-50 hover:bg-white rounded-2xl shadow-sm border border-slate-100 transition-all"
                title="Edit Berita"
            >
                ✏️
            </button>

            {/* Overlay Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[200] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => !isPending && setIsOpen(false)}>
                    <div className="bg-white p-10 rounded-[3rem] w-full max-w-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8 pb-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-2xl font-black text-slate-800">Edit Berita</h2>
                                <p className="text-xs text-slate-400 mt-1 font-medium">ID #{item.id} · Perubahan akan langsung diterapkan.</p>
                            </div>
                            <button disabled={isPending} onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-xl transition shrink-0"><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Judul */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Judul Berita *</label>
                                <input name="judul" required value={form.judul} onChange={handleChange} className="w-full bg-slate-50 p-4 rounded-2xl font-bold outline-none text-slate-900 border-2 border-transparent focus:border-blue-500/20 transition" />
                            </div>

                            {/* Row: Kategori + Penulis + Status */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Genre / Tag</label>
                                    <select name="kategori" value={form.kategori} onChange={handleChange} className="w-full bg-slate-50 p-4 rounded-2xl font-bold outline-none text-slate-900 border-2 border-transparent focus:border-blue-500/20 transition">
                                        {KATEGORI_OPTIONS.map(o => <option key={o}>{o}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Penulis</label>
                                    <input name="penulis" value={form.penulis} onChange={handleChange} className="w-full bg-slate-50 p-4 rounded-2xl font-bold outline-none text-slate-900 border-2 border-transparent focus:border-blue-500/20 transition" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</label>
                                    <select name="status" value={form.status} onChange={handleChange} className="w-full bg-slate-50 p-4 rounded-2xl font-bold outline-none text-slate-900 border-2 border-transparent focus:border-blue-500/20 transition">
                                        <option value="Aktif">🟢 Live (Aktif)</option>
                                        <option value="Non-Aktif">⚫ Takedown</option>
                                    </select>
                                </div>
                            </div>

                            {/* Gambar */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">URL Gambar Banner</label>
                                <input name="gambar" type="url" value={form.gambar} onChange={handleChange} className="w-full bg-slate-50 p-4 rounded-2xl font-medium outline-none text-slate-900 border-2 border-transparent focus:border-blue-500/20 transition" placeholder="https://..." />
                            </div>

                            {/* Preview Gambar */}
                            {form.gambar && (
                                <div className="h-40 rounded-2xl overflow-hidden border border-slate-100">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={form.gambar} alt="preview" className="w-full h-full object-cover" />
                                </div>
                            )}

                            {/* Konten */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Konten Berita *</label>
                                <textarea name="isi" rows={8} required value={form.isi} onChange={handleChange} className="w-full bg-slate-50 p-5 rounded-3xl font-medium outline-none text-slate-900 border-2 border-transparent focus:border-blue-500/20 transition resize-none" />
                            </div>

                            {/* Tombol */}
                            <div className="flex gap-4 pt-2">
                                <button type="button" disabled={isPending} onClick={() => setIsOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold hover:bg-slate-200 transition">Batal</button>
                                <button type="submit" disabled={isPending} className="flex-[2] bg-amber-500 text-white py-4 rounded-2xl font-black shadow-xl shadow-amber-500/20 hover:bg-amber-600 transition flex items-center justify-center gap-2 disabled:opacity-70">
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
