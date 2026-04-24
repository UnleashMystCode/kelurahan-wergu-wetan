import prisma from "@/lib/db";
import { Tag, Calendar, User, XCircle } from "lucide-react";
import { BeritaRowActions } from "@/components/admin/BeritaRowActions";
import { ModalTambahBerita } from "@/components/admin/ModalTambahBerita";

export const dynamic = "force-dynamic";

export default async function AdminBeritaPage() {
  const kegiatan = await prisma.kegiatan.findMany({
    orderBy: { tanggal: "desc" },
  });

  return (
    <div className="space-y-8 p-4">
      {/* HEADER */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800">Pusat Warta Desa</h1>
          <p className="font-medium text-slate-500">
            Kelola publikasi, kategori genre, dan status artikel warga.
          </p>
        </div>
        {/* Client Component — modal tambah */}
        <ModalTambahBerita />
      </div>

      {/* TABEL */}
      <div className="overflow-hidden rounded-[3rem] border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-black tracking-widest text-slate-400 uppercase">
              <tr>
                <th className="p-8">Detail Konten</th>
                <th className="p-8">Metadata &amp; Tag</th>
                <th className="p-8">Status</th>
                <th className="p-8 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {kegiatan.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-16 text-center font-medium text-slate-400">
                    Belum ada berita. Klik &quot;Tulis Berita Baru&quot; untuk memulai.
                  </td>
                </tr>
              )}
              {kegiatan.map((item) => (
                <tr key={item.id} className="group transition-all hover:bg-blue-50/30">
                  <td className="p-8">
                    <div className="flex items-center gap-5">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-3xl border border-slate-100 bg-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.gambar || "https://placehold.co/80x80/e2e8f0/94a3b8?text=IMG"}
                          alt={item.judul}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="max-w-xs md:max-w-md">
                        <h3 className="text-lg leading-tight font-bold text-slate-800">
                          {item.judul}
                        </h3>
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                          <User size={12} /> Penulis:{" "}
                          <span className="font-bold text-slate-500">{item.penulis}</span>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex flex-col gap-2">
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-black tracking-widest text-blue-600 uppercase">
                        <Tag size={12} /> {item.kategori}
                      </span>
                      <p className="flex items-center gap-1.5 text-[12px] font-bold text-slate-400">
                        <Calendar size={14} />{" "}
                        {item.tanggal.toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </td>
                  <td className="p-8">
                    {item.status === "Aktif" ? (
                      <div className="flex w-fit items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-2 text-[10px] font-black text-emerald-600 uppercase">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>{" "}
                        Live
                      </div>
                    ) : (
                      <div className="flex w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-[10px] font-black text-slate-400 uppercase">
                        <XCircle size={14} /> Takedown
                      </div>
                    )}
                  </td>
                  <td className="p-8 text-right">
                    <BeritaRowActions
                      item={{
                        id: item.id,
                        judul: item.judul,
                        isi: item.isi,
                        gambar: item.gambar,
                        kategori: item.kategori,
                        penulis: item.penulis,
                        status: item.status,
                        slug: item.slug,
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
