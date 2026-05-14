# 📚 ANF-Agentic Architecture Documentation

Welcome to the official documentation for **Portal Web Terpadu Kelurahan Wergu Wetan**.

This documentation suite follows the **ANF-Agentic Architecture** pattern — a modular, branch-driven approach for collaborative development between human engineers and AI agents.

---

## 🎯 Quick Start

**New to the project?** Read in this order:

1. **[`project-manifest.md`](project-manifest.md)** — Active inventory of all files, cleanup queue (start here to verify codebase state)
2. **[`architecture.md`](architecture.md)** — Branching strategy (`be/*`, `fe/*`, `pr/*`), data contracts, project philosophy
3. **[`backend-logic.md`](backend-logic.md)** — Server Actions pattern, Prisma, Zod validation, JWT auth
4. **[`frontend-ui.md`](frontend-ui.md)** — Design system, Stitch workflow (optional), component "hole" pattern
5. **[`security-policy.md`](security-policy.md)** — RLS, JWT, secrets, audit logging, PR checklist
6. **[`roadmap.md`](roadmap.md)** — Current sprints, feature status, priorities

---

## 📖 Document Overview

### Core Architecture
| Document | Purpose | Audience |
|----------|---------|----------|
| [`project-manifest.md`](project-manifest.md) | Active inventory, file ownership, cleanup queue (sanitize codebase) | All developers, Agents |
| [`architecture.md`](architecture.md) | Master blueprint: ANF theory, branching strategy, data contracts | Tech Leads, Architects, AI Agents |
| [`backend-logic.md`](backend-logic.md) | Backend patterns: Server Actions, Prisma, Zod, JWT, data mapping | Backend Devs, AI Agents |
| [`frontend-ui.md`](frontend-ui.md) | FE patterns: Design system, Stitch, props "holes", responsive UX | Frontend Devs, AI Agents |
| [`security-policy.md`](security-policy.md) | Security mandates: RLS, JWT, secrets, audit logging, PR gate | All developers |
| [`roadmap.md`](roadmap.md) | Feature timeline, sprint planning, priority tracking by branch | Product, Teams |

---

## 🌿 Branch-Based Development

This project uses **branch ownership** to separate concerns:

| Branch Type | Prefix | Scope | Docs Reference |
|-------------|--------|-------|----------------|
| Backend | `be/*` | Server Actions, services, Prisma, lib/ | [`backend-logic.md`](backend-logic.md), [`project-manifest.md`](project-manifest.md) (inventory) |
| Frontend | `fe/*` | Components, pages, layouts, styles | [`frontend-ui.md`](frontend-ui.md), [`project-manifest.md`](project-manifest.md) (inventory) |
| Integration | `pr/*` | Merged BE + FE, testing contracts | [`architecture.md`](architecture.md) |
| Production | `main` | Stable, tested, deployed | — |

**Workflow:**
```
feature-x (BE) → feature-x (FE) → merge into pr/feature-x → test → merge to main
   be/xxx           fe/xxx                 pr/xxx
```

**Sanity check:** Before adding new files, ensure they're registered in [`project-manifest.md`](project-manifest.md). Unregistered files may be flagged for deletion.

---

## 🔑 Key Concepts

### 1. Data Contracts (Props "Holes")
FE components define explicit props interfaces. BE Server Actions return data that exactly matches those interfaces.

```typescript
// FE: Component defines "hole"
interface CardProps { title: string; content: string; }

// BE: Server Action fills "hole"
export async function getCards(): Promise<ApiResponse<CardProps[]>> {
  const data = await prisma.card.findMany();
  return { success: true, data };
}

// FE: Page receives data and passes to component
const { data } = await getCards();
return <Card {...data} />;
```

See: [`architecture.md`](architecture.md) §5, [`frontend-ui.md`](frontend-ui.md) §3

### 2. ApiResponse Envelope
All Server Actions return standardized envelope:

```typescript
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  errors?: ZodError[];
  message?: string;
};
```

See: [`backend-logic.md`](backend-logic.md) §3

### 3. Zod Validation (Mandatory)
Never trust client input. All Server Actions must validate with Zod:

```typescript
const Schema = z.object({ name: z.string().min(3) });
export async function action(formData: FormData) {
  const validated = Schema.parse({ name: formData.get('name') });
  // ... proceed
}
```

See: [`security-policy.md`](security-policy.md) §4

### 4. RLS (Row Level Security)
Supabase tables must have RLS enabled. Policies enforce data access control at database level.

See: [`security-policy.md`](security-policy.md) §2

---

## 🧭 Navigating This Documentation

### By Role

| You are... | Start here | Then read |
|------------|------------|-----------|
| **Backend Developer** | [`backend-logic.md`](backend-logic.md) | [`architecture.md`](architecture.md) → [`security-policy.md`](security-policy.md) |
| **Frontend Developer** | [`frontend-ui.md`](frontend-ui.md) | [`architecture.md`](architecture.md) → [`backend-logic.md`](backend-logic.md) (for data contracts) |
| **Tech Lead / Architect** | [`architecture.md`](architecture.md) | All others |
| **Security Reviewer** | [`security-policy.md`](security-policy.md) | [`backend-logic.md`](backend-logic.md), [`architecture.md`](architecture.md) |
| **Product Manager** | [`roadmap.md`](roadmap.md) | [`architecture.md`](architecture.md) (for branch context) |
| **AI Agent (Claude/Antigravity)** | Agent Quick-Start below | Feature-specific doc (BE or FE) |

### By Task

| Task | Relevant Docs |
|------|---------------|
| Implement new feature (backend) | [`backend-logic.md`](backend-logic.md), [`architecture.md`](architecture.md) |
| Implement new feature (frontend) | [`frontend-ui.md`](frontend-ui.md), [`architecture.md`](architecture.md) |
| Integrate BE + FE | [`architecture.md`](architecture.md), [`roadmap.md`](roadmap.md) |
| Fix security issue | [`security-policy.md`](security-policy.md), [`backend-logic.md`](backend-logic.md) |
| Add design component | [`frontend-ui.md`](frontend-ui.md), Stitch workflow |
| Debug auth | [`backend-logic.md`](backend-logic.md) (Auth), [`security-policy.md`](security-policy.md) (JWT) |
| Clean up / delete files | [`project-manifest.md`](project-manifest.md) (Active Inventory + Cleanup Queue) |

---

## 🤖 Agent Quick-Start

**For AI agents (Antigravity, Claude Code) implementing features:**

1. **Identify branch type:**
   - `be/<feature>` for backend logic (Server Actions, Prisma, Zod)
   - `fe/<feature>` for frontend UI (components, pages, styles)
   - `pr/<feature>` for integration testing

2. **Read relevant doc first:**
   - Backend → [`backend-logic.md`](backend-logic.md)
   - Frontend → [`frontend-ui.md`](frontend-ui.md)
   - Always skim [`architecture.md`](architecture.md) §3 (branching) and §5 (data contracts)

3. **Mandatory checklist:**
   - [ ] Server Action uses `'use server'`
   - [ ] Zod schema defined & validated
   - [ ] Returns `ApiResponse<T>` envelope
   - [ ] RLS policy exists if touching DB (see [`security-policy.md`](security-policy.md))
   - [ ] FE component has explicit props interface ("hole")
   - [ ] Data mapping: DB fields → FE props format in Server Action
   - [ ] New files registered in [`project-manifest.md`](project-manifest.md)

4. **Prompt template when asked to implement:**
   ```
   Follow ANF-Agentic Architecture:
   - Branch: be/<name> or fe/<name> based on task
   - Server Actions only (no API routes)
   - Zod validation required
   - Return ApiResponse envelope
   - FE components are "dumb" (props in, UI out)
   - Ref: .docs/<relevant-doc>.md
   ```

---

## 📂 Document Maintenance

**Update triggers:**
- New feature → add to [`roadmap.md`](roadmap.md), update [`project-manifest.md`](project-manifest.md) inventory
- File added/removed → update [`project-manifest.md`](project-manifest.md)
- Architecture change → update [`architecture.md`](architecture.md)
- Backend pattern change → update [`backend-logic.md`](backend-logic.md)
- Design system change → update [`frontend-ui.md`](frontend-ui.md)
- Security policy change → update [`security-policy.md`](security-policy.md)

**Review cadence:**
- Architecture: every sprint retro
- Backend/FE guides: every 2 sprints
- Security: quarterly
- Roadmap: every sprint planning

---

## 🔗 External References

- **Next.js Server Actions:** https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
- **Prisma ORM:** https://www.prisma.io/docs
- **Zod Validation:** https://zod.dev/
- **jose JWT:** https://github.com/panva/jose
- **Supabase RLS:** https://supabase.com/docs/guides/auth/row-level-security
- **Tailwind CSS v4:** https://tailwindcss.com/docs
- **Stitch AI:** https://stitch.withgoogle.com/

---

**📁 All files in this directory:** `architecture.md`, `backend-logic.md`, `frontend-ui.md`, `project-manifest.md`, `security-policy.md`, `roadmap.md`, `README.md`

**Last updated:** 14 Mei 2026 | **Maintainer:** Engineering Team
