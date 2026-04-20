"use client";

import { useState } from "react";
// Hapus import ArrowLeft & Link karena sudah tidak dipakai
import { 
  Plus, Trash2, Edit2, ShieldAlert, Search, Key, Mail, X, Save, User, 
  CheckCircle, Users, Download, Filter, RefreshCw 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSettingsPage() {
  // --- DATA & LOGIC (Sama seperti sebelumnya) ---
  const [admins, setAdmins] = useState([
    { id: 1, name: "Budi Santoso", email: "budi@desa.go.id", role: "Petugas", status: "Active" },
    { id: 2, name: "Siti Aminah", email: "siti@desa.go.id", role: "Petugas", status: "Inactive" },
    { id: 3, name: "Rahmat Hidayat", email: "rahmat@desa.go.id", role: "Super Admin", status: "Active" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", status: "Active" });
  const [filterStatus, setFilterStatus] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const openAddModal = () => {
    setEditData(null);
    setForm({ name: "", email: "", password: "", status: "Active" });
    setIsModalOpen(true);
  };

  const openEditModal = (admin: any) => {
    setEditData(admin);
    setForm({ name: admin.name, email: admin.email, password: "", status: admin.status });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editData) {
      setAdmins(admins.map(a => a.id === editData.id ? { ...a, ...form, role: a.role } : a));
    } else {
      const newId = admins.length > 0 ? Math.max(...admins.map(a => a.id)) + 1 : 1;
      setAdmins([...admins, { id: newId, role: "Petugas", ...form }]);
    }
    setIsModalOpen(false);
    alert("Data berhasil disimpan!");
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus akses admin ini?")) {
      setAdmins(admins.filter(a => a.id !== id));
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const filteredAdmins = filterStatus === "All" 
    ? admins 
    : admins.filter(a => a.status === filterStatus);
  const totalAdmins = admins.length;
  const activeAdmins = admins.filter(a => a.status === "Active").length;

  return (
    <div className="space-y-8 pb-10">
      
      {/* 1. HEADER PAGE (TANPA TOMBOL KEMBALI) */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
        
        {/* Judul & Ikon (Langsung di kiri, tanpa panah back) */}
        <div className="flex items-center gap-5">
           <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shadow-sm border border-red-100">
              <ShieldAlert size={32} />
           </div>
           <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-none">Manajemen Admin</h1>
              <p className="text-slate-500 text-sm mt-1.5 font-medium flex items-center gap-1.5">
                 <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse"></span>
                 <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded text-xs border border-red-100">Super Admin Zone</span>
              </p>
           </div>
        </div>

        {/* Tombol Aksi Kanan */}
        <div className="flex flex-wrap gap-3 w-full xl:w-auto">
            <button className="px-5 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-50 hover:text-blue-600 transition flex items-center gap-2 shadow-sm flex-1 xl:flex-none justify-center">
                <Download size={18} /> Export CSV
            </button>
            <button 
                onClick={openAddModal}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95 flex-1 xl:flex-none justify-center"
            >
                <Plus size={18} /> Tambah Admin
            </button>
        </div>
      </div>

      {/* 2. STATS CARDS (Tetap Sama) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-all">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <Users size={28} />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Akun</p>
            <h3 className="text-3xl font-extrabold text-slate-800">{totalAdmins}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-all">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <CheckCircle size={28} />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Status Aktif</p>
            <h3 className="text-3xl font-extrabold text-slate-800">{activeAdmins}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-all">
          <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
            <ShieldAlert size={28} />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Keamanan</p>
            <h3 className="text-lg font-bold text-slate-800">AES-256 Encrypted</h3>
          </div>
        </div>
      </div>

      {/* 3. TABEL DATA (Tetap Sama) */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-4 items-center bg-slate-50/50">
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Cari nama atau email..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" 
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative flex-1 md:flex-none">
                <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-200 text-slate-600 text-sm font-bold py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:border-blue-500 hover:bg-slate-50 cursor-pointer shadow-sm"
                >
                    <option value="All">Semua Status</option>
                    <option value="Active">Hanya Aktif</option>
                    <option value="Inactive">Non-Aktif</option>
                </select>
                <Filter size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
             </div>

             <button 
                onClick={handleRefresh}
                className="p-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition shadow-sm" 
                title="Refresh Data"
             >
                <RefreshCw size={20} className={isRefreshing ? "animate-spin text-blue-600" : ""} />
             </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Admin Info</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Role</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-blue-50/40 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm
                          ${admin.id % 2 === 0 ? 'bg-indigo-100 text-indigo-600' : 'bg-pink-100 text-pink-600'}`}>
                          {admin.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{admin.name}</p>
                          <p className="text-xs text-slate-500 font-medium">{admin.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`text-xs font-bold px-3 py-1 rounded-lg border
                        ${admin.role === 'Super Admin' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                           {admin.role}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-2 border
                        ${admin.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        <span className={`w-2 h-2 rounded-full ${admin.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span> 
                        {admin.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEditModal(admin)} className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 rounded-xl transition-all shadow-sm">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(admin.id)} className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 rounded-xl transition-all shadow-sm">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-16 text-center">Data tidak ditemukan</td>
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
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden z-10"
            >
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div>
                   <h3 className="text-xl font-bold text-slate-800">{editData ? "Edit Data Admin" : "Tambah Admin Baru"}</h3>
                   <p className="text-xs text-slate-500 mt-1">Pastikan data yang dimasukkan sudah benar.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-red-100 hover:text-red-500 transition"><X size={20} /></button>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-2 block uppercase tracking-wider">Nama Lengkap</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" required 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                      placeholder="Contoh: Budi Santoso"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-2 block uppercase tracking-wider">Email Login</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="email" required 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                      placeholder="nama@desa.go.id"
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-slate-700 mb-2 block uppercase tracking-wider">{editData ? "Reset Pass" : "Password"}</label>
                        <div className="relative">
                            <Key size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                            type="password" 
                            required={!editData} 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) => setForm({...form, password: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-700 mb-2 block uppercase tracking-wider">Status</label>
                        <select 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                            value={form.status}
                            onChange={(e) => setForm({...form, status: e.target.value})}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Blokir</option>
                        </select>
                    </div>
                </div>
                <div className="pt-6 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-50 transition">Batal</button>
                  <button type="submit" className="flex-1 px-4 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
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