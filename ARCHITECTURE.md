# Arsitektur & Design System - Portal Kelurahan Wergu Wetan

Dokumen ini adalah panduan definitif arsitektur dan sistem desain untuk portal web Kelurahan Wergu Wetan. Didasarkan pada analisis mendalam codebase actual (bukan asumsi), dokumen ini berfungsi sebagai "single source of truth" untuk semua pengembangan aplikasi.

**Terakhir diperbarui:** 5 Mei 2026 | **Status:** Verified Against Codebase v0.1.0

---

## 1. Ringkasan Proyek & Tujuan

**Nama Proyek:** Portal Web Terpadu Kelurahan Wergu Wetan  
**Tujuan Utama:** Menghadirkan platform layanan publik digital (E-Government) yang transparan, profesional, inklusif, dan berkinerja tinggi.

**Tagline Desain:** Birokrasi Modern, Profesional, Inklusif, dan Dinamis

---

## 2. Paradigma Arsitektur: Vertical Slice Monolith

Proyek ini mengimplementasikan **Vertical Slice Architecture** dengan monolith modern berbasis **Next.js App Router**.

### Filosofi Arsitektur

- **Full-Stack Monolith:** Frontend (React Client Components) dan Backend (Server Actions, Database Layer) berjalan dalam satu Next.js runtime yang sama tanpa pemisahan service terpisah.
- **Vertical Slice (Fitur-Centric):** Setiap fitur dikelompokkan secara vertikal berdasarkan domain bisnis (contoh: "berita", "potensi-desa", "layanan"), bukan berdasarkan layer teknis (controller/service/repository).
- **Server Actions sebagai Primary Pattern:** Semua operasi backend (validasi, autentikasi, database mutations) dieksekusi melalui Next.js Server Actions (`use server`) dengan Prisma ORM, bukan traditional API Routes.

### Data Flow Diagram (Konseptual)

```
User Action (UI) 
    ↓
Client Component (React)
    ↓
Server Action ("use server", Zod validation)
    ↓
Prisma ORM
    ↓
PostgreSQL Database (Supabase)
    ↓
Response → Client Component → UI Update
```

---

## 3. Teknologi & Stack (Verified)

### Framework & Runtime

| Komponen | Versi | Catatan |
|----------|-------|---------|
| **Next.js** | 16.1.6 | App Router, Server Actions, edge runtime |
| **React** | 19.2.3 | Client & Server Components |
| **TypeScript** | 5.x | Strict mode untuk type safety |
| **Node.js** | 18+ | Runtime untuk server-side execution |

### Styling & UI

| Komponen | Versi | Catatan |
|----------|-------|---------|
| **Tailwind CSS** | v4 (PostCSS) | CSS Variables untuk theming |
| **Lucide React** | 0.563.0 | Icon library untuk UI components |
| **Framer Motion** | 12.30.0 | Animasi & motion components |
| **React Hot Toast** | 2.6.0 | Notification system |
| **React to Print** | 3.3.0 | Export/print functionality |

### Database & ORM

| Komponen | Versi | Catatan |
|----------|-------|---------|
| **PostgreSQL** | Latest (Supabase) | Primary data store |
| **Prisma ORM** | 5.10.2 | Type-safe database client |
| **Connection Pooling** | Supabase PgBouncer | Production connection management |

### Authentication & Security

| Komponen | Versi | Detail |
|----------|-------|--------|
| **JWT (jose)** | 6.2.3 | HS256, 24-hour expiration |
| **Password Hashing** | bcryptjs 3.0.3 | BCRYPT algorithm |
| **HTTP-Only Cookies** | Next.js native | Secure token storage |
| **Session Management** | admin_token cookie | Domain-scoped, sameSite: lax |

### Utilities & Libraries

| Library | Versi | Penggunaan |
|---------|-------|-----------|
| **zod** | 4.3.6 | Runtime schema validation untuk Server Actions |
| **date-fns** | 4.1.0 | Date manipulation & formatting |
| **xlsx** | 0.18.5 | Excel file import/export |
| **use-debounce** | 10.1.1 | Debounced search input |

### Development Tools

| Tool | Versi | Catatan |
|------|-------|---------|
| **ESLint** | 9.x | Code quality & linting |
| **Prettier** | 3.8.3 | Code formatting |
| **Prettier Tailwind Plugin** | Latest | Automatic class sorting |

---

## 4. Struktur Direktori & Konvensi Kode

Struktur proyek mengikuti prinsip **clarity, single responsibility, dan scalability**.

```
wergu-wetan-app/
├── app/                          # Next.js App Router - Routing & Layout Layer
│   ├── (user)/                   # User-facing routes (public portal)
│   │   ├── home/
│   │   ├── tentang-kami/
│   │   ├── layanan/
│   │   ├── kontak/
│   │   ├── berita/
│   │   ├── potensi-desa/
│   │   └── layout.tsx            # Root layout (TopBar, Navigation)
│   ├── admin/                    # Protected admin routes (CMS Dashboard)
│   │   ├── (auth)/login/         # Login page (public route within admin/)
│   │   ├── dashboard/
│   │   ├── halaman/              # Content management routes
│   │   ├── settings/             # Admin configuration routes
│   │   ├── layout.tsx            # Admin shell (JWT verification, role checking)
│   │   ├── AdminShell.tsx        # Admin UI layout component
│   │   └── loading.tsx           # Admin-wide loading skeleton
│   ├── api/                      # Minimal API routes (only for binary/download)
│   │   └── template/stats/       # Excel template download endpoint
│   ├── globals.css               # Tailwind directives & CSS variable definitions
│   ├── layout.tsx                # Root layout (metadata, fonts, context)
│   ├── tw-safelist.txt           # Safelist untuk Tailwind v4 dynamic classes
│   └── sitemap.ts                # Dynamic sitemap generation (SEO)
│
├── actions/                      # Server Actions - Backend Logic Layer
│   ├── auth.action.ts            # Login/logout/session management
│   ├── berita.action.ts          # Kegiatan (news/activities) CRUD
│   ├── potensi.action.ts         # PotensiDesa CRUD
│   ├── home.action.ts            # Homepage data & stats
│   ├── tentang-kami.action.ts    # Profile & organizational content
│   ├── banner.action.ts          # Banner management
│   ├── layanan.action.ts         # Service management
│   ├── kontak.action.ts          # Contact settings
│   ├── pesan.action.ts           # Incoming messages
│   └── search.action.ts          # Global full-text search
│
├── components/                   # React Components - UI Layer
│   ├── user/                     # Public portal components
│   │   ├── Navbar.tsx
│   │   ├── TopBar.tsx
│   │   ├── ClientLayout.tsx
│   │   ├── Footer.tsx
│   │   ├── HomeView.tsx
│   │   ├── BeritaView.tsx
│   │   ├── GlobalSearchModal.tsx
│   │   ├── HeroCarousel.tsx
│   │   └── ... (detail views, content components)
│   │
│   ├── admin/                    # Admin dashboard components
│   │   ├── AdminShell.tsx        # Main admin layout wrapper
│   │   ├── AdminSidebar.tsx      # Navigation menu
│   │   ├── AdminHeader.tsx       # Top bar with user info
│   │   ├── CommandPalette.tsx    # Cmd+K search interface
│   │   ├── AdminBannerManager.tsx
│   │   ├── AdminLayananManager.tsx
│   │   ├── AdminBeritaManager.tsx
│   │   └── ... (CRUD modals & forms)
│   │
│   └── ui/                       # PLANNED: Primitive/base components
│       └── (Currently mixed within admin/ and user/)
│
├── context/                      # React Context Providers
│   └── LanguageContext.tsx       # Multi-language support (ID, EN, JW)
│
├── lib/                          # Utilities & Helpers
│   ├── db.ts                     # Prisma client singleton
│   ├── dictionary.ts             # i18n translations
│   ├── auth-utils.ts            # Authentication utilities
│   └── ... (helper functions)
│
├── prisma/                       # Database Schema & Seeding
│   ├── schema.prisma             # Prisma data model definition
│   └── seed.ts                   # Initial database seeding script
│
├── public/                       # Static assets
│   ├── images/                   # Hero/banner images
│   ├── icons/                    # UI icons
│   └── docs/                     # Static documents (PDFs, etc.)
│
├── .kilo/                        # Kilo CLI configuration
│   ├── command/                  # Custom CLI commands
│   └── agent/                    # Custom agents
│
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint configuration
├── .prettierrc                  # Prettier formatting rules
├── .env                         # Environment variables (local)
├── .env.example                 # Environment template (check-in safe)
└── .gitignore                   # Git ignore rules

```

### Aturan Kebersihan Kode

1. **Skrip Sekali Pakai**: Skrip eksekusi satu kali (misal: data migration, bulk operations) harus dihapus setelah selesai dijalankan.
2. **Build Artifacts**: Folder `.next/` dan `node_modules/` tidak di-commit ke git.
3. **Environment Secrets**: File `.env` dengan credentials tidak di-commit; gunakan `.env.example` sebagai template.
4. **Safelist Tailwind**: File `app/tw-safelist.txt` adalah VITAL dan tidak boleh dihapus (menyimpan dynamic classes untuk dangerouslySetInnerHTML).

---

## 5. Database Schema & Prisma Models

### Tabel Utama (14 Models)

#### Content Management (Konten Publik)

**`Kegiatan` (News/Activities/Announcements)**
```prisma
model Kegiatan {
  id        Int      @id @default(autoincrement())
  judul     String   // Article/activity title
  slug      String   @unique // URL-friendly identifier
  isi       String   @db.Text // Article body (rich text/HTML)
  gambar    String?  // Featured image URL
  kategori  String   @default("Umum") // Category: "Umum", "Kegiatan", "Pengumuman"
  penulis   String   @default("Admin") // Author name
  status    String   @default("Aktif") // Status: "Aktif", "Draft", "Arsip"
  tanggal   DateTime @default(now()) // Publication date
  updatedAt DateTime @updatedAt // Last modification
  @@map("kegiatan")
}
```

**`PotensiDesa` (Village Potential/UMKM Directory)**
```prisma
model PotensiDesa {
  id               Int      @id @default(autoincrement())
  judul            String   // Business/potential name
  slug             String   @unique
  deskripsiSingkat String   @db.Text // Short description
  isi              String   @db.Text // Full description
  kategori         String   @default("UMKM") // Category: "UMKM", "Budaya", "Pertanian"
  gambar           String?  // Featured image
  penulis          String   @default("Admin")
  status           String   @default("Aktif")
  tanggal          DateTime @default(now())
  updatedAt        DateTime @updatedAt
  @@map("potensidesa")
}
```

#### Homepage Configuration

**`HomeService` (Layanan yang ditampilkan di homepage)**
```prisma
model HomeService {
  id      Int    @id @default(autoincrement())
  title   String // Service name
  iconURL String // Icon URL or CSS class
  @@map("homeservice")
}
```

**`HomeStatistic` (Statistics/stats di homepage)**
```prisma
model HomeStatistic {
  id    Int     @id @default(autoincrement())
  label String  // Statistic label (e.g., "Penduduk")
  value String  // Numeric value (e.g., "25,000")
  icon  String? // Icon name or URL
  @@map("homestatistic")
}
```

**`HomeWelcome` (Sambutan Lurah/Welcome Message)**
```prisma
model HomeWelcome {
  id        Int     @id @default(autoincrement())
  namaLurah String  // Head of village name
  konten    String  @db.Text // Welcome message content
  fotoURL   String? // Photo of the head
  @@map("homewelcome")
}
```

**`BannerHomepage` (Hero carousel banners)**
```prisma
model BannerHomepage {
  id        Int      @id @default(autoincrement())
  tagline   String?  // Subheading
  judul     String?  // Main title
  deskripsi String?  // Description
  gambarURL String   // Banner image URL
  halaman   String   @default("home") // Page: "home", "tentang-kami", etc.
  createdAt DateTime @default(now())
  @@map("bannerhomepage")
}
```

#### Organization & Profile

**`PerangkatDesa` (Organizational Structure)**
```prisma
model PerangkatDesa {
  id        Int      @id @default(autoincrement())
  nama      String   // Official name
  jabatan   String   // Position/title
  nip       String?  // Employee ID
  foto      String?  // Photo URL
  urutan    Int      @default(100) // Display order
  createdAt DateTime @default(now())
  @@map("perangkatdesa")
}
```

**`ProfilKonten` (About Page Content)**
```prisma
model ProfilKonten {
  id        Int      @id @default(autoincrement())
  kategori  String   @unique // Type: "visi", "misi", "sejarah", "tugas-fungsi"
  judul     String   // Content title
  isi       String   @db.Text // Content body
  updatedAt DateTime
  @@map("profilkonten")
}
```

**`SiteConfig` (Global Site Configuration)**
```prisma
model SiteConfig {
  id        Int      @id @default(autoincrement())
  key       String   @unique // Config key: "alamat", "telp", "email", "jam-kerja"
  value     String   @db.Text // Config value
  updatedAt DateTime
  @@map("siteconfig")
}
```

#### Operational Data

**`PengajuanSurat` (Letter Request Application)**
```prisma
model PengajuanSurat {
  id         Int      @id @default(autoincrement())
  nama       String   // Applicant name
  nik        String   // National ID
  jenisSurat String   // Letter type: "SKCK", "Domisili", etc.
  status     String   @default("Pending") // Status: "Pending", "Approved", "Rejected"
  whatsapp   String   // Contact number
  createdAt  DateTime @default(now())
  @@map("pengajuansurat")
}
```

**`PesanMasuk` (Incoming Messages)**
```prisma
model PesanMasuk {
  id        Int      @id @default(autoincrement())
  nama      String   // Sender name
  whatsapp  String   // Sender phone
  pesan     String   @db.Text // Message content
  status    String   @default("Belum Dibaca") // "Belum Dibaca", "Dibaca", "Direspons"
  createdAt DateTime @default(now())
  @@map("pesanmasuk")
}
```

#### System & Access Control

**`Admin` (Admin User Accounts)**
```prisma
model Admin {
  id           Int      @id @default(autoincrement())
  username     String   @unique // Login username
  passwordHash String   // Bcrypt hashed password
  role         String   @default("admin") // "admin" (Petugas Biasa) | "super" (Super Admin)
  namaLengkap  String   // Full name
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  @@map("admin")
}
```

#### Deprecated/Legacy

**`Umkm`** (⚠️ Unused - functionality moved to PotensiDesa)
**`Penduduk`** (⚠️ Legacy resident data - not actively used)

### Database Characteristics

- **Primary Database:** PostgreSQL (via Supabase)
- **Connection Method:** Supabase PgBouncer (Connection Pooling)
- **Prisma Client:** Type-safe ORM with auto-completion
- **Migrations:** Tracked via `prisma/migrations/` directory
- **Seed Script:** `prisma/seed.ts` untuk inisialisasi data default

---

## 6. Authentication & Authorization

### Implementasi Actual (Bukan Traditional Middleware)

⚠️ **Penting:** ARCHITECTURE.md v1 mengklaim middleware.ts menangani JWT verification. **Ini adalah hallucination.** Codebase actual tidak punya middleware.ts. Verification terjadi di **layout-level**.

### Auth Flow

```
1. User Login (POST /admin/login)
   ↓
2. Credentials ke auth.action.ts → bcrypt verify
   ↓
3. JWT token generation (jose HS256, 24h expiration)
   ↓
4. Set HTTP-Only cookie: "admin_token"
   ↓
5. Redirect to /admin/dashboard
   ↓
6. Each admin page load: app/admin/layout.tsx reads cookie & verifies JWT
   ↓
7. Token valid? → Extract role → Pass to AdminShell component
   ↓
8. Invalid/expired? → Role defaults to "admin" (least privilege)
```

### JWT Token Details

| Aspek | Value | Catatan |
|-------|-------|---------|
| **Algorithm** | HS256 | HMAC SHA-256 |
| **Secret** | process.env.JWT_SECRET | Fallback: 'sangat-rahasia-sekali' (dev only) |
| **Expiration** | 24h (86400 seconds) | Absolute exp, no refresh mechanism |
| **Payload** | `{id, username, role, iat, exp}` | Custom claims untuk role-based access |
| **Verification** | Per-request di layout.tsx | Stateless, no session store needed |

### Cookie Configuration

```typescript
// Set during login
cookies.set('admin_token', token, {
  httpOnly: true,        // Not accessible from JavaScript
  secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
  sameSite: 'lax',      // CSRF protection
  maxAge: 86400         // 24 hours
});
```

### Role-Based Access Control (RBAC)

**Two-tier system:**

| Role | Permissions | Akses Fitur |
|------|-------------|------------|
| **admin** | CRUD content (berita, potensi, banner, layanan, kontak) | User-facing management |
| **super** | Full admin + user management, role assignment, all settings | All CMS + Settings |

**Default Test Accounts (via seed):**
- Username: `admin` / Password: `admin` (Role: admin)
- Username: `superadmin` / Password: `superadmin` (Role: super)

### Verification di Admin Layout

```typescript
// app/admin/layout.tsx
const token = cookieStore.get("admin_token")?.value;
let userRole: "admin" | "super" = "admin"; // Default to least privilege

if (token) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    if (payload.role === "super") userRole = "super";
  } catch (error) {
    // Token invalid/expired → keep default role
  }
}

return <AdminShell userRole={userRole}>{children}</AdminShell>;
```

**Keuntungan:**
- ✅ Layout-level verification = automatic protection for all /admin/* routes
- ✅ No need for middleware.ts (cleaner architecture)
- ✅ Role information available immediately to components
- ✅ Graceful fallback (invalid token = least-privilege mode)

---

## 7. Server Actions & Backend Logic

Server Actions adalah primary pattern untuk semua backend operations. Setiap action menggunakan **Zod validation** dan **Prisma ORM**.

### Server Action Architecture

**Pattern Standard:**
```typescript
'use server';

import { z } from 'zod';
import prisma from '@/lib/db';

// 1. Define Zod schema (runtime validation)
const CreateBeritaSchema = z.object({
  judul: z.string().min(5).max(200),
  isi: z.string().min(20),
  kategori: z.enum(['Umum', 'Kegiatan', 'Pengumuman']),
});

// 2. Server action
export async function createBerita(input: unknown) {
  try {
    // 3. Validate input
    const { judul, isi, kategori } = CreateBeritaSchema.parse(input);
    
    // 4. Business logic & DB operations
    const slug = generateSlug(judul);
    const berita = await prisma.kegiatan.create({
      data: { judul, slug, isi, kategori },
    });
    
    // 5. Return success response
    return { success: true, data: berita };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    return { success: false, message: error.message };
  }
}
```

### 10 Server Actions (Listing Lengkap)

#### 1. **auth.action.ts** - Authentication
- `loginAdmin(username, password)` → JWT token + HTTP-only cookie
- `logoutAdmin()` → Clear cookie
- Helper: `verifyToken(token)` untuk manual verification

#### 2. **berita.action.ts** - News/Kegiatan CRUD
- `createBerita(data)` → Create news article
- `updateBerita(id, data)` → Update existing article
- `deleteBerita(id)` → Soft/hard delete
- `getAllBerita()` → Fetch all articles (public)
- `getBeritaBySlug(slug)` → Fetch single article
- `searchBerita(query)` → Full-text search

#### 3. **potensi.action.ts** - PotensiDesa CRUD
- `createPotensi(data)` → Create village potential entry
- `updatePotensi(id, data)` → Update entry
- `deletePotensi(id)` → Delete entry
- `getAllPotensi()` → Fetch all entries
- `getPotensiBySlug(slug)` → Fetch single entry
- Similar to berita.action.ts but for PotensiDesa model

#### 4. **home.action.ts** - Homepage Data Management
- `getHomeStats()` → Fetch HomeStatistic entries
- `importStatsFromExcel(file)` → Parse Excel file, bulk update stats
- `updateHomeWelcome(data)` → Update Lurah welcome message + photo
- `getHomeWelcome()` → Fetch welcome data

#### 5. **tentang-kami.action.ts** - Profile Management
- `getProfilKonten(kategori)` → Fetch about page sections (visi, misi, sejarah)
- `updateProfilKonten(kategori, data)` → Update profile content
- `getPerangkatDesa()` → Fetch organizational structure
- `createPerangkat(data)` → Add staff member
- `updatePerangkat(id, data)` → Update staff
- `deletePerangkat(id)` → Remove staff

#### 6. **banner.action.ts** - Banner Management
- `getBannersByPage(halaman)` → Fetch banners for specific page
- `createBanner(data)` → Create new banner
- `updateBanner(id, data)` → Update banner
- `deleteBanner(id)` → Delete banner
- `reorderBanners(order)` → Set display order

#### 7. **layanan.action.ts** - Service Management
- `getHomeServices()` → Fetch all services
- `createHomeService(title, iconURL)` → Add service
- `updateHomeService(id, data)` → Update service
- `deleteHomeService(id)` → Remove service
- `getServicesByCategory(kategori)` → Filter by category

#### 8. **kontak.action.ts** - Contact Configuration
- `getContactInfo()` → Fetch address, phone, email, working hours
- `updateContactInfo(data)` → Update contact details
- `getMapLocation()` → Fetch map coordinates/embed

#### 9. **pesan.action.ts** - Incoming Messages
- `getPesanMasuk(filter)` → Fetch messages with pagination
- `updatePesanStatus(id, status)` → Mark as read/responded
- `deletePesan(id)` → Delete message
- `countUnreadMessages()` → Dashboard notification count

#### 10. **search.action.ts** - Global Search
- `globalSearch(query)` → Cross-model full-text search
  - Searches: Kegiatan, PotensiDesa, ProfilKonten
  - Max 8 results per model
  - Returns: `{ berita: [], potensi: [], profil: [] }`

### Zod Validation Pattern

Semua Server Action menggunakan Zod untuk runtime validation:

```typescript
// Schema definition
const UpdateBeritaSchema = z.object({
  id: z.number().int().positive(),
  judul: z.string().min(5).max(200),
  isi: z.string().min(20),
  gambar: z.string().url().optional(),
  status: z.enum(['Aktif', 'Draft', 'Arsip']),
});

// In action
const validated = UpdateBeritaSchema.parse(input);
// ↓ If invalid, throws ZodError automatically
```

---

## 8. API Routes (Minimal)

⚠️ **Important:** Proyek ini menggunakan Server Actions untuk ~99% operations. API Routes hanya digunakan untuk edge cases yang memerlukan binary stream atau response streaming.

### Single API Route

**`GET /api/template/stats`** - Excel Template Download
```
Purpose: Provide downloadable Excel template untuk import statistics
Method: GET
Response: XLSX file (binary)
Fallback: Jika template tidak ditemukan, generate template on-the-fly
Headers: Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
```

Alasan menggunakan API route (bukan Server Action):
- Server Actions tidak ideal untuk streaming binary files
- Response perlu header `Content-Disposition: attachment`
- Direct file handling lebih straightforward via API Route

---

## 9. Styling System & Design Tokens

### CSS Variables (Tailwind v4)

File: `app/globals.css`

```css
@layer theme {
  :root {
    /* Brand Colors */
    --color-brand-dark: #0D47A1;   /* Deep Blue - headers, footers */
    --color-brand-base: #1565C0;   /* Interactive Blue - buttons, hover states */
    
    /* Text Colors */
    --color-text-dark: #272727;    /* Solid Black - headings, body text */
    --color-text-muted: #7C7C7C;   /* Secondary Gray - metadata, descriptions */
  }
}
```

### Typography

**Primary Font:** `Plus Jakarta Sans` (Google Fonts)
- Loaded globally via `next/font/google` di `app/layout.tsx`
- Fallback: `sans-serif`
- No secondary fonts permitted (enforced for design consistency)

**Font Usage Guidelines:**

| Element | Size | Weight | Line Height |
|---------|------|--------|------------|
| **H1 (Page Title)** | 3xl/2.25rem | bold (700) | tight |
| **H2 (Section)** | 2xl/1.5rem | bold (700) | snug |
| **H3 (Subsection)** | xl/1.25rem | semibold (600) | snug |
| **Body** | base/1rem | normal (400) | relaxed |
| **Small (Meta)** | sm/0.875rem | normal (400) | normal |

### Color System

**Brand Palette:**
- `brand-dark`: Navigation, footers, serious CTAs
- `brand-base`: Interactive elements, hover states, primary buttons
- `text-dark`: Main content, headings (high contrast)
- `text-muted`: Secondary content, timestamps, small text

**Utility Colors (Tailwind Standard):**
- Blue, red, green, orange, slate (standard palette)
- For alerts: red-600 (error), green-600 (success), blue-600 (info), amber-600 (warning)

### Responsive Design

**Breakpoints:** Standard Tailwind breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Mobile-First Approach:**
- Base styles = mobile
- Prefixed with `md:`, `lg:` untuk larger screens
- `line-height: tight/snug` untuk headings (prevent stacking on mobile)

### Dynamic Class Safelist

**File:** `app/tw-safelist.txt`

Menyimpan list kelas Tailwind yang di-generate secara dinamis (tidak visible di source code).
Contoh: `<div dangerouslySetInnerHTML={{__html: content}} />`

⚠️ **Jangan dihapus!** File ini essential untuk Tailwind JIT compiler.

---

## 10. Routing & Page Structure

### Public Routes (Portal Warga)

| Route | File | Purpose | Status |
|-------|------|---------|--------|
| `/home` | `app/(user)/home/page.tsx` | Homepage with hero, stats, services | Dynamic |
| `/tentang-kami` | `app/(user)/tentang-kami/page.tsx` | About page with org structure, history | Dynamic |
| `/layanan` | `app/(user)/layanan/page.tsx` | Service/letter request information | Static |
| `/kontak` | `app/(user)/kontak/page.tsx` | Contact form & location info | Dynamic |
| `/berita` | `app/(user)/berita/page.tsx` | News listing page | Dynamic |
| `/berita/[slug]` | `app/(user)/berita/[slug]/page.tsx` | Single news article detail | Dynamic |
| `/potensi-desa` | `app/(user)/potensi-desa/page.tsx` | UMKM/potential directory listing | Dynamic |
| `/potensi-desa/[slug]` | `app/(user)/potensi-desa/[slug]/page.tsx` | Single UMKM detail | Dynamic |
| `/sitemap.xml` | `app/sitemap.ts` | Dynamic XML sitemap for SEO | Generated |

**Public Layout:** `app/(user)/layout.tsx`
- Includes: TopBar, Navbar, global search modal
- Reusable across all public routes

### Admin Routes (CMS Dashboard)

| Route | Purpose | Auth Required | Role |
|-------|---------|----------------|------|
| `/admin/login` | Login page | No | Public |
| `/admin/dashboard` | Stats & overview | Yes | admin+ |
| `/admin/halaman/beranda` | Homepage management | Yes | admin+ |
| `/admin/halaman/beranda/sambutan` | Edit lurah welcome | Yes | admin+ |
| `/admin/halaman/beranda/layanan-icon` | Manage services | Yes | admin+ |
| `/admin/halaman/berita` | News management hub | Yes | admin+ |
| `/admin/halaman/berita/daftar` | News list & editor | Yes | admin+ |
| `/admin/halaman/potensi-desa` | Potensi management hub | Yes | admin+ |
| `/admin/halaman/potensi-desa/daftar` | Potensi list & editor | Yes | admin+ |
| `/admin/halaman/tentang-kami` | About page management | Yes | admin+ |
| `/admin/halaman/tentang-kami/teks` | Text content editor | Yes | admin+ |
| `/admin/halaman/tentang-kami/struktur` | Org structure editor | Yes | admin+ |
| `/admin/halaman/tentang-kami/statistik` | Stats editor | Yes | admin+ |
| `/admin/halaman/kontak` | Contact settings | Yes | admin+ |
| `/admin/halaman/layanan` | Service management | Yes | admin+ |
| `/admin/pesan-masuk` | Incoming messages | Yes | admin+ |
| `/admin/settings` | General settings | Yes | super |
| `/admin/settings/manajemen-admin` | User management | Yes | super |

**Admin Layout:** `app/admin/layout.tsx`
- JWT verification per-request
- Role extraction & passing to AdminShell
- Automatic fallback to least privilege if token invalid

---

## 11. Component Architecture

### Naming Convention

- **Client Components:** Default, use React hooks (`useState`, `useEffect`)
- **Server Components:** Implicit, or explicitly marked with `"use server"`
- **Public Components:** Stored in `components/user/`
- **Admin Components:** Stored in `components/admin/`
- **Base/Primitive Components:** Should be in `components/ui/` (currently not segregated)

### Key Components

#### Public Portal Components (`components/user/`)

| Component | Type | Purpose |
|-----------|------|---------|
| **TopBar** | Client | Logo, contact shortcuts, language switcher |
| **Navbar** | Client | Main navigation (with dropdown menus) |
| **ClientLayout** | Client | Client-side shell for public pages |
| **Footer** | Client | Footer with links, contact, copyright |
| **HomeView** | Client | Homepage main content |
| **HeroCarousel** | Client | Carousel component for banners |
| **BeritaView** | Client | News listing page |
| **BeritaDetailView** | Client | Single news article with related posts |
| **GlobalSearchModal** | Client | Cmd+K search interface |
| **SkeletonDetail** | Client | Loading skeleton for detail pages |
| **TentangKamiView** | Client | About page sections |
| **LayananView** | Client | Service information page |
| **KontakView** | Client | Contact form + location |
| **PotensiDesaView** | Client | UMKM/potential listing |
| **PotensiDetailView** | Client | Single potential detail |
| **SorotanDesa** | Client | Featured spotlight section |
| **StaticBanner** | Client | Static banner display |

#### Admin Dashboard Components (`components/admin/`)

| Component | Type | Purpose |
|-----------|------|---------|
| **AdminShell** | Client | Main admin layout wrapper (sidebar, header) |
| **AdminSidebar** | Client | Navigation menu with sections |
| **AdminHeader** | Client | Top bar with user info, logout |
| **CommandPalette** | Client | Cmd+K search/navigation interface |
| **AdminBannerManager** | Client | Banner CRUD modal |
| **AdminBeritaManager** | Client | News editor with form |
| **AdminLayananManager** | Client | Service management + letter printing |
| **AdminPotensiManager** | Client | UMKM editor |
| **AdminPerangkatManager** | Client | Org structure editor |
| **... more** | Client | Other specific CRUD components |

---

## 12. Build, Deployment & Environment

### Environment Variables

**Required (.env):**
```
DATABASE_URL=postgresql://user:password@host:5432/db
DIRECT_URL=postgresql://user:password@host:5432/db?schema=public
JWT_SECRET=your-secret-key-here
NEXT_PUBLIC_SITE_URL=https://wergu-wetan.id
```

**Optional:**
- `NODE_ENV`: Set by Next.js automatically (development|production)

### Build Process

```bash
npm run build
# ↓ Next.js Turbopack compilation
# ↓ TypeScript type checking
# ↓ Prisma client generation
# ↓ Asset optimization
# ↓ Output to .next/ directory
```

**Build Output:**
- `.next/` directory contains compiled app, cached data, diagnostics
- Static pages pre-rendered at build time
- Dynamic routes render on-demand

### Deployment Target

- **Recommended:** Vercel (Next.js native platform)
- **Alternative:** Any Node.js-capable host (AWS EC2, Railway, Render, etc.)
- **Database:** Supabase PostgreSQL (or any PostgreSQL provider)

### Development Server

```bash
npm run dev
# ↓ Starts Next.js dev server on localhost:3000
# ↓ Hot reload on file changes
# ↓ --experimental-https flag enables HTTPS locally
```

---

## 13. Known Discrepancies & Corrections

### From Previous ARCHITECTURE.md v1 (Hallucinations Fixed)

| Claim | Reality | Status |
|-------|---------|--------|
| "Otorisasi diatur via middleware.ts" | JWT verification happens in `app/admin/layout.tsx`, no middleware.ts exists | ✅ FIXED |
| "Pemisahan layer horizontal (Controller/Service/Repository)" | Tidak ada - vertical slice architecture, logic langsung di Server Actions | ✅ CORRECTED |
| "`app/api/` hanya untuk edge cases binary/download" | ✅ Correct - only 1 API route for Excel template | ✅ VERIFIED |
| "`ui/` folder dengan primitive components" | Tidak ada folder `ui/` - komponen primitif belum di-segregate | ⚠️ NOTED (future refactor opportunity) |
| "14 Prisma models semua aktif" | `Umkm` dan `Penduduk` adalah legacy/unused | ✅ CLARIFIED |
| "NextAuth/Auth.js tidak digunakan, pakai jose" | ✅ Correct | ✅ VERIFIED |

---

## 14. Data Flow Examples

### Example 1: Creating a News Article

```
1. Admin clicks "Buat Berita" in dashboard
   ↓
2. Modal form opens (BeritaDetailView component)
   ↓
3. Admin fills: judul, isi, kategori, gambar
   ↓
4. Clicks "Simpan"
   ↓
5. Client calls: createBerita(formData)
   ↓
6. Server Action (berita.action.ts):
   - Zod validates input
   - Generates slug from judul
   - Prisma creates row in Kegiatan table
   - Returns { success: true, data: berita }
   ↓
7. Client receives response
   ↓
8. Toast notification: "Berita berhasil dibuat"
   ↓
9. Cache revalidates, list refreshes
   ↓
10. Admin sees new article in list
```

### Example 2: User Searching for News

```
1. User clicks search icon (Cmd+K)
   ↓
2. GlobalSearchModal opens
   ↓
3. User types: "pemberdayaan UMKM"
   ↓
4. Input debounced (300ms)
   ↓
5. Client calls: globalSearch("pemberdayaan UMKM")
   ↓
6. Server Action (search.action.ts):
   - Full-text search on Kegiatan, PotensiDesa, ProfilKonten
   - Max 8 results per model
   - Returns: { berita: [...], potensi: [...], profil: [...] }
   ↓
7. Results rendered in modal
   ↓
8. User clicks result → navigates to detail page
```

### Example 3: Admin Login & Session

```
1. Admin visits /admin/login
   ↓
2. Fills username/password
   ↓
3. Clicks "Masuk"
   ↓
4. Client calls: loginAdmin(username, password)
   ↓
5. Server Action (auth.action.ts):
   - Find Admin record by username
   - bcryptjs.compare(password, passwordHash)
   - If valid:
     * Generate JWT token (HS256, 24h exp)
     * Extract role from record
     * Set HTTP-only cookie "admin_token"
     * Return { success: true, redirectUrl: '/admin/dashboard' }
   - If invalid:
     * Return { success: false, message: 'Invalid credentials' }
   ↓
6. Client redirects to /admin/dashboard
   ↓
7. Page loads, calls app/admin/layout.tsx
   ↓
8. Layout reads "admin_token" from cookies
   ↓
9. Verifies JWT signature & expiration
   ↓
10. Extracts role, passes to AdminShell
    ↓
11. Dashboard renders with role-based UI
```

---

## 15. Performance & Optimization

### Caching Strategy

**Data Revalidation:**
- `revalidatePath('/berita')` after creating news (ISR)
- `revalidateTag('berita')` untuk granular cache control
- 60-second default revalidation for dynamic routes

**Image Optimization:**
- Next.js Image component auto-optimizes (WebP, responsive sizes)
- Hero images use `fill` with `object-cover`
- Thumbnail images set explicit width/height

### Code Splitting

- `next/dynamic` untuk lazy-loading heavy components (modals, editors)
- Server Components automatically split from Client Components

### Bundle Analysis

```bash
npm run build -- --analyze  # Requires @next/bundle-analyzer
```

---

## 16. Future Improvements & Recommendations

1. **Refactor UI Components:** Extract primitive components into `components/ui/` folder (buttons, inputs, cards, etc.)
2. **Add Middleware.ts:** Optionally move JWT verification from layout to middleware.ts for cleaner separation
3. **Implement Refresh Tokens:** Current 24h JWT lacks refresh mechanism - consider adding for better UX
4. **Add Session Database:** Consider storing admin sessions for better control (logout across devices, etc.)
5. **Implement Rate Limiting:** Add rate limiting on login endpoint & public API routes
6. **CDN for Images:** Offload image storage to CDN (Cloudinary, Supabase Storage) for better performance
7. **Full-Text Search Enhancement:** Upgrade from basic text search to Postgres FTS or Typesense
8. **Monitoring & Analytics:** Add error tracking (Sentry), performance monitoring (Vercel Analytics)
9. **Automated Testing:** Add E2E tests (Playwright, Cypress) & unit tests (Vitest)
10. **Multi-Language:** Expand beyond ID/EN/JW - use i18n library for better localization

---

## 17. Quick Reference: Decision Matrix

| Decision Point | Choice | Rationale |
|---|---|---|
| **Architecture** | Vertical Slice Monolith | Simpler than microservices, faster development |
| **Backend** | Server Actions | Type-safe, no API serialization, automatic validation |
| **Database** | Prisma + PostgreSQL | Type-safe ORM, migration tracking, relation support |
| **Auth** | JWT in HTTP-only Cookie | Stateless, CSRF-protected, no session overhead |
| **Styling** | Tailwind CSS v4 | Utility-first, rapid design implementation, CSS variables support |
| **Validation** | Zod | Runtime validation, clear error messages, TypeScript integration |
| **Icons** | lucide-react | Consistent style, lightweight, tree-shakeable |
| **Animations** | Framer Motion | Smooth UX, declarative syntax, performance-optimized |

---

## Summary: Single Source of Truth

Dokumen ini adalah **definitive source** untuk arsitektur aplikasi. Setiap claim didasarkan pada:
1. **Actual codebase analysis** (bukan asumsi)
2. **Package.json verification** (tech stack confirmed)
3. **File-level inspection** (routing, components, actions)
4. **Functional testing** (JWT flow, Server Actions, data flow)

**Jika ada pertanyaan atau inkonsistensi**, periksa codebase actual terlebih dahulu sebelum mengubah dokumentasi.

---

**Document Version:** 2.0 (Corrected & Verified)  
**Last Updated:** 5 Mei 2026 | 22:12 WIB  
**Maintained By:** Kilo AI Code Analysis  
**Status:** ✅ In Sync with Codebase v0.1.0
