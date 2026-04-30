"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Users,
  Store,
  BookOpen,
  Target,
  MapPin,
  ChevronRight,
  Activity,
  Search,
  Heart,
  ShoppingBag,
} from "lucide-react";

const potensiData = [
  // EKONOMI & UMKM
  {
    id: "eko-1",
    kategori: "Ekonomi & UMKM",
    title: "Pasar Tradisional Wergu",
    desc: "Pusat perniagaan warga lokal dengan beragam bahan kebutuhan pokok, sayuran segar, dan komoditas harian.",
    img: "/images/hero_office.png",
    icon: ShoppingBag,
    color: "bg-amber-500",
    gradient: "from-amber-500 to-amber-600",
  },
  {
    id: "eko-2",
    kategori: "Ekonomi & UMKM",
    title: "Central Batik Kudus",
    desc: "Kawasan pengrajin batik khas Kudus yang melestarikan corak tradisional sekaligus memberdayakan ekonomi warga.",
    img: "/images/hero_community.png",
    icon: Store,
    color: "bg-amber-500",
    gradient: "from-amber-600 to-amber-700",
  },
  {
    id: "eko-3",
    kategori: "Ekonomi & UMKM",
    title: "Koperasi Warga Mandiri",
    desc: "Koperasi simpan pinjam dan usaha mikro yang membantu pendanaan serta modal bagi para pedagang kecil di Kelurahan.",
    img: "/images/hero_digital.png",
    icon: Activity,
    color: "bg-amber-500",
    gradient: "from-amber-500 to-yellow-600",
  },
  {
    id: "eko-4",
    kategori: "Ekonomi & UMKM",
    title: "Sentra Pedagang Balai Jagong",
    desc: "Kawasan kuliner dan pedagang kaki lima binaan yang tertata rapi di sekitar area Taman Balai Jagong.",
    img: "/images/hero_neighborhood.png",
    icon: Store,
    color: "bg-amber-500",
    gradient: "from-yellow-500 to-amber-500",
  },

  // SOSIAL & ORGANISASI
  {
    id: "sos-1",
    kategori: "Sosial & Organisasi",
    title: "Karang Taruna Tunas Muda",
    desc: "Wadah pengembangan generasi muda yang aktif dalam kegiatan sosial, olahraga, dan kreativitas lingkungan.",
    img: "/images/hero_community.png",
    icon: Users,
    color: "bg-blue-500",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: "sos-2",
    kategori: "Sosial & Organisasi",
    title: "PKK Kelurahan Wergu Wetan",
    desc: "Penggerak Kesejahteraan Keluarga yang fokus pada kesehatan ibu & anak, posyandu, serta kerajinan rumah tangga.",
    img: "/images/hero_office.png",
    icon: Heart,
    color: "bg-blue-500",
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    id: "sos-3",
    kategori: "Sosial & Organisasi",
    title: "Kader Pemberdayaan Masyarakat",
    desc: "Kelompok swadaya masyarakat yang bersinergi dengan kelurahan untuk pembangunan desa dan kebersihan lingkungan.",
    img: "/images/hero_neighborhood.png",
    icon: Target,
    color: "bg-blue-500",
    gradient: "from-indigo-500 to-blue-600",
  },

  // IKONIK & FASILITAS
  {
    id: "fas-1",
    kategori: "Ikonik & Fasilitas",
    title: "Taman Balai Jagong",
    desc: "Ruang terbuka hijau terbesar di Kudus yang menjadi pusat interaksi warga, olahraga, dan rekreasi keluarga.",
    img: "/images/hero_neighborhood.png",
    icon: MapPin,
    color: "bg-emerald-500",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "fas-2",
    kategori: "Ikonik & Fasilitas",
    title: "Perpustakaan Umum Daerah",
    desc: "Fasilitas literasi dan edukasi dengan ribuan koleksi buku yang menjadi kebanggaan kawasan Wergu.",
    img: "/images/hero_office.png",
    icon: BookOpen,
    color: "bg-emerald-500",
    gradient: "from-teal-500 to-emerald-600",
  },
  {
    id: "fas-3",
    kategori: "Ikonik & Fasilitas",
    title: "Tugu & Landmark Desa",
    desc: "Monumen penanda identitas Wergu Wetan yang berdiri megah sebagai simbol estetika dan historis jalan utama.",
    img: "/images/hero_community.png",
    icon: Building2,
    color: "bg-emerald-500",
    gradient: "from-emerald-600 to-green-600",
  },

  // KEAGAMAAN
  {
    id: "rel-1",
    kategori: "Keagamaan",
    title: "Masjid Baitul Muttaqin",
    desc: "Pusat kegiatan ibadah utama bagi warga muslim, rutin mengadakan kajian, TPQ, dan kegiatan amaliyah lainnya.",
    img: "/images/hero_community.png",
    icon: Building2,
    color: "bg-rose-500",
    gradient: "from-rose-500 to-rose-600",
  },
  {
    id: "rel-2",
    kategori: "Keagamaan",
    title: "Mushola & Surau Warga",
    desc: "Tersebar di setiap RW, memfasilitasi kegiatan peribadatan lingkungan dan mempererat tali silaturahmi tetangga.",
    img: "/images/hero_digital.png",
    icon: Building2,
    color: "bg-rose-500",
    gradient: "from-rose-600 to-pink-600",
  },
];

const categories = [
  "Semua",
  "Ekonomi & UMKM",
  "Sosial & Organisasi",
  "Ikonik & Fasilitas",
  "Keagamaan",
];

export default function PotensiDesaView({ banner }: { banner?: any }) {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const HEADER_OFFSET = 120; // Topbar 40px + Navbar 80px
  const SUBMENU_HEIGHT = 60;

  const filteredData = potensiData.filter((item) => {
    return activeCategory === "Semua" || item.kategori === activeCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 1. HERO HEADER (Disesuaikan dengan TentangKamiView & HomeView) */}
      <div className="relative mt-[-100px] h-[600px] w-full overflow-hidden bg-slate-900 md:h-[700px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${banner?.gambarURL || "/images/hero_neighborhood.png"}')` }}
        />
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Konten Teks (Visual Centering sama persis dengan TentangKamiView) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 pt-[100px] text-center">
          <div className="mx-auto max-w-4xl">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl"
            >
              {banner?.judul || "Potensi Kelurahan"}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mx-auto max-w-2xl text-lg leading-relaxed text-blue-50 opacity-90 drop-shadow-md md:text-xl"
            >
              {banner?.deskripsi ||
                "Eksplorasi keberagaman aset, potensi unggulan UMKM, wisata ikonik, hingga dinamika sosial masyarakat Wergu Wetan."}
            </motion.p>
          </div>
        </div>
      </div>

      {/* 2. STICKY SUB-NAVBAR (Seragam dengan page lainnya) */}
      <div
        className={`sticky z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md transition-all duration-300`}
        style={{ top: `${HEADER_OFFSET}px`, height: `${SUBMENU_HEIGHT}px` }}
      >
        <div className="container mx-auto h-full px-4">
          <div className="no-scrollbar flex h-full items-center justify-start gap-1 overflow-x-auto md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`group relative flex h-full items-center gap-2 border-b-[3px] px-6 text-[13px] font-bold whitespace-nowrap transition-all md:text-sm ${
                  activeCategory === cat
                    ? "border-blue-600 bg-blue-50/50 text-blue-600 rounded-t-lg"
                    : "border-transparent text-slate-500 hover:bg-slate-100 hover:text-blue-600 hover:border-blue-400 rounded-t-lg"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. MASONRY / BENTO GRID KONTEN (Tanpa Flickering / Layout Bugs) */}
      <div className="container mx-auto mt-12 mb-20 min-h-[800px] max-w-6xl px-4">
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <Search size={48} className="mb-4 text-slate-300" />
            <h3 className="text-xl font-bold text-slate-700">Tidak ada potensi ditemukan</h3>
            <p className="mt-2 text-slate-500">
              Coba gunakan kata kunci atau kategori yang berbeda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredData.map((item, i) => (
              <motion.div
                key={`${activeCategory}-${item.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl"
              >
                <div className="relative h-[220px] w-full overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-80" />

                  {/* Minimalist Badge */}
                  <div className="absolute top-5 left-5">
                    <span className="rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-black tracking-[0.1em] text-slate-800 uppercase shadow-sm backdrop-blur-md">
                      {item.kategori}
                    </span>
                  </div>

                  {/* Integrated Title over Image */}
                  <div className="absolute right-5 bottom-5 left-5">
                    <h4 className="text-xl leading-tight font-bold text-white drop-shadow-md">
                      {item.title}
                    </h4>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between bg-white p-6 md:p-8">
                  <p className="mb-6 line-clamp-3 text-[14px] leading-relaxed text-slate-600">
                    {item.desc}
                  </p>

                  <button className="group/btn flex w-full items-center justify-between text-[13px] font-bold text-slate-700 transition-colors hover:text-blue-600">
                    Selengkapnya
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-100 bg-slate-50 transition-colors group-hover/btn:bg-blue-50 group-hover/btn:text-blue-600">
                      <ChevronRight size={16} />
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
