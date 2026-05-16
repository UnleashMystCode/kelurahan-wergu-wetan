# 🤖 AI Integration & MCP (Model Context Protocol)

## 1. Architecture
Aplikasi portal desa ini didesain agar sangat *AI-friendly* dan terstruktur untuk dikerjakan oleh Vibe Coder (AI Agent). Ke depannya, Next.js backend kita dapat bertindak sebagai **MCP Server** yang mengekspos "Skills" (Tools/Fungsi) agar bisa dipanggil oleh Model LLM (seperti Claude, OpenAI, atau Gemini).

Library standar yang digunakan untuk integrasi ini: `@modelcontextprotocol/sdk`.

## 2. Rule of Integration
AI Assistant bertindak layaknya "User Virtual" dengan level akses tertentu. 
Jika AI ingin mengambil data atau melakukan mutasi data, AI **HARUS** menggunakan "Skills" yang terdaftar di bawah ini. Skill tersebut di belakang layar akan secara eksklusif memanggil fungsi internal (*Server Actions*) yang sudah didefinisikan di [`backend-logic.md`](./backend-logic.md).

> **PENTING UNTUK VIBE CODER/AI:** 
> - **Separation of Concerns:** UI mengurus tampilan, Backend mengurus data/keamanan, MCP mengurus komunikasi AI.
> - Jika ada bug di respons AI, Anda cukup mengecek file ini atau fungsi *Server Action* terkait, tidak perlu mengotak-atik routing Next.js.
> - **DILARANG KERAS** menulis query database (`prisma.model...`) secara langsung di dalam layer integrasi MCP! AI wajib menggunakan *Core Services*.

## 3. Registered Skills (Tools Konseptual untuk AI)
Berikut adalah daftar rancangan fungsi yang didaftarkan ke dalam MCP Server agar bisa dieksekusi oleh LLM di dalam ekosistem Kelurahan Wergu Wetan:

### Tool 1: `search_village_info`
- **Deskripsi untuk AI:** Gunakan tool ini jika user mencari informasi, berita desa, potensi UMKM, atau pengumuman dari kelurahan.
- **Input Payload (Zod Schema):** `{ "query": "string" }`
- **Under the hood:** Tool ini akan memanggil eksekusi pencarian teks penuh (FTS) dari `actions/search.action.ts`.

### Tool 2: `get_village_services`
- **Deskripsi untuk AI:** Gunakan tool ini jika user bertanya tentang prosedur atau informasi panduan layanan apa saja yang ada di kantor kelurahan.
- **Input Payload:** `{}` (Tanpa parameter)
- **Under the hood:** Tool ini terhubung ke fungsi `getAllLayanan()` dari `actions/layanan.action.ts`.

### Tool 3: `submit_contact_message`
- **Deskripsi untuk AI:** Gunakan tool ini jika user ingin mengirim pesan, kritik, atau aduan ke pihak kelurahan secara langsung melalui percakapan AI.
- **Input Payload (Zod Schema):** `{ "namaLengkap": "string", "email": "string", "pesan": "string" }`
- **Under the hood:** Tool ini memvalidasi dan memanggil `simpanPesanBaru(formData)` dari `actions/pesan.action.ts`.

---

## 📚 Kenapa Pendekatan Ini Efektif untuk Vibe Coder?

1. **Pemisahan Tanggung Jawab (Separation of Concerns):** UI murni untuk merender komponen, Backend mengurus data, MCP murni untuk antarmuka komunikasi AI. Hal ini membuat proses *debugging* oleh agen AI menjadi sangat terisolasi dan cepat.
2. **Cross-Linking yang Kaya:** Dalam Markdown proyek ini, kita menggunakan sintaks `[Nama File](./nama-file.md)`. AI Assistant masa kini dapat menelusuri hipertaut lokal ini dengan sangat baik. 
3. **Library vs Framework Clear:** AI tidak akan salah kaprah menulis kode routing Next.js (*Framework*) di dalam fungsi spesifik MCP Tool (*Library*).
