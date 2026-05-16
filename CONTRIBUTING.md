# 🤝 Panduan Kontribusi — Portal Kelurahan Wergu Wetan

Terima kasih sudah ingin berkontribusi! Proyek ini menggunakan **ANF-Agentic Architecture** dengan workflow yang ketat. Harap baca panduan ini sebelum membuat PR.

---

## 📚 Baca Dulu Sebelum Mulai

1. **[`README.md`](./README.md)** — Overview proyek dan cara menjalankan lokal
2. **[`.docs/architecture.md`](.docs/architecture.md)** — Master blueprint, branching strategy
3. **[`.docs/CHANGELOG.md`](.docs/CHANGELOG.md)** — Log perubahan terbaru

---

## 🌿 Branching Strategy (Wajib Diikuti)

| Branch | Untuk | Boleh sentuh |
|--------|-------|-------------|
| `be/<nama-fitur>` | Ranting khusus kerja Backend | `actions/`, `lib/`, `prisma/` |
| `fe/<nama-fitur>` | Ranting khusus kerja Frontend | `components/`, `app/` |
| `pr` | **Batang Integrasi Utama** (Staging). Semua ranting `be/` dan `fe/` dilempar (merge) ke sini untuk dites bersama. | Semua, tempat bertemunya kode |
| `hotfix/<desc>` | Bugfix darurat ke production | Minimal, targeted |
| `main` | **Production (Live)** | ❌ Dilarang keras commit langsung |

> **⚠️ ATURAN EMAS BRANCHING:** 
> Dilarang membuat *branch* dengan nama `be` atau `fe` saja. Selalu gunakan format *folder* (contoh: `be/nama-fitur`). Ini mencegah penumpukan kode dan menghindari *Merge Hell*.

**Contoh Siklus Kerja (Pro Max Workflow):**
```bash
# 1. Developer Backend bekerja:
git checkout -b be/ulasan-ikm

# 2. Developer Frontend bekerja:
git checkout -b fe/ulasan-ui

# 3. Keduanya melempar kode mereka ke batang integrasi di GitHub:
# -> Merge PR ke branch `pr`
```

---

## 📋 Workflow Kontribusi

### 1. Setup Lokal
```bash
git clone https://github.com/UnleashMystCode/kelurahan-wergu-wetan.git
cd kelurahan-wergu-wetan
cp .env.example .env
# Edit .env dengan kredensial Supabase kamu
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### 2. Buat Branch
```bash
# Backend work
git checkout -b be/<domain>-<deskripsi>

# Frontend work
git checkout -b fe/<domain>-<deskripsi>
```

### 3. Code & Commit
Gunakan format commit message yang deskriptif:
```
feat(berita): add kategori filter to BeritaView
fix(auth): handle expired JWT in admin layout
docs: update architecture.md routing table
refactor(admin): extract AdminShell to separate file
```

### 4. Wajib: Update CHANGELOG.md
**Sebelum push**, catat perubahan di `.docs/CHANGELOG.md`:
```markdown
## [vX.Y.Z] - YYYY-MM-DD
### Added / Changed / Fixed
- Deskripsi perubahan kamu
```

### 5. Push & Buat PR
```bash
git push origin <nama-branch-kamu>
```
Lalu buat Pull Request di GitHub. GitHub akan otomatis menampilkan checklist PR.

---

## ⚙️ Standar Kode

### Backend (`be/*`)
- ✅ `'use server'` di baris pertama setiap action file
- ✅ Validasi input dengan **Zod** (`safeParse`, bukan `.parse()`)
- ✅ Return type: `{ success: boolean, data?: T, message?: string }`
- ✅ Panggil `revalidatePath()` setelah setiap mutasi DB
- ❌ JANGAN query `prisma.*` langsung di `components/` atau `app/`

### Frontend (`fe/*`)
- ✅ `export const dynamic = "force-dynamic"` di setiap page yang fetch data
- ✅ Definisikan props interface TypeScript ("Hole Pattern")
- ✅ Test responsivitas: 375px, 768px, 1024px
- ❌ JANGAN `fetch()` langsung ke database dari Client Component

### Umum
- ✅ Jalankan `npm run lint` sebelum PR
- ✅ Tidak ada `console.log` di production code
- ✅ Tidak ada secret/kredensial hardcoded

---

## 🤖 CI/CD

Setiap PR akan otomatis menjalankan:
1. **CI Pipeline** — ESLint, TypeScript check, Next.js build
2. **Docs Sync Check** — Verifikasi `CHANGELOG.md` sudah diupdate

PR tidak bisa di-merge jika ada check yang gagal.

---

## ❓ Pertanyaan?

Buka [Issue baru](https://github.com/UnleashMystCode/kelurahan-wergu-wetan/issues/new/choose) atau diskusikan di thread yang relevan.
