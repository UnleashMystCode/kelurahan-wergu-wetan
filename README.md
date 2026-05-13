# Portal Web Terpadu Kelurahan Wergu Wetan

**Status:** ✅ v0.1.0 — Production Ready  
**Architecture:** Vertical Slice Monolith (Next.js App Router)  
**Stack:** Next.js 16.1.6 + React 19 + TypeScript 5 + Tailwind v4 + Prisma + PostgreSQL (Supabase)

---

## 📚 Quick Links

| Guide | Description |
|-------|-------------|
| **[🏗️ Architecture (Master Blueprint)](.docs/architecture.md)** | ANF-Agentic Architecture theory, branching strategy (be/*, fe/*, pr/*), data contracts |
| **[⚙️ Backend Logic (Services & SSR)](.docs/backend-logic.md)** | Server Actions pattern, Prisma queries, data mapping to FE, SSR rules |
| **[🎨 Frontend UI (Design & Stitch)](.docs/frontend-ui.md)** | Design system, Stitch AI integration, component "hole" pattern, Tailwind→Figma |
| **[🔐 Security Policy](.docs/security-policy.md)** | RLS enforcement, JWT, Zod validation, secrets management |
| **[🗺️ Roadmap](.docs/roadmap.md)** | Feature timeline, sprint tracking, priorities |

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
   - Admin: `admin` / `admin`
   - Super Admin: `superadmin` / `superadmin`

---

## 📁 Project Structure (Logical Workspace)

```
wergu-wetan-app/
├── app/                    # Next.js App Router (Routes + Layouts) — FE workspace
│   ├── (user)/            # Public-facing pages
│   ├── admin/             # Protected CMS dashboard
│   └── api/               # Minimal API routes (Excel template only)
│
├── actions/               # Server Actions (Backend Logic) — BE workspace
│   ├── auth.action.ts
│   ├── berita.action.ts
│   └── ...
│
├── components/            # React UI components — FE workspace
│   ├── user/             # Public components
│   └── admin/            # Admin components
│
├── lib/                  # Utilities + Helpers — BE workspace
│   ├── db.ts            # Prisma singleton
│   └── services/        # Business logic services (optional)
│
├── prisma/               # Database Schema + Seeding — BE workspace
│   ├── schema.prisma
│   └── seed.ts
│
├── public/               # Static assets (images, icons)
├── .docs/               # 📚 ANF-Agentic Architecture documentation
│   ├── architecture.md        # Master blueprint
│   ├── backend-logic.md       # BE patterns & SSR
│   ├── frontend-ui.md         # FE UI & Stitch
│   ├── security-policy.md     # Security rules
│   └── roadmap.md             # Feature timeline
│
└── .env.example          # Environment template
```

**Workspace Separation (ANF Theory):**
- **BE workspace** (`be/*` branch): `actions/`, `lib/`, `prisma/` — Server Actions, Prisma, services
- **FE workspace** (`fe/*` branch): `components/`, `app/` — UI components, pages, layouts
- **Integration** (`pr/*` branch): Merge BE + FE → test data contracts (props "holes")
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

Design tokens defined in `app/globals.css`. See [Frontend UI Guide](.docs/frontend-ui.md) for full spec.

---

## 🏗️ ANF-Agentic Architecture

**Created by:** [AlrafuruNotFound](https://github.com/AlrafuruNotFound) — Agentic Architecture for Modular Development

This project implements the **ANF-Agentic Architecture** pattern (AlrafuruNotFound-Agentic Architecture), designed for:
- **Agentic collaboration:** Human developers + AI agents (Antigravity, Claude Code, etc.)
- **Modular structure:** Clear separation between BE/FE via branch-based workflow (`be/*`, `fe/*`, `pr/*`)
- **Vertical Slice:** Domain-centric organization (berita, potensi, layanan) over horizontal layers
- **Server Actions First:** Type-safe backend integration without REST overhead

**Key Innovation:** Explicit data contracts (props interfaces) as integration boundaries between BE (services) and FE (components).

---

## 📖 Documentation

All architecture decisions live in **[`.docs/`](.docs/)**:

1. **[`architecture.md`](.docs/architecture.md)** — ANF-Agentic Architecture master blueprint, branching strategy (be/*, fe/*, pr/*), data contracts between BE/FE
2. **[`backend-logic.md`](.docs/backend-logic.md)** — Backend patterns: Service encapsulation, Server Actions, Prisma, Zod validation, SSR guidelines
3. **[`frontend-ui.md`](.docs/frontend-ui.md)** — Frontend UI/UX: design system, Stitch AI integration, Tailwind→Figma mapping, props "hole" pattern
4. **[`security-policy.md`](.docs/security-policy.md)** — Security: RLS, JWT, Zod, secrets, audit logging
5. **[`roadmap.md`](.docs/roadmap.md)** — Feature roadmap, sprint planning, priority tracking

**For new contributors:** Read `architecture.md` first, then branch-specific docs (`backend-logic.md` or `frontend-ui.md`).

**For AI Agents (Antigravity/Claude Code):** Use prompt: "Follow ANF-Agentic Architecture, see .docs/architecture.md and .docs/backend-logic.md (or frontend-ui.md)."

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

1. Create feature branch: `git checkout -b feature/your-feature`
2. Follow vertical slice architecture (add to `actions/`, `components/` as domain)
3. All backend logic → Server Actions (never create API routes without discussion)
4. Write Zod schemas for all inputs
5. Run `npm run lint` & `npm run format` before PR
6. Update `.docs/` if architecture changes

---

## 📄 License

© 2026 Pemerintah Kabupaten Kudus. All rights reserved.

---

**Need help?** Check the architecture docs in [`.docs/`](.docs/) first, then ask in team channel.
