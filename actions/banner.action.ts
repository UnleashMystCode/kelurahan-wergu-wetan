"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import { z } from "zod";

// --- SKEMA VALIDASI ---
const BannerSchema = z.object({
  id: z.string().optional(),
  halaman: z.enum(["home", "layanan", "berita", "kontak", "tentang-kami", "potensi-desa", "ayo-sehat"]).default("home"),
  tagline: z.string().max(100, "Tagline terlalu panjang").optional(),
  judul: z.string().max(200, "Judul terlalu panjang").optional(),
  deskripsi: z.string().max(500, "Deskripsi terlalu panjang").optional(),
});

// --- ACTION 1: SIMPAN BANNER (CREATE / UPDATE) ---
export async function saveBanner(formData: FormData) {
  try {
    const rawData = {
      id: formData.get("id"),
      halaman: formData.get("halaman"),
      tagline: formData.get("tagline"),
      judul: formData.get("judul"),
      deskripsi: formData.get("deskripsi"),
    };

    const validData = BannerSchema.safeParse(rawData);
    if (!validData.success) {
      throw new Error(`Validasi gagal: ${validData.error.issues[0].message}`);
    }

    const fileInput = formData.get("gambarFile") as File | null;
    const urlInput = formData.get("gambarUrl") as string | null;

    let finalGambarURL = "";
    if (fileInput && fileInput.size > 0) {
      const buffer = Buffer.from(await fileInput.arrayBuffer());
      const filename = Date.now() + "-" + fileInput.name.replaceAll(" ", "_");
      const uploadDir = path.join(process.cwd(), "public/uploads");
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (e) {} 
      await writeFile(path.join(uploadDir, filename), buffer);
      finalGambarURL = `/uploads/${filename}`;
    } else if (urlInput && urlInput.trim() !== "") {
      finalGambarURL = urlInput.trim();
    }

    const id = validData.data.id ? parseInt(validData.data.id) : null;

    if (id) {
      const updateData: any = {
        halaman: validData.data.halaman,
        tagline: validData.data.tagline,
        judul: validData.data.judul,
        deskripsi: validData.data.deskripsi,
      };
      if (finalGambarURL) updateData.gambarURL = finalGambarURL;

      await prisma.bannerHomepage.update({
        where: { id },
        data: updateData,
      });
    } else {
      if (!finalGambarURL) throw new Error("Wajib menyertakan Gambar!");
      await prisma.bannerHomepage.create({
        data: {
          halaman: validData.data.halaman,
          tagline: validData.data.tagline,
          judul: validData.data.judul,
          deskripsi: validData.data.deskripsi,
          gambarURL: finalGambarURL,
        },
      });
    }

    revalidatePath("/admin/halaman");
    revalidatePath("/home");
    revalidatePath("/tentang-kami");
    revalidatePath("/");

    return { success: true, message: "Banner berhasil disimpan!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- ACTION 2: HAPUS BANNER (DELETE) ---
export async function hapusBanner(id: number) {
  try {
    if (!id || id <= 0) throw new Error("ID Banner tidak valid");

    const banner = await prisma.bannerHomepage.findUnique({ where: { id } });
    if (!banner) throw new Error("Banner tidak ditemukan!");

    await prisma.bannerHomepage.delete({ where: { id } });

    if (banner.gambarURL && banner.gambarURL.startsWith("/uploads")) {
      try {
        const filePath = path.join(process.cwd(), "public", banner.gambarURL);
        await unlink(filePath);
      } catch (error) {
        console.error("Gagal menghapus file gambar fisik:", error);
      }
    }

    revalidatePath("/admin/halaman");
    revalidatePath("/home");
    revalidatePath("/tentang-kami");
    revalidatePath("/");

    return { success: true, message: "Banner berhasil dihapus!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
