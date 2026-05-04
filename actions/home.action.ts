"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { z } from "zod";
import * as XLSX from "xlsx";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";

// --- SKEMA VALIDASI ---
const HomeServiceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Judul layanan minimal 2 karakter"),
});

const HomeWelcomeSchema = z.object({
  namaLurah: z.string().min(3, "Nama Lurah minimal 3 karakter"),
  konten: z.string().min(20, "Konten sambutan terlalu singkat"),
});

// === 1. UPLOAD STATISTIK EXCEL ===
export async function uploadStatisticsExcel(rawFormData: FormData) {
  try {
    const file = rawFormData.get("excelFile") as File;
    const url = rawFormData.get("excelUrl") as string;
    let workbook;

    if (url && url.trim() !== "") {
      const response = await fetch(url.trim());
      const buffer = Buffer.from(await response.arrayBuffer());
      workbook = XLSX.read(buffer, { type: "buffer", cellDates: true });
    } else if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      workbook = XLSX.read(buffer, { type: "buffer", cellDates: true });
    } else {
      throw new Error("File atau URL Excel wajib diisi (tidak boleh kosong)");
    }

    if (!workbook.SheetNames.length) throw new Error("File Excel rusak (tidak ada sheet).");

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const cleanData = rawData
      .map((item: any) => {
        const labelKey = Object.keys(item).find((k) => k.toLowerCase().trim() === "label");
        const valueKey = Object.keys(item).find((k) => k.toLowerCase().trim() === "value");

        return {
          label: labelKey ? String(item[labelKey] || "").trim() : "",
          value: valueKey ? String(item[valueKey] || "").trim() : "",
        };
      })
      .filter(
        (item) =>
          item.label !== "" &&
          item.label.toLowerCase() !== "undefined" &&
          item.label !== "Tanpa Label"
      );

    await prisma.$transaction([
      prisma.homeStatistic.deleteMany(),
      ...(cleanData.length > 0 ? [prisma.homeStatistic.createMany({ data: cleanData })] : []),
    ]);

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
    const id = formData.get("id") ? parseInt(formData.get("id") as string) : null;
    const data = {
      label: formData.get("label") as string,
      value: formData.get("value") as string,
    };

    if (id) {
      await prisma.homeStatistic.update({ where: { id }, data });
    } else {
      await prisma.homeStatistic.create({ data });
    }

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
    await prisma.homeStatistic.delete({ where: { id } });

    revalidatePath("/home");
    revalidatePath("/tentang-kami");
    revalidatePath("/admin/halaman/tentang-kami/statistik");

    return { success: true, message: "Statistik berhasil dihapus!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// === 2. KELOLA LAYANAN (CRUD / ICON GRID BERANDA) ===
export async function saveService(rawFormData: FormData) {
  try {
    const rawData = {
      id: rawFormData.get("id"),
      title: rawFormData.get("title"),
    };
    const fileInput = rawFormData.get("iconFile") as File | null;
    const urlInput = rawFormData.get("iconUrl") as string | null;

    const validData = HomeServiceSchema.safeParse(rawData);
    if (!validData.success) throw new Error(`Validasi gagal: ${validData.error.issues[0].message}`);

    let finalIconURL = "";
    if (fileInput && fileInput.size > 0) {
      const filename = `svc-${Date.now()}-${fileInput.name.replaceAll(" ", "_")}`;
      const uploadDir = path.join(process.cwd(), "public/uploads/services");
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (e) {}
      await writeFile(path.join(uploadDir, filename), Buffer.from(await fileInput.arrayBuffer()));
      finalIconURL = `/uploads/services/${filename}`;
    } else if (urlInput && urlInput.trim() !== "") {
      finalIconURL = urlInput.trim();
    }

    const id = validData.data.id ? parseInt(validData.data.id) : null;
    if (id) {
      const updateData: any = { title: validData.data.title };
      if (finalIconURL) updateData.iconURL = finalIconURL;
      await prisma.homeService.update({ where: { id }, data: updateData });
    } else {
      if (!finalIconURL) throw new Error("Ikon wajib diisi!");
      await prisma.homeService.create({
        data: {
          title: validData.data.title,
          iconURL: finalIconURL,
        },
      });
    }

    revalidatePath("/home");
    revalidatePath("/admin/halaman/beranda");
    return { success: true, message: "Layanan berhasil disimpan!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteService(id: number) {
  try {
    const service = await prisma.homeService.findUnique({ where: { id } });
    if (!service) throw new Error("Layanan tidak ditemukan");

    await prisma.homeService.delete({ where: { id } });

    if (service.iconURL && service.iconURL.startsWith("/uploads")) {
      try {
        await unlink(path.join(process.cwd(), "public", service.iconURL));
      } catch (e) {}
    }

    revalidatePath("/home");
    revalidatePath("/admin/halaman/beranda");
    return { success: true, message: "Layanan berhasil dihapus!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// === 3. SAMBUTAN LURAH ===
export async function saveWelcome(rawFormData: FormData) {
  try {
    const rawData = {
      namaLurah: rawFormData.get("namaLurah"),
      konten: rawFormData.get("konten"),
    };
    const fileInput = rawFormData.get("fotoFile") as File | null;
    const urlInput = rawFormData.get("fotoUrl") as string | null;

    const validData = HomeWelcomeSchema.safeParse(rawData);
    if (!validData.success) throw new Error(`Validasi gagal: ${validData.error.issues[0].message}`);

    const existing = await prisma.homeWelcome.findFirst();
    let fotoURL = existing?.fotoURL || "";

    if (fileInput && fileInput.size > 0) {
      const filename = `lurah-${Date.now()}.jpg`;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (e) {}
      await writeFile(path.join(uploadDir, filename), Buffer.from(await fileInput.arrayBuffer()));
      fotoURL = `/uploads/${filename}`;
    } else if (urlInput && urlInput.trim() !== "") {
      fotoURL = urlInput.trim();
    }

    if (existing) {
      await prisma.homeWelcome.update({
        where: { id: existing.id },
        data: {
          namaLurah: validData.data.namaLurah,
          konten: validData.data.konten,
          fotoURL: fotoURL,
        },
      });
    } else {
      await prisma.homeWelcome.create({
        data: {
          namaLurah: validData.data.namaLurah,
          konten: validData.data.konten,
          fotoURL: fotoURL,
        },
      });
    }

    revalidatePath("/home");
    revalidatePath("/admin/halaman/beranda");
    return { success: true, message: "Sambutan sukses diperbarui!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
