import AdminBannerManager from '@/components/admin/AdminBannerManager';
import prisma from '@/lib/db';
import { ReactNode } from 'react';

export const dynamic = 'force-dynamic';

export default async function TentangKamiLayout({ children }: { children: ReactNode }) {
  // Fetch banner data for the "tentang-kami" page
  const banners = await prisma.bannerHomepage.findMany({
    where: { halaman: 'tentang-kami' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Kelola Halaman Tentang Kami</h1>
        <p className="text-slate-500">Atur konten untuk halaman tentang kami kelurahan.</p>
      </div>
      {/* Banner manager specific to this page */}
      <section>
        <h2 className="text-lg font-bold text-slate-700 mb-4 border-l-4 border-blue-600 pl-3">
          A. Hero Banner Tentang Kami
        </h2>
        <AdminBannerManager initialData={banners} fixedPage="tentang-kami" />
      </section>
      {/* Render the child page (default or sub‑pages) */}
      {children}
    </div>
  );
}
