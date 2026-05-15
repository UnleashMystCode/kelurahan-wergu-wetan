import { MetadataRoute } from 'next';
import { PrismaClient } from '@prisma/client';

// Force dynamic rendering — sitemap tidak boleh di-pre-render di build time
// karena bergantung pada data DB yang tidak tersedia saat CI
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wergu-wetan.com';

  // Static URLs (selalu tersedia, tidak butuh DB)
  const staticUrls: MetadataRoute.Sitemap = [
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
  ];

  // Dynamic URLs dari DB (dengan fallback kosong jika DB tidak tersedia)
  let beritaUrls: MetadataRoute.Sitemap = [];
  let potensiDesaUrls: MetadataRoute.Sitemap = [];

  try {
    const berita = await prisma.kegiatan.findMany({
      where: { status: 'Aktif' },
      select: { slug: true, updatedAt: true },
    });

    beritaUrls = berita.map((b) => ({
      url: `${baseUrl}/berita/${b.slug}`,
      lastModified: b.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const potensiDesa = await prisma.potensiDesa.findMany({
      where: { status: 'Aktif' },
      select: { slug: true, updatedAt: true },
    });

    potensiDesaUrls = potensiDesa.map((p) => ({
      url: `${baseUrl}/potensi-desa/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch {
    // DB tidak tersedia (CI environment) — kembalikan hanya static URLs
    console.warn('[sitemap] Database tidak dapat dijangkau, mengembalikan URL statis saja.');
  }

  return [...staticUrls, ...beritaUrls, ...potensiDesaUrls];
}
