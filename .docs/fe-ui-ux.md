# 🎨 Frontend / UI — Design System & Stitch Integration

**Purpose:** UI/UX implementation, design system management, dan integration dengan backend via props pattern within **ANF-Agentic Architecture**.

---

## 🌿 2. Branch Context: `fe/*` (Frontend Workspace)

**Fokus:** Semua yang berhubungan dengan UI/UX dan presentation layer.

**Kewenangan:**
- ✅ **`components/`** — UI components (dengan "lubang" untuk data)
- ✅ **`app/`** — Pages dan layouts
- ✅ **`app/globals.css`** — Design tokens
- ❌ **Tidak touch:** `actions/`, `services/`, `lib/` (BE territory)

**Output:** Komponen React siap diisi data oleh BE functions.

---

## 🧩 3. Design System (The "Source of Truth")

### CSS Custom Properties (Tailwind v4)

**File:** `app/globals.css`

```css
@layer theme {
  :root {
    /* Brand Colors — DO NOT MODIFY */
    --color-brand-dark: #0D47A1;   /* Headers, footers, serious CTAs */
    --color-brand-base: #1565C0;   /* Interactive: buttons, hover, links */

    /* Text Colors */
    --color-text-dark: #272727;    /* All headings & body text */
    --color-text-muted: #7C7C7C;   /* Metadata, timestamps, secondary */

    /* Backgrounds (optional) */
    --color-bg-light: #F8FAFC;
    --color-border: #E2E8F0;
  }
}
```

### Typography — Plus Jakarta Sans

**Google Fonts import (`app/layout.tsx`):**
```typescript
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});
```

**Type Scale:**
| Element | Tailwind | Weight | Line Height |
|---------|----------|--------|-------------|
| H1 (Page title) | `text-3xl` | `font-bold` (700) | `leading-tight` |
| H2 (Section) | `text-2xl` | `font-bold` (700) | `leading-snug` |
| H3 (Subsection) | `text-xl` | `font-semibold` (600) | `leading-snug` |
| Body | `text-base` | `font-normal` (400) | `leading-relaxed` |
| Small/Meta | `text-sm` | `font-normal` (400) | `leading-normal` |

---

## 🔗 4. Stitch AI Integration Guide (FE Workflow)

### The "Hole" Pattern — FE Creates Props Interface

**FE makes "holes" (props), BE fills them with data.**

**Step 1 — Define Props Interface (FE):**
```typescript
// components/user/BeritaCard.tsx (FE — UI only, no data fetching)
'use client';

export interface BeritaCardProps {
  // These are the "holes" — BE will provide these values
  judul: string;
  isi: string;
  gambar?: string;
  kategori: string;
  penulis: string;
  tanggal: string;
  slug: string;
}

export function BeritaCard({ judul, isi, gambar, kategori, penulis, tanggal, slug }: BeritaCardProps) {
  // Pure UI — no database calls, no Server Actions
  return (
    <article className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {gambar && (
        <img src={gambar} alt={judul} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <span className="text-xs font-semibold text-brand-base uppercase">{kategori}</span>
        <h3 className="font-bold text-lg mt-1 line-clamp-2">{judul}</h3>
        <p className="text-sm text-text-muted mt-2 line-clamp-3">{isi}</p>
        <div className="mt-4 text-xs text-text-muted">
          Oleh {penulis} • {new Date(tanggal).toLocaleDateString('id-ID')}
        </div>
      </div>
    </article>
  );
}
```

**Step 2 — BE Fills the Holes (Server Action):**
```typescript
// actions/berita.action.ts (BE — Server Action)
export async function getAllBerita(): Promise<ApiResponse<Berita[]>> {
  try {
    const raw = await prisma.kegiatan.findMany({
      where: { status: 'Aktif' },
      orderBy: { tanggal: 'desc' },
      take: 10,
    });

    // Map DB fields → FE props format (fills the holes)
    const data: Berita[] = raw.map(b => ({
      judul: b.judul,
      isi: b.isi,
      gambar: b.gambar || '/images/default-news.png',
      kategori: b.kategori,
      penulis: b.penulis,
      tanggal: b.tanggal.toISOString(), // FE receives ISO string
      slug: b.slug,
    }));

    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
```

**Step 3 — FE Page Orchestrates (Client Component Wrapper):**
```typescript
// app/berita/page.tsx (FE — calls BE, passes to UI)
'use client';

import { getAllBerita } from '@/actions/berita.action';
import { BeritaCard } from '@/components/user/BeritaCard';

export default async function BeritaPage() {
  const { data: beritaList, success } = await getAllBerita();

  if (!success || !beritaList) {
    return <div className="p-8 text-center text-red-600">Gagal memuat berita</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-text-dark mb-8">Berita Terbaru</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beritaList.map(berita => (
          <BeritaCard key={berita.slug} {...berita} />
        ))}
      </div>
    </div>
  );
}
```

---

## 📋 5. Components Priority for Stitch Export

Order by UI-first, stateless, and reusable:

### 🔴 High Priority (Public Portal)

| Component | File | Props Interface (the "holes") |
|-----------|------|-----------------------------|
| **Navbar** | `components/user/Navbar.tsx` | `{ currentPath: string, navItems: NavItem[] }` |
| **Footer** | `components/user/Footer.tsx` | `{ contact: ContactInfo, links: Link[] }` |
| **HeroCarousel** | `components/user/HeroCarousel.tsx` | `{ banners: Banner[] }` |
| **BeritaCard** | `components/user/BeritaCard.tsx` | `{ judul, isi, gambar?, kategori, penulis, tanggal, slug }` |
| **PotensiCard** | `components/user/PotensiDesaCard.tsx` | `{ judul, deskripsiSingkat, gambar?, kategori, slug }` |

### 🟡 Medium Priority (Admin Dashboard)

| Component | File | Props |
|-----------|------|-------|
| **AdminSidebar** | `components/admin/AdminSidebar.tsx` | `{ userRole: 'admin' | 'super', activeRoute: string }` |
| **AdminHeader** | `components/admin/AdminHeader.tsx` | `{ user: { namaLengkap, role } }` |
| **BeritaForm** | `components/admin/AdminBeritaForm.tsx` | `{ initialData?, onSubmit, loading }` |

### 🟢 Low Priority (Specialized)

| Component | File | Purpose |
|-----------|------|---------|
| **GlobalSearchModal** | `components/user/GlobalSearchModal.tsx` | Cmd+K search UI (controlled props) |
| **CommandPalette** | `components/admin/CommandPalette.tsx` | Admin quick actions |

---

## 🚀 6. Step-by-Step: Export Component to Stitch

### Step 1: Prepare Component for Stitch

**Transform Next.js component → Stitch-compatible:**

```typescript
// BEFORE: Next.js component (components/user/Navbar.tsx)
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  return (
    <Link href="/home" className={pathname === '/home' ? 'text-blue-600' : 'text-gray-600'}>
      Home
    </Link>
  );
}
```

```typescript
// AFTER: Stitch-ready (Navbar.stitch.tsx)
'use client';

export interface NavItem {
  href: string;
  label: string;
}

export interface NavbarProps {
  currentPath: string;          // BE/Page passes this
  navItems: NavItem[];          // Static route config
}

export function Navbar({ currentPath, navItems }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-base flex items-center justify-center">
              <span className="text-white font-bold text-sm">WW</span>
            </div>
            <span className="font-bold text-xl text-text-dark">Wergu Wetan</span>
          </div>

          {/* Navigation — now uses navItems prop (FE data) */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-brand-base ${
                  currentPath === item.href ? 'text-brand-base' : 'text-text-muted'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
```

**Key changes for Stitch compatibility:**
1. ✅ **Add `'use client'`** directive (required by Stitch)
2. ✅ **Define `interface Props`** — explicit data contract
3. ✅ **Replace `<Link>` → `<a>`** (or keep Link, Stitch will handle)
4. ✅ **Remove `next/navigation` hooks** — use static `currentPath` prop
5. ✅ **Remove dynamic className templates** (`className={\`bg-${color}\`}` → not supported)
6. ✅ **Use absolute image URLs** or placeholders

---

### Step 2: Generate Public Raw URL

Stitch requires **public HTTP(S) URL** to component file:

**Option A — GitHub Raw:**
```
https://raw.githubusercontent.com/username/repo/main/stitch_export/Navbar.tsx
```

**Option B — Vercel Deployment:**
```
https://your-app.vercel.app/stitch_export/Navbar.tsx
```

**Stitch URL format:**
```
https://stitch.withgoogle.com/copy?url=<ENCODED_URL>&name=ComponentName
```

Example:
```
https://stitch.withgoogle.com/copy?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmy-org%2Fwergu-wetan%2Fmain%2Fstitch_export%2FNavbar.tsx&name=WW_Navbar
```

---

### Step 3: Import to Figma via Stitch

1. Open https://stitch.withgoogle.com/
2. Paste the full Stitch URL in browser address bar
3. Stitch will:
   - Parse React JSX → Figma frames
   - Extract Tailwind classes → Figma fills, shadows, corner radius
   - Create component variants (hover, active, disabled)
4. Component appears in your Figma team library

---

## 🎨 7. Tailwind Classes → Figma Property Map

Stitch recognizes these patterns:

| Tailwind Class | Figma Property | Example |
|----------------|----------------|---------|
| `bg-blue-600` | Fill color `#2563EB` | Primary button |
| `text-text-dark` | Text color `#272727` | All heading/body |
| `rounded-xl` | Corner radius `12px` | Cards, buttons |
| `shadow-lg` | Drop shadow effect | Card elevation |
| `border` | Stroke weight `1px` | Borders |
| `p-4` | Padding `16px` all sides | Spacing |
| `flex` / `flex-col` | Auto Layout (vertical) | Container |
| `items-center` | Align: center | Flex alignment |
| `justify-between` | Justify: space between | Navbar spacing |
| `gap-2` | Space between items `8px` | Flex gap |
| `w-full` | Width constraint "Fill container" | Responsive |
| `h-16` | Fixed height `64px` | Header, banner |

**Complex mappings:**
- `hover:scale-[1.02]` → Interactive variant with `scale: 1.02` transform
- `transition-all` → Smart animate between states
- `backdrop-blur-md` → Background blur `16px`

---

## 🏗️ 8. Design Tokens → Figma Variables

Export CSS variables to Figma Variables:

```css
:root {
  --color-brand-dark: #0D47A1;
  --color-brand-base: #1565C0;
  --color-text-dark: #272727;
  --color-text-muted: #7C7C7C;
}
```

**Figma Variables mapping:**

| Variable Name | Type | Value | Collection |
|---------------|------|-------|------------|
| `color/brand/dark` | Color | `#0D47A1` | Brand Colors |
| `color/brand/base` | Color | `#1565C0` | Brand Colors |
| `color/text/dark` | Color | `#272727` | Text Colors |
| `color/text/muted` | Color | `#7C7C7C` | Text Colors |
| `spacing/unit` | Number | `4px` | Spacing base |

**Publish as Team Library** — agar semua designer pakai standard yang sama.

---

## 📱 9. Responsive Breakpoints (Figma Frames)

Map Tailwind breakpoints ke Figma frame sizes:

| Breakpoint | Min Width | Frame Size (Figma) |
|------------|-----------|-------------------|
| Mobile (base) | 0px | 375×812 (iPhone X) |
| `sm` | 640px | 640×1024 (iPad mini) |
| `md` | 768px | 768×1024 (iPad) |
| `lg` | 1024px | 1024×768 (desktop) |
| `xl` | 1280px | 1280×800 |
| `2xl` | 1536px | 1536×864 |

**Figma best practice:** Buat Auto Layout components, lalu constrain dengan min/max-width.

---

## 🖼️ 10. Image Handling for Stitch

Static assets from `public/images/` require absolute URLs:

```typescript
// BEFORE (Next.js relative path)
<img src="/images/hero_office.png" alt="Office hero" />

// AFTER (Stitch-ready — absolute URL)
<img src="https://wergu-wetan.id/images/hero_office.png" alt="Office hero" />
```

**Why?** Stitch tidak bisa resolve relative paths. Gunakan:
- Absolute URLs (production domain)
- Placeholder images (via unsplash.com) untuk preview

**Image specs:**
- Hero banners: 1920×800 (desktop), 768×400 (tablet), 400×300 (mobile)
- Thumbnails: 400×300
- Staff photos: 200×200 (square)

---

## 🔄 11. Dynamic Data → Static Mock (Stitch Preview)

**Real component (with Server Action):**
```typescript
// app/berita/page.tsx
const { data } = await getAllBerita(); // from actions/berita.action.ts
```

**Stitch mock (for design preview):**
```typescript
// Navbar.stitch.mock.tsx — Untuk preview di Figma
export const mockNavItems = [
  { href: '/home', label: 'Beranda' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/berita', label: 'Berita' },
];

// Usage in component for Stitch preview:
export function Navbar() {
  // In Stitch preview, use mock data; in production, get from BE
  const mockMode = true; // TODO: auto-detect Stitch environment
  const navItems = mockMode ? mockNavItems : realNavItems;

  return <nav>...</nav>;
}
```

**Better approach:**
Buat `mock-data.ts` untuk consistent mock data across all components.

---

## 🧪 12. Testing Component States in Stitch

Stitch auto-detects Tailwind variant classes dan creates component variants:

| State | Tailwind Class | Stitch Variant |
|-------|----------------|----------------|
| Default | none | `Default` |
| Hover | `hover:bg-blue-700` | `Hover` |
| Active/Pressed | `active:scale-95` | `Pressed` |
| Disabled | `disabled:opacity-50` | `Disabled` |
| Focus | `focus:ring-2` | `Focused` |

**Pastikan semua interactive states ada** sebelum export ke Figma.

---

## 📤 13. Export from Figma Back to Code

Setelah desain final di Figma (via Stitch import), export kembali ke React:

1. **Install Figma plugin:** "Figma to Code" (by Anima) atau "Locofy"
2. **Select frame** → Generate React/Tailwind code
3. **Copy generated code** → Paste ke component FE (e.g., `components/user/XYZ.tsx`)
4. **Replace mock data** dengan real Server Action calls

**Manual refinement required:**
- ✅ Add `'use client'` directive jika component pakai state/effects
- ✅ Replace `<div>` dengan semantic HTML (`<nav>`, `<header>`, `<main>`)
- ✅ Add accessibility props (`aria-label`, `alt` text untuk images)
- ✅ Reconnect data flow: ganti mock data → call Server Action dari `actions/`

---

## 🔄 14. Workflow: Design → Code → PR (FE Perspective)

```
[Design in Figma via Stitch]
        ↓
[Export to React/Tailwind code]
        ↓
[Paste into components/user/ (FE branch)]
        ↓
[Add Props Interface + "holes"]
        ↓
[Call Server Action from actions/ (BE) — but BE belum siap?]
        ↓
[Use mock data temporarily]
        ↓
[Mock data → real data after BE done]
        ↓
[Integration test in pr/* branch]
        ↓
[Merge to main if all tests pass]
```

**FE Checklist before PR:**
- [ ] Component renders with mock data in Figma preview
- [ ] Exported code matches design specs (pixel-perfect)
- [ ] Props interface defined (TypeScript)
- [ ] Real data integration works (await Server Action call)
- [ ] Mobile responsive (test 375px, 768px, 1024px)
- [ ] Accessibility: keyboard nav, contrast ratio ≥4.5:1, ARIA labels
- [ ] No console errors/warnings

---

## 🛠️ 15. Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| **Stitch ignores `className`** | Arbitrary value `w-[324px]` | Use fixed Tailwind classes (`w-80`) atau add to safelist |
| **Component too complex** | Nested ternaries, loops | Extract sub-components, simplify logic |
| **Images 404 in Figma** | Relative paths (`/images/foo.png`) | Convert to absolute URL (`https://domain.com/images/foo.png`) |
| **Icons not rendering** | `lucide-react` icons (external lib) | Replace dengan SVG strings atau icon font |
| **Fonts mismatch** | Google Fonts not loaded in Figma canvas | Add `font-family` fallback to CSS variables |
| **Dynamic classes fail** | `className={\`bg-${color}\`}` | Predefine variants atau use conditional classes |

---

## 📚 16. Resources

- **Stitch AI:** https://stitch.withgoogle.com/
- **Tailwind v4:** https://tailwindcss.com/docs
- **React JSX → Figma plugin:** https://www.figma.com/community/plugin/745905260355047109
- **Figma Variables:** https://help.figma.com/hc/en-us/articles/360040562653
- **Auto Layout (Figma):** https://help.figma.com/hc/en-us/articles/360040451134

---

**Last Review:** 14 Mei 2026 | **Status:** ✅ Active  
**Owner:** Frontend Team | **Next Review:** Sprint retrospective
