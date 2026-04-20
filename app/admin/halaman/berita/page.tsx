import prisma from "@/lib/db";
import { Tag, Calendar, User, XCircle } from "lucide-react";
import { BeritaRowActions } from "@/components/admin/BeritaRowActions";
import { ModalTambahBerita } from "@/components/admin/ModalTambahBerita";

export const dynamic = "force-dynamic";

export default async function AdminBeritaPage() {
    const kegiatan = await prisma.kegiatan.findMany({
        orderBy: { tanggal: "desc" }
    });

    return (
        <div className="p-4 space-y-8">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Pusat Warta Desa</h1>
                    <p className="text-slate-500 font-medium">Kelola publikasi, kategori genre, dan status artikel warga.</p>
                </div>
                {/* Client Component — modal tambah */}
                <ModalTambahBerita />
            </div>

            {/* TABEL */}
            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-black uppercase tracking-widest text-slate-400">
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
                                    <td colSpan={4} className="p-16 text-center text-slate-400 font-medium">
                                        Belum ada berita. Klik &quot;Tulis Berita Baru&quot; untuk memulai.
                                    </td>
                                </tr>
                            )}
                            {kegiatan.map((item) => (
                                <tr key={item.id} className="hover:bg-blue-50/30 transition-all group">
                                    <td className="p-8">
                                        <div className="flex items-center gap-5">
                                            <div className="w-20 h-20 bg-slate-100 rounded-3xl overflow-hidden shrink-0 border border-slate-100">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={item.gambar || "https://placehold.co/80x80/e2e8f0/94a3b8?text=IMG"} alt={item.judul} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="max-w-xs md:max-w-md">
                                                <h3 className="font-bold text-slate-800 text-lg leading-tight">{item.judul}</h3>
                                                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5"><User size={12} /> Penulis: <span className="font-bold text-slate-500">{item.penulis}</span></p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex flex-col gap-2">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100 w-fit">
                                                <Tag size={12} /> {item.kategori}
                                            </span>
                                            <p className="text-[12px] text-slate-400 font-bold flex items-center gap-1.5">
                                                <Calendar size={14} /> {item.tanggal.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        {item.status === "Aktif" ? (
                                            <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 w-fit">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Live
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase bg-slate-100 px-4 py-2 rounded-2xl border border-slate-200 w-fit">
                                                <XCircle size={14} /> Takedown
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-8 text-right">
                                        <BeritaRowActions item={{
                                            id: item.id,
                                            judul: item.judul,
                                            isi: item.isi,
                                            gambar: item.gambar,
                                            kategori: item.kategori,
                                            penulis: item.penulis,
                                            status: item.status,
                                            slug: item.slug,
                                        }} />
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