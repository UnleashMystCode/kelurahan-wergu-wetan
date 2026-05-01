import { 
  Users, 
  FileText, 
  Image as ImageIcon,
  Activity,
  ArrowUpRight,
  MessageSquare,
  Globe,
  BellRing
} from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/db";

export default async function DashboardPage() {
  // Fetch real stats
  const totalBerita = await prisma.kegiatan.count();
  const totalPotensi = await prisma.potensiDesa.count();
  const totalPesan = await prisma.pesanMasuk.count();
  const totalSurat = await prisma.pengajuanSurat.count();
  const unreadPesan = await prisma.pesanMasuk.count({ where: { status: "Belum Dibaca" } });
  const pendingSurat = await prisma.pengajuanSurat.count({ where: { status: "Pending" } });

  const recentPesan = await prisma.pesanMasuk.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white shadow-xl shadow-blue-900/20">
        <div className="absolute -right-10 -top-10 opacity-10">
          <Globe size={200} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight">
            Selamat Datang di Mission Control
          </h1>
          <p className="mb-8 text-lg font-medium text-blue-100">
            Kelola seluruh layanan, informasi, dan komunikasi warga Desa Wergu Wetan secara real-time dari satu tempat.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/admin/halaman/berita" 
              className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-blue-700 shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-xl"
            >
              Buat Pengumuman <ArrowUpRight size={18} />
            </Link>
            <Link 
              href="/admin/pesan-masuk" 
              className="flex items-center gap-2 rounded-lg border border-blue-400/30 bg-blue-700/50 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-blue-700/80"
            >
              <BellRing size={18} /> Cek Kotak Masuk
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Statistik Real-time */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Pengajuan Surat" 
          value={totalSurat.toString()} 
          sub={pendingSurat > 0 ? `${pendingSurat} perlu diproses` : "Semua selesai"} 
          icon={FileText} 
          color="blue" 
          alert={pendingSurat > 0}
        />
        <StatCard 
          title="Pesan Masuk" 
          value={totalPesan.toString()} 
          sub={unreadPesan > 0 ? `${unreadPesan} belum dibaca` : "Semua terbaca"} 
          icon={MessageSquare} 
          color="rose"
          alert={unreadPesan > 0}
        />
        <StatCard 
          title="Berita & Artikel" 
          value={totalBerita.toString()} 
          sub="Update informasi terbaru" 
          icon={Activity} 
          color="emerald" 
        />
        <StatCard 
          title="Potensi Desa" 
          value={totalPotensi.toString()} 
          sub="UMKM dan Lokasi Ikonik" 
          icon={ImageIcon} 
          color="amber" 
        />
      </div>

      {/* 3. Panel Aktivitas & Akses Cepat */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Aktivitas Pesan */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-800">Aktivitas Terkini (Pesan Masuk)</h2>
            <Link href="/admin/pesan-masuk" className="text-sm font-bold text-blue-600 hover:text-blue-700">Lihat Semua</Link>
          </div>
          <div className="space-y-4">
            {recentPesan.length > 0 ? (
              recentPesan.map((pesan) => (
                <div key={pesan.id} className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 transition-colors hover:border-slate-200 hover:bg-slate-100">
                  <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${pesan.status === "Belum Dibaca" ? "bg-rose-100 text-rose-600" : "bg-slate-200 text-slate-500"}`}>
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-800">{pesan.nama}</h4>
                      {pesan.status === "Belum Dibaca" && (
                        <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase">Baru</span>
                      )}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-600">{pesan.pesan}</p>
                    <p className="mt-2 text-xs font-medium text-slate-400">
                      {new Date(pesan.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="rounded-full bg-slate-100 p-4 text-slate-400">
                  <MessageSquare size={32} />
                </div>
                <p className="mt-4 font-medium text-slate-500">Belum ada pesan masuk.</p>
              </div>
            )}
          </div>
        </div>

        {/* Akses Cepat */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 border-b border-slate-100 pb-4 text-lg font-bold text-slate-800">Akses Cepat</h2>
          <div className="flex flex-col gap-3">
            <QuickLink href="/admin/halaman/layanan" icon={FileText} label="Kelola Layanan" color="blue" />
            <QuickLink href="/admin/halaman/tentang-kami/struktur" icon={Users} label="Struktur Organisasi" color="emerald" />
            <QuickLink href="/admin/halaman/kontak" icon={Globe} label="Informasi Kontak" color="slate" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, sub, icon: Icon, color, alert }: any) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      {alert && (
        <span className="absolute right-3 top-3 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-rose-500"></span>
        </span>
      )}
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${colorMap[color]}`}>
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-800">{value}</h3>
          <p className="text-sm font-bold text-slate-500">{title}</p>
        </div>
      </div>
      <p className="mt-4 text-xs font-medium text-slate-400">{sub}</p>
    </div>
  );
}

function QuickLink({ href, icon: Icon, label, color }: any) {
  const colorMap: Record<string, string> = {
    blue: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200",
    emerald: "hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200",
    slate: "hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300",
  };

  return (
    <Link href={href} className={`group flex items-center justify-between rounded-xl border border-slate-100 p-4 transition-all ${colorMap[color]}`}>
      <div className="flex items-center gap-3">
        <Icon size={18} className="text-slate-400 transition-colors group-hover:text-inherit" />
        <span className="font-bold text-slate-600 transition-colors group-hover:text-inherit">{label}</span>
      </div>
      <ArrowUpRight size={16} className="text-slate-300 transition-all group-hover:text-inherit group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}
