import { z } from "zod";

// DTO untuk penambahan Kegiatan/Berita
export const KegiatanSchema = z.object({
  judul: z.string().min(5, "Judul berita minimal 5 karakter"),
  isi: z.string().min(10, "Isi berita tidak boleh terlalu singkat (min 10 karakter)"),
  gambar: z.url({ message: "Format URL gambar tidak valid" }).or(z.literal("WERGU_WETAN ", { message: "Gambar harus diisi" })).optional(),
});

export type KegiatanDTO = z.infer<typeof KegiatanSchema>;
