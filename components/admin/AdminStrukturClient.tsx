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
function ConfirmDialog({
  title,
  desc,
  onConfirm,
  onCancel,
  isPending,
}: {
  title: string;
  desc: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      onClick={() => !isPending && onCancel()}
    >
      <div
        className="animate-in zoom-in-90 w-full max-w-sm rounded-xl bg-white p-8 shadow-2xl duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 text-red-500">
          <AlertTriangle size={28} />
        </div>
        <h3 className="mb-2 text-center text-lg font-black text-slate-800">{title}</h3>
        <p
          className="mb-6 text-center text-sm text-slate-500"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isPending}
            className="flex-1 rounded-xl bg-slate-100 py-3 font-bold text-slate-600 transition hover:bg-slate-200"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-black text-white shadow-lg shadow-red-100 transition hover:bg-red-700"
          >
            {isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
            {isPending ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== MODAL FORM (TAMBAH / EDIT) =====
function PerangkatFormModal({
  mode,
  data,
  onClose,
}: {
  mode: "tambah" | "edit";
  data?: Perangkat;
  onClose: () => void;
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
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={() => !isPending && onClose()}
    >
      <div
        className="animate-in zoom-in-95 w-full max-w-lg rounded-[2.5rem] bg-white p-8 shadow-2xl duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-800">
              {mode === "edit" ? "✏️ Edit Perangkat Desa" : "➕ Tambah Perangkat Desa"}
            </h2>
            <p className="mt-0.5 text-xs text-slate-400">
              Isi data yang akan ditampilkan di halaman Profil.
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isPending}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
              Nama Lengkap *
            </label>
            <input
              name="nama"
              required
              defaultValue={data?.nama || ""}
              className="w-full rounded-xl border-2 border-transparent bg-slate-50 p-4 font-bold text-slate-900 transition outline-none focus:border-blue-500/30"
              placeholder="Contoh: Drs. Ahmad Fauzi, M.Si"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                Jabatan *
              </label>
              <input
                name="jabatan"
                required
                defaultValue={data?.jabatan || ""}
                className="w-full rounded-xl border-2 border-transparent bg-slate-50 p-4 font-bold text-slate-900 transition outline-none focus:border-blue-500/30"
                placeholder="Lurah / Sekdes / Kasi..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                Urutan Tampil
              </label>
              <input
                name="urutan"
                type="number"
                defaultValue={data?.urutan ?? 100}
                className="w-full rounded-xl border-2 border-transparent bg-slate-50 p-4 font-bold text-slate-900 transition outline-none focus:border-blue-500/30"
                placeholder="1 = Lurah"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
              NIP (Opsional)
            </label>
            <input
              name="nip"
              defaultValue={data?.nip || ""}
              className="w-full rounded-xl border-2 border-transparent bg-slate-50 p-4 font-mono text-slate-900 transition outline-none focus:border-blue-500/30"
              placeholder="197001012000121001"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
              URL Foto (Opsional)
            </label>
            <input
              name="foto"
              type="url"
              defaultValue={data?.foto || ""}
              className="w-full rounded-xl border-2 border-transparent bg-slate-50 p-4 font-bold text-slate-900 transition outline-none focus:border-blue-500/30"
              placeholder="https://..."
            />
          </div>
          {/* Preview foto */}
          {data?.foto && (
            <img
              src={data.foto}
              alt="preview"
              className="h-16 w-16 rounded-xl border border-slate-100 object-cover"
            />
          )}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 rounded-xl bg-slate-100 py-3.5 font-bold text-slate-500 transition hover:bg-slate-200"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-70"
            >
              {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isPending
                ? "Menyimpan..."
                : mode === "edit"
                  ? "Simpan Perubahan"
                  : "Tambah Perangkat"}
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
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Struktur Organisasi</h1>
          <p className="mt-1 text-sm text-slate-500">
            Kelola data Lurah dan Perangkat Desa yang tampil di halaman Profil.
          </p>
        </div>
        <button
          onClick={() => setShowTambah(true)}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-95"
        >
          <Plus size={18} strokeWidth={3} /> Tambah Perangkat
        </button>
      </div>

      {/* Tabel */}
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="border-b border-slate-100 bg-slate-50 text-[10px] font-black tracking-widest text-slate-400 uppercase">
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
              <tr key={p.id} className="group transition-all hover:bg-blue-50/20">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      {p.foto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.foto} alt={p.nama} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-300">
                          <User size={24} />
                        </div>
                      )}
                    </div>
                    <span className="font-bold text-slate-800">{p.nama}</span>
                  </div>
                </td>
                <td className="p-6">
                  <span className="rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                    {p.jabatan}
                  </span>
                </td>
                <td className="p-6 font-mono text-xs text-slate-500">
                  {p.nip || <span className="text-slate-300 italic">-</span>}
                </td>
                <td className="p-6 text-center">
                  <span className="rounded-xl bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
                    {p.urutan}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <div className="flex justify-end gap-2">
                    {/* Tombol Edit */}
                    <button
                      onClick={() => setEditTarget(p)}
                      className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-amber-50 hover:text-amber-600"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    {/* Tombol Hapus dengan konfirmasi */}
                    <button
                      onClick={() => setDeleteTarget(p)}
                      className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-red-50 hover:text-red-600"
                      title="Hapus"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {initialData.length === 0 && (
              <tr>
                <td colSpan={5} className="p-16 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                    <User size={32} />
                  </div>
                  <p className="font-bold text-slate-400">Belum ada data perangkat desa.</p>
                  <p className="text-sm text-slate-300">
                    Klik tombol &quot;Tambah Perangkat&quot; untuk mulai mengisi.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah */}
      {showTambah && <PerangkatFormModal mode="tambah" onClose={() => setShowTambah(false)} />}

      {/* Modal Edit */}
      {editTarget && (
        <PerangkatFormModal mode="edit" data={editTarget} onClose={() => setEditTarget(null)} />
      )}

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
