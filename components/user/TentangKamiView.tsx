"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Target, Users, Briefcase, Map, Building2, Trophy, User, HeartPulse, Medal, Star, BarChart, MapPin, Home, Activity, X, ExternalLink, ChevronRight } from "lucide-react";

type Props = {
  banners: any[];
  perangkat: any[];
  konten: any[];
  stats?: any[];
};

const saranaData = [
  {
    title: "Gedung Kantor Kelurahan",
    tag: "PEMERINTAHAN",
    tagColor: "bg-blue-500",
    desc: "Pusat pelayanan utama seluas 400m², dilengkapi ruang tunggu ber-AC, digital loket, dan standar aksesibilitas difabel.",
    detail: "Kantor Kelurahan Wergu Wetan beroperasi setiap hari kerja pukul 07.30–15.30 WIB. Tersedia 6 loket layanan, ruang konsultasi, dan area parkir luas.",
    img: "/images/hero_office.png",
    icon: Building2,
    alamat: "Jl. Wergu Wetan, Kabupaten Kudus, Jawa Tengah",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.617775671155!2d110.84627417594305!3d-6.81625696667274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70c4e731de9701%3A0xc9561da6c650e3c4!2sKantor%20Kelurahan%20Wergu%20Wetan!5e0!3m2!1sen!2sus!4v1770589390255!5m2!1sen!2sus",
    mapUrl: "https://maps.google.com/?q=Kantor+Kelurahan+Wergu+Wetan+Kudus",
    accentColor: "from-blue-600 to-blue-400",
    features: ["6 Loket Layanan", "Parkir Luas", "Aksesibel Difabel", "WiFi Publik"],
  },
  {
    title: "Puskesmas Pembantu (Pustu)",
    tag: "KESEHATAN",
    tagColor: "bg-rose-500",
    desc: "Fasilitas kesehatan darurat dan posyandu dengan tenaga medis siaga harian untuk pencegahan stunting & vaksinasi.",
    detail: "Pustu beroperasi Senin–Jumat 08.00–14.00 WIB. Tersedia layanan imunisasi, pemeriksaan ibu hamil, dan konsultasi gizi balita.",
    img: "/images/sarana_puskesmas.png",
    icon: HeartPulse,
    alamat: "Gg. Posyandu RW 03, Wergu Wetan, Kudus",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.617775671155!2d110.84627417594305!3d-6.81625696667274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70c4e731de9701%3A0xc9561da6c650e3c4!2sKantor%20Kelurahan%20Wergu%20Wetan!5e0!3m2!1sen!2sus!4v1770589390255!5m2!1sen!2sus",
    mapUrl: "https://maps.google.com/?q=Puskesmas+Wergu+Kudus",
    accentColor: "from-rose-600 to-pink-400",
    features: ["Imunisasi Gratis", "KB & Gizi", "Konsultasi Ibu Hamil", "Cek Stunting"],
  },
  {
    title: "Balai Pertemuan Warga",
    tag: "SOSIAL & BUDAYA",
    tagColor: "bg-amber-500",
    desc: "Gedung serbaguna berkapasitas 300 orang untuk musyawarah desa, resepsi warga, dan pergelaran seni budaya.",
    detail: "Fasilitas meliputi panggung, sound system, proyektor, dan dapur umum. Dapat dipinjam warga melalui prosedur surat izin ke Kelurahan.",
    img: "/images/hero_community.png",
    icon: Users,
    alamat: "Jl. Balai Warga No.1, Wergu Wetan, Kudus",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.617775671155!2d110.84627417594305!3d-6.81625696667274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70c4e731de9701%3A0xc9561da6c650e3c4!2sKantor%20Kelurahan%20Wergu%20Wetan!5e0!3m2!1sen!2sus!4v1770589390255!5m2!1sen!2sus",
    mapUrl: "https://maps.google.com/?q=Balai+Warga+Wergu+Wetan+Kudus",
    accentColor: "from-amber-500 to-yellow-400",
    features: ["Kapasitas 300 Orang", "Sound System", "Proyektor & LED", "Dapur Umum"],
  },
  {
    title: "Lapangan Olahraga Terpadu",
    tag: "OLAHRAGA & REKREASI",
    tagColor: "bg-emerald-500",
    desc: "Fasilitas olahraga komprehensif mencakup lapangan voli, futsal, dan area bermain anak yang terintegrasi hijau.",
    detail: "Lapangan terpadu dilengkapi lampu penerangan untuk kegiatan malam hari. Tersedia tribune mini dan toilet umum yang bersih.",
    img: "/images/hero_neighborhood.png",
    icon: Trophy,
    alamat: "Kompleks Olahraga Wergu Wetan, Kudus",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.617775671155!2d110.84627417594305!3d-6.81625696667274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70c4e731de9701%3A0xc9561da6c650e3c4!2sKantor%20Kelurahan%20Wergu%20Wetan!5e0!3m2!1sen!2sus!4v1770589390255!5m2!1sen!2sus",
    mapUrl: "https://maps.google.com/?q=Lapangan+Olahraga+Wergu+Wetan+Kudus",
    accentColor: "from-emerald-500 to-teal-400",
    features: ["Voli & Futsal", "Area Bermain Anak", "Lampu Malam Hari", "Toilet Umum"],
  },
];


export default function TentangKamiView({ banners, perangkat, konten, stats = [] }: Props) {

  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("struktur");
  const [selectedSarana, setSelectedSarana] = useState<null | typeof saranaData[0]>(null);

  // === 🔧 KALKULASI HEADER (Sesuai ClientLayout) ===
  const HEADER_OFFSET = 120; // Topbar 40px + Navbar 80px
  const SUBMENU_HEIGHT = 60;
  const SCROLL_OFFSET = HEADER_OFFSET + SUBMENU_HEIGHT;

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
      "Mewujudkan tata kelola pemerintahan yang bersih, akuntabel, dan berorientasi pelayanan."
    ]
  };

  const tugasFungsiData = {
    tugas: "Bertindak selaku ujung tombak pelaksana tugas Camat dalam menyelenggarakan urusan pemerintahan lokal, memelihara ketentraman serta ketertiban umum, dan merealisasikan program pemberdayaan warga secara komprehensif.",
    fungsi: [
      "Menyelenggarakan pelayanan administratif terpadu dengan standar mutu yang prima bagi semua lini masyarakat.",
      "Melakukan perumusan serta implementasi program pembangunan infrastruktur di lingkup RW.",
      "Membina dan memfasilitasi peran aktif kelembagaan sosial masyarakat (RT, RW, PKK, hingga Karang Taruna).",
      "Merespons dinamika kerukunan warga serta menangani potensi gangguan stabilitas ketertiban lingkungan.",
      "Memeriksa, memvalidasi, dan menyediakan pangkalan data demografi dan statistik kependudukan yang sangat akurat."
    ]
  };

  const bannerData = banners[0] || null;

  const menus = [
    { id: "visi", label: t.profilPage.menu.visi, icon: Target },
    { id: "tugas", label: t.profilPage.menu.tugas, icon: Briefcase },
    { id: "struktur", label: t.profilPage.menu.struktur, icon: Users },
    { id: "anggota", label: "Daftar Perangkat", icon: User },
    { id: "monografi", label: "Statistik Wilayah", icon: BarChart },
    { id: "sarana", label: t.profilPage.menu.sarana, icon: Building2 },
    { id: "prestasi", label: t.profilPage.menu.prestasi, icon: Trophy },
  ];

  // Logic Click to Scroll (only — no scroll spy, same as LayananView)
  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - SCROLL_OFFSET;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">

      {/* === 1. HERO HEADER (STATIS - Serasi dengan Beranda) === */}
      <div className="relative h-[600px] md:h-[700px] w-full overflow-hidden bg-slate-900 mt-[-100px]">
        {/* Background Image Statis dari Admin */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bannerData?.gambarURL || '/images/hero_office.png'})` }}
        />
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Pindah ke bawah submenu */}

        {/* Konten Teks (Visual Centering) */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-20 pt-[100px]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block mb-6 p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
            >
              <User size={32} className="text-blue-200" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg tracking-tight"
            >
              {bannerData?.judul || "Profil Kelurahan"}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto leading-relaxed drop-shadow-md opacity-90"
            >
              {bannerData?.deskripsi || "Mengenal lebih dekat struktur organisasi, visi, misi, dan sarana prasarana Kelurahan Wergu Wetan."}
            </motion.p>
          </div>
        </div>
      </div>

      {/* === 2. STICKY SUB-NAVBAR === */}
      <div
        className={`sticky z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300`}
        style={{ top: `${HEADER_OFFSET}px`, height: `${SUBMENU_HEIGHT}px` }}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar h-full gap-1">
            {menus.map((menu) => (
              <button
                key={menu.id}
                onClick={() => scrollToSection(menu.id)}
                className={`group relative h-full flex items-center gap-2 px-6 text-[13px] md:text-sm font-bold transition-all whitespace-nowrap border-b-[3px] ${activeTab === menu.id
                  ? "border-blue-600 text-blue-600 bg-blue-50/50"
                  : "border-transparent text-slate-500 hover:text-blue-600 hover:bg-slate-50"
                  }`}
              >
                {menu.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* === 2.5 ANIMASI CUTOUT BANNER (DARI BERANDA AWAL) === */}
      <style>{`
         @keyframes bgScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
         }
         .bg-text-track { animation: bgScroll 40s linear infinite; }
         .bg-text-track-rev { animation: bgScroll 50s linear infinite reverse; }
      `}</style>

      {/* Layer 1: Dark base dengan scrolling text */}
      <div className="relative overflow-hidden z-20" style={{ minHeight: '200px', boxShadow: '0 2px 6px 0 rgba(0,0,0,0.08)' }}>
        <div className="bg-[#0f172a] absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="bg-text-track flex whitespace-nowrap absolute" style={{ top: '5%' }}>
            {[...Array(8)].map((_, i) => (
              <span key={i} className="shrink-0 text-blue-400 font-black uppercase px-8 tracking-widest" style={{ fontSize: '2.8rem', opacity: 0.6 }}>WERGU WETAN ✦</span>
            ))}
          </div>
          <div className="bg-text-track-rev flex whitespace-nowrap absolute" style={{ top: '32%', animationDuration: '28s' }}>
            {[...Array(6)].map((_, i) => (
              <span key={i} className="shrink-0 text-blue-300 font-black uppercase px-12 tracking-[0.4em]" style={{ fontSize: '1.6rem', opacity: 0.5 }}>KELURAHAN WERGU WETAN •</span>
            ))}
          </div>
          <div className="bg-text-track flex whitespace-nowrap absolute" style={{ top: '56%', animationDuration: '35s' }}>
            {[...Array(10)].map((_, i) => (
              <span key={i} className="shrink-0 text-blue-500 font-black uppercase px-6 tracking-widest" style={{ fontSize: '3.5rem', opacity: 0.45 }}>WERGU WETAN</span>
            ))}
          </div>
          <div className="bg-text-track-rev flex whitespace-nowrap absolute" style={{ top: '78%', animationDuration: '22s' }}>
            {[...Array(8)].map((_, i) => (
              <span key={i} className="shrink-0 text-blue-400 font-black uppercase px-10 tracking-[0.3em]" style={{ fontSize: '1.9rem', opacity: 0.55 }}>KUDUS · WERGU WETAN ✦</span>
            ))}
          </div>
        </div>

        {/* Layer 2: White overlay absolute inset-0 → mix-blend-mode: screen */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4" style={{ background: '#eef2ff', mixBlendMode: 'screen' }}>
          <h2 className="font-black tracking-tight leading-tight text-4xl md:text-6xl lg:text-7xl" style={{ color: '#000' }}>
            SELAMAT DATANG DI WEBSITE
          </h2>
          <h2 className="font-black tracking-tight text-4xl md:text-6xl lg:text-7xl text-center" style={{ color: '#000' }}>
            KELURAHAN WERGU WETAN
          </h2>
        </div>
      </div>

      {/* === 3. KONTEN UTAMA === */}
      <div className="container mx-auto px-4 py-12 pt-16 space-y-24 max-w-5xl relative z-30">

        {/* SECTION: VISI MISI */}
        <section id="visi" className="scroll-mt-[200px]">
          <SectionHeader title={t.profilPage.menu.visi} subtitle="PROFIL & ARAH KELURAHAN" icon={Target} />
          <VisiMisiRenderer html={getKonten('visi_misi')} fallback={visiMisiData} />
        </section>

        {/* SECTION: TUGAS */}
        <section id="tugas" className="scroll-mt-[200px]">
          <SectionHeader title={t.profilPage.menu.tugas} subtitle="TUGAS POKOK & FUNGSI BIROKRASI" icon={Briefcase} />
          <TugasFungsiRenderer html={getKonten('tugas_fungsi')} fallback={tugasFungsiData} />
        </section>

        {/* SECTION: STRUKTUR */}
        <section id="struktur" className="scroll-mt-[200px]">
          <SectionHeader title={t.profilPage.menu.struktur} subtitle="STRUKTUR ORGANISASI KELURAHAN" icon={Users} />

          {/* Full-width scrollable org chart */}
          <div className="w-full overflow-x-auto pb-6 -mx-4 px-4">
            <div style={{ minWidth: '860px' }}>

              {/* ─── LEVEL 1: LURAH ─── */}
              <div className="flex justify-center">
                {perangkat.filter(p =>
                  p.jabatan.toLowerCase().includes('lurah') &&
                  !p.jabatan.toLowerCase().includes('sekretaris')
                ).map((p) => (
                  <GovStructureNode key={p.id} data={p} rank="top" />
                ))}
              </div>

              {/* connector Lurah → Sekretaris */}
              <div className="flex justify-center"><div className="w-0.5 h-6 bg-blue-700" /></div>

              {/* ─── LEVEL 2: SEKRETARIS ─── */}
              <div className="flex justify-center">
                {perangkat.filter(p => p.jabatan.toLowerCase().includes('sekretaris')).map((p) => (
                  <GovStructureNode key={p.id} data={p} rank="mid" />
                ))}
              </div>

              {/* connector Sekretaris → Kasi row */}
              {(() => {
                const kasi = perangkat.filter(p => p.jabatan.toLowerCase().includes('kasi'));
                const staf = perangkat.filter(p =>
                  !p.jabatan.toLowerCase().includes('lurah') &&
                  !p.jabatan.toLowerCase().includes('sekretaris') &&
                  !p.jabatan.toLowerCase().includes('kasi')
                );
                const KCARD = 192; const KGAP = 14;
                const SCARD = 168; const SGAP = 12;
                const kasiBarW = kasi.length > 1 ? (kasi.length - 1) * (KCARD + KGAP) : 0;
                const stafBarW = staf.length > 1 ? (staf.length - 1) * (SCARD + SGAP) : 0;

                return (
                  <>
                    {/* vertical stem → horizontal kasi bar */}
                    <div className="flex justify-center"><div className="w-0.5 h-6 bg-blue-700" /></div>
                    {kasi.length > 1 && (
                      <div className="flex justify-center">
                        <div className="h-0.5 bg-blue-700 rounded-full" style={{ width: kasiBarW }} />
                      </div>
                    )}
                    {/* vertical drops into kasi cards */}
                    <div className="flex justify-center" style={{ gap: KGAP }}>
                      {kasi.map((_, i) => (
                        <div key={i} className="flex justify-center" style={{ width: KCARD }}>
                          <div className="w-0.5 h-6 bg-blue-700" />
                        </div>
                      ))}
                    </div>

                    {/* ─── LEVEL 3: KASI ─── */}
                    <div className="flex justify-center" style={{ gap: KGAP }}>
                      {kasi.map(p => <GovStructureNode key={p.id} data={p} rank="kasi" />)}
                    </div>

                    {/* SECTION DIVIDER: Staf */}
                    {staf.length > 0 && (
                      <>
                        <div className="flex items-center gap-4 my-8">
                          <div className="flex-1 h-px bg-slate-100" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] px-3 py-1 rounded-full bg-slate-50 border border-slate-100">Staf & Jabatan Fungsional</span>
                          <div className="flex-1 h-px bg-slate-100" />
                        </div>

                        {staf.length > 1 && (
                          <div className="flex justify-center">
                            <div className="h-0.5 bg-blue-700 rounded-full" style={{ width: stafBarW }} />
                          </div>
                        )}
                        <div className="flex justify-center" style={{ gap: SGAP }}>
                          {staf.map((_, i) => (
                            <div key={i} className="flex justify-center" style={{ width: SCARD }}>
                              <div className="w-0.5 h-6 bg-blue-700" />
                            </div>
                          ))}
                        </div>

                        {/* ─── LEVEL 4: STAF ─── */}
                        <div className="flex justify-center flex-wrap" style={{ gap: SGAP, rowGap: '20px' }}>
                          {staf.map(p => <GovStructureNode key={p.id} data={p} rank="staf" />)}
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
          <SectionHeader title="Daftar Perangkat Kelurahan" subtitle="SDM & APARATUR PEMERINTAHAN" icon={User} />

          <div className="bg-white border border-slate-200 overflow-hidden mt-8 w-full shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse min-w-[800px] text-sm">
                <thead>
                  <tr className="bg-[#f5f5f5] border-b border-slate-200">
                    <th className="py-4 px-4 font-bold text-slate-800 w-16 align-middle border-r border-slate-200">No.</th>
                    <th className="py-4 px-6 font-bold text-slate-800 w-[25%] align-middle border-r border-slate-200">Jabatan</th>
                    <th className="py-4 px-8 font-bold text-slate-800 w-[45%] align-middle border-r border-slate-200 text-left">Pejabat</th>
                    <th className="py-4 px-6 font-bold text-slate-800 align-middle">Status Kepegawaian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {perangkat.map((p, index) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-6 px-4 text-slate-700 font-medium align-middle border-r border-slate-200">{index + 1}</td>
                      <td className="py-6 px-6 align-middle border-r border-slate-200">
                        <span className="text-[#c92a2a] font-medium text-[15px]">
                          {p.jabatan}
                        </span>
                      </td>
                      <td className="py-4 px-8 align-middle border-r border-slate-200">
                        <div className="flex flex-row items-center gap-6 justify-start">
                          <div className="w-[84px] h-[112px] overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center border border-slate-200/50">
                            {p.foto ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={p.foto} alt={p.nama} className="w-full h-full object-cover object-top" />
                            ) : (
                              <User size={32} className="text-slate-300" />
                            )}
                          </div>
                          <div className="text-left flex-1">
                            <div className="text-slate-800 text-[15px]">{p.nama}</div>
                            {p.nip && <div className="text-slate-500 mt-2 text-[13px]">NIP. {p.nip}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6 align-middle text-slate-700 font-medium">
                        {p.nip ? 'PNS / ASN' : 'Staf / Honorer'}
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
          <SectionHeader title="Data Kependudukan & Demografi Wilayah" subtitle="STATISTIK KELURAHAN" icon={BarChart} />
          <div className="w-full">

            {/* 1. Header & Map (contextual) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Map Box */}
              <div className="lg:col-span-1 rounded-2xl overflow-hidden border border-slate-100 h-[250px] shadow-sm relative group bg-slate-200">
                <iframe className="w-full h-full filter contrast-[1.05]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.617775671155!2d110.84627417594305!3d-6.81625696667274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70c4e731de9701%3A0xc9561da6c650e3c4!2sKantor%20Kelurahan%20Wergu%20Wetan!5e0!3m2!1sen!2sus!4v1770589390255!5m2!1sen!2sus" loading="lazy"></iframe>
              </div>

              {/* Quick Demographics */}
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { i: <Users size={20} />, t: "Total Penduduk", v: "8.542", s: "Jiwa" },
                  { i: <User size={20} />, t: "Laki-laki / Perempuan", v: "4,2K / 4,3K", s: "Rasio 49:51" },
                  { i: <Home size={20} />, t: "Kepala Keluarga", v: "2.156", s: "Rumah Tangga" },
                  { i: <MapPin size={20} />, t: "Kepadatan", v: "95", s: "Jiwa / Ha" },
                  { i: <Map size={20} />, t: "Distribusi", v: "20 / 5", s: "RT / RW" }
                ].map((d, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-center items-start shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all cursor-default group"
                  >
                    <div className="text-blue-600 bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {d.i}
                    </div>
                    <h4 className="text-2xl font-black text-slate-800 leading-none mb-1 group-hover:text-blue-700 transition-colors">{d.v}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{d.t}</p>
                    <p className="text-[11px] text-slate-400 font-medium mt-1 leading-none">{d.s}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 2. Bento Box of specific domains requested */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

              {/* Laporan & Penanganan Kasus */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-[2rem] p-8 md:p-10">
                <h4 className="text-[13px] font-black text-blue-700 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <Activity size={20} className="text-blue-600" /> Laporan & Pengaduan Warga
                </h4>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Total Bulan Ini</p>
                    <p className="text-4xl font-black text-slate-800">42</p>
                  </div>
                  <div className="bg-emerald-500 rounded-2xl p-5 shadow-sm text-center">
                    <p className="text-[11px] font-bold text-emerald-100 uppercase tracking-widest mb-1.5">Status Selesai</p>
                    <p className="text-4xl font-black text-white">38</p>
                  </div>
                </div>

                {/* Top Kasus */}
                <div className="space-y-5">
                  <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-blue-100 pb-2">Isu Dominan Berdasarkan Kategori</h5>
                  {[
                    { name: "Layanan Kesehatan Lingkungan (RW 03)", val: 55, color: "bg-rose-500" },
                    { name: "Infrastruktur Jalan Lingkungan (RW 05)", val: 25, color: "bg-amber-500" },
                    { name: "Administrasi & Pendaftaran KK (RW 02)", val: 20, color: "bg-blue-500" },
                  ].map((isu, idx) => (
                    <div key={idx} className="group cursor-default">
                      <div className="flex justify-between text-[13px] font-bold text-slate-700 mb-2 group-hover:text-blue-700 transition-colors">
                        <span>{isu.name}</span>
                        <span>{isu.val}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-white rounded-full overflow-hidden border border-blue-100/50 shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${isu.val}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.2 }}
                          className={`h-full ${isu.color} rounded-r-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fasilitas Publik & Ekonomi */}
              <div className="bg-slate-50 border border-slate-200/60 rounded-[2rem] p-8 md:p-10 flex flex-col">
                <h4 className="text-[13px] font-black text-slate-700 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <Building2 size={20} className="text-slate-500" /> Ketersediaan Fasilitas Dasar
                </h4>
                <div className="flex-1 flex flex-col justify-center space-y-5">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-rose-100 transition-all cursor-default group"
                  >
                    <div>
                      <span className="block font-black text-slate-800 text-[15px] mb-1 group-hover:text-rose-600 transition-colors">Posyandu & Puskesmas</span>
                      <span className="block text-[12px] font-medium text-slate-500">Pusat layanan kesehatan dasar</span>
                    </div>
                    <div className="h-12 w-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 font-black text-xl group-hover:bg-rose-500 group-hover:text-white transition-colors">8</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all cursor-default group"
                  >
                    <div>
                      <span className="block font-black text-slate-800 text-[15px] mb-1 group-hover:text-blue-600 transition-colors">Sekolah & Pendidikan Dasar</span>
                      <span className="block text-[12px] font-medium text-slate-500">PAUD, SD, dan jenjang menengah</span>
                    </div>
                    <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black text-xl group-hover:bg-blue-500 group-hover:text-white transition-colors">12</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-amber-100 transition-all cursor-default group"
                  >
                    <div>
                      <span className="block font-black text-slate-800 text-[15px] mb-1 group-hover:text-amber-600 transition-colors">Sentra Izin Usaha Lokal UMKM</span>
                      <span className="block text-[12px] font-medium text-slate-500">Kapasitas ekonomi kawasan terpadu</span>
                    </div>
                    <div className="h-12 border-l-2 border-amber-100 pl-4 flex flex-col justify-center text-amber-600 group-hover:border-amber-500 transition-colors">
                      <span className="font-black text-2xl leading-none block mb-1">142</span>
                      <span className="text-[10px] uppercase font-bold tracking-widest">Aktif</span>
                    </div>
                  </motion.div>
                </div>
              </div>

            </div>

            {/* 3. Bottom Trending / Kunjungan */}
            <div className="bg-[#0B132B] rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 text-white relative overflow-hidden shadow-xl shadow-blue-900/10">
              <div className="absolute top-0 right-0 p-8 opacity-5"><BarChart size={180} /></div>
              <div className="relative z-10 w-full md:w-[60%]">
                <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                  <Target size={12} /> Pencapaian Layanan
                </div>
                <h4 className="text-2xl md:text-[28px] font-bold leading-tight mb-3">Tren Kunjungan & Akses Birokrasi</h4>
                <p className="text-slate-400 text-[14px] leading-relaxed max-w-lg">Peningkatan <strong className="text-white">15%</strong> akses layanan per bulan akibat efisiensi digitalisasi birokrasi. Warga dapat memantau pelayanan terkini secara akurat via platform.</p>
              </div>
              <div className="relative z-10 w-full md:w-[40%] flex items-end gap-5 justify-start md:justify-end border-t md:border-t-0 md:border-l border-slate-700/50 pt-8 md:pt-0 pl-0 md:pl-10">
                <div className="flex items-end gap-1.5 h-16 opacity-80">
                  {[20, 35, 50, 45, 70, 95].map((val, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${val}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                      className="w-5 lg:w-7 bg-emerald-400 rounded-t-sm"
                    />
                  ))}
                </div>
                <div className="text-left mb-[-6px]">
                  <p className="font-black text-[40px] leading-none text-emerald-400">480<span className="text-2xl">+</span></p>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1">Total Kunjungan Rutin</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: SARANA */}
        <section id="sarana" className="scroll-mt-[200px]">
          <SectionHeader title={t.profilPage.menu.sarana} subtitle="INFRASTRUKTUR & FASILITAS" icon={Building2} />
          <div className="w-full">

            {/* Bento Grid dengan Flip Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {saranaData.map((item, i) => (
                <SaranaCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>


        {/* SECTION: PRESTASI */}
        <section id="prestasi" className="scroll-mt-[200px]">
          <SectionHeader title={t.profilPage.menu.prestasi} subtitle="PENCAPAIAN & PENGHARGAAN" icon={Medal} />
          <div className="w-full">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { year: "2024", title: "Juara 1 Lomba Kelurahan Bersih Terpadu Tingkat Kabupaten", desc: "Penghargaan prestisius atas keunggulan sistem manajemen limbah terpadu, inisiatif 0% emisi karbon lokal, dan program Bank Sampah Wergu Berkah.", color: "from-amber-400 to-yellow-500", icon: Trophy, bg: "bg-amber-50/80" },
                { year: "2023", title: "Peringkat 3 Posyandu Teladan Se-Karesidenan Pati", desc: "Penghargaan Dinas Kesehatan Provinsi berkat rekor penekanan angka stunting di bawah 5% secara persisten serta pelaporan gizi digital yang presisi.", color: "from-slate-400 to-slate-500", icon: Medal, bg: "bg-slate-50" },
                { year: "2022", title: "Desa Digital Terbaik Inovasi Layanan Publik Tingkat Provinsi", desc: "Pengakuan istimewa oleh Gubernur atas implementasi portal E-Kelurahan mandiri yang memangkas waktu birokrasi dan antrean administrasi.", color: "from-orange-400 to-red-500", icon: Star, bg: "bg-orange-50/60" },
                { year: "2021", title: "Sentra Inovasi UMKM Mikro Kreatif Paling Berdaya Saing", desc: "Apresiasi terhadap kebangkitan ekonomi mikro pasca-pandemi, melahirkan lebih dari 50 UMKM baru dalam produk kerajinan dan tata boga lokal.", color: "from-emerald-400 to-teal-500", icon: Target, bg: "bg-emerald-50/60" }
              ].map((item, i) => (
                <div key={i} className={`relative flex flex-col justify-between ${item.bg} p-8 rounded-[2rem] border border-black/5 hover:border-black/10 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] group overflow-hidden`}>
                  <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${item.color} opacity-10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700`} />

                  <div>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className={`w-14 h-14 bg-gradient-to-br ${item.color} text-white flex items-center justify-center shrink-0 rounded-[1.25rem] shadow-md`}>
                        <item.icon size={26} strokeWidth={2.5} />
                      </div>
                      <div className="bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100 font-bold text-slate-700 text-sm">
                        Tahun {item.year}
                      </div>
                    </div>

                    <div className="relative z-10">
                      <h4 className="font-extrabold text-[#0B132B] text-[18px] md:text-[19px] leading-[1.3] mb-3">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 font-medium leading-[1.6] text-[14px]">
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
function SectionHeader({ title, subtitle, icon: Icon }: { title: string, subtitle?: string, icon?: any }) {
  return (
    <div className="mb-12 pb-6 border-b border-slate-100">
      <p className="text-[#0f3b9e] font-black uppercase tracking-widest text-[11px] mb-3">{subtitle || "KELURAHAN WERGU WETAN"}</p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-[1.1]">{title}</h2>
    </div>
  )
}

function CardPerangkat({ data, isLurah }: { data: any, isLurah?: boolean }) {
  return (
    <div className={`relative bg-white border rounded-3xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl group ${isLurah ? "border-blue-200 ring-2 ring-blue-100" : "border-slate-100 hover:border-blue-100"
      }`}>
      {isLurah && (
        <div className="absolute top-3 right-3 bg-blue-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest z-10">
          Pimpinan
        </div>
      )}
      <div className={`flex gap-5 p-6 items-center ${isLurah ? "" : ""}`}>
        {/* Foto */}
        <div className={`rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-blue-300 border border-blue-100 ${isLurah ? "w-20 h-20" : "w-16 h-16"
          }`}>
          {data.foto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.foto} alt={data.nama} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
          ) : (
            <User size={isLurah ? 36 : 28} />
          )}
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">{data.jabatan}</p>
          <h4 className={`font-bold text-slate-800 leading-tight ${isLurah ? "text-base" : "text-sm"}`}>{data.nama}</h4>
          {data.nip && (
            <p className="text-[10px] text-slate-400 font-mono mt-2 bg-slate-50 px-2 py-0.5 rounded-lg inline-block">NIP. {data.nip}</p>
          )}
        </div>
      </div>
      {/* Accent Line */}
      <div className={`h-1 w-full bg-gradient-to-r ${isLurah ? "from-blue-600 to-blue-400" : "from-slate-100 to-slate-50 group-hover:from-blue-200 group-hover:to-blue-50"} transition-all duration-500`} />
    </div>
  );
}

function StatCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center hover:bg-blue-600 group transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-200">
      <h3 className="text-3xl font-extrabold text-slate-800 mb-1 group-hover:text-white transition-colors">{value}</h3>
      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider group-hover:text-blue-100 transition-colors">{label}</p>
    </div>
  )
}

// STRUKTUR KOTAK KOSONG (Tanpa Foto dan Nama)
function GovStructureNode({ data, rank }: { data: any, rank: 'top' | 'mid' | 'kasi' | 'staf' }) {
  const isTop = rank === 'top';
  const isMid = rank === 'mid';
  const isKasi = rank === 'kasi';

  // Width of the card
  const W = isTop ? 280 : isMid ? 240 : isKasi ? 192 : 168;

  const bgCls = isTop ? 'bg-blue-50' : 'bg-white';
  const textCls = isTop ? 'text-blue-700 text-[13px]' : isMid ? 'text-blue-700 text-[12px]' : isKasi ? 'text-blue-600 text-[11px]' : 'text-slate-600 text-[10px]';

  return (
    <div
      className="flex flex-col items-center"
      style={{ width: W }}
    >
      <div className={`w-full ${bgCls} border border-blue-200 rounded shadow-sm p-4 text-center hover:shadow-md transition-shadow relative`}>
        {/* Simple box for Jabatan only */}
        <h4 className={`font-black uppercase tracking-widest leading-relaxed ${textCls}`}>{data.jabatan}</h4>
      </div>
    </div>
  );
}

function SaranaCard({ item, index }: { item: typeof saranaData[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: "easeOut" }}
      className="relative w-full h-[340px] md:h-[380px] group/flipcard"
      style={{ perspective: "1500px" }}
    >
      <div
        className="relative w-full h-full transition-all duration-700 group-hover/flipcard:[transform:rotateY(180deg)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT FACE (IMAGE & INFO) */}
        <div
          className="absolute inset-0 w-full h-full bg-white rounded-[1.75rem] overflow-hidden shadow-md group-hover/flipcard:shadow-xl transition-shadow duration-500 border border-slate-100 cursor-default"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/flipcard:scale-105 group-hover/flipcard:blur-[2px]" />
          <div className="absolute inset-0 bg-black/10 group-hover/flipcard:bg-black/30 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-transparent opacity-90" />

          {/* Content */}
          <div className="absolute inset-x-0 top-0 p-6 md:p-8 z-10 transition-transform duration-500 group-hover/flipcard:translate-y-[4px]">
            <h4 className="text-white font-bold text-2xl md:text-3xl leading-[1.2] drop-shadow-lg tracking-tight">
              {item.title}
            </h4>
          </div>
        </div>

        {/* BACK FACE (MAP) */}
        <div
          className="absolute inset-0 w-full h-full bg-white rounded-[1.75rem] overflow-hidden shadow-xl border border-slate-200 flex flex-col cursor-default"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Top Bar on Map */}
          <div className="p-5 bg-white border-b border-slate-100 shrink-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">INFORMASI LOKASI</p>
            <p className="text-[15px] font-bold text-slate-800 line-clamp-1 leading-snug">{item.title}</p>
          </div>

          {/* The Map Iframe */}
          <div className="flex-1 relative bg-slate-50 pointer-events-auto">
            <iframe
              src={item.mapSrc}
              className="w-full h-full absolute inset-0 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Bottom Bar: Address & CTA */}
          <div className="p-4 bg-white border-t border-slate-100 shrink-0">
            <p className="text-[11px] text-slate-500 mb-3 line-clamp-2 text-center">{item.detail}</p>
            <a
              href={item.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-10 bg-white border border-slate-300 hover:border-[#0B132B] hover:bg-[#0B132B] text-[#0B132B] hover:text-white rounded-full flex items-center justify-center text-[13px] font-bold transition-all gap-2 group/btn pointer-events-auto"
            >
              Buka di Google Maps <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

function VisiMisiRenderer({ html, fallback }: { html: string | null, fallback: { visi: string, misi: string[] } }) {
  const isContentEmpty = !html || html.trim().length < 20;

  return (
    <div className="bg-white border border-slate-200/60 rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-sm">
      <div className="absolute -top-10 -right-10 opacity-[0.02] pointer-events-none rotate-12">
        <Target size={400} />
      </div>

      <div className="relative z-10">
        {!isContentEmpty ? (
          <div className="prose prose-slate max-w-none text-justify 
            text-[15px] md:text-[16px] leading-relaxed text-slate-700
            prose-headings:text-[14px] prose-headings:font-black prose-headings:text-slate-800 prose-headings:uppercase prose-headings:tracking-[0.15em] prose-headings:mb-4 prose-headings:mt-8 first:prose-headings:mt-0
            prose-p:text-slate-700 prose-p:mb-6 last:prose-p:mb-0
            prose-strong:font-black prose-strong:text-slate-800
            prose-li:text-slate-700 prose-li:marker:text-slate-400 prose-li:marker:font-bold
            prose-ul:my-4 prose-ol:my-4
          ">
            <div dangerouslySetInnerHTML={{ __html: html! }} />
          </div>
        ) : (
          <>
            {/* VISI */}
            <div className="mb-8">
              <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-widest mb-4">
                VISI
              </h4>
              <p className="text-[15px] md:text-[16px] text-slate-700 leading-relaxed text-justify">
                {fallback.visi}
              </p>
            </div>

            {/* MISI */}
            <div>
              <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-widest mb-4">
                MISI
              </h4>
              <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-slate-700 text-justify leading-relaxed">
                {fallback.misi.map((misi, i) => (
                  <li key={i} className="pl-1 marker:font-bold marker:text-slate-400">{misi}</li>
                ))}
              </ol>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function TugasFungsiRenderer({ html, fallback }: { html: string | null, fallback: { tugas: string, fungsi: string[] } }) {
  const isContentEmpty = !html || html.trim().length < 20;

  return (
    <div className="bg-white border border-slate-200/60 rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-sm">
      <div className="absolute -bottom-10 -right-10 opacity-[0.02] pointer-events-none -rotate-6">
        <Briefcase size={350} />
      </div>

      <div className="relative z-10">
        {!isContentEmpty ? (
          <div className="prose prose-slate max-w-none text-justify 
            text-[15px] md:text-[16px] leading-relaxed text-slate-700
            prose-headings:text-[14px] prose-headings:font-black prose-headings:text-slate-800 prose-headings:uppercase prose-headings:tracking-[0.15em] prose-headings:mb-4 prose-headings:mt-8 first:prose-headings:mt-0
            prose-p:text-slate-700 prose-p:mb-6 last:prose-p:mb-0
            prose-strong:font-black prose-strong:text-slate-800
            prose-li:text-slate-700 prose-li:marker:text-slate-400 prose-li:marker:font-bold
            prose-ul:my-4 prose-ol:my-4
          ">
            <div dangerouslySetInnerHTML={{ __html: html! }} />
          </div>
        ) : (
          <>
            {/* TUGAS */}
            <div className="mb-8">
              <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-widest mb-4">
                TUGAS POKOK
              </h4>
              <p className="text-[15px] md:text-[16px] text-slate-700 leading-relaxed text-justify">
                {fallback.tugas}
              </p>
            </div>

            {/* FUNGSI */}
            <div>
              <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-widest mb-4">
                FUNGSI UTAMA
              </h4>
              <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-slate-700 text-justify leading-relaxed">
                {fallback.fungsi.map((f, i) => (
                  <li key={i} className="pl-1 marker:font-bold marker:text-slate-400">{f}</li>
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
function RocketIcon({ className, size }: { className?: string, size?: number }) {
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