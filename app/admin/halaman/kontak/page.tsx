import prisma from "@/lib/db";
import { Save, Phone, Mail, MapPin, MessageSquare, CheckCircle, Clock, Trash2, Eye, CheckCheck } from "lucide-react";
import { simpanSiteConfig, ubahStatusPesan, hapusPesan } from "@/actions/kontak.action";

export const dynamic = "force-dynamic";

export default async function AdminKontakPage() {
    // Ambil konfigurasi kontak dari DB
    const configs = await prisma.siteConfig.findMany();
    const getConfig = (key: string, fallback: string) =>
        configs.find((c) => c.key === key)?.value || fallback;

    // Ambil semua pesan masuk warga
    const pesanList = await prisma.pesanMasuk.findMany({ orderBy: { createdAt: "desc" } });

    const belumDibaca = pesanList.filter((p) => p.status === "Belum Dibaca").length;

    return (
        <div className="space-y-10 pb-20">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Info Kontak & Inbox Aspirasi</h1>
                <p className="text-slate-500 text-sm mt-1">Kelola info kontak resmi dan baca pesan warga yang masuk.</p>
            </div>

            {/* ===== BAGIAN 1: KONFIGURASI KONTAK ===== */}
            <section>
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-blue-600 rounded-full"></div> A. Info Kontak Resmi
                </h2>
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <form action={simpanSiteConfig} className="p-8 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Phone size={12} className="text-blue-500" /> Nomor WhatsApp / Telepon
                                </label>
                                <input
                                    name="phone"
                                    type="text"
                                    required
                                    defaultValue={getConfig("phone", "+62 812 3456 7890")}
                                    className="w-full bg-slate-50 p-4 rounded-xl outline-none font-bold text-slate-900 border-2 border-transparent focus:border-blue-500/30 transition"
                                    placeholder="+62..."
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Mail size={12} className="text-blue-500" /> Email Resmi
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    defaultValue={getConfig("email", "pemdes@werguwetan.go.id")}
                                    className="w-full bg-slate-50 p-4 rounded-xl outline-none font-bold text-slate-900 border-2 border-transparent focus:border-blue-500/30 transition"
                                    placeholder="admin@desa.id"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <MapPin size={12} className="text-blue-500" /> Alamat Kantor
                            </label>
                            <textarea
                                name="alamat"
                                rows={3}
                                required
                                defaultValue={getConfig("alamat", "Jl. Jendral Sudirman No. 12, Kudus, Jawa Tengah")}
                                className="w-full bg-slate-50 p-4 rounded-xl outline-none font-bold text-slate-900 border-2 border-transparent focus:border-blue-500/30 transition resize-none"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition active:scale-95">
                                <Save size={18} /> Simpan Konfigurasi Kontak
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* ===== BAGIAN 2: INBOX ASPIRASI WARGA ===== */}
            <section>
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-indigo-600 rounded-full"></div>
                    B. Kotak Masuk Aspirasi Warga
                    {belumDibaca > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{belumDibaca} baru</span>
                    )}
                </h2>
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    {pesanList.length === 0 ? (
                        <div className="p-16 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <MessageSquare size={32} />
                            </div>
                            <p className="text-slate-400 font-bold">Belum ada pesan aspirasi dari warga.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {pesanList.map((p) => (
                                <div key={p.id} className={`p-6 flex gap-5 items-start transition-all ${p.status === "Belum Dibaca" ? "bg-blue-50/40" : "hover:bg-slate-50/50"}`}>
                                    {/* Avatar */}
                                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-black ${p.status === "Belum Dibaca" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                                        {p.nama[0].toUpperCase()}
                                    </div>
                                    {/* Konten */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-4 mb-2">
                                            <div>
                                                <p className="font-bold text-slate-800">{p.nama}</p>
                                                <p className="text-xs text-slate-400">{p.whatsapp} · {p.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                                            </div>
                                            {/* Badge Status */}
                                            {p.status === "Belum Dibaca" && (
                                                <span className="bg-blue-100 text-blue-600 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex-shrink-0">Baru</span>
                                            )}
                                            {p.status === "Dibaca" && (
                                                <span className="bg-amber-100 text-amber-600 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex-shrink-0 flex items-center gap-1"><Eye size={10} /> Dibaca</span>
                                            )}
                                            {p.status === "Selesai" && (
                                                <span className="bg-emerald-100 text-emerald-600 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex-shrink-0 flex items-center gap-1"><CheckCheck size={10} /> Selesai</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{p.pesan}</p>
                                    </div>
                                    {/* Aksi */}
                                    <div className="flex gap-1.5 flex-shrink-0">
                                        {p.status === "Belum Dibaca" && (
                                            <form action={async () => { "use server"; await ubahStatusPesan(p.id, "Dibaca"); }}>
                                                <button type="submit" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition" title="Tandai Dibaca"><Eye size={16} /></button>
                                            </form>
                                        )}
                                        {p.status === "Dibaca" && (
                                            <form action={async () => { "use server"; await ubahStatusPesan(p.id, "Selesai"); }}>
                                                <button type="submit" className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition" title="Tandai Selesai"><CheckCircle size={16} /></button>
                                            </form>
                                        )}
                                        <form action={async () => { "use server"; await hapusPesan(p.id); }}>
                                            <button type="submit" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition" title="Hapus"><Trash2 size={16} /></button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}