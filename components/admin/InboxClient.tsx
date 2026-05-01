"use client";

import { useState } from "react";
import { MessageSquare, CheckCircle, Trash2, MailOpen, AlertCircle, Phone } from "lucide-react";
import { markAsRead, deletePesan } from "@/actions/pesan.action";
import { useRouter } from "next/navigation";

type Pesan = {
  id: number;
  nama: string;
  whatsapp: string;
  pesan: string;
  status: string;
  createdAt: Date;
};

export default function InboxClient({ messages }: { messages: Pesan[] }) {
  const [activeMessage, setActiveMessage] = useState<Pesan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleRead = async (id: number) => {
    setIsProcessing(true);
    await markAsRead(id);
    setIsProcessing(false);
    if (activeMessage && activeMessage.id === id) {
      setActiveMessage({ ...activeMessage, status: "Sudah Dibaca" });
    }
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return;
    setIsProcessing(true);
    await deletePesan(id);
    setIsProcessing(false);
    if (activeMessage?.id === id) {
      setActiveMessage(null);
    }
    router.refresh();
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* KIRI: Daftar Pesan */}
      <div className="w-1/3 flex-shrink-0 border-r border-slate-200 bg-slate-50 flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <MessageSquare size={20} className="text-blue-600" /> Kotak Masuk
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {messages.filter(m => m.status === "Belum Dibaca").length} belum dibaca
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <MailOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p>Tidak ada pesan masuk.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => {
                    setActiveMessage(msg);
                    if (msg.status === "Belum Dibaca") {
                      handleRead(msg.id);
                    }
                  }}
                  className={`w-full text-left p-4 transition-all hover:bg-blue-50 focus:outline-none ${
                    activeMessage?.id === msg.id ? "bg-blue-50 border-l-4 border-blue-500" : "border-l-4 border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`font-bold truncate pr-2 ${msg.status === "Belum Dibaca" ? "text-slate-900" : "text-slate-600"}`}>
                      {msg.nama}
                    </span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                  <p className={`text-sm line-clamp-2 ${msg.status === "Belum Dibaca" ? "font-semibold text-slate-700" : "text-slate-500"}`}>
                    {msg.pesan}
                  </p>
                  {msg.status === "Belum Dibaca" && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-rose-100 text-rose-600 text-[10px] font-bold rounded-full uppercase">Baru</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* KANAN: Detail Pesan */}
      <div className="flex-1 bg-white flex flex-col">
        {activeMessage ? (
          <>
            <div className="p-6 border-b border-slate-100 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{activeMessage.nama}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><AlertCircle size={14} /> {formatTime(activeMessage.createdAt)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(activeMessage.id)}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={16} /> Hapus
                </button>
              </div>
            </div>
            <div className="p-8 flex-1 overflow-y-auto">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 whitespace-pre-wrap text-slate-700 leading-relaxed text-lg">
                {activeMessage.pesan}
              </div>
              
              <div className="mt-8 border-t border-slate-100 pt-8">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Tindakan Lanjutan</h4>
                <a 
                  href={`https://wa.me/${activeMessage.whatsapp.replace(/^0/, "62")}?text=Halo ${encodeURIComponent(activeMessage.nama)}, kami dari Kelurahan Wergu Wetan menanggapi pesan Anda: `}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all"
                >
                  <Phone size={18} /> Balas via WhatsApp ({activeMessage.whatsapp})
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <MailOpen size={64} className="mb-4 text-slate-200" />
            <p className="text-lg font-medium">Pilih pesan di sebelah kiri untuk membaca</p>
          </div>
        )}
      </div>
    </div>
  );
}
