# 📝 CHANGELOG

**Portal Web Terpadu Kelurahan Wergu Wetan**
**Rule:** Semua perubahan struktur, penambahan file, atau pergantian status fitur WAJIB dicatat di sini terlebih dahulu sebelum memperbarui dokumen spesifik di `.docs/`.

---

## [v3.3.0] - 2026-05-16
### Changed
- Rename `.docs/frontend-ui.md` → `.docs/frontend-design.md` — nama baru lebih deskriptif (design system, bukan hanya "UI").
- Update semua referensi lintas dokumen: `architecture.md` (4 titik), `project-manifest.md` (1 titik), `README.md` (5 titik), `CHANGELOG.md` (2 titik historis).
- Label teks di `README.md` ikut disesuaikan: "Frontend UI" → "Frontend Design" dan deskripsi item no.5 diperbarui.

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
