# 🏗️ ANF-Agentic Architecture — Master Blueprint

**Portal Web Terpadu Kelurahan Wergu Wetan**

> *"AlrafuruNotFound-Agentic Architecture for Modular Development"*

**Created by:** [AlrafuruNotFound](https://github.com/AlrafuruNotFound) | **Version:** 2.0  
**Last Updated:** 14 Mei 2026 | **Status:** ✅ Verified Against Codebase v0.1.0

---

## 📜 Opening Statement

Dokumen ini adalah **definitive source of truth** untuk arsitektur aplikasi yang meng implementasikan **ANF-Agentic Architecture** — pendekatan architecture yang dirancang untuk kolaborasi antara human developers dan AI agents (Antigravity, Claude Code, dll.).

**Core Philosophy:** Modular struktur + Agentic branching (`be/*`, `fe/*`, `pr/*`) + explicit data contracts = scalable, testable, AI-friendly development.

---

## 📌 1. Ringkasan Proyek

| Aspek | Detail |
|-------|--------|
| **Nama** | Portal Web Terpadu Kelurahan Wergu Wetan |
| **Tujuan** | E-Government platform — transparansi, layanan publik digital |
| **Tagline** | Birokrasi Modern, Profesional, Inklusif, Dinamis |
| **Architecture** | **ANF-Agentic** (Vertical Slice + Agentic Branching) |
| **Stack** | Next.js 16.1.6 + React 19 + TypeScript 5 + Tailwind v4 |
| **Database** | PostgreSQL (Supabase) + Prisma ORM 5.10.2 |
| **Auth** | JWT (jose HS256, 24h) + HTTP-only cookies |
| **Status** | ✅ v0.1.0 — Production Ready |

---

## 📐 2. Filosofi Arsitektur

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

**Prinsip:**
- ✅ **Full-stack monolith** — FE + BE dalam satu codebase
- ✅ **Vertical slice** — Group by domain (`berita/`, `potensi-desa/`, not by `controller/`, `service/`)
- ✅ **No API Routes** — ~99% logic di Server Actions
- ✅ **Stateless auth** — JWT, no session store
- ✅ **CSS Variables theming** — Tailwind v4 custom properties

---

## 📁 3. Struktur Direktori (High-Level)

```
wergu-wetan-app/
├── app/                      # Next.js App Router (Routes + Layouts)
│   ├── (user)/              # Public portal (user-facing)
│   ├── admin/               # Protected CMS dashboard
│   ├── api/                 # Minimal — only for Excel template download
│   ├── globals.css          # Tailwind + CSS custom properties
│   └── tw-safelist.txt      # VITAL — dynamic Tailwind classes
│
├── actions/                 # Server Actions (Backend Logic)
│   ├── auth.action.ts
│   ├── berita.action.ts
│   ├── potensi.action.ts
│   └── ...
│
├── components/              # React Components (UI Layer)
│   ├── user/               # Public-facing components
│   └── admin/              # Admin dashboard components
│
├── lib/                    # Utilities + Helpers
│   ├── db.ts              # Prisma singleton
│   └── auth-utils.ts
│
├── prisma/                 # Database Schema + Seeding
│   ├── schema.prisma
│   └── seed.ts
│
└── public/                 # Static assets
    ├── images/
    └── icons/
```

---

## 🔐 4. Data Contracts (FE ↔ BE)

### Request/Response Standards

All Server Actions must return this envelope:

```typescript
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  errors?: ZodError[];
  message?: string;
};
```

### Zod Schemas (Frontend Validation)

**Rule:** Define Zod schema in Server Action, NEVER trust client data.

```typescript
// actions/berita.action.ts
const CreateBeritaSchema = z.object({
  judul: z.string().min(5).max(200),
  isi: z.string().min(20),
  kategori: z.enum(['Umum', 'Kegiatan', 'Pengumuman']),
  gambar: z.string().url().optional(),
});

export async function createBerita(input: unknown) {
  const validated = CreateBeritaSchema.parse(input);
  // ... proceed with Prisma
}
```

---

## 🌐 5. Routing Conventions

### Public Routes (User Portal)

| Route | Handler | Data Source |
|-------|---------|-------------|
| `/home` | `app/(user)/home/page.tsx` | `home.action.ts` |
| `/berita` | `app/(user)/berita/page.tsx` | `berita.action.ts.getAllBerita()` |
| `/berita/[slug]` | `app/(user)/berita/[slug]/page.tsx` | `berita.action.ts.getBeritaBySlug(slug)` |
| `/potensi-desa` | `app/(user)/potensi-desa/page.tsx` | `potensi.action.ts.getAllPotensi()` |
| `/kontak` | `app/(user)/kontak/page.tsx` | `kontak.action.ts.getContactInfo()` |

### Admin Routes (Protected)

| Route | Auth Required | Role | Layout |
|-------|--------------|------|--------|
| `/admin/dashboard` | ✅ | admin+ | `app/admin/layout.tsx` (JWT verify) |
| `/admin/halaman/berita` | ✅ | admin+ | AdminShell |
| `/admin/halaman/potensi-desa` | ✅ | admin+ | AdminShell |
| `/admin/halaman/tentang-kami` | ✅ | admin+ | AdminShell |
| `/admin/settings/manajemen-admin` | ✅ | **super only** | AdminShell + RBAC |

---

## 🎨 6. Design System (Source of Truth)

### Design Tokens (non-negotiable)

**CSS Variables — `app/globals.css`:**
```css
:root {
  /* Brand Colors */
  --color-brand-dark: #0D47A1;   /* Deep Blue */
  --color-brand-base: #1565C0;   /* Interactive Blue */

  /* Text Colors */
  --color-text-dark: #272727;    /* Solid Black */
  --color-text-muted: #7C7C7C;   /* Secondary Gray */
}
```

**Typography — Plus Jakarta Sans (Google Fonts)**
- H1: 3xl (2.25rem), bold (700), line-height: tight
- H2: 2xl (1.5rem), bold (700), line-height: snug
- Body: base (1rem), normal (400), line-height: relaxed
- Small: sm (0.875rem), normal (400)

**Color Palette Usage:**
| Token | Usage |
|-------|-------|
| `brand-dark` | Navigation, footers, primary CTAs |
| `brand-base` | Buttons, links, interactive states |
| `text-dark` | All heading & body text |
| `text-muted` | Metadata, timestamps, secondary info |

---

## 🔑 7. Environment Variables (Required)

**`.env` (local) → CI/CD Secrets (production):**

```bash
# Database (Supabase)
DATABASE_URL="postgresql://user:pass@host:5432/db?pgbouncer=true"
DIRECT_URL="postgresql://user:pass@host:5432/db?schema=public"

# Authentication
JWT_SECRET="random-64-chars-secret"

# Public Site URL
NEXT_PUBLIC_SITE_URL="https://wergu-wetan.id"
```

**⚠️ NEVER commit `.env` — use `.env.example` as template.**

---

## 🚀 8. Branching Strategy & Deployment

### Git Workflow

```
main          → Production-ready (only PR merge)
develop       → Integration branch (staging)
feature/*     → New features (FE/BE)
hotfix/*      → Emergency patches
```

**Deployment:** Vercel (recommended) → auto-deploy from `main`  
**Database Migrations:** `npx prisma migrate deploy` (manual hook on Vercel)

---

## 🌿 4. Branching Strategy & Git Workflow

### Branch Types & Purpose

| Branch | Fokus | Tujuan | Output |
|--------|-------|--------|--------|
| **`be/*`** | Backend (SSR, Server Actions, Services) | Implement logic di `actions/`, `services/`, `lib/` | Fungsi siap pakai: `getUserData()`, `updateProfile()`, dll |
| **`fe/*`** | Frontend (UI/UX, Components, Layout) | Ambil desain dari Stitch → komponen React "lubang" (props) | UI dengan "holes" untuk data, tanpa logic |
| **`pr/*`** | Integration Bridge (BE + FE merge) | Testing UI + Logic connection | Komponen terintegrasi, data flow nyata |
| **`main`** | Production-ready | Kode stabil, teruji, siap deploy | Release |

### Branch Lifecycle

```
[be/feature-x]     [fe/feature-x]       [pr/feature-x]         [main]
     ↓                   ↓                    ↓                     ↓
[Server Actions] + [UI Components] → [Integration Test] → [Release]
     ↓                   ↓                    ↓                     ↓
[BE Logic done] + [FE UI done] → [Data binding test] → [Deploy]
```

**Rules:**
- ✅ **BE (be/)** — Hanya edit `actions/`, `services/`, `lib/`. Tidak touch `components/` atau `app/` (kecuali wrapper).
- ✅ **FE (fe/)** — Hanya edit `components/`, `app/` (layout, pages). Tidak touch `actions/` atau `lib/`.
- ✅ **PR (pr/)** — Merge be + fe → test full flow → jika OK, merge ke main.
- ❌ **Never** develop langsung ke `main` (except hotfix `hotfix/*`).

### Branching Naming Convention

| Type | Format | Example |
|------|--------|---------|
| Feature (BE) | `be/<domain>-<desc>` | `be/berita-crud` |
| Feature (FE) | `fe/<domain>-<desc>` | `fe/berita-card-ui` |
| Integration | `pr/<domain>-<desc>` | `pr/berita-full-integration` |
| Hotfix | `hotfix/<desc>` | `hotfix/login-cookie-bug` |

---

## 🔄 5. Integration Pattern: BE → FE Data Flow

### The "Hole" Pattern (FE Components)

**FE berfungsi membuat "lubang" (props interface) untuk data:**

```typescript
// components/user/BeritaCard.tsx (FE — no data fetching)
'use client';

export interface BeritaCardProps {
  // "Lubang" untuk data dari BE
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
    <div className="border rounded-xl p-4">
      <h3 className="font-bold text-lg">{judul}</h3>
      <p className="text-sm text-text-muted">{isi.substring(0, 100)}...</p>
      {/* ... UI saja, tidak ada logic database */}
    </div>
  );
}
```

**BE mengirim data ke "lubang" ini via Server Actions:**

```typescript
// actions/berita.action.ts (BE — Server Action)
export async function getAllBerita() {
  'use server';
  const beritaList = await prisma.kegiatan.findMany({
    where: { status: 'Aktif' },
    orderBy: { tanggal: 'desc' },
    take: 10,
  });

  // Map to FE format (props interface)
  return {
    success: true,
    data: beritaList.map(b => ({
      judul: b.judul,
      isi: b.isi,
      gambar: b.gambar,
      kategori: b.kategori,
      penulis: b.penulis,
      tanggal: b.tanggal.toISOString(),
      slug: b.slug,
    })),
  };
}
```

**FE page memanggil BE dan passing ke component:**

```typescript
// app/berita/page.tsx (FE — Client Component wrapper)
'use client';
import { BeritaCard } from '@/components/user/BeritaCard';
import { getAllBerita } from '@/actions/berita.action';

export default async function BeritaPage() {
  const { data: beritaList } = await getAllBerita();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {beritaList.map(berita => (
        <BeritaCard key={berita.slug} {...berita} />
      ))}
    </div>
  );
}
```

**Flow singkat:**
```
BE (Server Action) → Fetch data from DB → Map to FE props format
     ↓
FE (Page) → Call Server Action → Receive data
     ↓
FE (Component) → Receive props → Render UI (no logic)
```

---

## 🎯 6. Separation of Concerns: BE vs FE

### BE Responsibility (Service Layer Pattern)

**What belongs in `actions/` and `lib/services/`:**

| Concern | Location | Example |
|---------|----------|---------|
| Database queries | `actions/` | `prisma.kegiatan.findMany()` |
| Business logic | `actions/` | Validation, transformation, calculations |
| Authentication | `actions/auth.action.ts` | Login, logout, token verify |
| Data formatting | `actions/` | Map DB fields → FE props format |
| External API calls | `lib/services/` | Third-party integrations |

**ExAMPLE: Service function (BE)**
```typescript
// lib/services/berita.service.ts (BE only)
export class BeritaService {
  static async getLatestNews(limit = 10) {
    const news = await prisma.kegiatan.findMany({
      where: { status: 'Aktif' },
      orderBy: { tanggal: 'desc' },
      take: limit,
    });

    // Format untuk FE consumption (mapping ke frontend format)
    return news.map(n => ({
      id: n.id,
      title: n.judul,
      content: n.isi,
      imageUrl: n.gambar || '/images/default-news.png',
      category: n.kategori,
      author: n.penulis,
      publishedAt: n.tanggal.toISOString(),
      slug: n.slug,
    }));
  }
}
```

### FE Responsibility (Presentation Layer)

**What belongs in `components/` and `app/`:**

| Concern | Location | Example |
|---------|----------|---------|
| UI rendering | `components/` | HTML, Tailwind classes |
| User interactions | `components/` | onClick, onChange handlers |
| Client-side state | `components/` | useState, useEffect (UI only) |
| Page composition | `app/` | Layout, page wrappers |
| Calling Server Actions | `app/` | `await getAllBerita()` |

**Example: Pure UI component (FE)**
```typescript
// components/user/BeritaCard.tsx (FE only — no DB logic)
'use client';

export function BeritaCard({ title, content, imageUrl, category }: BeritaCardProps) {
  // No database calls here
  return (
    <article className="bg-white border rounded-lg overflow-hidden shadow-sm">
      {imageUrl && <img src={imageUrl} alt={title} />}
      <div className="p-4">
        <span className="text-xs font-semibold text-brand-base uppercase">{category}</span>
        <h3 className="font-bold text-lg mt-1">{title}</h3>
        <p className="text-sm text-text-muted mt-2 line-clamp-3">{content}</p>
      </div>
    </article>
  );
}
```

---

## 🧩 7. Data Contract: BE Output ←→ FE Input

### Props Interface Contract

**Contract zwischen BE dan FE:**

File: `types/index.ts` (shared types)
```typescript
export interface Berita {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  category: 'Umum' | 'Kegiatan' | 'Pengumuman';
  author: string;
  publishedAt: string; // ISO date string
  slug: string;
}
```

**BE (`actions/berita.action.ts`):**
```typescript
import type { Berita } from '@/types';

export async function getAllBerita(): Promise<ApiResponse<Berita[]>> {
  const raw = await prisma.kegiatan.findMany(...);
  return {
    success: true,
    data: raw.map(mapToBerita), // map ke Berita interface
  };
}
```

**FE (`app/berita/page.tsx`):**
```typescript
import type { Berita } from '@/types';
import { getAllBerita } from '@/actions/berita.action';
import { BeritaCard } from '@/components/user/BeritaCard';

export default async function BeritaPage() {
  const { data } = await getAllBerita();
  // data: Berita[] — type safe

  return (
    <>
      {data?.map(berita => (
        <BeritaCard key={berita.id} {...berita} />
      ))}
    </>
  );
}
```

**Benefits:**
- ✅ **Type safety** — TypeScript checks at compile time
- ✅ **Single source of truth** — types in one place
- ✅ **No runtime mapping errors** — BE output matches FE props

---

## 🏗️ 8. Folder Structure per Branch Workflow

```
wergu-wetan-app/
├── be/                            # Backend codebase
│   ├── actions/                   # Server Actions (FE calls these)
│   ├── lib/services/              # Business logic services
│   ├── lib/repositories/          # DB access layer (optional)
│   └── types/                     # Shared type definitions
├── fe/                            # Frontend codebase
│   ├── components/                # UI components (no data fetching)
│   ├── app/                      # Next.js pages + layouts
│   └── hooks/                    # Custom React hooks (UI state only)
├── pr/                            # Integration workspace (merged BE+FE)
│   ├── components/                # Components with BE integration
│   ├── app/                      # Pages with Server Action calls
│   └── tests/                    # Integration tests
└── main/                          # Production (merged final)
```

**Note:** This is logical separation, not physical. In this project, `actions/` and `components/` are at root, but conceptually they belong to `be/` and `fe/` respectively.

---

## 📊 9. File Ownership Matrix

| File/Folder | Owner Branch | Modify di Branch |
|-------------|--------------|-----------------|
| `actions/*.action.ts` | BE | `be/*` |
| `lib/db.ts`, `lib/services/*` | BE | `be/*` |
| `prisma/schema.prisma` | BE | `be/*` |
| `components/*` | FE | `fe/*` |
| `app/(user)/*`, `app/admin/*` | FE | `fe/*` |
| `app/globals.css`, `tailwind.config.ts` | FE | `fe/*` |
| `next.config.ts` | DevOps | `main` atau `fe/*` (tapi sensitif) |

---

## 🧪 10. Integration Testing Checklist (pr/*)

Setelah merge BE + FE di branch `pr/`:

```typescript
// tests/integration/berita.integration.test.ts
import { render, screen, waitFor } from '@testing-library/react';
import BeritaPage from '@/app/berita/page';
import { getAllBerita } from '@/actions/berita.action';

// Mock Server Action
jest.mock('@/actions/berita.action');

describe('BeritaPage Integration', () => {
  it('should render news list from BE', async () => {
    const mockBerita = [
      {
        id: 1,
        title: 'Test News',
        content: 'Test content',
        imageUrl: null,
        category: 'Umum',
        author: 'Admin',
        publishedAt: new Date().toISOString(),
        slug: 'test-news',
      },
    ];

    (getAllBerita as jest.Mock).mockResolvedValue({
      success: true,
      data: mockBerita,
    });

    render(await BeritaPage());

    await waitFor(() => {
      expect(screen.getByText('Test News')).toBeInTheDocument();
    });
  });
});
```

**Manual testing checklist:**
- [ ] BE function returns data in FE props format
- [ ] FE component receives props dan render tanpa error
- [ ] Data display correctly (date formatting, image URLs)
- [ ] Client-side navigation works (Link components)
- [ ] Responsive breakpoints OK

---

## 🚀 11. Workflow Example: Fitur "Buat Berita"

```
Step 1 — BE (be/berita-create):
  ├── Buat Server Action: createBerita(input: CreateBeritaInput)
  ├── Zod validation
  ├── prisma.kegiatan.create()
  ├── Return { success: true, data: berita }
  └─ Merge ke develop → ke pr/berita-create

Step 2 — FE (fe/berita-create-ui):
  ├── Buat form component: BeritaForm.tsx
  ├── Input fields (judul, isi, kategori, gambar)
  ├── Submit → call createBerita() from actions
  └─ Merge ke develop → ke pr/berita-create-ui

Step 3 — PR (pr/berita-full):
  ├── Git merge: be/berita-create + fe/berita-create-ui
  ├── Test form submit → BE creates → DB → redirect
  ├── Fix any prop mismatches
  └─ Merge ke develop (untuk staging) → main (production)
```

---

## 📚 12. Conflict Resolution Strategy

**Common conflicts & solutions:**

| Conflict | Golongan | Solusi |
|----------|----------|--------|
| BE ubah interface, FE belum | `be/*` vs `fe/*` | Update BE, notify FE, lock BE changes until FE ready |
| FE ubah styling, BE fetch logic | `fe/*` vs `be/*` | Isolated — tidak conflict karena different layers |
| Integration test fail di `pr/*` | Both | BE dev fix data format, FE dev fix props consumption |
| Rename field (FE req) | Minimal risk | Add new field + optional, deprecate old gradually |

---

## 🏷️ 13. Status & Review

| Branch | Owner | Review Cadence |
|--------|-------|----------------|
| `be/*` | Backend Team | Daily standup sync |
| `fe/*` | Frontend Team | Daily standup sync |
| `pr/*` | Both Teams | Integration review (3x/week) |
| `main` | Tech Lead | Release approval |

**Merging gate:**
- ✅ BE unit tests pass
- ✅ FE visual QA pass (Figma match)
- ✅ Integration tests pass (`pr/`)
- ✅ Code review by both BE & FE devs

---

**Last Review:** 14 Mei 2026 | **Status:** ✅ Implemented  
**Owner:** Engineering Team | **Next Review:** SprintPlanning

Note: This branching strategy assumes small-to-medium sized team (3-5 devs). Adjust if scaling.
