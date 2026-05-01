import AdminBannerManager from "@/components/admin/AdminBannerManager";
import prisma from "@/lib/db";
import { Tag, XCircle } from "lucide-react";
import { ModalTambahPotensi } from "@/components/admin/PotensiModals";
import { PotensiRowActions } from "@/components/admin/PotensiRowActions";
export const dynamic = "force-dynamic";

export default async function AdminDaftarPotensiDesaPage() {

  const potensiItems = await prisma.potensiDesa.findMany({
    orderBy: { tanggal: "desc" },
  });

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Kelola Halaman Potensi Desa</h1>
        <p className="text-slate-500">Atur konten untuk halaman Potensi Desa kelurahan.</p>
      </div>



      {/* DAFTAR POTENSI */}
      <section className="pt-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="border-l-4 border-blue-600 pl-3 text-lg font-bold text-slate-700">
            Daftar UMKM & Potensi Desa
          </h2>
          <ModalTambahPotensi />
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-black tracking-widest text-slate-400 uppercase">
                <tr>
                  <th className="p-6">Detail Potensi</th>
                  <th className="p-6">Kategori</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {potensiItems.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-16 text-center font-medium text-slate-400">
                      Belum ada data Potensi Desa. Klik &quot;Tambah UMKM/Potensi&quot; untuk memulai.
                    </td>
                  </tr>
                )}
                {potensiItems.map((item) => (
                  <tr key={item.id} className="group transition-all hover:bg-blue-50/30">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.gambar || "https://placehold.co/80x80/e2e8f0/94a3b8?text=IMG"}
                            alt={item.judul}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="max-w-xs md:max-w-sm">
                          <h3 className="text-[15px] leading-tight font-bold text-slate-800">
                            {item.judul}
                          </h3>
                          <p className="mt-1 truncate text-xs text-slate-500">
                            {item.deskripsiSingkat}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-black tracking-widest text-blue-600 uppercase">
                        <Tag size={12} /> {item.kategori}
                      </span>
                    </td>
                    <td className="p-6">
                      {item.status === "Aktif" ? (
                        <div className="flex w-fit items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-black text-emerald-600 uppercase">
                          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></div>{" "}
                          Aktif
                        </div>
                      ) : (
                        <div className="flex w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-3 py-1.5 text-[10px] font-black text-slate-400 uppercase">
                          <XCircle size={12} /> Nonaktif
                        </div>
                      )}
                    </td>
                    <td className="p-6 text-right">
                      <PotensiRowActions item={item} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
