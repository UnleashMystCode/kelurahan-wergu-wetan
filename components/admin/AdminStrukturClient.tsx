"use client";

import { useState, useTransition } from "react";
import { Trash2, Plus, User, Save, X, Loader2, Edit3, AlertTriangle } from "lucide-react";
import { tambahPerangkat, ubahPerangkat, hapusPerangkat } from "@/actions/tentang-kami.action";

type Perangkat = {
    id: number;
    nama: string;
    jabatan: string;
    nip: string | null;
    foto: string | null;
    urutan: number;
};

// ===== REUSABLE CONFIRM DIALOG LOKAL =====
function ConfirmDialog({ title, desc, onConfirm, onCancel, isPending }: {
    title: string; desc: string; onConfirm: () => void; onCancel: () => void; isPending: boolean;
}) {
    return (
        <div className="fixed inset-0 z-[400] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => !isPending && onCancel()}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 animate-in zoom-in-90 duration-200" onClick={e => e.stopPropagation()}>
                <div className="w-14 h-14 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-5"><AlertTriangle size={28} /></div>
                <h3 className="text-lg font-black text-slate-800 text-center mb-2">{title}</h3>
                <p className="text-slate-500 text-sm text-center mb-6" dangerouslySetInnerHTML={{ __html: desc }} />
                <div className="flex gap-3">
                    <button onClick={onCancel} disabled={isPending} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition">Batal</button>
                    <button onClick={onConfirm} disabled={isPending} className="flex-1 py-3 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 transition flex items-center justify-center gap-2 shadow-lg shadow-red-100">
                        {isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                        {isPending ? "Menghapus..." : "Ya, Hapus"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ===== MODAL FORM (TAMBAH / EDIT) =====
function PerangkatFormModal({ mode, data, onClose }: {
    mode: "tambah" | "edit"; data?: Perangkat; onClose: () => void;
}) {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
            if (mode === "edit" && data) {
                await ubahPerangkat(data.id, fd);
            } else {
                await tambahPerangkat(fd);
            }
            onClose();
        });
    };

    return (
        <div className="fixed inset-0 z-[300] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => !isPending && onClose()}>
            <div className="bg-white p-8 rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                    <div>
                        <h2 className="text-xl font-black text-slate-800">{mode === "edit" ? "✏️ Edit Perangkat Desa" : "➕ Tambah Perangkat Desa"}</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Isi data yang akan ditampilkan di halaman Profil.</p>
                    </div>
                    <button onClick={onClose} disabled={isPending} className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-xl transition"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Lengkap *</label>
                        <input name="nama" required defaultValue={data?.nama || ""} className="w-full bg-slate-50 p-4 rounded-xl outline-none font-bold text-slate-900 border-2 border-transparent focus:border-blue-500/30 transition" placeholder="Contoh: Drs. Ahmad Fauzi, M.Si" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jabatan *</label>
                            <input name="jabatan" required defaultValue={data?.jabatan || ""} className="w-full bg-slate-50 p-4 rounded-xl outline-none font-bold text-slate-900 border-2 border-transparent focus:border-blue-500/30 transition" placeholder="Lurah / Sekdes / Kasi..." />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Urutan Tampil</label>
                            <input name="urutan" type="number" defaultValue={data?.urutan ?? 100} className="w-full bg-slate-50 p-4 rounded-xl outline-none font-bold text-slate-900 border-2 border-transparent focus:border-blue-500/30 transition" placeholder="1 = Lurah" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NIP (Opsional)</label>
                        <input name="nip" defaultValue={data?.nip || ""} className="w-full bg-slate-50 p-4 rounded-xl outline-none font-mono text-slate-900 border-2 border-transparent focus:border-blue-500/30 transition" placeholder="197001012000121001" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">URL Foto (Opsional)</label>
                        <input name="foto" type="url" defaultValue={data?.foto || ""} className="w-full bg-slate-50 p-4 rounded-xl outline-none font-bold text-slate-900 border-2 border-transparent focus:border-blue-500/30 transition" placeholder="https://..." />
                    </div>
                    {/* Preview foto */}
                    {data?.foto && <img src={data.foto} alt="preview" className="w-16 h-16 rounded-2xl object-cover border border-slate-100" />}
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} disabled={isPending} className="flex-1 py-3.5 bg-slate-100 text-slate-500 rounded-2xl font-bold hover:bg-slate-200 transition">Batal</button>
                        <button type="submit" disabled={isPending} className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition disabled:opacity-70">
                            {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            {isPending ? "Menyimpan..." : mode === "edit" ? "Simpan Perubahan" : "Tambah Perangkat"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ===== MAIN PAGE COMPONENT =====
export default function AdminStrukturClient({ initialData }: { initialData: Perangkat[] }) {
    const [showTambah, setShowTambah] = useState(false);
    const [editTarget, setEditTarget] = useState<Perangkat | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Perangkat | null>(null);
    const [isPendingDelete, startDeleteTransition] = useTransition();

    const handleDelete = () => {
        if (!deleteTarget) return;
        startDeleteTransition(async () => {
            await hapusPerangkat(deleteTarget.id);
            setDeleteTarget(null);
        });
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Struktur Organisasi</h1>
                    <p className="text-slate-500 text-sm mt-1">Kelola data Lurah dan Perangkat Desa yang tampil di halaman Profil.</p>
                </div>
                <button onClick={() => setShowTambah(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                    <Plus size={18} strokeWidth={3} /> Tambah Perangkat
                </button>
            </div>

            {/* Tabel */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <tr>
                            <th className="p-6">Foto &amp; Nama</th>
                            <th className="p-6">Jabatan</th>
                            <th className="p-6">NIP</th>
                            <th className="p-6 text-center">Urutan</th>
                            <th className="p-6 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {initialData.map((p) => (
                            <tr key={p.id} className="hover:bg-blue-50/20 transition-all group">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                                            {p.foto ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={p.foto} alt={p.nama} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300"><User size={24} /></div>
                                            )}
                                        </div>
                                        <span className="font-bold text-slate-800">{p.nama}</span>
                                    </div>
                                </td>
                                <td className="p-6"><span className="bg-blue-50 text-blue-700 font-bold text-xs px-3 py-1.5 rounded-xl">{p.jabatan}</span></td>
                                <td className="p-6 text-slate-500 font-mono text-xs">{p.nip || <span className="italic text-slate-300">-</span>}</td>
                                <td className="p-6 text-center"><span className="bg-slate-100 text-slate-600 font-bold text-sm px-3 py-1 rounded-xl">{p.urutan}</span></td>
                                <td className="p-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        {/* Tombol Edit */}
                                        <button onClick={() => setEditTarget(p)} className="p-2.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all" title="Edit"><Edit3 size={16} /></button>
                                        {/* Tombol Hapus dengan konfirmasi */}
                                        <button onClick={() => setDeleteTarget(p)} className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Hapus"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {initialData.length === 0 && (
                            <tr><td colSpan={5} className="p-16 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300"><User size={32} /></div>
                                <p className="text-slate-400 font-bold">Belum ada data perangkat desa.</p>
                                <p className="text-slate-300 text-sm">Klik tombol &quot;Tambah Perangkat&quot; untuk mulai mengisi.</p>
                            </td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Tambah */}
            {showTambah && <PerangkatFormModal mode="tambah" onClose={() => setShowTambah(false)} />}

            {/* Modal Edit */}
            {editTarget && <PerangkatFormModal mode="edit" data={editTarget} onClose={() => setEditTarget(null)} />}

            {/* Dialog Konfirmasi Hapus */}
            {deleteTarget && (
                <ConfirmDialog
                    title="Hapus Perangkat Desa?"
                    desc={`Anda akan menghapus data <strong>${deleteTarget.nama}</strong> (${deleteTarget.jabatan}).<br/><span class="text-red-500 font-semibold text-xs">Tindakan ini tidak bisa dibatalkan.</span>`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                    isPending={isPendingDelete}
                />
            )}
        </div>
    );
}
