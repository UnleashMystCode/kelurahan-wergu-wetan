"use client";

import { useState } from "react";
import { Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TopBar() {
  const { lang, setLang } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);

  const handleLangChange = (code: "ID" | "EN" | "JW") => {
    setLang(code);
    setLangOpen(false);
  };

  return (
    // Tambahkan h-[40px] agar tingginya PASTI 40px
    <div className="bg-slate-900 text-slate-300 text-[11px] md:text-xs h-[40px] flex items-center transition-all relative z-[10000]">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center w-full">
        
        {/* KIRI: INFO KONTAK */}
        <div className="flex items-center gap-4 md:gap-6">
           <div className="flex items-center gap-2 hover:text-white transition-colors">
             <Phone size={14} className="text-blue-500" /> <span className="hidden sm:inline">(0291) 430xxx</span>
           </div>
           <div className="flex items-center gap-2 hover:text-white transition-colors">
             <Mail size={14} className="text-blue-500" /> <span className="hidden sm:inline">kel.werguwetan@gmail.com</span>
           </div>
           <div className="hidden md:flex items-center gap-2">
             <Clock size={14} className="text-blue-500" /> <span>Senin - Jumat (08:00 - 15:00)</span>
           </div>
        </div>

        {/* KANAN: SOSMED & BAHASA */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-slate-700">
            <a href="#" className="hover:text-blue-400"><Facebook size={14} /></a>
            <a href="#" className="hover:text-pink-500"><Instagram size={14} /></a>
            <a href="#" className="hover:text-sky-400"><Twitter size={14} /></a>
            <a href="#" className="hover:text-red-500"><Youtube size={14} /></a>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)} 
              className={`flex items-center gap-1.5 font-bold hover:text-white transition ${langOpen ? 'text-white' : ''}`}
            >
              <Globe size={14} /> 
              <span className="w-5 text-center">{lang}</span> 
              <ChevronDown size={12} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)}></div>
                <div className="absolute right-0 top-full mt-2 w-20 bg-white text-slate-800 rounded-lg shadow-xl py-1 z-50 border border-slate-200">
                  {["ID", "EN", "JW"].map((code) => (
                    <button 
                      key={code}
                      onClick={() => handleLangChange(code as any)} 
                      className={`w-full text-center py-1.5 text-xs hover:bg-blue-50 font-bold ${lang === code ? 'text-blue-600 bg-blue-50' : ''}`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}