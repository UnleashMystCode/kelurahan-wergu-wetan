import { z } from "zod";

// DTO (Data Transfer Object) untuk pengajuan surat
export const PengajuanSuratSchema = z.object({
    nama: z.string().min(3, "Nama minimal 3 karakter"),
    nik: z.string().length(16, "NIK harus tepat 16 digit angka"),
    jenisSurat: z.string().min(1, "Jenis surat harus dipilih"),
    whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid"),
});

// Inferensi tipe TypeScript secara otomatis dari Zod
export type PengajuanSuratDTO = z.infer<typeof PengajuanSuratSchema>;
