"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

// ===== SITE CONFIG (Info Kontak Admin) =====

export async function simpanSiteConfig(formData: FormData) {
  const configs = [
    { key: "phone", value: formData.get("phone") as string },
    { key: "email", value: formData.get("email") as string },
    { key: "alamat", value: formData.get("alamat") as string },
  ];

  await Promise.all(
    configs.map((c) =>
      prisma.siteConfig.upsert({
        where: { key: c.key },
        update: { value: c.value, updatedAt: new Date() },
        create: { key: c.key, value: c.value, updatedAt: new Date() },
      })
    )
  );
  revalidatePath("/admin/halaman/kontak");
  revalidatePath("/kontak");
}

// ===== PESAN MASUK (Aspirasi Warga) =====

export async function kirimPesan(formData: FormData) {
  const nama = formData.get("nama") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const pesan = formData.get("pesan") as string;

  if (!nama || !pesan) throw new Error("Nama dan pesan wajib diisi.");

  await prisma.pesanMasuk.create({ data: { nama, whatsapp, pesan } });
}

export async function ubahStatusPesan(id: number, status: string) {
  await prisma.pesanMasuk.update({ where: { id }, data: { status } });
  revalidatePath("/admin/halaman/kontak");
}

export async function hapusPesan(id: number) {
  await prisma.pesanMasuk.delete({ where: { id } });
  revalidatePath("/admin/halaman/kontak");
}
