import { PengajuanSuratSchema } from "../schemas/layanan.schema";
import { LayananRepository } from "../repositories/layanan.repository";

/**
 * [SERVICE LAYER / USE CASE]
 * Jantung aplikasi (Core Business Logic) untuk entitas 'Layanan/Pengajuan Surat'.
 * Tugas pokok Service:
 * 1. Menerima data mentah dari Controller (layananAction).
 * 2. Memerintahkan Schema Layer (Zod) untuk memvalidasi kelurusan data.
 * 3. Menjalankan aturan bisnis spesifik (contoh: otomatis set status ke "Pending").
 * 4. Memerintahkan Repository Layer untuk menyimpan data yang sudah divalidasi.
 * 
 * Aturan Ketat: Service tidak boleh tahu menahu urusan UI (React/Next.js router) maupun jenis Database (MySQL/Prisma).
 */
export class LayananService {
    // Memanggil asisten spesialis database (Repository)
    private repository = new LayananRepository();

    async prosesKirimPengajuan(rawFormData: FormData) {
        // 1. Ekstraksi DTO (Data Transfer Object) Mentah
        const rawData = {
            nama: rawFormData.get("nama"),
            nik: rawFormData.get("nik"),
            jenisSurat: rawFormData.get("jenisSurat"),
            whatsapp: rawFormData.get("whatsapp"),
        };

        // 2. Proses Validasi (Defensive Programming)
        // Memastikan data sesuai dengan aturan yang dideklarasikan di layanan.schema.ts
        const validData = PengajuanSuratSchema.safeParse(rawData);

        // Jika data aneh (ex: NIK < 16 digit), gagalkan proses dan lempar (throw) error ke Controller
        if (!validData.success) {
            throw new Error(`Data tidak valid: ${validData.error.issues[0].message}`);
        }

        // 3. Persetujuan & Eksekusi Database
        // Jika data lolos seleksi kualitas, suruh Repository menyimpannya ke Database
        return await this.repository.simpanPengajuan(validData.data);
    }
}

