import prisma from "@/lib/db";
import AdminStrukturClient from "@/components/admin/AdminStrukturClient";

export const dynamic = "force-dynamic";

export default async function AdminStrukturPage() {
  const perangkat = await prisma.perangkatDesa.findMany({ orderBy: { urutan: "asc" } });

  // Serialisasi data (ganti Date ke string agar bisa ke Client Component)
  const data = perangkat.map((p) => ({
    id: p.id,
    nama: p.nama,
    jabatan: p.jabatan,
    nip: p.nip,
    foto: p.foto,
    urutan: p.urutan,
  }));

  return <AdminStrukturClient initialData={data} />;
}
