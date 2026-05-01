import InboxClient from "@/components/admin/InboxClient";
import { getPesanMasuk } from "@/actions/pesan.action";

export const metadata = {
  title: "Kotak Masuk | Admin Wergu Wetan",
};

export default async function PesanMasukPage() {
  const messages = await getPesanMasuk();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Kotak Masuk Warga</h1>
        <p className="text-slate-500">Kelola dan tanggapi pesan, keluhan, serta saran dari warga.</p>
      </div>

      <InboxClient messages={messages} />
    </div>
  );
}
