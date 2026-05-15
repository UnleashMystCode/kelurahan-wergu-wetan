# 📦 Project Manifest — ANF-Agentic Architecture

**Portal Web Terpadu Kelurahan Wergu Wetan**  
**Purpose:** Inventory & cleanup queue for active codebase files, aligned with ANF-Agentic branching.  
**Maintained by:** Engineering Team | **Last Updated:** 14 Mei 2026 (Post-Restructuring Audit v2)

---

## 1️⃣ Filosofi

This manifest follows **ANF-Agentic Architecture** principles:
- `be/*` branches own backend files (Server Actions, Prisma, services)
- `fe/*` branches own frontend files (components, pages, styles)
- `pr/*` branches merge both for integration testing
- `main` holds production-ready, validated manifest

**Rule of thumb:** If a file is not listed here and not in `architecture.md`'s directory structure, it's a candidate for deletion.

---

## 2️⃣ The ANF Docs-Sync Law

> **"Tambahkan sesuatu → tulis di CHANGELOG.md DULU, baru update file yang relevan."**

Ini bukan opsional. Ini adalah **aturan keras (hard rule)** ANF-Agentic Architecture. Alih-alih mengupdate 5 file per perubahan, cukup catat perubahannya di `CHANGELOG.md` secara kronologis lalu update dokumen spesifik yang terpengaruh langsung.

### Kapan Docs Harus Diupdate?

| Jenis Perubahan | Dokumen yang Wajib Diupdate |
|-----------------|----------------------------|
| **SEMUA PERUBAHAN** | `CHANGELOG.md` (Catat versi dan deskripsi) |
| File baru dibuat (`*.action.ts`, `*.tsx`, dll.) | `project-manifest.md` → Active Inventory |
| File dihapus atau dipindah | `project-manifest.md` → Cleanup Queue + Completed Cleanup |
| Routing baru ditambah | `architecture.md` → Section 6 (Routing Conventions) |
| Pattern/arsitektur baru dipakai | `architecture.md` → Section relevan + version log |
| Feature selesai (status berubah) | `project-manifest.md` → Feature Coverage Matrix |
| Folder baru dibuat | `architecture.md` → Section 4 (Directory Structure) |
| Rendering mode diubah | `project-manifest.md` → Completed Cleanup |
| Perubahan perlu terlihat di README | `README.md` → bagian yang relevan |

### Pattern Standar — Server Action Baru

Setiap kali membuat `actions/<domain>.action.ts` baru, wajib:

```
1. Buat file: actions/<domain>.action.ts
   - 'use server' di baris pertama
   - Zod schema untuk setiap input
   - Return type: { success: boolean; data?; message? }
   - revalidatePath() setelah mutasi

2. Update project-manifest.md:
   - Tambah ke Active Inventory (BE Workspace)
   - Tambah ke Feature Coverage Matrix

3. Update architecture.md:
   - Tambah ke Action Files inventory table (Section 9)
   - Update version log (Section 12)
```

### Pattern Standar — Halaman Dinamis Baru

Setiap `page.tsx` yang fetch data dari DB **WAJIB** punya:

```typescript
export const dynamic = "force-dynamic"; // ← WAJIB, baris pertama setelah imports
```

> **Agent Instruction (Antigravity/Claude Code):**
> Jangan tutup sesi kerja sebelum semua dokumen yang relevan diupdate.
> Cek: `CHANGELOG.md` ✅ | `project-manifest.md` ✅ | `architecture.md` ✅ | `README.md` ✅

---

## 3️⃣ Active Inventory

### Backend Workspace (`be/*` owned)

#### Server Actions (`actions/`)

| File | Purpose | Status |
|------|---------|--------|
| `actions/auth.action.ts` | Admin JWT login/logout | ✅ Active |
| `actions/admin.action.ts` | Admin CRUD: `getAllAdmins`, `tambahAdmin`, `editAdmin`, `hapusAdmin` | ✅ Active |
| `actions/berita.action.ts` | News CRUD (Kegiatan model) | ✅ Active |
| `actions/potensi.action.ts` | Village potentials CRUD | ✅ Active |
| `actions/banner.action.ts` | Homepage banner management | ✅ Active |
| `actions/home.action.ts` | Homepage stats & welcome message | ✅ Active |
| `actions/kontak.action.ts` | Contact info & form submission | ✅ Active |
| `actions/layanan.action.ts` | Services (Layanan) management | ✅ Active |
| `actions/tentang-kami.action.ts` | About page content management | ✅ Active |
| `actions/search.action.ts` | Site-wide search (PostgreSQL FTS) | ✅ Active |
| `actions/pesan.action.ts` | Contact form messages (PesanMasuk) | ✅ Active |
| `actions/surat.action.ts` | Letter request (Pengajuan Surat) | ⏳ Planned |

#### Utilities & Libraries (`lib/`)

| File / Directory | Purpose | Status |
|------------------|---------|--------|
| `lib/db.ts` | Prisma singleton | ✅ Active |
| `lib/dictionary.ts` | Localization dictionary (i18n) | ✅ Active |
| `lib/services/` *(reserved)* | Business logic layer (empty, reserved) | 🔄 Optional |

#### Database Schema (`prisma/`)

| File | Purpose | Status |
|------|---------|--------|
| `prisma/schema.prisma` | All Prisma models | ✅ Active |
| `prisma/seed.ts` | Database seeding (admins, banners, sample data) | ✅ Active |

#### Prisma Models

| Model | Table | Purpose | Status |
|-------|-------|---------|--------|
| `Admin` | `admin` | Login credentials + RBAC (admin/super) | ✅ Active |
| `Kegiatan` | `kegiatan` | News articles, announcements | ✅ Active |
| `PotensiDesa` | `potensidesa` | UMKM & village potentials | ✅ Active |
| `BannerHomepage` | `bannerhomepage` | Hero carousel banners | ✅ Active |
| `HomeStatistic` | `homestatistic` | Homepage statistics (population, RT, etc.) | ✅ Active |
| `HomeWelcome` | `homewelcome` | Lurah's welcome message | ✅ Active |
| `HomeService` | `homeservice` | Service icons on homepage | ✅ Active |
| `PerangkatDesa` | `perangkatdesa` | Staff organizational structure | ✅ Active |
| `ProfilKonten` | `profilkonten` | About page (visi, misi, sejarah) | ✅ Active |
| `SiteConfig` | `siteconfig` | Global site config (phone, email) | ✅ Active |
| `PengajuanSurat` | `pengajuansurat` | Letter request applications | ⏳ Planned |
| `PesanMasuk` | `pesanmasuk` | Contact form messages | ✅ Active |
| `Umkm` | `umkm` | Legacy — unused | ❌ Deprecated |
| `Penduduk` | `penduduk` | Legacy — unused | ❌ Deprecated |

---

### Frontend Workspace (`fe/*` owned)

#### Pages (`app/`) — Public Routes

| File | Route | Purpose | Status |
|------|-------|---------|--------|
| `app/page.tsx` | `/` | Root redirect → `/home` | ✅ Active |
| `app/home/page.tsx` | `/home` | Homepage | ✅ Active |
| `app/berita/page.tsx` | `/berita` | News listing | ✅ Active |
| `app/berita/[slug]/page.tsx` | `/berita/[slug]` | News detail | ✅ Active |
| `app/potensi-desa/page.tsx` | `/potensi-desa` | Village potentials listing | ✅ Active |
| `app/potensi-desa/[slug]/page.tsx` | `/potensi-desa/[slug]` | Potensi detail | ✅ Active |
| `app/layanan/page.tsx` | `/layanan` | Services overview | ✅ Active |
| `app/kontak/page.tsx` | `/kontak` | Contact page + form | ✅ Active |
| `app/tentang-kami/page.tsx` | `/tentang-kami` | About page | ✅ Active |

#### Pages (`app/admin/`) — Admin Routes (JWT Protected)

| File | Route | Purpose | Status |
|------|-------|---------|--------|
| `app/admin/layout.tsx` | — | Admin layout + JWT verification | ✅ Active |
| `app/admin/page.tsx` | `/admin` | Redirect → `/admin/dashboard` | ✅ Active |
| `app/admin/(auth)/login/page.tsx` | `/admin/login` | Admin login | ✅ Active |
| `app/admin/(dashboard)/dashboard/page.tsx` | `/admin/dashboard` | Dashboard overview | ✅ Active |
| `app/admin/(dashboard)/pesan-masuk/page.tsx` | `/admin/pesan-masuk` | Contact messages inbox | ✅ Active |
| `app/admin/halaman/beranda/page.tsx` | `/admin/halaman/beranda` | Homepage content manager | ✅ Active |
| `app/admin/halaman/beranda/sambutan/page.tsx` | `/admin/halaman/beranda/sambutan` | Welcome message editor | ✅ Active |
| `app/admin/halaman/beranda/layanan-icon/page.tsx` | `/admin/halaman/beranda/layanan-icon` | Home service icons editor | ✅ Active |
| `app/admin/halaman/banner/page.tsx` | `/admin/halaman/banner` | Banner carousel manager | ✅ Active |
| `app/admin/halaman/berita/daftar/page.tsx` | `/admin/halaman/berita/daftar` | News management (CRUD) | ✅ Active |
| `app/admin/halaman/potensi-desa/daftar/page.tsx` | `/admin/halaman/potensi-desa/daftar` | Potensi management | ✅ Active |
| `app/admin/halaman/layanan/daftar/page.tsx` | `/admin/halaman/layanan/daftar` | Services management | ✅ Active |
| `app/admin/halaman/kontak/daftar/page.tsx` | `/admin/halaman/kontak/daftar` | Contact info management | ✅ Active |
| `app/admin/halaman/tentang-kami/page.tsx` | `/admin/halaman/tentang-kami` | About content manager | ✅ Active |
| `app/admin/halaman/tentang-kami/teks/page.tsx` | `/admin/halaman/tentang-kami/teks` | Visi/misi text editor | ✅ Active |
| `app/admin/halaman/tentang-kami/struktur/page.tsx` | `/admin/halaman/tentang-kami/struktur` | Org structure editor | ✅ Active |
| `app/admin/halaman/tentang-kami/statistik/page.tsx` | `/admin/halaman/tentang-kami/statistik` | Statistics editor | ✅ Active |
| `app/admin/settings/page.tsx` | `/admin/settings` | Redirect → manajemen-admin | ✅ Active |
| `app/admin/settings/manajemen-admin/page.tsx` | `/admin/settings/manajemen-admin` | Admin user management (super only) | ✅ Active |

#### Components — User (`components/user/`)

| Component | Purpose | Status |
|-----------|---------|--------|
| `Navbar.tsx` | Site navigation | ✅ Active |
| `Footer.tsx` | Site footer | ✅ Active |
| `TopBar.tsx` | Top utility bar | ✅ Active |
| `ClientLayout.tsx` | Client-side layout wrapper | ✅ Active |
| `HeroCarousel.tsx` | Homepage banner carousel | ✅ Active |
| `HomeView.tsx` | Homepage integrated view | ✅ Active |
| `SorotanDesa.tsx` | Village highlights section | ✅ Active |
| `StaticBanner.tsx` | Static hero banner | ✅ Active |
| `BeritaView.tsx` | News listing view | ✅ Active |
| `BeritaDetailView.tsx` | News detail view | ✅ Active |
| `PotensiDesaView.tsx` | Potensi listing view | ✅ Active |
| `PotensiDetailView.tsx` | Potensi detail view | ✅ Active |
| `LayananView.tsx` | Services listing view | ✅ Active |
| `KontakView.tsx` | Contact page view | ✅ Active |
| `TentangKamiView.tsx` | About page view | ✅ Active |
| `GlobalSearchModal.tsx` | Cmd+K search modal | ✅ Active |
| `SkeletonDetail.tsx` | Loading skeleton | ✅ Active |

#### Components — Admin (`components/admin/`)

| Component | Purpose | Status |
|-----------|---------|--------|
| `AdminSidebar.tsx` | Admin navigation sidebar | ✅ Active |
| `AdminHeader.tsx` | Admin top bar | ✅ Active |
| `CommandPalette.tsx` | Admin quick actions palette (Cmd+K) | ✅ Active |
| `AdminBannerManager.tsx` | Banner CRUD UI | ✅ Active |
| `AdminHomeFeatures.tsx` | Homepage sections manager | ✅ Active |
| `AdminStrukturClient.tsx` | Staff organization editor | ✅ Active |
| `AdminLayananManager.tsx` | Services manager | ✅ Active |
| `ManajemenAdminClient.tsx` | Admin user CRUD UI — real DB via `admin.action.ts` | ✅ Active |
| `ModalTambahBerita.tsx` | Add news modal | ✅ Active |
| `ModalEditBerita.tsx` | Edit news modal | ✅ Active |
| `BeritaRowActions.tsx` | News table row actions | ✅ Active |
| `PotensiModals.tsx` | Potensi CRUD modals | ✅ Active |
| `PotensiRowActions.tsx` | Potensi table row actions | ✅ Active |
| `ConfirmDeleteButton.tsx` | Delete confirmation button | ✅ Active |
| `InboxClient.tsx` | Contact messages inbox UI | ✅ Active |
| `TemplateSurat.tsx` | Letter template preview — used by `AdminLayananManager` | ✅ Active |

#### Design & Configuration

| File | Purpose | Status |
|------|---------|--------|
| `app/globals.css` | Tailwind v4 + CSS design tokens | ✅ Active |
| `app/tw-safelist.txt` | Dynamic Tailwind class safelist (VITAL) | ✅ Active |
| `tailwind.config.ts` | Tailwind v4 configuration | ✅ Active |
| `app/layout.tsx` | Root layout (Plus Jakarta Sans, metadata) | ✅ Active |

#### Other Directories (Tracked, Out-of-Architecture)

| Directory | Purpose | Status |
|-----------|---------|--------|
| `context/` | React Context providers (`LanguageContext.tsx`) | ✅ Active |
| `certificates/` | Local HTTPS certs (`npm run dev --experimental-https`) | ✅ Dev only |
| `public/images/` | Hero images, potensi photos | ✅ Active |
| `public/icons/` | SVG icons (created, ready) | 🆕 Empty |
| `public/uploads/` | User-uploaded content | ✅ Active |
| `lib/services/` | Business logic layer (reserved) | 🔄 Optional |
| `trash-temp/` | **REVIEW QUEUE** — files pending decision | 🔍 Review |

**Out-of-scope (tidak diimplementasi):**
- `components/ui/` — primitive component library (TODO)
- `app/api/` — hanya `template/stats` (Excel export); tidak ada REST API
- `middleware.ts` — tidak dipakai (auth di layout)
- Error monitoring (Sentry) — belum dikonfigurasi

---

## 4️⃣ Feature Coverage Matrix

| Feature | BE Action | FE Route | FE Component(s) | Status |
|---------|-----------|----------|----------------|--------|
| Admin Auth | `auth.action.ts` | `/admin/login` | LoginForm (in page.tsx) | ✅ Done |
| Admin User Management | `admin.action.ts` | `/admin/settings/manajemen-admin` | `ManajemenAdminClient` | ✅ Done |
| News CRUD | `berita.action.ts` | `/admin/halaman/berita/daftar` | ModalTambahBerita, ModalEditBerita, BeritaRowActions | ✅ Done |
| News Public View | `berita.action.ts` | `/berita`, `/berita/[slug]` | BeritaView, BeritaDetailView | ✅ Done |
| Banner Management | `banner.action.ts` | `/admin/halaman/banner` | AdminBannerManager, HeroCarousel | ✅ Done |
| Homepage Content | `home.action.ts` | `/home`, `/admin/halaman/beranda` | HomeView, AdminHomeFeatures | ✅ Done |
| Potensi CRUD | `potensi.action.ts` | `/admin/halaman/potensi-desa/daftar` | PotensiModals, PotensiRowActions | ✅ Done |
| Potensi Public View | `potensi.action.ts` | `/potensi-desa`, `/potensi-desa/[slug]` | PotensiDesaView, PotensiDetailView | ✅ Done |
| Services Management | `layanan.action.ts` | `/admin/halaman/layanan/daftar` | AdminLayananManager | ✅ Done |
| Services Public View | `layanan.action.ts` | `/layanan` | LayananView | ✅ Done |
| Contact Management | `kontak.action.ts` | `/admin/halaman/kontak/daftar` | KontakView | ✅ Done |
| Contact Page (Public) | `kontak.action.ts` | `/kontak` | KontakView | ✅ Done |
| About Content | `tentang-kami.action.ts` | `/admin/halaman/tentang-kami` | TentangKamiView | ✅ Done |
| About Page (Public) | `tentang-kami.action.ts` | `/tentang-kami` | TentangKamiView | ✅ Done |
| Site Search | `search.action.ts` | Global | GlobalSearchModal | ✅ Done |
| Contact Messages Inbox | `pesan.action.ts` | `/admin/pesan-masuk` | InboxClient | ✅ Done |
| Letter Requests (Surat) | `surat.action.ts` *(planned)* | — | TemplateSurat | ⏳ Planned |

---

## 5️⃣ Cleanup Queue

### `/trash-temp/` — Pending Review

| File | Dari | Alasan | Aksi |
|------|------|--------|------|
| `AdminSuratView.tsx` | `components/admin/` | Zero imports — orphan (fitur Surat belum jalan) | 🔍 Simpan jika Surat dimulai, hapus jika tidak |
| `ttd-test.png` | `public/` | Test image tanda tangan — tidak ada referensi di kode | 🔍 Konfirmasi dulu |
| `file.svg` | `public/` | Boilerplate Next.js — tidak dipakai | 🗑️ Hapus |
| `globe.svg` | `public/` | Boilerplate Next.js — tidak dipakai | 🗑️ Hapus |
| `next.svg` | `public/` | Boilerplate Next.js — tidak dipakai | 🗑️ Hapus |
| `vercel.svg` | `public/` | Boilerplate Next.js — tidak dipakai | 🗑️ Hapus |
| `window.svg` | `public/` | Boilerplate Next.js — tidak dipakai | 🗑️ Hapus |

### Completed Cleanup Log

| Item | Tindakan | Tanggal |
|------|----------|---------|
| `fix.js` (root) | ✅ Sudah tidak ada — confirmed clean | 14 Mei 2026 |
| `scripts/` (root) | ✅ Dihapus — folder kosong | 14 Mei 2026 |
| `.docs/README.md` | ✅ Dihapus — duplikat, README cukup di root | 14 Mei 2026 |
| Default Next.js SVGs | ✅ Dipindah ke `trash-temp/` | 14 Mei 2026 |
| `settings/page.tsx` (427-line dummy) | ✅ Diganti — redirect bersih ke manajemen-admin | 14 Mei 2026 |
| `settings/manajemen-admin/page.tsx` | ✅ Direfactor — Server Component + real DB | 14 Mei 2026 |
| `force-dynamic` missing (6 pages) | ✅ Fixed — semua page sudah dinamis | 14 Mei 2026 |
| Route group `(user)/` di docs | ✅ Dihapus dari architecture.md — tidak ada di kode | 14 Mei 2026 |

### Cleanup Rules

**Hapus jika:**
1. File tidak ada di Active Inventory dan tidak disebut di `architecture.md`
2. File tidak diimport di mana pun (cek dengan `grep` atau IDE search)
3. File adalah sisa eksperimen gagal (`*.old.tsx`, `*.bak`, dll.)

**Archive jika:**
1. Fitur eksperimental → pindah ke `archive/` (buat jika belum ada)
2. Kode deprecated → tambah komentar `// DEPRECATED: <alasan>` lalu pindah

> **Agent Instruction:** File tidak terdaftar di Active Inventory = kandidat hapus, kecuali ada exemption eksplisit di manifest ini.

---

## 6️⃣ Cross-Reference ke ANF Docs

| Dokumen | Untuk Siapa | Isi |
|---------|-------------|-----|
| [`architecture.md`](.docs/architecture.md) | Tech Lead, AI Agent | Master blueprint, branching, data contracts, routing, file ownership |
| [`backend-logic.md`](.docs/backend-logic.md) | BE Dev, AI Agent | Server Actions pattern, Prisma, Zod validation |
| [`frontend-design.md`](.docs/frontend-design.md) | FE Dev, AI Agent | Design system, component hole pattern |
| [`security-policy.md`](.docs/security-policy.md) | Semua Dev | RLS, JWT, Zod, secrets management |
| [`roadmap.md`](.docs/roadmap.md) | Product, Teams | Feature timeline, sprint planning |

---

## 7️⃣ Manifest Maintenance

**Update triggers:**
- File baru dibuat → tambah ke Active Inventory dengan status
- File dihapus/dipindah → pindah ke Cleanup Queue / Completed Log
- Refactor → update path dan nama komponen
- Feature selesai → update Feature Coverage Matrix (⏳ → ✅)
- Sprint retro → review status flags

**Review cadence:** Setiap sprint planning session.

---

**Note:** This manifest is the inventory of truth. New files must be registered here before merging to `main`.  
**Owner:** Tech Lead | **Next Review:** Sprint Planning
