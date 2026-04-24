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
    // VALIDASI KHUSUS STATISTIK: CEK KEKOSONGAN DI CLIENT
    // Agar tidak perlu memanggil server jika sudah pasti kosong
    if (successMessage.includes("Statistik")) {
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
          await actionFunc(formData);
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
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
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
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                <div className="mb-3 flex items-start gap-3">
                  <AlertCircle className="shrink-0 text-blue-600" size={20} />
                  <div>
                    <h4 className="text-sm font-bold text-blue-800">Panduan Format File</h4>
                    <p className="mt-1 text-xs text-blue-600">
                      Pastikan header Excel baris pertama adalah: <b>label</b> dan <b>value</b>.
                    </p>
                  </div>
                </div>
                {/* Visual Tabel Excel */}
                <div className="mx-auto w-full max-w-xs overflow-hidden rounded-lg border border-slate-200 bg-white text-xs shadow-sm">
                  <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-100 py-1 text-center font-bold text-slate-500">
                    <div>A (label)</div>
                    <div>B (value)</div>
                  </div>
                  <div className="grid grid-cols-2 border-b border-slate-100 px-2 py-1">
                    <div className="text-slate-800">Penduduk</div>
                    <div className="text-slate-600">3.500+</div>
                  </div>
                  <div className="grid grid-cols-2 border-b border-slate-100 px-2 py-1">
                    <div className="text-slate-800">RT / RW</div>
                    <div className="text-slate-600">28 / 4</div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <a
                    href="/api/template/stats"
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2 text-xs font-bold text-blue-700 shadow-sm transition hover:bg-blue-50"
                  >
                    <Download size={14} /> Download Template Excel (.xlsx)
                  </a>
                </div>
              </div>

              {/* FORM UPDATE STATISTIK (MANUAL & EXCEL) */}
              <div className="space-y-8">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <h4 className="mb-4 flex items-center gap-2 font-bold text-slate-800">
                    {editStat ? (
                      <Pencil size={16} className="text-amber-500" />
                    ) : (
                      <Plus size={16} className="text-blue-500" />
                    )}
                    {editStat ? "Edit Statistik Manual" : "Tambah Statistik Manual"}
                  </h4>
                  <form
                    action={(fd) => handleAction(fd, saveStatistic, "Statistik Berhasil Disimpan!")}
                    className="flex flex-col gap-3 md:flex-row"
                  >
                    {editStat && <input type="hidden" name="id" value={editStat.id} />}
                    <input
                      name="label"
                      required
                      defaultValue={editStat?.label || ""}
                      placeholder="Nama Data (Contoh: RT/RW)"
                      className="flex-1 rounded-xl border p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      name="value"
                      required
                      defaultValue={editStat?.value || ""}
                      placeholder="Nilai (Contoh: 28/4)"
                      className="flex-1 rounded-xl border p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-blue-700"
                      >
                        <Save size={16} /> Simpan
                      </button>
                      {editStat && (
                        <button
                          type="button"
                          onClick={() => setEditStat(null)}
                          className="rounded-xl bg-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-300"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-800">
                    <FileSpreadsheet className="text-green-600" /> Upload Massal (Excel)
                  </h3>
                  <form
                    action={(fd) =>
                      handleAction(fd, uploadStatisticsExcel, "Data Statistik Berhasil Diupdate!")
                    }
                    className="space-y-4"
                  >
                    <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                      <label className="mb-2 flex items-center gap-2 text-xs font-bold text-green-800">
                        <LinkIcon size={14} /> Link Google Sheets (CSV)
                      </label>
                      <input
                        type="text"
                        name="excelUrl"
                        placeholder="Link CSV Google Sheets..."
                        className="w-full rounded-lg border border-green-200 bg-white p-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="rounded-xl border-2 border-dashed border-slate-300 p-6 text-center transition hover:bg-slate-50">
                      <input
                        type="file"
                        name="excelFile"
                        accept=".xlsx, .xls, .csv"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-green-700"
                    >
                      Bersihkan & Timpa Data via Excel
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
