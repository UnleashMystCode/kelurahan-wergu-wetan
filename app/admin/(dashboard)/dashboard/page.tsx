import { Users, FileText, Image as ImageIcon } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard Ringkasan</h1>
      
      {/* Contoh Kartu Statistik Sederhana */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
           <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600"><Users /></div>
              <div>
                 <p className="text-slate-500 text-sm">Total Pengunjung</p>
                 <h3 className="text-2xl font-bold text-slate-800">12,450</h3>
              </div>
           </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
           <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-600"><FileText /></div>
              <div>
                 <p className="text-slate-500 text-sm">Layanan Surat</p>
                 <h3 className="text-2xl font-bold text-slate-800">85</h3>
              </div>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
           <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full text-purple-600"><ImageIcon /></div>
              <div>
                 <p className="text-slate-500 text-sm">Banner Aktif</p>
                 <h3 className="text-2xl font-bold text-slate-800">4</h3>
              </div>
           </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
        <h2 className="font-bold text-blue-800 text-lg mb-2">Selamat Datang, Admin!</h2>
        <p className="text-slate-600">Silakan pilih menu <span className="font-bold">"Kelola Halaman"</span> di sidebar sebelah kiri untuk mulai mengupdate konten website (Beranda, Profil, dll).</p>
      </div>
    </div>
  );
}