"use server";

import { revalidatePath } from "next/cache";
import { KegiatanService } from "@/core/services/kegiatan.service";

/**
 * [CONTROLLER LAYER / ADAPTER] - Domain Berita
 * Menangani request HTTP dari form user.
 */
const kegiatanService = new KegiatanService();

export async function simpanBerita(formData: FormData) {
  try {
    await kegiatanService.prosesTambahKegiatan(formData);
    revalidatePath("/admin/halaman/berita");
    revalidatePath("/home");
    return { success: true, message: "Berita berhasil ditambahkan!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function hapusBerita(id: number) {
  try {
    await kegiatanService.prosesHapusKegiatan(id);
    revalidatePath("/admin/halaman/berita");
    revalidatePath("/home");
    return { success: true, message: "Berita berhasil dihapus!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function editBerita(id: number, formData: FormData) {
  try {
    await kegiatanService.prosesUbahKegiatan(id, formData);
    revalidatePath("/admin/halaman/berita");
    revalidatePath("/berita");
  } catch (error: any) {
    console.error("Gagal ubah berita:", error.message);
  }
}
