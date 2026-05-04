"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { z } from "zod";

// --- SKEMA VALIDASI ---
const PengajuanSuratSchema = z.object({
  nama: z.string().min(3, "Nama minimal 3 karakter"),
  nik: z.string().length(16, "NIK harus tepat 16 digit angka"),
  jenisSurat: z.string().min(1, "Jenis surat harus dipilih"),
  whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid"),
});

export async function kirimPengajuan(rawFormData: FormData) {
  try {
    const rawData = {
      nama: rawFormData.get("nama"),
      nik: rawFormData.get("nik"),
      jenisSurat: rawFormData.get("jenisSurat"),
      whatsapp: rawFormData.get("whatsapp"),
    };

    const validData = PengajuanSuratSchema.safeParse(rawData);

    if (!validData.success) {
      throw new Error(`Data tidak valid: ${validData.error.issues[0].message}`);
    }

    await prisma.pengajuanSurat.create({
      data: {
        nama: validData.data.nama,
        nik: validData.data.nik,
        jenisSurat: validData.data.jenisSurat,
        whatsapp: validData.data.whatsapp,
        status: "pending", // Aturan bisnis (default status)
      },
    });

    revalidatePath("/admin/halaman/layanan/daftar");
    revalidatePath("/admin");

    return { success: true, message: "Pengajuan surat berhasil dikirim!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
