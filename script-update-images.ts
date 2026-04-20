import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🔄 Updating images to local variants...");

  // Banners
  const banners = await prisma.bannerHomepage.findMany();
  for (let i = 0; i < banners.length; i++) {
    const images = ['/images/hero_office.png', '/images/hero_digital.png', '/images/hero_community.png', '/images/hero_neighborhood.png'];
    await prisma.bannerHomepage.update({
      where: { id: banners[i].id },
      data: { gambarURL: images[i % images.length] }
    });
  }

  // Kegiatan
  const kegiatan = await prisma.kegiatan.findMany();
  for (let i = 0; i < kegiatan.length; i++) {
    const images = ['/images/hero_office.png', '/images/hero_community.png', '/images/hero_digital.png', '/images/hero_neighborhood.png'];
    await prisma.kegiatan.update({
      where: { id: kegiatan[i].id },
      data: { gambar: images[i % images.length] }
    });
  }

  console.log("✅ Done updating images!");
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
