# ⚙️ Backend & Business Logic

## 1. Overview
Bagian ini mengatur bagaimana data diproses, disimpan, dan divalidasi. Semua fungsi di sini tidak peduli apakah yang memanggilnya itu User (lewat Browser) atau AI (lewat MCP). Fokus utamanya adalah operasi basis data, keamanan logika, dan pengembalian respons yang aman sesuai arsitektur *Vertical Slice*.

## 2. Database & Data Models
- Menggunakan library **Prisma ORM** yang terkoneksi ke **Supabase PostgreSQL**.
- Skema utama berfokus pada entitas e-government: `Admin`, `Kegiatan` (Berita), `PotensiDesa`, `Layanan`, dan `PesanMasuk`.

## 3. Core Services / Internal Functions (Server Actions)
Di proyek ini, kita **tidak menggunakan API Routes**. Fungsi internal diimplementasikan secara murni sebagai **Server Actions** (`actions/*.action.ts`):

- `getAllBerita()`: Mengambil daftar berita aktif dari database.
- `tambahAdmin(formData)`: Memvalidasi dan menyimpan admin baru.
- `getContactInfo()`: Mengambil konfigurasi dinamis situs.

> **PENTING UNTUK VIBE CODER/AI:** 
> Jika fitur AI memerlukan akses ke database, **DILARANG** menulis query database langsung di luar *backend workspace*. AI (Skills) **wajib** memanggil fungsi Core Services yang ada di `actions/` atau `lib/`.

---

## 🗄️ 4. Server Actions Pattern (Standard)

All backend operations MUST use Server Actions (`'use server'`). No traditional REST API routes except for binary streaming (Excel).

### Template

```typescript
'use server';

import { z } from 'zod';
import prisma from '@/lib/db';

// 1. Define Zod schema (validation)
const CreateEntitySchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().optional(),
});

// 2. Server action
export async function createEntity(input: unknown) {
  try {
    // 3. Parse & validate
    const data = CreateEntitySchema.parse(input);

    // 4. Business logic + Prisma operation
    const entity = await prisma.entity.create({
      data: { ...data, createdAt: new Date() },
    });

    // 5. Optional: Invalidate cache
    // revalidatePath('/entities');

    return { success: true, data: entity };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    return { success: false, message: (error as Error).message || "Unknown error" };
  }
}
```

**Key points:**
- Always mark with `'use server'` directive
- Accept `unknown` input, parse with Zod
- Return `{ success, data?, errors?, message? }` envelope
- Catch Zod errors separately for field-level error reporting

---

## 🗄️ 5. Prisma ORM — Best Practices

### Database Client Singleton (`lib/db.ts`)

```typescript
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => new PrismaClient();

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

// Prevent multiple instances in dev (hot reload)
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}
```

### Query Patterns

**✅ DO:**
```typescript
// Simple select with filtering
const users = await prisma.user.findMany({
  where: { active: true },
  orderBy: { createdAt: 'desc' },
  select: { id: true, name: true, email: true },
});

// Pagination (cursor-based recommended for large datasets)
const page = await prisma.kegiatan.findMany({
  take: 10,
  cursor: { id: lastSeenId },
  orderBy: { id: 'desc' },
});
```

**❌ AVOID:**
```typescript
// N+1 queries — inefficient
const posts = await prisma.post.findMany();
for (const post of posts) {
  const author = await prisma.user.findUnique({ where: { id: post.authorId } }); // BAD
}

// Solution: use include or separate batch queries
const postsWithAuthors = await prisma.post.findMany({
  include: { author: true },
});
```

### Data Mapping: DB → FE Props

**Why?** Database schema ≠ UI props format. BE handles DB format transformation, FE handles display formatting.

| DB Field (Prisma) | FE Props (Component) | Transformation |
|-------------------|----------------------|---------------|
| `Kegiatan.judul` | `BeritaCard.judul` | Direct copy |
| `Kegiatan.isi` | `BeritaCard.isi` | No truncation — let FE decide |
| `Kegiatan.gambar` | `BeritaCard.gambar` | Fallback if null |
| `Kegiatan.tanggal` (Date) | `BeritaCard.tanggal` (ISO string) | `.toISOString()` |
| `Kegiatan.slug` | `BeritaCard.slug` | Direct copy |

**Rule:** BE maps DB → FE interface; FE handles display-specific formatting (truncation, date locale, image resizing).

---

## 🔐 6. Authentication & Authorization

### JWT Implementation (jose)

**Token Generation (`actions/auth.action.ts`):**

```typescript
import { SignJWT } from 'jose';

const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET || 'sangat-rahasia-sekali'
);

const token = await new SignJWT({
  id: admin.id,
  username: admin.username,
  role: admin.role,
  namaLengkap: admin.namaLengkap,
})
  .setProtectedHeader({ alg: 'HS256' })
  .setIssuedAt()
  .setExpirationTime('24h')
  .sign(secretKey);
```

**Token Verification (Admin Layout):**

```typescript
// app/admin/layout.tsx
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export default async function AdminLayout({ children }) {
  const token = (await cookies()).get('admin_token')?.value;
  let userRole: 'admin' | 'super' = 'admin'; // Default: least privilege

  if (token) {
    try {
      const secretKey = new TextEncoder().encode(
        process.env.JWT_SECRET || 'sangat-rahasia-sekali'
      );
      const { payload } = await jwtVerify(token, secretKey);
      if (payload.role === 'super') userRole = 'super';
    } catch (error) {
      console.error('JWT Verify Error:', error);
      // Invalid/expired → keep default 'admin'
    }
  }

  return <AdminShell userRole={userRole}>{children}</AdminShell>;
}
```

### Cookie Configuration

```typescript
cookieStore.set('admin_token', token, {
  httpOnly: true,                    // XSS protection
  secure: process.env.NODE_ENV === 'production', // HTTPS-only in prod
  sameSite: 'lax',                  // CSRF protection
  maxAge: 60 * 60 * 24,             // 24 hours (seconds)
  path: '/',                        // Site-wide
});
```

### Role-Based Access Control (RBAC)

| Role | Permissions | Access |
|------|-------------|--------|
| `admin` | CRUD content (berita, potensi, banner, layanan, kontak) | All `/admin/halaman/*` |
| `super` | Full admin + user management + settings | All routes including `/admin/settings/*` |

**Default seeds (`prisma/seed.ts`):**
- Referensi role `admin` dan `superadmin` dapat dilihat di file seed. Jangan gunakan default password di production.

---

## 🔄 7. Caching & Revalidation

### Incremental Static Regeneration (ISR)

```typescript
import { revalidatePath, revalidateTag } from 'next/cache';

export async function createBerita(data) {
  const berita = await prisma.kegiatan.create({ data });

  // Invalidate cache
  revalidateTag('berita');
  revalidatePath('/berita');
  revalidatePath('/home'); // if homepage shows latest

  return { success: true, data: berita };
}
```

**Cache tags:**
- Use `revalidateTag('berita')` for tag-based invalidation
- Use `revalidatePath('/berita')` for path-based invalidation
- Call after create/update/delete operations

---

## 📥 8. Supabase PostgreSQL Connection

### Connection Strings

**Pooled (production/app server):**
```bash
DATABASE_URL="postgresql://user:pass@host:6543/db?pgbouncer=true"
```

**Direct (migrations, Prisma Studio):**
```bash
DIRECT_URL="postgresql://user:pass@host:5432/db?schema=public"
```

**Pattern:**
- App server uses pooled URL (port 6543) for runtime queries
- Migrations use direct URL (port 5432) for `prisma migrate`

---

## 🧪 9. Database Seeding

**Run:** `npx prisma db seed` (to run manually) or automatically runs after `npx prisma migrate dev`.

Seed script creates:
1. Admin accounts (`admin`, `superadmin`)
2. Homepage banners (4 default)
3. Statistics (6 stats)
4. Welcome message (Lurah)
5. Organizational structure (12 staff)
6. About page content (visi, misi, sejarah)
7. Site configuration (contact info)
8. Sample news (3 items)
9. Sample UMKM potentials (4 items)

**⚠️ Idempotent:** Safe to re-run (uses `upsert` & `count()` checks).

---

## ⚠️ 10. Known Pitfalls & Gotchas

| Issue | Cause | Fix |
|-------|-------|-----|
| **EPERM on Windows** | Prisma query engine locked | Kill Node, delete `node_modules/.prisma/client`, reinstall as Admin |
| **"Cannot find module '.prisma/client'"** | Prisma not generated | Run `npx prisma generate` |
| **Cookie not set in dev HTTPS** | Secure flag in prod only | Automatically handled: `secure: process.env.NODE_ENV === 'production'` |
| **Server Actions blocked (CORS)** | `allowedOrigins` mismatch | Update `next.config.ts` to match origin (with scheme) |
| **Images 404 in admin** | Invalid `image` field in DB | Ensure DB has valid URLs (`/images/xxx.png`) |

---

## 🔍 11. Debugging Checklist

### Server Action not firing?
- [ ] Is component marked `"use client"`? (Client components call Server Actions)
- [ ] Is function imported from `@/actions/xxx.action`?
- [ ] Check browser Network tab → Request to `/_next/...`?

### Prisma errors?
- [ ] Run `npx prisma generate` manually
- [ ] Check `DATABASE_URL` connectivity (Supabase UI or `psql`)
- [ ] Run `npx prisma migrate dev` if schema changed

### Auth failing?
- [ ] `JWT_SECRET` matches between `auth.action.ts` & `admin/layout.tsx`
- [ ] Cookie domain/path correct (should be `/`)
- [ ] Browser accepts cookies (not incognito blocking?)

---

**Last Review:** 14 Mei 2026 | **Status:** ✅ Active  
**Owner:** Backend Team | **Next Review:** Sprint Retrospective
