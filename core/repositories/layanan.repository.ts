import prisma from "@/lib/db";
import { PengajuanSuratDTO } from "../schemas/layanan.schema";

/**
 * [REPOSITORY LAYER / DATA ACCESS]
 * Lapisan ini adalah satu-satunya komponen yang diizinkan untuk 'berbicara' langsung dengan Database.
 * Tugas Pokok:
 * 1. Melakukan transaksi CRUD (Create, Read, Update, Delete) menggunakan Prisma ORM.
 * 2. Mengisolasi pemanggilan database agar tidak tercecer di seluruh file project.
 */
export class LayananRepository {
  // Fungsi ini menerima data yang PASTI SUDAH VALID (karena sudah disaring oleh Service & Zod)
  async simpanPengajuan(data: PengajuanSuratDTO) {
    // Interaksi dengan Prisma ORM untuk meng-insert data ke tabel MySQL
    return await prisma.pengajuansurat.create({
      data: {
        nama: data.nama,
        nik: data.nik,
        jenisSurat: data.jenisSurat,
        whatsapp: data.whatsapp,
        // Status Inisial Pengajuan (Business Rule)
        status: "Pending",
      },
    });
  }
}
