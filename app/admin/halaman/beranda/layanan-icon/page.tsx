import AdminHomeFeatures from "@/components/admin/AdminHomeFeatures";
import prisma from "@/lib/db";
export const dynamic = 'force-dynamic';

export default async function AdminLayananIconPage() {
  const services = await prisma.homeService.findMany();

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Layanan Cepat (Icon)</h1>
        <p className="text-slate-500">Atur jalan pintas layanan (Icon dan Link) di halaman depan.</p>
      </div>

      <AdminHomeFeatures services={services} onlyTab="layanan" />
    </div>
  );
}
