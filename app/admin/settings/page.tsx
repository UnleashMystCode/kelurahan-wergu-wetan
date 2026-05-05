"use client";

import { useState } from "react";
// Hapus import ArrowLeft & Link karena sudah tidak dipakai
import {
  Plus,
  Trash2,
  Edit2,
  ShieldAlert,
  Search,
  Key,
  Mail,
  X,
  Save,
  User,
  CheckCircle,
  Users,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AdminMock = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

export default function AdminSettingsPage() {
  // --- DATA & LOGIC (Sama seperti sebelumnya) ---
  const [admins, setAdmins] = useState<AdminMock[]>([
    { id: 1, name: "Budi Santoso", email: "budi@desa.go.id", role: "Petugas", status: "Active" },
    { id: 2, name: "Siti Aminah", email: "siti@desa.go.id", role: "Petugas", status: "Inactive" },
    {
      id: 3,
      name: "Rahmat Hidayat",
      email: "rahmat@desa.go.id",
      role: "Super Admin",
      status: "Active",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<AdminMock | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", status: "Active" });
  const [filterStatus, setFilterStatus] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const openAddModal = () => {
    setEditData(null);
    setForm({ name: "", email: "", password: "", status: "Active" });
    setIsModalOpen(true);
  };

  const openEditModal = (admin: AdminMock) => {
    setEditData(admin);
    setForm({ name: admin.name, email: admin.email, password: "", status: admin.status });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editData) {
      setAdmins(admins.map((a) => (a.id === editData.id ? { ...a, ...form, role: a.role } : a)));
    } else {
      const newId = admins.length > 0 ? Math.max(...admins.map((a) => a.id)) + 1 : 1;
      setAdmins([...admins, { id: newId, role: "Petugas", ...form }]);
    }
    setIsModalOpen(false);
    alert("Data berhasil disimpan!");
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus akses admin ini?")) {
      setAdmins(admins.filter((a) => a.id !== id));
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const filteredAdmins =
    filterStatus === "All" ? admins : admins.filter((a) => a.status === filterStatus);
  const totalAdmins = admins.length;
  const activeAdmins = admins.filter((a) => a.status === "Active").length;

  return (
    <div className="space-y-8 pb-10">
      {/* 1. HEADER PAGE (TANPA TOMBOL KEMBALI) */}
      <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm xl:flex-row xl:items-center">
        {/* Judul & Ikon (Langsung di kiri, tanpa panah back) */}
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-500 shadow-sm">
            <ShieldAlert size={32} />
          </div>
          <div>
            <h1 className="text-2xl leading-none font-bold tracking-tight text-slate-900 md:text-3xl">
              Manajemen Admin
            </h1>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-500">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
              <span className="rounded border border-red-100 bg-red-50 px-2 py-0.5 text-xs font-bold text-red-600">
                Super Admin Zone
              </span>
            </p>
          </div>
        </div>

        {/* Tombol Aksi Kanan */}
        <div className="flex w-full flex-wrap gap-3 xl:w-auto">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-blue-600 xl:flex-none">
            <Download size={18} /> Export CSV
          </button>
          <button
            onClick={openAddModal}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-1 hover:bg-blue-700 active:scale-95 xl:flex-none"
          >
            <Plus size={18} /> Tambah Admin
          </button>
        </div>
      </div>

      {/* 2. STATS CARDS (Tetap Sama) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex items-center gap-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Users size={28} />
          </div>
          <div>
            <p className="mb-1 text-xs font-bold tracking-widest text-slate-400 uppercase">
              Total Akun
            </p>
            <h3 className="text-3xl font-extrabold text-slate-800">{totalAdmins}</h3>
          </div>
        </div>
        <div className="flex items-center gap-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <CheckCircle size={28} />
          </div>
          <div>
            <p className="mb-1 text-xs font-bold tracking-widest text-slate-400 uppercase">
              Status Aktif
            </p>
            <h3 className="text-3xl font-extrabold text-slate-800">{activeAdmins}</h3>
          </div>
        </div>
        <div className="flex items-center gap-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
            <ShieldAlert size={28} />
          </div>
          <div>
            <p className="mb-1 text-xs font-bold tracking-widest text-slate-400 uppercase">
              Keamanan
            </p>
            <h3 className="text-lg font-bold text-slate-800">AES-256 Encrypted</h3>
          </div>
        </div>
      </div>

      {/* 3. TABEL DATA (Tetap Sama) */}
      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
        {/* Toolbar */}
        <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/50 p-6 md:flex-row">
          <div className="group relative w-full md:w-80">
            <Search
              className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari nama atau email..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-12 text-sm font-medium transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            />
          </div>

          <div className="flex w-full items-center gap-3 md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-3 pr-10 pl-4 text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 focus:border-blue-500 focus:outline-none"
              >
                <option value="All">Semua Status</option>
                <option value="Active">Hanya Aktif</option>
                <option value="Inactive">Non-Aktif</option>
              </select>
              <Filter
                size={16}
                className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400"
              />
            </div>

            <button
              onClick={handleRefresh}
              className="rounded-xl border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition hover:bg-blue-50 hover:text-blue-600"
              title="Refresh Data"
            >
              <RefreshCw size={20} className={isRefreshing ? "animate-spin text-blue-600" : ""} />
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                <th className="px-8 py-5 text-xs font-bold tracking-widest text-slate-500 uppercase">
                  Admin Info
                </th>
                <th className="px-8 py-5 text-xs font-bold tracking-widest text-slate-500 uppercase">
                  Role
                </th>
                <th className="px-8 py-5 text-xs font-bold tracking-widest text-slate-500 uppercase">
                  Status
                </th>
                <th className="px-8 py-5 text-right text-xs font-bold tracking-widest text-slate-500 uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin) => (
                  <tr key={admin.id} className="group transition-colors hover:bg-blue-50/40">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold shadow-sm ${admin.id % 2 === 0 ? "bg-indigo-100 text-indigo-600" : "bg-pink-100 text-pink-600"}`}
                        >
                          {admin.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                            {admin.name}
                          </p>
                          <p className="text-xs font-medium text-slate-500">{admin.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`rounded-lg border px-3 py-1 text-xs font-bold ${admin.role === "Super Admin" ? "border-red-100 bg-red-50 text-red-600" : "border-slate-200 bg-slate-100 text-slate-600"}`}
                      >
                        {admin.role}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${
                          admin.status === "Active"
                            ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 bg-slate-100 text-slate-500"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${admin.status === "Active" ? "animate-pulse bg-emerald-500" : "bg-slate-400"}`}
                        ></span>
                        {admin.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-80 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() => openEditModal(admin)}
                          className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(admin.id)}
                          className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-16 text-center">
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. MODAL POPUP (Tetap Sama) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-8 py-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {editData ? "Edit Data Admin" : "Tambah Admin Baru"}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Pastikan data yang dimasukkan sudah benar.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-500 transition hover:bg-red-100 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-5 p-8">
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-slate-700 uppercase">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-11 text-sm font-medium text-slate-700 transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      placeholder="Contoh: Budi Santoso"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-slate-700 uppercase">
                    Email Login
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="email"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-11 text-sm font-medium text-slate-700 transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      placeholder="nama@desa.go.id"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs font-bold tracking-wider text-slate-700 uppercase">
                      {editData ? "Reset Pass" : "Password"}
                    </label>
                    <div className="relative">
                      <Key
                        size={18}
                        className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="password"
                        required={!editData}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-11 text-sm font-medium text-slate-700 transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold tracking-wider text-slate-700 uppercase">
                      Status
                    </label>
                    <select
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Blokir</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                  >
                    <Save size={18} /> Simpan Data
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
