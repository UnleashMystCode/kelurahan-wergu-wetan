import AdminHomeFeatures from "@/components/admin/AdminHomeFeatures";
import prisma from "@/lib/db";
export const dynamic = 'force-dynamic';

export default async function AdminSambutanPage() {
  const welcome = await prisma.homeWelcome.findFirst();

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sambutan Lurah</h1>
        <p className="text-slate-500">Isi data dan tanda tangan animasi untuk halaman utama.</p>
      </div>

      <AdminHomeFeatures welcome={welcome} onlyTab="sambutan" />
    </div>
  );
}
