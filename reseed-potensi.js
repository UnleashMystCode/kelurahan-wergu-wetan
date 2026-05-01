const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Menghapus data Potensi Desa lama...");
  await prisma.potensiDesa.deleteMany();

  const loremIpsumParagraphs = `
    <p>Di era modern ini, adaptasi terhadap teknologi dan pendekatan komprehensif sangatlah esensial bagi pembangunan tingkat desa maupun kelurahan. Potensi ini telah dikelola secara swadaya oleh masyarakat setempat selama beberapa generasi, menjadikannya tonggak penting dalam identitas Wergu Wetan.</p>
    <br/>
    <p><strong>Dampak Langsung di Lapangan</strong></p>
    <p>Langkah-langkah pelestarian dan pengembangan potensi ini terbukti bukan sekadar wacana. Implementasi program yang didukung oleh aparat desa langsung menyentuh titik krusial pemberdayaan. Evaluasi berkala menunjukkan angka partisipasi dan kepuasan masyarakat terhadap pengelolaan potensi lokal ini sangat tinggi.</p>
    <br/>
    <p>Menurut Bapak Kepala Desa, kunci dari kesuksesan ini adalah gotong royong dan rasa memiliki. "Kita tidak bisa membangun desa jika hanya menggunakan kacamata pemerintah. Potensi yang ada di lapangan harus terus didukung dari bawah," ungkapnya.</p>
  `;

  const longDescription = "Potensi daerah ini telah dikembangkan secara swadaya oleh masyarakat setempat selama beberapa waktu terakhir. Dengan adanya dukungan dari berbagai pihak, sektor ini diharapkan dapat terus berkembang pesat dan memberikan dampak positif yang signifikan bagi peningkatan taraf hidup serta kemandirian ekonomi warga sekitar. Evaluasi berkala juga menunjukkan tren yang sangat menjanjikan.";

  const potensiList = [
    { judul: "Sentra Kerajinan Bambu: Mahakarya turun temurun warga RW 02", slug: "sentra-kerajinan-bambu-ekspor-1", deskripsiSingkat: longDescription, isi: "<p>Kini menjadi primadona ekspor.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/1.jpg", kategori: "Ekonomi & UMKM", status: "Aktif" },
    { judul: "Pusat Oleh-oleh Khas: Jenang Kudus inovasi rasa modern", slug: "pusat-oleh-oleh-jenang-inovasi-2", deskripsiSingkat: longDescription, isi: "<p>Digemari anak muda masa kini.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/2.jpg", kategori: "Ekonomi & UMKM", status: "Aktif" },
    { judul: "Paguyuban Peternak Bebek Petelur: Pemasok telur asin organik", slug: "paguyuban-peternak-bebek-petelur-3", deskripsiSingkat: longDescription, isi: "<p>Permintaan akan telur asin organik terus melonjak.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/3.jpg", kategori: "Ekonomi & UMKM", status: "Aktif" },
    { judul: "Koperasi Penjahit Mandiri: Pembuatan seragam memberdayakan ibu", slug: "koperasi-penjahit-mandiri-4", deskripsiSingkat: longDescription, isi: "<p>Menjadi ladang penghasilan baru bagi ibu rumah tangga.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/4.jpg", kategori: "Ekonomi & UMKM", status: "Aktif" },
    { judul: "Kampung Kuliner Malam: Surga jajanan tradisional", slug: "kampung-kuliner-malam-5", deskripsiSingkat: longDescription, isi: "<p>Berbagai jajanan tradisional hingga kekinian bisa ditemukan di sini.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/5.jpg", kategori: "Ekonomi & UMKM", status: "Aktif" },
    
    { judul: "Karang Taruna Tunas Bhakti: Penggerak utama gerakan literasi digital", slug: "karang-taruna-penggerak-literasi-1", deskripsiSingkat: longDescription, isi: "<p>Inisiatif pemuda ini berhasil menarik minat baca anak desa.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/6.jpg", kategori: "Sosial & Organisasi", status: "Aktif" },
    { judul: "Paguyuban Seni Ketoprak: Menjaga warisan seni pertunjukan klasik", slug: "paguyuban-seni-ketoprak-2", deskripsiSingkat: longDescription, isi: "<p>Regenerasi aktor ketoprak berjalan mulus.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/7.jpg", kategori: "Sosial & Organisasi", status: "Aktif" },
    { judul: "Kelompok Sadar Keamanan (Pokdarkam): Sistem ronda malam berbasis aplikasi", slug: "pokdarkam-sistem-ronda-malam-3", deskripsiSingkat: longDescription, isi: "<p>Tingkat kriminalitas turun drastis.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/8.jpg", kategori: "Sosial & Organisasi", status: "Aktif" },
    { judul: "Komunitas Ibu Peduli Gizi: Dapur umum menekan angka stunting", slug: "komunitas-ibu-peduli-gizi-4", deskripsiSingkat: longDescription, isi: "<p>Gerakan murni dari bawah ini mendapat sorotan positif.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/9.jpg", kategori: "Sosial & Organisasi", status: "Aktif" },
    { judul: "Bina Remaja Anti Narkoba: Pelatihan wirausaha sebagai jalan keluar", slug: "bina-remaja-pelatihan-wirausaha-5", deskripsiSingkat: longDescription, isi: "<p>Berhasil menyelamatkan masa depan anak muda.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/10.jpg", kategori: "Sosial & Organisasi", status: "Aktif" },

    { judul: "Taman Kota Wergu: Oase hijau di tengah hiruk pikuk", slug: "taman-kota-wergu-oase-hijau-1", deskripsiSingkat: longDescription, isi: "<p>Revitalisasi taman ini menjadi pencapaian besar desa.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/11.jpg", kategori: "Ikonik & Fasilitas", status: "Aktif" },
    { judul: "Balai Desa Heritage: Bangunan peninggalan kolonial", slug: "balai-desa-heritage-kolonial-2", deskripsiSingkat: longDescription, isi: "<p>Baru saja ditetapkan sebagai cagar budaya kota.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/12.jpg", kategori: "Ikonik & Fasilitas", status: "Aktif" },
    { judul: "Puskesmas Pembantu (Pustu) Modern: Fasilitas kesehatan lengkap", slug: "pustu-modern-layanan-lengkap-3", deskripsiSingkat: longDescription, isi: "<p>Angka harapan hidup warga meningkat berkat faskes ini.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/13.jpg", kategori: "Ikonik & Fasilitas", status: "Aktif" },
    { judul: "Pusat Olahraga Desa: Membibitkan atlet-atlet daerah masa depan", slug: "pusat-olahraga-desa-bibit-atlet-4", deskripsiSingkat: longDescription, isi: "<p>Sering menjadi tuan rumah kejuaraan antar kelurahan.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/14.jpg", kategori: "Ikonik & Fasilitas", status: "Aktif" },
    { judul: "Perpustakaan Desa Berbasis Inklusi: Ramah bagi kelompok difabel", slug: "perpustakaan-desa-ramah-difabel-5", deskripsiSingkat: longDescription, isi: "<p>Rutin menyelenggarakan kelas bahasa isyarat.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/15.jpg", kategori: "Ikonik & Fasilitas", status: "Aktif" },

    { judul: "Masjid Raya Baiturrahman: Pusat peribadatan agung", slug: "masjid-raya-pusat-peribadatan-1", deskripsiSingkat: longDescription, isi: "<p>Jantung kehidupan komunitas muslim Wergu Wetan.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/16.jpg", kategori: "Keagamaan", status: "Aktif" },
    { judul: "Pondok Pesantren Tahfidz Anak: Mencetak hafidz sejak dini", slug: "pondok-pesantren-tahfidz-anak-2", deskripsiSingkat: longDescription, isi: "<p>Metode hafalan menyenangkan yang sangat efektif.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/17.jpg", kategori: "Keagamaan", status: "Aktif" },
    { judul: "Tradisi Syawalan Warga: Simbol toleransi umat beragama", slug: "tradisi-syawalan-kerukunan-umat-3", deskripsiSingkat: longDescription, isi: "<p>Wergu Wetan adalah miniatur Indonesia yang damai.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/18.jpg", kategori: "Keagamaan", status: "Aktif" },
    { judul: "Gereja Kristen Ekumenis: Komunitas pelayan kasih", slug: "gereja-kristen-bakti-sosial-4", deskripsiSingkat: longDescription, isi: "<p>Pemuda gereja sangat aktif membantu komunitas sekitar.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/19.jpg", kategori: "Keagamaan", status: "Aktif" },
    { judul: "Majelis Taklim Ibu-ibu: Kajian ketahanan keluarga", slug: "majelis-taklim-ketahanan-keluarga-5", deskripsiSingkat: longDescription, isi: "<p>Memperkuat keharmonisan rumah tangga warga desa.</p>" + loremIpsumParagraphs, gambar: "/images/potensi/20.jpg", kategori: "Keagamaan", status: "Aktif" }
  ];

  for (const item of potensiList) {
    await prisma.potensiDesa.create({ data: item });
  }

  console.log("Berhasil menambahkan 20 data potensi desa dengan aset gambar lokal!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
