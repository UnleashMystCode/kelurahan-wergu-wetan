"use client";

import { useTransition } from "react";
import { Eye } from "lucide-react";
import Link from "next/link";
import { hapusPotensi } from "@/actions/potensi.action";
import { ModalEditPotensi } from "./PotensiModals";
import { ConfirmDeleteButton } from "./ConfirmDeleteButton";

type PotensiItem = {
  id: number;
  judul: string;
  slug: string;
  deskripsiSingkat: string;
  isi: string;
  kategori: string;
  gambar: string | null;
  status: string;
};

export function PotensiRowActions({ item }: { item: PotensiItem }) {
  return (
    <div className="flex justify-end gap-2">
      {/* Lihat halaman publik */}
      <Link
        href={`/potensi-desa/${item.slug}`}
        target="_blank"
        className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-600"
        title="Lihat Artikel"
      >
        <Eye size={17} />
      </Link>

      {/* Edit — modal pre-filled */}
      <ModalEditPotensi item={item} />

      {/* Hapus — dengan dialog konfirmasi */}
      <ConfirmDeleteButton
        action={async () => {
          await hapusPotensi(item.id);
        }}
        itemName={`"${item.judul}"`}
        title="Hapus Data Potensi?"
      />
    </div>
  );
}
