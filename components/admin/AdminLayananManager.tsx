"use client";

import { useState, useRef } from "react";
import { Search, Filter, CheckCircle, XCircle, Eye, AlertCircle, Loader2, FileText, Printer } from "lucide-react";
import toast from "react-hot-toast";
import { useReactToPrint } from "react-to-print";
import { TemplateSurat } from "@/components/admin/TemplateSurat"; // === FITUR BARU ===

// === FITUR BARU: COMPONENT MANAJEMEN PENGAJUAN (SISI ADMIN) ===
export default function AdminLayananManager() {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("semua");

    // === FITUR BARU: STATE MODAL CATATAN ADMIN ===
    const [modalAksi, setModalAksi] = useState<{ id: number; aksi: "Proses" | "Selesai" | "Tolak" } | null>(null);
    const [catatanInput, setCatatanInput] = useState("");

    // Dummy Data Sinkron dengan Sisi Warga
    const [pengajuanMasuk, setPengajuanMasuk] = useState([
        {
            id: 1,
            nik: "331908XXXXXXXX1",
            nama: "Budi Santoso",
            layanan: "Kartu Keluarga",
            tanggal: "12 Mar 2026",
            status: "Menunggu", // Menunggu | Proses | Selesai | Tolak
            wa: "08123456789",
            keteranganWarga: "Pecah KK karena baru menikah.",
            catatanAdmin: ""
        },
        {
            id: 2,
            nik: "331908XXXXXXXX2",
            nama: "Siti Aminah",
            layanan: "Akta Kelahiran",
            tanggal: "11 Mar 2026",
            status: "Proses",
            wa: "08987654321",
            keteranganWarga: "Akta lahir anak pertama.",
            catatanAdmin: "Berkas sedang divalidasi dengan Dukcapil."
        },
        {
            id: 3,
            nik: "331908XXXXXXXX3",
            nama: "Agus Supriyanto",
            layanan: "Pengantar Nikah",
            tanggal: "10 Mar 2026",
            status: "Selesai",
            wa: "08556677889",
            keteranganWarga: "Rencana menikah bulan depan.",
            catatanAdmin: "Surat Pengantar sudah dicetak dan ditandatangani Lurah. Silakan diambil di jam kerja."
        }
    ]);

    // === FITUR BARU: MANAJEMEN CETAK SURAT (react-to-print) ===
    const printRef = useRef<HTMLDivElement>(null);
    const [dataCetak, setDataCetak] = useState<any>(null); // State penyimpan data sementara untuk dicetak

    // State Modal Konfigurasi Cetak
    const [modalPrint, setModalPrint] = useState<any>(null);
    const [printSettings, setPrintSettings] = useState({
        nomorSurat: "470 / 001 / VII / 2026",
        tanggalSurat: "",
        namaPejabat: "BAPAK SUPARDI, S.E.",
        nipPejabat: "19700101 200012 1 001",
        keteranganWarga: "",
        logoUrl: "",
        // Biodata Pemohon (Bisa Diedit)
        namaPemohon: "",
        nikPemohon: "",
        tanggalMasuk: ""
    });

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Surat_${dataCetak?.nama || 'Pemohon'}`,
        onAfterPrint: () => {
            toast.success("Dokumen berhasil dikirim ke antrean cetak!");
            setDataCetak(null); // Bersihkan sisa
        }
    });

    // Pemicu Buka Konfigurasi Pra-Cetak
    const openModalPrint = (item: any) => {
        setModalPrint(item);
        setPrintSettings({
            nomorSurat: "470 / 001 / VII / 2026",
            tanggalSurat: new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }),
            namaPejabat: "BAPAK SUPARDI, S.E.",
            nipPejabat: "19700101 200012 1 001",
            keteranganWarga: item.keteranganWarga || "",
            logoUrl: "", // Ganti jika default ada image
            namaPemohon: item.nama,
            nikPemohon: item.nik,
            tanggalMasuk: item.tanggal
        });
    };

    // Eksekusi Generate & Cetak
    const executePrint = (e: React.FormEvent) => {
        e.preventDefault();

        // Membungkus data overwrite biodata
        const finalData = {
            ...modalPrint,
            ...printSettings,
            // Override data dasar agar masuk ke prop TemplateSurat
            nama: printSettings.namaPemohon,
            nik: printSettings.nikPemohon,
            tanggal: printSettings.tanggalMasuk
        };

        setDataCetak(finalData);
        setModalPrint(null);

        // Timeout 200ms dibutuhkan agar React merender {dataCetak} dulu ke html rahasia
        setTimeout(() => {
            handlePrint();
        }, 200);
    };

    // Buka Modal & Set Target
    const openModalAksi = (id: number, aksi: "Proses" | "Selesai" | "Tolak") => {
        setModalAksi({ id, aksi });
        setCatatanInput(""); // Bersihkan input lama
    };

    // Eksekusi Simpan dengan Catatan
    const submitAksi = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!modalAksi) return;
        setLoading(true);
        await new Promise(r => setTimeout(r, 800)); // Simulasi API

        setPengajuanMasuk(prev =>
            prev.map(p => p.id === modalAksi.id ? { ...p, status: modalAksi.aksi, catatanAdmin: catatanInput } : p)
        );

        toast.success(`Berhasil! Surat kini bersatus: ${modalAksi.aksi}`);
        setLoading(false);
        setModalAksi(null); // Tutup Modal
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Menunggu": return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-xl text-[10px] font-black uppercase flex items-center gap-1 w-fit"><AlertCircle size={12} /> Menunggu</span>;
            case "Proses": return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl text-[10px] font-black uppercase flex items-center gap-1 w-fit"><Loader2 size={12} className="animate-spin" /> Diproses</span>;
            case "Selesai": return <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-xl text-[10px] font-black uppercase flex items-center gap-1 w-fit"><CheckCircle size={12} /> Selesai</span>;
            case "Tolak": return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-xl text-[10px] font-black uppercase flex items-center gap-1 w-fit"><XCircle size={12} /> Ditolak</span>;
            default: return null;
        }
    };

    const filteredData = pengajuanMasuk.filter(p => activeTab === "semua" || p.status.toLowerCase() === activeTab);

    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm mt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-slate-50 pb-4">
                <div>
                    <h2 className="text-lg font-bold text-slate-700 border-l-4 border-blue-600 pl-3">B. Daftar Surat Masuk (Inbox)</h2>
                    <p className="text-slate-400 text-xs mt-1 ml-4">Kelola permintaan pembuatan surat dari warga secara digital.</p>
                </div>

                {/* Filter Tab Ringkas */}
                <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                    {['semua', 'menunggu', 'proses', 'selesai'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-[11px] font-black uppercase tracking-wider rounded-xl transition-all ${activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <tr>
                            <th className="p-5">Pemohon & NIK</th>
                            <th className="p-5">Permintaan Layanan</th>
                            <th className="p-5">Status Terkini</th>
                            <th className="p-5 text-right">Aksi Panel</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {filteredData.map(item => (
                            <tr key={item.id} className="hover:bg-blue-50/20 transition-all">
                                <td className="p-5">
                                    <div className="font-bold text-slate-800">{item.nama}</div>
                                    <div className="text-xs text-slate-400 mt-0.5">{item.nik}</div>
                                </td>
                                <td className="p-5">
                                    <div className="font-bold text-slate-600">{item.layanan}</div>
                                    <div className="text-[10px] text-slate-400 font-medium mb-2">Masuk: {item.tanggal}</div>
                                    {item.keteranganWarga && (
                                        <div className="text-xs text-slate-500 border-l-2 border-slate-200 pl-2 py-0.5 bg-slate-50/50 rounded-r-lg pr-2 max-w-xs">
                                            <span className="font-bold text-[9px] uppercase tracking-widest text-slate-400 block mb-0.5">Keperluan:</span>
                                            <span className="line-clamp-2" title={item.keteranganWarga}>{item.keteranganWarga}</span>
                                        </div>
                                    )}
                                </td>
                                <td className="p-5">
                                    {getStatusBadge(item.status)}
                                </td>
                                <td className="p-5">
                                    <div className="flex justify-end gap-2 items-center">
                                        {/* Tombol Cetak Dokumen Asli, hanya bisa diprint jika status minimal PROSES */}
                                        {(item.status === "Proses" || item.status === "Selesai") && (
                                            <button
                                                disabled={loading}
                                                onClick={() => openModalPrint(item)}
                                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                                title="Konfigurasi & Cetak PDF"
                                            >
                                                <Printer size={18} />
                                            </button>
                                        )}

                                        {/* Logic Button Aksi Sesuai State Machine Asli */}
                                        {item.status === "Menunggu" && (
                                            <>
                                                <button disabled={loading} onClick={() => openModalAksi(item.id, "Tolak")} className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs font-bold transition border border-red-100">Tolak</button>
                                                <button disabled={loading} onClick={() => openModalAksi(item.id, "Proses")} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition">Proses</button>
                                            </>
                                        )}
                                        {item.status === "Proses" && (
                                            <button disabled={loading} onClick={() => openModalAksi(item.id, "Selesai")} className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition">Selesai</button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredData.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-10 text-center text-slate-400 font-bold bg-slate-50/50">
                                    Tidak ada pengajuan surat dengan filter ini.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* KOMPONEN CETAK TERSEMBUNYI */}
            <TemplateSurat ref={printRef} data={dataCetak} />

            {/* === FITUR BARU: MODAL PENGATURAN CETAK (PRINT SETTINGS) === */}
            {modalPrint && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto no-scrollbar">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                            <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                                <Printer size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg">Konfigurasi Cetak Surat</h3>
                                <p className="text-xs text-slate-500">Sesuaikan metadata surat resmi sebelum diprint.</p>
                            </div>
                        </div>

                        <form onSubmit={executePrint} className="flex flex-col gap-4 text-sm mt-2">
                            {/* BAGIAN KOP & JUDUL SURAT */}
                            <div className="bg-slate-50/40 p-4 rounded-2xl border border-slate-100 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> 1. Kop Surat: URL Logo Pemda (Opsional)</label>
                                    <input value={printSettings.logoUrl} onChange={e => setPrintSettings(prev => ({ ...prev, logoUrl: e.target.value }))} className="w-full bg-white p-3.5 rounded-xl outline-none font-bold text-slate-800 border border-slate-200/60 focus:border-indigo-500/30 transition placeholder:text-slate-300" placeholder="https://contoh.com/logo.png (Kosongkan otomatis default)" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> 2. Judul: Nomor Surat</label>
                                    <input required value={printSettings.nomorSurat} onChange={e => setPrintSettings(prev => ({ ...prev, nomorSurat: e.target.value }))} className="w-full bg-white p-3.5 rounded-xl outline-none font-bold text-slate-800 border border-slate-200/60 focus:border-indigo-500/30 transition placeholder:text-slate-300" />
                                </div>
                            </div>

                            {/* BAGIAN ISI SURAT (BIODATA PEMOHON) */}
                            <div className="bg-slate-50/40 p-4 rounded-2xl border border-slate-100 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> 3. Nama Pemohon</label>
                                        <input required value={printSettings.namaPemohon} onChange={e => setPrintSettings(prev => ({ ...prev, namaPemohon: e.target.value }))} className="w-full bg-white p-3.5 rounded-xl outline-none font-bold text-slate-800 border border-slate-200/60 focus:border-indigo-500/30 transition placeholder:text-slate-300" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> NIK Pemohon</label>
                                        <input required value={printSettings.nikPemohon} onChange={e => setPrintSettings(prev => ({ ...prev, nikPemohon: e.target.value }))} className="w-full bg-white p-3.5 rounded-xl outline-none font-bold text-slate-800 border border-slate-200/60 focus:border-indigo-500/30 transition placeholder:text-slate-300" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Tanggal Pengajuan Ctk</label>
                                        <input required value={printSettings.tanggalMasuk} onChange={e => setPrintSettings(prev => ({ ...prev, tanggalMasuk: e.target.value }))} className="w-full bg-white p-3.5 rounded-xl outline-none font-bold text-slate-800 border border-slate-200/60 focus:border-indigo-500/30 transition placeholder:text-slate-300" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Keperluan Warga</label>
                                        <textarea rows={1} required value={printSettings.keteranganWarga} onChange={e => setPrintSettings(prev => ({ ...prev, keteranganWarga: e.target.value }))} className="w-full bg-white p-3.5 rounded-xl outline-none font-bold text-slate-800 border border-slate-200/60 focus:border-indigo-500/30 transition placeholder:text-slate-300 resize-none" />
                                    </div>
                                </div>
                            </div>

                            {/* BAGIAN TANDA TANGAN */}
                            <div className="bg-slate-50/40 p-4 rounded-2xl border border-slate-100 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> 4. Tanda Tangan: Tanggal Surat Keluar</label>
                                    <input required value={printSettings.tanggalSurat} onChange={e => setPrintSettings(prev => ({ ...prev, tanggalSurat: e.target.value }))} className="w-full bg-white p-3.5 rounded-xl outline-none font-bold text-slate-800 border border-slate-200/60 focus:border-indigo-500/30 transition placeholder:text-slate-300" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Pejabat</label>
                                        <input required value={printSettings.namaPejabat} onChange={e => setPrintSettings(prev => ({ ...prev, namaPejabat: e.target.value }))} className="w-full bg-white p-3.5 rounded-xl outline-none font-bold text-slate-800 border border-slate-200/60 focus:border-indigo-500/30 transition placeholder:text-slate-300" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">NIP Pejabat</label>
                                        <input required value={printSettings.nipPejabat} onChange={e => setPrintSettings(prev => ({ ...prev, nipPejabat: e.target.value }))} className="w-full bg-white p-3.5 rounded-xl outline-none font-bold text-slate-800 border border-slate-200/60 focus:border-indigo-500/30 transition placeholder:text-slate-300" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-4 pt-2 border-t border-slate-100">
                                <button type="button" disabled={loading} onClick={() => setModalPrint(null)} className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition disabled:opacity-60">Batal</button>
                                <button type="submit" disabled={loading} className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition flex items-center justify-center gap-2 disabled:opacity-60">
                                    <Printer size={18} /> Generate PDF
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* === FITUR BARU: MODAL TINDAK LANJUT ADMIN === */}
            {modalAksi && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                            <div className="bg-blue-100 text-blue-600 p-2 rounded-xl">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg">Tindak Lanjut Pengajuan</h3>
                                <p className="text-xs text-slate-500">Ubah Status menjadi: <strong className="text-blue-600">{modalAksi.aksi}</strong></p>
                            </div>
                        </div>

                        {/* Info Pemohon Singkat & Form Tanggapan */}
                        {pengajuanMasuk.find(p => p.id === modalAksi.id) && (() => {
                            const data = pengajuanMasuk.find(p => p.id === modalAksi.id)!;
                            return (
                                <form onSubmit={submitAksi} className="flex flex-col gap-6 text-sm">
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <div className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Keperluan Pemohon</div>
                                        <p className="font-medium text-slate-700">{data.keteranganWarga || <span className="italic text-slate-400">Tidak ada keterangan spesifik</span>}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Keterangan / Pesan Admin</label>
                                        <textarea
                                            value={catatanInput}
                                            onChange={(e) => setCatatanInput(e.target.value)}
                                            rows={3}
                                            disabled={loading}
                                            className="w-full bg-slate-50 p-4 rounded-2xl outline-none font-medium text-slate-800 border-2 border-transparent focus:border-blue-500/20 transition placeholder:text-slate-300 resize-none disabled:opacity-60"
                                            placeholder="Tulis alasan jika ditolak, atau pesan jika selesai (Cth: Surat jadul bisa diambil besok)..."
                                        />
                                    </div>

                                    <div className="flex gap-3 mt-4">
                                        <button type="button" disabled={loading} onClick={() => setModalAksi(null)} className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition disabled:opacity-60">Batal</button>
                                        <button type="submit" disabled={loading} className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition flex items-center justify-center gap-2 disabled:opacity-60">
                                            {loading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />} Simpan Aksi
                                        </button>
                                    </div>
                                </form>
                            )
                        })()}
                    </div>
                </div>
            )}
        </div>
    );
}
