"use client";

import { useTransition } from "react";
import { Eye } from "lucide-react";
import Link from "next/link";
import { hapusKegiatan } from "@/actions/kegiatan.action";
import { ModalEditBerita } from "./ModalEditBerita";
import { ConfirmDeleteButton } from "./ConfirmDeleteButton";

type BeritaItem = {
    id: number;
    judul: string;
    isi: string;
    gambar: string | null;
    kategori: string;
    penulis: string;
    status: string;
    slug: string;
};

export function BeritaRowActions({ item }: { item: BeritaItem }) {
    return (
        <div className="flex justify-end gap-2">
            {/* Lihat halaman publik */}
            <Link
                href={`/berita/${item.slug}`}
                target="_blank"
                className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                title="Lihat Berita"
            >
                <Eye size={17} />
            </Link>

            {/* Edit — modal pre-filled */}
            <ModalEditBerita item={item} />

            {/* Hapus — dengan dialog konfirmasi */}
            <ConfirmDeleteButton
                action={async () => { await hapusKegiatan(item.id); }}
                itemName={`"${item.judul}"`}
                title="Hapus Berita?"
            />
        </div>
    );
}
