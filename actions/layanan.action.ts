"use server";
// ^^^ Direktif Next.js: Menandakan bahwa fungsi di dalam file ini hanya boleh dieksekusi di server.

import { revalidatePath } from "next/cache";
import { LayananService } from "@/core/services/layanan.service";

/**
 * [CONTROLLER LAYER / ADAPTER]
 * File 'Action' ini sekarang berfungsi sebagai Controller murni.
 * Tugas pokok Controller:
 * 1. Menerima request (FormData) dari antarmuka pengguna (UI/Frontend).
 * 2. Meneruskan data tersebut ke Service Layer untuk diproses.
 * 3. Menangani framework-specific logic (seperti revalidatePath bawaan Next.js).
 * 4. Mengembalikan respons (success/error) ke UI.
 * 
 * Aturan Ketat: Sama sekali dilarang ada logika bisnis (if-else validasi) atau pemanggilan Database (Prisma) di file ini.
 */

// Instansiasi Service (Sebagai pelaksana logika bisnis)
const layananService = new LayananService();

export async function kirimPengajuan(formData: FormData) {
    try {
        // [DELEGASI] Controller menyerahkan seluruh beban kerja pemrosesan data ke Service Layer.
        await layananService.prosesKirimPengajuan(formData);

        // Jika Service Layer tidak melempar Error, artinya proses sukses.
        // [FRAMEWORK LOGIC] Refresh cache halaman Next.js agar tabel di Admin langsung terupdate.
        revalidatePath("/admin");

        return { success: true, message: "Pengajuan surat berhasil dikirim!" };
    } catch (error: any) {
        // Menangkap Error yang dilempar (throw) dari Service Layer (misalnya Error Validasi NIK dari Zod)
        return { success: false, message: error.message };
    }
}

