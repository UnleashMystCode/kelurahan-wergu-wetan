import { BannerSchema } from "../schemas/banner.schema";
import { BannerRepository } from "../repositories/banner.repository";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";

/**
 * [SERVICE LAYER / USE CASE] - Domain Banner
 * File inti yang memuat seluruh Logika Bisnis (Business Rule) Banner.
 * Contoh Business Rule di sini:
 * "Jika ada file gambar baru yang diunggah, simpan ke file sistem fisik (/public/uploads)
 * SEBELUM metadata-nya disimpan di Database."
 */
export class BannerService {
  private repository = new BannerRepository();

  async prosesSimpanBanner(rawFormData: FormData) {
    const rawData = {
      id: rawFormData.get("id"),
      halaman: rawFormData.get("halaman"),
      tagline: rawFormData.get("tagline"),
      judul: rawFormData.get("judul"),
      deskripsi: rawFormData.get("deskripsi"),
    };

    const fileInput = rawFormData.get("gambarFile") as File | null;
    const urlInput = rawFormData.get("gambarUrl") as string | null;

    // 1. [Validasi Keamanan Data] - Mencegah input 'halaman' string bebas (hanya boleh "beranda", dll)
    const validData = BannerSchema.safeParse(rawData);
    if (!validData.success) {
      throw new Error(`Validasi gagal: ${validData.error.issues[0].message}`);
    }

    // 2. [BUSINESS RULE]: Logika I/O (Input/Output) sistem file (Upload Gambar)
    // Logika rumit ini (buffer parse, mkdir, dll) letaknya WAJIB di Service.
    // Haram hukumnya diletakkan di Controller.
    let finalGambarURL = "";
    if (fileInput && fileInput.size > 0) {
      const buffer = Buffer.from(await fileInput.arrayBuffer());
      const filename = Date.now() + "-" + fileInput.name.replaceAll(" ", "_");
      const uploadDir = path.join(process.cwd(), "public/uploads");
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (e) {} // Abaikan error bila folder sudah ada
      await writeFile(path.join(uploadDir, filename), buffer);
      finalGambarURL = `/uploads/${filename}`;
    } else if (urlInput && urlInput.trim() !== "") {
      finalGambarURL = urlInput.trim();
    }

    // 3. [DELEGASI KE REPOSITORY]
    // Jika terdapat ID, maka sistem berasumsi ini operasi UPDATE (Edit), jika tidak ada ID, bermakna CREATE (Buat Baru)
    const id = validData.data.id ? parseInt(validData.data.id) : null;

    if (id) {
      return await this.repository.updateBanner(id, validData.data, finalGambarURL);
    } else {
      // [BUSINESS RULE]: Gagal jika Banner Baru tidak menyertakan foto
      if (!finalGambarURL) throw new Error("Wajib menyertakan Gambar!");
      return await this.repository.buatBanner(validData.data, finalGambarURL);
    }
  }

  async prosesHapusBanner(idStr: number) {
    const id = Number(idStr);
    if (!id || id <= 0) throw new Error("ID Banner tidak valid");

    // [BUSINESS RULE]: Harus mencari data referensi lama terlebih dahulu
    // Tujuannya agar bisa mengetahui nama file fisik (gambar) yang akan didelete dari server (SSD/HDD)
    const banner = await this.repository.cariBanner(id);
    if (!banner) throw new Error("Banner tidak ditemukan!");

    // 1. Eksekusi hapus di Database (lewat repository)
    await this.repository.hapusBanner(id);

    // 2. [BUSINESS RULE]: Hapus file fisik lokal (Menghindari penumpukan sampah gambar di server/Storage Leak)
    if (banner.gambarURL && banner.gambarURL.startsWith("/uploads")) {
      try {
        const filePath = path.join(process.cwd(), "public", banner.gambarURL);
        await unlink(filePath);
      } catch (error) {
        console.error("Gagal menghapus file gambar fisik:", error);
      }
    }

    return true;
  }
}
