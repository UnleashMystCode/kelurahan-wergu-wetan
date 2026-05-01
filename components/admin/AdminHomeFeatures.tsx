"use client";

import { useState } from "react";
import {
  Upload,
  Save,
  Trash2,
  FileSpreadsheet,
  Pencil,
  Link as LinkIcon,
  Plus,
  X,
  Image as ImageIcon,
  HelpCircle,
  Download,
  AlertCircle,
} from "lucide-react";
import {
  uploadStatisticsExcel,
  saveService,
  deleteService,
  saveWelcome,
  saveStatistic,
  deleteStatistic,
} from "@/actions/home.action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // <--- IMPORT TOAST

export default function AdminHomeFeatures({ stats, services, welcome, onlyTab }: any) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(onlyTab || "statistik");

  // STATE LAYANAN
  const [editService, setEditService] = useState<any>(null);
  const [previewServiceImg, setPreviewServiceImg] = useState<string | null>(null);

  // STATE STATISTIK
  const [editStat, setEditStat] = useState<any>(null);

  // --- FUNGSI WRAPPER MODERN (TOAST PROMISE) ---
  const handleAction = async (
    formData: FormData,
    actionFunc: (fd: FormData) => Promise<any>,
    successMessage: string
  ) => {
    // VALIDASI KHUSUS STATISTIK EXCEL: CEK KEKOSONGAN DI CLIENT
    // Menggunakan string matching karena Server Action proxies bisa dianggap identik oleh React
    if (successMessage === "Data Statistik Berhasil Diupdate!") {
      const file = formData.get("excelFile") as File;
      const url = formData.get("excelUrl") as string;
      if ((!file || file.size === 0) && (!url || url.trim() === "")) {
        toast.error("Pilih File Excel atau isi Link CSV dulu!");
        return; // STOP! Jangan panggil server.
      }
    }

    if (successMessage.includes("Layanan")) resetServiceForm();

    await toast
      .promise(
        (async () => {
          const res = await actionFunc(formData);
          if (res && res.success === false) {
            throw new Error(res.message);
          }
          router.refresh();
        })(),
        {
          loading: "Sedang memproses...",
          success: successMessage,
          error: (err) => {
            // Tangkap error server dan tampilkan di toast (bukan layar merah)
            return err.message.replace("Error: ", "");
          },
        }
      )
      .catch((err) => {
        // Double protection kalau promise reject
        console.error("Caught error in promise:", err);
      });
  };

  // Wrapper khusus Delete (karena butuh confirm dan bukan FormData)
  const handleDeleteService = async (id: number) => {
    if (!confirm("Yakin ingin menghapus layanan ini?")) return;

    await toast.promise(
      (async () => {
        await deleteService(id);
        router.refresh();
      })(),
      {
        loading: "Menghapus layanan...",
        success: "Layanan berhasil dihapus!",
        error: (err) => `Gagal hapus: ${err.message}`,
      }
    );
  };

  const handleServiceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreviewServiceImg(URL.createObjectURL(file));
  };

  const resetServiceForm = () => {
    setEditService(null);
    setPreviewServiceImg(null);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* TAB MENU (Hanya Tampil Jika Tidak Di-Lock ke 1 Tab Tentu Saja) */}
      {!onlyTab && (
        <div className="flex overflow-x-auto border-b border-slate-200">
          <button
            onClick={() => setActiveTab("statistik")}
            className={`px-6 py-4 text-sm font-bold whitespace-nowrap ${activeTab === "statistik" ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"}`}
          >
            B. Statistik (Excel / GSheet)
          </button>
          <button
            onClick={() => setActiveTab("layanan")}
            className={`px-6 py-4 text-sm font-bold whitespace-nowrap ${activeTab === "layanan" ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"}`}
          >
            C. Layanan Kelurahan
          </button>
          <button
            onClick={() => setActiveTab("sambutan")}
            className={`px-6 py-4 text-sm font-bold whitespace-nowrap ${activeTab === "sambutan" ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"}`}
          >
            D. Sambutan Lurah
          </button>
        </div>
      )}

      <div className="p-8">
        {/* === TAB 1: STATISTIK === */}
        {activeTab === "statistik" && (
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              {/* === MANUAL INPUT === */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h4 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-800">
                  {editStat ? (
                    <Pencil size={18} className="text-amber-500" />
                  ) : (
                    <Plus size={18} className="text-blue-500" />
                  )}
                  {editStat ? "Edit Statistik Manual" : "Tambah Statistik Manual"}
                </h4>
                <form
                  action={(fd) => handleAction(fd, saveStatistic, "Statistik Berhasil Disimpan!")}
                  className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_auto]"
                >
                  {editStat && <input type="hidden" name="id" value={editStat.id} />}
                  <input
                    name="label"
                    required
                    defaultValue={editStat?.label || ""}
                    placeholder="Nama Data (Contoh: RT/RW)"
                    className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                  <input
                    name="value"
                    required
                    defaultValue={editStat?.value || ""}
                    placeholder="Nilai (Contoh: 28/4)"
                    className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-blue-700 md:w-auto"
                    >
                      <Save size={16} /> Simpan
                    </button>
                    {editStat && (
                      <button
                        type="button"
                        onClick={() => setEditStat(null)}
                        className="flex items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* === EXCEL MASSAL (PANDUAN + FORM) === */}
              <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                    <FileSpreadsheet size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-green-900">Upload Massal (Excel)</h4>
                    <p className="text-xs text-green-700">Ganti semua data sekaligus via file Excel</p>
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* STEP 1 */}
                  <div className="rounded-xl border border-green-100 bg-white p-4 shadow-sm">
                    <h5 className="mb-1 flex items-center gap-2 text-xs font-bold text-green-800">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] text-white">1</span>
                      Download Template
                    </h5>
                    <p className="mb-3 text-[11px] text-slate-500 leading-relaxed">
                      Sistem akan mendownload <b>Data Aktif</b> jika ada data. Jika database kosong, sistem otomatis memberikan <b>Template Dummy</b>.
                    </p>
                    <a
                      href="/api/template/stats"
                      download
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-2.5 text-[11px] font-bold text-white shadow transition hover:bg-green-700 active:scale-95"
                    >
                      <Download size={14} /> Download Template Excel
                    </a>
                  </div>

                  {/* STEP 2 */}
                  <div className="rounded-xl border border-green-100 bg-white p-4 shadow-sm">
                    <h5 className="mb-1 flex items-center gap-2 text-xs font-bold text-green-800">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] text-white">2</span>
                      Isi & Simpan Data
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Buka file Excel, isi data Anda:<br/>
                      • Kolom A untuk <b>Label</b> (Cth: Penduduk)<br/>
                      • Kolom B untuk <b>Value</b> (Cth: 3.500+)<br/>
                      Simpan file setelah selesai diedit.
                    </p>
                  </div>
                </div>

                {/* STEP 3 (FORM UPLOAD) */}
                <div className="rounded-xl border border-green-100 bg-white p-5 shadow-sm">
                  <h5 className="mb-4 flex items-center gap-2 text-sm font-bold text-green-800">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs text-white">3</span>
                    Upload & Timpa Data
                  </h5>
                  <form
                    onSubmit={(e) => {
                      if (!confirm("PERINGATAN: Semua data statistik aktif saat ini akan DIHAPUS dan ditimpa dengan data dari Excel baru ini!\n\nYakin ingin menimpa data?")) {
                        e.preventDefault();
                      }
                    }}
                    action={(fd) =>
                      handleAction(fd, uploadStatisticsExcel, "Data Statistik Berhasil Diupdate!")
                    }
                    className="space-y-4"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-700">
                          <Upload size={14} className="text-slate-400" /> Upload File (.xlsx)
                        </label>
                        <input
                          type="file"
                          name="excelFile"
                          accept=".xlsx, .xls, .csv"
                          className="block w-full text-xs text-slate-500 file:mr-3 file:rounded-full file:border-0 file:bg-green-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-green-700 hover:file:bg-green-200"
                        />
                      </div>
                      
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-700">
                          <LinkIcon size={14} className="text-slate-400" /> Atau Link G-Sheets (CSV)
                        </label>
                        <input
                          type="text"
                          name="excelUrl"
                          placeholder="https://docs.google.com/..."
                          className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-green-700 active:scale-95"
                    >
                      Proses & Timpa Semua Data
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* PREVIEW STATISTIK */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-400 uppercase">
                  Data Statistik Aktif:
                </h4>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] text-slate-500">
                  Total: {stats.length} Item
                </span>
              </div>
              <div className="custom-scrollbar max-h-[600px] space-y-3 overflow-y-auto pr-2">
                {stats.map((s: any) => (
                  <div
                    key={s.id}
                    className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300"
                  >
                    <div>
                      <div className="text-xl font-bold text-blue-600">{s.value}</div>
                      <div className="mt-1 text-xs font-bold text-slate-500 uppercase">
                        {s.label}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditStat(s)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-amber-50 hover:text-amber-500"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm("Hapus?")) {
                            await toast.promise(deleteStatistic(s.id), {
                              loading: "Hapus...",
                              success: "Dihapus!",
                              error: "Gagal",
                            });
                            router.refresh();
                          }
                        }}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                {stats.length === 0 && (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-10 text-center">
                    <p className="text-sm text-slate-400 italic">Belum ada data statistik.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* === TAB 2: LAYANAN === */}
        {activeTab === "layanan" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="border-r border-slate-100 pr-0 lg:col-span-1 lg:pr-8">
              <h3 className="mb-4 flex items-center justify-between font-bold text-slate-800">
                {editService ? "Edit Layanan" : "Tambah Layanan"}
                {editService && (
                  <button
                    onClick={resetServiceForm}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Batal
                  </button>
                )}
              </h3>

              {/* FORM LAYANAN */}
              <form
                action={(fd) => handleAction(fd, saveService, "Layanan Berhasil Disimpan!")}
                className="space-y-4"
              >
                {editService && <input type="hidden" name="id" value={editService.id} />}
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-500">
                    Nama Layanan <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="title"
                    type="text"
                    defaultValue={editService?.title || ""}
                    placeholder="Contoh: KTP, KK"
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-500">
                    Icon (Upload / URL)
                  </label>
                  <div className="group relative mb-2 rounded-xl border-2 border-dashed border-slate-300 p-4 text-center transition hover:bg-slate-50">
                    <input
                      type="file"
                      name="iconFile"
                      accept="image/*"
                      onChange={handleServiceFileChange}
                      className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                    />
                    <div className="flex flex-col items-center gap-1 text-slate-400">
                      <Upload size={20} className="text-blue-500" />
                      <p className="text-xs font-medium">
                        <span className="font-bold text-blue-600">Upload</span> / Drag Gambar
                      </p>
                    </div>
                  </div>
                  {(previewServiceImg || editService?.iconURL) && (
                    <div className="mb-2 rounded-lg border border-slate-200 bg-slate-100 p-2 text-center">
                      <img
                        src={previewServiceImg || editService?.iconURL}
                        alt="Preview"
                        className="mx-auto h-10 w-10 object-contain"
                      />
                    </div>
                  )}
                  <input
                    name="iconUrl"
                    type="text"
                    defaultValue={
                      editService?.iconURL?.startsWith("http") ? editService.iconURL : ""
                    }
                    placeholder="Atau paste URL icon..."
                    className="w-full rounded-lg border border-slate-300 p-2 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-blue-700"
                >
                  {editService ? <Save size={16} /> : <Plus size={16} />}{" "}
                  {editService ? "Simpan" : "Tambah"}
                </button>
              </form>
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {services.map((svc: any) => (
                  <div
                    key={svc.id}
                    className="group relative flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center transition hover:shadow-md"
                  >
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition group-hover:opacity-100">
                      <button
                        onClick={() => {
                          setEditService(svc);
                          setPreviewServiceImg(svc.iconURL);
                        }}
                        className="rounded-full bg-blue-100 p-1.5 text-blue-600 hover:bg-blue-200"
                      >
                        <Pencil size={12} />
                      </button>

                      {/* BUTTON HAPUS PAKAI TOAST */}
                      <button
                        onClick={() => handleDeleteService(svc.id)}
                        className="rounded-full bg-red-100 p-1.5 text-red-600 hover:bg-red-200"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <img
                      src={svc.iconURL}
                      alt={svc.title}
                      className="mb-2 h-10 w-10 object-contain"
                    />
                    <h4 className="text-xs font-bold text-slate-700">{svc.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === TAB 3: SAMBUTAN === */}
        {activeTab === "sambutan" && (
          <form
            action={(fd) => handleAction(fd, saveWelcome, "Data Lurah Tersimpan!")}
            className="grid max-w-4xl gap-8 md:grid-cols-2"
          >
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">
                  Nama Lurah & Gelar <span className="text-red-500">*</span>
                </label>
                <input
                  name="namaLurah"
                  type="text"
                  defaultValue={welcome?.namaLurah}
                  className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Hj. Siti Aminah, S.Sos"
                  required
                />
              </div>
              <div>
                <label className="mb-1 flex items-center justify-between text-sm font-bold text-slate-700">
                  <span>Gambar Tanda Tangan Lurah (PNG)</span>
                </label>
                <div className="mt-2 mb-2 flex gap-4">
                  {welcome?.fotoURL ? (
                    <img
                      src={welcome.fotoURL}
                      className="h-24 w-24 rounded-xl border border-slate-200 bg-slate-50 object-contain p-2 shadow-sm"
                    />
                  ) : (
                    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-xl border border-dashed bg-slate-50 text-xs text-slate-400">
                      <AlertCircle size={16} className="mb-1 text-slate-300" />
                      Kosong
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <div className="group relative rounded-lg border border-dashed border-slate-300 bg-slate-50/50 p-3 text-center transition hover:border-blue-400 hover:bg-blue-50">
                      <input
                        name="fotoFile"
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                      <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 group-hover:text-blue-600">
                        <Upload size={14} /> Upload Gambar TTD (.PNG)
                      </div>
                    </div>
                    <div className="relative">
                      <LinkIcon className="absolute top-2.5 left-3 text-slate-400" size={14} />
                      <input
                        name="fotoUrl"
                        type="text"
                        defaultValue={welcome?.fotoURL?.startsWith("http") ? welcome.fotoURL : ""}
                        placeholder="Atau paste link URL gambar..."
                        className="w-full rounded-lg border border-slate-300 py-2 pr-3 pl-8 text-xs outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-2 rounded-lg border border-blue-100 bg-blue-50 p-2 text-[10px] leading-tight text-slate-500">
                  Gunakan file gambar statis biasa <b>(.png transparan)</b>. Sistem secara cerdas
                  akan langsung menambahkan{" "}
                  <strong className="text-blue-700">animasi menulis "Presentation Wipe"</strong>{" "}
                  dari kiri ke kanan saat publik scroll halamannya!
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">
                  Isi Sambutan <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="konten"
                  rows={8}
                  defaultValue={welcome?.konten}
                  className="w-full rounded-lg border p-3 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Isi sambutan..."
                  required
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
              >
                <Save size={18} /> Simpan Data Lurah
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
