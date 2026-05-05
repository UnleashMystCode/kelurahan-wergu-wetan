import prisma from "@/lib/db";
import {
  Save,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  CheckCircle,
  Clock,
  Trash2,
  Eye,
  CheckCheck,
} from "lucide-react";
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
        <h1 className="text-2xl font-bold text-text-dark">Info Kontak & Inbox Aspirasi</h1>
        <p className="mt-1 text-sm text-text-muted">
          Kelola info kontak resmi dan baca pesan warga yang masuk.
        </p>
      </div>

      {/* ===== BAGIAN 1: KONFIGURASI KONTAK ===== */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-sm font-black tracking-widest text-slate-400 uppercase">
          <div className="h-0.5 w-4 rounded-full bg-blue-600"></div> A. Info Kontak Resmi
        </h2>
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          <form action={simpanSiteConfig} className="space-y-5 p-8">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  <Phone size={12} className="text-blue-500" /> Nomor WhatsApp / Telepon
                </label>
                <input
                  name="phone"
                  type="text"
                  required
                  defaultValue={getConfig("phone", "+62 812 3456 7890")}
                  className="w-full rounded-xl border-2 border-transparent bg-slate-50 p-4 font-bold text-text-dark transition outline-none focus:border-blue-500/30"
                  placeholder="+62..."
                />
              </div>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  <Mail size={12} className="text-blue-500" /> Email Resmi
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={getConfig("email", "pemdes@werguwetan.go.id")}
                  className="w-full rounded-xl border-2 border-transparent bg-slate-50 p-4 font-bold text-text-dark transition outline-none focus:border-blue-500/30"
                  placeholder="admin@desa.id"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                <MapPin size={12} className="text-blue-500" /> Alamat Kantor
              </label>
              <textarea
                name="alamat"
                rows={3}
                required
                defaultValue={getConfig(
                  "alamat",
                  "Jl. Jendral Sudirman No. 12, Kudus, Jawa Tengah"
                )}
                className="w-full resize-none rounded-xl border-2 border-transparent bg-slate-50 p-4 font-bold text-text-dark transition outline-none focus:border-blue-500/30"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-95"
              >
                <Save size={18} /> Simpan Konfigurasi Kontak
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ===== BAGIAN 2: INBOX ASPIRASI WARGA ===== */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-sm font-black tracking-widest text-slate-400 uppercase">
          <div className="h-0.5 w-4 rounded-full bg-indigo-600"></div>
          B. Kotak Masuk Aspirasi Warga
          {belumDibaca > 0 && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-black text-white">
              {belumDibaca} baru
            </span>
          )}
        </h2>
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          {pesanList.length === 0 ? (
            <div className="p-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                <MessageSquare size={32} />
              </div>
              <p className="font-bold text-slate-400">Belum ada pesan aspirasi dari warga.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {pesanList.map((p) => (
                <div
                  key={p.id}
                  className={`flex items-start gap-5 p-6 transition-all ${p.status === "Belum Dibaca" ? "bg-blue-50/40" : "hover:bg-slate-50/50"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-black ${p.status === "Belum Dibaca" ? "bg-blue-600 text-white" : "bg-slate-100 text-text-muted"}`}
                  >
                    {p.nama[0].toUpperCase()}
                  </div>
                  {/* Konten */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-bold text-text-dark">{p.nama}</p>
                        <p className="text-xs text-text-muted">
                          {p.whatsapp} ·{" "}
                          {p.createdAt.toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {/* Badge Status */}
                      {p.status === "Belum Dibaca" && (
                        <span className="flex-shrink-0 rounded-full bg-blue-100 px-2.5 py-1 text-[9px] font-black tracking-wider text-blue-600 uppercase">
                          Baru
                        </span>
                      )}
                      {p.status === "Dibaca" && (
                        <span className="flex flex-shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[9px] font-black tracking-wider text-amber-600 uppercase">
                          <Eye size={10} /> Dibaca
                        </span>
                      )}
                      {p.status === "Selesai" && (
                        <span className="flex flex-shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[9px] font-black tracking-wider text-emerald-600 uppercase">
                          <CheckCheck size={10} /> Selesai
                        </span>
                      )}
                    </div>
                      <p className="line-clamp-3 text-sm leading-relaxed text-text-muted">{p.pesan}</p>
                  </div>
                  {/* Aksi */}
                  <div className="flex flex-shrink-0 gap-1.5">
                    {p.status === "Belum Dibaca" && (
                      <form
                        action={async () => {
                          "use server";
                          await ubahStatusPesan(p.id, "Dibaca");
                        }}
                      >
                        <button
                          type="submit"
                          className="rounded-xl p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                          title="Tandai Dibaca"
                        >
                          <Eye size={16} />
                        </button>
                      </form>
                    )}
                    {p.status === "Dibaca" && (
                      <form
                        action={async () => {
                          "use server";
                          await ubahStatusPesan(p.id, "Selesai");
                        }}
                      >
                        <button
                          type="submit"
                          className="rounded-xl p-2 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600"
                          title="Tandai Selesai"
                        >
                          <CheckCircle size={16} />
                        </button>
                      </form>
                    )}
                    <form
                      action={async () => {
                        "use server";
                        await hapusPesan(p.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
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
