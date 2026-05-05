import { MetadataRoute } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://wergu-wetan.com';

  // Dapatkan semua berita aktif (dari tabel Kegiatan)
  const berita = await prisma.kegiatan.findMany({
    where: { status: 'Aktif' },
    select: { slug: true, updatedAt: true },
  });

  const beritaUrls = berita.map((b) => ({
    url: `${baseUrl}/berita/${b.slug}`,
    lastModified: b.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Dapatkan semua potensi desa aktif
  const potensiDesa = await prisma.potensiDesa.findMany({
    where: { status: 'Aktif' },
    select: { slug: true, updatedAt: true },
  });

  const potensiDesaUrls = potensiDesa.map((p) => ({
    url: `${baseUrl}/potensi-desa/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/tentang-kami`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/layanan`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/berita`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/potensi-desa`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...beritaUrls,
    ...potensiDesaUrls,
  ];
}
