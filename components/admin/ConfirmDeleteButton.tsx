"use client";

import { useState, useTransition, ReactNode } from "react";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";

type Props = {
  /** Server action yang dipanggil setelah user konfirmasi */
  action: () => Promise<void>;
  /** Nama / deskripsi item yang akan dihapus — ditampilkan di dialog */
  itemName?: string;
  /** Judul dialog konfirmasi */
  title?: string;
  /** Custom tombol trigger — default: ikon Trash2 */
  trigger?: ReactNode;
};

export function ConfirmDeleteButton({
  action,
  itemName = "item ini",
  title = "Konfirmasi Hapus",
  trigger,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      await action();
      setIsOpen(false);
    });
  };

  return (
    <>
      {/* Tombol Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-red-50 hover:text-red-600"
        title="Hapus"
      >
        {trigger ?? <Trash2 size={17} />}
      </button>

      {/* Dialog Konfirmasi */}
      {isOpen && (
        <div
          className="animate-in fade-in fixed inset-0 z-[300] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm duration-150"
          onClick={() => !isPending && setIsOpen(false)}
        >
          <div
            className="animate-in zoom-in-90 w-full max-w-sm rounded-xl bg-white p-8 shadow-2xl duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ikon Peringatan */}
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 text-red-500">
              <AlertTriangle size={28} />
            </div>

            {/* Konten */}
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-lg font-black text-slate-800">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">
                Anda yakin ingin menghapus <strong className="text-slate-700">{itemName}</strong>?
                <br />
                <span className="text-xs font-semibold text-red-500">
                  Tindakan ini tidak bisa dibatalkan.
                </span>
              </p>
            </div>

            {/* Tombol Aksi */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="flex-1 rounded-xl bg-slate-100 py-3 font-bold text-slate-600 transition hover:bg-slate-200 disabled:opacity-60"
              >
                Batal
              </button>
              <button
                onClick={handleConfirm}
                disabled={isPending}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-black text-white shadow-lg shadow-red-200 transition hover:bg-red-700 disabled:opacity-70"
              >
                {isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                {isPending ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
