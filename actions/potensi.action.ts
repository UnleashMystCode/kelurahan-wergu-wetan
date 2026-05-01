"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { PotensiDesaSchema } from "@/core/schemas/potensi.schema";

function createSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function simpanPotensi(formData: FormData) {
  try {
    const actionType = formData.get("actionType") as string;
    const isTakedown = actionType === "takedown";
    const statusVal = isTakedown ? "Nonaktif" : "Aktif";

    // Build payload
    const rawData = {
      judul: formData.get("judul"),
      deskripsiSingkat: formData.get("deskripsiSingkat"),
      isi: formData.get("isi"),
      kategori: formData.get("kategori"),
      gambar: formData.get("gambarURL") || formData.get("gambar"), // Support direct string or Cloudinary URL
      tanggal: formData.get("tanggal") || undefined,
    };

    // Validasi Zod
    const validated = PotensiDesaSchema.parse(rawData);

    // Cek Edit / Tambah
    const idParam = formData.get("id");
    const isEdit = idParam !== null && idParam !== "";

    let newSlug = createSlug(validated.judul);

    if (isEdit) {
      const existingId = Number(idParam);
      
      // Pastikan slug unik (jika judul berubah)
      const existingSlug = await prisma.potensiDesa.findFirst({
        where: { slug: newSlug, NOT: { id: existingId } },
      });
      if (existingSlug) {
        newSlug = `${newSlug}-${Date.now()}`;
      }

      await prisma.potensiDesa.update({
        where: { id: existingId },
        data: {
          judul: validated.judul,
          slug: newSlug,
          deskripsiSingkat: validated.deskripsiSingkat,
          isi: validated.isi,
          kategori: validated.kategori,
          gambar: validated.gambar === "WERGU_WETAN " ? null : validated.gambar,
          status: statusVal,
          tanggal: validated.tanggal ? new Date(validated.tanggal) : undefined,
        },
      });
    } else {
      // Create baru
      const existingSlug = await prisma.potensiDesa.findUnique({ where: { slug: newSlug } });
      if (existingSlug) {
        newSlug = `${newSlug}-${Date.now()}`;
      }

      await prisma.potensiDesa.create({
        data: {
          judul: validated.judul,
          slug: newSlug,
          deskripsiSingkat: validated.deskripsiSingkat,
          isi: validated.isi,
          kategori: validated.kategori,
          gambar: validated.gambar === "WERGU_WETAN " ? null : validated.gambar,
          status: statusVal,
          tanggal: validated.tanggal ? new Date(validated.tanggal) : new Date(),
        },
      });
    }

    revalidatePath("/admin/halaman/potensi-desa");
    revalidatePath("/potensi-desa");
    return { success: true };
  } catch (error: any) {
    console.error("Error simpan potensi:", error);
    if (error.name === "ZodError") {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: "Gagal menyimpan data potensi." };
  }
}

export async function hapusPotensi(id: number) {
  try {
    await prisma.potensiDesa.delete({
      where: { id },
    });
    revalidatePath("/admin/halaman/potensi-desa");
    revalidatePath("/potensi-desa");
    return { success: true };
  } catch (error) {
    console.error("Error hapus potensi:", error);
    return { success: false, error: "Gagal menghapus data potensi." };
  }
}
