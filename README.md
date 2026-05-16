# Portal Web Terpadu Kelurahan Wergu Wetan

**Status:** ✅ v0.1.0 — Production Ready  
**Architecture:** ANF-Agentic (Vertical Slice Monolith — Next.js App Router)  
**Stack:** Next.js 16.1.6 + React 19 + TypeScript 5 + Tailwind v4 + Prisma + PostgreSQL (Supabase)  
**Rendering:** `force-dynamic` enforced on all pages — konten selalu real-time dari DB

---

## 📚 Quick Links

| Guide | Description |
|-------|-------------|
| **[🏗️ Architecture (Master Blueprint)](.docs/architecture.md)** | ANF-Agentic Architecture theory, branching strategy, data contracts, file ownership |
| **[⚙️ Backend Logic (BE Workspace)](.docs/backend-logic.md)** | Server Actions pattern, Prisma ORM, Zod validation, JWT auth, data mapping to FE |
| **[🎨 Frontend Design (FE Workspace)](.docs/frontend-design.md)** | Design system, component "hole" pattern, Tailwind v4 custom themes |
| **[🤖 MCP & AI Skills](.docs/mcp-and-skills.md)** | Panduan integrasi AI, prompt engineering, dan daftar Tools untuk LLM |
| **[🔐 Security Policy](.docs/security-policy.md)** | RLS enforcement, JWT, Zod validation, secrets management |
| **[🗺️ Roadmap](.docs/roadmap.md)** | Feature timeline, sprint tracking, priorities by branch |
| **[📝 Changelog](.docs/CHANGELOG.md)** | Log kronologis seluruh pembaruan arsitektur dan fitur |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: 20.x LTS)
- PostgreSQL (Supabase) or local instance
- npm or yarn

### Installation

1. Clone repository
2. Copy `.env.example` → `.env` and fill in values:
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase/PostgreSQL credentials
   ```

3. Install dependencies & generate Prisma client:
   ```bash
   npm install
   ```

4. Run database migrations & seed data:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. Start development server:
   ```bash
   npm run dev
   # → https://localhost:3000 (self-signed HTTPS)
   ```

6. Login to admin panel:
   - URL: https://localhost:3000/admin/login
   - *Catatan: Referensi password akun admin default bisa dilihat di `prisma/seed.ts`*

---

## 📁 Project Structure (Logical Workspace)

```
wergu-wetan-app/
├── app/                        # Next.js App Router — FE workspace
│   ├── admin/                 # Protected CMS dashboard
│   ├── api/                   # Minimal — Excel template only
│   ├── globals.css            # Tailwind + CSS custom properties
│   └── tw-safelist.txt        # VITAL — dynamic Tailwind classes
│
├── actions/                   # Server Actions — BE workspace
│   ├── auth.action.ts
│   ├── berita.action.ts
│   └── ...
│
├── components/                # React Components — FE workspace
│   ├── user/                 # Public components
│   └── admin/                # Admin components
│
├── lib/                      # Utilities — BE workspace
│   ├── db.ts                # Prisma singleton
│   └── services/            # Business logic (optional)
│
├── prisma/                   # Database Schema — BE workspace
│   ├── schema.prisma
│   └── seed.ts
│
├── public/                   # Static assets (images, icons)
└── .docs/                   # 📚 ANF-Agentic Architecture documentation
    ├── CHANGELOG.md         # Single source of truth untuk log pembaruan
    ├── project-manifest.md  # Active inventory & cleanup queue
    ├── architecture.md      # Master blueprint (Peta Utama)
    ├── backend-logic.md     # BE patterns & SSR
    ├── frontend-design.md   # FE Design System, The "Hole" Pattern
    ├── mcp-and-skills.md    # AI tools & prompt integration
    ├── security-policy.md   # Security rules
    └── roadmap.md           # Feature timeline
```

**Workspace Separation (ANF Theory):**
- **BE workspace** (`be/*` branch): `actions/`, `lib/`, `prisma/` — Server Actions, Prisma, services
- **FE workspace** (`fe/*` branch): `components/`, `app/` — UI components, pages, layouts
- **Integration** (`pr` branch): Merge BE + FE → test data contracts (props "holes")
- **Production** (`main` branch): Stable, tested, deployed

---

## 🔐 Environment Variables

| Variable | Required? | Description |
|----------|-----------|-------------|
| `DATABASE_URL` | ✅ | Supabase/PostgreSQL connection string (pooled) |
| `DIRECT_URL` | ✅ | Direct DB connection (for migrations) |
| `JWT_SECRET` | ✅ | Random 64-char secret for JWT signing |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Public URL of your app (e.g., `https://wergu-wetan.id`) |

See `.env.example` for template.

---

## 🗄️ Database (Supabase)

This project uses **Supabase PostgreSQL** with Prisma ORM.

**Connection pattern:**
- App server → `DATABASE_URL` (pooled, port 6543) — for runtime queries
- Migrations → `DIRECT_URL` (direct, port 5432) — for `prisma migrate`

**Models:** 14 Prisma models covering content, users, config, and operations.

---

## 🎨 Design System

- **Font:** Plus Jakarta Sans (Google Fonts)
- **Colors:** Brand palette (`brand-dark: #0D47A1`, `brand-base: #1565C0`)
- **Framework:** Tailwind CSS v4 (CSS Variables)
- **Icons:** Lucide React
- **Animations:** Framer Motion

Design tokens defined in `app/globals.css`. See [Frontend Design Guide](.docs/frontend-design.md) for full spec.

---

## 🏗️ ANF-Agentic Architecture

**Created by:** [AlrafuruNotFound](https://github.com/AlrafuruNotFound) — Agentic Architecture for Modular Development

This project implements the **ANF-Agentic Architecture** pattern (AlrafuruNotFound-Agentic Architecture), designed for:
- **Agentic collaboration:** Human developers + AI agents (Antigravity, Claude Code, etc.)
- **Modular structure:** Clear separation between BE/FE via branch-based workflow (`be/*`, `fe/*`, `pr`)
- **Vertical Slice:** Domain-centric organization (berita, potensi, layanan) over horizontal layers
- **Server Actions First:** Type-safe backend integration without REST overhead

**Key Innovation:** Explicit data contracts (props interfaces) as integration boundaries between BE (Server Actions) and FE (components).

📖 See **[`.docs/architecture.md`](.docs/architecture.md)** for full specification.

---

## 📖 Documentation

Core documentation in **[`.docs/`](.docs/)**:

1. **[`CHANGELOG.md`](.docs/CHANGELOG.md)** — **BACA INI DULU** jika ada perubahan baru. Tempat mencatat semua pembaruan sistem.
2. **[`project-manifest.md`](.docs/project-manifest.md)** — Active inventory, file ownership, cleanup queue (sanitize codebase)
3. **[`architecture.md`](.docs/architecture.md)** — Master blueprint, ANF-Agentic Architecture theory, branching strategy, data contracts
4. **[`backend-logic.md`](.docs/backend-logic.md)** — Backend patterns: Server Actions, Prisma, Zod validation, JWT auth, database config
5. **[`frontend-design.md`](.docs/frontend-design.md)** — Frontend Design System: design tokens, component "hole" pattern, Stitch workflow, styling constraints
6. **[`mcp-and-skills.md`](.docs/mcp-and-skills.md)** — MCP Integration: AI Assistant skills, payload schema, and interaction rules
7. **[`security-policy.md`](.docs/security-policy.md)** — Security: RLS, JWT, Zod, secrets, audit logging, PR checklist
8. **[`roadmap.md`](.docs/roadmap.md)** — Feature timeline, sprint planning, priority tracking

**For new contributors:** Start with [`architecture.md`](.docs/architecture.md), then branch-specific docs ([`backend-logic.md`](.docs/backend-logic.md) or [`frontend-design.md`](.docs/frontend-design.md)).

**For AI Agents (Antigravity/Claude Code):** Prompt: "Follow ANF-Agentic Architecture. Cek `CHANGELOG.md` lalu baca `architecture.md`. Jika butuh BE, cek `backend-logic.md`, jika butuh FE cek `frontend-design.md`, jika bertindak sebagai asisten integrasi cek `mcp-and-skills.md`."

---

## 🧪 Troubleshooting

### EPERM Error on Windows (Prisma)
```bash
# Kill Node processes first
taskkill /F /IM node.exe

# Delete .prisma/client manually
rmdir /s /q node_modules\.prisma\client

# Reinstall as Administrator
npm install
```

### HTTPS Certificate Warning
Running `npm run dev` uses `--experimental-https` with a self-signed cert. Browser will show warning — accept it anyway (localhost is safe).

### Database Connection Failed
- Verify `DATABASE_URL` is correct (use Supabase connection string)
- Check IP allowlist in Supabase dashboard (add your IP or allow all)
- Test with: `npx prisma studio`

---

## 🤝 Contributing

1. Identify scope: backend (`be/*`) or frontend (`fe/*`)
2. Create feature branch:
   - Backend: `git checkout -b be/<domain>-<desc>` (e.g., `be/berita-crud`)
   - Frontend: `git checkout -b fe/<domain>-<desc>` (e.g., `fe/berita-card-ui`)
3. Follow vertical slice architecture (add domain code to `actions/` or `components/`)
4. All backend logic → Server Actions (never create API routes without discussion)
5. Write Zod schemas for all Server Action inputs
6. Implement FE component with explicit props interface ("hole")
7. Run `npm run lint` & `npm run format` before PR
8. **Add new files to [`project-manifest.md`](.docs/project-manifest.md) inventory**
9. After BE + FE complete, merge into `pr` for integration testing
10. Update `.docs/` if architecture or patterns change
11. Reference: [`.docs/architecture.md`](.docs/architecture.md) for full branching workflow

---

## 📄 License

© 2026 Pemerintah Kabupaten Kudus. All rights reserved.

---

**Need help?** Check the architecture docs in [`.docs/`](.docs/) first, then ask in team channel.
