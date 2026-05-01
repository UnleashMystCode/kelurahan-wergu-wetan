const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning up old Berita (Kegiatan)...");
  await prisma.kegiatan.deleteMany({}); // Hapus semua berita lama

  console.log("Seeding new categorized dummy Berita (Kegiatan) with natural titles...");

  const validCategories = ["Kegiatan", "Pengumuman", "Ekonomi", "Pembangunan"];
  const dummyData = [];
  
  const naturalTitles = [
    "Kelurahan Wergu Wetan Gelar Musyawarah Pembangunan Desa",
    "Warga RT 02 Antusias Ikuti Kerja Bakti Bersihkan Saluran Air",
    "Sosialisasi Program Kesehatan Lansia Berjalan Lancar Pagi Ini",
    "Pelatihan Keterampilan bagi Ibu-ibu PKK Mendapat Sambutan Hangat",
    "Distribusi Bantuan Sosial Tepat Sasaran di Wilayah RW 04",
    "Persiapan Lomba Desa Teladan Tingkat Provinsi Terus Dimatangkan",
    "Karang Taruna Gagas Program Penghijauan Lingkungan Sekitar",
    "Rapat Koordinasi Pengurus RT/RW Evaluasi Kinerja Bulanan",
    "Pelayanan Administrasi Kelurahan Kini Lebih Cepat dan Transparan",
    "Penyuluhan Pencegahan Demam Berdarah Bersama Tim Puskesmas",
    "Bazar UMKM Kelurahan Tarik Ratusan Pengunjung di Akhir Pekan",
    "Pembangunan Fasilitas Olahraga Warga Tahap Pertama Selesai",
    "Pengarahan Khusus dari Lurah Terkait Keamanan Lingkungan",
    "Bantuan Modal Usaha Kecil Dibagikan kepada 50 Pelaku UMKM",
    "Program Imunisasi Balita Serentak Diadakan di Balai Desa",
    "Jalan Utama Kelurahan Akhirnya Diaspal Ulang Tahun Ini",
    "Peringatan Hari Kemerdekaan Berlangsung Meriah dan Aman",
    "Perekrutan Satlinmas Baru Kelurahan Telah Dibuka Hari Ini",
    "Diskusi Terbuka Pemuda Desa Hasilkan Tiga Program Unggulan",
    "Pembagian Masker dan Vitamin Gratis untuk Warga Lanjut Usia"
  ];
  
  for (let i = 1; i <= 40; i++) {
    const randomDaysAgo = Math.floor(Math.random() * 60);
    const date = new Date();
    date.setDate(date.getDate() - randomDaysAgo);
    
    const kategori = validCategories[Math.floor(Math.random() * validCategories.length)];
    const judul = naturalTitles[Math.floor(Math.random() * naturalTitles.length)];

    dummyData.push({
      judul: judul,
      slug: `berita-dummy-${Date.now()}-${i}`,
      isi: "<p>Ini adalah isi dari berita dummy. Kelurahan Wergu Wetan terus berupaya meningkatkan pelayanan kepada masyarakat. Berbagai program dicanangkan untuk kesejahteraan warga.</p><p>Diharapkan partisipasi aktif dari seluruh elemen masyarakat untuk menyukseskan program-program tersebut.</p>",
      kategori: kategori,
      penulis: "Admin Kelurahan",
      status: "Aktif",
      tanggal: date
    });
  }

  await prisma.kegiatan.createMany({
    data: dummyData
  });

  console.log(`Successfully seeded 40 natural dummy news articles spread across categories!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
