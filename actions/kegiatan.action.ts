"use server";

import { revalidatePath } from "next/cache";
import { KegiatanService } from "@/core/services/kegiatan.service";

/**
 * [CONTROLLER LAYER / ADAPTER] - Domain Kegiatan/Berita
 * Menangani request HTTP dari form user. Sama seperti LayananAction,
 * file ini dilarang keras memanggil PrimaClient (database) secara langsung.
 */
const kegiatanService = new KegiatanService();

// --- 1. TAMBAH KEGIATAN ---
export async function tambahKegiatan(formData: FormData) {
    try {
        // [DELEGASI] Menyerahkan proses pendaftaran berita baru ke Service Layer
        await kegiatanService.prosesTambahKegiatan(formData);

        // [FRAMEWORK LOGIC] Me-refresh cache Next.js agar berita baru langsung muncul di tabel admin & homepage
        revalidatePath("/admin/halaman/berita");
        revalidatePath("/home");

        return { success: true, message: "Kegiatan berhasil ditambahkan!" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

// --- 2. HAPUS KEGIATAN ---
export async function hapusKegiatan(id: number) {
    try {
        // [DELEGASI] Menyerahkan ID berita yang ingin dihapus ke Service Layer
        await kegiatanService.prosesHapusKegiatan(id);

        revalidatePath("/admin/halaman/berita");
        revalidatePath("/home");

        return { success: true, message: "Kegiatan berhasil dihapus!" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

// --- 3. UBAH KEGIATAN (EDIT) ===
export async function ubahKegiatan(id: number, formData: FormData) {
    try {
        await kegiatanService.prosesUbahKegiatan(id, formData);
        revalidatePath("/admin/halaman/berita");
        revalidatePath("/berita");
    } catch (error: any) {
        console.error("Gagal ubah kegiatan:", error.message);
    }
}
