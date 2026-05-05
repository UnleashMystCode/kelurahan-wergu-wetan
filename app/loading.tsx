import React from "react";

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-slate-50 pb-20">
      {/* 
        HERO SKELETON (DARK) 
        Ini wajib ada agar saat pindah page dari banner gelap tidak kena "flashbang" putih.
      */}
      <div className="relative mt-[-100px] flex h-[600px] w-full flex-col items-center justify-center bg-slate-900 px-4 pt-[100px]">
        {/* Soft pulsing elements to mimic the text/title */}
        <div className="flex w-full max-w-3xl flex-col items-center justify-center space-y-6">
          <div className="h-6 w-32 rounded-full bg-text-dark animate-pulse" />
          <div className="h-16 w-3/4 rounded-2xl bg-text-dark animate-pulse md:w-1/2" />
          <div className="h-4 w-1/2 rounded-full bg-text-dark animate-pulse" />
        </div>
      </div>

      {/* 
        CONTENT SKELETON (LIGHT) 
        Gaya card ala GitHub/YouTube (abu-abu kalem dan tidak mencolok mata).
      */}
      <div className="container mx-auto px-6 py-16">
        {/* Skeleton Section Title */}
        <div className="mb-10 max-w-xs">
          <div className="mb-3 h-3 w-24 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-8 w-64 rounded-xl bg-slate-200 animate-pulse" />
        </div>

        {/* Skeleton Grid (Rounded, soft grays) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              {/* Image/Map Placeholder */}
              <div className="mb-6 h-48 w-full rounded-xl bg-slate-100 animate-pulse" />
              
              {/* Text Lines */}
              <div className="mb-3 h-5 w-3/4 rounded-lg bg-slate-200 animate-pulse" />
              <div className="mb-2 h-4 w-full rounded-full bg-slate-100 animate-pulse" />
              <div className="mb-6 h-4 w-5/6 rounded-full bg-slate-100 animate-pulse" />
              
              {/* Footer / Buttons */}
              <div className="mt-auto flex items-center justify-between">
                <div className="h-10 w-28 rounded-full bg-slate-100 animate-pulse" />
                <div className="h-10 w-10 rounded-full bg-slate-100 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
