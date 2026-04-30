import React from "react";
import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-sm font-semibold text-slate-500 animate-pulse uppercase tracking-widest">
          Memuat Modul Administrator...
        </p>
      </div>
    </div>
  );
}
