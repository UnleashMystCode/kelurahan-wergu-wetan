"use server";

import prisma from "@/lib/db";

export type SearchResult = {
  id: string | number;
  judul: string;
  slug: string;
  kategori: string;
  type: "berita" | "potensi" | "layanan";
  tanggal: Date;
};

export async function globalSearch(query: string): Promise<SearchResult[]> {
  if (!query || query.trim() === "") return [];

  const searchParam = `%${query.trim()}%`;

  try {
    // Cari di tabel Kegiatan (Berita)
    const berita = await prisma.kegiatan.findMany({
      where: {
        status: "Aktif",
        OR: [
          { judul: { contains: query.trim() } },
          { isi: { contains: query.trim() } },
          { kategori: { contains: query.trim() } },
        ],
      },
      take: 5,
      orderBy: { tanggal: "desc" },
    });

    // Cari di tabel PotensiDesa
    const potensi = await prisma.potensiDesa.findMany({
      where: {
        status: "Aktif",
        OR: [
          { judul: { contains: query.trim() } },
          { deskripsiSingkat: { contains: query.trim() } },
          { kategori: { contains: query.trim() } },
        ],
      },
      take: 5,
      orderBy: { tanggal: "desc" },
    });

    // Format dan gabungkan hasil
    const formattedBerita: SearchResult[] = berita.map((b: any) => ({
      id: `berita-${b.id}`,
      judul: b.judul,
      slug: b.slug,
      kategori: b.kategori,
      type: "berita",
      tanggal: b.tanggal,
    }));

    const formattedPotensi: SearchResult[] = potensi.map((p: any) => ({
      id: `potensi-${p.id}`,
      judul: p.judul,
      slug: p.slug,
      kategori: p.kategori,
      type: "potensi",
      tanggal: p.tanggal,
    }));

    // Gabungkan dan urutkan berdasarkan tanggal terbaru (maksimal 8 hasil keseluruhan)
    const combined = [...formattedBerita, ...formattedPotensi]
      .sort((a, b) => b.tanggal.getTime() - a.tanggal.getTime())
      .slice(0, 8);

    return combined;
  } catch (error) {
    console.error("Global search error:", error);
    return [];
  }
}
