"use server";

import { revalidatePath } from "next/cache";
import { HomeService } from "@/core/services/home.service";

/**
 * [CONTROLLER LAYER / ADAPTER] - Domain Home & Dashboard
 * Mengontrol alur request untuk 3 jenis data:
 * 1. Statistik Excel
 * 2. Layanan (Icon Grid Beranda)
 * 3. Sambutan Lurah
 * 
 * Karena file ini sudah di-refactor, 171 baris kode yang "kotor" (parsing Excel & I/O Foto)
 * telah dibuang ke Service Layer, menyisakan Controller yang sangat bersih.
 */
const homeService = new HomeService();

// === 1. UPLOAD STATISTIK EXCEL ===
export async function uploadStatisticsExcel(formData: FormData) {
  try {
    // [DELEGASI] Menyerahkan proses pembacaan file Excel yang sangat berat ke Service
    await homeService.prosesUploadStatistik(formData);

    revalidatePath("/home");
    revalidatePath("/tentang-kami");
    revalidatePath("/admin/halaman/tentang-kami/statistik");
    return { success: true, message: "Data Excel berhasil diunggah!" };
  } catch (error: any) {
    console.error("Upload Error:", error);
    return { success: false, message: `Gagal proses: ${error.message}` };
  }
}

export async function saveStatistic(formData: FormData) {
  try {
    await homeService.prosesSimpanStatistik(formData);

    revalidatePath("/home");
    revalidatePath("/tentang-kami");
    revalidatePath("/admin/halaman/tentang-kami/statistik");

    return { success: true, message: "Statistik berhasil disimpan!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteStatistic(id: number) {
  try {
    await homeService.prosesHapusStatistik(id);

    revalidatePath("/home");
    revalidatePath("/tentang-kami");
    revalidatePath("/admin/halaman/tentang-kami/statistik");

    return { success: true, message: "Statistik berhasil dihapus!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// === 2. KELOLA LAYANAN (CRUD / ICON GRID BERANDA) ===
export async function saveService(formData: FormData) {
  try {
    await homeService.prosesSimpanLayanan(formData);

    revalidatePath("/home");
    revalidatePath("/admin/halaman/beranda");
    return { success: true, message: "Layanan berhasil disimpan!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteService(id: number) {
  try {
    await homeService.prosesHapusLayanan(id);

    revalidatePath("/home");
    revalidatePath("/admin/halaman/beranda");
    return { success: true, message: "Layanan berhasil dihapus!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// === 3. SAMBUTAN LURAH ===
export async function saveWelcome(formData: FormData) {
  try {
    await homeService.prosesSimpanSambutan(formData);

    revalidatePath("/home");
    revalidatePath("/admin/halaman/beranda");
    return { success: true, message: "Sambutan sukses diperbarui!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

