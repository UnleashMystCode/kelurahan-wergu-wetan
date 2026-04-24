import prisma from "@/lib/db";
import { BannerDTO } from "../schemas/banner.schema";

/**
 * [REPOSITORY LAYER / DATA ACCESS] - Domain Banner
 * Mengatur interaksi I/O mentah (Create, Read, Update, Delete) ke sistem tabel DB 'BannerHomepage'
 * Mengikuti prinsip SRP (Single Responsibility Principle) pada SOLID.
 */
export class BannerRepository {
  async cariBanner(id: number) {
    return await prisma.bannerHomepage.findUnique({ where: { id } });
  }

  async buatBanner(data: BannerDTO, gambarURL: string) {
    return await prisma.bannerHomepage.create({
      data: {
        halaman: data.halaman,
        tagline: data.tagline,
        judul: data.judul,
        deskripsi: data.deskripsi,
        gambarURL,
      },
    });
  }

  // `gambarURL` dibuat Opsional (?), jika kosong, artinya admin tidak mengunggah gambar baru ketika Update Banner
  async updateBanner(id: number, data: BannerDTO, gambarURL?: string) {
    const updateData: any = {
      halaman: data.halaman,
      tagline: data.tagline,
      judul: data.judul,
      deskripsi: data.deskripsi,
    };
    // Masukkan Update Gambar baru, jika hanya admin memberikan file gambar baru
    if (gambarURL) updateData.gambarURL = gambarURL;

    return await prisma.bannerHomepage.update({
      where: { id },
      data: updateData,
    });
  }

  async hapusBanner(id: number) {
    return await prisma.bannerHomepage.delete({ where: { id } });
  }
}
