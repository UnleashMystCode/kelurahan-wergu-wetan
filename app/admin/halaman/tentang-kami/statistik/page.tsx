import AdminHomeFeatures from "@/components/admin/AdminHomeFeatures";
import prisma from "@/lib/db";
export const dynamic = 'force-dynamic';

export default async function AdminStatistikPage() {
  const stats = await prisma.homeStatistic.findMany();

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Manajemen Statistik &amp; Monografi</h1>
        <p className="text-slate-500 text-sm">Upload Data GSheet / CSV untuk angka demografi yang tampil di halaman Tentang Kami.</p>
      </div>

      <AdminHomeFeatures stats={stats} onlyTab="statistik" />
    </div>
  );
}
