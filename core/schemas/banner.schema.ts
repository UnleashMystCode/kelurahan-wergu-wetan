import { z } from "zod";

export const BannerSchema = z.object({
  id: z.string().optional(),
  halaman: z.enum(["home", "profil", "layanan", "berita"]).default("home"),// Asumsi beberapa opsi halaman
  tagline: z.string().max(100, "Tagline terlalu panjang").optional(),
  judul: z.string().max(200, "Judul terlalu panjang").optional(),
  deskripsi: z.string().max(500, "Deskripsi terlalu panjang").optional(),
});

export type BannerDTO = z.infer<typeof BannerSchema>;
