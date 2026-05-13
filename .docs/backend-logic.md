# ⚙️ Backend Integration — Server Actions & SSR Logic

**Purpose:** Pandu teknis integrasi database, Server Actions, auth, dan Supabase — dengan output siap pakai untuk FE dalam **ANF-Agentic Architecture**.

---

## 📦 1. Branch Context: `be/*` (Backend Workspace)

**Fokus:** Logic backend (Server Actions, services, repositories).

**Output expected:** Fungsi-fungsi siap pakai yang akan dipanggil FE, contoh:
```typescript
getUserData()          // return User[]
updateProfile(input)   // return ApiResponse<User>
searchBerita(query)    // return ApiResponse<Berita[]>
```

**Rule:** Jangan touch `components/` atau styling — FE yang urus UI.

---

## 🗄️ 2. Server Actions Pattern (The Standard)

Semua operasi backend HARUS melalui Server Actions (`"use server"`).  
No traditional REST API routes except for binary streaming (Excel).

### Boilerplate Template

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

    // 5. Optional: Revalidate cache
    // revalidatePath('/entities');

    return { success: true, data: entity };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    return { success: false, message: error.message };
  }
}
```

---

## 🗄️ 2. Prisma ORM — Best Practices

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
// Simple select
const users = await prisma.user.findMany({
  where: { active: true },
  orderBy: { createdAt: 'desc' },
  select: { id: true, name: true, email: true },
});

// Pagination (cursor-based recommended)
const page = await prisma.kegiatan.findMany({
  take: 10,
  cursor: { id: lastSeenId },
  orderBy: { id: 'desc' },
});
```

**❌ AVOID:**
```typescript
// N+1 queries
const posts = await prisma.post.findMany();
for (const post of posts) {
  const author = await prisma.user.findUnique({ where: { id: post.authorId } }); // BAD
}
```

---

## 📤 3. Output Format: FE-Friendly Data

### API Response Envelope

Semua Server Actions harus return format ini:

```typescript
type ApiResponse<T> = {
  success: boolean;
  data?: T;         // On success
  errors?: ZodError[]; // On validation failure
  message?: string;   // On error
};
```

**Example:**
```typescript
export async function getAllBerita(): Promise<ApiResponse<Berita[]>> {
  try {
    const raw = await prisma.kegiatan.findMany({ where: { status: 'Aktif' } });

    // Map DB format → FE props format
    const data: Berita[] = raw.map(b => ({
      id: b.id,
      title: b.judul,
      content: b.isi,
      imageUrl: b.gambar || '/images/default-news.png',
      category: b.kategori,
      author: b.penulis,
      publishedAt: b.tanggal.toISOString(),
      slug: b.slug,
    }));

    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
```

### Data Mapping: DB → FE Props

**Why mapping?** Database schema ≠ UI props format.

| DB Field (Prisma) | FE Props (Component) | Transformation |
|-------------------|----------------------|---------------|
| `Kegiatan.judul` | `BeritaCard.title` | Direct copy |
| `Kegiatan.isi` | `BeritaCard.content` | Truncate? (No, let FE decide) |
| `Kegiatan.gambar` | `BeritaCard.imageUrl` | Fallback to default if null |
| `Kegiatan.tanggal` (Date) | `BeritaCard.publishedAt` (ISO string) | `.toISOString()` |

**Rule of thumb:** BE handles DB format, FE handles display format. BE should NOT truncate strings or resize images — that's FE concern.

---

## 🔐 4. Authentication & Authorization

### JWT Implementation (jose)

**Token Generation (`actions/auth.action.ts`):**

```typescript
import { SignJWT } from 'jose';

const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-only-dev'
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
import { jwtVerify } from 'jose';

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

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
      // Invalid/expired → keep default 'admin' role
    }
  }

  return <AdminShell userRole={userRole}>{children}</AdminShell>;
}
```

### Cookie Configuration

```typescript
cookieStore.set('admin_token', token, {
  httpOnly: true,                    // Not accessible via JS (XSS protection)
  secure: process.env.NODE_ENV === 'production', // HTTPS-only in prod
  sameSite: 'lax',                  // CSRF protection
  maxAge: 60 * 60 * 24,             // 24 hours (in seconds)
  path: '/',                        // Available site-wide
});
```

---

## 🛡️ 4. Role-Based Access Control (RBAC)

**Two-Tier System:**

| Role | Permissions | Can Access |
|------|-------------|------------|
| `admin` | CRUD content (berita, potensi, banner, layanan, kontak) | All /admin/halaman/* |
| `super` | Full admin + user management + settings | All routes including /admin/settings/* |

**Default Seeds (`prisma/seed.ts`):**
- `admin` / `admin` → regular admin
- `superadmin` / `superadmin` → super admin

---

## 📊 5. Data Models (Prisma Schema)

**14 Active Models** (see `prisma/schema.prisma`):

### Core Content Models
| Model | Table | Purpose |
|-------|-------|---------|
| `Kegiatan` | `kegiatan` | News articles, announcements, activities |
| `PotensiDesa` | `potensidesa` | UMKM directory, village potentials |
| `BannerHomepage` | `bannerhomepage` | Hero carousel banners per page |
| `HomeStatistic` | `homestatistic` | Homepage stats (Penduduk, RT, etc.) |
| `HomeWelcome` | `homewelcome` | Lurah's welcome message |
| `HomeService` | `homeservice` | Service icons on homepage |

### Admin & Org Models
| Model | Purpose |
|-------|---------|
| `Admin` | Login credentials + role |
| `PerangkatDesa` | Organizational structure (staff members) |
| `ProfilKonten` | About page content (visi, misi, sejarah) |
| `SiteConfig` | Global site config (phone, email, alamat) |

### Operational Models
| Model | Purpose |
|-------|---------|
| `PengajuanSurat` | Letter request applications |
| `PesanMasuk` | Contact form messages |

**⚠️ Legacy (unused):** `Umkm`, `Penduduk`

---

## 🔄 6. Caching & Revalidation

### Incremental Static Regeneration (ISR)

```typescript
import { revalidatePath, revalidateTag } from 'next/cache';

// Revalidate path (after create/update/delete)
revalidatePath('/berita');
revalidatePath('/berita/[slug]');

// Granular tag-based revalidation
revalidateTag('berita');
revalidateTag('potensi');
```

**Cache Tags Usage:**
```typescript
export async function createBerita(data) {
  const berita = await prisma.kegiatan.create({ data });

  // Invalidate ALL news-related cache
  revalidateTag('berita');
  revalidatePath('/berita');
  revalidatePath('/home'); // if homepage shows latest news

  return { success: true, data: berita };
}
```

---

## 📥 7. Supabase PostgreSQL Connection

### Connection Strings

**Pooled (production/app server):**
```bash
DATABASE_URL="postgresql://user:pass@host:6543/db?pgbouncer=true"
```

**Direct (migrations, Prisma Studio):**
```bash
DIRECT_URL="postgresql://user:pass@host:5432/db?schema=public"
```

### Connection Pooling (Supabase PgBouncer)

Supabase provides connection pooling via PgBouncer. This means:
- Use **pooled URL** (port 6543) in production for app
- Use **direct URL** (port 5432) for migrations and local development

---

## 🧪 8. Database Seeding

**Run:** `npm run prisma:generate` (auto-runs postinstall) or `npx tsx prisma/seed.ts`

Seed script creates:
1. Admin accounts (`admin` / `superadmin`)
2. Homepage banners (4 default banners)
3. Statistics (6 stats)
4. Welcome message from Lurah
5. Organizational structure (12 staff members)
6. About page content (visi, misi, sejarah)
7. Site configuration (contact info)
8. Sample news articles (3 items)
9. Sample UMKM potentials (4 items)

**⚠️ Idempotent:** Safe to re-run (uses `upsert` & `count()` checks).

---

## ⚠️ 9. Known Pitfalls & Gotchas

| Issue | Cause | Fix |
|-------|-------|-----|
| **EPERM on Windows** | Prisma query engine locked | Kill Node processes, delete `node_modules/.prisma/client`, run as Admin |
| **"Cannot find module '.prisma/client'"** | Prisma not generated yet | Run `npx prisma generate` after install |
| **Cookie not set in dev HTTPS** | Secure flag only in prod | Use `httpOnly: true, secure: false` in dev ( handled automatically) |
| **Server Actions blocked (CORS)** | `allowedOrigins` mismatch | Update `next.config.ts` to match your origin (with scheme) |
| **Images 404 in admin** | Invalid `image` field in DB | Ensure DB has valid URLs (`/images/xxx.png`) |

---

## 🔍 10. Debugging Checklist

### Server Action not firing?
- [ ] Is component marked `"use client"`? (Client components only call Server Actions)
- [ ] Is the function imported from `@/actions/xxx.action`?
- [ ] Check browser Network tab → Request to `/_next/...`?

### Prisma errors?
- [ ] Run `npx prisma generate` manually
- [ ] Check `DATABASE_URL` connectivity (use `psql` or Supabase UI)
- [ ] Run `npx prisma migrate dev` if schema changed

### Auth failing?
- [ ] JWT_SECRET matches between `auth.action.ts` & `admin/layout.tsx`
- [ ] Cookie domain/path correct (should be `/`)
- [ ] Browser accepts cookies (not incognito blocking?)

---

## 📚 11. Reference Links

- **Next.js Server Actions:** https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
- **Prisma Docs:** https://www.prisma.io/docs
- **jose JWT library:** https://github.com/panva/jose
- **Supabase PostgreSQL:** https://supabase.com/docs

---

**Last Review:** 14 Mei 2026 | **Next Review:** Sprint Retrospective  
**Owner:** Backend Team | **Status:** ✅ Active
