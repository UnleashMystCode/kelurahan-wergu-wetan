"use client";

import { useState } from "react";
import { Upload, Save, Trash2, FileSpreadsheet, Pencil, Link as LinkIcon, Plus, X, Image as ImageIcon, HelpCircle, Download, AlertCircle } from "lucide-react";
import { uploadStatisticsExcel, saveService, deleteService, saveWelcome, saveStatistic, deleteStatistic } from "@/actions/home.action";
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
  const handleAction = async (formData: FormData, actionFunc: (fd: FormData) => Promise<any>, successMessage: string) => {

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

    await toast.promise(
      (async () => {
        await actionFunc(formData);
        router.refresh();
      })(),
      {
        loading: 'Sedang memproses...',
        success: successMessage,
        error: (err) => {
          // Tangkap error server dan tampilkan di toast (bukan layar merah)
          return err.message.replace("Error: ", "");
        },
      }
    ).catch((err) => {
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
        loading: 'Menghapus layanan...',
        success: 'Layanan berhasil dihapus!',
        error: (err) => `Gagal hapus: ${err.message}`
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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

      {/* TAB MENU (Hanya Tampil Jika Tidak Di-Lock ke 1 Tab Tentu Saja) */}
      {!onlyTab && (
        <div className="flex border-b border-slate-200 overflow-x-auto">
          <button onClick={() => setActiveTab("statistik")} className={`px-6 py-4 font-bold text-sm whitespace-nowrap ${activeTab === 'statistik' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}>B. Statistik (Excel / GSheet)</button>
          <button onClick={() => setActiveTab("layanan")} className={`px-6 py-4 font-bold text-sm whitespace-nowrap ${activeTab === 'layanan' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}>C. Layanan Kelurahan</button>
          <button onClick={() => setActiveTab("sambutan")} className={`px-6 py-4 font-bold text-sm whitespace-nowrap ${activeTab === 'sambutan' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}>D. Sambutan Lurah</button>
        </div>
      )}

      <div className="p-8">

        {/* === TAB 1: STATISTIK === */}
        {activeTab === "statistik" && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="text-blue-600 shrink-0" size={20} />
                  <div>
                    <h4 className="font-bold text-blue-800 text-sm">Panduan Format File</h4>
                    <p className="text-xs text-blue-600 mt-1">Pastikan header Excel baris pertama adalah: <b>label</b> dan <b>value</b>.</p>
                  </div>
                </div>
                {/* Visual Tabel Excel */}
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden text-xs shadow-sm w-full max-w-xs mx-auto">
                  <div className="grid grid-cols-2 bg-slate-100 border-b border-slate-200 font-bold text-slate-500 text-center py-1"><div>A (label)</div><div>B (value)</div></div>
                  <div className="grid grid-cols-2 border-b border-slate-100 py-1 px-2"><div className="text-slate-800">Penduduk</div><div className="text-slate-600">3.500+</div></div>
                  <div className="grid grid-cols-2 border-b border-slate-100 py-1 px-2"><div className="text-slate-800">RT / RW</div><div className="text-slate-600">28 / 4</div></div>
                </div>

                <div className="mt-4 text-center">
                  <a href="/api/template/stats" target="_blank" className="inline-flex items-center gap-2 bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 transition shadow-sm">
                    <Download size={14} /> Download Template Excel (.xlsx)
                  </a>
                </div>
              </div>

                {/* FORM UPDATE STATISTIK (MANUAL & EXCEL) */}
                <div className="space-y-8">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                       {editStat ? <Pencil size={16} className="text-amber-500" /> : <Plus size={16} className="text-blue-500" />}
                       {editStat ? "Edit Statistik Manual" : "Tambah Statistik Manual"}
                    </h4>
                    <form action={(fd) => handleAction(fd, saveStatistic, "Statistik Berhasil Disimpan!")} className="flex flex-col md:flex-row gap-3">
                      {editStat && <input type="hidden" name="id" value={editStat.id} />}
                      <input name="label" required defaultValue={editStat?.label || ""} placeholder="Nama Data (Contoh: RT/RW)" className="flex-1 border p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      <input name="value" required defaultValue={editStat?.value || ""} placeholder="Nilai (Contoh: 28/4)" className="flex-1 border p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      <div className="flex gap-2">
                        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition shadow-lg flex items-center gap-2">
                          <Save size={16} /> Simpan
                        </button>
                        {editStat && <button type="button" onClick={() => setEditStat(null)} className="bg-slate-200 text-slate-600 px-4 py-3 rounded-xl font-bold text-sm hover:bg-slate-300 transition"><X size={16}/></button>}
                      </div>
                    </form>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <FileSpreadsheet className="text-green-600" /> Upload Massal (Excel)
                    </h3>
                    <form action={(fd) => handleAction(fd, uploadStatisticsExcel, "Data Statistik Berhasil Diupdate!")} className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                        <label className="text-xs font-bold text-green-800 flex items-center gap-2 mb-2"><LinkIcon size={14} /> Link Google Sheets (CSV)</label>
                        <input type="text" name="excelUrl" placeholder="Link CSV Google Sheets..." className="w-full border border-green-200 p-2 text-sm rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white" />
                      </div>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition">
                        <input type="file" name="excelFile" accept=".xlsx, .xls, .csv" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                      </div>
                      <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-sm w-full hover:bg-green-700 transition shadow-lg">Bersihkan & Timpa Data via Excel</button>
                    </form>
                  </div>
                </div>
              </div>

            {/* PREVIEW STATISTIK */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-xs uppercase text-slate-400">Data Statistik Aktif:</h4>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full">Total: {stats.length} Item</span>
              </div>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {stats.map((s: any) => (
                  <div key={s.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex justify-between items-center group hover:border-blue-300 transition">
                    <div>
                      <div className="text-xl font-bold text-blue-600">{s.value}</div>
                      <div className="text-xs text-slate-500 uppercase font-bold mt-1">{s.label}</div>
                    </div>
                    <div className="flex gap-2">
                       <button onClick={() => setEditStat(s)} className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition"><Pencil size={16}/></button>
                       <button onClick={async () => { if(confirm("Hapus?")) { await toast.promise(deleteStatistic(s.id), { loading: "Hapus...", success: "Dihapus!", error: "Gagal" }); router.refresh(); } }} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 size={16}/></button>
                    </div>
                  </div>
                ))}
                {stats.length === 0 && <div className="text-center py-10 border border-dashed border-slate-300 rounded-xl bg-slate-50"><p className="text-slate-400 italic text-sm">Belum ada data statistik.</p></div>}
              </div>
            </div>
          </div>
        )}

        {/* === TAB 2: LAYANAN === */}
        {activeTab === "layanan" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 border-r border-slate-100 pr-0 lg:pr-8">
              <h3 className="font-bold text-slate-800 mb-4 flex justify-between items-center">
                {editService ? "Edit Layanan" : "Tambah Layanan"}
                {editService && <button onClick={resetServiceForm} className="text-xs text-red-500 hover:underline">Batal</button>}
              </h3>

              {/* FORM LAYANAN */}
              <form action={(fd) => handleAction(fd, saveService, "Layanan Berhasil Disimpan!")} className="space-y-4">
                {editService && <input type="hidden" name="id" value={editService.id} />}
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">Nama Layanan <span className="text-red-500">*</span></label>
                  <input name="title" type="text" defaultValue={editService?.title || ""} placeholder="Contoh: KTP, KK" className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">Icon (Upload / URL)</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition relative group mb-2">
                    <input type="file" name="iconFile" accept="image/*" onChange={handleServiceFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="flex flex-col items-center gap-1 text-slate-400"><Upload size={20} className="text-blue-500" /><p className="text-xs font-medium"><span className="text-blue-600 font-bold">Upload</span> / Drag Gambar</p></div>
                  </div>
                  {(previewServiceImg || editService?.iconURL) && (<div className="bg-slate-100 p-2 rounded-lg mb-2 text-center border border-slate-200"><img src={previewServiceImg || editService?.iconURL} alt="Preview" className="h-10 w-10 object-contain mx-auto" /></div>)}
                  <input name="iconUrl" type="text" defaultValue={editService?.iconURL?.startsWith('http') ? editService.iconURL : ""} placeholder="Atau paste URL icon..." className="w-full p-2 border border-slate-300 rounded-lg text-xs" />
                </div>
                <button type="submit" className="bg-blue-600 text-white w-full py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition shadow-lg flex justify-center gap-2 items-center">
                  {editService ? <Save size={16} /> : <Plus size={16} />} {editService ? "Simpan" : "Tambah"}
                </button>
              </form>
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {services.map((svc: any) => (
                  <div key={svc.id} className="relative group bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center hover:shadow-md transition text-center">
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button onClick={() => { setEditService(svc); setPreviewServiceImg(svc.iconURL); }} className="bg-blue-100 text-blue-600 p-1.5 rounded-full hover:bg-blue-200"><Pencil size={12} /></button>

                      {/* BUTTON HAPUS PAKAI TOAST */}
                      <button onClick={() => handleDeleteService(svc.id)} className="bg-red-100 text-red-600 p-1.5 rounded-full hover:bg-red-200"><Trash2 size={12} /></button>

                    </div>
                    <img src={svc.iconURL} alt={svc.title} className="h-10 w-10 object-contain mb-2" />
                    <h4 className="font-bold text-slate-700 text-xs">{svc.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === TAB 3: SAMBUTAN === */}
        {activeTab === "sambutan" && (
          <form action={(fd) => handleAction(fd, saveWelcome, "Data Lurah Tersimpan!")} className="max-w-4xl grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lurah & Gelar <span className="text-red-500">*</span></label>
                <input name="namaLurah" type="text" defaultValue={welcome?.namaLurah} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Hj. Siti Aminah, S.Sos" required />
              </div>
              <div>
                <label className="flex items-center justify-between text-sm font-bold text-slate-700 mb-1">
                   <span>Gambar Tanda Tangan Lurah (PNG)</span>
                </label>
                <div className="flex gap-4 mb-2 mt-2">
                  {welcome?.fotoURL ? (
                     <img src={welcome.fotoURL} className="w-24 h-24 rounded-xl object-contain border border-slate-200 shadow-sm bg-slate-50 p-2" />
                  ) : (<div className="w-24 h-24 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-slate-400 border border-dashed text-xs"><AlertCircle size={16} className="mb-1 text-slate-300"/>Kosong</div>)}
                  <div className="flex-1 space-y-2">
                    <div className="border hover:border-blue-400 border-slate-300 border-dashed rounded-lg p-3 text-center hover:bg-blue-50 transition relative group bg-slate-50/50">
                      <input name="fotoFile" type="file" accept="image/png, image/jpeg, image/gif" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <div className="flex items-center justify-center gap-2 text-slate-500 group-hover:text-blue-600 text-xs font-bold"><Upload size={14} /> Upload Gambar TTD (.PNG)</div>
                    </div>
                    <div className="relative"><LinkIcon className="absolute left-3 top-2.5 text-slate-400" size={14} /><input name="fotoUrl" type="text" defaultValue={welcome?.fotoURL?.startsWith('http') ? welcome.fotoURL : ""} placeholder="Atau paste link URL gambar..." className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight bg-blue-50 p-2 rounded-lg border border-blue-100 mt-2">
                   Gunakan file gambar statis biasa <b>(.png transparan)</b>. Sistem secara cerdas akan langsung menambahkan <strong className="text-blue-700">animasi menulis "Presentation Wipe"</strong> dari kiri ke kanan saat publik scroll halamannya!
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Isi Sambutan <span className="text-red-500">*</span></label>
                <textarea name="konten" rows={8} defaultValue={welcome?.konten} className="w-full border p-3 rounded-lg text-sm leading-relaxed focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Isi sambutan..." required />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 w-full flex justify-center gap-2 items-center"><Save size={18} /> Simpan Data Lurah</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}