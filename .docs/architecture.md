# 🏗️ ANF-Agentic Architecture — Master Blueprint

**Portal Web Terpadu Kelurahan Wergu Wetan**

> *"AlrafuruNotFound-Agentic Architecture for Modular Development"*

**Created by:** [AlrafuruNotFound](https://github.com/AlrafuruNotFound) | **Version:** 3.0  
**Last Updated:** 14 Mei 2026 | **Status:** ✅ Verified Against Codebase v0.1.0

---

## 📜 Opening Statement

This document is the **definitive source of truth** for the application's architecture, implementing the **ANF-Agentic Architecture** — a pattern designed for collaboration between human developers and AI agents (Antigravity, Claude Code, etc.).

**Core Philosophy:** Modular structure + Agentic branching (`be/*`, `fe/*`, `pr/*`) + explicit data contracts = scalable, testable, AI-friendly development.

---

## 📌 1. Project Overview

| Aspect | Detail |
|--------|--------|
| **Name** | Portal Web Terpadu Kelurahan Wergu Wetan |
| **Purpose** | E-Government platform — transparency, digital public services |
| **Tagline** | Birokrasi Modern, Profesional, Inklusif, Dinamis |
| **Architecture** | **ANF-Agentic** (Vertical Slice + Agentic Branching) |
| **Stack** | Next.js 16.1.6 + React 19 + TypeScript 5 + Tailwind v4 |
| **Database** | PostgreSQL (Supabase) + Prisma ORM 5.10.2 |
| **Authentication** | JWT (jose HS256, 24h) + HTTP-only cookies |
| **Status** | ✅ v0.1.0 — Production Ready |

---

## 📐 2. Architecture Philosophy

### Vertical Slice Monolith

```
[ Client Request ]
        ↓
[ Next.js Server ] ← No API Routes (except binary streaming)
        ↓
[ Server Actions ] ← Primary backend pattern (use server)
        ↓
[ Prisma ORM ] ← Type-safe DB access
        ↓
[ Supabase PostgreSQL ] ← Single source of truth
```

**Principles:**
- ✅ **Full-stack monolith** — FE + BE in one codebase
- ✅ **Vertical slice** — Group by domain (`berita/`, `potensi-desa/`), not by `controller/`, `service/`
- ✅ **Server Actions First** — ~99% logic in Server Actions, no REST API routes
- ✅ **Stateless auth** — JWT in HTTP-only cookies, no session store
- ✅ **CSS Variables theming** — Tailwind v4 custom properties

---

## 🌿 3. Branching Strategy & Git Workflow

### Branch Types & Purpose

| Branch | Focus | Purpose | Output |
|--------|-------|---------|--------|
| **`be/*`** | Backend | Server Actions, services, Prisma queries in `actions/`, `lib/`, `prisma/` | Type-safe functions ready for FE consumption |
| **`fe/*`** | Frontend | UI components and pages in `components/`, `app/` with "hole" props interfaces | Presentational components awaiting data |
| **`pr/*`** | Integration | Merge BE + FE to test data contracts and full flows | Integrated features, validated contracts |
| **`main`** | Production | Stable, tested, deployed code | Production releases |

### Branch Lifecycle

```
[be/feature-x]     [fe/feature-x]       [pr/feature-x]         [main]
     ↓                   ↓                    ↓                     ↓
[Server Actions] + [UI Components] → [Integration Test] → [Release]
     ↓                   ↓                    ↓                     ↓
[BE Logic done] + [FE UI done] → [Data binding test] → [Deploy]
```

**Rules:**
- ✅ **BE (`be/*`)** — Only modify `actions/`, `lib/`, `prisma/`. Never touch `components/` or `app/` (except wrappers).
- ✅ **FE (`fe/*`)** — Only modify `components/`, `app/`. Never touch `actions/` or `lib/`.
- ✅ **PR (`pr/*`)** — Merge be + fe branches, test full flow, then merge to `develop` → `main`.
- ❌ **Never** develop directly on `main` (except hotfix `hotfix/*`).

### Branch Naming Convention

| Type | Format | Example |
|------|--------|---------|
| Feature (BE) | `be/<domain>-<desc>` | `be/berita-crud` |
| Feature (FE) | `fe/<domain>-<desc>` | `fe/berita-card-ui` |
| Integration | `pr/<domain>-<desc>` | `pr/berita-full-integration` |
| Hotfix | `hotfix/<desc>` | `hotfix/login-cookie-bug` |

---

## 📁 4. Directory Structure (Verified Against Codebase)

```
wergu-wetan-app/
├── app/                          # Next.js App Router — FE workspace
│   ├── home/                    # Homepage route → /home
│   ├── berita/                  # News listing → /berita
│   │   └── [slug]/              # News detail → /berita/[slug]
│   ├── potensi-desa/            # Village potentials → /potensi-desa
│   │   └── [slug]/              # Potensi detail → /potensi-desa/[slug]
│   ├── layanan/                 # Services → /layanan
│   ├── kontak/                  # Contact → /kontak
│   ├── tentang-kami/            # About → /tentang-kami
│   ├── admin/                   # Protected CMS dashboard
│   │   ├── (auth)/login/        # Admin login (route group)
│   │   ├── (dashboard)/         # Dashboard route group
│   │   │   ├── dashboard/       # Dashboard overview
│   │   │   └── pesan-masuk/     # Contact inbox
│   │   ├── halaman/             # Content management pages
│   │   │   ├── beranda/         # Homepage editor
│   │   │   ├── berita/          # News management
│   │   │   ├── potensi-desa/    # Potensi management
│   │   │   ├── layanan/         # Services management
│   │   │   ├── kontak/          # Contact info management
│   │   │   └── tentang-kami/    # About content management
│   │   └── settings/            # Admin settings
│   │       └── manajemen-admin/ # Admin user management (super only)
│   ├── api/                     # Minimal — Excel template only
│   ├── globals.css              # Tailwind + CSS custom properties
│   ├── layout.tsx               # Root layout (Plus Jakarta Sans, metadata)
│   ├── page.tsx                 # Root redirect → /home
│   └── tw-safelist.txt          # VITAL — dynamic Tailwind classes
│
├── actions/                     # Server Actions — BE workspace
│   ├── auth.action.ts
│   ├── berita.action.ts
│   ├── banner.action.ts
│   ├── home.action.ts
│   ├── kontak.action.ts
│   ├── layanan.action.ts
│   ├── pesan.action.ts
│   ├── potensi.action.ts
│   ├── search.action.ts
│   └── tentang-kami.action.ts
│
├── components/                  # React Components — FE workspace
│   ├── user/                   # Public-facing components
│   └── admin/                  # Admin CMS components
│
├── lib/                        # Utilities — BE workspace
│   ├── db.ts                  # Prisma singleton
│   ├── dictionary.ts          # Localization (i18n)
│   └── services/              # Business logic layer (reserved)
│
├── context/                    # React Context providers (FE extension)
│   └── LanguageContext.tsx
│
├── prisma/                     # Database Schema — BE workspace
│   ├── schema.prisma
│   └── seed.ts
│
├── public/                     # Static assets
│   ├── images/                # Hero images, potensi photos
│   ├── icons/                 # SVG icons
│   └── uploads/               # User-uploaded content
│
├── certificates/               # Local HTTPS certs (dev only, gitignored)
├── .docs/                      # ANF-Agentic Architecture documentation
└── README.md                   # Project entry point (start here)
```

> **⚠️ PENTING — Tidak ada `(user)/` route group di kode aktual.**  
> Public routes langsung di bawah `app/` (contoh: `app/berita/`, bukan `app/(user)/berita/`).  
> Route group `(user)/` hanya ada di dokumentasi lama — **sudah dihapus**.

**Workspace Separation:**
- **BE workspace** (`be/*` branch): `actions/`, `lib/`, `prisma/` — Server Actions, Prisma, services
- **FE workspace** (`fe/*` branch): `components/`, `app/` — UI components, pages, layouts
- **Integration** (`pr/*` branch): Merge BE + FE → test data contracts (props "holes")

---

## 🔐 5. Data Contracts (FE ↔ BE)

### ApiResponse Standard

All Server Actions must return this envelope:

```typescript
type ApiResponse<T> = {
  success: boolean;
  data?: T;          // On success
  errors?: ZodError[]; // On validation failure
  message?: string;   // On error
};
```

### Zod Validation (Mandatory)

Define Zod schema in Server Action, never trust client data.

```typescript
// actions/berita.action.ts
'use server';

import { z } from 'zod';

const CreateBeritaSchema = z.object({
  judul: z.string().min(5).max(200),
  isi: z.string().min(20),
  kategori: z.enum(['Umum', 'Kegiatan', 'Pengumuman']),
  gambar: z.string().url().optional(),
});

export async function createBerita(formData: FormData) {
  try {
    const { judul, isi, kategori, gambar } = CreateBeritaSchema.parse({
      judul: formData.get('judul'),
      isi: formData.get('isi'),
      kategori: formData.get('kategori'),
      gambar: formData.get('gambar'),
    });

    const berita = await prisma.kegiatan.create({ data: { judul, isi, kategori, gambar } });
    return { success: true, data: berita };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    return { success: false, message: "Terjadi kesalahan" };
  }
}
```

### Props Interface Contract

FE defines "hole" (props interface), BE fills with data.

**FE Component (UI only):**
```typescript
// components/user/BeritaCard.tsx
'use client';

export interface BeritaCardProps {
  judul: string;
  isi: string;
  gambar?: string;
  kategori: string;
  penulis: string;
  tanggal: string;
  slug: string;
}

export function BeritaCard({ judul, isi, gambar, kategori, penulis, tanggal, slug }: BeritaCardProps) {
  return (
    <article className="bg-white border rounded-lg overflow-hidden shadow-sm">
      {gambar && <img src={gambar} alt={judul} className="w-full h-48 object-cover" />}
      <div className="p-4">
        <span className="text-xs font-semibold text-brand-base uppercase">{kategori}</span>
        <h3 className="font-bold text-lg mt-1">{judul}</h3>
        <p className="text-sm text-text-muted mt-2 line-clamp-3">{isi}</p>
      </div>
    </article>
  );
}
```

**BE Server Action (data provider):**
```typescript
// actions/berita.action.ts
export async function getAllBerita(): Promise<ApiResponse<Berita[]>> {
  try {
    const raw = await prisma.kegiatan.findMany({
      where: { status: 'Aktif' },
      orderBy: { tanggal: 'desc' },
      take: 10,
    });

    const data = raw.map(b => ({
      judul: b.judul,
      isi: b.isi,
      gambar: b.gambar || '/images/default-news.png',
      kategori: b.kategori,
      penulis: b.penulis,
      tanggal: b.tanggal.toISOString(),
      slug: b.slug,
    }));

    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
```

**FE Page (orchestrator):**
```typescript
// app/berita/page.tsx
'use client';

import { getAllBerita } from '@/actions/berita.action';
import { BeritaCard } from '@/components/user/BeritaCard';

export default async function BeritaPage() {
  const { data: beritaList, success } = await getAllBerita();

  if (!success || !beritaList) {
    return <div className="p-8 text-center text-red-600">Gagal memuat berita</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {beritaList.map(berita => (
        <BeritaCard key={berita.slug} {...berita} />
      ))}
    </div>
  );
}
```

**Flow:**
```
BE (Server Action) → Fetch from DB → Map to FE props format
     ↓
FE (Page) → Call Server Action → Receive data
     ↓
FE (Component) → Receive props → Render UI (no logic)
```

---

## 🌐 6. Routing Conventions

> **Source of truth:** File paths verified via filesystem scan — 14 Mei 2026.

### Public Routes (User Portal)

| Route | File Path (Actual) | Data Source |
|-------|--------------------|-------------|
| `/` | `app/page.tsx` | Redirect → `/home` |
| `/home` | `app/home/page.tsx` | `home.action.ts` |
| `/berita` | `app/berita/page.tsx` | `berita.action.ts` → `getAllBerita()` |
| `/berita/[slug]` | `app/berita/[slug]/page.tsx` | `berita.action.ts` → `getBeritaBySlug(slug)` |
| `/potensi-desa` | `app/potensi-desa/page.tsx` | `potensi.action.ts` → `getAllPotensi()` |
| `/potensi-desa/[slug]` | `app/potensi-desa/[slug]/page.tsx` | `potensi.action.ts` → `getPotensiBySlug(slug)` |
| `/layanan` | `app/layanan/page.tsx` | `layanan.action.ts` → `getAllLayanan()` |
| `/kontak` | `app/kontak/page.tsx` | `kontak.action.ts` → `getContactInfo()` |
| `/tentang-kami` | `app/tentang-kami/page.tsx` | `tentang-kami.action.ts` |

### Admin Routes (Protected — JWT verified in `app/admin/layout.tsx`)

| Route | File Path (Actual) | Auth | Role |
|-------|--------------------|------|------|
| `/admin` | `app/admin/page.tsx` | ✅ | admin+ |
| `/admin/login` | `app/admin/(auth)/login/page.tsx` | ❌ public | — |
| `/admin/dashboard` | `app/admin/(dashboard)/dashboard/page.tsx` | ✅ | admin+ |
| `/admin/pesan-masuk` | `app/admin/(dashboard)/pesan-masuk/page.tsx` | ✅ | admin+ |
| `/admin/halaman/beranda` | `app/admin/halaman/beranda/page.tsx` | ✅ | admin+ |
| `/admin/halaman/beranda/sambutan` | `app/admin/halaman/beranda/sambutan/page.tsx` | ✅ | admin+ |
| `/admin/halaman/beranda/layanan-icon` | `app/admin/halaman/beranda/layanan-icon/page.tsx` | ✅ | admin+ |
| `/admin/halaman/berita` | `app/admin/halaman/berita/page.tsx` | ✅ | admin+ |
| `/admin/halaman/berita/daftar` | `app/admin/halaman/berita/daftar/page.tsx` | ✅ | admin+ |
| `/admin/halaman/potensi-desa` | `app/admin/halaman/potensi-desa/page.tsx` | ✅ | admin+ |
| `/admin/halaman/potensi-desa/daftar` | `app/admin/halaman/potensi-desa/daftar/page.tsx` | ✅ | admin+ |
| `/admin/halaman/layanan` | `app/admin/halaman/layanan/page.tsx` | ✅ | admin+ |
| `/admin/halaman/layanan/daftar` | `app/admin/halaman/layanan/daftar/page.tsx` | ✅ | admin+ |
| `/admin/halaman/kontak` | `app/admin/halaman/kontak/page.tsx` | ✅ | admin+ |
| `/admin/halaman/kontak/daftar` | `app/admin/halaman/kontak/daftar/page.tsx` | ✅ | admin+ |
| `/admin/halaman/tentang-kami` | `app/admin/halaman/tentang-kami/page.tsx` | ✅ | admin+ |
| `/admin/halaman/tentang-kami/teks` | `app/admin/halaman/tentang-kami/teks/page.tsx` | ✅ | admin+ |
| `/admin/halaman/tentang-kami/struktur` | `app/admin/halaman/tentang-kami/struktur/page.tsx` | ✅ | admin+ |
| `/admin/halaman/tentang-kami/statistik` | `app/admin/halaman/tentang-kami/statistik/page.tsx` | ✅ | admin+ |
| `/admin/settings` | `app/admin/settings/page.tsx` | ✅ | admin+ |
| `/admin/settings/manajemen-admin` | `app/admin/settings/manajemen-admin/page.tsx` | ✅ | **super only** |

---

## 🎨 7. Design System

### Design Tokens (non-negotiable)

**CSS Variables — `app/globals.css`:**
```css
:root {
  /* Brand Colors */
  --color-brand-dark: #0D47A1;   /* Deep Blue — Navigation, footers */
  --color-brand-base: #1565C0;   /* Interactive Blue — Buttons, links */

  /* Text Colors */
  --color-text-dark: #272727;    /* Solid Black — Headings & body */
  --color-text-muted: #7C7C7C;   /* Secondary Gray — Metadata */
}
```

### Typography — Plus Jakarta Sans

**Google Fonts import (`app/layout.tsx`):**
```typescript
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});
```

**Type Scale:**
| Element | Tailwind | Weight | Line Height |
|---------|----------|--------|-------------|
| H1 | `text-3xl` | `font-bold` (700) | `leading-tight` |
| H2 | `text-2xl` | `font-bold` (700) | `leading-snug` |
| Body | `text-base` | `font-normal` (400) | `leading-relaxed` |
| Small | `text-sm` | `font-normal` (400) | `leading-normal` |

**Color Usage:**
| Token | Usage |
|-------|-------|
| `brand-dark` | Navigation, footers, primary CTAs |
| `brand-base` | Buttons, links, hover states |
| `text-dark` | All heading & body text |
| `text-muted` | Metadata, timestamps, secondary |

---

## 🔑 8. Environment Variables

| Variable | Required? | Description |
|----------|-----------|-------------|
| `DATABASE_URL` | ✅ | Supabase/PostgreSQL pooled connection |
| `DIRECT_URL` | ✅ | Direct DB connection (for migrations) |
| `JWT_SECRET` | ✅ | Random 64-char secret for JWT signing |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Public URL (e.g., `https://wergu-wetan.id`) |

See `.env.example` for template.  
**⚠️ NEVER commit `.env` — use `.env.example` as template.**

---

## 🚀 9. File Ownership Matrix

| File/Folder | Owner Branch | Modify in Branch |
|-------------|--------------|------------------|
| `actions/*.action.ts` | BE | `be/*` |
| `lib/db.ts`, `lib/services/*` | BE | `be/*` |
| `prisma/schema.prisma` | BE | `be/*` |
| `components/*` | FE | `fe/*` |
| `app/(user)/*`, `app/admin/*` | FE | `fe/*` |
| `app/globals.css`, `tailwind.config.ts` | FE | `fe/*` |
| `next.config.ts` | DevOps | `main` atau `fe/*` (sensitif) |

---

## 🧪 10. Integration Testing Checklist (`pr/*`)

After merging BE + FE in `pr/*` branch:

**Automated (if test setup exists):**
```typescript
// tests/integration/berita.integration.test.ts
import { render, screen, waitFor } from '@testing-library/react';
import BeritaPage from '@/app/berita/page';
import { getAllBerita } from '@/actions/berita.action';

jest.mock('@/actions/berita.action');

describe('BeritaPage Integration', () => {
  it('should render news list from BE', async () => {
    const mockBerita = [{ id: 1, title: 'Test News', slug: 'test-news' }];
    (getAllBerita as jest.Mock).mockResolvedValue({ success: true, data: mockBerita });

    render(await BeritaPage());

    await waitFor(() => {
      expect(screen.getByText('Test News')).toBeInTheDocument();
    });
  });
});
```

**Manual testing checklist:**
- [ ] BE function returns data in FE props format
- [ ] FE component receives props and renders without error
- [ ] Data displays correctly (date formatting, image URLs)
- [ ] Client-side navigation works (Link components)
- [ ] Responsive breakpoints OK (mobile/tablet/desktop)

---

## 📚 11. Documentation & Agent Guidelines

### Core Documents (`.docs/`)

> **Entry point:** [`README.md`](../README.md) di root project — baca ini pertama kali.

| File | Audience | Purpose |
|------|----------|---------|
| **[`architecture.md`](.docs/architecture.md)** | Tech Leads, Architects | Master blueprint, ANF theory, branching strategy, data contracts |
| **[`backend-logic.md`](.docs/backend-logic.md)** | Backend devs, Agents | Server Actions pattern, Prisma queries, Zod validation, SSR |
| **[`frontend-ui.md`](.docs/frontend-ui.md)** | Frontend devs, Agents | Design system, Stitch workflow, component "hole" pattern |
| **[`security-policy.md`](.docs/security-policy.md)** | All developers | RLS, JWT, Zod validation, secrets management |
| **[`project-manifest.md`](.docs/project-manifest.md)** | All developers | Active file inventory, cleanup queue, feature coverage matrix |
| **[`roadmap.md`](.docs/roadmap.md)** | Product, Teams | Feature timeline, sprint planning, priorities |

### Agent Quick-Start (Antigravity/Claude Code)

**When asked to implement a feature:**
1. Read `architecture.md` first (branch context)
2. Check `backend-logic.md` for BE patterns OR `frontend-ui.md` for FE patterns
3. Follow "Service Pattern" for BE, "Hole Pattern" for FE
4. Enforce Zod validation + RLS policies (see `security-policy.md`)
5. Write integration tests in `pr/*` branch

**Prompt template:**
```
Follow ANF-Agentic Architecture:
- Branch: be/<feature> for backend, fe/<feature> for frontend
- Use Service Pattern: encapsulate DB queries in services/
- Use Server Actions: never create API routes
- Validate with Zod: define schema before DB ops
- Check Security: RLS enabled? JWT verified?
- Docs reference: .docs/backend-logic.md or .docs/frontend-ui.md
```

---

## 🏷️ 12. Document Control

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-04-15 | Initial draft | Kilo AI |
| 2.0 | 2026-05-05 | Verified against codebase | Kilo AI |
| 2.1 | 2026-05-14 | Restructured: ANF-Agentic Architecture | AlrafuruNotFound |
| 3.0 | 2026-05-14 | Removed duplicates, fixed numbering, consolidated sections | Kilo AI |
| **3.1** | **2026-05-14** | **Codebase audit: removed phantom `(user)/` route group, verified all actual routes, updated directory tree, deleted duplicate `.docs/README.md`** | **Antigravity** |

**Review Cadence:** Every sprint retro or major feature addition.  
**Approval:** Tech Lead sign-off required for any deviation.

---

**Last Review:** 14 Mei 2026 | **Status:** ✅ Verified Against Codebase v0.1.0  
**Owner:** Engineering Team | **Next Review:** Sprint Planning

**Note:** This architecture document is the living source of truth. Update when structure changes.
