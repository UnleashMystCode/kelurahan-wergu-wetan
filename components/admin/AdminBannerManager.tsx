"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Pencil, Image as ImageIcon, X, Upload, Link as LinkIcon, Info, ChevronDown, Layout } from "lucide-react";
import { saveBanner, hapusBanner } from "@/actions/banner.action";
import toast from "react-hot-toast"; // <--- 1. IMPORT TOAST

type Banner = {
  id: number;
  halaman: string;
  tagline: string | null;
  judul: string | null;
  deskripsi: string | null;
  gambarURL: string;
};

export default function AdminBannerManager({ initialData, fixedPage }: { initialData: Banner[], fixedPage?: string }) {
  const router = useRouter();
  const [activePage, setActivePage] = useState(fixedPage || "home");
  const [filterOpen, setFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Banner | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const filteredData = initialData.filter((item) => item.halaman === activePage);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreviewServiceImg(file); // Helper internal
  };

  // Helper preview saat upload
  const setPreviewServiceImg = (file: File) => {
    setPreviewImage(URL.createObjectURL(file));
  }

  // --- FUNGSI SAVE DENGAN TOAST (ANTI CRASH) ---
  const handleSave = async (formData: FormData) => {
    // Validasi Client Side Sederhana
    const file = formData.get("gambarFile") as File;
    const url = formData.get("gambarUrl") as string;
    const isEdit = formData.get("id");

    // Jika mode Tambah Baru (bukan Edit) dan tidak ada gambar
    if (!isEdit && (!file?.size && !url)) {
      toast.error("Wajib upload gambar atau isi URL!");
      return; // Stop di sini, jangan panggil server
    }

    // Panggil Server Action dengan Toast
    await toast.promise(
      (async () => {
        await saveBanner(formData);
        router.refresh();
        setIsModalOpen(false);
        setEditData(null);
        setPreviewImage(null);
      })(),
      {
        loading: 'Menyimpan banner...',
        success: 'Berhasil disimpan!',
        error: (err) => `Gagal: ${err.message}`, // Menangkap error dari server
      }
    );
  };

  // --- FUNGSI DELETE DENGAN TOAST ---
  const handleDelete = async (id: number) => {
    if (!confirm("Hapus banner ini?")) return;

    await toast.promise(
      (async () => {
        await hapusBanner(id);
        router.refresh();
      })(),
      {
        loading: 'Menghapus...',
        success: 'Banner dihapus!',
        error: (err) => `Gagal: ${err.message}`
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ImageIcon className="text-blue-600" /> Kelola Banner
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {fixedPage
              ? `Mengelola Banner khusus halaman: ${fixedPage.toUpperCase()}`
              : "Atur tampilan hero section di setiap halaman."}
          </p>
        </div>

        <div className="flex gap-3 relative z-20">
          {!fixedPage && (
            <div className="relative">
              <button onClick={() => setFilterOpen(!filterOpen)} className="bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-200 transition min-w-[140px] justify-between">
                <span className="flex items-center gap-2"><Layout size={16} /> {activePage === "home" ? "Halaman Home" : "Tentang Kami"}</span>
                <ChevronDown size={14} className={`transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
              </button>
              {filterOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setFilterOpen(false)}></div>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-100">
                    <button onClick={() => { setActivePage("home"); setFilterOpen(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 hover:text-blue-600 font-medium ${activePage === 'home' ? 'text-blue-600 bg-blue-50' : 'text-slate-600'}`}>🏠 Halaman Home</button>
                    <button onClick={() => { setActivePage("tentang-kami"); setFilterOpen(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 hover:text-blue-600 font-medium ${activePage === 'tentang-kami' ? 'text-blue-600 bg-blue-50' : 'text-slate-600'}`}>🏢 Halaman Tentang Kami</button>
                  </div>
                </>
              )}
            </div>
          )}
          <button onClick={() => { setEditData(null); setPreviewImage(null); setIsModalOpen(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition shadow-lg"><Plus size={16} /> Tambah Banner</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredData.map((banner) => (
          <div key={banner.id} className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
            <div className="aspect-video w-full overflow-hidden relative">
              <img src={banner.gambarURL} alt="Banner" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                <button onClick={() => { setEditData(banner); setPreviewImage(banner.gambarURL); setIsModalOpen(true); }} className="bg-white text-blue-600 p-2 rounded-full hover:scale-110 transition"><Pencil size={18} /></button>
                <button onClick={() => handleDelete(banner.id)} className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition"><Trash2 size={18} /></button>
              </div>
            </div>
            <div className="p-4 relative">
              <span className="absolute top-4 right-4 text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded uppercase">{banner.halaman}</span>
              {banner.tagline && <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full uppercase tracking-wider mb-2 inline-block">{banner.tagline}</span>}
              <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{banner.judul || "Tanpa Judul"}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 mt-1">{banner.deskripsi || "Tanpa Deskripsi"}</p>
            </div>
          </div>
        ))}
        {filteredData.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <ImageIcon className="mx-auto mb-3 opacity-50" size={40} />
            <p className="font-medium text-slate-600">Belum ada banner untuk halaman <span className="capitalize font-bold text-slate-800">{activePage}</span>.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">{editData ? "Edit Banner" : `Tambah Banner (${activePage.toUpperCase()})`}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500"><X size={24} /></button>
            </div>

            {/* FORM MENGGUNAKAN ACTION HANDLESAVE */}
            <form onSubmit={async (e) => { e.preventDefault(); const formData = new FormData(e.currentTarget); await handleSave(formData); }} className="p-6 space-y-5 overflow-y-auto">

              {editData && <input type="hidden" name="id" value={editData.id} />}
              <input type="hidden" name="halaman" value={editData?.halaman || activePage} />

              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700">Gambar Banner</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition relative group">
                  <input type="file" name="gambarFile" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPreviewServiceImg(file);
                  }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className="flex flex-col items-center gap-2 text-slate-400"><Upload size={32} className="text-blue-500" /><p className="text-sm font-medium"><span className="text-blue-600 font-bold">Klik Upload</span> atau tarik file</p></div>
                </div>
                {previewImage && <div className="relative rounded-lg overflow-hidden border border-slate-200 mt-2 h-40 bg-slate-100"><img src={previewImage} alt="Preview" className="w-full h-full object-cover" /></div>}
                <div className="relative mt-2"><LinkIcon className="absolute left-3 top-3 text-slate-400" size={16} /><input name="gambarUrl" type="text" defaultValue={editData?.gambarURL?.startsWith("http") ? editData.gambarURL : ""} placeholder="Atau masukkan URL gambar..." className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" /></div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <label className="block text-sm font-bold text-blue-800 mb-1">Tagline (Kapsul Atas)</label>
                <input name="tagline" type="text" defaultValue={editData?.tagline || ""} className="w-full border border-blue-200 bg-white p-3 rounded-lg text-slate-900 font-medium placeholder:text-blue-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Judul Utama</label>
                <textarea name="judul" rows={2} defaultValue={editData?.judul || ""} className="w-full border border-slate-300 bg-white p-3 rounded-lg text-slate-900 font-bold text-lg placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Judul [Warna Biru]"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Deskripsi</label>
                <textarea name="deskripsi" rows={3} defaultValue={editData?.deskripsi || ""} className="w-full border border-slate-300 bg-white p-3 rounded-lg text-slate-900 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div className="pt-4"><button type="submit" className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2"><Upload size={20} /> Simpan Banner</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}