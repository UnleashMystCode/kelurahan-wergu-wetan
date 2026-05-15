# 🎨 Frontend UI & Component Architecture

## 1. Overview
Bagian ini mengatur segala hal yang berhubungan dengan antarmuka pengguna (UI), *styling*, dan interaksi di *browser*. Komponen di sini murni berfokus pada presentasi data (tampilan) dan dilarang memuat logika bisnis berat atau *query* database secara langsung.

## 2. UI Tech Stack & Libraries
- **Styling:** Menggunakan **Tailwind CSS v4** dengan *custom CSS variables* untuk sistem tema yang fleksibel. (Catatan: Kita *tidak* menggunakan komponen pracetak seperti Shadcn UI untuk mempertahankan keunikan visual portal desa).
- **Typography:** Memanfaatkan **Plus Jakarta Sans** via `next/font` untuk kesan korporat yang modern.

## 3. The "Hole" Pattern (Data Contract)
Dalam *ANF-Agentic Architecture*, kita menggunakan pola "Hole" (Lubang) untuk memisahkan *Frontend* dan *Backend*:
- **Frontend Components** (misal: `BeritaCard.tsx` atau `Navbar.tsx`) hanya membuat antarmuka (props) yang berfungsi sebagai "lubang" kosong.
- **Backend (Server Actions)** akan membocorkan data terstruktur untuk mengisi "lubang" tersebut di *Server Components* (misal: `app/berita/page.tsx`).

> **PENTING UNTUK VIBE CODER/AI:**
> Jika merancang komponen UI baru, **DILARANG** melakukan pengambilan data langsung dari database di dalam komponen *Client* (`'use client'`). Ambil data di *Page* level, lalu oper ke komponen sebagai *props*.

---

## 🧩 4. Design System (Source of Truth)

### CSS Custom Properties (Tailwind v4)

**File:** `app/globals.css`

```css
@layer theme {
  :root {
    /* Brand Colors — DO NOT MODIFY */
    --color-brand-dark: #0D47A1;   /* Headers, footers, primary CTAs */
    --color-brand-base: #1565C0;   /* Buttons, links, interactive states */

    /* Text Colors */
    --color-text-dark: #272727;    /* All headings & body text */
    --color-text-muted: #7C7C7C;   /* Metadata, timestamps, secondary */

    /* Backgrounds & Borders */
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
| Element | Tailwind Class | Weight | Line Height |
|---------|---------------|--------|-------------|
| H1 | `text-3xl` | `font-bold` (700) | `leading-tight` |
| H2 | `text-2xl` | `font-bold` (700) | `leading-snug` |
| H3 | `text-xl` | `font-semibold` (600) | `leading-snug` |
| Body | `text-base` | `font-normal` (400) | `leading-relaxed` |
| Small | `text-sm` | `font-normal` (400) | `leading-normal` |

**Color Application:**
| Token | Use For |
|-------|---------|
| `brand-dark` | Navigation, footers, primary CTAs |
| `brand-base` | Buttons, links, hover/focus states |
| `text-dark` | All heading and body text |
| `text-muted` | Metadata, timestamps, secondary information |

---

## 🔗 5. Stitch AI Integration (Optional — Design-to-Code)

Stitch is a **design-time tool** for converting Figma designs to React/Tailwind code. It is NOT a runtime dependency.

### When to Use Stitch

- ✅ Importing designer mockups from Figma into codebase
- ✅ Generating component boilerplate from approved designs
- ❌ NOT for data binding — data comes from Server Actions at runtime
- ❌ NOT a state management solution

### The "Hole" Pattern — Props Interface Contract

FE creates explicit props interfaces ("holes"). BE provides data to fill them.

**Step 1 — Define Props Interface (FE):**
```typescript
// components/user/BeritaCard.tsx (FE — pure UI)
'use client';

export interface BeritaCardProps {
  judul: string;
  isi: string;
  gambar?: string;
  kategori: string;
  penulis: string;
  tanggal: string;
  slug: string;
}

export function BeritaCard({ judul, isi, gambar, kategori, penulis, tanggal, slug }: BeritaCardProps) {
  return (
    <article className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {gambar && <img src={gambar} alt={judul} className="w-full h-48 object-cover" />}
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
// actions/berita.action.ts (BE — data provider)
export async function getAllBerita(): Promise<ApiResponse<Berita[]>> {
  try {
    const raw = await prisma.kegiatan.findMany({
      where: { status: 'Aktif' },
      orderBy: { tanggal: 'desc' },
      take: 10,
    });

    const data = raw.map(b => ({
      judul: b.judul,
      isi: b.isi,
      gambar: b.gambar || '/images/default-news.png',
      kategori: b.kategori,
      penulis: b.penulis,
      tanggal: b.tanggal.toISOString(),
      slug: b.slug,
    }));

    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
```

**Step 3 — FE Page Orchestrates:**
```typescript
// app/berita/page.tsx (FE — calls BE, passes to UI)
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

## 🚀 6. Exporting Components with Stitch

### Prepare Component for Stitch

Transform Next.js component → Stitch-compatible:

**Before (Next.js-specific):**
```typescript
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

**After (Stitch-ready):**
```typescript
'use client';

export interface NavItem {
  href: string;
  label: string;
}

export interface NavbarProps {
  currentPath: string;   // BE/page passes this
  navItems: NavItem[];   // Static route config
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

**Key changes:**
1. ✅ Add `'use client'` (required by Stitch)
2. ✅ Define explicit `interface Props`
3. ✅ Replace Next.js hooks (`usePathname`) with static props
4. ✅ Replace `<Link>` with `<a>` (or keep Link, Stitch handles it)
5. ✅ Remove dynamic `className` templates — use conditional classes
6. ✅ Use absolute image URLs or placeholders

### Stitch URL Format

Stitch requires public HTTP(S) URL to the component file:

```
https://stitch.withgoogle.com/copy?url=<ENCODED_URL>&name=ComponentName
```

Example:
```
https://stitch.withgoogle.com/copy?url=https%3A%2F%2Fraw.githubusercontent.com%2Forg%2Frepo%2Fmain%2Fcomponents%2FNavbar.tsx&name=WW_Navbar
```

---

## 🎨 7. Tailwind → Figma Property Map

Stitch recognizes these Tailwind patterns:

| Tailwind Class | Figma Property |
|----------------|----------------|
| `bg-blue-600` | Fill color `#2563EB` |
| `text-text-dark` | Text color `#272727` |
| `rounded-xl` | Corner radius `12px` |
| `shadow-lg` | Drop shadow effect |
| `border` | Stroke weight `1px` |
| `p-4` | Padding `16px` all sides |
| `flex` / `flex-col` | Auto Layout (vertical) |
| `items-center` | Align: center |
| `justify-between` | Justify: space between |
| `gap-2` | Space between items `8px` |
| `w-full` | Width "Fill container" |
| `h-16` | Fixed height `64px` |
| `hover:bg-blue-700` | Interactive variant (hover state) |
| `transition-all` | Smart animate between states |
| `backdrop-blur-md` | Background blur `16px` |

**Complex patterns:**
- `hover:scale-[1.02]` → Transform scale
- `active:scale-95` → Pressed state
- `disabled:opacity-50` → Disabled state

---

## 🖼️ 8. Image Handling

Static assets from `public/images/` require **absolute URLs** for Stitch preview:

```typescript
// ❌ Next.js relative path (runtime OK, Stitch fails)
<img src="/images/hero_office.png" alt="Office hero" />

// ✅ Absolute URL (Stitch-compatible)
<img src="https://[DOMAIN_PRODUKSI]/images/hero_office.png" alt="Office hero" />
```

**Image specs:**
- Hero banners: 1920×800 (desktop), 768×400 (tablet), 400×300 (mobile)
- Thumbnails: 400×300
- Staff photos: 200×200 (square)

---

## 📱 9. Responsive Breakpoints

Map Tailwind breakpoints to device frames:

| Breakpoint | Min Width | Device |
|------------|-----------|--------|
| Mobile (base) | 0px | 375×812 (iPhone X) |
| `sm` | 640px | 640×1024 (iPad mini) |
| `md` | 768px | 768×1024 (iPad) |
| `lg` | 1024px | 1024×768 (desktop) |
| `xl` | 1280px | 1280×800 |
| `2xl` | 1536px | 1536×864 |

**Figma best practice:** Use Auto Layout with min/max-width constraints.

---

## 🧪 10. Before PR: FE Checklist

- [ ] Component renders with mock data in Stitch preview (if used)
- [ ] Exported code matches design specs (pixel-perfect)
- [ ] Props interface defined (TypeScript)
- [ ] Real data integration works (await Server Action call)
- [ ] Mobile responsive (test 375px, 768px, 1024px)
- [ ] Accessibility: keyboard nav, contrast ratio ≥4.5:1, ARIA labels
- [ ] No console errors/warnings
- [ ] No direct `fetch()` calls to database (use Server Actions only)

---

## 🛠️ 11. Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Stitch ignores className | Arbitrary value `w-[324px]` | Use fixed Tailwind classes (`w-80`) or add to safelist |
| Component too complex | Nested ternaries, loops | Extract sub-components, simplify logic |
| Images 404 in Figma | Relative paths (`/images/foo.png`) | Convert to absolute URL (`https://domain.com/images/foo.png`) |
| Icons not rendering | `lucide-react` external lib | Replace with inline SVG strings |
| Fonts mismatch | Google Fonts not loaded in Figma canvas | Add `font-family` fallback to CSS variables |
| Dynamic classes fail | `className={\`bg-${color}\`}` | Predefine variants or use conditional classes |

---

**Last Review:** 14 Mei 2026 | **Status:** ✅ Active  
**Owner:** Frontend Team | **Next Review:** Sprint Retrospective
