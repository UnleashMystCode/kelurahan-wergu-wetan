import Link from "next/link";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-slate-600 mt-auto border-t border-slate-200 relative overflow-hidden">
      {/* Decorative gradient orb to break monotony */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/80 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="container mx-auto px-6 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Kolom 1: Identitas (Lebih Dominan: Span 4) */}
            <div className="lg:col-span-4 pr-0 lg:pr-8">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <MapPin className="text-white" size={24} />
                 </div>
                 <h3 className="text-slate-800 text-2xl font-bold tracking-tight">
                    Wergu Wetan
                 </h3>
               </div>
               <p className="leading-relaxed text-[14.5px] text-slate-500 mb-8 font-medium">
                  Pusat layanan pemerintahan desa dan portal warta digital Kelurahan Wergu Wetan, Kecamatan Kota, Kabupaten Kudus. Birokrasi yang transparan, akuntabel, dan melayani.
               </p>
               
               {/* Social Icons integrated directly into identity block */}
               <div className="flex items-center gap-4">
                  <Link href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm text-slate-400"><Instagram size={18} /></Link>
                  <Link href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm text-slate-400"><Facebook size={18} fill="currentColor" className="stroke-0" /></Link>
                  <Link href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm text-slate-400"><Youtube size={20} fill="currentColor" className="stroke-0" /></Link>
               </div>
            </div>
            
            {/* Kolom 2: Navigasi (Span 2) */}
            <div className="lg:col-span-3 lg:pl-10">
               <h4 className="text-slate-800 font-bold mb-6 text-[15px] flex items-center gap-2">Pintasan Layanan</h4>
               <ul className="space-y-4 text-[14px] text-slate-500 font-bold">
                  <li><Link href="/home" className="hover:text-blue-600 transition-colors flex items-center gap-2">Beranda Utama</Link></li>
                  <li><Link href="/profil" className="hover:text-blue-600 transition-colors flex items-center gap-2">Profil Kelurahan</Link></li>
                  <li><Link href="/layanan" className="hover:text-blue-600 transition-colors flex items-center gap-2">E-Layanan Warga</Link></li>
                  <li><Link href="/berita" className="hover:text-blue-600 transition-colors flex items-center gap-2">Transparansi Dana</Link></li>
               </ul>
            </div>

            {/* Kolom 3: Kontak Info (Span 3) dg Ikon Tipis */}
            <div className="lg:col-span-2">
               <h4 className="text-slate-800 font-bold mb-6 text-[15px]">Hubungi Kami</h4>
               <ul className="space-y-4 text-[14px] text-slate-500 font-medium">
                  <li className="flex items-start gap-3">
                     <MapPin size={18} className="text-blue-600 mt-1 shrink-0" />
                     <span className="leading-relaxed font-bold">Jl. Jendral Sudirman No. 12<br/>Kudus, 59316</span>
                  </li>
                  <li className="flex items-center gap-3">
                     <Phone size={18} className="text-blue-600 shrink-0" />
                     <span className="font-bold">(0291) 430xxx</span>
                  </li>
                  <li className="flex items-center gap-3">
                     <Mail size={18} className="text-blue-600 shrink-0" />
                     <span className="font-bold">admin@desa.id</span>
                  </li>
               </ul>
            </div>

            {/* Kolom 4: Newsletter Boxy Modern (Span 3) */}
            <div className="lg:col-span-3">
               <h4 className="text-slate-800 font-bold mb-6 text-[15px]">Berlangganan Info</h4>
               <p className="text-[13.5px] text-slate-500 mb-5 leading-relaxed font-medium">
                  Dapatkan notifikasi berita dan kegiatan kelurahan mingguan langsung ke kontak Anda.
               </p>
               <div className="flex items-center bg-slate-50 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all border border-slate-200/80 shadow-inner">
                  <input 
                     type="email" 
                     placeholder="contoh@email.com" 
                     className="bg-transparent text-[13.5px] text-slate-700 font-medium w-full outline-none px-4 py-3 placeholder-slate-400"
                  />
                  <button className="bg-blue-600 text-white p-3 hover:bg-blue-700 transition-colors">
                     <Send size={18} />
                  </button>
               </div>
            </div>

        </div>
      </div>
      
      {/* Bagian Bawah Copyright */}
      <div className="border-t border-slate-100 bg-slate-50/50">
         <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-slate-500 font-bold">
            <p>&copy; {new Date().getFullYear()} Pemerintah Kelurahan Wergu Wetan.</p>
            <div className="flex flex-wrap justify-center gap-5 md:gap-8">
                <Link href="#" className="hover:text-blue-600 transition-colors">Kebijakan Privasi</Link>
                <Link href="#" className="hover:text-blue-600 transition-colors">Syarat Ketentuan</Link>
                <Link href="/admin/login" className="hover:text-blue-600 transition-colors">Portal Admin</Link>
            </div>
         </div>
      </div>
    </footer>
  );
}