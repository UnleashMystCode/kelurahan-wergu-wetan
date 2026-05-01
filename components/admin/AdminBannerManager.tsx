"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Pencil,
  Image as ImageIcon,
  X,
  Upload,
  Link as LinkIcon,
  Info,
  ChevronDown,
  Layout,
} from "lucide-react";
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

export default function AdminBannerManager({
  initialData,
  fixedPage,
}: {
  initialData: Banner[];
  fixedPage?: string;
}) {
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
  };

  // --- FUNGSI SAVE DENGAN TOAST (ANTI CRASH) ---
  const handleSave = async (formData: FormData) => {
    // Validasi Client Side Sederhana
    const file = formData.get("gambarFile") as File;
    const url = formData.get("gambarUrl") as string;
    const isEdit = formData.get("id");

    // Jika mode Tambah Baru (bukan Edit) dan tidak ada gambar
    if (!isEdit && !file?.size && !url) {
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
        loading: "Menyimpan banner...",
        success: "Berhasil disimpan!",
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
        loading: "Menghapus...",
        success: "Banner dihapus!",
        error: (err) => `Gagal: ${err.message}`,
      }
    );
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
            <ImageIcon className="text-blue-600" /> Kelola Banner
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {fixedPage
              ? `Mengelola Banner khusus halaman: ${fixedPage.toUpperCase()}`
              : "Atur tampilan hero section di setiap halaman."}
          </p>
        </div>

        <div className="relative z-20 flex gap-3">
          {!fixedPage && (
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex min-w-[140px] items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
              >
                <span className="flex items-center gap-2">
                  <Layout size={16} /> {activePage === "home" ? "Halaman Home" : "Tentang Kami"}
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${filterOpen ? "rotate-180" : ""}`}
                />
              </button>
              {filterOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setFilterOpen(false)}></div>
                  <div className="animate-in fade-in zoom-in-95 absolute top-full right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl duration-100">
                    <button
                      onClick={() => {
                        setActivePage("home");
                        setFilterOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm font-medium hover:bg-blue-50 hover:text-blue-600 ${activePage === "home" ? "bg-blue-50 text-blue-600" : "text-slate-600"}`}
                    >
                      🏠 Halaman Home
                    </button>
                    <button
                      onClick={() => {
                        setActivePage("tentang-kami");
                        setFilterOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm font-medium hover:bg-blue-50 hover:text-blue-600 ${activePage === "tentang-kami" ? "bg-blue-50 text-blue-600" : "text-slate-600"}`}
                    >
                      🏢 Halaman Tentang Kami
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          <button
            onClick={() => {
              setEditData(null);
              setPreviewImage(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg transition hover:bg-blue-700"
          >
            <Plus size={16} /> Tambah Banner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredData.map((banner) => (
          <div
            key={banner.id}
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <img src={banner.gambarURL} alt="Banner" className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 transition group-hover:opacity-100">
                <button
                  onClick={() => {
                    setEditData(banner);
                    setPreviewImage(banner.gambarURL);
                    setIsModalOpen(true);
                  }}
                  className="rounded-full bg-white p-2 text-blue-600 transition hover:scale-110"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="rounded-full bg-red-500 p-2 text-white transition hover:scale-110"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="relative p-4">
              <span className="absolute top-4 right-4 rounded bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600 uppercase">
                {banner.halaman}
              </span>
              {banner.tagline && (
                <span className="mb-2 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-blue-600 uppercase">
                  {banner.tagline}
                </span>
              )}
              <h3 className="line-clamp-1 text-sm font-bold text-slate-800">
                {banner.judul || "Tanpa Judul"}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                {banner.deskripsi || "Tanpa Deskripsi"}
              </p>
            </div>
          </div>
        ))}
        {filteredData.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center text-slate-400">
            <ImageIcon className="mx-auto mb-3 opacity-50" size={40} />
            <p className="font-medium text-slate-600">
              Belum ada banner untuk halaman{" "}
              <span className="font-bold text-slate-800 capitalize">{activePage}</span>.
            </p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h3 className="text-lg font-bold text-slate-800">
                {editData ? "Edit Banner" : `Tambah Banner (${activePage.toUpperCase()})`}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* FORM MENGGUNAKAN ACTION HANDLESAVE */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                await handleSave(formData);
              }}
              className="space-y-5 overflow-y-auto p-6"
            >
              {editData && <input type="hidden" name="id" value={editData.id} />}
              <input type="hidden" name="halaman" value={editData?.halaman || activePage} />

              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700">Gambar Banner</label>
                <div className="group relative rounded-xl border-2 border-dashed border-slate-300 p-6 text-center transition hover:bg-slate-50">
                  <input
                    type="file"
                    name="gambarFile"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setPreviewServiceImg(file);
                    }}
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                  />
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Upload size={32} className="text-blue-500" />
                    <p className="text-sm font-medium">
                      <span className="font-bold text-blue-600">Klik Upload</span> atau tarik file
                    </p>
                  </div>
                </div>
                {previewImage && (
                  <div className="relative mt-2 h-40 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                    <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="relative mt-2">
                  <LinkIcon className="absolute top-3 left-3 text-slate-400" size={16} />
                  <input
                    name="gambarUrl"
                    type="text"
                    defaultValue={editData?.gambarURL?.startsWith("http") ? editData.gambarURL : ""}
                    placeholder="Atau masukkan URL gambar..."
                    className="w-full rounded-lg border border-slate-300 py-2.5 pr-4 pl-9 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                <label className="mb-1 block text-sm font-bold text-blue-800">
                  Tagline (Kapsul Atas)
                </label>
                <input
                  name="tagline"
                  type="text"
                  defaultValue={editData?.tagline || ""}
                  className="w-full rounded-lg border border-blue-200 bg-white p-3 font-medium text-slate-900 outline-none placeholder:text-blue-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">Judul Utama</label>
                <textarea
                  name="judul"
                  rows={2}
                  defaultValue={editData?.judul || ""}
                  className="w-full rounded-lg border border-slate-300 bg-white p-3 text-lg font-bold text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500"
                  placeholder="Judul [Warna Biru]"
                ></textarea>
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  rows={3}
                  defaultValue={editData?.deskripsi || ""}
                  className="w-full rounded-lg border border-slate-300 bg-white p-3 font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-lg font-bold text-white shadow-lg transition hover:bg-blue-700"
                >
                  <Upload size={20} /> Simpan Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
