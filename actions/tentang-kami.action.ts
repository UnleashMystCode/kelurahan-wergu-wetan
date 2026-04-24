"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

// ===== PERANGKAT DESA (Struktur Organisasi) =====

export async function tambahPerangkat(formData: FormData) {
  const nama = formData.get("nama") as string;
  const jabatan = formData.get("jabatan") as string;
  const nip = formData.get("nip") as string | null;
  const foto = formData.get("foto") as string | null;
  const urutan = parseInt(formData.get("urutan") as string) || 100;

  await prisma.perangkatDesa.create({
    data: { nama, jabatan, nip: nip || null, foto: foto || null, urutan },
  });
  revalidatePath("/admin/halaman/tentang-kami/struktur");
  revalidatePath("/tentang-kami");
}

export async function ubahPerangkat(id: number, formData: FormData) {
  const nama = formData.get("nama") as string;
  const jabatan = formData.get("jabatan") as string;
  const nip = formData.get("nip") as string | null;
  const foto = formData.get("foto") as string | null;
  const urutan = parseInt(formData.get("urutan") as string) || 100;

  await prisma.perangkatDesa.update({
    where: { id },
    data: { nama, jabatan, nip: nip || null, foto: foto || null, urutan },
  });
  revalidatePath("/admin/halaman/tentang-kami/struktur");
  revalidatePath("/tentang-kami");
}

export async function hapusPerangkat(id: number) {
  await prisma.perangkatDesa.delete({ where: { id } });
  revalidatePath("/admin/halaman/tentang-kami/struktur");
  revalidatePath("/tentang-kami");
}

// ===== PROFIL KONTEN (Visi Misi, Tugas Fungsi) =====

export async function simpanProfilKonten(formData: FormData) {
  const kategori = formData.get("kategori") as string;
  const judul = formData.get("judul") as string;
  const isi = formData.get("isi") as string;

  await prisma.profilKonten.upsert({
    where: { kategori },
    update: { judul, isi },
    create: { kategori, judul, isi },
  });
  revalidatePath("/admin/halaman/tentang-kami/teks");
  revalidatePath("/tentang-kami");
}
