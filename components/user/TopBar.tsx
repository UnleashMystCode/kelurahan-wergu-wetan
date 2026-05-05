"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  ChevronDown,
} from "lucide-react";
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
    <div className="relative z-[10000] flex h-[40px] items-center bg-text-dark text-[11px] text-slate-300 transition-all md:text-xs">
      <div className="container mx-auto flex w-full items-center justify-between px-4 md:px-6">
        {/* KIRI: INFO KONTAK */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 transition-colors hover:text-white">
            <Phone size={14} className="shrink-0 text-brand-base" />{" "}
            <span className="hidden sm:inline">(0291) 430xxx</span>
          </div>
          <div className="flex items-center gap-2 transition-colors hover:text-white">
            <Mail size={14} className="shrink-0 text-brand-base" />{" "}
            <span className="hidden sm:inline">kel.werguwetan@gmail.com</span>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Clock size={14} className="shrink-0 text-brand-base" /> <span>Senin - Jumat (08:00 - 15:00)</span>
          </div>
        </div>

        {/* KANAN: SOSMED & BAHASA */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 border-r border-slate-700 pr-4 sm:flex">
            <a href="#" className="hover:text-blue-400">
              <Facebook size={14} />
            </a>
            <a href="#" className="hover:text-pink-500">
              <Instagram size={14} />
            </a>
            <a href="#" className="hover:text-sky-400">
              <Twitter size={14} />
            </a>
            <a href="#" className="hover:text-red-500">
              <Youtube size={14} />
            </a>
          </div>

          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 font-bold transition hover:text-white ${langOpen ? "text-white" : ""}`}
            >
              <Globe size={14} className="shrink-0" />
              <span className="w-5 shrink-0 text-center">{lang}</span>
              <ChevronDown
                size={12}
                className={`shrink-0 transition-transform ${langOpen ? "rotate-180" : ""}`}
              />
            </button>

            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)}></div>
                <div className="absolute top-full right-0 z-50 mt-2 w-20 rounded-lg border border-slate-200 bg-white py-1 text-text-dark shadow-xl">
                  {["ID", "EN", "JW"].map((code) => (
                    <button
                      key={code}
                      onClick={() => handleLangChange(code as any)}
                      className={`w-full py-1.5 text-center text-xs font-bold hover:bg-blue-50 ${lang === code ? "bg-blue-50 text-brand-base" : ""}`}
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
