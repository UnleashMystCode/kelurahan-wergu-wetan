# 🔐 Security Policy

## Versi yang Didukung

| Versi | Status |
|-------|--------|
| `main` (latest) | ✅ Aktif didukung |
| Branch lama | ❌ Tidak didukung |

---

## 🚨 Melaporkan Kerentanan Keamanan

**JANGAN buat GitHub Issue publik untuk kerentanan keamanan.**

Jika kamu menemukan kerentanan keamanan, laporkan secara privat melalui:

1. **GitHub Private Security Advisory** (direkomendasikan):  
   → [Report a vulnerability](https://github.com/UnleashMystCode/kelurahan-wergu-wetan/security/advisories/new)

2. **Email langsung** kepada maintainer (lihat profil GitHub)

### Informasi yang Perlu Disertakan:
- Deskripsi kerentanan
- Langkah-langkah untuk mereproduksi
- Dampak potensial
- Saran perbaikan (jika ada)

Kami akan merespons dalam **72 jam** dan bekerja sama untuk menyelesaikan masalah sebelum dipublikasikan.

---

## 🛡️ Security Practices

Proyek ini mengimplementasikan layer keamanan berlapis:

- **RLS (Row Level Security)** — Semua tabel Supabase PostgreSQL dilindungi RLS
- **JWT HS256** — Autentikasi admin menggunakan `jose` dengan HTTP-only cookies
- **Zod Validation** — Semua input Server Action divalidasi sebelum menyentuh database
- **Secrets Isolation** — Semua kredensial via environment variables, tidak pernah di-commit
- **RBAC** — Role `admin` dan `super` dengan hak akses berbeda

Detail lengkap: [`.docs/security-policy.md`](.docs/security-policy.md)

---

## ⚡ Respons Darurat

Jika ditemukan breach aktif:
1. Rotate `JWT_SECRET` segera (semua sesi admin akan ter-invalidasi)
2. Periksa Supabase audit logs
3. Review RLS policies
4. Hubungi maintainer
