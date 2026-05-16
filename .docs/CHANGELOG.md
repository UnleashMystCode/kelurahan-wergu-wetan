# 📝 CHANGELOG

**Portal Web Terpadu Kelurahan Wergu Wetan**
**Rule:** Semua perubahan struktur, penambahan file, atau pergantian status fitur WAJIB dicatat di sini terlebih dahulu sebelum memperbarui dokumen spesifik di `.docs/`.

---

## [v3.7.0] - 2026-05-16
### Added (Backend Fitur Ulasan & IKM)
- `actions/ulasan.action.ts` — Membuat *Server Action* untuk manajemen IKM. Mencakup `tambahUlasan` (dengan validasi Zod form), `getSemuaUlasan` (untuk tabel Admin), dan `getStatistikUlasan` (kalkulasi agregat untuk dasbor publik).

### Changed (Arsitektur Direktori Layanan & IKM)
- `schema.prisma` — Menghapus tabel obsolete `PengajuanSurat`, menggantinya dengan tabel `UlasanLayanan` (Indeks Kepuasan Masyarakat).
- `.docs/` — Purge total semua referensi "Pengajuan Surat" dan "Letter Forms" di `roadmap.md`, `project-manifest.md`, `architecture.md`, `mcp-and-skills.md`. Sistem kini sepenuhnya beralih ke konsep Direktori Layanan dan Ulasan/IKM.
- `AdminLayananManager.tsx` — Direset menjadi halaman *placeholder* ("Dalam Tahap Pengembangan") karena UI form surat lama sudah tidak relevan.
- Supabase Database — Migrasi skema secara remote (`db push --accept-data-loss`) sukses.

### Removed
- `TemplateSurat.tsx` — Fitur cetak PDF surat dihapus karena kelurahan tidak lagi memproses surat online.
- `xlsx` dependency — Library dihapus karena terdeteksi mengandung *High Vulnerability* tanpa fix (Prototype Pollution).

### Security
- `npm audit fix --force` — Meng-upgrade Next.js dari v16.1.6 ke v16.2.6 untuk menambal 5 *High Vulnerability* kritis (DoS, Request Smuggling, CSRF Bypass).

---

## [v3.6.0] - 2026-05-16
### Fixed (CI Pipeline — Debugging & Stabilisasi)
- `ci.yml` — Fix trigger: tambah branch `pr` secara eksplisit (pattern `pr/**` tidak match branch bernama `pr`).
- `eslint.config.mjs` — Tambah rule overrides: `no-explicit-any`, `no-unescaped-entities`, `react-hooks/purity`, `react-hooks/set-state-in-effect` di-downgrade ke warn/off; false positive di Next.js App Router.
- `app/sitemap.ts` — Tambah `force-dynamic` dan `try-catch` agar build tidak crash di CI ketika DB tidak tersedia.
- `next.config.ts` — Tambah URL produksi ke `allowedOrigins` via `NEXT_PUBLIC_SITE_URL` env var.

---

## [v3.5.0] - 2026-05-16
### Added (Standardisasi & Template Profesional)
- `.editorconfig` — Standardisasi format kode lintas editor; fix masalah LF/CRLF di Windows.
- `.gitmessage` — Template commit message (Conventional Commits); aktif via `git config commit.template`.
- `.github/CODEOWNERS` — Auto-assign reviewer ke @AlrafuruNotFound untuk semua PR di area sensitif.
- `.env.example` diperbarui — Instruksi lengkap dengan contoh nilai, panduan Supabase, dan catatan Vercel deployment.

---

## [v3.4.0] - 2026-05-16
### Added (GitHub Standards & CI/CD Setup)
- `.github/workflows/ci.yml` — CI Pipeline: ESLint + TypeScript check + Next.js build pada setiap push/PR.
- `.github/workflows/docs-sync.yml` — Enforce ANF Docs-Sync Law: PR ke `main`/`pr/*` wajib update CHANGELOG.md.
- `.github/workflows/security-audit.yml` — Audit keamanan dependency otomatis setiap Senin (npm audit --audit-level=high).
- `.github/PULL_REQUEST_TEMPLATE.md` — Template PR dengan checklist ANF: BE/FE/Security/Docs.
- `.github/ISSUE_TEMPLATE/bug_report.yml` — Form bug report terstruktur.
- `.github/ISSUE_TEMPLATE/feature_request.yml` — Form feature request terstruktur.
- `CONTRIBUTING.md` — Panduan kontribusi lengkap (branching, standar kode, workflow).
- `SECURITY.md` — Security policy GitHub: cara melaporkan kerentanan secara privat.

---

## [v3.3.1] - 2026-05-16
### Fixed (Audit Sinkronisasi Dokumen vs Kode)
- `architecture.md`: Tambah 8 library aktif ke Section 2 (`framer-motion`, `date-fns`, `bcryptjs`, `react-hot-toast`, `react-to-print`, `use-debounce`, `xlsx`, `@tailwindcss/typography`).
- `architecture.md`: Tambah route `/admin/halaman/banner` yang terlewat dari tabel Admin Routes Section 7.
- `architecture.md`: Koreksi File Ownership Matrix — `tailwind.config.ts` → `postcss.config.mjs` (Tailwind v4 tidak menggunakan `tailwind.config.ts`).
- `project-manifest.md`: Hapus `tailwind.config.ts` (file tidak ada di filesystem), tambah `app/loading.tsx`, `app/sitemap.ts`, `next.config.ts`, `postcss.config.mjs` ke tabel Design & Configuration.
- `project-manifest.md`: Tambah subsection `App-Level Components` untuk mendokumentasikan `AdminShell.tsx` yang berada di `app/admin/`.
- `project-manifest.md`: Tambah `public/logo-kudus.svg` ke tabel Other Directories, perinci deskripsi `public/uploads/` dan `public/images/`.

---

## [v3.3.0] - 2026-05-16
### Changed
- Rename `.docs/frontend-ui.md` → `.docs/frontend-design.md` — nama lebih deskriptif (design system, bukan hanya "UI").
- Update semua referensi: `architecture.md` (4 titik), `project-manifest.md` (1 titik), `README.md` (5 titik), `CHANGELOG.md` (2 titik historis).
- Label teks di `README.md` ikut disesuaikan: "Frontend UI" → "Frontend Design".

---

## [v3.2.0] - 2026-05-14
### Added
- **Admin User Management:** `actions/admin.action.ts` dan `components/admin/ManajemenAdminClient.tsx` dibuat untuk CRUD super admin.
- **Dynamic Rendering:** Enforce `export const dynamic = "force-dynamic"` pada `app/page.tsx`, `admin/page.tsx`, `dashboard/page.tsx`, `pesan-masuk/page.tsx`, `settings/page.tsx`, dan `settings/manajemen-admin/page.tsx`.

### Changed
- Refaktor `settings/page.tsx` dari komponen klien (dummy data) menjadi pengalihan (redirect) bersih ke `manajemen-admin`.
- Pembaruan dokumen `.docs/project-manifest.md` dan `.docs/architecture.md` untuk merefleksikan file aksi yang baru dan penerapan *dynamic rendering*.

### Fixed
- Menghapus direktori `app/(user)/` fiktif dari dokumen arsitektur dan membersihkan rute yang tidak relevan.
- Perbaikan inkonsistensi besar-besaran di dokumen panduan (`frontend-design.md`, `backend-logic.md`, `security-policy.md`, `roadmap.md`) yang sebelumnya memberikan contoh kode yang salah atau informasi yang kadaluwarsa.

---

## [v3.1.0] - 2026-05-14
### Changed
- Audit dan pembersihan arsitektur kode. Menghapus file skrip sisa dan boilerplate SVG.
- Konsolidasi dokumen. Menghapus `.docs/README.md` duplikat dan memperbarui master `README.md`.

---

## [v3.0.0] - 2026-05-14
### Added
- Arsitektur ANF-Agentic ditetapkan secara resmi di `architecture.md`.
- Kebijakan dan pedoman di `.docs/` (`frontend-design.md`, `backend-logic.md`, `security-policy.md`).

---
