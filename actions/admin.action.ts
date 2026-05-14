"use server";

import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// ─── Zod Schemas ──────────────────────────────────────────────────────────────

const TambahAdminSchema = z.object({
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(50)
    .regex(/^[a-z0-9_]+$/, "Username hanya huruf kecil, angka, dan underscore"),
  namaLengkap: z.string().min(3, "Nama minimal 3 karakter").max(100),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: z.enum(["admin", "super"], {
    message: "Role harus 'admin' atau 'super'",
  }),
});

const EditAdminSchema = z.object({
  id: z.number().int().positive(),
  namaLengkap: z.string().min(3, "Nama minimal 3 karakter").max(100),
  role: z.enum(["admin", "super"]),
  password: z.string().min(6).optional().or(z.literal("")),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type AdminListItem = {
  id: number;
  username: string;
  namaLengkap: string;
  role: string;
  createdAt: Date;
};

// ─── READ ─────────────────────────────────────────────────────────────────────

/**
 * Ambil semua data admin dari database (tanpa passwordHash — aman).
 */
export async function getAllAdmins(): Promise<AdminListItem[]> {
  return prisma.admin.findMany({
    select: {
      id: true,
      username: true,
      namaLengkap: true,
      role: true,
      createdAt: true,
    },
    orderBy: [{ role: "desc" }, { createdAt: "asc" }],
  });
}

// ─── CREATE ───────────────────────────────────────────────────────────────────

/**
 * Tambah admin baru.
 * Hanya boleh dipanggil oleh Super Admin (validasi role di layout).
 */
export async function tambahAdmin(formData: FormData) {
  try {
    const raw = {
      username: formData.get("username"),
      namaLengkap: formData.get("namaLengkap"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    const valid = TambahAdminSchema.safeParse(raw);
    if (!valid.success) {
      return { success: false, message: valid.error.issues[0].message };
    }

    const { username, namaLengkap, password, role } = valid.data;

    const existing = await prisma.admin.findUnique({ where: { username } });
    if (existing) {
      return { success: false, message: `Username "${username}" sudah dipakai` };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.admin.create({
      data: { username, namaLengkap, passwordHash, role },
    });

    revalidatePath("/admin/settings/manajemen-admin");
    return { success: true, message: "Admin berhasil ditambahkan" };
  } catch (error: any) {
    return { success: false, message: error.message ?? "Terjadi kesalahan" };
  }
}

// ─── UPDATE ───────────────────────────────────────────────────────────────────

/**
 * Edit data admin (nama, role, atau reset password).
 * Password bersifat opsional — kosongkan jika tidak ingin diubah.
 */
export async function editAdmin(formData: FormData) {
  try {
    const raw = {
      id: Number(formData.get("id")),
      namaLengkap: formData.get("namaLengkap"),
      role: formData.get("role"),
      password: formData.get("password") ?? "",
    };

    const valid = EditAdminSchema.safeParse(raw);
    if (!valid.success) {
      return { success: false, message: valid.error.issues[0].message };
    }

    const { id, namaLengkap, role, password } = valid.data;

    const updateData: any = { namaLengkap, role };
    if (password && password.length >= 6) {
      updateData.passwordHash = await bcrypt.hash(password, 12);
    }

    await prisma.admin.update({ where: { id }, data: updateData });

    revalidatePath("/admin/settings/manajemen-admin");
    return { success: true, message: "Data admin berhasil diperbarui" };
  } catch (error: any) {
    return { success: false, message: error.message ?? "Terjadi kesalahan" };
  }
}

// ─── DELETE ───────────────────────────────────────────────────────────────────

/**
 * Hapus admin berdasarkan ID.
 * Safety: tidak bisa hapus diri sendiri (validasi di client + server).
 */
export async function hapusAdmin(id: number) {
  try {
    if (!id || id <= 0) {
      return { success: false, message: "ID admin tidak valid" };
    }

    // Safety: jangan hapus jika hanya ada 1 super admin
    const superAdmins = await prisma.admin.count({ where: { role: "super" } });
    const target = await prisma.admin.findUnique({ where: { id } });

    if (!target) {
      return { success: false, message: "Admin tidak ditemukan" };
    }

    if (target.role === "super" && superAdmins <= 1) {
      return {
        success: false,
        message: "Tidak bisa hapus: minimal 1 Super Admin harus ada",
      };
    }

    await prisma.admin.delete({ where: { id } });

    revalidatePath("/admin/settings/manajemen-admin");
    return { success: true, message: "Admin berhasil dihapus" };
  } catch (error: any) {
    return { success: false, message: error.message ?? "Terjadi kesalahan" };
  }
}
