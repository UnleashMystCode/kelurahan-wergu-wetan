import Link from "next/link";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-slate-200 bg-white text-text-muted">
      {/* Decorative gradient orb to break monotony */}
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/2 rounded-full bg-blue-50/80 blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Kolom 1: Identitas (Lebih Dominan: Span 4) */}
          <div className="pr-0 lg:col-span-4 lg:pr-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-base shadow-lg shadow-blue-200">
                <MapPin className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-text-dark">Wergu Wetan</h3>
            </div>
            <p className="mb-8 text-[14.5px] leading-relaxed font-medium text-text-muted">
              Pusat layanan pemerintahan desa dan portal warta digital Kelurahan Wergu Wetan,
              Kecamatan Kota, Kabupaten Kudus. Birokrasi yang transparan, akuntabel, dan melayani.
            </p>

            {/* Social Icons integrated directly into identity block */}
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-text-muted shadow-sm transition-all hover:border-brand-base hover:bg-brand-base hover:text-white"
              >
                <Instagram size={18} />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-text-muted shadow-sm transition-all hover:border-brand-base hover:bg-brand-base hover:text-white"
              >
                <Facebook size={18} fill="currentColor" className="stroke-0" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-text-muted shadow-sm transition-all hover:border-brand-base hover:bg-brand-base hover:text-white"
              >
                <Youtube size={20} fill="currentColor" className="stroke-0" />
              </Link>
            </div>
          </div>

          {/* Kolom 2: Navigasi (Span 2) */}
          <div className="lg:col-span-3 lg:pl-10">
            <h4 className="mb-6 flex items-center gap-2 text-[15px] font-bold text-text-dark">
              Pintasan Layanan
            </h4>
            <ul className="space-y-4 text-[14px] font-bold text-text-muted">
              <li>
                <Link
                  href="/home"
                  className="flex items-center gap-2 transition-colors hover:text-brand-base"
                >
                  Beranda Utama
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang-kami"
                  className="flex items-center gap-2 transition-colors hover:text-brand-base"
                >
                  Profil Kelurahan
                </Link>
              </li>
              <li>
                <Link
                  href="/potensi-desa"
                  className="flex items-center gap-2 transition-colors hover:text-brand-base"
                >
                  Potensi Desa
                </Link>
              </li>
              <li>
                <Link
                  href="/layanan"
                  className="flex items-center gap-2 transition-colors hover:text-brand-base"
                >
                  E-Layanan Warga
                </Link>
              </li>
              <li>
                <Link
                  href="/berita"
                  className="flex items-center gap-2 transition-colors hover:text-brand-base"
                >
                  Transparansi Dana
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak Info (Span 3) dg Ikon Tipis */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 text-[15px] font-bold text-text-dark">Hubungi Kami</h4>
            <ul className="space-y-4 text-[14px] font-medium text-text-muted">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-brand-base" />
                <span className="leading-relaxed font-bold">
                  Kantor Kelurahan Wergu Wetan
                  <br />
                  Kec. Kota, Kab. Kudus, 59318
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-brand-base" />
                <span className="font-bold">(0291) 430123</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-brand-base" />
                <span className="font-bold">pemdes@werguwetan.id</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Newsletter Boxy Modern (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="mb-6 text-[15px] font-bold text-text-dark">Berlangganan Info</h4>
            <p className="mb-5 text-[13.5px] leading-relaxed font-medium text-text-muted">
              Dapatkan notifikasi berita dan kegiatan kelurahan mingguan langsung ke kontak Anda.
            </p>
            <div className="flex items-center overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50 shadow-inner transition-all focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="email"
                placeholder="contoh@email.com"
                className="w-full bg-transparent px-4 py-3 text-[13.5px] font-medium text-text-dark placeholder-slate-400 outline-none"
              />
              <button className="bg-brand-base p-3 text-white transition-colors hover:bg-brand-dark">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Bawah Copyright */}
      <div className="border-t border-slate-100 bg-slate-50/50">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 text-[13px] font-bold text-text-muted md:flex-row">
          <p>&copy; {new Date().getFullYear()} Pemerintah Kelurahan Wergu Wetan.</p>
          <div className="flex flex-wrap justify-center gap-5 md:gap-8">
            <Link href="#" className="transition-colors hover:text-brand-base">
              Kebijakan Privasi
            </Link>
            <Link href="#" className="transition-colors hover:text-brand-base">
              Syarat Ketentuan
            </Link>
            <Link href="/admin/login" className="transition-colors hover:text-brand-base">
              Portal Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
