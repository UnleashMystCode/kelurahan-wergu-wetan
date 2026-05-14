# 📦 Project Manifest — ANF-Agentic Architecture

**Portal Web Terpadu Kelurahan Wergu Wetan**  
**Purpose:** Inventory & cleanup queue for active codebase files, aligned with ANF-Agentic branching.  
**Maintained by:** Engineering Team | **Last Updated:** 14 Mei 2026

---

## 📋 Philosophy

This manifest follows **ANF-Agentic Architecture** principles:
- `be/*` branches own backend files (Server Actions, Prisma, services)
- `fe/*` branches own frontend files (components, pages, styles)
- `pr/*` branches merge both for integration testing
- `main` holds production-ready, validated manifest

**Rule of thumb:** If a file is not listed here and not in `architecture.md`'s directory structure, it's a candidate for deletion.

---

## ✅ Active Inventory

### Backend Workspace (`be/*` owned)

| File / Directory | Purpose | Status |
|------------------|---------|--------|
| `lib/db.ts` | Prisma singleton | ✅ Active |
| `actions/auth.action.ts` | Admin JWT login/logout | ✅ Active |
| `actions/berita.action.ts` | News CRUD (Kegiatan model) | ✅ Active |
| `actions/potensi.action.ts` | Village potentials CRUD | ✅ Active |
| `actions/banner.action.ts` | Homepage banner management | ✅ Active |
| `actions/home.action.ts` | Homepage stats & welcome message | ✅ Active |
| `actions/kontak.action.ts` | Contact info & form submission | ✅ Active |
| `actions/layanan.action.ts` | Services (Layanan) management | ✅ Active |
| `actions/tentang-kami.action.ts` | About page content management | ✅ Active |
| `actions/search.action.ts` | Site-wide search (PostgreSQL FTS) | ✅ Active |
| `actions/pesan.action.ts` | Contact form messages (PesanMasuk) | ✅ Active |
| `actions/surat.action.ts` | Letter request (Pengajuan Surat) — *planned* | ⏳ Planned |
| `lib/services/` *(optional)* | Business logic layer (not yet created) | 🔄 Optional |
| `prisma/schema.prisma` | All 14 Prisma models | ✅ Active |
| `prisma/seed.ts` | Database seeding (admins, banners, sample data) | ✅ Active |

**BE Utilities & Extended:**
| File / Directory | Purpose | Status |
|------------------|---------|--------|
| `lib/dictionary.ts` | Localization dictionary (i18n) | ✅ Active |
| `lib/services/` *(optional)* | Business logic layer (not yet created) | 🔄 Optional |
| `context/LanguageContext.tsx` | React context for language state (FE extension) | ✅ Active |

---

### Database Models (Prisma)
| Model | Table Name | Purpose | Status |
|-------|------------|---------|--------|
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
| `PengajuanSurat` | `pengajuan surat` | Letter request applications | 🔄 Planned |
| `PesanMasuk` | `pesanmasuk` | Contact form messages | ✅ Active |
| `Umkm` | `umkm` | ⚠️ Legacy (unused) | ❌ Deprecated |
| `Penduduk` | `penduduk` | ⚠️ Legacy (unused) | ❌ Deprecated |

---

### Frontend Workspace (`fe/*` owned)

#### Pages (app/)

| File | Purpose | Status |
|------|---------|--------|
| `app/page.tsx` | Public homepage (landing) | ✅ Active |
| `app/(user)/home/page.tsx` | Public homepage (route group) | ✅ Active |
| `app/(user)/berita/page.tsx` | News listing | ✅ Active |
| `app/(user)/berita/[slug]/page.tsx` | News detail | ✅ Active |
| `app/(user)/potensi-desa/page.tsx` | Village potentials listing | ✅ Active |
| `app/(user)/potensi-desa/[slug]/page.tsx` | Potensi detail | ✅ Active |
| `app/(user)/layanan/page.tsx` | Services overview | ✅ Active |
| `app/(user)/kontak/page.tsx` | Contact page + form | ✅ Active |
| `app/(user)/tentang-kami/page.tsx` | About page | ✅ Active |
| `app/admin/layout.tsx` | Admin layout + JWT verification | ✅ Active |
| `app/admin/page.tsx` | Admin dashboard home | ✅ Active |
| `app/admin/(auth)/login/page.tsx` | Admin login (route group) | ✅ Active |
| `app/admin/(dashboard)/dashboard/page.tsx` | Dashboard overview | ✅ Active |
| `app/admin/(dashboard)/pesan-masuk/page.tsx` | Contact messages inbox | ✅ Active |
| `app/admin/halaman/berita/daftar/page.tsx` | News management (CRUD list) | ✅ Active |
| `app/admin/halaman/potensi-desa/daftar/page.tsx` | Potensi management | ✅ Active |
| `app/admin/halaman/layanan/daftar/page.tsx` | Services management | ✅ Active |
| `app/admin/halaman/kontak/daftar/page.tsx` | Contact info management | ✅ Active |
| `app/admin/halaman/tentang-kami/page.tsx` | About content manager | ✅ Active |
| `app/admin/halaman/tentang-kami/teks/page.tsx` | Visi/misi text editor | ✅ Active |
| `app/admin/halaman/tentang-kami/struktur/page.tsx` | organizational structure editor | ✅ Active |
| `app/admin/halaman/tentang-kami/statistik/page.tsx` | Statistics editor | ✅ Active |
| `app/admin/halaman/beranda/page.tsx` | Homepage content manager | ✅ Active |
| `app/admin/halaman/beranda/sambutan/page.tsx` | Welcome message (Lurah) editor | ✅ Active |
| `app/admin/halaman/beranda/layanan-icon/page.tsx` | Home service icons editor | ✅ Active |
| `app/admin/halaman/banner/page.tsx` | Banner carousel manager | ✅ Active |
| `app/admin/settings/manajemen-admin/page.tsx` | Admin user management (super only) | ⏳ In Progress |

#### Components (FE UI)

**User Components (`components/user/`):**
| Component | Purpose | Status |
|-----------|---------|--------|
| `Navbar.tsx` | Site navigation | ✅ Active |
| `Footer.tsx` | Site footer | ✅ Active |
| `HeroCarousel.tsx` | Homepage banner carousel | ✅ Active |
| `HomeView.tsx` | Homepage integrated view (legacy/segmented?) | 🔍 Verify |
| `BeritaView.tsx` | News listing view | ✅ Active |
| `BeritaDetailView.tsx` | News detail view | ✅ Active |
| `PotensiDesaView.tsx` | Potensi listing view | ✅ Active |
| `PotensiDetailView.tsx` | Potensi detail view | ✅ Active |
| `LayananView.tsx` | Services listing view | ✅ Active |
| `KontakView.tsx` | Contact page view | ✅ Active |
| `TentangKamiView.tsx` | About page view | ✅ Active |
| `StaticBanner.tsx` | Static hero banner | ✅ Active |
| `SorotanDesa.tsx` | Village highlights section | ✅ Active |
| `GlobalSearchModal.tsx` | Cmd+K search modal | ✅ Active |
| `ClientLayout.tsx` | Client-side layout wrapper | ✅ Active |
| `TopBar.tsx` | Top utility bar | ✅ Active |
| `SkeletonDetail.tsx` | Loading skeleton | ✅ Active |

**Admin Components (`components/admin/`):**
| Component | Purpose | Status |
|-----------|---------|--------|
| `AdminSidebar.tsx` | Admin navigation sidebar | ✅ Active |
| `AdminHeader.tsx` | Admin top bar | ✅ Active |
| `AdminBannerManager.tsx` | Banner CRUD UI | ✅ Active |
| `AdminHomeFeatures.tsx` | Homepage sections manager | ✅ Active |
| `AdminStrukturClient.tsx` | Staff organization editor | ✅ Active |
| `AdminSuratView.tsx` | Letter request manager | ⏳ In Progress |
| `AdminLayananManager.tsx` | Services manager | ✅ Active |
| `ModalTambahBerita.tsx` | Add news modal | ✅ Active |
| `ModalEditBerita.tsx` | Edit news modal | ✅ Active |
| `BeritaRowActions.tsx` | News table row actions | ✅ Active |
| `PotensiModals.tsx` | Potensi CRUD modals | ✅ Active |
| `PotensiRowActions.tsx` | Potensi table row actions | ✅ Active |
| `ConfirmDeleteButton.tsx` | Delete confirmation button | ✅ Active |
| `InboxClient.tsx` | Contact messages inbox UI | ✅ Active |
| `CommandPalette.tsx` | Admin quick actions palette | ✅ Active |
| `TemplateSurat.tsx` | Letter template preview | ⏳ Planned |

#### Design & Configuration

| File | Purpose | Status |
|------|---------|--------|
| `app/globals.css` | Tailwind v4 + design tokens | ✅ Active |
| `app/tw-safelist.txt` | Dynamic Tailwind class safelist | ✅ Active |
| `tailwind.config.ts` | Tailwind v4 configuration | ✅ Active |
| `components.json` *(if exists)* | Component registry (optional) | 🔍 Verify |

**Out-of-scope / Not Implemented:**
- `components/ui/` — primitive component library (TODO)
- `app/api/` — API routes: only `template/stats` (Excel export) exists; no REST API routes
- `middleware.ts` — not used (auth handled in layout)
- Error monitoring (Sentry) — not configured
- `lib/services/` — business logic layer (deferred; Server Actions sufficient for now)

---

## 🧹 Cleanup Queue

### Files to Review (Candidates for Deletion / Archival)

| File / Directory | Reason | Action |
|------------------|--------|--------|
| `fix.js` (root) | One-time utility script, no longer needed | 🗑️ Delete after confirming migration complete |
| `app/admin/halaman/*/page-old.tsx` *(if exists)* | Legacy admin pages (check for old versions) | 🔍 Search & delete if found |
| Unused mock data files (`*.mock.tsx`, `*.fixture.tsx`) | Design-time only, not production | 🗑️ Delete |
| Duplicate component variants (e.g., `Navbar.v2.tsx`)* | Multiple versions of same component | 🗑️ Keep single source |

**Note:** No `*-old.tsx` or `.bak` files currently found in codebase.

**Search command to run:**
```bash
# Find orphaned files (not imported anywhere)
git ls-files | xargs grep -L "import.*from"  # approximate
```

### Cleanup Rules

**When to delete:**
1. File is not listed in **Active Inventory** above
2. File is not referenced in `architecture.md`'s directory structure
3. File has no imports anywhere in the codebase (verify with `grep` or IDE search)
4. File is a leftover from failed experiments (e.g., `test.old.tsx`)

**When to archive:**
1. Experimental features → move to `archive/` folder (create if needed)
2. Deprecated code → comment with `// DEPRECATED: <reason>` and move to `archive/`

**Agent instruction:**
> "Any file not listed in the Active Inventory or defined in `architecture.md`'s directory structure must be flagged for deletion unless explicitly exempted in this manifest."

---

## 📊 Feature Coverage Matrix

| Feature | BE Action File | FE Page | FE Component(s) | Status |
|---------|---------------|---------|----------------|--------|
| Admin Auth | `auth.action.ts` | `/admin/login` | LoginForm (in AdminShell) | ✅ Done |
| News CRUD | `berita.action.ts` | `/admin/halaman/berita/daftar` | ModalTambahBerita, ModalEditBerita, BeritaRowActions, BeritaView (list) | ✅ Done |
| News Public View | `berita.action.ts` | `/berita`, `/berita/[slug]` | BeritaView, BeritaDetailView | ✅ Done |
| Banner Management | `banner.action.ts` | `/admin/halaman/banner` | AdminBannerManager, HeroCarousel | ✅ Done |
| Homepage Stats | `home.action.ts` | `/home` | HomeView (includes stats section) | ✅ Done |
| Welcome Message (Lurah) | `home.action.ts` | `/admin/halaman/beranda/sambutan` | AdminHomeFeatures (welcome editor) | ✅ Done |
| Potensi CRUD | `potensi.action.ts` | `/admin/halaman/potensi-desa/daftar` | PotensiModals, PotensiRowActions, PotensiDesaView | ✅ Done |
| Potensi Public View | `potensi.action.ts` | `/potensi-desa`, `/potensi-desa/[slug]` | PotensiDesaView, PotensiDetailView | ✅ Done |
| Services Management | `layanan.action.ts` | `/admin/halaman/layanan/daftar` | AdminLayananManager | ✅ Done |
| Services Public View | `layanan.action.ts` | `/layanan` | LayananView | ✅ Done |
| Contact Info Management | `kontak.action.ts` | `/admin/halaman/kontak/daftar` | KontakView (admin mode) | ✅ Done |
| Contact Page (Public) | `kontak.action.ts` | `/kontak` | KontakView | ✅ Done |
| About Content (Tentang Kami) | `tentang-kami.action.ts` | `/admin/halaman/tentang-kami` | TentangKamiView (admin),组织结构编辑 | ✅ Done |
| About Page (Public) | `tentang-kami.action.ts` | `/tentang-kami` | TentangKamiView (public) | ✅ Done |
| Site Search | `search.action.ts` | Global (any page) | GlobalSearchModal | ✅ Done |
| Contact Messages Inbox | `pesan.action.ts` | `/admin/(dashboard)/pesan-masuk` | InboxClient | ✅ Done |
| Letter Requests (Surat) | `surat.action.ts` *(planned)* | — | AdminSuratView, TemplateSurat | ⏳ Planned |
| Admin User Management | *(planned)* | `/admin/settings/manajemen-admin` | (admin settings UI exists) | ⏳ Partial |
| Letter Request (Surat) | `surat.action.ts` *(planned)* | — | — | ⏳ Planned |
| Admin Settings | `admin.action.ts` *(planned)* | `/admin/settings/*` | SettingsForm | ⏳ Planned |

---

## 🔗 Cross-Reference to ANF Docs

- **`architecture.md`** — Branch strategy, workspace separation, file ownership matrix
- **`backend-logic.md`** — Server Actions pattern, Zod validation, Prisma best practices
- **`frontend-ui.md`** — Design system, Stitch workflow (optional), component "hole" pattern
- **`security-policy.md`** — RLS policies, JWT auth, secrets, audit logging
- **`roadmap.md`** — Feature timeline, sprint priorities, status tracking

---

## 📝 Manifest Maintenance

**Update triggers:**
- New feature added → Add file to Active Inventory with status
- Old file removed → Mark as deleted, move to Cleanup Queue if needed
- Refactor → Update file paths and component names
- Sprint retrospective → Review status flags (✅ Active / ⏳ In Progress / ❌ Deprecated)

**Review cadence:** Every sprint planning session.

---

**Note:** This manifest is the inventory of truth. New files must be registered here before merging to `main`.  
**Owner:** Tech Lead | **Next Review:** Sprint Planning
