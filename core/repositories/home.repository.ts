import prisma from "@/lib/db";
import { HomeServiceDTO, HomeWelcomeDTO, HomeStatisticItemDTO } from "../schemas/home.schema";

/**
 * [REPOSITORY LAYER / DATA ACCESS] - Domain Home & Dashboard
 * Semua transaksi Prisma (Database) yang berhubungan dengan halaman Home ada di file ini.
 * Berlaku sebagai jembatan tunggal antara aplikasi kita dengan server MySQL.
 */
export class HomeRepository {
  // === STATISTIK ===
  async hapusSemuaStatistik() {
    // Karena sistem statistik web ini (Excel) bersifat refresh total,
    // kita selalu menghapus data lama sebelum meng-insert data Excel yang baru dirender.
    return await prisma.homeStatistic.deleteMany();
  }

  async simpanBanyakStatistik(data: HomeStatisticItemDTO[]) {
    // [BULK INSERT] Memasukkan puluhan baris data Excel sekaligus ke database tanpa melooping 1-per-1.
    return await prisma.homeStatistic.createMany({ data });
  }

  async simpanStatistikBaru(data: { label: string; value: string }) {
    return await prisma.homeStatistic.create({ data });
  }

  async updateStatistik(id: number, data: { label: string; value: string }) {
    return await prisma.homeStatistic.update({
      where: { id },
      data,
    });
  }

  async hapusStatistik(id: number) {
    return await prisma.homeStatistic.delete({ where: { id } });
  }

  // === LAYANAN (SERVICES ICON GRID) ===
  async cariLayanan(id: number) {
    return await prisma.homeService.findUnique({ where: { id } });
  }

  async simpanLayananBaru(data: HomeServiceDTO, iconURL: string) {
    return await prisma.homeService.create({
      data: { title: data.title, iconURL },
    });
  }

  async updateLayanan(id: number, data: HomeServiceDTO, iconURL?: string) {
    const updateData: any = { title: data.title };
    if (iconURL) updateData.iconURL = iconURL;

    return await prisma.homeService.update({
      where: { id },
      data: updateData,
    });
  }

  async hapusLayanan(id: number) {
    return await prisma.homeService.delete({ where: { id } });
  }

  // === SAMBUTAN LURAH ===
  async cariSambutanPertama() {
    return await prisma.homeWelcome.findFirst();
  }

  async buatSambutanBaru(data: HomeWelcomeDTO, fotoURL: string) {
    return await prisma.homeWelcome.create({
      data: { namaLurah: data.namaLurah, konten: data.konten, fotoURL },
    });
  }

  async updateSambutan(id: number, data: HomeWelcomeDTO, fotoURL: string) {
    return await prisma.homeWelcome.update({
      where: { id },
      data: { namaLurah: data.namaLurah, konten: data.konten, fotoURL },
    });
  }
}
