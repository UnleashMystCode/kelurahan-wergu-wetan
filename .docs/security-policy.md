# 🔐 Security Policy — ANF-Agentic Architecture

**Purpose:** Keamanan data & sistem untuk portal Kelurahan Wergu Wetan.  
**Applies to:** All branches (`be/*`, `fe/*`, `pr/*`, `main`).

---

## 📜 1. Security Principles

### Core Tenets

| Principle | Description |
|-----------|-------------|
| **RLS First** | All Supabase tables MUST have Row Level Security enabled |
| **Least Privilege** | Service roles have minimal permissions; JWT claims determine access |
| **Zero Trust** | Never trust client data — always validate with Zod in Server Actions |
| **Secrets Isolation** | `.env` values NEVER exposed to browser (except `NEXT_PUBLIC_*`) |
| **Defense in Depth** | Multiple layers: RLS + JWT + Zod + Cookie validation |

---

## 🛡️ 2. Row Level Security (RLS) — *MANDATORY*

### All Tables Must Have RLS Policies

**Why?** Supabase is public by default. Without RLS, anyone with `anon` key can read/write all tables.

**Checklist per table:**
- [ ] ✅ `ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;`
- [ ] ✅ `CREATE POLICY <policy_name> ON <table> FOR SELECT USING (...);`
- [ ] ✅ `CREATE POLICY <policy_name> ON <table> FOR INSERT WITH CHECK (...);`
- [ ] ✅ `CREATE POLICY <policy_name> ON <table> FOR UPDATE USING (...) WITH CHECK (...);`
- [ ] ✅ `CREATE POLICY <policy_name> ON <table> FOR DELETE USING (...);`

### RLS Policy Template

```sql
-- Example: Kegiatan (News) table
-- Public can read Aktif news, only authenticated admin can modify
CREATE POLICY "Public can read active news"
  ON kegiatan FOR SELECT
  USING (status = 'Aktif');

CREATE POLICY "Admin can manage all news"
  ON kegiatan FOR ALL
  USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
```

**BE Responsibility (`be/*` branch):**
- Write RLS policies in `prisma/migrations/` SQL files
- Test with Supabase SQL Editor before merging
- Document policy logic in this doc per table

---

## 🔑 3. Environment Variables & Secrets

### Variable Naming Convention

| Prefix | Visibility | Use Case |
|--------|------------|----------|
| `NEXT_PUBLIC_*` | ✅ Exposed to browser | Site URL, public keys |
| (no prefix) | 🔒 Server-only | DATABASE_URL, JWT_SECRET, SERVICE_ROLE_KEY |

### Critical Secrets (NEVER commit)

```bash
# .env (local) — gitignored
DATABASE_URL="postgresql://..."          # Pooled connection
DIRECT_URL="postgresql://..."            # Direct connection (migrations)
JWT_SECRET="64-char-random-string"       # Sign JWT tokens
SERVICE_ROLE_KEY="supabase-service-role" # ⚠️ NEVER expose to client

# Public (safe to expose)
NEXT_PUBLIC_SITE_URL="https://wergu-wetan.id"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."      # Only if using Supabase client SDK (not used here)
```

**⚠️ NEVER:**
- ❌ Put `SERVICE_ROLE_KEY` in `.env` if used in client components
- ❌ Log `JWT_SECRET` or `DATABASE_URL` to console
- ❌ Commit `.env` — always use `.env.example` as template

---

## 🧾 4. Input Validation (Zod) — *MANDATORY*

All Server Actions **must** have Zod schema validation.

### Standard Pattern (`be/*`)

```typescript
// actions/berita.action.ts
'use server';

import { z } from 'zod';

const CreateBeritaSchema = z.object({
  judul: z.string().min(5, "Judul minimal 5 karakter").max(200),
  isi: z.string().min(20, "Isi minimal 20 karakter"),
  kategori: z.enum(['Umum', 'Kegiatan', 'Pengumuman']),
  gambar: z.string().url().optional(),
});

export async function createBerita(formData: FormData) {
  try {
    // Parse & validate (throws ZodError on failure)
    const { judul, isi, kategori, gambar } = CreateBeritaSchema.parse({
      judul: formData.get('judul'),
      isi: formData.get('isi'),
      kategori: formData.get('kategori'),
      gambar: formData.get('gambar'),
    });

    // Proceed with DB operation
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

**Validation Rules:**
- ✅ All inputs (FormData, JSON body) must be validated
- ✅ Use `.min()`, `.max()`, `.email()`, `.url()` as appropriate
- ✅ Enum fields must use `z.enum([...])`
- ✅ Nested objects use `z.object({})`
- ✅ Arrays use `z.array(z.string())` etc.

---

## 🔐 5. Authentication & Authorization

### JWT Claims Structure

```typescript
interface JwtPayload {
  id: number;
  username: string;
  role: 'admin' | 'super'; // RBAC
  iat: number; // issued at
  exp: number; // expiry
}
```

### Role-Based Access Control

| Role | Can Access | Cannot Access |
|------|------------|---------------|
| `admin` | All `/admin/halaman/*` except settings | `/admin/settings/*`, user management |
| `super` | Everything including `/admin/settings/*` | — |

### Auth Guard Pattern (Middleware-style)

```typescript
// app/admin/layout.tsx (per-request verification)
export default async function AdminLayout({ children }) {
  const token = (await cookies()).get('admin_token')?.value;

  let userRole: 'admin' | 'super' = 'admin'; // Default: least privilege

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secretKey);
      if (payload.role === 'super') userRole = 'super';
    } catch {
      // Invalid token → stay as 'admin' (downgrade)
    }
  }

  return <AdminShell userRole={userRole}>{children}</AdminShell>;
}
```

**Rule:** Protected routes use layout-level verification, not middleware (simpler, no extra layer).

---

## 🍪 6. Cookie Security

```typescript
cookieStore.set('admin_token', token, {
  httpOnly: true, // ❌ Not accessible via JavaScript (XSS protection)
  secure: process.env.NODE_ENV === 'production', // ✅ HTTPS-only in prod
  sameSite: 'lax', // ✅ CSRF protection (relaxed but safe)
  maxAge: 60 * 60 * 24, // 24 jam
  path: '/', // Available site-wide
});
```

**Why these settings?**
- `httpOnly`: Prevents XSS theft
- `secure`: Required for HTTPS (production)
- `sameSite: lax`: Allows same-site navigation, blocks cross-site POST
- `path=/`: Cookie available across all routes

---

## 📝 7. Audit Logging (Recommended)

Log all sensitive actions:

```typescript
// actions/auth.action.ts — after login
console.log('[AUTH] Login success', {
  username: admin.username,
  role: admin.role,
  timestamp: new Date().toISOString(),
  ip: req.headers.get('x-forwarded-for') || 'unknown',
});
```

**Events to log:**
- ✅ Admin login/logout
- ✅ CRUD operations on sensitive data (Kegiatan, Potensi, Admin)
- ✅ Role changes (promotion/demotion)
- ✅ Failed auth attempts

---

## 🛠️ 8. Security Checklist (PR Gate)

Before merging ANY PR, verify:

**Backend (`be/*`):**
- [ ] Zod schema defined for ALL Server Actions
- [ ] RLS policies exist for affected tables
- [ ] No `console.log` of secrets/JWT in production code
- [ ] Service role key NOT used in client components
- [ ] Pagination implemented (no `findMany()` without limit)

**Frontend (`fe/*`):**
- [ ] No direct `fetch()` calls to Supabase (use Server Actions only)
- [ ] No sensitive data in `NEXT_PUBLIC_*` vars
- [ ] Images use approved domains only (no user-supplied URLs without validation)

**Integration (`pr/*`):**
- [ ] Auth flow tested (login → dashboard → logout)
- [ ] Unauthorized access denied (try accessing `/admin/settings` as `admin` role)
- [ ] RLS policies effective (try reading another user's data)

---

## 🚨 9. Incident Response

**If data breach suspected:**
1. Rotate `JWT_SECRET` immediately (all sessions invalidated)
2. Check Supabase logs for anomalous queries
3. Review RLS policies (any bypass?)
4. Notify team via emergency channel

---

## 📚 10. References

- **Supabase RLS Docs:** https://supabase.com/docs/guides/auth/row-level-security
- **Next.js Security:** https://nextjs.org/docs/authentication
- **OWASP Top 10:** https://owasp.org/www-project-top-ten/

---

**Last Review:** 14 Mei 2026 | **Status:** ✅ Active  
**Owner:** Security Team | **Next Review:** Quarterly
