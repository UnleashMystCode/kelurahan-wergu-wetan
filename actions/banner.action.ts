"use server";

import { revalidatePath } from "next/cache";
import { BannerService } from "@/core/services/banner.service";

/**
 * [CONTROLLER LAYER / ADAPTER] - Domain Banner
 * Murni bertugas mengatur lalu lintas (Routing HTTP & Cache).
 * Pendelegasian (Delegation Pattern) digunakan secara penuh di sini:
 * Controller ini mendelegasikan semua urusan rumit (simpan file fisik, Database, validasi) ke BannerService.
 */
const bannerService = new BannerService();

// --- FUNGSI 1: SIMPAN BANNER (CREATE / UPDATE) ---
export async function saveBanner(formData: FormData) {
  try {
    // [DELEGASI] Lempar FormData mentah ke Service
    await bannerService.prosesSimpanBanner(formData);

    // [FRAMEWORK LOGIC] Invalidasi cache cache beranda, halaman admin, dan profil yang menampilkan banner
    revalidatePath("/admin/banner");
    revalidatePath("/home");
    revalidatePath("/tentang-kami");
    revalidatePath("/");

    return { success: true, message: "Banner berhasil disimpan!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- FUNGSI 2: HAPUS BANNER (DELETE) ---
export async function hapusBanner(id: number) {
  try {
    // [DELEGASI] Lempar ID banner yang ingin dihapus
    await bannerService.prosesHapusBanner(id);

    revalidatePath("/admin/banner");
    revalidatePath("/home");
    revalidatePath("/tentang-kami");
    revalidatePath("/");

    return { success: true, message: "Banner berhasil dihapus!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
