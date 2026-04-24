import { KegiatanSchema } from "../schemas/kegiatan.schema";
import { KegiatanRepository } from "../repositories/kegiatan.repository";

/**
 * [SERVICE LAYER / USE CASE] - Domain Kegiatan/Berita
 * Menangani aturan bisnis. Di file ini, kita melihat contoh nyata
 * di mana proses pembuatan 'Slug URL' terjadi di layer Service (Bussiness Rule),
 * bukan di Controller, apalagi di Database.
 */
export class KegiatanService {
  private repository = new KegiatanRepository();

  async prosesTambahKegiatan(rawFormData: FormData) {
    // 1. Ekstraksi input (Data Transfer Object mentah)
    const rawData = {
      judul: rawFormData.get("judul"),
      isi: rawFormData.get("isi"),
      gambar: rawFormData.get("gambar"),
    };

    // 2. [ZOD SCHEMA] Menjalankan validasi keamanan untuk mencegah input jahat / kurang
    const validData = KegiatanSchema.safeParse(rawData);
    if (!validData.success) {
      throw new Error(`Data kegiatan tidak valid: ${validData.error.issues[0].message}`);
    }

    // 3. [BUSINESS RULE / LOGIKA BISNIS]
    // Sistem dituntut untuk mengenerate otomatis SLUG (URL ramah SEO) berdasarkan Judul.
    // Contoh: Judul "Kerja Bakti" -> Slug "kerja-bakti-17009282"
    const judulBersih = validData.data.judul.trim();
    const slug = judulBersih.toLowerCase().replace(/ /g, "-") + "-" + Date.now();

    // 4. [DATABASE EKSEKUSI] Menyerahkan data terverifikasi ke asisten Database (Repository)
    return await this.repository.simpanKegiatan(validData.data, slug);
  }

  async prosesHapusKegiatan(id: number) {
    // [BUSINESS RULE] Cegah eksekusi jika ID tidak masuk akal (Hack attempt)
    if (!id || id <= 0) {
      throw new Error("ID Kegiatan tidak valid");
    }

    // Teruskan perintah Delete ke Repository
    return await this.repository.hapusKegiatan(id);
  }

  // === FITUR BARU: UBAH / EDIT KEGIATAN ===
  async prosesUbahKegiatan(id: number, rawFormData: FormData) {
    if (!id || id <= 0) throw new Error("ID Kegiatan tidak valid");

    const judul = rawFormData.get("judul") as string;
    const isi = rawFormData.get("isi") as string;
    const gambar = rawFormData.get("gambar") as string | null;
    const kategori = rawFormData.get("kategori") as string;
    const penulis = rawFormData.get("penulis") as string;
    const status = rawFormData.get("status") as string;

    return await this.repository.ubahKegiatan(id, {
      judul,
      isi,
      gambar: gambar || undefined,
      kategori,
      penulis,
      status,
    });
  }
}
