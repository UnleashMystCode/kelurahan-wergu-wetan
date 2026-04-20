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
                className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                title="Hapus"
            >
                {trigger ?? <Trash2 size={17} />}
            </button>

            {/* Dialog Konfirmasi */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[300] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
                    onClick={() => !isPending && setIsOpen(false)}
                >
                    <div
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 animate-in zoom-in-90 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Ikon Peringatan */}
                        <div className="w-14 h-14 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-5">
                            <AlertTriangle size={28} />
                        </div>

                        {/* Konten */}
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-black text-slate-800 mb-2">{title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Anda yakin ingin menghapus <strong className="text-slate-700">{itemName}</strong>?
                                <br />
                                <span className="text-red-500 font-semibold text-xs">Tindakan ini tidak bisa dibatalkan.</span>
                            </p>
                        </div>

                        {/* Tombol Aksi */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                disabled={isPending}
                                className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition disabled:opacity-60"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={isPending}
                                className="flex-1 py-3 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 transition flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-red-200"
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
