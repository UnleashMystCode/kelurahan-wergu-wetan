"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import HeroCarousel from "./HeroCarousel";

const instrumentSerif = Instrument_Serif({ weight: "400", subsets: ["latin"] });
import {
  BarChart,
  ConciergeBell,
  MessageSquareQuote,
  CalendarDays,
  Newspaper,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  MapPin,
  Calendar,
  Loader2,
  CreditCard,
  Users,
  Baby,
  HeartCrack,
  HeartHandshake,
  ShieldCheck,
  Truck,
  Home,
} from "lucide-react";

// Tipe Data
type Stat = { id: number; label: string; value: string; icon?: any };
type AgendaItem = { id: number; title: string; date: string; lokasi: string };
type BannerData = any;
type WelcomeData = {
  namaLurah: string;
  fotoURL: string | null;
  konten: string;
} | null;

// Pastikan props menerima 'kegiatan'
type HomeViewProps = {
  stats: Stat[];
  services: any[];
  welcome: WelcomeData;
  agenda: AgendaItem[];
  banners: BannerData[];
  kegiatan: any[];
  profilBanner?: any;
};

export default function HomeView({
  stats,
  services,
  welcome,
  agenda,
  banners,
  kegiatan,
  profilBanner,
}: HomeViewProps) {
  const [activeTab, setActiveTab] = useState("sambutan");
  const [layananTab, setLayananTab] = useState("umum");
  const [isMounted, setIsMounted] = useState(false);
  const layananScrollRef = useRef<HTMLDivElement>(null);
  const [layananActiveIndex, setLayananActiveIndex] = useState(0);

  const layananTabsList = [
    { id: "umum", label: "Umum" },
    { id: "sertifikasi", label: "Sertifikasi" },
    { id: "pemerintahan", label: "Pemerintahan" },
    { id: "perizinan", label: "Perizinan" },
    { id: "sdm", label: "Pengembangan SDM" },
  ];

  // Mouse Drag Swiping Handlers
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollL = useRef(0);
  const hasDraggedRef = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    hasDraggedRef.current = false;
    if (layananScrollRef.current) {
      layananScrollRef.current.classList.add("cursor-grabbing");
      layananScrollRef.current.classList.remove("snap-x", "snap-mandatory");
      startX.current = e.pageX - layananScrollRef.current.offsetLeft;
      scrollL.current = layananScrollRef.current.scrollLeft;
    }
  };

  const onMouseLeave = () => {
    isDown.current = false;
    if (layananScrollRef.current) {
      layananScrollRef.current.classList.remove("cursor-grabbing");
      layananScrollRef.current.classList.add("snap-x", "snap-mandatory");
      Array.from(layananScrollRef.current.children).forEach((c) =>
        c.classList.remove("pointer-events-none")
      );
    }
  };

  const onMouseUp = () => {
    isDown.current = false;
    if (layananScrollRef.current) {
      layananScrollRef.current.classList.remove("cursor-grabbing");
      layananScrollRef.current.classList.add("snap-x", "snap-mandatory");
      Array.from(layananScrollRef.current.children).forEach((c) =>
        c.classList.remove("pointer-events-none")
      );
    }
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 50);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !layananScrollRef.current) return;
    e.preventDefault();

    if (!hasDraggedRef.current) {
      hasDraggedRef.current = true;
      Array.from(layananScrollRef.current.children).forEach((c) =>
        c.classList.add("pointer-events-none")
      );
    }

    const x = e.pageX - layananScrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Slightly faster drag multiplier (glacier smooth)

    requestAnimationFrame(() => {
      if (layananScrollRef.current) {
        layananScrollRef.current.scrollLeft = scrollL.current - walk;
      }
    });
  };

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleLayananScroll = () => {
    // Tunggu sampai user benar-benar selesai drag atau animasi geser berakhir (debounce 150ms)
    // Ini 100% menyelesaikan masalah lag patah-patah & kedip karena render tidak jalan selama scroll
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    scrollTimeout.current = setTimeout(() => {
      if (isDown.current) return; // Jangan set state jika user masih holding/dragging mouse!
      if (!layananScrollRef.current) return;

      const container = layananScrollRef.current;
      const containerLeft = container.getBoundingClientRect().left;

      let minDiff = Infinity;
      let newIndex = layananActiveIndex;

      // Cari card mana yang jarak border kirinya paling dekat dengan margin kiri container (offset ~24px)
      Array.from(container.children).forEach((child: any, idx) => {
        const childLeft = child.getBoundingClientRect().left - containerLeft;
        const diff = Math.abs(childLeft - 24);
        if (diff < minDiff) {
          minDiff = diff;
          newIndex = idx;
        }
      });

      if (newIndex !== layananActiveIndex) {
        setLayananActiveIndex(newIndex);
      }
    }, 150);
  };

  const scrollLayanan = (direction: "left" | "right") => {
    if (!layananScrollRef.current) return;
    const container = layananScrollRef.current;

    setLayananActiveIndex((prev) => {
      let next = direction === "left" ? prev - 1 : prev + 1;
      const max = container.children.length - 1;
      if (next < 0) next = 0;
      if (next > max) next = max;

      const targetElement = container.children[next] as HTMLElement;
      if (targetElement) {
        // Scroll to the exact left edge of the target card.
        // Subtracting 24 to preserve the 24px (gap-6) / px-6 padding visual alignment
        container.scrollTo({ left: targetElement.offsetLeft - 24, behavior: "smooth" });
      }
      return next;
    });
  };

  useEffect(() => {
    setIsMounted(true);
    // Force scroll ke atas saat reload agar animasi hero & sambutan tontonable dari awal
    window.scrollTo(0, 0);
  }, []);

  const defaultServices = [
    { id: 1, title: "Pembuatan KTP", icon: CreditCard, color: "text-blue-600", bg: "bg-blue-50" },
    { id: 2, title: "Kartu Keluarga", icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { id: 3, title: "Akta Kelahiran", icon: Baby, color: "text-pink-500", bg: "bg-pink-50" },
    {
      id: 4,
      title: "Akta Kematian",
      icon: HeartCrack,
      color: "text-slate-600",
      bg: "bg-slate-100",
    },
    {
      id: 5,
      title: "Pengantar Nikah",
      icon: HeartHandshake,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    { id: 6, title: "SKCK", icon: ShieldCheck, color: "text-orange-500", bg: "bg-orange-50" },
    { id: 7, title: "Pindah Datang", icon: Truck, color: "text-purple-600", bg: "bg-purple-50" },
    { id: 8, title: "PBB", icon: Home, color: "text-teal-600", bg: "bg-teal-50" },
  ];

  const displayServices = services && services.length > 0 ? services : defaultServices;

  const HEADER_OFFSET = 120; // Topbar 40px + Navbar 80px
  const SUBMENU_HEIGHT = 60;
  const SCROLL_OFFSET = HEADER_OFFSET + SUBMENU_HEIGHT;

  const subMenus = [
    { id: "sambutan", label: "Sambutan Lurah", icon: MessageSquareQuote },
    { id: "statistik", label: "Statistik", icon: BarChart },
    { id: "layanan", label: "Layanan Kelurahan", icon: ConciergeBell },
    { id: "program", label: "Program & Kegiatan", icon: CalendarDays },
    { id: "berita", label: "Berita Terkini", icon: Newspaper },
  ];

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
    <div className="relative min-h-screen bg-slate-50 pb-20">
      <div className="relative z-10 mt-[-100px]">
        <HeroCarousel banners={banners} showButtons={true} />
      </div>

      <div
        className="sticky z-40 border-b border-slate-200 bg-white shadow-sm"
        style={{ top: `${HEADER_OFFSET}px`, height: `${SUBMENU_HEIGHT}px` }}
      >
        <div className="container mx-auto h-full px-4 md:px-6">
          <div className="no-scrollbar flex h-full items-center justify-start gap-1 overflow-x-auto lg:justify-center">
            {subMenus.map((menu) => (
              <button
                key={menu.id}
                onClick={() => scrollToSection(menu.id)}
                className={`group relative flex h-full items-center justify-center border-b-[3px] px-5 text-[13px] font-bold tracking-wide whitespace-nowrap transition-all lg:px-6 lg:text-[14.5px] ${
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

      <div className="relative z-30 container mx-auto px-6">
        {/* SEKSI 1: SAMBUTAN LURAH (SURAT RESMI STYLE) */}
        <section
          id="sambutan"
          className="flex scroll-mt-[180px] flex-col items-center justify-center py-16 md:py-24"
        >
          <div className="mx-auto w-full max-w-5xl bg-transparent text-center">
            {welcome ? (
              <div className="flex flex-col items-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`mb-8 text-center text-3xl leading-snug font-bold tracking-tight text-slate-800 md:mb-12 md:text-5xl ${instrumentSerif.className}`}
                >
                  Harapan dan Terima Kasih
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className={`prose prose-slate mx-auto max-w-4xl text-justify text-[14px] leading-[26px] font-medium whitespace-pre-line text-slate-600 md:text-[16px] md:leading-[30px]`}
                >
                  {welcome.konten}
                </motion.div>

                {/* Judul & TTD Lurah */}
                <div className="mt-12 flex w-full flex-col items-center">
                  {/* Tanda tangan (Wipe Animation Render) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mx-auto mb-4 flex w-full max-w-[320px] justify-center"
                  >
                    {welcome?.fotoURL ? (
                      <motion.div
                        animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] }}
                        transition={{
                          duration: 2.5,
                          ease: "easeOut",
                          repeat: Infinity,
                          repeatDelay: 1.5,
                        }}
                        className="flex w-full justify-center"
                      >
                        <img
                          src={welcome.fotoURL}
                          style={{ mixBlendMode: "multiply" }}
                          className="pointer-events-none w-full -rotate-1 transform object-contain"
                          alt={`Tanda Tangan ${welcome.namaLurah}`}
                        />
                      </motion.div>
                    ) : (
                      /* Fallback: Tanda tangan cursive palsu jika admin belum meng-upload gambar TTD */
                      <motion.div
                        initial={isMounted ? { opacity: 0, scale: 0.9 } : false}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                        className="mt-2 mb-4 -rotate-6 transform"
                      >
                        <span
                          className="text-6xl text-slate-800 md:text-7xl"
                          style={{
                            fontFamily:
                              "'Brush Script MT', 'Lucida Handwriting', 'Pacifico', cursive",
                          }}
                        >
                          {welcome.namaLurah.split(" ")[0] || "Lurah"}
                        </span>
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className={`text-[30px] leading-[30px] font-bold text-slate-600 ${instrumentSerif.className}`}
                  >
                    {welcome?.namaLurah || "Bapak Lurah"}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className={`mt-1 text-[21px] leading-[14px] font-medium tracking-wide text-slate-600 ${instrumentSerif.className}`}
                  >
                    Lurah Wergu Wetan
                  </motion.p>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400">Data sambutan belum diisi.</div>
            )}
          </div>
        </section>
      </div>

      {/* SEKSI 1.5: TENTANG KAMI BANNER SEDANG (Pertamina Style Layout) */}
      <section
        id="tentang-kami"
        className="relative w-full overflow-hidden bg-slate-900 text-left"
        style={{ minHeight: "550px" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${profilBanner?.gambarURL || "/images/hero_office.png"})`,
          }}
        />

        {/* Base Dark Overlay matching ProfilView */}
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Content aligned to Left */}
        <div className="relative z-10 container mx-auto flex h-full flex-col justify-center px-6 py-16 md:px-16 md:py-24">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-3 text-[11px] font-black tracking-widest text-white/70 uppercase drop-shadow-md"
            >
              Sekilas Profil
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="mb-6 text-4xl leading-tight font-bold tracking-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl"
            >
              Tentang Kami
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mb-10 max-w-xl text-base leading-relaxed font-medium text-white/90 drop-shadow-md md:text-lg"
            >
              Lebih dari enam dekade menyediakan pilar pelayanan birokrasi dan ruang hidup komunal
              untuk seluruh elemen masyarakat dan tata kelola di wilayah Kelurahan Wergu Wetan.
            </motion.p>

            {/* Outline Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/tentang-kami"
                className="group flex w-max items-center justify-between gap-6 rounded-full border border-white/60 bg-transparent px-7 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-900"
              >
                Selengkapnya{" "}
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
              <Link
                href="/tentang-kami"
                className="group flex w-max items-center justify-between gap-6 rounded-full border border-white/60 bg-transparent px-7 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-900"
              >
                Direksi dan Perangkat Desa{" "}
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="relative z-30 container mx-auto px-6">
        {/* SEKSI 2: STATISTIK (PERTAMINA STYLE) */}
        <section id="statistik" className="scroll-mt-[180px] py-16 md:py-24">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="mb-3 text-[11px] font-black tracking-widest text-[#0f3b9e] uppercase"
              >
                Statistik Kelurahan
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 }}
                className="text-3xl leading-tight font-extrabold text-slate-800 md:text-4xl"
              >
                Kependudukan & Capaian Kelurahan Wergu Wetan
              </motion.h2>
            </div>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 }}
                className="max-w-sm text-sm font-medium text-slate-500 md:text-right"
              >
                Data kependudukan terbaru yang mencakup distribusi penduduk, jenis kelamin, dan
                profil layanan Kelurahan.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/tentang-kami#monografi"
                  className="group flex items-center gap-2 rounded-full border border-slate-300 px-6 py-2.5 text-xs font-bold text-slate-700 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                >
                  Selengkapnya{" "}
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4">
            {stats?.slice(0, 4).map((stat: any, index: number) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="flex flex-col gap-2"
              >
                <div className="flex flex-col">
                  <div className="flex items-end gap-1 text-4xl font-black tracking-tighter text-slate-900 md:text-6xl">
                    <Counter value={parseInt(stat.value)} />
                    {stat.value.includes("+") && <span className="text-blue-600">+</span>}
                    {stat.value.includes("%") && (
                      <span className="ml-[-4px] text-2xl text-blue-600 md:text-3xl">%</span>
                    )}
                  </div>
                  <p className="mt-2 border-l-2 border-blue-600 pl-3 text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                    {stat.label}
                  </p>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-500 opacity-80">
                  {index === 0
                    ? "Jumlah penduduk aktif terdata."
                    : index === 1
                      ? "Total kepala keluarga terdaftar."
                      : index === 2
                        ? "Persentase kepuasan layanan."
                        : "Capaian literasi masyarakat."}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SEKSI EKSTRA: PENCAPAIAN DESA (FULL BLEED CAROUSEL) */}
        <section
          id="pencapaian"
          className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-[100vw] overflow-hidden bg-slate-900 text-left"
        >
          <div className="no-scrollbar flex h-[500px] w-full snap-x snap-mandatory overflow-x-auto md:h-[600px]">
            {[
              {
                id: "p1",
                kategori: "PENGHARGAAN",
                judul: "Desa Digital Terbaik 2025",
                gambar: "/images/hero_digital.png",
              },
              {
                id: "p2",
                kategori: "INFRASTRUKTUR",
                judul: "Pembangunan Balai Warga Terpadu",
                gambar: "/images/hero_community.png",
              },
              {
                id: "p3",
                kategori: "EKONOMI",
                judul: "Pemberdayaan 100+ UMKM Lokal",
                gambar: "/images/hero_neighborhood.png",
              },
              {
                id: "p4",
                kategori: "LINGKUNGAN",
                judul: "Program Penghijauan Lingkungan",
                gambar: "/images/hero_neighborhood.png",
              },
            ].map((card) => (
              <Link
                key={card.id}
                href="/berita"
                className="group relative block h-full min-w-[85vw] flex-shrink-0 cursor-pointer snap-start overflow-hidden border-r border-white/10 last:border-0 md:min-w-[50vw] lg:min-w-[25vw]"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.gambar})` }}
                />

                {/* Base Gradient Overlay */}
                <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[60%] bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Hover Gradient Overlay (Fade in menggelap HANYA di bagian bawah, atas bening) */}
                <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[60%] bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-80" />

                {/* Content aligned to bottom (Tanpa efek ease out slide) */}
                <div className="absolute right-0 bottom-0 left-0 flex flex-col justify-end p-8 md:p-10">
                  <p className="mb-2 text-[10px] font-bold tracking-widest text-white/80 uppercase">
                    {card.kategori}
                  </p>
                  <h3 className="mb-8 text-2xl leading-tight font-black text-white drop-shadow-md md:text-3xl">
                    {card.judul}
                  </h3>

                  {/* Circle Arrow (Fast Smooth Ghost Follow) */}
                  <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-white/70 text-white transition-all duration-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                    {/* Panah Keluar (Bening lebih cepat) */}
                    <ArrowRight
                      size={20}
                      className="absolute transition-all duration-300 ease-in-out group-hover:translate-x-[150%] group-hover:opacity-0"
                    />
                    {/* Panah Masuk (Langsung mengejar tanpa delay) */}
                    <ArrowRight
                      size={20}
                      className="absolute -translate-x-[150%] opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SEKSI 2: LAYANAN (PERTAMINA INVESTOR STYLE) */}
        <section
          id="layanan"
          className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-[100vw] scroll-mt-[180px] overflow-hidden bg-white pt-16 pb-20"
        >
          {/* Bagian Atas / Header */}
          <div className="container mx-auto mb-12 flex flex-col items-start justify-between gap-8 px-6 lg:flex-row lg:items-center">
            <div className="max-w-md">
              <p className="mb-3 text-[11px] font-black tracking-widest text-[#0f3b9e] uppercase">
                LAYANAN PUBLIK
              </p>
              <h2 className="text-4xl font-bold tracking-tight text-slate-800 md:text-5xl">
                Layanan Kelurahan
              </h2>
            </div>
            <div className="flex max-w-xl flex-col items-start gap-6 text-left lg:items-end lg:text-right">
              <p className="text-[13px] leading-[1.8] font-medium text-slate-500 md:text-sm">
                Sebagai instansi pelayanan masyarakat garda terdepan, kami senantiasa memberikan
                fasilitas birokrasi yang responsif, terintegrasi, dan transparan melalui penyediaan
                informasi yang akurat.
              </p>
              <Link
                href="/layanan"
                className="group flex items-center gap-3 rounded-full border border-slate-300 px-6 py-2.5 text-[13px] font-semibold text-slate-700 transition-all hover:border-[#0B132B] hover:bg-[#0B132B] hover:text-white"
              >
                Selengkapnya{" "}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* TAB LAYANAN (SUB-MENU) */}
          <div className="container mx-auto mt-5 mb-8 px-6">
            <div className="no-scrollbar flex h-[60px] items-center gap-1 overflow-x-auto border-b border-slate-200 lg:gap-2">
              {layananTabsList.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setLayananTab(tab.id)}
                  className={`relative flex h-full items-center justify-center border-b-[3px] px-5 text-[13px] font-bold tracking-wide whitespace-nowrap transition-all outline-none lg:px-6 lg:text-[14.5px] ${
                    layananTab === tab.id
                      ? "border-blue-700 bg-blue-50/50 text-blue-700 rounded-t-lg"
                      : "border-transparent text-slate-500 hover:bg-slate-100 hover:text-blue-700 hover:border-blue-400 rounded-t-lg"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bagian Bawah / Konten (Pertamina Overlapping Carousel) */}
          <div className="relative min-h-[500px] w-full bg-[#0B132B]">
            {layananTab === "umum" ? (
              <>
                {/* Left Background Image (Dynamic Overlay Mapped to Active Card) */}
                <div className="absolute top-0 bottom-0 left-0 z-10 hidden w-1/2 bg-black lg:block">
                  {[
                    "/images/hero_office.png", // KTP
                    "/images/hero_office.png", // KK
                    "/images/hero_digital.png", // Akta Lahir
                    "/images/sarana_puskesmas.png", // Akta Kematian
                    "/images/hero_community.png", // Nikah
                    "/images/hero_digital.png", // SKCK
                    "/images/hero_neighborhood.png", // Pindah
                    "/images/hero_office.png", // PBB
                  ].map((src, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
                        layananActiveIndex % displayServices.length === idx
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                      style={{ backgroundImage: `url('${src}')` }}
                    />
                  ))}
                  {/* OVERLAY HITAM ELEGAN: Fade to background color so it doesn't look milky */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0B132B]/60 to-[#0B132B] opacity-100" />
                </div>

                {/* Slider Layer */}
                <div className="relative z-20 container mx-auto py-10 lg:py-16">
                  <div className="flex w-full flex-col items-end">
                    {/* Wrapper for the slider tracking over the image */}
                    <div className="relative w-full lg:mr-[calc(50%-50vw)] lg:w-[calc(70%+50vw-50%)]">
                      {/* Subtle Gradient Fade on the rightmost edge to hint at more cards */}
                      <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-30 hidden w-32 bg-gradient-to-l from-[#0B132B] via-[#0B132B]/80 to-transparent lg:block" />
                      <div
                        ref={layananScrollRef}
                        onScroll={handleLayananScroll}
                        onMouseDown={onMouseDown}
                        onMouseLeave={onMouseLeave}
                        onMouseUp={onMouseUp}
                        onMouseMove={onMouseMove}
                        className="relative z-20 flex snap-x snap-mandatory scroll-pl-6 gap-6 overflow-x-auto px-6 pt-4 pb-6 select-none lg:scroll-pl-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                      >
                        {Array(20)
                          .fill(displayServices)
                          .flat()
                          .map((svc: any, idx: number) => {
                            const originalIdx = idx % displayServices.length;
                            const isActive = idx <= layananActiveIndex; // Set active jika sedang dilihat atau sudah diseal (passed/kepotong kiri)

                            return (
                              <Link
                                href={`/layanan#${svc.id}`}
                                key={`${svc.id}-${idx}`}
                                onClick={(e) => {
                                  if (hasDraggedRef.current) e.preventDefault();
                                }}
                                draggable={false}
                                className={`group relative block flex h-[320px] w-[280px] min-w-[280px] shrink-0 snap-start flex-col rounded-xl border p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 select-none hover:-translate-y-2 hover:border-[#0f3b9e] hover:bg-[#0f3b9e] hover:shadow-[0_15px_40px_rgba(15,59,158,0.2)] lg:p-7 ${isActive ? "border-transparent bg-[#0f3b9e] text-white" : "border-slate-200 bg-white text-slate-800"}`}
                              >
                                <div>
                                  <svc.icon
                                    size={44}
                                    strokeWidth={2.5}
                                    fill="currentColor"
                                    className={`mb-6 transition-colors duration-500 group-hover:text-white ${isActive ? "text-white" : "text-[#0f3b9e]"}`}
                                  />
                                  <h3
                                    className={`mb-3 line-clamp-2 text-[19px] leading-[1.3] font-bold transition-colors duration-500 group-hover:text-white md:text-[20px] ${isActive ? "text-white" : "text-slate-900"}`}
                                  >
                                    {svc.title}
                                  </h3>
                                  <div
                                    className={`mb-4 h-[2px] w-8 transition-colors duration-500 group-hover:bg-white ${isActive ? "bg-white" : "bg-red-600"}`}
                                  />
                                  <p
                                    className={`line-clamp-4 text-[12.5px] leading-relaxed transition-colors duration-500 group-hover:text-blue-50/90 ${isActive ? "text-blue-50/90" : "text-slate-600"}`}
                                  >
                                    {originalIdx === 0
                                      ? "Ketahui pendaftaran dan verifikasi harian serta wewenang tata kelola birokrasi."
                                      : "Jelajahi detail pelaporan administratif, dan prosedur layanan publik desa."}
                                  </p>
                                </div>
                                <div className="mt-auto flex justify-end">
                                  <div className="transform transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                                    <ArrowUpRight
                                      size={18}
                                      className={`transition-colors duration-500 group-hover:text-white ${isActive ? "text-white" : "text-slate-900"}`}
                                    />
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                      </div>
                    </div>

                    {/* Safe Container boundaries for Navigation Buttons */}
                    <div className="mt-6 flex w-full justify-end px-6 pt-4 lg:w-[70%] lg:px-0 lg:pr-8">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => scrollLayanan("left")}
                          className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-600/50 bg-[#0B132B] text-slate-400 shadow-sm transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
                          aria-label="Previous"
                        >
                          <ArrowRight size={20} className="rotate-180" />
                        </button>
                        <button
                          onClick={() => scrollLayanan("right")}
                          className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-600/50 bg-[#0B132B] text-slate-400 shadow-sm transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
                          aria-label="Next"
                        >
                          <ArrowRight size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="container mx-auto flex h-[500px] flex-col items-center justify-center py-32 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
                  <ConciergeBell className="text-white/40" size={36} />
                </div>
                <h3 className="mb-4 text-3xl font-bold tracking-tight text-white">
                  Layanan Belum Tersedia
                </h3>
                <p className="mx-auto max-w-lg text-[15px] leading-relaxed text-slate-400">
                  Modul layanan untuk kategori{" "}
                  <strong className="text-white">
                    {layananTabsList.find((t) => t.id === layananTab)?.label}
                  </strong>{" "}
                  sedang dalam tahap penyempurnaan dan sinkronisasi dengan database pusat.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SEKSI 4: PROGRAM & KEGIATAN */}
        <section id="program" className="scroll-mt-[120px] py-16 md:py-24">
          {/* Header Section Matches Design */}
          <div className="mb-16 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* Left: Tagline & Title */}
            <div className="w-full shrink-0 lg:w-[35%]">
              <p className="mb-3 text-[11px] font-black tracking-widest text-[#0f3b9e] uppercase">
                PROGRAM & KEGIATAN
              </p>
              <h2 className="text-3xl leading-[1.1] font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[40px]">
                Agenda Kelurahan
              </h2>
            </div>

            {/* Right: Paragraph & Button Side-by-side */}
            <div className="flex w-full flex-col items-start gap-8 md:flex-row md:items-center md:gap-12 lg:w-[65%]">
              <p className="text-[13.5px] leading-relaxed text-slate-500 md:text-[14px]">
                Berdedikasi terhadap kemajuan wilayah administratif, kami menghadirkan serangkaian
                program pembangunan, perbaikan infrastruktur, dan kegiatan sosial yang berfokus pada
                inklusi untuk kesejahteraan warga.
              </p>
              <div className="shrink-0">
                <Link
                  href="/program"
                  className="group flex items-center gap-2 rounded-full border border-slate-300 px-6 py-2.5 text-[13px] font-medium whitespace-nowrap text-slate-700 transition-all hover:border-[#0B132B] hover:bg-[#0B132B] hover:text-white md:px-7 md:py-[11px]"
                >
                  Selengkapnya{" "}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Grid Bento Box Matches New Design */}
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:h-[550px] lg:grid-cols-2">
            {(() => {
              const bentoAgenda = [
                {
                  id: "b1",
                  tag: "AGENDA UTAMA",
                  title: "Pembangunan Balai Warga Terpadu Kelurahan Wergu Wetan Selesai 100%",
                  date: "15 April 2026",
                  image: "/images/hero_community.png",
                },
                {
                  id: "b2",
                  tag: "KEGIATAN WARGA",
                  title: "Rapat Koordinasi RT/RW se-Kelurahan Bahas Infrastruktur Tahunan",
                  date: "13 April 2026",
                  image: "/images/hero_office.png",
                },
                {
                  id: "b3",
                  tag: "LAYANAN SOSIAL",
                  title: "Distribusi Bantuan Pangan Tahap IV kepada Keluarga Prasejahtera",
                  date: "12 April 2026",
                  image: "/images/hero_digital.png",
                },
                {
                  id: "b4",
                  tag: "INFRASTRUKTUR",
                  title: "Kerja Bakti Massal Normalisasi Saluran Air Antisipasi Banjir",
                  date: "12 April 2026",
                  image: "/images/hero_neighborhood.png",
                },
                {
                  id: "b5",
                  tag: "EKONOMI",
                  title: "Pelatihan Kewirausahaan Mandiri Pemuda dan UMKM Lokal",
                  date: "11 April 2026",
                  image: "/images/hero_office.png",
                },
              ];

              return (
                <>
                  {/* Left Big Card (Index 0) */}
                  <motion.div
                    initial={isMounted ? { y: 20, opacity: 0 } : false}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className="group relative h-[400px] w-full cursor-pointer overflow-hidden rounded-[12px] lg:h-full"
                  >
                    <img
                      src={bentoAgenda[0].image}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt="Agenda Utama"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 md:p-8">
                      <span className="mb-3 text-[10px] font-bold tracking-widest text-white/90 uppercase drop-shadow-md md:text-[11px]">
                        {bentoAgenda[0].tag}
                      </span>
                      <h3 className="mb-4 pr-4 text-2xl leading-tight font-bold text-white drop-shadow-lg md:text-[28px]">
                        {bentoAgenda[0].title}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-[12px] font-medium text-white/80">
                        <Calendar size={14} /> {bentoAgenda[0].date}
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Half: 2x2 Grid for Index 1-4 */}
                  <div className="grid h-full grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 md:gap-6">
                    {bentoAgenda.slice(1, 5).map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={isMounted ? { y: 20, opacity: 0 } : false}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        className="group relative h-[250px] w-full cursor-pointer overflow-hidden rounded-[12px] lg:h-auto"
                      >
                        <img
                          src={item.image}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          alt={item.title}
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 flex h-full flex-col justify-end p-5 md:p-6">
                          <span className="mb-2 text-[9px] font-bold tracking-widest text-white/90 uppercase drop-shadow-md">
                            {item.tag}
                          </span>
                          <h3 className="mb-3 line-clamp-3 text-[15px] leading-snug font-bold text-white drop-shadow-lg lg:text-[16px]">
                            {item.title}
                          </h3>
                          <div className="mt-auto flex items-center gap-2 text-[11px] font-medium text-white/80">
                            <Calendar size={12} /> {item.date}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </section>

        {/* SEKSI 5: BERITA TERKINI */}
        <section id="berita" className="scroll-mt-[120px] py-16 md:py-24">
          {/* Header Section Matches Design */}
          <div className="mb-16 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* Left: Tagline & Title */}
            <div className="w-full shrink-0 lg:w-[35%]">
              <p className="mb-3 text-[11px] font-black tracking-widest text-[#0f3b9e] uppercase">
                BERITA & PUBLIKASI
              </p>
              <h2 className="text-3xl leading-[1.1] font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[40px]">
                Berita Terkini
              </h2>
            </div>

            {/* Right: Paragraph & Button Side-by-side */}
            <div className="flex w-full flex-col items-start gap-8 md:flex-row md:items-center md:gap-12 lg:w-[65%]">
              <p className="text-[13.5px] leading-relaxed text-slate-500 md:text-[14px]">
                Telusuri laporan, artikel, siaran pers, dan pembaruan terbaru kami yang menyoroti
                berbagai kegiatan, pencapaian kinerja solid, serta pelayanan di kelurahan Wergu
                Wetan.
              </p>
              <div className="shrink-0">
                <Link
                  href="/berita"
                  className="group flex items-center gap-2 rounded-full border border-slate-300 px-6 py-2.5 text-[13px] font-medium whitespace-nowrap text-slate-700 transition-all hover:border-[#0B132B] hover:bg-[#0B132B] hover:text-white md:px-7 md:py-[11px]"
                >
                  Selengkapnya{" "}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {kegiatan && kegiatan.length > 0 ? (
              kegiatan.slice(0, 3).map((item: any, index: number) => {
                const dummyNewsImage = [
                  "/images/hero_community.png",
                  "/images/hero_neighborhood.png",
                  "/images/hero_digital.png",
                ][index % 3];
                return (
                  <Link
                    href={`/berita/${item.id}`}
                    key={item.id}
                    className="group block h-full cursor-pointer"
                  >
                    <motion.div
                      initial={isMounted ? { y: 20, opacity: 0 } : false}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      className="flex h-full flex-col text-left"
                    >
                      {/* Image Container Aspect 4:3 with Subtle rounding */}
                      <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-[8px] bg-slate-100">
                        <img
                          src={item.gambar || dummyNewsImage}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          alt={item.judul}
                        />
                      </div>

                      {/* Content area with flex-1 to push the button down evenly */}
                      <div className="flex flex-1 flex-col">
                        <h3 className="mb-3 line-clamp-2 pr-2 text-lg leading-[1.3] font-bold text-slate-900 transition-colors group-hover:text-[#0f3b9e] md:text-[20px]">
                          {item.judul}
                        </h3>
                        <p className="mb-6 line-clamp-3 flex-1 pr-4 text-[13.5px] leading-relaxed text-slate-500">
                          Diterbitkan pada{" "}
                          {new Date(item.tanggal).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                          . Klik untuk membaca lebih lanjut mengenai liputan detail pers rilis
                          maupun kejadian warta desa ini.
                        </p>

                        {/* Outline Button: Fixed border visibility & alignment */}
                        <div className="mt-auto pt-2">
                          <div className="inline-flex min-w-[150px] items-center justify-between gap-3 rounded-full border border-slate-400 px-6 py-2.5 text-[13px] font-semibold text-slate-700 shadow-sm transition-all group-hover:border-[#0B132B] group-hover:bg-[#0B132B] group-hover:text-white">
                            Selengkapnya{" "}
                            <ArrowRight
                              size={15}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-slate-50 shadow-sm">
                  <Loader2 className="animate-spin text-slate-400" size={40} />
                </div>
                <h3 className="mb-3 text-2xl font-black text-slate-800">Sinkronisasi Konten</h3>
                <p className="mx-auto max-w-lg text-[15px] leading-relaxed text-slate-500">
                  Modul berita dan publikasi saat ini sedang dalam tahap moderasi birokrasi terpadu.
                  Berita terbaru akan segera ditampilkan setelah proses sistem selesai.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function SectionHeaderWithLink({
  title,
  subtitle,
  linkHref,
  icon: Icon,
  showLink = true,
}: {
  title: string;
  subtitle: string;
  linkHref: string;
  icon: any;
  showLink?: boolean;
}) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-3 border-b border-slate-100 pb-5 md:flex-row md:items-center">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
          <Icon size={20} />
        </div>
        <div>
          <h2 className="text-xl leading-tight font-bold text-slate-800">{title}</h2>
          <p className="text-sm leading-tight text-slate-400">{subtitle}</p>
        </div>
      </div>
      {showLink && (
        <Link
          href={linkHref}
          className="group flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold whitespace-nowrap text-blue-600 transition-[color,background-color] duration-150 hover:bg-blue-600 hover:text-white"
        >
          Lihat Semua{" "}
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const [ref, setRef] = useState<HTMLSpanElement | null>(null);
  const inView = useInView({ current: ref } as any, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      // Durasi animasi tetap 2 detik
      const duration = 2000;
      const range = end - start;
      let current = start;

      const step = () => {
        const increment = Math.ceil(range / 60); // 60fps approx
        current += increment;
        if (current >= end) {
          setCount(end);
        } else {
          setCount(current);
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }
  }, [inView, value]);

  return <span ref={setRef}>{count.toLocaleString("id-ID")}</span>;
}
