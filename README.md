# Portal Web Terpadu Kelurahan Wergu Wetan

**Status:** ✅ v0.1.0 — Production Ready  
**Architecture:** Vertical Slice Monolith (Next.js App Router)  
**Stack:** Next.js 16.1.6 + React 19 + TypeScript 5 + Tailwind v4 + Prisma + PostgreSQL (Supabase)

---

## 📚 Quick Links

| Guide | Description |
|-------|-------------|
| **[🏗️ Architecture (Master Blueprint)](.docs/architecture.md)** | High-level overview, ANF-Agentic Architecture, branching strategy, data contracts |
| **[⚙️ Backend (Server Actions & Logic)](.docs/be-ssr-logic.md)** | Prisma, JWT auth, RBAC, caching, Supabase integration — for backend devs & agents |
| **[🎨 Frontend / UI (Design System & Stitch)](.docs/fe-ui-ux.md)** | Design tokens, Tailwind→Figma mapping, Stitch AI export for Figma |

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

## 📁 Project Structure

```
wergu-wetan-app/
├── app/                    # Next.js App Router (routes + layouts)
│   ├── (user)/            # Public-facing pages
│   ├── admin/             # Protected admin dashboard
│   └── api/               # Minimal API routes
├── actions/               # Server Actions (backend logic)
├── components/            # React UI components
│   ├── user/             # Public components
│   └── admin/            # Admin components
├── lib/                  # Utilities (Prisma client, helpers)
├── prisma/               # Database schema + seeding
├── public/               # Static assets (images, icons)
└── .docs/               # 📚 Architecture documentation
```

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

Design tokens defined in `app/globals.css`. See [Frontend UI Guide](.docs/fe-ui-ux.md) for full spec.

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
2. **[`be-ssr-logic.md`](.docs/be-ssr-logic.md)** — Backend patterns, Server Actions, Prisma, JWT auth, Supabase, output format for FE consumption
3. **[`fe-ui-ux.md`](.docs/fe-ui-ux.md)** — Frontend UI/UX: design system, Stitch AI integration, Tailwind→Figma mapping, props pattern ("lubang" pattern)

For new contributors: **Read `architecture.md` first.**

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
