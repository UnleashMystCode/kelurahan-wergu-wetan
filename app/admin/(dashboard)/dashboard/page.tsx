import { Users, FileText, Image as ImageIcon } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-800">Dashboard Ringkasan</h1>

      {/* Contoh Kartu Statistik Sederhana */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3 text-blue-600">
              <Users />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Pengunjung</p>
              <h3 className="text-2xl font-bold text-slate-800">12,450</h3>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-3 text-green-600">
              <FileText />
            </div>
            <div>
              <p className="text-sm text-slate-500">Layanan Surat</p>
              <h3 className="text-2xl font-bold text-slate-800">85</h3>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-purple-100 p-3 text-purple-600">
              <ImageIcon />
            </div>
            <div>
              <p className="text-sm text-slate-500">Banner Aktif</p>
              <h3 className="text-2xl font-bold text-slate-800">4</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="mb-2 text-lg font-bold text-blue-800">Selamat Datang, Admin!</h2>
        <p className="text-slate-600">
          Silakan pilih menu <span className="font-bold">"Kelola Halaman"</span> di sidebar sebelah
          kiri untuk mulai mengupdate konten website (Beranda, Profil, dll).
        </p>
      </div>
    </div>
  );
}
