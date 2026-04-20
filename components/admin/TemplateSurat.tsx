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
            <div ref={ref} className="w-full bg-white p-12 text-black" style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: "16px", lineHeight: "1.5" }}>

                {/* 1. KOP SURAT */}
                <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-1">
                    <div className="w-24 h-28 relative flex-shrink-0 flex items-center justify-center">
                        {data.logoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={data.logoUrl} alt="Logo Pemda" className="max-w-full max-h-full object-contain" />
                        ) : (
                            <div className="w-20 h-24 border-2 border-black rounded-b-full rounded-t-lg flex items-center justify-center font-black text-xs text-center p-2">
                                LOGO<br />PEMDA
                            </div>
                        )}
                    </div>

                    <div className="flex-1 text-center font-bold">
                        <h2 className="text-xl tracking-widest uppercase">PEMERINTAH KABUPATEN KUDUS</h2>
                        <h3 className="text-2xl tracking-widest uppercase mt-1">KECAMATAN KOTA KUDUS</h3>
                        <h1 className="text-3xl font-black tracking-widest uppercase mt-1">DESA WERGU WETAN</h1>
                        <p className="text-sm font-normal mt-2">Jl. Contoh Alamat Desa No. 123, Telepon: (0291) 123456</p>
                        <p className="text-sm font-normal">KUDUS - Kode Pos 59318</p>
                    </div>

                    <div className="w-24 flex-shrink-0"></div> {/* Spacer buat center alignment */}
                </div>
                <div className="border-b-[1px] border-black mb-8"></div>

                {/* 2. JUDUL SURAT */}
                <div className="text-center mb-8">
                    <h2 className="text-xl font-bold uppercase underline">
                        SURAT PENGANTAR {data.layanan}
                    </h2>
                    <p className="text-md mt-1">Nomor: {data.nomorSurat || "470 / 001 / VII / 2026"}</p>
                </div>

                {/* 3. ISI SURAT (PEMBUKA) */}
                <p className="text-justify mb-4">
                    Yang bertanda tangan di bawah ini Kepala Desa Wergu Wetan, Kecamatan Kota Kudus, Kabupaten Kudus, menerangkan dengan sebenarnya bahwa:
                </p>

                {/* 4. BIODATA */}
                <table className="w-full mb-4 ml-8">
                    <tbody>
                        <tr>
                            <td className="w-48 py-1">Nama Lengkap</td>
                            <td className="w-4 py-1">:</td>
                            <td className="font-bold py-1 uppercase">{data.nama}</td>
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
                <p className="text-justify my-8">
                    Demikian surat pengantar {data.layanan.toLowerCase()} ini dibuat berdasarkan permohonan yang bersangkutan untuk dapat dipergunakan sebagaimana mestinya. Kepada instansi terkait dimohon dapat memberikan bantuan dan fasilitas seperlunya atas dasar kewenangan.
                </p>

                {/* 6. KOLOM TANDA TANGAN */}
                <div className="flex justify-end mt-16">
                    <div className="w-64 text-center">
                        <p className="mb-1">Kudus, {data.tanggalSurat}</p>
                        <p className="font-bold mb-20">Kepala Desa Wergu Wetan</p>

                        <p className="font-bold underline uppercase">{data.namaPejabat || "BAPAK SUPARDI, S.E."}</p>
                        <p>NIP. {data.nipPejabat || "19700101 200012 1 001"}</p>
                    </div>
                </div>

            </div>
        </div>
    );
});

TemplateSurat.displayName = "TemplateSurat";
