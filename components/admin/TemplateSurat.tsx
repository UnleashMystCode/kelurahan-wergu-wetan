import React, { forwardRef } from "react";
import Image from "next/image";

interface TemplateSuratProps {
  data: {
    nik: string;
    nama: string;
    layanan: string;
    tanggal: string;
    keteranganWarga?: string;
    // Data Kustom Pra-Cetak
    nomorSurat?: string;
    tanggalSurat?: string;
    namaPejabat?: string;
    nipPejabat?: string;
    logoUrl?: string;
  } | null;
}

// === FITUR BARU: TEMPLATE CETAK SURAT RESMI (KERTAS A4) ===
export const TemplateSurat = forwardRef<HTMLDivElement, TemplateSuratProps>(({ data }, ref) => {
  if (!data) return null;

  return (
    <div className="hidden">
      {/* Area Ini Hanya Muncul di Kertas / PDF */}
      <div
        ref={ref}
        className="w-full bg-white p-12 text-black"
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: "16px",
          lineHeight: "1.5",
        }}
      >
        {/* 1. KOP SURAT */}
        <div className="mb-1 flex items-center justify-between border-b-4 border-black pb-4">
          <div className="relative flex h-28 w-24 flex-shrink-0 items-center justify-center">
            {data.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.logoUrl}
                alt="Logo Pemda"
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <div className="flex h-24 w-20 items-center justify-center rounded-t-lg rounded-b-full border-2 border-black p-2 text-center text-xs font-black">
                LOGO
                <br />
                PEMDA
              </div>
            )}
          </div>
          <div className="flex-1 text-center font-bold">
            <h2 className="text-xl tracking-widest uppercase">PEMERINTAH KABUPATEN KUDUS</h2>
            <h3 className="mt-1 text-2xl tracking-widest uppercase">KECAMATAN KOTA KUDUS</h3>
            <h1 className="mt-1 text-3xl font-black tracking-widest uppercase">DESA WERGU WETAN</h1>
            <p className="mt-2 text-sm font-normal">
              Jl. Contoh Alamat Desa No. 123, Telepon: (0291) 123456
            </p>
            <p className="text-sm font-normal">KUDUS - Kode Pos 59318</p>
          </div>
          <div className="w-24 flex-shrink-0"></div> {/* Spacer buat center alignment */}
        </div>
        <div className="mb-8 border-b-[1px] border-black"></div>

        {/* 2. JUDUL SURAT */}
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold uppercase underline">SURAT PENGANTAR {data.layanan}</h2>
          <p className="text-md mt-1">Nomor: {data.nomorSurat || "470 / 001 / VII / 2026"}</p>
        </div>

        {/* 3. ISI SURAT (PEMBUKA) */}
        <p className="mb-4 text-justify">
          Yang bertanda tangan di bawah ini Kepala Desa Wergu Wetan, Kecamatan Kota Kudus, Kabupaten
          Kudus, menerangkan dengan sebenarnya bahwa:
        </p>

        {/* 4. BIODATA */}
        <table className="mb-4 ml-8 w-full">
          <tbody>
            <tr>
              <td className="w-48 py-1">Nama Lengkap</td>
              <td className="w-4 py-1">:</td>
              <td className="py-1 font-bold uppercase">{data.nama}</td>
            </tr>
            <tr>
              <td className="w-48 py-1">Nomor Induk Kependudukan (NIK)</td>
              <td className="w-4 py-1">:</td>
              <td className="py-1">{data.nik}</td>
            </tr>
            <tr>
              <td className="w-48 py-1">Keperluan / Keterangan</td>
              <td className="w-4 py-1">:</td>
              <td className="py-1 italic">{data.keteranganWarga || "-"}</td>
            </tr>
            <tr>
              <td className="w-48 py-1">Tanggal Pengajuan</td>
              <td className="w-4 py-1">:</td>
              <td className="py-1">{data.tanggal}</td>
            </tr>
          </tbody>
        </table>

        {/* 5. ISI SURAT (PENUTUP) */}
        <p className="my-8 text-justify">
          Demikian surat pengantar {data.layanan.toLowerCase()} ini dibuat berdasarkan permohonan
          yang bersangkutan untuk dapat dipergunakan sebagaimana mestinya. Kepada instansi terkait
          dimohon dapat memberikan bantuan dan fasilitas seperlunya atas dasar kewenangan.
        </p>

        {/* 6. KOLOM TANDA TANGAN */}
        <div className="mt-16 flex justify-end">
          <div className="w-64 text-center">
            <p className="mb-1">Kudus, {data.tanggalSurat}</p>
            <p className="mb-20 font-bold">Kepala Desa Wergu Wetan</p>

            <p className="font-bold uppercase underline">
              {data.namaPejabat || "BAPAK SUPARDI, S.E."}
            </p>
            <p>NIP. {data.nipPejabat || "19700101 200012 1 001"}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

TemplateSurat.displayName = "TemplateSurat";
