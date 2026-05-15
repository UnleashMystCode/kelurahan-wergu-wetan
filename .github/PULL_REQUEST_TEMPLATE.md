## 📋 Deskripsi Perubahan

<!-- Jelaskan dengan singkat apa yang diubah dan mengapa -->

## 🌿 Jenis Branch

- [ ] `be/*` — Backend (Server Actions, Prisma, lib)
- [ ] `fe/*` — Frontend (components, pages, styles)
- [ ] `pr/*` — Integration (merge be + fe)
- [ ] `hotfix/*` — Hotfix kritis
- [ ] `docs/*` — Dokumentasi saja

## ✅ ANF Docs-Sync Law Checklist

### Wajib untuk SEMUA PR:
- [ ] `.docs/CHANGELOG.md` sudah diupdate dengan entri baru
- [ ] Tidak ada commit langsung ke `main`

### Jika ada **file baru** dibuat:
- [ ] File terdaftar di `project-manifest.md` → Active Inventory

### Jika ada **route baru**:
- [ ] Route tercantum di `architecture.md` → Section 7 Routing

### Jika ada **perubahan arsitektur/pattern**:
- [ ] `architecture.md` diupdate di section yang relevan

---

## 🔧 Backend (`be/*`) Checklist

- [ ] `'use server'` ada di baris pertama setiap action file
- [ ] Zod schema didefinisikan untuk **semua** input
- [ ] Return type konsisten: `{ success, data?, message? }`
- [ ] `revalidatePath()` dipanggil setelah setiap operasi mutasi
- [ ] Tidak ada query `prisma.*` langsung di luar `actions/` atau `lib/`

## 🎨 Frontend (`fe/*`) Checklist

- [ ] `export const dynamic = "force-dynamic"` di setiap page yang mengambil data
- [ ] Tidak ada `fetch()` langsung ke database dari Client Component
- [ ] Props interface TypeScript didefinisikan ("Hole Pattern")
- [ ] Responsif: sudah ditest di lebar 375px, 768px, 1024px
- [ ] Tidak ada `console.log` yang tertinggal

## 🔐 Security Checklist

- [ ] Tidak ada secret/credential hardcoded di kode
- [ ] Semua input divalidasi dengan Zod
- [ ] Tidak ada `NEXT_PUBLIC_*` env var yang berisi data sensitif

---

## 📸 Screenshot (wajib jika ada perubahan UI)

| Sebelum | Sesudah |
|---------|---------|
| *(tempel screenshot)* | *(tempel screenshot)* |
