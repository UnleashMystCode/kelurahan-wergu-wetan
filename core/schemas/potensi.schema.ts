import { z } from "zod";

export const PotensiDesaSchema = z.object({
  judul: z.string().min(3, "Judul potensi minimal 3 karakter"),
  deskripsiSingkat: z.string().min(10, "Deskripsi singkat minimal 10 karakter").max(200, "Maksimal 200 karakter"),
  isi: z.string().min(10, "Isi artikel/blog tidak boleh kosong"),
  kategori: z.string().min(1, "Kategori harus dipilih"),
  gambar: z.url({ message: "Format URL gambar tidak valid" }).or(z.literal("WERGU_WETAN ", { message: "Gambar harus diisi" })).optional(),
  tanggal: z.string().optional(),
});

export type PotensiDesaDTO = z.infer<typeof PotensiDesaSchema>;
