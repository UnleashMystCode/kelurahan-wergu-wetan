const fs = require('fs');
const https = require('https');

const topics = [
  "Bambu", "Jenang_Kudus", "Telur_asin", "Mesin_jahit", "Pasar_malam",
  "Perpustakaan", "Ketoprak_(Jawa)", "Ronda", "Gizi", "Wirausaha",
  "Taman_kota", "Arsitektur_Hindia_Baru", "Puskesmas", "Futsal", "Perpustakaan_Nasional_Republik_Indonesia",
  "Masjid_Agung_Demak", "Santri", "Ketupat", "Gereja_Blenduk", "Batik"
];

async function fetchWikiImage(title) {
  return new Promise((resolve) => {
    const url = `https://id.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json`;
    const options = {
      headers: {
        'User-Agent': 'CoolBot/1.0 (test@example.com)'
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
            resolve(pages[pageId].thumbnail.source);
          } else {
            resolve(null);
          }
        } catch(e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function main() {
  const images = [];
  for (const topic of topics) {
    let img = await fetchWikiImage(topic);
    if (!img) img = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Bambusa_vulgaris_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-019.jpg/565px-Bambusa_vulgaris_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-019.jpg";
    images.push(img);
  }

  const scriptContent = `
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Menghapus data Potensi Desa lama...");
  await prisma.potensiDesa.deleteMany();

  const dummyImages = ${JSON.stringify(images, null, 2)};

  const loremIpsumParagraphs = \`
    <p>Di era modern ini, adaptasi terhadap teknologi dan pendekatan komprehensif sangatlah esensial bagi pembangunan tingkat desa maupun kelurahan. Potensi ini telah dikelola secara swadaya oleh masyarakat setempat selama beberapa generasi, menjadikannya tonggak penting dalam identitas Wergu Wetan.</p>
    <br/>
    <p><strong>Dampak Langsung di Lapangan</strong></p>
    <p>Langkah-langkah pelestarian dan pengembangan potensi ini terbukti bukan sekadar wacana. Implementasi program yang didukung oleh aparat desa langsung menyentuh titik krusial pemberdayaan. Evaluasi berkala menunjukkan angka partisipasi dan kepuasan masyarakat terhadap pengelolaan potensi lokal ini sangat tinggi.</p>
    <br/>
    <p>Menurut Bapak Kepala Desa, kunci dari kesuksesan ini adalah gotong royong dan rasa memiliki. "Kita tidak bisa membangun desa jika hanya menggunakan kacamata pemerintah. Potensi yang ada di lapangan harus terus didukung dari bawah," ungkapnya.</p>
  `;
  const potensiList = [
    { judul: "Sentra Kerajinan Bambu: Mahakarya turun temurun warga RW 02", slug: "sentra-kerajinan-bambu-ekspor-1", deskripsiSingkat: "Kelompok pengrajin anyaman bambu terus berinovasi.", isi: "<p>Kini menjadi primadona ekspor.</p>" + loremIpsumParagraphs, gambar: dummyImages[0], kategori: "Ekonomi & UMKM", status: "Aktif" },
    { judul: "Pusat Oleh-oleh Khas: Jenang Kudus inovasi rasa modern", slug: "pusat-oleh-oleh-jenang-inovasi-2", deskripsiSingkat: "Inovasi varian rasa matcha dan taro.", isi: "<p>Digemari anak muda masa kini.</p>" + loremIpsumParagraphs, gambar: dummyImages[1], kategori: "Ekonomi & UMKM", status: "Aktif" },
    { judul: "Paguyuban Peternak Bebek Petelur: Pemasok telur asin organik", slug: "paguyuban-peternak-bebek-petelur-3", deskripsiSingkat: "Menghasilkan telur organik tanpa bahan kimia.", isi: "<p>Permintaan akan telur asin organik terus melonjak.</p>" + loremIpsumParagraphs, gambar: dummyImages[2], kategori: "Ekonomi & UMKM", status: "Aktif" },
    { judul: "Koperasi Penjahit Mandiri: Pembuatan seragam memberdayakan ibu", slug: "koperasi-penjahit-mandiri-4", deskripsiSingkat: "Menerima tender pembuatan seragam ratusan sekolah dasar.", isi: "<p>Menjadi ladang penghasilan baru bagi ibu rumah tangga.</p>" + loremIpsumParagraphs, gambar: dummyImages[3], kategori: "Ekonomi & UMKM", status: "Aktif" },
    { judul: "Kampung Kuliner Malam: Surga jajanan tradisional", slug: "kampung-kuliner-malam-5", deskripsiSingkat: "Sepanjang jalan desa diubah menjadi kawasan kuliner.", isi: "<p>Berbagai jajanan tradisional hingga kekinian bisa ditemukan di sini.</p>" + loremIpsumParagraphs, gambar: dummyImages[4], kategori: "Ekonomi & UMKM", status: "Aktif" },
    
    { judul: "Karang Taruna Tunas Bhakti: Penggerak utama gerakan literasi digital", slug: "karang-taruna-penggerak-literasi-1", deskripsiSingkat: "Memprakarsai berdirinya perpustakaan digital mini.", isi: "<p>Inisiatif pemuda ini berhasil menarik minat baca anak desa.</p>" + loremIpsumParagraphs, gambar: dummyImages[5], kategori: "Sosial & Organisasi", status: "Aktif" },
    { judul: "Paguyuban Seni Ketoprak: Menjaga warisan seni pertunjukan klasik", slug: "paguyuban-seni-ketoprak-2", deskripsiSingkat: "Rutin menggelar pertunjukan di balai desa setiap bulan purnama.", isi: "<p>Regenerasi aktor ketoprak berjalan mulus.</p>" + loremIpsumParagraphs, gambar: dummyImages[6], kategori: "Sosial & Organisasi", status: "Aktif" },
    { judul: "Kelompok Sadar Keamanan (Pokdarkam): Sistem ronda malam berbasis aplikasi", slug: "pokdarkam-sistem-ronda-malam-3", deskripsiSingkat: "Menciptakan aplikasi pelaporan insiden darurat.", isi: "<p>Tingkat kriminalitas turun drastis.</p>" + loremIpsumParagraphs, gambar: dummyImages[7], kategori: "Sosial & Organisasi", status: "Aktif" },
    { judul: "Komunitas Ibu Peduli Gizi: Dapur umum menekan angka stunting", slug: "komunitas-ibu-peduli-gizi-4", deskripsiSingkat: "Memasak makanan bergizi gratis untuk balita.", isi: "<p>Gerakan murni dari bawah ini mendapat sorotan positif.</p>" + loremIpsumParagraphs, gambar: dummyImages[8], kategori: "Sosial & Organisasi", status: "Aktif" },
    { judul: "Bina Remaja Anti Narkoba: Pelatihan wirausaha sebagai jalan keluar", slug: "bina-remaja-pelatihan-wirausaha-5", deskripsiSingkat: "Fokus memberikan bekal keterampilan desain grafis.", isi: "<p>Berhasil menyelamatkan masa depan anak muda.</p>" + loremIpsumParagraphs, gambar: dummyImages[9], kategori: "Sosial & Organisasi", status: "Aktif" },

    { judul: "Taman Kota Wergu: Oase hijau di tengah hiruk pikuk", slug: "taman-kota-wergu-oase-hijau-1", deskripsiSingkat: "Pusat aktivitas luar ruangan warga pada sore hari.", isi: "<p>Revitalisasi taman ini menjadi pencapaian besar desa.</p>" + loremIpsumParagraphs, gambar: dummyImages[10], kategori: "Ikonik & Fasilitas", status: "Aktif" },
    { judul: "Balai Desa Heritage: Bangunan peninggalan kolonial", slug: "balai-desa-heritage-kolonial-2", deskripsiSingkat: "Perpaduan Eropa dan Jawa, menjadi pusat administrasi.", isi: "<p>Baru saja ditetapkan sebagai cagar budaya kota.</p>" + loremIpsumParagraphs, gambar: dummyImages[11], kategori: "Ikonik & Fasilitas", status: "Aktif" },
    { judul: "Puskesmas Pembantu (Pustu) Modern: Fasilitas kesehatan lengkap", slug: "pustu-modern-layanan-lengkap-3", deskripsiSingkat: "Sangat membantu penanganan medis awal yang cepat.", isi: "<p>Angka harapan hidup warga meningkat berkat faskes ini.</p>" + loremIpsumParagraphs, gambar: dummyImages[12], kategori: "Ikonik & Fasilitas", status: "Aktif" },
    { judul: "Pusat Olahraga Desa: Membibitkan atlet-atlet daerah masa depan", slug: "pusat-olahraga-desa-bibit-atlet-4", deskripsiSingkat: "Fasilitas olahraga standar nasional yang dikelola oleh BUMDes.", isi: "<p>Sering menjadi tuan rumah kejuaraan antar kelurahan.</p>" + loremIpsumParagraphs, gambar: dummyImages[13], kategori: "Ikonik & Fasilitas", status: "Aktif" },
    { judul: "Perpustakaan Desa Berbasis Inklusi: Ramah bagi kelompok difabel", slug: "perpustakaan-desa-ramah-difabel-5", deskripsiSingkat: "Memiliki koleksi buku braille dan akses kursi roda.", isi: "<p>Rutin menyelenggarakan kelas bahasa isyarat.</p>" + loremIpsumParagraphs, gambar: dummyImages[14], kategori: "Ikonik & Fasilitas", status: "Aktif" },

    { judul: "Masjid Raya Baiturrahman: Pusat peribadatan agung", slug: "masjid-raya-pusat-peribadatan-1", deskripsiSingkat: "Arsitektur megah meniru gaya Timur Tengah.", isi: "<p>Jantung kehidupan komunitas muslim Wergu Wetan.</p>" + loremIpsumParagraphs, gambar: dummyImages[15], kategori: "Keagamaan", status: "Aktif" },
    { judul: "Pondok Pesantren Tahfidz Anak: Mencetak hafidz sejak dini", slug: "pondok-pesantren-tahfidz-anak-2", deskripsiSingkat: "Lembaga pendidikan agama gratis bagi warga.", isi: "<p>Metode hafalan menyenangkan yang sangat efektif.</p>" + loremIpsumParagraphs, gambar: dummyImages[16], kategori: "Keagamaan", status: "Aktif" },
    { judul: "Tradisi Syawalan Warga: Simbol toleransi umat beragama", slug: "tradisi-syawalan-kerukunan-umat-3", deskripsiSingkat: "Makan bersama mempererat silaturahmi saat Idul Fitri.", isi: "<p>Wergu Wetan adalah miniatur Indonesia yang damai.</p>" + loremIpsumParagraphs, gambar: dummyImages[17], kategori: "Keagamaan", status: "Aktif" },
    { judul: "Gereja Kristen Ekumenis: Komunitas pelayan kasih", slug: "gereja-kristen-bakti-sosial-4", deskripsiSingkat: "Rutin mengadakan bakti sosial untuk warga lintas golongan.", isi: "<p>Pemuda gereja sangat aktif membantu komunitas sekitar.</p>" + loremIpsumParagraphs, gambar: dummyImages[18], kategori: "Keagamaan", status: "Aktif" },
    { judul: "Majelis Taklim Ibu-ibu: Kajian ketahanan keluarga", slug: "majelis-taklim-ketahanan-keluarga-5", deskripsiSingkat: "Sering mengundang pakar psikologi dalam kajian agamanya.", isi: "<p>Memperkuat keharmonisan rumah tangga warga desa.</p>" + loremIpsumParagraphs, gambar: dummyImages[19], kategori: "Keagamaan", status: "Aktif" }
  ];

  for (const item of potensiList) {
    await prisma.potensiDesa.create({ data: item });
  }

  console.log("Berhasil menambahkan 20 data potensi desa dengan gambar dari Wikipedia!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
  \`;

  fs.writeFileSync('reseed-potensi.js', scriptContent);
  console.log("Script reseed-potensi.js has been generated successfully!");
}

main();
