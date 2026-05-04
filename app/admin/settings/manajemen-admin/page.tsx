"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, UserPlus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ManajemenAdminPage() {
  const [admins, setAdmins] = useState([
    { id: 1, username: "superadmin", namaLengkap: "Super Administrator", role: "super" }
  ]);

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Akses Admin</h1>
          <p className="mt-1 text-sm text-slate-500">
            Hanya Super Admin yang dapat menambah atau menghapus petugas.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 shadow-sm">
          <UserPlus size={18} />
          Tambah Petugas
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Nama Lengkap</th>
              <th className="px-6 py-4 font-medium">Username / NIP</th>
              <th className="px-6 py-4 font-medium">Tingkat Akses</th>
              <th className="px-6 py-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-800">{admin.namaLengkap}</td>
                <td className="px-6 py-4">{admin.username}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${admin.role === "super" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}
                  >
                    {admin.role === "super" ? <ShieldAlert size={14} /> : <ShieldCheck size={14} />}
                    {admin.role === "super" ? "Super Admin" : "Petugas (Admin)"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => toast.error("Fitur Hapus belum diimplementasi di API")}
                    className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
