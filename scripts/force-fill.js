const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const allNews = await prisma.kegiatan.findMany();
  console.log(`Total kegiatan found: ${allNews.length}`);
  
  let kCount = 0;
  for (const news of allNews) {
    const isDummy = news.slug.includes('dummy') || news.judul.toLowerCase().includes('dummy');
    const isEmptyOrShort = !news.isi || news.isi.trim().length < 100 || !news.isi.includes('<p>');
    
    if (isDummy || isEmptyOrShort) {
      await prisma.kegiatan.update({
        where: { id: news.id },
        data: {
          judul: isDummy ? news.judul.replace(/dummy/i, 'Kegiatan') : news.judul,
          isi: `<h2>Informasi Resmi Kelurahan</h2><p>Pemerintah Kelurahan Wergu Wetan secara rutin mengadakan berbagai program inovatif untuk meningkatkan kesejahteraan masyarakat sekitar. Ini merupakan langkah nyata dalam membangun lingkungan yang lebih modern dan inklusif.</p><h3>Tujuan Pelaksanaan</h3><p>Dalam program ini, kami berfokus pada beberapa hal penting, yaitu:</p><ul><li>Meningkatkan kolaborasi antar warga secara proaktif.</li><li>Membangun fasilitas publik yang lebih ramah dan efisien.</li><li>Memberikan edukasi kepada generasi muda terkait potensi lokal.</li></ul><p>Semua elemen masyarakat dihimbau untuk turut serta menyukseskan program ini. Partisipasi Anda adalah kunci keberhasilan kelurahan kita tercinta.</p>`
        }
      });
      console.log('Force updated kegiatan:', news.judul);
      kCount++;
    }
  }
  
  console.log(`Total kegiatan forcefully updated: ${kCount}`);

  const allPotensi = await prisma.potensiDesa.findMany();
  console.log(`Total potensi found: ${allPotensi.length}`);
  let pCount = 0;
  
  for (const p of allPotensi) {
    const isDummy = p.slug.includes('dummy') || p.judul.toLowerCase().includes('dummy');
    const isEmptyOrShort = !p.isi || p.isi.trim().length < 100 || !p.isi.includes('<p>');

    if (isDummy || isEmptyOrShort) {
      await prisma.potensiDesa.update({
        where: { id: p.id },
        data: {
          judul: isDummy ? p.judul.replace(/dummy/i, 'Potensi') : p.judul,
          isi: `<h2>Kekayaan Potensi Kelurahan</h2><p>Kelurahan Wergu Wetan memiliki aset strategis yang luar biasa dan sangat membanggakan. Kami berkomitmen untuk terus menjaga, melestarikan, dan mengembangkan potensi ini agar bermanfaat bagi perekonomian dan sosial budaya warga.</p><h3>Fokus Pengembangan</h3><p>Potensi ini kami bagi menjadi beberapa fokus utama:</p><ul><li>Menggerakkan roda perekonomian mikro melalui UMKM.</li><li>Memberikan ruang interaksi yang positif bagi masyarakat luas.</li><li>Menjaga kelestarian kearifan lokal.</li></ul><p>Mari kita jaga dan kembangkan bersama potensi yang telah diberikan kepada kelurahan kita demi generasi masa depan yang lebih baik.</p>`
        }
      });
      console.log('Force updated potensi:', p.judul);
      pCount++;
    }
  }
  console.log(`Total potensi forcefully updated: ${pCount}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
