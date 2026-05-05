/**
 * SEED SCRIPT — Wergu Wetan App
 * Mengisi data placeholder default ke database agar halaman tidak kosong.
 * Jalankan dengan: npx tsx prisma/seed.ts
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Mulai seeding database...");

  // ===== 0. SEED ADMIN AKUN =====
  const hashedPasswordAdmin = await bcrypt.hash("admin", 10);
  await prisma.admin.upsert({
    where: { username: "admin" },
    update: {
      passwordHash: hashedPasswordAdmin,
      role: "admin",
      namaLengkap: "Petugas Biasa"
    },
    create: {
      username: "admin",
      passwordHash: hashedPasswordAdmin,
      namaLengkap: "Petugas Biasa",
      role: "admin",
    },
  });
  console.log("✅ Akun Petugas Biasa (admin) berhasil disiapkan.");

  const hashedPasswordSuper = await bcrypt.hash("superadmin", 10);
  await prisma.admin.upsert({
    where: { username: "superadmin" },
    update: {
      passwordHash: hashedPasswordSuper,
      role: "super",
      namaLengkap: "Super Administrator"
    },
    create: {
      username: "superadmin",
      passwordHash: hashedPasswordSuper,
      namaLengkap: "Super Administrator",
      role: "super",
    },
  });
  console.log("✅ Akun Super Admin (superadmin) berhasil disiapkan.");

  // ===== 1. BANNER HOMEPAGE =====
  const bannerCount = await prisma.bannerHomepage.count();
  if (bannerCount === 0) {
    await prisma.bannerHomepage.createMany({
      data: [
        {
          halaman: "home",
          tagline: "Melayani dengan Sepenuh Hati",
          judul: "Selamat Datang di Kelurahan Wergu Wetan",
          deskripsi:
            "Portal resmi pelayanan administrasi Kelurahan Wergu Wetan, Kota Kudus, Jawa Tengah.",
          gambarURL: "/images/hero_office.png",
        },
        {
          halaman: "home",
          tagline: "Layanan Digital Terpadu",
          judul: "Pengajuan Surat Online Kini Lebih Mudah",
          deskripsi:
            "Ajukan berbagai layanan surat administrasi tanpa harus antri, kapan saja dan di mana saja.",
          gambarURL: "/images/hero_digital.png",
        },
        {
          halaman: "profil",
          tagline: "Tentang Kami",
          judul: "Profil Kelurahan Wergu Wetan",
          deskripsi:
            "Mengenal lebih dekat Kelurahan Wergu Wetan — sejarah, visi misi, dan perangkat desa.",
          gambarURL: "/images/hero_community.png",
        },
        {
          halaman: "kontak",
          tagline: "Kami Siap Membantu Anda",
          judul: "Kontak & Aspirasi Warga",
          deskripsi: "Hubungi kami atau sampaikan aspirasi dan saran Anda secara langsung.",
          gambarURL: "/images/hero_neighborhood.png",
        },
      ],
    });
    console.log("✅ Banner homepage selesai");
  } else {
    console.log("⏩ Banner sudah ada, skip.");
  }

  // ===== 2. STATISTIK =====
  const statCount = await prisma.homeStatistic.count();
  if (statCount === 0) {
    await prisma.homeStatistic.createMany({
      data: [
        { label: "Total Penduduk", value: "12.450+", icon: "users" },
        { label: "Kepala Keluarga", value: "3.210", icon: "home" },
        { label: "Layanan Terselesaikan", value: "98%", icon: "check" },
        { label: "RT Aktif", value: "28 RT", icon: "map" },
        { label: "Jumlah RW", value: "4 RW", icon: "building" },
        { label: "Luas Wilayah", value: "45 Ha", icon: "land" },
      ],
    });
    console.log("✅ Statistik selesai");
  } else {
    console.log("⏩ Statistik sudah ada, skip.");
  }

  // ===== 3. SAMBUTAN LURAH =====
  const welcomeCount = await prisma.homeWelcome.count();
  if (welcomeCount === 0) {
    await prisma.homeWelcome.create({
      data: {
        namaLurah: "H. Ahmad Fauzi, S.Sos., M.Si.",
        fotoURL: null,
        konten: `Assalamu'alaikum Wr. Wb.

Dengan memanjatkan puji syukur kehadirat Allah SWT, karena atas berkat dan rahmat-Nya kami dapat menghadirkan website resmi Kelurahan Wergu Wetan, Kota Kudus, Jawa Tengah.

Website ini dibangun sebagai wujud komitmen kami dalam mewujudkan transparansi, keterbukaan informasi publik, serta kemudahan akses layanan administrasi bagi seluruh warga Kelurahan Wergu Wetan.

Melalui portal ini, warga dapat mengakses berbagai layanan administrasi, informasi pemerintahan, kabar terkini, serta menyampaikan aspirasi secara langsung kepada kami.

Kami berharap kehadiran portal ini dapat memberikan manfaat yang sebesar-besarnya bagi seluruh warga. Semoga Allah SWT senantiasa memberikan ridho dan kemudahan dalam setiap langkah pelayanan kami kepada masyarakat.

Wassalamu'alaikum Wr. Wb.`,
      },
    });
    console.log("✅ Sambutan Lurah selesai");
  } else {
    console.log("⏩ Sambutan sudah ada, skip.");
  }

  // ===== 4. PERANGKAT DESA =====
  const perangkatCount = await prisma.perangkatDesa.count();
  if (perangkatCount === 0) {
    await prisma.perangkatDesa.createMany({
      data: [
        // LEVEL 1 — PIMPINAN
        {
          nama: "H. Ahmad Fauzi, S.Sos., M.Si.",
          jabatan: "Lurah",
          nip: "197001012000121001",
          urutan: 1,
        },
        // LEVEL 2 — SEKRETARIAT
        {
          nama: "Dra. Sri Wahyuni",
          jabatan: "Sekretaris Lurah",
          nip: "197505152003122003",
          urutan: 2,
        },
        // LEVEL 3 — SEKSI / KASI (maks 4 sesuai pedoman nasional)
        {
          nama: "Budi Santoso, S.E.",
          jabatan: "Kasi Pemerintahan",
          nip: "198003202006041002",
          urutan: 3,
        },
        {
          nama: "Rina Kusumawati, S.Sos.",
          jabatan: "Kasi Pemberdayaan Masyarakat",
          nip: "198208122008012005",
          urutan: 4,
        },
        {
          nama: "Agus Triyono",
          jabatan: "Kasi Kesejahteraan Sosial",
          nip: "197911282010011003",
          urutan: 5,
        },
        {
          nama: "Listya Andini, S.H.",
          jabatan: "Kasi Ekonomi & Pembangunan",
          nip: "198604132012012007",
          urutan: 6,
        },
        // LEVEL 4 — STAF ADMINISTRASI & FUNGSIONAL
        { nama: "Dewi Rahmawati, S.Kom.", jabatan: "Staf Administrasi Umum", nip: null, urutan: 7 },
        { nama: "Rendi Pratama, A.Md.", jabatan: "Staf Keuangan & Aset", nip: null, urutan: 8 },
        { nama: "Siti Nurkhasanah", jabatan: "Staf Pelayanan Publik", nip: null, urutan: 9 },
        {
          nama: "Wahyu Santoso, S.Kom.",
          jabatan: "Operator SIAK / Komputer",
          nip: null,
          urutan: 10,
        },
        { nama: "Achmad Rifai", jabatan: "Staf Keamanan & Ketertiban", nip: null, urutan: 11 },
        {
          nama: "Nurul Hidayah, S.E.",
          jabatan: "Staf Pemberdayaan & Kesejahteraan",
          nip: null,
          urutan: 12,
        },
      ],
    });
    console.log("✅ Perangkat Desa selesai");
  } else {
    console.log("⏩ Perangkat Desa sudah ada, skip.");
  }

  // ===== 5. KONTEN PROFIL (Visi Misi dll) =====
  const profilKontenCount = await prisma.profilKonten.count();
  if (profilKontenCount === 0) {
    await prisma.profilKonten.createMany({
      data: [
        {
          kategori: "visi_misi",
          judul: "Visi & Misi Kelurahan Wergu Wetan",
          isi: `<h3>Visi</h3>
<p>"Terwujudnya Kelurahan Wergu Wetan yang Maju, Sejahtera, dan Berkarakter melalui Pelayanan Prima dan Pemberdayaan Masyarakat."</p>

<h3>Misi</h3>
<ul>
  <li>Meningkatkan kualitas pelayanan administrasi yang cepat, tepat, dan transparan.</li>
  <li>Memberdayakan potensi ekonomi lokal dan UMKM warga kelurahan.</li>
  <li>Memperkuat kerukunan sosial dan partisipasi aktif masyarakat dalam pembangunan.</li>
  <li>Meningkatkan infrastruktur dan fasilitas umum yang merata dan berkualitas.</li>
  <li>Mewujudkan tata kelola pemerintahan yang bersih, akuntabel, dan berorientasi pelayanan.</li>
</ul>`,
          updatedAt: new Date(),
        },
        {
          kategori: "tugas_fungsi",
          judul: "Tugas & Fungsi Kelurahan",
          isi: `<p>Berdasarkan Peraturan Pemerintah Nomor 73 Tahun 2005 tentang Kelurahan, Kelurahan Wergu Wetan mempunyai tugas pokok dan fungsi sebagai berikut:</p>

<h3>Tugas Pokok</h3>
<p>Lurah mempunyai tugas menyelenggarakan urusan pemerintahan, pembangunan, dan kemasyarakatan serta melaksanakan urusan pemerintahan yang dilimpahkan oleh Walikota.</p>

<h3>Fungsi</h3>
<ul>
  <li>Pelaksanaan kegiatan pemerintahan kelurahan.</li>
  <li>Pemberdayaan masyarakat kelurahan.</li>
  <li>Pelayanan masyarakat berkaitan dengan administrasi kependudukan.</li>
  <li>Penyelenggaraan ketentraman dan ketertiban umum.</li>
  <li>Pemeliharaan prasarana dan fasilitas pelayanan umum.</li>
  <li>Pembinaan lembaga kemasyarakatan di tingkat kelurahan.</li>
</ul>`,
          updatedAt: new Date(),
        },
        {
          kategori: "sejarah",
          judul: "Sejarah Singkat Kelurahan Wergu Wetan",
          isi: `<p>Kelurahan Wergu Wetan merupakan salah satu kelurahan yang berada di wilayah Kecamatan Kota, Kota Kudus, Provinsi Jawa Tengah. Kelurahan ini menempati posisi strategis di pusat kota yang menjadikannya sebagai salah satu pusat aktivitas administratif dan sosial masyarakat Kudus.</p>

<p>Secara historis, wilayah Wergu Wetan telah menjadi bagian dari perkembangan Kota Kudus sejak era kolonial. Nama "Wergu Wetan" sendiri berasal dari bahasa Jawa yang berarti kawasan di sisi timur ("wetan") yang kemudian berkembang menjadi permukiman padat dan terorganisir.</p>

<p>Seiring berjalannya waktu, Kelurahan Wergu Wetan terus berkembang dan bertransformasi mengikuti dinamika pembangunan Kota Kudus. Kini, kelurahan ini telah menjadi area pemukiman yang tertata dengan infrastruktur yang terus ditingkatkan demi kesejahteraan warganya.</p>`,
          updatedAt: new Date(),
        },
      ],
    });
    console.log("✅ Konten Profil selesai");
  } else {
    console.log("⏩ Konten Profil sudah ada, skip.");
  }

  // ===== 6. SITE CONFIG (Kontak) =====
  const configCount = await prisma.siteConfig.count();
  if (configCount === 0) {
    await prisma.siteConfig.createMany({
      data: [
        { key: "phone", value: "(0291) 430xxx / 0812-3456-7890", updatedAt: new Date() },
        { key: "email", value: "pemdes.werguwetan@kudus.go.id", updatedAt: new Date() },
        {
          key: "alamat",
          value: "Jl. Jendral Sudirman No. 12, Wergu Wetan, Kec. Kota, Kudus, Jawa Tengah 59316",
          updatedAt: new Date(),
        },
      ],
    });
    console.log("✅ Site Config selesai");
  } else {
    console.log("⏩ Site Config sudah ada, skip.");
  }

  // ===== 7. BERITA CONTOH =====
  console.log("Menambahkan Berita Dummy...");
  await prisma.kegiatan.createMany({
    data: [
      {
        judul: "Peluncuran Portal Layanan Digital Kelurahan Wergu Wetan",
        slug: "peluncuran-portal-layanan-digital-" + Date.now(),
        isi: "Kelurahan Wergu Wetan resmi meluncurkan portal layanan digital yang memungkinkan warga mengajukan keperluan administrasi secara online. Portal ini diharapkan dapat memangkas waktu tunggu dan meningkatkan kualitas pelayanan kepada masyarakat.",
        gambar: "/images/hero_office.png",
        kategori: "Pengumuman",
        penulis: "Admin Kelurahan",
        status: "Aktif",
      },
      {
        judul: "Kegiatan Gotong Royong Bersih Lingkungan RT 03 RW 02",
        slug: "gotong-royong-bersih-lingkungan-" + (Date.now() + 1),
        isi: "Warga RT 03 RW 02 Kelurahan Wergu Wetan mengadakan kegiatan gotong royong membersihkan lingkungan sekitar. Kegiatan ini diikuti oleh lebih dari 50 warga dan mendapat apresiasi dari pihak kelurahan.",
        gambar: "/images/hero_community.png",
        kategori: "Kegiatan",
        penulis: "Admin Kelurahan",
        status: "Aktif",
      },
      {
        judul: "Sosialisasi Program Bansos Tahun 2026 untuk Warga Kurang Mampu",
        slug: "sosialisasi-program-bansos-2026-" + (Date.now() + 2),
        isi: "Kelurahan Wergu Wetan mengadakan sosialisasi program bantuan sosial tahun 2026. Warga yang memenuhi syarat dapat mendaftarkan diri melalui RT/RW setempat paling lambat akhir bulan ini.",
        gambar: "/images/hero_digital.png",
        kategori: "Pengumuman",
        penulis: "Admin Kelurahan",
        status: "Aktif",
      },
    ],
  });
  console.log("✅ Berita contoh selesai");

  // ===== 8. POTENSI DESA CONTOH =====
  console.log("Menambahkan Potensi Dummy...");
  await prisma.potensiDesa.createMany({
    data: [
      {
        judul: "Pasar Tradisional Wergu",
        slug: "pasar-tradisional-wergu",
        deskripsiSingkat: "Pusat perniagaan warga lokal dengan beragam bahan kebutuhan pokok, sayuran segar, dan komoditas harian.",
        isi: "Pasar Tradisional Wergu merupakan jantung ekonomi warga kelurahan. Terletak strategis di jalan utama, pasar ini beroperasi sejak fajar menyingsing, menyediakan bahan pangan segar langsung dari petani sekitar. Pasar ini tidak hanya menjadi tempat jual beli, tetapi juga ruang interaksi sosial warga sehari-hari.",
        gambar: "/images/hero_office.png",
        kategori: "Ekonomi & UMKM",
        penulis: "Admin Kelurahan",
        status: "Aktif",
      },
      {
        judul: "Karang Taruna Tunas Muda",
        slug: "karang-taruna-tunas-muda",
        deskripsiSingkat: "Wadah pengembangan generasi muda yang aktif dalam kegiatan sosial, olahraga, dan kreativitas lingkungan.",
        isi: "Karang Taruna Tunas Muda adalah organisasi kepemudaan unggulan di Kelurahan Wergu Wetan. Mereka secara rutin menyelenggarakan kegiatan yang bermanfaat, seperti kerja bakti, turnamen olahraga antar RT, dan pelatihan kewirausahaan untuk pemuda. Organisasi ini telah mencetak banyak inovator muda yang berkontribusi bagi desa.",
        gambar: "/images/hero_community.png",
        kategori: "Sosial & Organisasi",
        penulis: "Admin Kelurahan",
        status: "Aktif",
      },
      {
        judul: "Taman Balai Jagong",
        slug: "taman-balai-jagong",
        deskripsiSingkat: "Ruang terbuka hijau terbesar di Kudus yang menjadi pusat interaksi warga, olahraga, dan rekreasi keluarga.",
        isi: "Taman Balai Jagong bukan sekadar ikon Kelurahan Wergu Wetan, melainkan kebanggaan seluruh warga Kudus. Dengan area yang luas, jogging track yang nyaman, serta sentra kuliner yang tertata rapi, tempat ini selalu dipadati pengunjung pada akhir pekan. Taman ini menjadi bukti nyata komitmen pemerintah dalam menyediakan ruang publik yang sehat dan ramah keluarga.",
        gambar: "/images/hero_neighborhood.png",
        kategori: "Ikonik & Fasilitas",
        penulis: "Admin Kelurahan",
        status: "Aktif",
      },
      {
        judul: "Masjid Baitul Muttaqin",
        slug: "masjid-baitul-muttaqin",
        deskripsiSingkat: "Pusat kegiatan ibadah utama bagi warga muslim, rutin mengadakan kajian, TPQ, dan kegiatan amaliyah lainnya.",
        isi: "Sebagai pusat keagamaan warga, Masjid Baitul Muttaqin berdiri megah dan selalu makmur oleh aktivitas peribadatan jamaah. Selain menjadi tempat shalat lima waktu, masjid ini juga memiliki program Taman Pendidikan Al-Qur'an (TPQ) yang aktif mendidik anak-anak desa. Setiap bulan, diselenggarakan kajian keislaman yang mempererat ukhuwah islamiyah antar warga.",
        gambar: "/images/hero_digital.png",
        kategori: "Keagamaan",
        penulis: "Admin Kelurahan",
        status: "Aktif",
      },
    ],
  });
  console.log("✅ Potensi Desa contoh selesai");

  console.log("\n🎉 Seeding selesai!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
