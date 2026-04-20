import prisma from "@/lib/db";
import { KegiatanDTO } from "../schemas/kegiatan.schema";

/**
 * [REPOSITORY LAYER / DATA ACCESS] - Domain Kegiatan/Berita
 * Menjembatani Service dengan Database Prisma.
 * Isolasi fungsi ini memungkinkan developer me-mock (memalsukan) koneksi database
 * saat melakukan Unit Testing (karena file-nya terpisah dari Service utama).
 */
export class KegiatanRepository {

    // [CREATE] Method memasukkan baris data (Row) ke tabel 'kegiatan'
    async simpanKegiatan(data: KegiatanDTO, slug: string) {
        return await prisma.kegiatan.create({
            data: {
                judul: data.judul,
                slug: slug,
                isi: data.isi,
                // [DEFAULT VALUE] Berikan placeholder apabila URL gambar kosong
                gambar: data.gambar || "https://via.placeholder.com/800x400",
            },
        });
    }

    // [DELETE] Method penghapusan berdasar Primary Key (id)
    async hapusKegiatan(id: number) {
        return await prisma.kegiatan.delete({
            where: { id },
        });
    }

    // [UPDATE] Method memperbarui data berita/kegiatan
    async ubahKegiatan(id: number, data: { judul: string; isi: string; gambar?: string; kategori: string; penulis: string; status: string; }) {
        return await prisma.kegiatan.update({
            where: { id },
            data: { judul: data.judul, isi: data.isi, gambar: data.gambar, kategori: data.kategori, penulis: data.penulis, status: data.status }
        });
    }
}

