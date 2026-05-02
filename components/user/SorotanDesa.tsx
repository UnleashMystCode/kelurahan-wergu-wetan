"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

// Counter component for animated numbers
function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return <span ref={ref}>{count}</span>;
}

export default function SorotanDesa({ stats = [] }: { stats: any[] }) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  // Map the passed stats to the layout format
  const statsItems = [
    {
      id: "s1",
      image: "/images/hero_digital.png",
      title: stats?.[0] ? `${stats[0].value} ${stats[0].label}` : "3+ PENDUDUK",
      desc: "Penduduk aktif yang terdata di sistem kependudukan kelurahan saat ini.",
      isStat: true,
      rawVal: stats?.[0]?.value || "3",
      rawLabel: stats?.[0]?.label || "PENDUDUK",
    },
    {
      id: "s2",
      image: "/images/hero_community.png",
      title: stats?.[1] ? `${stats[1].value} ${stats[1].label}` : "1 KK",
      desc: "Total kepala keluarga yang telah terdaftar secara resmi di wilayah.",
      isStat: true,
      rawVal: stats?.[1]?.value || "1",
      rawLabel: stats?.[1]?.label || "KK",
    },
    {
      id: "s3",
      image: "/images/hero_neighborhood.png",
      title: stats?.[2] ? `${stats[2].value} ${stats[2].label}` : "28 RT/RW",
      desc: "Persentase tingkat kepuasan warga terhadap pelayanan terpadu.",
      isStat: true,
      rawVal: stats?.[2]?.value || "28",
      rawLabel: stats?.[2]?.label || "RT/RW",
    },
    {
      id: "s4",
      image: "/images/hero_office.png",
      title: stats?.[3] ? `${stats[3].value} ${stats[3].label}` : "24 LAYANAN",
      desc: "Capaian indeks keamanan dan ketertiban lingkungan.",
      isStat: true,
      rawVal: stats?.[3]?.value || "24",
      rawLabel: stats?.[3]?.label || "LAYANAN",
    },
  ];

  type HighlightItem = {
    id: string;
    image: string;
    title: string;
    desc: string;
    isStat: boolean;
    rawVal?: string | number;
    rawLabel?: string;
  };

  type HighlightCategory = {
    id: string;
    title: string;
    subtitle: string;
    items: HighlightItem[];
  };

  const highlights: HighlightCategory[] = [
    {
      id: "statistik",
      title: "Data & Statistik Kelurahan",
      subtitle: "Gambaran Kependudukan & Capaian Kinerja Kelurahan Wergu Wetan Terkini",
      items: statsItems,
    },
    {
      id: "potensi",
      title: "Potensi & Inovasi Desa",
      subtitle: "Pemberdayaan Ekonomi, Infrastruktur & Lingkungan Unggulan",
      items: [
        {
          id: "p1",
          image: "/images/hero_digital.png",
          title: "Desa Digital Terbaik",
          desc: "Penghargaan tahun 2025 atas inovasi pelayanan administrasi publik terintegrasi.",
          isStat: false,
        },
        {
          id: "p2",
          image: "/images/hero_community.png",
          title: "Balai Warga Terpadu",
          desc: "Pusat kegiatan warga yang dilengkapi dengan berbagai fasilitas modern.",
          isStat: false,
        },
        {
          id: "p3",
          image: "/images/hero_neighborhood.png",
          title: "UMKM Lokal Unggulan",
          desc: "Pemberdayaan dan pendampingan lebih dari 100+ UMKM mandiri di tingkat desa.",
          isStat: false,
        },
        {
          id: "p4",
          image: "/images/hero_office.png",
          title: "Program Penghijauan",
          desc: "Penanaman 1000 pohon produktif di lingkungan warga untuk pelestarian alam.",
          isStat: false,
        },
      ],
    },
    {
      id: "sehat",
      title: "Gerakan Ayo Sehat",
      subtitle: "Fasilitas & Layanan Kesehatan Warga Kelurahan",
      items: [
        {
          id: "h1",
          image: "/images/hero_health.png",
          title: "Posyandu Balita & Lansia",
          desc: "Layanan rutin bulanan untuk pemantauan kesehatan gizi balita dan kesejahteraan lansia.",
          isStat: false,
        },
        {
          id: "h2",
          image: "/images/hero_community.png",
          title: "Senam Pagi Bersama",
          desc: "Kegiatan kebugaran rutin setiap hari minggu pagi di lapangan desa Wergu Wetan.",
          isStat: false,
        },
        {
          id: "h3",
          image: "/images/hero_office.png",
          title: "Puskesmas Pembantu",
          desc: "Fasilitas darurat dan pelayanan kesehatan tingkat pertama yang siaga 24 jam.",
          isStat: false,
        },
        {
          id: "h4",
          image: "/images/hero_neighborhood.png",
          title: "Lingkungan Bersih",
          desc: "Program gotong royong membersihkan saluran air dan fasilitas umum setiap bulan.",
          isStat: false,
        },
      ],
    },
  ];

  const currentCategory = highlights[activeCategoryIndex];
  const activeItem = currentCategory.items[activeItemIndex];
  
  // List all items on the side, highlight the active one
  const sideItems = currentCategory.items;

  const handleNextCategory = () => {
    setActiveCategoryIndex((p) => (p + 1) % highlights.length);
    setActiveItemIndex(0); // Reset to first item
  };

  const handlePrevCategory = () => {
    setActiveCategoryIndex((p) => (p - 1 + highlights.length) % highlights.length);
    setActiveItemIndex(0);
  };

  const handleSideClick = (id: string) => {
    const newIndex = currentCategory.items.findIndex((item) => item.id === id);
    if (newIndex !== -1) {
      setActiveItemIndex(newIndex);
    }
  };

  return (
    <section id="sorotan" className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-[100vw] bg-[#0B132B] py-20 px-4 md:px-6 scroll-mt-[100px] overflow-hidden text-white">
      <div className="container mx-auto relative z-10 max-w-6xl">
        
        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="text-left"
            >
              <p className="mb-3 text-[12px] font-black tracking-[0.2em] text-blue-400 uppercase">
                SOROTAN DESA
              </p>
              <h2 className="mb-2 text-3xl leading-tight font-extrabold text-white md:text-5xl">
                {currentCategory.title}
              </h2>
              <p className="max-w-xl text-[14px] leading-relaxed text-slate-400 md:text-[15px]">
                {currentCategory.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Dynamic Gallery Layout */}
        <div className="relative group/slider">
          {/* Navigation Layer (Centered to Gallery) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-[-40px] md:left-[-70px] lg:left-[-100px] z-30 hidden lg:block">
             <button 
               onClick={handlePrevCategory}
               className="text-white/40 transition-all hover:scale-110 hover:text-white disabled:opacity-0"
             >
               <ChevronLeft size={96} strokeWidth={1.5} className="transition-transform group-hover/slider:-translate-x-2 drop-shadow-lg" />
             </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-[-40px] md:right-[-70px] lg:right-[-100px] z-30 hidden lg:block">
             <button 
               onClick={handleNextCategory}
               className="text-white/40 transition-all hover:scale-110 hover:text-white disabled:opacity-0"
             >
               <ChevronRight size={96} strokeWidth={1.5} className="transition-transform group-hover/slider:translate-x-2 drop-shadow-lg" />
             </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-4">
          
          {/* MAIN CARD (Col Span 3) */}
          <div className="lg:col-span-3 h-[400px] sm:h-[500px] lg:h-[600px] relative rounded-xl md:rounded-2xl overflow-hidden group border border-white/10">
            <AnimatePresence mode="wait">
               <motion.div
                 key={activeItem.id}
                 initial={{ opacity: 0, scale: 1.05 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.4 }}
                 className="absolute inset-0"
               >
                 <img 
                    src={activeItem.image} 
                    alt={activeItem.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    onError={(e) => { e.currentTarget.src = "/images/hero_office.png" }}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                 
                 <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                     <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 md:gap-6">
                       <div className="flex-1">
                          {activeItem.isStat ? (
                             <div className="mb-2 flex items-end gap-1 text-5xl font-black tracking-tighter text-white md:text-7xl drop-shadow-lg">
                                <Counter value={parseInt(activeItem.rawVal as string)} />
                                {(activeItem.rawVal as string).includes("+") && <span className="text-blue-500">+</span>}
                                {(activeItem.rawVal as string).includes("%") && <span className="ml-[-4px] text-4xl text-blue-500">%</span>}
                                <span className="ml-3 text-xl md:text-3xl font-bold tracking-wider text-blue-400 uppercase">{activeItem.rawLabel}</span>
                             </div>
                          ) : (
                             <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3 drop-shadow-md">
                               {activeItem.title}
                             </h3>
                          )}
                          <p className="text-[13px] md:text-lg text-slate-300 max-w-2xl font-medium leading-relaxed drop-shadow">
                            {activeItem.desc}
                          </p>
                       </div>
                       
                       <Link href="/berita" className="self-end shrink-0 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-5 py-2.5 md:py-3 text-[13px] md:text-sm font-bold text-white border border-white/20 transition-all hover:bg-blue-600 hover:border-blue-600 hover:scale-105 active:scale-95 shadow-lg">
                          <span>Eksplorasi</span>
                          <div className="flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-white/20 text-white">
                            <ArrowUpRight size={14} />
                          </div>
                       </Link>
                    </div>
                 </div>
               </motion.div>
            </AnimatePresence>
          </div>

          {/* SIDE CARDS (Col Span 1, Stacked) */}
          <div className="grid grid-cols-3 lg:flex lg:flex-col gap-2 md:gap-4 lg:h-[600px]">
             {sideItems.map((item, index) => {
                const isActive = activeItemIndex === index;
                return (
                <div 
                   key={item.id}
                   onClick={() => handleSideClick(item.id)}
                   className={`relative flex-1 rounded-xl overflow-hidden cursor-pointer group min-h-[90px] sm:min-h-[100px] md:min-h-[120px] lg:min-h-0 border-2 transition-all duration-300 ${
                     isActive ? "border-blue-600 scale-[1.02] z-10" : "border-transparent opacity-70 hover:opacity-100"
                   }`}
                >
                   {/* Background Image */}
                   <img 
                      src={item.image} 
                      alt={item.title} 
                      className="absolute inset-0 w-full h-full object-cover rounded-[10px] transition-transform duration-700 group-hover:scale-110" 
                      onError={(e) => { e.currentTarget.src = "/images/hero_office.png" }}
                   />
                   
                   {/* Dark overlay for active card */}
                   <div className={`absolute inset-0 bg-[#0B132B]/80 rounded-[10px] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-30'}`} />
                   
                   {/* Content - Only visible if active */}
                   <div className={`absolute inset-0 flex flex-col justify-center p-2 md:p-4 transition-opacity duration-300 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                       {item.isStat ? (
                          <div className="flex flex-col drop-shadow-md">
                             <div className="text-xl md:text-2xl font-black text-white truncate">{item.rawVal}</div>
                             <div className="text-[8px] md:text-[10px] font-bold tracking-widest text-blue-200 uppercase line-clamp-1">{item.rawLabel}</div>
                          </div>
                       ) : (
                          <h4 className="text-[10px] sm:text-[11px] md:text-sm font-bold text-white leading-tight md:leading-snug drop-shadow-md pr-1 md:pr-2 line-clamp-3">
                             {item.title}
                          </h4>
                       )}
                   </div>

                   {/* Active Triangle indicator */}
                   {isActive && (
                      <div className="absolute left-[-2px] top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-y-[8px] border-y-transparent border-r-[8px] border-r-blue-600 hidden lg:block" />
                   )}
                </div>
             )})}
             
             {/* Mobile Navigation Controls in Grid (Takes up remaining 2 slots) */}
             <button 
                onClick={handlePrevCategory} 
                className="lg:hidden flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 min-h-[90px] sm:min-h-[100px] md:min-h-[120px] transition-all active:scale-95 active:bg-blue-600/50"
             >
                <ChevronLeft size={28} className="text-white/80" />
                <span className="text-[9px] font-semibold tracking-widest text-white/60 uppercase">Prev</span>
             </button>
             <button 
                onClick={handleNextCategory} 
                className="lg:hidden flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 min-h-[90px] sm:min-h-[100px] md:min-h-[120px] transition-all active:scale-95 active:bg-blue-600/50"
             >
                <ChevronRight size={28} className="text-white/80" />
                <span className="text-[9px] font-semibold tracking-widest text-white/60 uppercase">Next</span>
             </button>
          </div>

        </div>
        </div>
      </div>
    </section>
  );
}
