import * as XLSX from "xlsx";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import { HomeRepository } from "../repositories/home.repository";
import { HomeServiceSchema, HomeWelcomeSchema, HomeStatisticItemDTO } from "../schemas/home.schema";

/**
 * [SERVICE LAYER / USE CASE] - Domain Home & Dashboard
 * Berisi logika tersulit dan paling rawan error (File sistem & Excel Parsing).
 * Pengeksekusian library eksternal (seperti `xlsx`) dilakukan penuh di layer ini.
 */
export class HomeService {
  private repository = new HomeRepository();

  // === 1. FITUR UPLOAD EXCEL STATISTIK ===
  async prosesUploadStatistik(rawFormData: FormData) {
    const file = rawFormData.get("excelFile") as File;
    const url = rawFormData.get("excelUrl") as string;
    let workbook;

    // [BUSINESS RULE]: Prioritas Pembacaan File Excel
    // Aturan: Download dari URL eksternal lebih diprioritaskan ketimbang Upload File Fisik Lokal.
    if (url && url.trim() !== "") {
      const response = await fetch(url.trim());
      const buffer = Buffer.from(await response.arrayBuffer());
      workbook = XLSX.read(buffer, { type: "buffer", cellDates: true });
    } else if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      workbook = XLSX.read(buffer, { type: "buffer", cellDates: true });
    } else {
      throw new Error("File atau URL Excel wajib diisi (tidak boleh kosong)");
    }

    if (!workbook.SheetNames.length) throw new Error("File Excel rusak (tidak ada sheet).");

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    // [BUSINESS RULE]: Sanitasi String (Mencegah "Undefined" Excel terbaca)
    const cleanData = rawData
      .map((item: any) => {
        const labelKey = Object.keys(item).find((k) => k.toLowerCase().trim() === "label");
        const valueKey = Object.keys(item).find((k) => k.toLowerCase().trim() === "value");

        return {
          label: labelKey ? String(item[labelKey] || "").trim() : "",
          value: valueKey ? String(item[valueKey] || "").trim() : "",
        };
      })
      .filter(
        (item) =>
          item.label !== "" &&
          item.label.toLowerCase() !== "undefined" &&
          item.label !== "Tanpa Label"
      );

    // [DELEGASI REPOSITORY]: Hapus sisa Excel lama, timpa dengan data array yang baru
    await this.simpanBanyakStatistik(cleanData);
  }

  async simpanBanyakStatistik(data: HomeStatisticItemDTO[]) {
    await this.repository.hapusSemuaStatistik();
    if (data.length > 0) {
      await this.repository.simpanBanyakStatistik(data);
    }
  }

  async prosesSimpanStatistik(formData: FormData) {
    const id = formData.get("id") ? parseInt(formData.get("id") as string) : null;
    const data = {
      label: formData.get("label") as string,
      value: formData.get("value") as string,
    };

    if (id) {
      return await this.repository.updateStatistik(id, data);
    } else {
      return await this.repository.simpanStatistikBaru(data);
    }
  }

  async prosesHapusStatistik(id: number) {
    return await this.repository.hapusStatistik(id);
  }

  // === 2. FITUR LAYANAN (SERVICES ICON GRID) ===
  async prosesSimpanLayanan(rawFormData: FormData) {
    const rawData = {
      id: rawFormData.get("id"),
      title: rawFormData.get("title"),
    };
    const fileInput = rawFormData.get("iconFile") as File | null;
    const urlInput = rawFormData.get("iconUrl") as string | null;

    // Validasi DTO via Zod
    const validData = HomeServiceSchema.safeParse(rawData);
    if (!validData.success) throw new Error(`Validasi gagal: ${validData.error.issues[0].message}`);

    // Logika Fisik (Persis seperti skema pengelolaan Banner UI)
    let finalIconURL = "";
    if (fileInput && fileInput.size > 0) {
      const filename = `svc-${Date.now()}-${fileInput.name.replaceAll(" ", "_")}`;
      const uploadDir = path.join(process.cwd(), "public/uploads/services");
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (e) {}
      await writeFile(path.join(uploadDir, filename), Buffer.from(await fileInput.arrayBuffer()));
      finalIconURL = `/uploads/services/${filename}`;
    } else if (urlInput && urlInput.trim() !== "") {
      finalIconURL = urlInput.trim();
    }

    // Action penentuan mode INSERT / UPDATE
    const id = validData.data.id ? parseInt(validData.data.id) : null;
    if (id) {
      return await this.repository.updateLayanan(id, validData.data, finalIconURL);
    } else {
      if (!finalIconURL) throw new Error("Ikon wajib diisi!");
      return await this.repository.simpanLayananBaru(validData.data, finalIconURL);
    }
  }

  async prosesHapusLayanan(idStr: number) {
    const id = Number(idStr);
    const service = await this.repository.cariLayanan(id);
    if (!service) throw new Error("Layanan tidak ditemukan");

    await this.repository.hapusLayanan(id);

    if (service.iconURL && service.iconURL.startsWith("/uploads")) {
      try {
        await unlink(path.join(process.cwd(), "public", service.iconURL));
      } catch (e) {}
    }
    return true;
  }

  // === 3. FITUR SAMBUTAN LURAH ===
  async prosesSimpanSambutan(rawFormData: FormData) {
    const rawData = {
      namaLurah: rawFormData.get("namaLurah"),
      konten: rawFormData.get("konten"),
    };
    const fileInput = rawFormData.get("fotoFile") as File | null;
    const urlInput = rawFormData.get("fotoUrl") as string | null;

    // Validasi Zod
    const validData = HomeWelcomeSchema.safeParse(rawData);
    if (!validData.success) throw new Error(`Validasi gagal: ${validData.error.issues[0].message}`);

    // [BUSINESS RULE]: Aplikasi hanya mengelola 1 (Satu) Record Sambutan Lurah Single-Row (findFirst)
    const existing = await this.repository.cariSambutanPertama();
    let fotoURL = existing?.fotoURL || "";

    if (fileInput && fileInput.size > 0) {
      const filename = `lurah-${Date.now()}.jpg`;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (e) {}
      await writeFile(path.join(uploadDir, filename), Buffer.from(await fileInput.arrayBuffer()));
      fotoURL = `/uploads/${filename}`;
    } else if (urlInput && urlInput.trim() !== "") {
      fotoURL = urlInput.trim();
    }

    if (existing) {
      // Update row yang sudah ada
      return await this.repository.updateSambutan(existing.id, validData.data, fotoURL);
    } else {
      // Ciptakan baris pertama
      return await this.repository.buatSambutanBaru(validData.data, fotoURL);
    }
  }
}
