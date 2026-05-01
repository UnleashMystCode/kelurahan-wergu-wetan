"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getPesanMasuk() {
  try {
    return await prisma.pesanMasuk.findMany({
      orderBy: [
        { status: "asc" }, // "Belum Dibaca" comes before "Sudah Dibaca" alphabetically. Wait, "Belum Dibaca" (B) vs "Sudah Dibaca" (S) -> Ascending works!
        { createdAt: "desc" },
      ],
    });
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return [];
  }
}

export async function markAsRead(id: number) {
  try {
    await prisma.pesanMasuk.update({
      where: { id },
      data: { status: "Sudah Dibaca" },
    });
    revalidatePath("/admin/pesan-masuk");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to mark message as read:", error);
    return { success: false, error: "Gagal mengupdate status pesan" };
  }
}

export async function deletePesan(id: number) {
  try {
    await prisma.pesanMasuk.delete({
      where: { id },
    });
    revalidatePath("/admin/pesan-masuk");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete message:", error);
    return { success: false, error: "Gagal menghapus pesan" };
  }
}
