"use server";

import { z } from "zod";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

// 1. Zod Schema untuk Validasi Input (Keamanan dari injeksi/data kosong)
const TambahUlasanSchema = z.object({
  nama: z.string().optional().default("Anonim"), // Boleh kosong, jadi "Anonim"
  rating: z.number().min(1).max(5),              // Bintang 1-5
  pesan: z.string().min(5, "Pesan minimal 5 karakter").max(500, "Pesan maksimal 500 karakter"),
});

// 2. Action: Simpan Ulasan Baru dari Warga
export async function tambahUlasan(formData: FormData) {
  try {
    const rawData = {
      nama: formData.get("nama")?.toString() || undefined,
      rating: Number(formData.get("rating")),
      pesan: formData.get("pesan")?.toString(),
    };

    // Validasi aman
    const valid = TambahUlasanSchema.safeParse(rawData);
    if (!valid.success) {
      return { success: false, message: valid.error.issues[0].message };
    }

    // Insert ke database Supabase
    const ulasan = await prisma.ulasanLayanan.create({
      data: {
        nama: valid.data.nama || "Anonim",
        rating: valid.data.rating,
        pesan: valid.data.pesan,
        isRead: false, // Default admin belum baca
      },
    });

    // Refresh halaman layanan dan admin agar data baru langsung muncul
    revalidatePath("/layanan");
    revalidatePath("/admin/halaman/layanan");

    return { 
      success: true, 
      message: "Terima kasih! Ulasan Anda berhasil dikirim.",
      data: ulasan 
    };
  } catch (error: any) {
    console.error("Gagal tambah ulasan:", error);
    return { success: false, message: "Terjadi kesalahan sistem saat mengirim ulasan." };
  }
}

// 3. Action: Ambil Data Ulasan untuk Dashboard Admin
export async function getSemuaUlasan() {
  try {
    const ulasan = await prisma.ulasanLayanan.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: ulasan };
  } catch (error: any) {
    return { success: false, message: "Gagal mengambil data ulasan." };
  }
}

// 4. Action: Hitung Statistik Ulasan (Rata-rata Bintang & Jumlah)
export async function getStatistikUlasan() {
  try {
    // Jalankan 2 query paralel agar lebih cepat
    const [total, avgRating] = await Promise.all([
      prisma.ulasanLayanan.count(),
      prisma.ulasanLayanan.aggregate({
        _avg: { rating: true },
      }),
    ]);

    return {
      success: true,
      data: {
        totalUlasan: total,
        rataRataBintang: avgRating._avg.rating ? Number(avgRating._avg.rating.toFixed(1)) : 0,
      },
    };
  } catch (error) {
    return { success: false, message: "Gagal menghitung statistik." };
  }
}
