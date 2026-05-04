"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { z } from "zod";

// --- SKEMA VALIDASI ---
const KegiatanSchema = z.object({
  judul: z.string().min(5, "Judul berita minimal 5 karakter"),
  isi: z.string().min(10, "Isi berita tidak boleh terlalu singkat (min 10 karakter)"),
  gambar: z.string().optional(), // simplified
});

export async function simpanBerita(rawFormData: FormData) {
  try {
    const rawData = {
      judul: rawFormData.get("judul"),
      isi: rawFormData.get("isi"),
      gambar: rawFormData.get("gambar") || "",
    };

    const validData = KegiatanSchema.safeParse(rawData);
    if (!validData.success) {
      throw new Error(`Data kegiatan tidak valid: ${validData.error.issues[0].message}`);
    }

    const judulBersih = validData.data.judul.trim();
    const slug = judulBersih.toLowerCase().replace(/ /g, "-") + "-" + Date.now();

    await prisma.kegiatan.create({
      data: {
        judul: validData.data.judul,
        isi: validData.data.isi,
        gambar: validData.data.gambar || "/images/hero_office.png", // fallback image
        slug: slug,
        kategori: "berita", // default
        penulis: "Admin Kelurahan",
        status: "publikasi",
      },
    });

    revalidatePath("/admin/halaman/berita");
    revalidatePath("/home");
    return { success: true, message: "Berita berhasil ditambahkan!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function hapusBerita(id: number) {
  try {
    if (!id || id <= 0) throw new Error("ID Kegiatan tidak valid");

    await prisma.kegiatan.delete({
      where: { id },
    });

    revalidatePath("/admin/halaman/berita");
    revalidatePath("/home");
    return { success: true, message: "Berita berhasil dihapus!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function editBerita(id: number, rawFormData: FormData) {
  try {
    if (!id || id <= 0) throw new Error("ID Kegiatan tidak valid");

    const judul = rawFormData.get("judul") as string;
    const isi = rawFormData.get("isi") as string;
    const gambar = rawFormData.get("gambar") as string | null;
    const kategori = rawFormData.get("kategori") as string;
    const penulis = rawFormData.get("penulis") as string;
    const status = rawFormData.get("status") as string;

    const dataToUpdate: any = { judul, isi };
    if (gambar) dataToUpdate.gambar = gambar;
    if (kategori) dataToUpdate.kategori = kategori;
    if (penulis) dataToUpdate.penulis = penulis;
    if (status) dataToUpdate.status = status;

    await prisma.kegiatan.update({
      where: { id },
      data: dataToUpdate,
    });

    revalidatePath("/admin/halaman/berita");
    revalidatePath("/berita");
  } catch (error: any) {
    console.error("Gagal ubah berita:", error.message);
  }
}
