"use client";

import { useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  UserPlus,
  Trash2,
  Edit2,
  X,
  Save,
  Key,
  User,
  Loader2,
  Search,
} from "lucide-react";
import {
  tambahAdmin,
  editAdmin,
  hapusAdmin,
  type AdminListItem,
} from "@/actions/admin.action";

// ─── Props ────────────────────────────────────────────────────────────────────

interface ManajemenAdminClientProps {
  admins: AdminListItem[];
  currentUserId: number; // ID admin yang sedang login (dari JWT)
}

// ─── Modal Form ───────────────────────────────────────────────────────────────

type ModalMode = "tambah" | "edit";

interface ModalState {
  open: boolean;
  mode: ModalMode;
  target: AdminListItem | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ManajemenAdminClient({
  admins: initialAdmins,
  currentUserId,
}: ManajemenAdminClientProps) {
  const [admins, setAdmins] = useState<AdminListItem[]>(initialAdmins);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalState>({
    open: false,
    mode: "tambah",
    target: null,
  });
  const [isPending, startTransition] = useTransition();

  // ── Filter ──────────────────────────────────────────────────────────────────

  const filtered = admins.filter(
    (a) =>
      a.namaLengkap.toLowerCase().includes(search.toLowerCase()) ||
      a.username.toLowerCase().includes(search.toLowerCase())
  );

  // ── Modal Helpers ────────────────────────────────────────────────────────────

  const openTambah = () =>
    setModal({ open: true, mode: "tambah", target: null });

  const openEdit = (admin: AdminListItem) =>
    setModal({ open: true, mode: "edit", target: admin });

  const closeModal = () =>
    setModal({ open: false, mode: "tambah", target: null });

  // ── Delete ──────────────────────────────────────────────────────────────────

  const handleHapus = (admin: AdminListItem) => {
    if (admin.id === currentUserId) {
      toast.error("Tidak bisa menghapus akun Anda sendiri");
      return;
    }
    if (!confirm(`Hapus admin "${admin.namaLengkap}" (${admin.username})?`))
      return;

    startTransition(async () => {
      const res = await hapusAdmin(admin.id);
      if (res.success) {
        toast.success(res.message);
        setAdmins((prev) => prev.filter((a) => a.id !== admin.id));
      } else {
        toast.error(res.message);
      }
    });
  };

  // ── Submit Form ──────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res =
        modal.mode === "tambah"
          ? await tambahAdmin(formData)
          : await editAdmin(formData);

      if (res.success) {
        toast.success(res.message);
        closeModal();
        // Optimistic: reload data via page refresh (Next.js revalidatePath handles it)
        window.location.reload();
      } else {
        toast.error(res.message);
      }
    });
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ─── HEADER ─────────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Manajemen Akses Admin
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Hanya Super Admin yang dapat menambah atau menghapus petugas.
          </p>
        </div>
        <button
          onClick={openTambah}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 active:scale-95"
        >
          <UserPlus size={18} /> Tambah Petugas
        </button>
      </div>

      {/* ─── STATS ──────────────────────────────────────────────────── */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Admin"
          value={admins.length}
          color="blue"
        />
        <StatCard
          label="Super Admin"
          value={admins.filter((a) => a.role === "super").length}
          color="red"
        />
        <StatCard
          label="Petugas (Admin)"
          value={admins.filter((a) => a.role === "admin").length}
          color="emerald"
        />
      </div>

      {/* ─── SEARCH ─────────────────────────────────────────────────── */}
      <div className="relative mb-4">
        <Search
          size={18}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama atau username..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-11 text-sm font-medium text-slate-700 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        />
      </div>

      {/* ─── TABLE ──────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="border-b border-slate-100 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-4">Nama Lengkap</th>
              <th className="px-6 py-4">Username</th>
              <th className="px-6 py-4">Tingkat Akses</th>
              <th className="px-6 py-4">Bergabung</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.length > 0 ? (
              filtered.map((admin) => (
                <tr
                  key={admin.id}
                  className="group transition-colors hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                          admin.role === "super"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {admin.namaLengkap.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-slate-800">
                        {admin.namaLengkap}
                        {admin.id === currentUserId && (
                          <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-600">
                            ANDA
                          </span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">
                    {admin.username}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        admin.role === "super"
                          ? "bg-red-50 text-red-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {admin.role === "super" ? (
                        <ShieldAlert size={12} />
                      ) : (
                        <ShieldCheck size={12} />
                      )}
                      {admin.role === "super" ? "Super Admin" : "Petugas"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">
                    {new Date(admin.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-70 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => openEdit(admin)}
                        className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        title="Edit"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleHapus(admin)}
                        disabled={admin.id === currentUserId || isPending}
                        className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                        title={
                          admin.id === currentUserId
                            ? "Tidak bisa hapus akun sendiri"
                            : "Hapus"
                        }
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-16 text-center text-sm text-slate-400"
                >
                  Tidak ada admin yang cocok dengan pencarian.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ─── MODAL ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <h2 className="text-lg font-bold text-slate-800">
                  {modal.mode === "tambah"
                    ? "Tambah Admin Baru"
                    : `Edit: ${modal.target?.namaLengkap}`}
                </h2>
                <button
                  onClick={closeModal}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-red-100 hover:text-red-500"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="space-y-4 p-6">
                {/* Hidden: ID untuk mode edit */}
                {modal.mode === "edit" && modal.target && (
                  <input
                    type="hidden"
                    name="id"
                    value={modal.target.id}
                  />
                )}

                {/* Nama Lengkap */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      name="namaLengkap"
                      type="text"
                      required
                      defaultValue={modal.target?.namaLengkap ?? ""}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-800 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Username — hanya saat tambah */}
                {modal.mode === "tambah" && (
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                      Username
                    </label>
                    <input
                      name="username"
                      type="text"
                      required
                      placeholder="Contoh: budi_petugas"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 font-mono text-sm text-slate-800 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    />
                    <p className="mt-1 text-[11px] text-slate-400">
                      Hanya huruf kecil, angka, dan underscore (_)
                    </p>
                  </div>
                )}

                {/* Role */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Tingkat Akses
                  </label>
                  <select
                    name="role"
                    defaultValue={modal.target?.role ?? "admin"}
                    className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm font-medium text-slate-800 transition focus:border-blue-500 focus:bg-white focus:outline-none"
                  >
                    <option value="admin">Petugas (Admin Biasa)</option>
                    <option value="super">Super Admin</option>
                  </select>
                </div>

                {/* Password */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                    {modal.mode === "edit"
                      ? "Reset Password (kosongkan jika tidak ingin diubah)"
                      : "Password"}
                  </label>
                  <div className="relative">
                    <Key
                      size={16}
                      className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      name="password"
                      type="password"
                      required={modal.mode === "tambah"}
                      placeholder={
                        modal.mode === "edit"
                          ? "Biarkan kosong jika tidak diubah"
                          : "Min. 6 karakter"
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-800 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-70"
                  >
                    {isPending ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}
                    {modal.mode === "tambah" ? "Simpan Admin" : "Update Data"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "blue" | "red" | "emerald";
}) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    red: "bg-red-50 text-red-700 border-red-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };
  return (
    <div
      className={`rounded-xl border p-4 ${colorMap[color]} flex items-center gap-3`}
    >
      <p className="text-3xl font-black">{value}</p>
      <p className="text-xs font-bold leading-tight">{label}</p>
    </div>
  );
}
