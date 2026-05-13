# 🗺️ Roadmap — ANF-Agentic Architecture Project

**Portal Web Terpadu Kelurahan Wergu Wetan**  
**Maintained by:** AlrafuruNotFound | **Last Updated:** 14 Mei 2026

---

## 📋 Philosophy

Roadmap ini mengikuti **ANF-Agentic Architecture** branching strategy:
- `be/*` untuk development backend
- `fe/*` untuk development frontend  
- `pr/*` untuk integrasi & testing
- `main` untuk production release

Each item di-tracking dengan status: `[TODO]`, `[IN-PROGRESS]`, `[DONE]`, `[BLOCKED]`.

---

## 🎯 Q2 2026 — Sprint 1-2 (Current)

### 🔐 Authentication & Security [DONE]

| Task | Branch | Status | Owner |
|------|--------|--------|-------|
| JWT implementation with jose | `be/auth` | ✅ DONE | BE Team |
| HTTP-only cookie setup | `be/auth` | ✅ DONE | BE Team |
| Admin login page UI | `fe/login` | ✅ DONE | FE Team |
| RLS policies for all tables | `be/db` | ✅ DONE | BE Team |
| Security policy documentation | `docs` | ✅ DONE | Tech Lead |

### 📰 Content Management [DONE]

| Task | Branch | Status | Owner |
|------|--------|--------|-------|
| News (Kegiatan) CRUD Server Actions | `be/berita-crud` | ✅ DONE | BE Team |
| News listing page (public) | `fe/berita-list` | ✅ DONE | FE Team |
| News detail page | `fe/berita-detail` | ✅ DONE | FE Team |
| Banner carousel (homepage) | `fe/banner-carousel` | ✅ DONE | FE Team |
| Stitch integration for HeroCarousel | `fe/stitch-hero` | ✅ DONE | FE Team |

---

## 🎯 Q2 2026 — Sprint 3-4 (Up Next)

### 🏠 Homepage Optimization [IN-PROGRESS]

| Task | Branch | Status | Owner |
|------|--------|--------|-------|
| Statistics data loading | `be/home-stats` | ⏳ IN-PROGRESS | BE Team |
| Services (Layanan) display | `fe/home-services` | ⏳ IN-PROGRESS | FE Team |
| Welcome message (Lurah) | `be/home-welcome` | ⏳ IN-PROGRESS | BE Team |
| Responsive mobile layout | `fe/mobile-responsive` | ⏳ IN-PROGRESS | FE Team |
| Performance audit | `pr/performance` | ⏳ IN-PROGRESS | Both |

### 📝 Application Forms [TODO]

| Task | Branch | Status | Owner |
|------|--------|--------|-------|
| Letter request (Pengajuan Surat) form | `fe/letter-form` | [TODO] | FE Team |
| Form validation (Zod) | `be/letter-validation` | [TODO] | BE Team |
| Database storage for applications | `be/letter-crud` | [TODO] | BE Team |
| Admin notification system | `be/notifications` | [TODO] | BE Team |

---

## 🚀 Q3 2026 — Future Releases

### 🔍 Advanced Search [TODO]

| Task | Branch | Status | Owner |
|------|--------|--------|-------|
| Full-text search (PostgreSQL FTS) | `be/search-fts` | [TODO] | BE Team |
| Search modal (Cmd+K) | `fe/search-modal` | [TODO] | FE Team |
| Search result highlighting | `fe/search-results` | [TODO] | FE Team |
| Search analytics tracking | `be/search-analytics` | [TODO] | BE Team |

### 📊 Data Import/Export [TODO]

| Task | Branch | Status | Owner |
|------|--------|--------|-------|
| Excel import for statistics | `be/excel-import` | [TODO] | BE Team |
| Excel export for reports | `be/excel-export` | [TODO] | BE Team |
| Template download endpoint | `be/template-endpoint` | [TODO] | BE Team |
| Frontend upload UI | `fe/upload-ui` | [TODO] | FE Team |

### 🎨 Design System Expansion [TODO]

| Task | Branch | Status | Owner |
|------|--------|--------|-------|
| Component library (`components/ui/`) | `fe/ui-primitives` | [TODO] | FE Team |
| Design tokens → Figma Variables | `docs/design-tokens` | [TODO] | Design Team |
| Accessibility audit (WCAG 2.1) | `pr/a11y-audit` | [TODO] | Both |
| Dark mode support | `fe/theme-dark` | [TODO] | FE Team |

---

## 🏗️ Technical Debt & Refactoring [TODO]

| Task | Branch | Priority | Owner |
|------|--------|----------|-------|
| Extract primitive components to `components/ui/` | `fe/refactor-ui` | Medium | FE Team |
| Add refresh token mechanism (JWT) | `be/auth-refactor` | High | BE Team |
| Implement rate limiting on login | `be/rate-limit` | High | BE Team |
| Migrate to middleware.ts for auth | `fe/middleware-auth` | Low | FE Team |
| Add E2E tests (Playwright) | `pr/e2e-tests` | Medium | QA Team |
| Upgrade Tailwind v3 → v4 (already on v4) | `fe/tailwind-upgrade` | Done | — |

---

## 📈 Metrics & KPIs

| Metric | Target | Current |
|--------|--------|---------|
| LCP (Largest Contentful Paint) | < 2.5s | — |
| FID (First Input Delay) | < 100ms | — |
| Admin login success rate | > 99% | — |
| Database query time (avg) | < 100ms | — |
| Bundle size (initial load) | < 200KB | — |

---

## 🔄 Release Cadence

- **Weekly builds:** `be/*` & `fe/*` merged into `develop` branch every Friday
- **Bi-weekly releases:** `develop` → `staging` → `main` every 2 weeks
- **Hotfixes:** `hotfix/*` branches for critical bugs (merge to `main` immediately)

---

## 📅 Timeline Overview

```
Q2 2026 (Apr-Jun):
  ✅ Auth + Basic CMS (News, Banners)
  ⏳ Homepage optimization + letter forms
  ⏳ Search + Excel import/export

Q3 2026 (Jul-Sep):
  ⏳ Advanced features (notifications, dark mode)
  ⏳ Design system expansion
  ⏳ E2E testing

Q4 2026 (Oct-Dec):
  ⏳ Performance optimization
  ⏳ Mobile app (PWA)
  ⏳ Multi-language expansion (beyond ID/EN/JW)
```

---

## 🎯 Success Criteria

Project considered **successful** when:
1. ✅ All core features (CRUD for Berita, Potensi, Banner, Kontak) working
2. ✅ Admin panel fully functional (login, dashboard, management)
3. ✅ Public portal accessible (news, about, services, contact)
4. ✅ Stitch integration complete (design → code workflow)
5. ✅ Zero critical security vulnerabilities (RLS enforced, JWT secure)
6. ✅ Performance meets Core Web Vitals (LCP < 2.5s)

---

**Note:** This roadmap is living document. Update when priorities change.  
**Next Review:** End of Sprint 4 (30 Juni 2026)
