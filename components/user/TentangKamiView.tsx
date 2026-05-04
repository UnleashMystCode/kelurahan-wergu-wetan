"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import StaticBanner from "@/components/user/StaticBanner";
import {
  Target,
  Users,
  Briefcase,
  Map,
  Building2,
  Trophy,
  User,
  HeartPulse,
  Medal,
  Star,
  BarChart,
  MapPin,
  Home,
  Activity,
  X,
  ExternalLink,
  ChevronRight,
  Landmark,
  Flower2,
  Sparkles,
  Trees,
} from "lucide-react";

type Props = {
  banners: any[];
  perangkat: any[];
  konten: any[];
  stats?: any[];
};

export default function TentangKamiView({ banners, perangkat, konten, stats = [] }: Props) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("visi");

  // === 🔧 KALKULASI HEADER (Sesuai ClientLayout) ===
  const HEADER_OFFSET = 120; // Topbar 40px + Navbar 80px
  const SUBMENU_HEIGHT = 60;
  const SCROLL_OFFSET = HEADER_OFFSET + SUBMENU_HEIGHT + 20;

  const getKonten = (kategori: string): string | null => {
    return konten.find((k) => k.kategori === kategori)?.isi || null;
  };

  const visiMisiData = {
    visi: "Terwujudnya Kelurahan Wergu Wetan yang Maju, Sejahtera, dan Berkarakter melalui Pelayanan Prima dan Pemberdayaan Masyarakat.",
    misi: [
      "Meningkatkan kualitas pelayanan administrasi yang cepat, tepat, dan transparan.",
      "Memberdayakan potensi ekonomi lokal dan UMKM warga kelurahan.",
      "Memperkuat kerukunan sosial dan partisipasi aktif masyarakat dalam pembangunan.",
      "Meningkatkan infrastruktur dan fasilitas umum yang merata dan berkualitas.",
      "Mewujudkan tata kelola pemerintahan yang bersih, akuntabel, dan berorientasi pelayanan.",
    ],
  };

  const tugasFungsiData = {
    tugas:
      "Bertindak selaku ujung tombak pelaksana tugas Camat dalam menyelenggarakan urusan pemerintahan lokal, memelihara ketentraman serta ketertiban umum, dan merealisasikan program pemberdayaan warga secara komprehensif.",
    fungsi: [
      "Menyelenggarakan pelayanan administratif terpadu dengan standar mutu yang prima bagi semua lini masyarakat.",
      "Melakukan perumusan serta implementasi program pembangunan infrastruktur di lingkup RW.",
      "Membina dan memfasilitasi peran aktif kelembagaan sosial masyarakat (RT, RW, PKK, hingga Karang Taruna).",
      "Merespons dinamika kerukunan warga serta menangani potensi gangguan stabilitas ketertiban lingkungan.",
      "Memeriksa, memvalidasi, dan menyediakan pangkalan data demografi dan statistik kependudukan yang sangat akurat.",
    ],
  };

  const bannerData = banners[0] || null;

  const menus = [
    { id: "visi", label: t.profilPage.menu.visi, icon: Target },
    { id: "tugas", label: t.profilPage.menu.tugas, icon: Briefcase },
    { id: "struktur", label: t.profilPage.menu.struktur, icon: Users },
    { id: "anggota", label: "Daftar Perangkat", icon: User },
    { id: "monografi", label: "Statistik Wilayah", icon: BarChart },

    { id: "prestasi", label: t.profilPage.menu.prestasi, icon: Trophy },
  ];

  // Logic Click to Scroll (only — no scroll spy, same as LayananView)
  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - SCROLL_OFFSET;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* === 1. HERO HEADER (Statis) === */}
      <StaticBanner
        title={bannerData?.judul || "Profil Kelurahan"}
        desc={bannerData?.deskripsi || "Mengenal lebih dekat struktur organisasi, visi, misi, dan sarana prasarana Kelurahan Wergu Wetan."}
        imageURL={bannerData?.gambarURL || "/images/hero_office.png"}
        Icon={Target}
      />

      {/* === 2. STICKY SUB-NAVBAR === */}
      <div
        className={`sticky z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md transition-all duration-300`}
        style={{ top: `${HEADER_OFFSET}px`, height: `${SUBMENU_HEIGHT}px` }}
      >
        <div className="container mx-auto h-full px-4">
          <div className="no-scrollbar flex h-full items-center justify-start gap-1 overflow-x-auto md:justify-center">
            {menus.map((menu) => (
              <button
                key={menu.id}
                onClick={() => scrollToSection(menu.id)}
                className={`group relative flex h-full items-center gap-2 border-b-[3px] px-6 text-[13px] font-bold whitespace-nowrap transition-all md:text-sm ${
                  activeTab === menu.id
                    ? "border-blue-600 bg-blue-50/50 text-blue-600 rounded-t-lg"
                    : "border-transparent text-slate-500 hover:bg-slate-100 hover:text-blue-600 hover:border-blue-400 rounded-t-lg"
                }`}
              >
                {menu.label}
              </button>
            ))}
          </div>
        </div>
      </div>



      {/* === 3. KONTEN UTAMA === */}
      <div className="relative z-30 container mx-auto max-w-5xl space-y-16 px-4 py-12 pt-16">
        {/* SECTION: VISI MISI */}
        <section id="visi" className="scroll-mt-[200px]">
          <SectionHeader
            title={t.profilPage.menu.visi}
            subtitle="PROFIL & ARAH KELURAHAN"
            icon={Target}
          />
          <VisiMisiRenderer html={getKonten("visi_misi")} fallback={visiMisiData} />
        </section>

        {/* SECTION: TUGAS */}
        <section id="tugas" className="scroll-mt-[200px]">
          <SectionHeader
            title={t.profilPage.menu.tugas}
            subtitle="TUGAS POKOK & FUNGSI BIROKRASI"
            icon={Briefcase}
          />
          <TugasFungsiRenderer html={getKonten("tugas_fungsi")} fallback={tugasFungsiData} />
        </section>

        {/* SECTION: STRUKTUR */}
        <section id="struktur" className="scroll-mt-[200px]">
          <SectionHeader
            title={t.profilPage.menu.struktur}
            subtitle="STRUKTUR ORGANISASI KELURAHAN"
            icon={Users}
          />

          {/* Full-width scrollable org chart */}
          <div className="-mx-4 w-full overflow-x-auto px-4 pb-6">
            <div style={{ minWidth: "860px" }}>
              {/* ─── LEVEL 1: LURAH ─── */}
              <div className="flex justify-center">
                {perangkat
                  .filter(
                    (p) =>
                      p.jabatan.toLowerCase().includes("lurah") &&
                      !p.jabatan.toLowerCase().includes("sekretaris")
                  )
                  .map((p) => (
                    <GovStructureNode key={p.id} data={p} rank="top" />
                  ))}
              </div>

              {/* connector Lurah → Sekretaris */}
              <div className="flex justify-center">
                <div className="h-6 w-0.5 bg-blue-700" />
              </div>

              {/* ─── LEVEL 2: SEKRETARIS ─── */}
              <div className="flex justify-center">
                {perangkat
                  .filter((p) => p.jabatan.toLowerCase().includes("sekretaris"))
                  .map((p) => (
                    <GovStructureNode key={p.id} data={p} rank="mid" />
                  ))}
              </div>

              {/* connector Sekretaris → Kasi row */}
              {(() => {
                const kasi = perangkat.filter((p) => p.jabatan.toLowerCase().includes("kasi"));
                const staf = perangkat.filter(
                  (p) =>
                    !p.jabatan.toLowerCase().includes("lurah") &&
                    !p.jabatan.toLowerCase().includes("sekretaris") &&
                    !p.jabatan.toLowerCase().includes("kasi")
                );
                const KCARD = 192;
                const KGAP = 14;
                const SCARD = 168;
                const SGAP = 12;
                const kasiBarW = kasi.length > 1 ? (kasi.length - 1) * (KCARD + KGAP) : 0;
                const stafBarW = staf.length > 1 ? (staf.length - 1) * (SCARD + SGAP) : 0;

                return (
                  <>
                    {/* vertical stem → horizontal kasi bar */}
                    <div className="flex justify-center">
                      <div className="h-6 w-0.5 bg-blue-700" />
                    </div>
                    {kasi.length > 1 && (
                      <div className="flex justify-center">
                        <div
                          className="h-0.5 rounded-full bg-blue-700"
                          style={{ width: kasiBarW }}
                        />
                      </div>
                    )}
                    {/* vertical drops into kasi cards */}
                    <div className="flex justify-center" style={{ gap: KGAP }}>
                      {kasi.map((_, i) => (
                        <div key={i} className="flex justify-center" style={{ width: KCARD }}>
                          <div className="h-6 w-0.5 bg-blue-700" />
                        </div>
                      ))}
                    </div>

                    {/* ─── LEVEL 3: KASI ─── */}
                    <div className="flex justify-center" style={{ gap: KGAP }}>
                      {kasi.map((p) => (
                        <GovStructureNode key={p.id} data={p} rank="kasi" />
                      ))}
                    </div>

                    {/* SECTION DIVIDER: Staf */}
                    {staf.length > 0 && (
                      <>
                        <div className="my-8 flex items-center gap-4">
                          <div className="h-px flex-1 bg-slate-100" />
                          <span className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-[10px] font-black tracking-[0.15em] text-slate-400 uppercase">
                            Staf & Jabatan Fungsional
                          </span>
                          <div className="h-px flex-1 bg-slate-100" />
                        </div>

                        {staf.length > 1 && (
                          <div className="flex justify-center">
                            <div
                              className="h-0.5 rounded-full bg-blue-700"
                              style={{ width: stafBarW }}
                            />
                          </div>
                        )}
                        <div className="flex justify-center" style={{ gap: SGAP }}>
                          {staf.map((_, i) => (
                            <div key={i} className="flex justify-center" style={{ width: SCARD }}>
                              <div className="h-6 w-0.5 bg-blue-700" />
                            </div>
                          ))}
                        </div>

                        {/* ─── LEVEL 4: STAF ─── */}
                        <div
                          className="flex flex-wrap justify-center"
                          style={{ gap: SGAP, rowGap: "20px" }}
                        >
                          {staf.map((p) => (
                            <GovStructureNode key={p.id} data={p} rank="staf" />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </section>

        {/* SECTION: ANGGOTA / ORANG-ORANGNYA */}
        <section id="anggota" className="scroll-mt-[200px]">
          <SectionHeader
            title="Daftar Perangkat Kelurahan"
            subtitle="SDM & APARATUR PEMERINTAHAN"
            icon={User}
          />

          <div className="mt-8 w-full overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse text-center text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-[#f5f5f5]">
                    <th className="w-16 border-r border-slate-200 px-4 py-4 align-middle font-bold text-slate-800">
                      No.
                    </th>
                    <th className="w-[25%] border-r border-slate-200 px-6 py-4 align-middle font-bold text-slate-800">
                      Jabatan
                    </th>
                    <th className="w-[45%] border-r border-slate-200 px-8 py-4 text-left align-middle font-bold text-slate-800">
                      Pejabat
                    </th>
                    <th className="px-6 py-4 align-middle font-bold text-slate-800">
                      Status Kepegawaian
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {perangkat.map((p, index) => (
                    <tr key={p.id} className="transition-colors hover:bg-slate-50">
                      <td className="border-r border-slate-200 px-4 py-6 align-middle font-medium text-slate-700">
                        {index + 1}
                      </td>
                      <td className="border-r border-slate-200 px-6 py-6 align-middle">
                        <span className="text-[15px] font-medium text-[#c92a2a]">{p.jabatan}</span>
                      </td>
                      <td className="border-r border-slate-200 px-8 py-4 align-middle">
                        <div className="flex flex-row items-center justify-start gap-6">
                          <div className="flex h-[112px] w-[84px] shrink-0 items-center justify-center overflow-hidden border border-slate-200/50 bg-slate-100">
                            {p.foto ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={p.foto}
                                alt={p.nama}
                                className="h-full w-full object-cover object-top"
                              />
                            ) : (
                              <User size={32} className="text-slate-300" />
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-[15px] text-slate-800">{p.nama}</div>
                            {p.nip && (
                              <div className="mt-2 text-[13px] text-slate-500">NIP. {p.nip}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 align-middle font-medium text-slate-700">
                        {p.nip ? "PNS / ASN" : "Staf / Honorer"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION: STATISTIK WILAYAH */}
        <section id="monografi" className="scroll-mt-[200px]">
          <SectionHeader
            title="Data Kependudukan & Demografi Wilayah"
            subtitle="STATISTIK KELURAHAN"
            icon={BarChart}
          />
          <div className="w-full">
            {/* 1. Header & Map (contextual) */}
            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Map Box */}
              <div className="group relative h-[250px] overflow-hidden rounded-xl border border-slate-100 bg-slate-200 shadow-sm lg:col-span-1">
                <iframe
                  className="h-full w-full contrast-[1.05] filter"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.617775671155!2d110.84627417594305!3d-6.81625696667274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70c4e731de9701%3A0xc9561da6c650e3c4!2sKantor%20Kelurahan%20Wergu%20Wetan!5e0!3m2!1sen!2sus!4v1770589390255!5m2!1sen!2sus"
                  loading="lazy"
                ></iframe>
              </div>

              {/* Quick Demographics */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:col-span-2">
                {[
                  { i: <Users size={20} />, t: "Total Penduduk", v: "8.542", s: "Jiwa" },
                  {
                    i: <User size={20} />,
                    t: "Laki-laki / Perempuan",
                    v: "4,2K / 4,3K",
                    s: "Rasio 49:51",
                  },
                  { i: <Home size={20} />, t: "Kepala Keluarga", v: "2.156", s: "Rumah Tangga" },
                  { i: <MapPin size={20} />, t: "Kepadatan", v: "95", s: "Jiwa / Ha" },
                  { i: <Map size={20} />, t: "Distribusi", v: "20 / 5", s: "RT / RW" },
                ].map((d, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    className="group flex cursor-default flex-col items-start justify-center rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      {d.i}
                    </div>
                    <h4 className="mb-1 text-2xl leading-none font-black text-slate-800 transition-colors group-hover:text-blue-700">
                      {d.v}
                    </h4>
                    <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                      {d.t}
                    </p>
                    <p className="mt-1 text-[11px] leading-none font-medium text-slate-400">
                      {d.s}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 2. Bento Box of specific domains requested */}
            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Laporan & Penanganan Kasus */}
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5 md:p-10">
                <h4 className="mb-6 flex items-center gap-3 text-[13px] font-black tracking-widest text-blue-700 uppercase">
                  <Activity size={20} className="text-blue-600" /> Laporan & Pengaduan Warga
                </h4>

                <div className="mb-8 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-100 bg-white p-5 text-center shadow-sm">
                    <p className="mb-1.5 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                      Total Bulan Ini
                    </p>
                    <p className="text-4xl font-black text-slate-800">42</p>
                  </div>
                  <div className="rounded-xl bg-emerald-500 p-5 text-center shadow-sm">
                    <p className="mb-1.5 text-[11px] font-bold tracking-widest text-emerald-100 uppercase">
                      Status Selesai
                    </p>
                    <p className="text-4xl font-black text-white">38</p>
                  </div>
                </div>

                {/* Top Kasus */}
                <div className="space-y-5">
                  <h5 className="mb-2 border-b border-blue-100 pb-2 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                    Isu Dominan Berdasarkan Kategori
                  </h5>
                  {[
                    { name: "Layanan Kesehatan Lingkungan (RW 03)", val: 55, color: "bg-rose-500" },
                    {
                      name: "Infrastruktur Jalan Lingkungan (RW 05)",
                      val: 25,
                      color: "bg-amber-500",
                    },
                    {
                      name: "Administrasi & Pendaftaran KK (RW 02)",
                      val: 20,
                      color: "bg-blue-500",
                    },
                  ].map((isu, idx) => (
                    <div key={idx} className="group cursor-default">
                      <div className="mb-2 flex justify-between text-[13px] font-bold text-slate-700 transition-colors group-hover:text-blue-700">
                        <span>{isu.name}</span>
                        <span>{isu.val}%</span>
                      </div>
                      <div className="h-2.5 w-full overflow-hidden rounded-full border border-blue-100/50 bg-white shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${isu.val}%` }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 1, ease: "easeOut", delay: idx * 0.1 }}
                          className={`h-full ${isu.color} rounded-r-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fasilitas Publik & Ekonomi */}
              <div className="flex flex-col rounded-xl border border-slate-200/60 bg-slate-50 p-5 md:p-10">
                <h4 className="mb-6 flex items-center gap-3 text-[13px] font-black tracking-widest text-slate-700 uppercase">
                  <Building2 size={20} className="text-slate-500" /> Ketersediaan Fasilitas Dasar
                </h4>
                <div className="flex flex-1 flex-col justify-center space-y-5">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="group flex cursor-default items-center justify-between rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-rose-100 hover:shadow-lg"
                  >
                    <div>
                      <span className="mb-1 block text-[15px] font-black text-slate-800 transition-colors group-hover:text-rose-600">
                        Posyandu & Puskesmas
                      </span>
                      <span className="block text-[12px] font-medium text-slate-500">
                        Pusat layanan kesehatan dasar
                      </span>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-xl font-black text-rose-600 transition-colors group-hover:bg-rose-500 group-hover:text-white">
                      8
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="group flex cursor-default items-center justify-between rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-blue-100 hover:shadow-lg"
                  >
                    <div>
                      <span className="mb-1 block text-[15px] font-black text-slate-800 transition-colors group-hover:text-blue-600">
                        Sekolah & Pendidikan Dasar
                      </span>
                      <span className="block text-[12px] font-medium text-slate-500">
                        PAUD, SD, dan jenjang menengah
                      </span>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl font-black text-blue-600 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                      12
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="group flex cursor-default items-center justify-between rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-amber-100 hover:shadow-lg"
                  >
                    <div>
                      <span className="mb-1 block text-[15px] font-black text-slate-800 transition-colors group-hover:text-amber-600">
                        Sentra Izin Usaha Lokal UMKM
                      </span>
                      <span className="block text-[12px] font-medium text-slate-500">
                        Kapasitas ekonomi kawasan terpadu
                      </span>
                    </div>
                    <div className="flex h-12 flex-col justify-center border-l-2 border-amber-100 pl-4 text-amber-600 transition-colors group-hover:border-amber-500">
                      <span className="mb-1 block text-2xl leading-none font-black">142</span>
                      <span className="text-[10px] font-bold tracking-widest uppercase">Aktif</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* 3. Bottom Trending / Kunjungan */}
            <div className="relative flex flex-col items-center justify-between gap-10 overflow-hidden rounded-xl bg-[#0B132B] p-6 md:p-12 text-white shadow-xl shadow-blue-900/10 md:flex-row">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <BarChart size={180} />
              </div>
              <div className="relative z-10 w-full md:w-[60%]">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/20 px-3 py-1.5 text-[10px] font-black tracking-widest text-blue-300 uppercase">
                  <Target size={12} /> Pencapaian Layanan
                </div>
                <h4 className="mb-3 text-2xl leading-tight font-bold md:text-[28px]">
                  Tren Kunjungan & Akses Birokrasi
                </h4>
                <p className="max-w-lg text-[14px] leading-relaxed text-slate-400">
                  Peningkatan <strong className="text-white">15%</strong> akses layanan per bulan
                  akibat efisiensi digitalisasi birokrasi. Warga dapat memantau pelayanan terkini
                  secara akurat via platform.
                </p>
              </div>
              <div className="relative z-10 flex w-full items-end justify-start gap-5 border-t border-slate-700/50 pt-8 pl-0 md:w-[40%] md:justify-end md:border-t-0 md:border-l md:pt-0 md:pl-10">
                <div className="flex h-16 items-end gap-1.5 opacity-80">
                  {[20, 35, 50, 45, 70, 95].map((val, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${val}%` }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                      className="w-5 rounded-t-sm bg-emerald-400 lg:w-7"
                    />
                  ))}
                </div>
                <div className="mb-[-6px] text-left">
                  <p className="text-[40px] leading-none font-black text-emerald-400">
                    480<span className="text-2xl">+</span>
                  </p>
                  <p className="mt-1 text-[10px] font-bold tracking-widest text-slate-300 uppercase">
                    Total Kunjungan Rutin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: PRESTASI */}
        <section id="prestasi" className="scroll-mt-[200px]">
          <SectionHeader
            title={t.profilPage.menu.prestasi}
            subtitle="PENCAPAIAN & PENGHARGAAN"
            icon={Medal}
          />
          <div className="w-full">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                {
                  year: "2024",
                  title: "Juara 1 Lomba Kelurahan Bersih Terpadu Tingkat Kabupaten",
                  desc: "Penghargaan prestisius atas keunggulan sistem manajemen limbah terpadu, inisiatif 0% emisi karbon lokal, dan program Bank Sampah Wergu Berkah.",
                  color: "from-amber-400 to-yellow-500",
                  icon: Trophy,
                  bg: "bg-amber-50/80",
                },
                {
                  year: "2023",
                  title: "Peringkat 3 Posyandu Teladan Se-Karesidenan Pati",
                  desc: "Penghargaan Dinas Kesehatan Provinsi berkat rekor penekanan angka stunting di bawah 5% secara persisten serta pelaporan gizi digital yang presisi.",
                  color: "from-slate-400 to-slate-500",
                  icon: Medal,
                  bg: "bg-slate-50",
                },
                {
                  year: "2022",
                  title: "Desa Digital Terbaik Inovasi Layanan Publik Tingkat Provinsi",
                  desc: "Pengakuan istimewa oleh Gubernur atas implementasi portal E-Kelurahan mandiri yang memangkas waktu birokrasi dan antrean administrasi.",
                  color: "from-orange-400 to-red-500",
                  icon: Star,
                  bg: "bg-orange-50/60",
                },
                {
                  year: "2021",
                  title: "Sentra Inovasi UMKM Mikro Kreatif Paling Berdaya Saing",
                  desc: "Apresiasi terhadap kebangkitan ekonomi mikro pasca-pandemi, melahirkan lebih dari 50 UMKM baru dalam produk kerajinan dan tata boga lokal.",
                  color: "from-emerald-400 to-teal-500",
                  icon: Target,
                  bg: "bg-emerald-50/60",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col justify-between ${item.bg} group overflow-hidden rounded-xl border border-black/5 p-5 md:p-8 transition-all duration-300 hover:border-black/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]`}
                >
                  <div
                    className={`absolute -top-10 -right-10 h-40 w-40 bg-gradient-to-br ${item.color} pointer-events-none rounded-full opacity-10 blur-2xl transition-transform duration-700 group-hover:scale-150`}
                  />

                  <div>
                    <div className="relative z-10 mb-6 flex items-start justify-between">
                      <div
                        className={`h-14 w-14 bg-gradient-to-br ${item.color} flex shrink-0 items-center justify-center rounded-[1.25rem] text-white shadow-md`}
                      >
                        <item.icon size={26} strokeWidth={2.5} />
                      </div>
                      <div className="rounded-full border border-slate-100 bg-white px-4 py-1.5 text-sm font-bold text-slate-700 shadow-sm">
                        Tahun {item.year}
                      </div>
                    </div>

                    <div className="relative z-10">
                      <h4 className="mb-3 text-[18px] leading-[1.3] font-extrabold text-[#0B132B] md:text-[19px]">
                        {item.title}
                      </h4>
                      <p className="text-[14px] leading-[1.6] font-medium text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// === HELPER COMPONENTS ===
function SectionHeader({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle?: string;
  icon?: any;
}) {
  return (
    <div className="mb-12 border-b border-slate-100 pb-6">
      <p className="mb-3 text-[11px] font-black tracking-widest text-[#0f3b9e] uppercase">
        {subtitle || "KELURAHAN WERGU WETAN"}
      </p>
      <h2 className="text-3xl leading-[1.1] font-bold tracking-tight text-slate-900 md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function CardPerangkat({ data, isLurah }: { data: any; isLurah?: boolean }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-xl ${
        isLurah ? "border-blue-200 ring-2 ring-blue-100" : "border-slate-100 hover:border-blue-100"
      }`}
    >
      {isLurah && (
        <div className="absolute top-3 right-3 z-10 rounded-full bg-blue-600 px-2.5 py-1 text-[9px] font-black tracking-widest text-white uppercase">
          Pimpinan
        </div>
      )}
      <div className={`flex items-center gap-5 p-4 md:p-6 ${isLurah ? "" : ""}`}>
        {/* Foto */}
        <div
          className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-300 ${
            isLurah ? "h-20 w-20" : "h-16 w-16"
          }`}
        >
          {data.foto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.foto}
              alt={data.nama}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />
          ) : (
            <User size={isLurah ? 36 : 28} />
          )}
        </div>
        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-[9px] font-black tracking-widest text-blue-600 uppercase">
            {data.jabatan}
          </p>
          <h4
            className={`leading-tight font-bold text-slate-800 ${isLurah ? "text-base" : "text-sm"}`}
          >
            {data.nama}
          </h4>
          {data.nip && (
            <p className="mt-2 inline-block rounded-lg bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-400">
              NIP. {data.nip}
            </p>
          )}
        </div>
      </div>
      {/* Accent Line */}
      <div
        className={`h-1 w-full bg-gradient-to-r ${isLurah ? "from-blue-600 to-blue-400" : "from-slate-100 to-slate-50 group-hover:from-blue-200 group-hover:to-blue-50"} transition-all duration-500`}
      />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="group rounded-xl border border-slate-100 bg-white p-5 md:p-8 text-center shadow-sm transition-all duration-300 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200">
      <h3 className="mb-1 text-3xl font-extrabold text-slate-800 transition-colors group-hover:text-white">
        {value}
      </h3>
      <p className="text-xs font-bold tracking-wider text-slate-500 uppercase transition-colors group-hover:text-blue-100">
        {label}
      </p>
    </div>
  );
}

// STRUKTUR KOTAK KOSONG (Tanpa Foto dan Nama)
function GovStructureNode({ data, rank }: { data: any; rank: "top" | "mid" | "kasi" | "staf" }) {
  const isTop = rank === "top";
  const isMid = rank === "mid";
  const isKasi = rank === "kasi";

  // Width of the card
  const W = isTop ? 280 : isMid ? 240 : isKasi ? 192 : 168;

  const bgCls = isTop ? "bg-blue-50" : "bg-white";
  const textCls = isTop
    ? "text-blue-700 text-[13px]"
    : isMid
      ? "text-blue-700 text-[12px]"
      : isKasi
        ? "text-blue-600 text-[11px]"
        : "text-slate-600 text-[10px]";

  return (
    <div className="flex flex-col items-center" style={{ width: W }}>
      <div
        className={`w-full ${bgCls} relative rounded border border-blue-200 p-4 text-center shadow-sm transition-shadow hover:shadow-md`}
      >
        {/* Simple box for Jabatan only */}
        <h4 className={`leading-relaxed font-black tracking-widest uppercase ${textCls}`}>
          {data.jabatan}
        </h4>
      </div>
    </div>
  );
}

function VisiMisiRenderer({
  html,
  fallback,
}: {
  html: string | null;
  fallback: { visi: string; misi: string[] };
}) {
  const isContentEmpty = !html || html.trim().length < 20;

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-5 md:p-12 shadow-sm">
      <div className="pointer-events-none absolute -top-10 -right-10 rotate-12 opacity-[0.02]">
        <Target size={400} />
      </div>

      <div className="relative z-10">
        {!isContentEmpty ? (
          <div className="prose prose-slate prose-headings:text-[14px] prose-headings:font-black prose-headings:text-slate-800 prose-headings:uppercase prose-headings:tracking-[0.15em] prose-headings:mb-4 prose-headings:mt-8 first:prose-headings:mt-0 prose-p:text-slate-700 prose-p:mb-6 last:prose-p:mb-0 prose-strong:font-black prose-strong:text-slate-800 prose-li:text-slate-700 prose-li:marker:text-slate-400 prose-li:marker:font-bold prose-ul:my-4 prose-ol:my-4 max-w-none text-justify text-[15px] leading-relaxed text-slate-700 md:text-[16px]">
            <div dangerouslySetInnerHTML={{ __html: html! }} />
          </div>
        ) : (
          <>
            {/* VISI */}
            <div className="mb-8">
              <h4 className="mb-4 text-[14px] font-black tracking-widest text-slate-800 uppercase">
                VISI
              </h4>
              <p className="text-justify text-[15px] leading-relaxed text-slate-700 md:text-[16px]">
                {fallback.visi}
              </p>
            </div>

            {/* MISI */}
            <div>
              <h4 className="mb-4 text-[14px] font-black tracking-widest text-slate-800 uppercase">
                MISI
              </h4>
              <ol className="list-decimal space-y-2 pl-5 text-justify text-[15px] leading-relaxed text-slate-700 md:text-[16px]">
                {fallback.misi.map((misi, i) => (
                  <li key={i} className="pl-1 marker:font-bold marker:text-slate-400">
                    {misi}
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function TugasFungsiRenderer({
  html,
  fallback,
}: {
  html: string | null;
  fallback: { tugas: string; fungsi: string[] };
}) {
  const isContentEmpty = !html || html.trim().length < 20;

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-5 md:p-12 shadow-sm">
      <div className="pointer-events-none absolute -right-10 -bottom-10 -rotate-6 opacity-[0.02]">
        <Briefcase size={350} />
      </div>

      <div className="relative z-10">
        {!isContentEmpty ? (
          <div className="prose prose-slate prose-headings:text-[14px] prose-headings:font-black prose-headings:text-slate-800 prose-headings:uppercase prose-headings:tracking-[0.15em] prose-headings:mb-4 prose-headings:mt-8 first:prose-headings:mt-0 prose-p:text-slate-700 prose-p:mb-6 last:prose-p:mb-0 prose-strong:font-black prose-strong:text-slate-800 prose-li:text-slate-700 prose-li:marker:text-slate-400 prose-li:marker:font-bold prose-ul:my-4 prose-ol:my-4 max-w-none text-justify text-[15px] leading-relaxed text-slate-700 md:text-[16px]">
            <div dangerouslySetInnerHTML={{ __html: html! }} />
          </div>
        ) : (
          <>
            {/* TUGAS */}
            <div className="mb-8">
              <h4 className="mb-4 text-[14px] font-black tracking-widest text-slate-800 uppercase">
                TUGAS POKOK
              </h4>
              <p className="text-justify text-[15px] leading-relaxed text-slate-700 md:text-[16px]">
                {fallback.tugas}
              </p>
            </div>

            {/* FUNGSI */}
            <div>
              <h4 className="mb-4 text-[14px] font-black tracking-widest text-slate-800 uppercase">
                FUNGSI UTAMA
              </h4>
              <ol className="list-decimal space-y-2 pl-5 text-justify text-[15px] leading-relaxed text-slate-700 md:text-[16px]">
                {fallback.fungsi.map((f, i) => (
                  <li key={i} className="pl-1 marker:font-bold marker:text-slate-400">
                    {f}
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Simple Rocket Icon Helper
function RocketIcon({ className, size }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
      <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
    </svg>
  );
}
