"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { dictionary } from "@/lib/dictionary";

// GANTI 'JV' JADI 'JW' DISINI
type Language = "ID" | "EN" | "JW";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (typeof dictionary)["ID"];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("ID");
  const t = dictionary[lang]; // Otomatis ambil teks berdasarkan ID/EN/JW

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
