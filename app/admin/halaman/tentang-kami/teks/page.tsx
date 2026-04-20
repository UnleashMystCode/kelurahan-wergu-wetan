import prisma from "@/lib/db";
import { FileText, Save, Target, Briefcase, History } from "lucide-react";
import { simpanProfilKonten } from "@/actions/tentang-kami.action";

export const dynamic = "force-dynamic";

const KATEGORI_LIST = [
    { id: "visi_misi",   label: "Visi & Misi",    icon: Target,    placeholder: "Tulis visi dan misi kelurahan di sini. Bisa menggunakan HTML sederhana seperti <ul><li>..." },
    { id: "tugas_fungsi", label: "Tugas & Fungsi", icon: Briefcase, placeholder: "Tulis uraian tugas dan fungsi perangkat kelurahan di sini..." },
    { id: "sejarah",     label: "Sejarah Desa",   icon: History,   placeholder: "Tulis sejarah singkat Desa/Kelurahan Wergu Wetan di sini..." },
];

export default async function AdminProfilTeksPage() {
    const kontenList = await prisma.profilKonten.findMany();

    const getKonten = (kategori: string) =>
        kontenList.find((k) => k.kategori === kategori);

    return (
        <div className="space-y-8 pb-20">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Konten Teks Tentang Kami</h1>
                <p className="text-slate-500 text-sm mt-1">Edit teks panjang untuk Visi Misi, Tugas Fungsi, dan Sejarah Desa yang tampil di halaman Tentang Kami.</p>
            </div>

            <div className="space-y-6">
                {KATEGORI_LIST.map(({ id, label, icon: Icon, placeholder }) => {
                    const existing = getKonten(id);
                    return (
                        <div key={id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            {/* Card Header */}
                            <div className="flex items-center gap-3 px-8 py-5 border-b border-slate-100 bg-slate-50/50">
                                <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                    <Icon size={18} />
                                </div>
                                <div>
                                    <h2 className="font-bold text-slate-800">{label}</h2>
                                    {existing?.updatedAt && (
                                        <p className="text-[10px] text-slate-400">
                                            Terakhir diperbarui: {existing.updatedAt.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Form */}
                            <form action={simpanProfilKonten} className="p-8 space-y-5">
                                <input type="hidden" name="kategori" value={id} />

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Judul Bagian</label>
                                    <input
                                        name="judul"
                                        defaultValue={existing?.judul || label}
                                        required
                                        className="w-full bg-slate-50 p-4 rounded-xl outline-none font-bold text-slate-900 border-2 border-transparent focus:border-blue-500/30 transition"
                                        placeholder={`Judul untuk bagian ${label}...`}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        Konten (Mendukung HTML)
                                        <span className="bg-amber-100 text-amber-600 text-[9px] px-2 py-0.5 rounded-full font-black">HTML OK</span>
                                    </label>
                                    <textarea
                                        name="isi"
                                        rows={8}
                                        defaultValue={existing?.isi || ""}
                                        required
                                        className="w-full bg-slate-50 p-4 rounded-xl outline-none font-mono text-sm text-slate-800 border-2 border-transparent focus:border-blue-500/30 transition resize-y"
                                        placeholder={placeholder}
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition active:scale-95"
                                    >
                                        <Save size={18} /> Simpan {label}
                                    </button>
                                </div>
                            </form>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
