import { z } from "zod";

// DTO untuk Layanan (Icon Grid)
export const HomeServiceSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(2, "Judul layanan minimal 2 karakter"),
});

export type HomeServiceDTO = z.infer<typeof HomeServiceSchema>;

// DTO untuk Sambutan Lurah
export const HomeWelcomeSchema = z.object({
    namaLurah: z.string().min(3, "Nama Lurah minimal 3 karakter"),
    konten: z.string().min(20, "Konten sambutan terlalu singkat"),
});

export type HomeWelcomeDTO = z.infer<typeof HomeWelcomeSchema>;

// DTO untuk Statistik Excel Data Item
export const HomeStatisticItemSchema = z.object({
    label: z.string().min(1),
    value: z.string().min(1),
});

export type HomeStatisticItemDTO = z.infer<typeof HomeStatisticItemSchema>;
